import React from 'react';
import { LectureSummaryData } from '../types';
import { OriginalFileInfoCard } from './OriginalFileInfoCard';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  BookMarked,
  Lightbulb,
  Calculator,
  Calendar,
  FileCheck,
} from 'lucide-react';

interface Props {
  data: LectureSummaryData;
  id?: string;
}

export const PdfPrintTemplate: React.FC<Props> = ({ data, id = 'lecture-pdf-document' }) => {
  const { originalMeta, executiveSummary, sections, glossary, quizAndReview, studyAdvice, generatedAt } = data;

  const formattedDate = new Date(generatedAt || Date.now()).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id={id}
      className="bg-white text-slate-900 font-['Cairo',sans-serif] p-8 md:p-12 max-w-[900px] mx-auto text-right border border-slate-200 shadow-md rounded-2xl print:border-none print:shadow-none print:p-0 print:m-0"
      dir="rtl"
    >
      {/* Document Top Header / Banner */}
      <div className="border-b-2 border-blue-600 pb-5 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  ملخص أكاديمي معتمد وموثق
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-500 font-medium">منصة التلخيص الذكي</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                {originalMeta.detectedTitle || 'ملخص المحاضرة الدراسي'}
              </h1>
            </div>
          </div>

          <div className="text-left text-xs text-slate-500 shrink-0">
            <div className="font-semibold text-slate-700">تاريخ الإصدار:</div>
            <div>{formattedDate}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">جاهز للمذاكرة والطباعة</div>
          </div>
        </div>
      </div>

      {/* 1. ORIGINAL LECTURE METADATA BLOCK (Explicit requirement) */}
      <div className="mb-8">
        <OriginalFileInfoCard meta={originalMeta} variant="document-header" />
      </div>

      {/* 2. EXECUTIVE SUMMARY */}
      <div className="mb-8 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl p-5 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            الملخص التنفيذي والأطروحة المركزية للمحاضرة
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-800 mb-4 font-medium">
          {executiveSummary.coreThesis}
        </p>

        {executiveSummary.keyTakeaways && executiveSummary.keyTakeaways.length > 0 && (
          <div className="bg-white/90 rounded-lg p-4 border border-blue-100/80">
            <h3 className="text-xs font-bold text-blue-900 mb-2.5">
              أبرز 5 نقاط ومخرجات تعليمية رئيسية:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {executiveSummary.keyTakeaways.map((takeaway, tIdx) => (
                <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-normal">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. DETAILED SECTIONS BREAKDOWN */}
      <div className="mb-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">
            التفصيل المنهجي والشرح الشامل للمحاضرة
          </h2>
        </div>

        {sections.map((sec) => (
          <div
            key={sec.sectionNumber}
            className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 break-inside-avoid"
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                {sec.sectionNumber}
              </div>
              <h3 className="text-base font-bold text-slate-900">{sec.title}</h3>
            </div>

            {/* Explanation text */}
            <div className="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {sec.summary}
            </div>

            {/* Key points */}
            {sec.keyPoints && sec.keyPoints.length > 0 && (
              <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-150">
                <h4 className="text-xs font-bold text-slate-800 mb-2">النقاط المستفادة:</h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {sec.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Definitions */}
            {sec.importantDefinitions && sec.importantDefinitions.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">المصطلحات والمفاهيم الخاصة بالباب:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {sec.importantDefinitions.map((d, dIdx) => (
                    <div key={dIdx} className="bg-amber-50/60 border border-amber-200/60 rounded-lg p-2.5">
                      <span className="font-bold text-amber-900 block mb-0.5">{d.term}</span>
                      <span className="text-slate-700 leading-snug">{d.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulas / Rules */}
            {sec.formulasOrRules && sec.formulasOrRules.length > 0 && (
              <div className="bg-purple-50/50 border border-purple-200/60 rounded-lg p-3">
                <h4 className="text-xs font-bold text-purple-900 mb-1.5 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  القوانين والمعادلات:
                </h4>
                <div className="space-y-1">
                  {sec.formulasOrRules.map((formula, fIdx) => (
                    <div key={fIdx} className="font-mono text-xs text-purple-950 font-semibold bg-white/70 px-2 py-1 rounded">
                      {formula}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Examples */}
            {sec.practicalExamples && sec.practicalExamples.length > 0 && (
              <div className="bg-blue-50/40 border border-blue-200/50 rounded-lg p-3 text-xs">
                <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                  أمثلة تطبيقية وتوضيحية:
                </h4>
                <ul className="space-y-1 text-slate-700 pr-2">
                  {sec.practicalExamples.map((ex, exIdx) => (
                    <li key={exIdx} className="list-disc list-inside">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. GLOSSARY TABLE */}
      {glossary && glossary.length > 0 && (
        <div className="mb-8 break-inside-avoid">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-4">
            <BookMarked className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              معجم المصطلحات والمفاهيم الرئيسية في المحاضرة
            </h2>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-right">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-1/4">المصطلح</th>
                  <th className="p-3 w-7/12">التعريف والشرح المبسط</th>
                  <th className="p-3 w-2/12 text-center">الأهمية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {glossary.map((item, gIdx) => (
                  <tr key={gIdx} className={gIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-3 font-bold text-slate-900">{item.term}</td>
                    <td className="p-3 text-slate-700 leading-relaxed">{item.definition}</td>
                    <td className="p-3 text-center">
                      <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-medium border border-blue-100">
                        {item.importance || 'أساسي'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. REVIEW QUESTIONS AND ANSWERS */}
      {quizAndReview?.questions && quizAndReview.questions.length > 0 && (
        <div className="mb-8 break-inside-avoid">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-4">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              بنك الأسئلة ونماذج الاختبار والمراجعة الذاتية
            </h2>
          </div>

          <div className="space-y-3">
            {quizAndReview.questions.map((q, qIdx) => (
              <div key={qIdx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 text-xs">
                <div className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    {qIdx + 1}
                  </span>
                  <span className="leading-snug">{q.question}</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 pr-3 space-y-1">
                  <div className="text-emerald-800 font-semibold">
                    <span className="text-slate-500 ml-1">الإجابة النموذجية:</span>
                    {q.answer}
                  </div>
                  {q.explanation && (
                    <div className="text-slate-600 text-[11px] pt-1 border-t border-slate-100">
                      <span className="text-slate-400">التوضيح: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. STUDY ADVICE */}
      {studyAdvice && studyAdvice.length > 0 && (
        <div className="mb-8 p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 text-xs break-inside-avoid">
          <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            إرشادات ونصائح المذاكرة والتركيز في الامتحانات:
          </h3>
          <ul className="space-y-1 text-slate-700 pr-2">
            {studyAdvice.map((tip, tipIdx) => (
              <li key={tipIdx} className="list-disc list-inside leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-200 pt-4 mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-blue-500" />
          <span>ملخص دراسي مخصص ومستخرج من الوثيقة الأصلية: {originalMeta.fileName}</span>
        </div>
        <div>منصة التلخيص الذكي للمحاضرات • إعداد أكاديمي موثق</div>
      </div>

      {/* توقيع الإدارة تحت بالنص فقط */}
      <div className="mt-8 pt-6 border-t-2 border-slate-200 text-center flex flex-col items-center justify-center">
        <div className="inline-block border border-slate-300 rounded-xl px-8 py-3 bg-slate-50 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 mb-0.5">الاعتماد والتوثيق الأكاديمي</div>
          <div className="text-sm md:text-base font-black text-slate-900">
            توقيع الإدارة: الإشعاعية فاطم
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2">
          وثيقة ملخص أكاديمية رسمية جاهزة للمذاكرة والطباعة
        </p>
      </div>
    </div>
  );
};
