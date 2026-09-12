import React from 'react';
import { FileText, User, BookOpen, Calendar, Layers, Clock, HardDrive, CheckCircle2, Tag } from 'lucide-react';
import { OriginalPdfMeta } from '../types';

interface Props {
  meta: OriginalPdfMeta;
  variant?: 'card' | 'document-header';
}

export const OriginalFileInfoCard: React.FC<Props> = ({ meta, variant = 'card' }) => {
  if (variant === 'document-header') {
    return (
      <div className="bg-slate-50 border-2 border-purple-200 rounded-xl p-5 mb-6 text-right">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <span className="text-xs font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
            بيانات وثيقة المحاضرة الأصلية المعتمدة
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>تم استخلاص وتحليل المحتوى الأكاديمي بواسطة الذكاء الاصطناعي</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-0.5">اسم الملف الأصلي:</span>
            <span className="font-semibold text-slate-800 break-all">{meta.fileName}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">المقرر / المادة:</span>
            <span className="font-semibold text-slate-800">{meta.detectedSubject || 'غير محدد'}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">المحاضر / الأستاذ:</span>
            <span className="font-semibold text-slate-800">{meta.detectedInstructor || 'غير محدد'}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">رقم المحاضرة / التاريخ:</span>
            <span className="font-semibold text-slate-800">{meta.lectureNumber || 'محاضرة'} • {meta.dateOrSemester || '-'}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">عدد صفحات الملف الأصلي:</span>
            <span className="font-semibold text-slate-800">{meta.pageCount || 1} صفحة</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">حجم الملف الأصلي:</span>
            <span className="font-semibold text-slate-800">{meta.fileSizeFormatted}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">زمن القراءة المتوقع:</span>
            <span className="font-semibold text-slate-800">{meta.estimatedReadingTimeMinutes || 10} دقيقة</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">لغة المستند:</span>
            <span className="font-semibold text-slate-800">{meta.primaryLanguage === 'ar' ? 'العربية' : meta.primaryLanguage === 'en' ? 'الإنجليزية' : 'مزدوج'}</span>
          </div>
        </div>

        {meta.mainThemes && meta.mainThemes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 ml-2">المحاور الرئيسية:</span>
            {meta.mainThemes.map((theme, idx) => (
              <span key={idx} className="inline-flex items-center text-[11px] bg-white border border-purple-200 text-purple-900 px-2 py-0.5 rounded-md font-medium">
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Dashboard Twilight Card Variant
  return (
    <div className="bg-gradient-to-b from-[#18113c] to-[#120b2e] rounded-2xl border border-purple-700/40 shadow-xl p-6 text-right">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-purple-900/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-900/50 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-1.5 border border-purple-700/40">
            <FileText className="w-3.5 h-3.5 text-violet-400" />
            <span>معلومات ملف المحاضرة الأصلي المرفوع</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
            {meta.detectedTitle || meta.fileName}
          </h2>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/40 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تم استخراج وتضمين البيانات في وثيقة الـ PDF</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3.5 bg-[#1e1548]/70 rounded-xl border border-purple-800/30">
          <div className="flex items-center gap-2 text-purple-300 text-xs mb-1">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span>المقرر والموضوع</span>
          </div>
          <p className="font-semibold text-sm text-white line-clamp-1">{meta.detectedSubject || 'غير محدد في الملف'}</p>
        </div>

        <div className="p-3.5 bg-[#1e1548]/70 rounded-xl border border-purple-800/30">
          <div className="flex items-center gap-2 text-purple-300 text-xs mb-1">
            <User className="w-4 h-4 text-violet-400" />
            <span>المحاضر / الأستاذ</span>
          </div>
          <p className="font-semibold text-sm text-white line-clamp-1">{meta.detectedInstructor || 'غير محدد'}</p>
        </div>

        <div className="p-3.5 bg-[#1e1548]/70 rounded-xl border border-purple-800/30">
          <div className="flex items-center gap-2 text-purple-300 text-xs mb-1">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>رقم المحاضرة والتاريخ</span>
          </div>
          <p className="font-semibold text-sm text-white line-clamp-1">{meta.lectureNumber || 'محاضرة'} • {meta.dateOrSemester || 'الفصل الحالي'}</p>
        </div>

        <div className="p-3.5 bg-[#1e1548]/70 rounded-xl border border-purple-800/30">
          <div className="flex items-center gap-2 text-purple-300 text-xs mb-1">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>الحجم وعدد الصفحات</span>
          </div>
          <p className="font-semibold text-sm text-white">{meta.pageCount || 1} صفحة • {meta.fileSizeFormatted}</p>
        </div>
      </div>

      {meta.mainThemes && meta.mainThemes.length > 0 && (
        <div className="mt-4 pt-3 border-t border-purple-900/40 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-semibold text-purple-300">
            <Tag className="w-3.5 h-3.5" />
            <span>المحاور المستخرجة:</span>
          </div>
          {meta.mainThemes.map((theme, i) => (
            <span key={i} className="text-xs bg-purple-900/40 border border-purple-700/30 text-purple-200 px-2.5 py-1 rounded-lg font-medium">
              {theme}
            </span>
          ))}
          <div className="mr-auto flex items-center gap-1 text-xs text-purple-400">
            <Clock className="w-3.5 h-3.5" />
            <span>قراءة تقديرية: {meta.estimatedReadingTimeMinutes || 10} دقيقة</span>
          </div>
        </div>
      )}
    </div>
  );
};
