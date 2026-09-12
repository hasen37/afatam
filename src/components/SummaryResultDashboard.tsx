import React, { useState } from 'react';
import { LectureSummaryData } from '../types';
import { OriginalFileInfoCard } from './OriginalFileInfoCard';
import { DetailedSectionsView } from './DetailedSectionsView';
import { GlossaryView } from './GlossaryView';
import { QuizReviewView } from './QuizReviewView';
import { PdfPrintTemplate } from './PdfPrintTemplate';
import { exportElementToPdf } from '../utils/pdfGenerator';
import {
  Download,
  Printer,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  FileText,
  HelpCircle,
  BookMarked,
  Lightbulb,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  data: LectureSummaryData;
  onReset: () => void;
}

export const SummaryResultDashboard: React.FC<Props> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<'sections' | 'pdf-preview' | 'glossary' | 'quiz' | 'advice'>('sections');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ percent: number; statusText: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      setDownloadSuccess(false);
      await exportElementToPdf(
        'lecture-pdf-document',
        data.originalMeta.detectedTitle || data.originalMeta.fileName,
        (percent, statusText) => {
          setExportProgress({ percent, statusText });
        }
      );
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err: any) {
      console.error('PDF export error:', err);
    } finally {
      setIsExportingPdf(false);
      setExportProgress(null);
    }
  };

  const handleNativePrint = () => {
    setActiveTab('pdf-preview');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleCopyMarkdown = () => {
    let md = `# ${data.originalMeta.detectedTitle || 'ملخص المحاضرة'}\n\n`;
    md += `## بيانات الملف الأصلي:\n`;
    md += `- اسم الملف: ${data.originalMeta.fileName}\n`;
    md += `- المادة: ${data.originalMeta.detectedSubject}\n`;
    md += `- المحاضر: ${data.originalMeta.detectedInstructor}\n`;
    md += `- عدد الصفحات: ${data.originalMeta.pageCount}\n\n`;
    md += `## الملخص العام:\n${data.executiveSummary.coreThesis}\n\n`;
    md += `### النقاط الجوهرية:\n`;
    data.executiveSummary.keyTakeaways.forEach((k) => (md += `- ${k}\n`));
    md += `\n## الفصول والشرح التفصيلي:\n`;
    data.sections.forEach((s) => {
      md += `\n### ${s.sectionNumber}. ${s.title}\n${s.summary}\n`;
      if (s.keyPoints?.length) {
        md += `\n**النقاط الرئيسية:**\n`;
        s.keyPoints.forEach((p) => (md += `- ${p}\n`));
      }
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-right max-w-6xl mx-auto pb-16">
      {/* Top Action Header Bar */}
      <div className="bg-gradient-to-r from-[#1b1242] via-[#160f38] to-[#120b2e] rounded-2xl border border-purple-700/40 shadow-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={onReset}
            className="p-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 text-purple-200 hover:text-white transition-colors"
            title="رفع وتلخيص ملف آخر"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                اكتمل التلخيص بنجاح
              </span>
              <span className="text-xs text-purple-400">•</span>
              <span className="text-xs text-purple-300/80 font-medium">جاهز للتصدير كـ PDF والمذاكرة</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white line-clamp-1 mt-0.5">
              {data.originalMeta.detectedTitle || data.originalMeta.fileName}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-purple-200 bg-[#21174d] hover:bg-[#2c1f66] hover:text-white border border-purple-700/40 rounded-xl transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
          </button>

          <button
            onClick={handleNativePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-purple-200 bg-[#21174d] hover:bg-[#2c1f66] hover:text-white border border-purple-700/40 rounded-xl transition-colors"
          >
            <Printer className="w-4 h-4 text-purple-400" />
            <span>طباعة المستند</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-purple-500 rounded-xl transition-all shadow-md shadow-purple-600/30 active:scale-95 disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>تم تنزيل الـ PDF!</span>
              </>
            ) : (
              <>
                <Download className={`w-4 h-4 ${isExportingPdf ? 'animate-bounce' : ''}`} />
                <span>
                  {isExportingPdf
                    ? exportProgress?.statusText || 'جاري إعداد الـ PDF...'
                    : 'تنزيل ملف PDF الملخص'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Download Success or Progress Toast */}
      {isExportingPdf && exportProgress && (
        <div className="bg-purple-950/90 border border-purple-500/60 rounded-xl p-4 text-xs text-purple-100 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-violet-400 animate-ping" />
            <span className="font-semibold">{exportProgress.statusText}</span>
          </div>
          <span className="font-mono font-bold text-violet-300">{exportProgress.percent}%</span>
        </div>
      )}

      {downloadSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-xl p-3.5 text-xs text-emerald-200 flex items-center gap-2.5 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>تم تنزيل ملف الـ PDF بنجاح على جهازك! يمكنك أيضاً حفظه عبر زر "طباعة المستند".</span>
        </div>
      )}

      {/* Original PDF File Info Card */}
      <OriginalFileInfoCard meta={data.originalMeta} />

      {/* Executive Summary Card */}
      <div className="bg-gradient-to-r from-[#1c1348] via-[#160e38] to-[#120b2e] border border-purple-700/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2 text-purple-200 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span>الأطروحة المركزية والهدف الأكاديمي للمحاضرة:</span>
        </div>
        <p className="text-white text-sm leading-relaxed font-medium mb-4">
          {data.executiveSummary.coreThesis}
        </p>

        {data.executiveSummary.keyTakeaways && data.executiveSummary.keyTakeaways.length > 0 && (
          <div className="pt-3 border-t border-purple-800/40">
            <span className="text-xs font-bold text-purple-200 block mb-2">أبرز النقاط المستخلصة:</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-purple-100">
              {data.executiveSummary.keyTakeaways.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-[#221652]/60 p-3 rounded-xl border border-purple-700/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-purple-900/50 pb-2">
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'sections'
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-[#18113c] text-purple-200/80 hover:text-white hover:bg-[#221650] border border-purple-800/40'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>الشرح والتفصيل المنهجي ({data.sections?.length || 0} فصول)</span>
        </button>

        <button
          onClick={() => setActiveTab('pdf-preview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pdf-preview'
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-[#18113c] text-purple-200/80 hover:text-white hover:bg-[#221650] border border-purple-800/40'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>معاينة وثيقة الـ PDF المطبوعة</span>
        </button>

        <button
          onClick={() => setActiveTab('glossary')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'glossary'
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-[#18113c] text-purple-200/80 hover:text-white hover:bg-[#221650] border border-purple-800/40'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>معجم المصطلحات ({data.glossary?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-[#18113c] text-purple-200/80 hover:text-white hover:bg-[#221650] border border-purple-800/40'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>أسئلة الاختبار والمراجعة ({data.quizAndReview?.questions?.length || 0})</span>
        </button>

        {data.studyAdvice && data.studyAdvice.length > 0 && (
          <button
            onClick={() => setActiveTab('advice')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'advice'
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#18113c] text-purple-200/80 hover:text-white hover:bg-[#221650] border border-purple-800/40'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>إرشادات المذاكرة والامتحان</span>
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'sections' && <DetailedSectionsView sections={data.sections} />}

        {activeTab === 'pdf-preview' && (
          <div className="space-y-4">
            <div className="bg-[#1b1242] border border-purple-600/40 rounded-xl p-3.5 text-xs text-purple-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" />
                <span>
                  هذه هي النسخة المطابقة للـ PDF المتضمنة كامل بيانات الملف الأصلي والشرح والتفصيل.
                </span>
              </div>
              <button
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
              >
                تحميل الآن PDF
              </button>
            </div>
            <div className="bg-white text-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-x-auto">
              <PdfPrintTemplate data={data} id="lecture-pdf-document" />
            </div>
          </div>
        )}

        {activeTab === 'glossary' && <GlossaryView glossary={data.glossary} />}

        {activeTab === 'quiz' && (
          <QuizReviewView
            quiz={data.quizAndReview}
            advice={data.studyAdvice}
          />
        )}

        {activeTab === 'advice' && (
          <div className="bg-[#17103a]/90 rounded-2xl border border-purple-700/40 shadow-xl p-6 text-right space-y-4">
            <div className="flex items-center gap-2 border-b border-purple-900/40 pb-3">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                نصائح وتوجيهات المذاكرة والتحضير للامتحان
              </h3>
            </div>
            <ul className="space-y-3 pr-2">
              {data.studyAdvice.map((tip, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#21164e]/60 border border-purple-800/40 text-xs text-purple-100 leading-relaxed font-medium"
                >
                  <span className="w-6 h-6 rounded-lg bg-purple-900/80 text-violet-300 font-bold flex items-center justify-center shrink-0 border border-purple-700/40">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Off-screen staging template instance for PDF export when on other tabs */}
      {activeTab !== 'pdf-preview' && (
        <div
          style={{
            position: 'fixed',
            left: '-99999px',
            top: 0,
            width: '850px',
            backgroundColor: '#ffffff',
            opacity: 1,
            visibility: 'visible',
            pointerEvents: 'none',
            zIndex: -9999,
          }}
        >
          <PdfPrintTemplate data={data} id="lecture-pdf-document" />
        </div>
      )}
    </div>
  );
};
