import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for PDF base64 uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Initialize Gemini SDK with telemetry header
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Main Summarize PDF Endpoint
  app.post('/api/summarize-lecture', async (req, res) => {
    try {
      const {
        pdfBase64,
        rawText,
        fileName = 'lecture_document.pdf',
        fileSizeFormatted = '1.5 MB',
        pageCount = 1,
        options = { depth: 'detailed', focus: 'general', language: 'ar' },
      } = req.body;

      if (!pdfBase64 && !rawText) {
        return res.status(400).json({
          error: 'يرجى تزويد ملف PDF أو نص المحاضرة للمعالجة.',
        });
      }

      const langInstruction =
        options.language === 'en'
          ? 'Output the summary, explanations, and quiz in English.'
          : options.language === 'ar'
          ? 'اكتب الملخص، الشروحات، المفاهيم، والأسئلة باللغة العربية الفصحى الواضحة والجميلة.'
          : 'Output the summary in the primary language used in the lecture document.';

      const depthInstruction =
        options.depth === 'comprehensive'
          ? 'قدم تلخيصاً فائق التفصيل يغطي كل جزئية ونظرية ومثال وتفصيل دقيق ذُكر في المحاضرة بدون اختصار مخل.'
          : options.depth === 'concise'
          ? 'قدم تلخيصاً مركزاً في نقاط جوهرية وأهم النقاط الأساسية فقط.'
          : 'قدم تلخيصاً مفصلاً ومرتباً ومنسقاً بدقة وشاملاً لأهم المفاهيم، القوانين، الشروحات، والأمثلة.';

      const promptText = `أنت خبير أكاديمي متقدم ومساعد دراسي متخصص في تلخيص المحاضرات والكتب الجامعية والمواد التعليمية.
مهمتك هي تحليل ملف المحاضرة المرفق واستخراج كامل بياناته الأصلية وإنشاء ملخص دراسي مفصل، مرتب، وغاية في الجمال والتنظيم لإعادة تجميعه في ملف PDF دراسي متكامل وجاهز للطباعة والمذاكرة.

تعليمات دقيقة:
1. استخرج بيانات الملف الأصلي قدر المستطاع:
   - اسم أو عنوان المحاضرة الفعلي الموجود داخل الملف.
   - اسم الدكتور / الأستاذ المحاضر إن وُجد، أو الجهة/الكلية/القسم.
   - اسم المقرر أو المادة ورمزها.
   - رقم المحاضرة وتاريخها أو الفصل الدراسي.
   - المحاور والمواضيع الرئيسية التي تتناولها.
2. التلخيص (${depthInstruction}):
   - قسم المحاضرة إلى أبواب أو فصول فرعية منطقية ومرتبة بدقة.
   - لكل باب: قدم شرحاً وافياً للمفهوم، قائمة بالنقاط المفتاحية، تعاريف المصطلحات الجوهرية، القوانين أو المعادلات إن وجدت، وأمثلة تطبيقية توضيحية.
3. معجم المصطلحات (Glossary):
   - استخرج أهم المصطلحات العلمية والتقنية مع تعاريفها المبسطة.
4. مراجعة واختبار ذاتي (Self-Assessment Quiz):
   - ضع أسئلة مراجعة وتدريب للاختبار مع الإجابات النموذجية والشرح.
5. نصائح وتوجيهات للدراسة والامتحان.

اللغة المطلوبة: ${langInstruction}

أعد الناتج فقط بتنسيق JSON مطابق للهيكل التالي دون أي نصوص إضافية قبله أو بعده:`;

      // Build contents parts
      const contentsParts: any[] = [];

      if (pdfBase64) {
        // Strip data URI prefix if present
        const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
        contentsParts.push({
          inlineData: {
            mimeType: 'application/pdf',
            data: cleanBase64,
          },
        });
      }

      if (rawText) {
        contentsParts.push({
          text: `محتوى نص المحاضرة المرجعي:\n${rawText}`,
        });
      }

      contentsParts.push({
        text: promptText,
      });

      // Model selection with fallback for high demand resiliency
      const primaryModel = 'gemini-3.8-flash';
      const fallbackModels = ['gemini-flash-latest', 'gemini-3.1-flash-lite'];

      let response: any = null;
      let lastError: any = null;

      const modelsToTry = [primaryModel, ...fallbackModels];
      for (const modelName of modelsToTry) {
        try {
          response = await ai.models.generateContent({
            model: modelName,
            contents: { parts: contentsParts },
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  originalMeta: {
                    type: Type.OBJECT,
                    properties: {
                      fileName: { type: Type.STRING },
                      fileSizeFormatted: { type: Type.STRING },
                      pageCount: { type: Type.INTEGER },
                      detectedTitle: { type: Type.STRING },
                      detectedInstructor: { type: Type.STRING },
                      detectedSubject: { type: Type.STRING },
                      lectureNumber: { type: Type.STRING },
                      dateOrSemester: { type: Type.STRING },
                      primaryLanguage: { type: Type.STRING },
                      estimatedReadingTimeMinutes: { type: Type.INTEGER },
                      mainThemes: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: ['detectedTitle', 'mainThemes'],
                  },
                  executiveSummary: {
                    type: Type.OBJECT,
                    properties: {
                      coreThesis: { type: Type.STRING },
                      keyTakeaways: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: ['coreThesis', 'keyTakeaways'],
                  },
                  sections: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        sectionNumber: { type: Type.INTEGER },
                        title: { type: Type.STRING },
                        summary: { type: Type.STRING },
                        keyPoints: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                        importantDefinitions: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              term: { type: Type.STRING },
                              definition: { type: Type.STRING },
                            },
                            required: ['term', 'definition'],
                          },
                        },
                        formulasOrRules: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                        practicalExamples: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                      },
                      required: ['sectionNumber', 'title', 'summary', 'keyPoints'],
                    },
                  },
                  glossary: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        term: { type: Type.STRING },
                        definition: { type: Type.STRING },
                        importance: { type: Type.STRING },
                      },
                      required: ['term', 'definition'],
                    },
                  },
                  quizAndReview: {
                    type: Type.OBJECT,
                    properties: {
                      questions: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            question: { type: Type.STRING },
                            answer: { type: Type.STRING },
                            explanation: { type: Type.STRING },
                            type: { type: Type.STRING },
                            options: {
                              type: Type.ARRAY,
                              items: { type: Type.STRING },
                            },
                          },
                          required: ['question', 'answer'],
                        },
                      },
                    },
                    required: ['questions'],
                  },
                  studyAdvice: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['originalMeta', 'executiveSummary', 'sections', 'glossary', 'quizAndReview'],
              },
            },
          });

          if (response && response.text) {
            break; // Succeeded!
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} failed or busy, trying fallback...`, err?.message || err);
          lastError = err;
          // Wait 800ms before fallback
          await new Promise((res) => setTimeout(res, 800));
        }
      }

      if (!response || !response.text) {
        throw lastError || new Error('تعذر إكمال تلخيص المحاضرة بسبب ضغط الاستخدام. يرجى المحاولة مرة أخرى.');
      }

      const responseText = response.text;
      if (!responseText) {
        throw new Error('لم يتم استلام نص استجابة من نموذج الذكاء الاصطناعي');
      }

      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch (parseErr) {
        console.error('JSON parse error from Gemini:', parseErr, responseText);
        // Clean markdown backticks if any
        const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedData = JSON.parse(cleaned);
      }

      // Ensure original file info fallback
      parsedData.originalMeta = {
        fileName: fileName || parsedData.originalMeta?.fileName || 'Lecture_Notes.pdf',
        fileSizeFormatted: fileSizeFormatted || parsedData.originalMeta?.fileSizeFormatted || 'غير محدد',
        pageCount: pageCount || parsedData.originalMeta?.pageCount || 1,
        detectedTitle: parsedData.originalMeta?.detectedTitle || fileName.replace(/\.[^/.]+$/, ''),
        detectedInstructor: parsedData.originalMeta?.detectedInstructor || 'غير محدد في الملف',
        detectedSubject: parsedData.originalMeta?.detectedSubject || 'مقرر دراسي عام',
        lectureNumber: parsedData.originalMeta?.lectureNumber || 'المحاضرة',
        dateOrSemester: parsedData.originalMeta?.dateOrSemester || new Date().toLocaleDateString('ar-EG'),
        primaryLanguage: parsedData.originalMeta?.primaryLanguage || options.language,
        estimatedReadingTimeMinutes:
          parsedData.originalMeta?.estimatedReadingTimeMinutes ||
          Math.max(5, Math.ceil((parsedData.sections?.length || 3) * 3.5)),
        mainThemes: parsedData.originalMeta?.mainThemes || ['مفاهيم المحاضرة الأساسية'],
      };

      parsedData.generatedAt = new Date().toISOString();

      return res.json({
        success: true,
        data: parsedData,
      });
    } catch (error: any) {
      console.error('Error in /api/summarize-lecture:', error);
      return res.status(500).json({
        error: error.message || 'حدث خطأ أثناء معالجة ملف المحاضرة وتلخيصه.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
