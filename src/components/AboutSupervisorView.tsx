import React from 'react';
import {
  UserCheck,
  Award,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Heart,
  Lightbulb,
  Radio,
  FileText,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface Props {
  onGoToSummarizer: () => void;
}

export const AboutSupervisorView: React.FC<Props> = ({ onGoToSummarizer }) => {
  return (
    <div className="space-y-8 text-right max-w-4xl mx-auto">
      {/* Supervisor Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1b1245] via-[#150f38] to-[#0e0928] border border-purple-700/40 p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar / Emblem */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-violet-600 via-purple-600 to-amber-400 p-1 shadow-xl shadow-purple-600/30">
              <div className="w-full h-full bg-[#130d32] rounded-[22px] flex flex-col items-center justify-center text-white">
                <Radio className="w-10 h-10 text-violet-300" />
                <span className="text-[10px] font-bold text-amber-300 mt-1">إشعاعية</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border-2 border-[#130d32] shadow-sm">
              معتمد
            </div>
          </div>

          {/* Bio text */}
          <div className="space-y-2.5 text-center sm:text-right">
            <div className="inline-flex items-center gap-2 bg-purple-900/60 border border-purple-400/30 text-purple-200 text-xs font-bold px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>إشراف وتطوير أكاديمي</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              المنصة بأدارة: <span className="text-purple-300">الاشعاعية فاطم</span>
            </h1>

            <p className="text-xs sm:text-sm text-purple-200/85 leading-relaxed max-w-2xl">
              أخصائية في تقنيات الأشعة والتصوير الطبي التشخيصي، مبادرة ومطورة لمنصة المحاضرات الذكية بهدف تيسير رحلة التعلم الجامعي لطلبة العلوم الطبية والإشعاعية وكافة التخصصات الأكاديمية عبر دمج الذكاء الاصطناعي مع الدقة المنهجية.
            </p>
          </div>
        </div>
      </div>

      {/* Vision and Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#17103a]/90 border border-purple-700/40 rounded-2xl p-6 shadow-md space-y-3">
          <div className="flex items-center gap-2.5 text-violet-300 font-bold text-base">
            <BookOpen className="w-5 h-5 text-violet-400" />
            <span>رسالة المنصة الأكاديمية</span>
          </div>
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
            تمكين كل طالب وطالبة من استيعاب أضخم المحاضرات الجامعية وسلايدات المقررات في دقائق معدودة، من خلال تلخيص علمي منظم يستخرج المعلومات الأصلية للملف ويعيد صياغة النظريات والقوانين والأسئلة بوضوح فائق.
          </p>
        </div>

        <div className="bg-[#17103a]/90 border border-purple-700/40 rounded-2xl p-6 shadow-md space-y-3">
          <div className="flex items-center gap-2.5 text-violet-300 font-bold text-base">
            <Lightbulb className="w-5 h-5 text-violet-400" />
            <span>رؤية التطوير المستمر</span>
          </div>
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
            تم تصميم المنصة بهيكل مقسم ووحدات مستقلة (Modular Architecture) لإتاحة إضافة أدوات دراسية جديدة مستقبلاً مثل بنك الأسئلة المتقدم، شروحات الصور الشعاعية، والمحاكاة التفاعلية.
          </p>
        </div>
      </div>

      {/* Roadmap & Coming Additions */}
      <div className="bg-[#150f34]/80 border border-purple-800/40 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-purple-900/40 pb-3">
          <Layers className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-bold text-white">
            الإضافات والمميزات المجدولة بإشراف الإشعاعية فاطم:
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1d1445]/60 border border-purple-800/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">قسم تلخيص الـ PDF المستقل</strong>
              <span className="text-purple-300/80">
                متاح حالياً ويعمل بكفاءة على كافة الأجهزة ومع Netlify.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1d1445]/60 border border-purple-800/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">بنك الأسئلة والمراجعة الذاتية</strong>
              <span className="text-purple-300/80">
                أسئلة تفاعلية مع إخفاء الإجابات والشرح العلمي.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1d1445]/60 border border-purple-800/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">معجم المصطلحات الطبية والإشعاعية</strong>
              <span className="text-purple-300/80">
                دليل مفاهيم ثنائي اللغة مع فلترة سريعة.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1d1445]/60 border border-purple-800/30">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">أطلس الأشعة والاختبارات التفاعلية</strong>
              <span className="text-purple-300/80">
                ميزة قادمة سيتم إدراجها في التحديثات الدورية للمنصة.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onGoToSummarizer}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span>الانتقال لقسم تلخيص المحاضرات والـ PDF</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
