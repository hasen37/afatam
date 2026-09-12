import React from 'react';
import {
  GraduationCap,
  Menu,
  X,
  Download,
} from 'lucide-react';
import { ActiveSectionId } from './MobileDrawer';

export type NavTab = ActiveSectionId;

interface Props {
  activeSection: ActiveSectionId;
  onSectionChange: (section: ActiveSectionId) => void;
  burgerMenuOpen: boolean;
  setBurgerMenuOpen: (open: boolean) => void;
  hasSummaryResult?: boolean;
  currentSectionTitle?: string;
  onQuickDownloadPdf?: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeSection,
  onSectionChange,
  burgerMenuOpen,
  setBurgerMenuOpen,
  hasSummaryResult = false,
  currentSectionTitle = 'قسم التلخيص',
  onQuickDownloadPdf,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0e0a24]/95 backdrop-blur-md border-b border-purple-900/40 text-slate-100 shadow-xl shadow-purple-950/50 no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Right side (in RTL): The ONE and ONLY Burger Menu Button + Platform Title */}
        <div className="flex items-center gap-3">
          {/* Single Burger Menu Button on the Right */}
          <button
            onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
            className={`flex items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all border focus:outline-none ${
              burgerMenuOpen
                ? 'bg-purple-800/80 border-purple-400/60 text-white shadow-md shadow-purple-600/30'
                : 'bg-purple-950/70 hover:bg-purple-900/60 border-purple-700/50 text-purple-200 hover:text-white shadow-sm'
            }`}
            aria-label="القائمة"
            title="القائمة"
          >
            {burgerMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-violet-300" />
            )}
          </button>

          {/* Platform Branding */}
          <button
            onClick={() => onSectionChange('pdf-summarizer')}
            className="flex items-center gap-2.5 text-right group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-purple-200 transition-colors">
                  منصة التلخيص الذكي
                </span>
              </div>
              <p className="text-[10px] text-purple-300/70 font-medium hidden sm:block">
                قسم تلخيص وثائق الـ PDF والمحاضرات الأكاديمية
              </p>
            </div>
          </button>
        </div>

        {/* Center: Current Section indicator */}
        <div className="hidden md:flex items-center gap-2 bg-[#170f38]/90 border border-purple-700/40 px-3.5 py-1.5 rounded-full text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">{currentSectionTitle}</span>
        </div>

        {/* Left side (in RTL): Quick Actions (No duplicate burger button here!) */}
        <div className="flex items-center gap-2">
          {hasSummaryResult && onQuickDownloadPdf && (
            <button
              onClick={onQuickDownloadPdf}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md shadow-purple-600/25 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تنزيل الـ PDF</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
