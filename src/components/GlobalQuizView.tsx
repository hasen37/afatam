import React, { useState } from 'react';
import {
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Award,
  Zap,
  Activity,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  category: 'radiology' | 'physiology' | 'ai' | 'general';
  categoryLabel: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'متوسط' | 'متقدم' | 'أساسي';
}

const SAMPLE_QUIZ_BANK: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'radiology',
    categoryLabel: 'فيزياء وتقنيات الأشعة (Radiology)',
    question: 'ما هي الخاصية الرئيسية لأشعة إكس (X-rays) التي تُمكّنها من اختراق الأنسجة البشرية والتمييز بين العظام والأنسجة الرخوة؟',
    options: [
      'أ. التردد المنخفض والطول الموجي الطويل جداً',
      'ب. الطاقة العالية والطول الموجي القصير مع التوهين التفاضلي (Differential Attenuation)',
      'ج. انعدام الشحنة والكتلة مع سرعة أقل من سرعة الضوء',
      'د. الانعكاس الكامل على سطح الجلد الخارجي',
    ],
    correctAnswer: 'ب. الطاقة العالية والطول الموجي القصير مع التوهين التفاضلي (Differential Attenuation)',
    explanation: 'تتميز أشعة إكس بطاقتها الكهرومغناطيسية العالية وطولها الموجي القصير، حيث تمتص العظام ذات العدد الذري العالي نسبة أكبر من الفوتونات فتظهر بيضاء، بينما يمر الإشعاع عبر الأنسجة الرخوة بدرجات متفاوتة.',
    difficulty: 'أساسي',
  },
  {
    id: 'q2',
    category: 'radiology',
    categoryLabel: 'فيزياء وتقنيات الأشعة (Radiology)',
    question: 'ما هو المبدأ الأساسي للوقاية من الإشعاع المعروف بـ (ALARA) في أقسام الأشعة التشخيصية؟',
    options: [
      'أ. As Low As Reasonably Achievable (أقل قدر ممكن تحقيقه معقولاً)',
      'ب. All Luminescence And Radiation Absorbed',
      'ج. Always Limit Any Radiographic Area',
      'د. Automatic Leveling And Radiation Attenuation',
    ],
    correctAnswer: 'أ. As Low As Reasonably Achievable (أقل قدر ممكن تحقيقه معقولاً)',
    explanation: 'مبدأ ALARA هو القاعدة الذهبية في الوقاية الإشعاعية، ويرتكز على ثلاثة أركان رئيسية: تقليل الوقت (Time)، زيادة المسافة (Distance)، واستخدام الدروع الواقية (Shielding).',
    difficulty: 'أساسي',
  },
  {
    id: 'q3',
    category: 'radiology',
    categoryLabel: 'فيزياء وتقنيات الأشعة (Radiology)',
    question: 'في التصوير المقطعي المحوسب (CT Scan)، ما هي وحدة قياس كثافة الأنسجة الإشعاعية؟',
    options: [
      'أ. وحدة بيكريل (Bq)',
      'ب. وحدة سيفرت (Sv)',
      'ج. وحدة هونسفيلد (Hounsfield Unit - HU)',
      'د. وحدة تسلا (Tesla)',
    ],
    correctAnswer: 'ج. وحدة هونسفيلد (Hounsfield Unit - HU)',
    explanation: 'وحدة هونسفيلد (HU) تقيس الكثافة الإشعاعية، حيث تبلغ قيمة الماء 0 HU، والهواء -1000 HU، والعظام المدمجة أكثر من +1000 HU.',
    difficulty: 'متوسط',
  },
  {
    id: 'q4',
    category: 'physiology',
    categoryLabel: 'علم وظائف الأعضاء والطب (Physiology)',
    question: 'ما هو الجزء المسؤول في جهاز التوصيل القلبي عن إطلاق النبضات الإيقاعية الطبيعية (Pacemaker)؟',
    options: [
      'أ. العقدة الأذينية البطينية (AV Node)',
      'ب. العقدة الجيبية الأذينية (SA Node)',
      'ج. حزمة هيس (Bundle of His)',
      'د. ألياف بركنجي (Purkinje Fibers)',
    ],
    correctAnswer: 'ب. العقدة الجيبية الأذينية (SA Node)',
    explanation: 'تعتبر العقدة الجيبية الأذينية (Sinoatrial Node) هي الناظمة الطبيعية لضربات القلب لأنها تمتلك أعلى معدل ذاتي لإزالة الاستقطاب (60-100 نبضة بالدقيقة).',
    difficulty: 'أساسي',
  },
  {
    id: 'q5',
    category: 'physiology',
    categoryLabel: 'علم وظائف الأعضاء والطب (Physiology)',
    question: 'في تخطيط القلب الكهربائي (ECG)، ماذا تُمثل موجة P ومُركب QRS على التوالي؟',
    options: [
      'أ. إزالة استقطاب البطينين وإعادة استقطاب الأذينين',
      'ب. إزالة استقطاب الأذينين وإزالة استقطاب البطينين',
      'ج. انقباض الشرايين وانبساط الأوردة',
      'د. الراحة التامة لعضلة القلب',
    ],
    correctAnswer: 'ب. إزالة استقطاب الأذينين وإزالة استقطاب البطينين',
    explanation: 'موجة P تعبر عن إزالة استقطاب الأذينين، بينما مركب QRS يعبر عن إزالة استقطاب البطينين، وتليهما موجة T التي تعبر عن إعادة استقطاب البطينين.',
    difficulty: 'متوسط',
  },
  {
    id: 'q6',
    category: 'ai',
    categoryLabel: 'الذكاء الاصطناعي وهندسة البيانات',
    question: 'لماذا تُفضل دالة التنشيط ReLU (Rectified Linear Unit) على دالة Sigmoid في تدريب الشبكات العصبية العميقة؟',
    options: [
      'أ. لأنها تُحول القيم السالبة إلى أرقام تخيلية',
      'ب. لتفادي معضلة تلاشي التدرج (Vanishing Gradient) وسرعة حساباتها',
      'ج. لأنها تشغل حجماً أقل في الذاكرة العشوائية بمقدار النصف',
      'د. لأنها صالحة فقط لطبقات المخرجات النهائية',
    ],
    correctAnswer: 'ب. لتفادي معضلة تلاشي التدرج (Vanishing Gradient) وسرعة حساباتها',
    explanation: 'دالة ReLU بصيغتها max(0, x) مشتقتها تساوي 1 لأي قيمة موجبة مما يحافظ على قوة التدرجات العكسية ويمنع تلاشيها عبر الطبقات المتعددة.',
    difficulty: 'متقدم',
  },
];

export const GlobalQuizView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const filteredQuestions = SAMPLE_QUIZ_BANK.filter((q) => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    const all: Record<string, boolean> = {};
    SAMPLE_QUIZ_BANK.forEach((q) => (all[q.id] = true));
    setRevealedAnswers(all);
  };

  const hideAll = () => {
    setRevealedAnswers({});
  };

  return (
    <div className="space-y-6 text-right max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1b1242] via-[#160f38] to-[#110b2d] rounded-3xl p-6 sm:p-8 border border-purple-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-violet-300" />
            <span>بنك الأسئلة الأكاديمي الشامل</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            نماذج اختبارات ومراجعة ذاتية للامتحانات
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl leading-relaxed">
            تدرب على الأسئلة النموذجية الأكاديمية المعدة بعناية، مع خاصية إخفاء الإجابات للاختبار الذاتي والاطلاع على الشرح العلمي المفصل.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-center justify-end">
          <button
            onClick={revealAll}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-violet-600/80 hover:bg-violet-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-violet-500/40 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4" />
            <span>إظهار الكل</span>
          </button>
          <button
            onClick={hideAll}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-[#211849] hover:bg-[#2c2063] text-purple-200 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-purple-700/40 transition-colors"
          >
            <EyeOff className="w-4 h-4" />
            <span>وضع الاختبار (إخفاء الكل)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#150f33]/90 rounded-2xl p-4 border border-purple-800/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="ابحث في الأسئلة والشروحات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-xs bg-[#1f164b] border border-purple-700/40 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <Search className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white'
                : 'bg-[#1e1548] text-purple-300 hover:text-white border border-purple-800/40'
            }`}
          >
            جميع الأسئلة
          </button>
          <button
            onClick={() => setSelectedCategory('radiology')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'radiology'
                ? 'bg-violet-600 text-white'
                : 'bg-[#1e1548] text-purple-300 hover:text-white border border-purple-800/40'
            }`}
          >
            العلوم الإشعاعية
          </button>
          <button
            onClick={() => setSelectedCategory('physiology')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'physiology'
                ? 'bg-violet-600 text-white'
                : 'bg-[#1e1548] text-purple-300 hover:text-white border border-purple-800/40'
            }`}
          >
            الطب ووظائف الأعضاء
          </button>
          <button
            onClick={() => setSelectedCategory('ai')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'ai'
                ? 'bg-violet-600 text-white'
                : 'bg-[#1e1548] text-purple-300 hover:text-white border border-purple-800/40'
            }`}
          >
            التقنية والذكاء الاصطناعي
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-[#150f33] rounded-2xl border border-purple-800/40 p-12 text-center text-purple-300 text-sm">
            لا توجد أسئلة مطابقة للبحث أو التصنيف المحدد.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isRevealed = revealedAnswers[q.id] ?? false;

            return (
              <div
                key={q.id}
                className="bg-[#17103a]/90 rounded-2xl border border-purple-700/40 overflow-hidden shadow-md transition-all hover:border-violet-500/40"
              >
                {/* Question Header */}
                <div className="p-5 border-b border-purple-900/40 flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-purple-600/20">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold bg-purple-900/60 text-purple-300 border border-purple-700/40 px-2 py-0.5 rounded-md">
                          {q.categoryLabel}
                        </span>
                        <span className="text-[10px] font-bold bg-violet-950/60 text-violet-300 border border-violet-700/30 px-2 py-0.5 rounded-md">
                          مستوى: {q.difficulty}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                        {q.question}
                      </h3>

                      {/* Options */}
                      {q.options && q.options.length > 0 && (
                        <div className="mt-3.5 space-y-1.5 pr-1">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className="text-xs text-purple-200/90 bg-[#1e1548]/70 border border-purple-800/30 px-3 py-2 rounded-xl"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleAnswer(q.id)}
                    className="self-end sm:self-start shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-violet-200 bg-purple-900/60 hover:bg-purple-800/70 border border-purple-600/40 px-3.5 py-2 rounded-xl transition-all"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-violet-300" />
                        <span>إخفاء الإجابة</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-violet-300" />
                        <span>كشف الإجابة</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Answer reveal box */}
                {isRevealed && (
                  <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-[#131d2e]/60 to-[#120b2d]/80 border-t border-emerald-500/30 space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-emerald-300 block mb-1">
                          الإجابة النموذجية المعتمدة:
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                          {q.correctAnswer}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-purple-200/80 bg-[#161f36]/80 p-3 rounded-xl border border-emerald-900/40 mr-7 leading-relaxed">
                      <strong className="text-purple-100 font-bold ml-1">الشرح العلمي والتوضيح:</strong>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
