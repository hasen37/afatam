import React, { useEffect, useState } from 'react';
import { Loader2, BrainCircuit, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProcessingState: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'قراءة وثيقة الـ PDF وتحليل الصفحات', desc: 'معالجة المدخلات والتحقق من بنية المستند واللغة...' },
    { title: 'استخلاص بيانات الملف الأصلي المعتمدة', desc: 'استنتاج اسم المحاضرة، الأستاذ المحاضر، المادة، والفصول...' },
    { title: 'التلخيص الأكاديمي العميق والتفكيك المنهجي', desc: 'تحليل النظريات، القوانين، وشرح كل باب بالتفصيل...' },
    { title: 'إعداد وثيقة الـ PDF وبنك الأسئلة والمعجم', desc: 'تنسيق الجداول، نماذج الاختبارات، والملف الجاهز للتحميل والطباعة...' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 3800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-gradient-to-b from-[#18113c] to-[#120b2e] rounded-3xl border border-purple-700/40 shadow-2xl text-right space-y-6">
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-purple-600/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/40">
            <BrainCircuit className="w-8 h-8 animate-pulse text-purple-200" />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-white">
          جاري تحليل المحاضرة وتوليد ملخص PDF متكامل...
        </h3>
        <p className="text-xs text-purple-200/80 max-w-sm">
          استخلاص ذكي للمعلومات الأصلية وصياغة تلخيص مفصل مع بنك أسئلة ومعجم مصطلحات
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-3 pt-2">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'border-violet-400 bg-[#251a5a]/80 shadow-md shadow-purple-950/40'
                  : isDone
                  ? 'border-emerald-500/40 bg-emerald-950/20'
                  : 'border-purple-900/30 opacity-40 bg-[#140e30]/40'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-purple-600/40 text-purple-400 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div>
                <h4
                  className={`text-xs font-bold ${
                    isCurrent ? 'text-white' : isDone ? 'text-emerald-300' : 'text-purple-400'
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-[11px] text-purple-300/70 mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
