import React, { useState } from 'react';
import { BookMarked, Search, Star, Sparkles, Filter, Tag } from 'lucide-react';

interface TermItem {
  term: string;
  termEn: string;
  category: 'radiology' | 'medical' | 'physics';
  categoryLabel: string;
  definition: string;
  significance: string;
}

const GLOSSARY_TERMS: TermItem[] = [
  {
    term: 'التوهين الإشعاعي',
    termEn: 'Radiation Attenuation',
    category: 'radiology',
    categoryLabel: 'فيزياء الأشعة',
    definition: 'النقصان التدريجي في شدة حزمة الأشعة السينية أثناء مرورها عبر المادة نتيجة لعمليتي الامتصاص والتشتت (Compton & Photoelectric).',
    significance: 'الأساس الفيزيائي لتشكيل الصورة الشعاعية والتباين بين الأنسجة.',
  },
  {
    term: 'وحدة هونسفيلد',
    termEn: 'Hounsfield Unit (HU)',
    category: 'radiology',
    categoryLabel: 'التصوير المقطعي CT',
    definition: 'مقياس كمي لتحديد الكثافة الإشعاعية للأنسجة في صور الأشعة المقطعية، حيث يُعرّف الماء بـ 0 والهواء بـ -1000 والعظام بـ +1000 وما فوق.',
    significance: 'تحديد نوع الأنسجة والنزف والأورام بدقة رقمية موضوعية.',
  },
  {
    term: 'مبدأ ألارا',
    termEn: 'ALARA Principle',
    category: 'radiology',
    categoryLabel: 'الوقاية الإشعاعية',
    definition: 'مبدأ توجيهي ينص على إبقاء الجرعة الإشعاعية للمريض والممارس الصحي في أدنى مستوى يمكن تحقيقه بشكل معقول مع الحفاظ على جودة تشخيصية مقبولة.',
    significance: 'الركيزة الأساسية لمعايير السلامة المهنية في مراكز الأشعة.',
  },
  {
    term: 'التصوير بالرنين المغناطيسي',
    termEn: 'Magnetic Resonance Imaging (MRI)',
    category: 'radiology',
    categoryLabel: 'التصوير الطبي',
    definition: 'تقنية تصوير غير تأينية تعتمد على محاذاة بروتونات الهيدروجين في المجال المغناطيسي القوي وإثارتها بموجات تردد راديوي (RF).',
    significance: 'أفضل تقنية لتصوير الأنسجة الرخوة كالدماغ والنخاع الشوكي والمفاصل.',
  },
  {
    term: 'النتاج القلبي',
    termEn: 'Cardiac Output (CO)',
    category: 'medical',
    categoryLabel: 'فسيولوجيا القلب',
    definition: 'حجم الدم الذي يضخه البطين الأيسر في الشريان الأبهر خلال دقيقة واحدة، ويساوي حجم النفضة مضروباً في معدل ضربات القلب.',
    significance: 'مؤشر حيوي حاسم لكفاءة وظيفة عضلة القلب والتروية الجهازية.',
  },
  {
    term: 'العقدة الجيبية الأذينية',
    termEn: 'Sinoatrial Node (SA Node)',
    category: 'medical',
    categoryLabel: 'كهربائية القلب',
    definition: 'كتلة متخصصة من الخلايا العضلية القلبية في الأذين الأيمن تولد إشارات كهربائية إيقاعية تنظم ضربات القلب الطبيعية.',
    significance: 'الناظمة الطبيعية المسؤولة عن نبض القلب السليم.',
  },
  {
    term: 'التصوير بالموجات فوق الصوتية',
    termEn: 'Ultrasound (Sonography)',
    category: 'radiology',
    categoryLabel: 'التصوير الطبي',
    definition: 'تقنية تصوير تشخيصية تعتمد على إرسال موجات صوتية عالية التردد واستقبال الصدى المنعكس من الأنسجة المختلفة دون أي إشعاع تأيني.',
    significance: 'آمنة تماماً للحوامل ومثالية لفحص البطن والأوعية الدموية بالدوبلر.',
  },
  {
    term: 'التشتت الكومتوني',
    termEn: 'Compton Scattering',
    category: 'physics',
    categoryLabel: 'التفاعل الإشعاعي',
    definition: 'تفاعل فوتون إشعاعي عالي الطاقة مع إلكترون خارجي للذرة، مما يؤدي لانبعاث الإلكترون وانحراف الفوتون بطاقة أقل في اتجاه جديد.',
    significance: 'المصدر الرئيسي للإشعاع المشتت الذي يقلل تباين الصورة ويزيد جرعة العاملين.',
  },
];

export const GlobalGlossaryView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.termEn.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase()) ||
      item.significance.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1b1242] via-[#160f38] to-[#110b2d] rounded-3xl p-6 sm:p-8 border border-purple-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-violet-300" />
            <span>المعجم الأكاديمي المتخصص</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            معجم المصطلحات والمفاهيم الإشعاعية والطبية
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl leading-relaxed">
            قاموس أكاديمي مصمم لطلبة الأشعة والطب والعلوم الصحية، يشرح المصطلحات العلمية باللغتين العربية والإنجليزية مع إبراز الأهمية السريرية والتشخيصية.
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/30">
          <BookMarked className="w-8 h-8" />
        </div>
      </div>

      {/* Search & Categories */}
      <div className="bg-[#150f33]/90 rounded-2xl p-4 border border-purple-800/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="ابحث بالعربية أو الإنجليزية..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-xs bg-[#1f164b] border border-purple-700/40 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <Search className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white'
                : 'bg-[#1e1548] text-purple-300 hover:text-white border border-purple-800/40'
            }`}
          >
            جميع المصطلحات
          </button>
          <button
            onClick={() => setSelectedCategory('radiology')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'radiology'
                ? 'bg-violet-600 text-white'
                : 'bg-[#1e1548] text-purple-300 hover:text-white border border-purple-800/40'
            }`}
          >
            الأشعة والتصوير الطبي
          </button>
          <button
            onClick={() => setSelectedCategory('physics')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'physics'
                ? 'bg-violet-600 text-white'
                : 'bg-[#1e1548] text-purple-300 hover:text-white border border-purple-800/40'
            }`}
          >
            الفيزياء الإشعاعية
          </button>
          <button
            onClick={() => setSelectedCategory('medical')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'medical'
                ? 'bg-violet-600 text-white'
                : 'bg-[#1e1548] text-purple-300 hover:text-white border border-purple-800/40'
            }`}
          >
            الطب والفسيولوجيا
          </button>
        </div>
      </div>

      {/* Grid of Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-[#150f33] rounded-2xl border border-purple-800/40 p-12 text-center text-purple-300 text-sm">
            لا توجد مصطلحات مطابقة للبحث المحدد.
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#17103a]/90 rounded-2xl border border-purple-700/40 p-5 shadow-md hover:border-violet-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-base text-white">{item.term}</h3>
                    <span className="text-xs text-violet-300 font-mono font-medium">
                      {item.termEn}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-purple-900/60 text-purple-300 border border-purple-700/40 px-2.5 py-0.5 rounded-full shrink-0">
                    {item.categoryLabel}
                  </span>
                </div>

                <p className="text-xs text-purple-100/90 leading-relaxed mt-2.5">
                  {item.definition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-900/40 flex items-start gap-2 bg-[#1f154d]/50 p-2.5 rounded-xl border border-purple-800/30">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-purple-200/80 leading-relaxed">
                  <strong className="text-purple-100 font-bold ml-1">الأهمية العلمية:</strong>
                  {item.significance}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
