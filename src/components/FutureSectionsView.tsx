import React, { useState } from 'react';
import {
  PlusCircle,
  Layers,
  Sparkles,
  CheckCircle2,
  FolderPlus,
  ArrowRight,
  Sliders,
  Bookmark,
  BookOpen,
  HelpCircle,
  FileText,
  FileCode,
  Lightbulb,
} from 'lucide-react';

export interface CustomSectionItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  iconName?: string;
  isCustom?: boolean;
}

interface Props {
  customSections: CustomSectionItem[];
  onAddSection: (section: CustomSectionItem) => void;
  onSelectSection: (id: string) => void;
}

export const FutureSectionsView: React.FC<Props> = ({
  customSections,
  onAddSection,
  onSelectSection,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newBadge, setNewBadge] = useState('جديد');
  const [successMsg, setSuccessMsg] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const id = `custom-${Date.now()}`;
    const newSection: CustomSectionItem = {
      id,
      title: newTitle.trim(),
      description: newDescription.trim() || 'قسم مخصص إضافي تم إنشاؤه في المنصة.',
      badge: newBadge.trim() || undefined,
      isCustom: true,
    };

    onAddSection(newSection);
    setNewTitle('');
    setNewDescription('');
    setSuccessMsg(`تمت إضافة قسم "${newSection.title}" بنجاح إلى البرجر منيو!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const presetSuggestions = [
    {
      title: 'أطلس الأشعة والتصوير التشخيصي',
      description: 'مكتبة صور شعاعية تشخيصية مع شروحات تعليمية للطلبة.',
      badge: 'مقترح',
    },
    {
      title: 'حاسبة الجرعات والمعادلات الطبية',
      description: 'أداة حسابية سريعة للقوانين الفيزيائية والإشعاعية للمحاضرات.',
      badge: 'مقترح',
    },
    {
      title: 'منصة التدريب والامتحانات الوزارية',
      description: 'نماذج امتحانات وزارية مع تصحيح فوري وتتبع الدرجات.',
      badge: 'مقترح',
    },
    {
      title: 'بنك الملخصات والمشاريع المشتركة',
      description: 'مساحة مخصصة لمشاركة ملخصات الـ PDF مع الزملاء.',
      badge: 'مقترح',
    },
  ];

  return (
    <div className="space-y-8 text-right max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1b1245] via-[#150f38] to-[#0e0928] border border-purple-700/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-2 bg-purple-900/60 border border-purple-400/30 text-purple-200 text-xs font-bold px-3.5 py-1 rounded-full mb-3">
          <Layers className="w-3.5 h-3.5 text-violet-300" />
          <span>هيكلية معيارية قابلة للتوسع والتطوير</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-black text-white">
          إدارة وتوسعة أقسام المنصة المستقبلية
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80 mt-2 max-w-3xl leading-relaxed">
          تمت إعادة هيكلة المنصة لتكون مبنية على أقسام مستقلة بالكامل عبر البرجر منيو (Burger Menu).
          حالياً يتصدر قسم الـ PDF الواجهة الأساسية، ويمكنك بسهولة إضافة أو تفعيل أي أقسام جديدة مستقبلاً
          وستظهر فوراً في القائمة بصفحة مستقلة مخصصة.
        </p>
      </div>

      {/* Live Form to add future section */}
      <div className="bg-[#140e33] border border-purple-700/40 rounded-3xl p-6 sm:p-8 shadow-lg space-y-5">
        <div className="flex items-center gap-2.5 border-b border-purple-800/40 pb-4">
          <div className="w-9 h-9 rounded-xl bg-purple-900/60 text-violet-300 flex items-center justify-center border border-purple-600/40">
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              إضافة قسم جديد إلى البرجر منيو الآن
            </h2>
            <p className="text-xs text-purple-300/70">
              أدخل عنوان ووصف القسم الجديد وسيتم إدراجه فوراً في قائمة الأقسام مع صفحة مستقلة خاصة به
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-4 text-xs text-emerald-200 flex items-center gap-2 shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-purple-200 mb-1.5">
                اسم أو عنوان القسم الجديد: <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="مثال: قسم أطلس الأشعة التشخيصية"
                required
                className="w-full bg-[#1b1344] border border-purple-700/50 rounded-xl px-4 py-3 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1.5">
                شارة أو تصنيف القسم:
              </label>
              <input
                type="text"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                placeholder="مثال: جديد، قريباً"
                className="w-full bg-[#1b1344] border border-purple-700/50 rounded-xl px-4 py-3 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-purple-200 mb-1.5">
              وصف مختصر للقسم ومهامه:
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="اكتب نبذة موجزة عما يقدمه هذا القسم..."
              rows={2}
              className="w-full bg-[#1b1344] border border-purple-700/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-600/30 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة القسم وتفعيله في البرجر منيو</span>
            </button>
          </div>
        </form>
      </div>

      {/* Preset Suggestions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>مقترحات سريعة لأقسام جاهزة للإضافة بنقرة واحدة:</span>
          </h3>
          <span className="text-xs text-purple-400/70">توسعات مجدولة للمنصة</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {presetSuggestions.map((preset, idx) => (
            <div
              key={idx}
              className="bg-[#150f38]/90 border border-purple-800/40 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-md hover:border-purple-600/50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-xs">{preset.title}</span>
                  <span className="text-[9px] bg-purple-900/60 text-purple-300 border border-purple-600/40 px-2 py-0.2 rounded-full">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-purple-200/70 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddSection({
                    id: `preset-${idx}-${Date.now()}`,
                    title: preset.title,
                    description: preset.description,
                    badge: preset.badge,
                    isCustom: true,
                  });
                  setSuccessMsg(`تمت إضافة "${preset.title}" إلى القائمة بنجاح!`);
                  setTimeout(() => setSuccessMsg(''), 4000);
                }}
                className="shrink-0 inline-flex items-center gap-1.5 bg-purple-900/50 hover:bg-purple-800/70 border border-purple-600/40 text-purple-200 hover:text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                title="إضافة هذا القسم فوراً"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>إضافة</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Currently Added Custom Sections */}
      {customSections.length > 0 && (
        <div className="bg-[#140e34] border border-purple-800/40 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>الأقسام المضافة حالياً في البرجر منيو ({customSections.length}):</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {customSections.map((sec) => (
              <div
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className="cursor-pointer p-3 rounded-xl bg-[#1d1445]/60 border border-purple-700/30 hover:border-purple-500/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-purple-200 transition-colors">
                    {sec.title}
                  </div>
                  <div className="text-[10px] text-purple-300/70 line-clamp-1 mt-0.5">
                    {sec.description}
                  </div>
                </div>
                <div className="text-violet-400 group-hover:-translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
