import React from 'react';
import {
  FileText,
  X,
  ChevronLeft,
} from 'lucide-react';

export type ActiveSectionId = 'pdf-summarizer' | string;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeSection: ActiveSectionId;
  onSelectSection: (sectionId: ActiveSectionId) => void;
  hasSummaryResult?: boolean;
}

export const MobileDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
  hasSummaryResult = false,
}) => {
  if (!isOpen) return null;

  const handleNav = (id: ActiveSectionId) => {
    onSelectSection(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print" dir="rtl">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050310]/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer content stuck to the RIGHT and opening from the RIGHT */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-gradient-to-b from-[#140e34] via-[#0f0a28] to-[#0a071d] h-full border-l border-purple-800/50 p-5 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-purple-900/50 pb-4 mb-6">
            <div className="text-right">
              <h3 className="text-base font-black text-white">
                القائمة
              </h3>
              <p className="text-[11px] text-purple-300/70 mt-0.5">
                أقسام المنصة الأكاديمية
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 text-purple-200 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="إغلاق القائمة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Only Section: Summarizer (قسم التلخيص) */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-purple-400/90 px-1">
              الأقسام:
            </div>

            {/* Main PDF Summarizer Button */}
            <button
              onClick={() => handleNav('pdf-summarizer')}
              className={`w-full text-right p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                activeSection === 'pdf-summarizer'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 border-purple-400/60 text-white shadow-xl shadow-purple-900/50 ring-1 ring-purple-400/40'
                  : 'bg-[#1b1242]/80 hover:bg-[#231854] border-purple-800/40 text-purple-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    activeSection === 'pdf-summarizer'
                      ? 'bg-white/20 text-white'
                      : 'bg-purple-900/50 text-violet-300 group-hover:text-white'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white">
                      قسم التلخيص
                    </span>
                    {hasSummaryResult && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                        جاهز
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-purple-200/80 mt-0.5">
                    رفع ملفات الـ PDF وتلخيص المحاضرات
                  </p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-white/90 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Drawer Bottom Close Button */}
        <div className="pt-4 border-t border-purple-900/40 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/70 border border-purple-800/40 text-xs font-semibold text-purple-300 hover:text-white transition-all"
          >
            إغلاق القائمة
          </button>
        </div>
      </div>
    </div>
  );
};
