import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MobileDrawer, ActiveSectionId } from './components/MobileDrawer';
import { UploadZone } from './components/UploadZone';
import { ProcessingState } from './components/ProcessingState';
import { SummaryResultDashboard } from './components/SummaryResultDashboard';
import { LectureSummaryData, SummarizeOptions } from './types';
import { summarizeLectureWithFallback } from './utils/clientSummarizer';
import {
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  // Current active section (only PDF summarizer)
  const [activeSection, setActiveSection] = useState<ActiveSectionId>('pdf-summarizer');
  const [burgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);

  // PDF Summarizer state machine
  const [appState, setAppState] = useState<'idle' | 'processing' | 'result' | 'error'>('idle');
  const [summaryData, setSummaryData] = useState<LectureSummaryData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleStartSummarizing = async (payload: {
    pdfBase64?: string;
    rawText?: string;
    fileName: string;
    fileSizeFormatted: string;
    pageCount?: number;
    options: SummarizeOptions;
  }) => {
    setAppState('processing');
    setErrorMessage('');

    try {
      const data = await summarizeLectureWithFallback(payload);
      setSummaryData(data);
      setAppState('result');
    } catch (err: any) {
      console.error('Summarize error:', err);
      setErrorMessage(err.message || 'حدث خطأ غير متوقع أثناء تلخيص المحاضرة.');
      setAppState('error');
    }
  };

  const handleResetSummarizer = () => {
    setAppState('idle');
    setSummaryData(null);
    setErrorMessage('');
  };

  return (
    <div
      className="min-h-screen bg-[#0a0718] text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white font-['Cairo',sans-serif] relative overflow-x-hidden"
      dir="rtl"
    >
      {/* Background celestial ambient dusk glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-900/15 rounded-full blur-3xl" />
      </div>

      {/* Header with Burger Menu Toggle and Current Section status */}
      <Navbar
        activeSection={activeSection}
        onSectionChange={(sec) => {
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        burgerMenuOpen={burgerMenuOpen}
        setBurgerMenuOpen={setBurgerMenuOpen}
        hasSummaryResult={appState === 'result'}
        currentSectionTitle="قسم التلخيص"
      />

      {/* Burger Menu Drawer (One button on the right, opens from the right, only summary section) */}
      <MobileDrawer
        isOpen={burgerMenuOpen}
        onClose={() => setBurgerMenuOpen(false)}
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasSummaryResult={appState === 'result'}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Section Header Card */}
          <div className="bg-gradient-to-r from-[#170f3c] via-[#130c33] to-[#0e0827] border border-purple-800/40 rounded-3xl p-6 sm:p-8 shadow-xl text-right flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-bold px-3.5 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-300" />
                <span>قسم التلخيص الأكاديمي</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white">
                قسم ملخص الـ PDF والمحاضرات الأكاديمية
              </h1>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-1 max-w-2xl leading-relaxed">
                ارفع ملف الـ PDF لاستخراج بيانات المحاضرة، صياغة ملخص أكاديمي متكامل، وتنزيل وثيقة الـ PDF المنسقة للطباعة والمذاكرة.
              </p>
            </div>

            {appState === 'result' && (
              <button
                onClick={handleResetSummarizer}
                className="shrink-0 flex items-center gap-2 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-600/40 text-purple-200 hover:text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>رفع محاضرة جديدة</span>
              </button>
            )}
          </div>

          {/* Summarizer State Workflow */}
          {appState === 'idle' && (
            <UploadZone onStartSummarizing={handleStartSummarizing} isLoading={false} />
          )}

          {appState === 'processing' && <ProcessingState />}

          {appState === 'error' && (
            <div className="max-w-md mx-auto my-12 p-8 bg-[#160f38] rounded-3xl border border-rose-600/40 shadow-xl text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-950/60 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">تعذر استكمال تلخيص المحاضرة</h3>
              <p className="text-xs text-rose-300 bg-rose-950/50 p-3 rounded-xl leading-relaxed border border-rose-800/30">
                {errorMessage}
              </p>
              <button
                onClick={handleResetSummarizer}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-purple-600/30"
              >
                <RefreshCw className="w-4 h-4" />
                <span>المحاولة مرة أخرى</span>
              </button>
            </div>
          )}

          {appState === 'result' && summaryData && (
            <SummaryResultDashboard data={summaryData} onReset={handleResetSummarizer} />
          )}
        </div>
      </main>

      {/* FOOTER: STRICTLY ONLY THIS TEXT CENTERED AS DIRECTED */}
      <footer className="relative z-10 border-t border-purple-900/30 py-8 no-print mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm sm:text-base font-bold text-purple-200 tracking-wide">
            المنصة بأدارة : <span className="text-white font-black">الاشعاعية فاطم</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
