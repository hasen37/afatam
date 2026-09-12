import React from 'react';
import { CustomSectionItem } from './FutureSectionsView';
import {
  Sparkles,
  FileText,
  Layers,
  ArrowRight,
  FolderKanban,
  CheckCircle2,
  Settings,
} from 'lucide-react';

interface Props {
  section: CustomSectionItem;
  onGoToPdfSummarizer: () => void;
  onManageSections: () => void;
}

export const CustomSectionPage: React.FC<Props> = ({
  section,
  onGoToPdfSummarizer,
  onManageSections,
}) => {
  return (
    <div className="space-y-8 text-right max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#191142] via-[#140e36] to-[#0d0926] border border-purple-700/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 bg-purple-900/60 border border-purple-400/30 text-purple-200 text-xs font-bold px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>قسم مخصص إضافي في البرجر منيو</span>
          </span>
          {section.badge && (
            <span className="text-xs font-bold bg-violet-600/30 border border-violet-400/30 text-violet-200 px-3 py-1 rounded-full">
              {section.badge}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {section.title}
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/85 mt-2 leading-relaxed max-w-2xl">
          {section.description}
        </p>
      </div>

      {/* Content Workspace Placeholder */}
      <div className="bg-[#150f38]/90 border border-purple-800/40 rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-purple-900/50 border border-purple-600/40 text-violet-300 flex items-center justify-center mx-auto shadow-inner">
          <FolderKanban className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-lg font-bold text-white">
            هذا القسم جاهز ومدرج بنجاح في القائمة
          </h2>
          <p className="text-xs text-purple-300/80 leading-relaxed">
            تم تخصيص هذا القسم كصفحة مستقلة ضمن منظومة المنصة المرنة. يمكنك ربطه بأي أدوات دراسية
            أو بيانات مخصصة في التحديثات المستقبلية.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGoToPdfSummarizer}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-purple-600/30 transition-all hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span>الانتقال لقسم تلخيص الـ PDF (الرئيسي)</span>
          </button>

          <button
            onClick={onManageSections}
            className="inline-flex items-center gap-2 bg-[#1e1548] hover:bg-[#281c60] border border-purple-700/50 text-purple-200 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>إدارة وتوسعة الأقسام</span>
          </button>
        </div>
      </div>
    </div>
  );
};
