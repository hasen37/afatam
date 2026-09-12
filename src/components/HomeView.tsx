import React from 'react';
import { NavTab } from './Navbar';
import {
  FileText,
  HelpCircle,
  BookMarked,
  UserCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Zap,
  GraduationCap,
  Layers,
  Smartphone,
  Cloud,
  FileCheck,
  Award,
} from 'lucide-react';
import { SAMPLE_LECTURES, SampleLecture } from '../data/sampleLectures';

interface Props {
  onNavigate: (tab: NavTab) => void;
  onSelectSampleDirect: (sample: SampleLecture) => void;
}

export const HomeView: React.FC<Props> = ({ onNavigate, onSelectSampleDirect }) => {
  return (
    <div className="space-y-12 text-right">
      {/* Twilight Celestial Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#18113c] via-[#140e32] to-[#0d0922] border border-purple-800/40 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-purple-950/60">
        {/* Subtle celestial background glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
          {/* Supervisor pill badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/60 to-violet-900/60 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-inner">
            <Sparkles className="w-4 h-4 text-violet-300 animate-pulse" />
            <span>المنصة بأدارة: <strong className="text-white font-black">الاشعاعية فاطم</strong></span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-tight">
            بوابتك الذكية لتلخيص المحاضرات والتميز الأكاديمي
          </h1>

          <p className="text-sm sm:text-base text-purple-200/85 leading-relaxed max-w-2xl mx-auto">
            منصة متكاملة متوافقة مع جميع الأجهزة وجاهزة لـ Netlify، توفر قسماً مخصصاً لتلخيص وثائق المحاضرات (PDF)، استخراج كامل بيانات الملف الأصلي، مع بنك أسئلة للاختبارات ومعجم شامل للمصطلحات الإشعاعية والطبية.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('pdf-summarizer')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>قسم تلخيص ملفات الـ PDF</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>

            <button
              onClick={() => onNavigate('quiz-bank')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#20174a]/70 hover:bg-[#281d5c] border border-purple-700/50 text-purple-200 hover:text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>بنك الأسئلة والاختبارات</span>
            </button>
          </div>

          {/* Device & Netlify Compatibility Tags */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-purple-950/60 text-purple-300 border border-purple-800/40 px-3 py-1 rounded-xl">
              <Smartphone className="w-3.5 h-3.5 text-violet-400" />
              <span>متوافق 100% مع الجوال والبرجر منيو</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-purple-950/60 text-purple-300 border border-purple-800/40 px-3 py-1 rounded-xl">
              <Cloud className="w-3.5 h-3.5 text-violet-400" />
              <span>جاهز للرفع والنشر المباشر على Netlify</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-purple-950/60 text-purple-300 border border-purple-800/40 px-3 py-1 rounded-xl">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>إشراف أكاديمي وتدقيق مستمر</span>
            </span>
          </div>
        </div>
      </section>

      {/* Highlights Bento Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-violet-400" />
              أقسام المنصة الرئيسية
            </h2>
            <p className="text-xs sm:text-sm text-purple-300/70 mt-1">
              تم تخصيص أقسام مستقلة لتسهيل الدراسة وإمكانية إضافة مميزات وتحديثات مستقبلية
            </p>
          </div>
          <span className="text-xs font-semibold text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-700/30">
            5 أقسام تخصصية
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Dedicated PDF Summarizer */}
          <div
            onClick={() => onNavigate('pdf-summarizer')}
            className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-[#1c1445]/90 to-[#140e34]/90 border border-purple-700/40 hover:border-violet-400/60 transition-all hover:scale-[1.02] shadow-lg shadow-purple-950/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-violet-500/20 text-violet-300 border border-violet-400/30 px-2.5 py-0.5 rounded-full">
                  القسم المستقل
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                قسم ملخص الـ PDF والمحاضرات
              </h3>
              <p className="text-xs text-purple-200/75 mt-2 leading-relaxed">
                ارفع أي ملف محاضرة PDF، ليتم استخلاص كامل بيانات الملف الأصلي (اسم المحاضر، المادة، الفصول، والتاريخ) وصياغة ملخص أكاديمي مفصل مع إمكانية تصديره لوثيقة PDF جاهزة للطباعة.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs text-violet-400 font-bold">
              <span>الدخول للقسم وتلخيص ملف</span>
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Quiz & Questions Bank */}
          <div
            onClick={() => onNavigate('quiz-bank')}
            className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-[#1c1445]/90 to-[#140e34]/90 border border-purple-700/40 hover:border-violet-400/60 transition-all hover:scale-[1.02] shadow-lg shadow-purple-950/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full">
                  تدريب واختبارات
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                بنك الأسئلة والمراجعة الذاتية
              </h3>
              <p className="text-xs text-purple-200/75 mt-2 leading-relaxed">
                بنك أسئلة تفاعلي شامل للعلوم الإشعاعية والطبية والعامة، مع نمط الاختبار الذاتي وإخفاء الإجابات والشروحات لتثبيت الفهم والاستعداد للامتحانات النهائية.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs text-indigo-400 font-bold">
              <span>فتح بنك الأسئلة والبدء</span>
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Glossary */}
          <div
            onClick={() => onNavigate('glossary')}
            className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-[#1c1445]/90 to-[#140e34]/90 border border-purple-700/40 hover:border-violet-400/60 transition-all hover:scale-[1.02] shadow-lg shadow-purple-950/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md shadow-pink-600/30">
                  <BookMarked className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-400/30 px-2.5 py-0.5 rounded-full">
                  معجم مصطلحات
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                معجم المصطلحات الطبية والإشعاعية
              </h3>
              <p className="text-xs text-purple-200/75 mt-2 leading-relaxed">
                قاموس مصطلحات أكاديمي وتخصصي يركز على فيزياء الأشعة، التصوير الطبي، والمصطلحات التشخيصية الأكثر تكراراً في المقررات الجامعية مع محرك بحث سريع.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs text-pink-400 font-bold">
              <span>تصفح المصطلحات والبحث</span>
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: About the Supervisor & Platform */}
          <div
            onClick={() => onNavigate('about-supervisor')}
            className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-[#1c1445]/90 to-[#140e34]/90 border border-purple-700/40 hover:border-violet-400/60 transition-all hover:scale-[1.02] shadow-lg shadow-purple-950/40 flex flex-col justify-between md:col-span-2 lg:col-span-2"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                  إشراف وتنسيق
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                المنصة بأدارة: الإشعاعية فاطم
              </h3>
              <p className="text-xs text-purple-200/75 mt-2 leading-relaxed">
                مبادرة أكاديمية نوعية تهدف لتقديم أدوات دراسية متطورة للطلبة الجامعيين عامة وطلبة تقنيات الأشعة والتصوير الطبي خاصة، لتسهيل المذاكرة وتلخيص المحاضرات المعقدة بأسلوب مرتب وشامل مع تحديثات مستمرة وإضافات دورية.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs text-purple-300 font-bold">
              <span>التعرف على رؤية المنصة والأدوات القادمة</span>
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Netlify & Technical Specs Card */}
          <div className="rounded-2xl p-6 bg-[#160f35]/70 border border-purple-800/30 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 text-purple-300 flex items-center justify-center mb-3">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                جاهزية كاملة لـ Netlify والجوال
              </h3>
              <ul className="text-xs text-purple-300/80 mt-2 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>ملف _redirects مهيأ لتفادي أخطاء 404</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>محرك تلخيص احتياطي يعمل حتى بدون خادم</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>قائمة برجر سلسة لشاشات الهواتف</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-900/30 text-[11px] text-purple-400 font-medium">
              استقرار تام وسرعة تحميل فائقة
            </div>
          </div>
        </div>
      </section>

      {/* Direct Tryout of Sample Lectures */}
      <section className="bg-gradient-to-r from-[#17103a] via-[#150f34] to-[#120b2d] border border-purple-800/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-violet-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                جرّب تلخيص محاضرة نموذجية بضغطة واحدة
              </h3>
              <p className="text-xs text-purple-300/70 mt-0.5">
                يمكنك معاينة عملية التلخيص واستخراج البيانات فوراً بدون الحاجة لرفع ملف حالياً
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('pdf-summarizer')}
            className="text-xs font-bold text-violet-300 hover:text-white flex items-center gap-1 bg-purple-900/40 hover:bg-purple-800/50 px-3.5 py-1.5 rounded-xl border border-purple-700/40 transition-colors"
          >
            <span>أو ارفع ملف PDF خاص بك</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {SAMPLE_LECTURES.map((sample) => (
            <div
              key={sample.id}
              className="bg-[#1e1648]/80 hover:bg-[#251b59] border border-purple-700/40 hover:border-violet-400/50 rounded-2xl p-4 transition-all flex flex-col justify-between text-right group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm text-white group-hover:text-purple-200 transition-colors">
                    {sample.title}
                  </span>
                  <span className="text-[10px] bg-purple-950/70 border border-purple-700/40 text-purple-300 px-2 py-0.5 rounded-md shrink-0">
                    {sample.pages} ص • {sample.size}
                  </span>
                </div>
                <div className="text-xs text-violet-300 font-semibold mb-1">
                  {sample.subject} • {sample.instructor}
                </div>
                <p className="text-xs text-purple-200/70 line-clamp-2 leading-relaxed">
                  {sample.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-800/40 flex items-center justify-between">
                <span className="text-[11px] text-purple-400/80 font-mono">
                  {sample.name}
                </span>
                <button
                  onClick={() => onSelectSampleDirect(sample)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 px-3.5 py-1.5 rounded-xl shadow-sm transition-all hover:scale-105"
                >
                  <span>بدء التلخيص الآن</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
