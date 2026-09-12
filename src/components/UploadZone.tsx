import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Settings2,
} from 'lucide-react';
import { SummarizeOptions } from '../types';

interface Props {
  onStartSummarizing: (payload: {
    pdfBase64?: string;
    rawText?: string;
    fileName: string;
    fileSizeFormatted: string;
    pageCount?: number;
    options: SummarizeOptions;
  }) => void;
  isLoading: boolean;
}

export const UploadZone: React.FC<Props> = ({ onStartSummarizing, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [options, setOptions] = useState<SummarizeOptions>({
    depth: 'comprehensive',
    focus: 'general',
    language: 'ar',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileProcess = (file: File) => {
    setErrorMessage('');
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('يرجى اختيار ملف بصيغة PDF فقط.');
      return;
    }

    if (file.size > 45 * 1024 * 1024) {
      setErrorMessage('حجم الملف كبير جداً (الحد الأقصى 45 ميجابايت).');
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFileBase64(result);
    };
    reader.onerror = () => {
      setErrorMessage('حدث خطأ أثناء قراءة ملف الـ PDF. يرجى المحاولة مرة أخرى.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleTriggerSummary = () => {
    if (selectedFile && fileBase64) {
      onStartSummarizing({
        pdfBase64: fileBase64,
        fileName: selectedFile.name,
        fileSizeFormatted: formatFileSize(selectedFile.size),
        pageCount: 1,
        options,
      });
    } else {
      setErrorMessage('يرجى رفع أو اختيار ملف PDF أولاً لبدء التلخيص.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-right">
      {/* Upload Zone Hero Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? 'border-violet-400 bg-[#251b54]/80 scale-[1.01] shadow-xl shadow-purple-900/40'
            : selectedFile
            ? 'border-emerald-500/70 bg-[#16292b]/60 shadow-lg shadow-emerald-950/40'
            : 'border-purple-600/40 hover:border-violet-400 bg-gradient-to-b from-[#19113d]/90 to-[#120c2e]/90 shadow-xl shadow-purple-950/50 hover:shadow-purple-900/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileProcess(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform ${
              selectedFile
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 scale-110'
                : 'bg-gradient-to-tr from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-600/30'
            }`}
          >
            {selectedFile ? (
              <FileText className="w-8 h-8" />
            ) : (
              <UploadCloud className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg sm:text-xl font-black text-white">
              {selectedFile ? selectedFile.name : 'اسحب وأفلت ملف الـ PDF هنا أو انقر للاختيار'}
            </h3>
            <p className="text-xs text-purple-200/75 max-w-md mx-auto leading-relaxed">
              {selectedFile
                ? `حجم الملف: ${formatFileSize(selectedFile.size)} • جاهز للتحليل واستخراج بيانات الملف الأصلي`
                : 'يدعم ملفات محاضرات الجامعات، السلايدات الطبية والإشعاعية، المذكرات والأبحاث (PDF حتى 45MB)'}
            </p>
          </div>

          {selectedFile ? (
            <div className="inline-flex items-center gap-2 bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تم تجهيز الملف بنجاح! اضغط بالأسفل لبدء التلخيص وتوليد الـ PDF</span>
            </div>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md shadow-purple-600/30 transition-all hover:scale-105"
            >
              <UploadCloud className="w-4 h-4" />
              <span>اختر ملف المحاضرة من جهازك</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 bg-rose-950/60 border border-rose-600/50 rounded-2xl text-xs text-rose-200 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Options Bar */}
      <div className="bg-[#160f38]/90 rounded-2xl border border-purple-800/40 p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Settings2 className="w-4 h-4 text-violet-400" />
          <span>خيارات التلخيص وإعداد وثيقة الـ PDF المطبوعة:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
          {/* Depth */}
          <div>
            <label className="block text-purple-200 font-medium mb-1.5">عمق التلخيص المفضل:</label>
            <select
              value={options.depth}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, depth: e.target.value as any }))
              }
              className="w-full bg-[#1e1548] border border-purple-700/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              <option value="comprehensive">مفصل وشامل جداً (جميع الفصول والنظريات)</option>
              <option value="detailed">مفصل ومتوازن (شرح وافٍ مع نقاط رئيسية)</option>
              <option value="concise">موجز سريع (أهم الأفكار فقط)</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-purple-200 font-medium mb-1.5">لغة ملخص الـ PDF:</label>
            <select
              value={options.language}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, language: e.target.value as any }))
              }
              className="w-full bg-[#1e1548] border border-purple-700/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              <option value="ar">اللغة العربية الفصحى (الأكثر ملاءمة)</option>
              <option value="en">English (اللغة الإنجليزية)</option>
              <option value="auto">تلقائي (نفس لغة وثيقة المحاضرة)</option>
            </select>
          </div>

          {/* Focus */}
          <div>
            <label className="block text-purple-200 font-medium mb-1.5">طبيعة المخرجات الإضافية:</label>
            <select
              value={options.focus}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, focus: e.target.value as any }))
              }
              className="w-full bg-[#1e1548] border border-purple-700/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              <option value="general">شامل (شرح + معجم مصطلحات + أسئلة اختبار)</option>
              <option value="exam">تركيز مكثف على أسئلة الامتحانات والمراجعة</option>
              <option value="concepts">تركيز على المفاهيم والمعادلات والتعاريف</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleTriggerSummary}
          disabled={isLoading || !selectedFile}
          className={`w-full sm:w-auto min-w-[300px] flex items-center justify-center gap-2.5 text-sm font-black py-4 px-8 rounded-2xl text-white shadow-xl transition-all ${
            isLoading || !selectedFile
              ? 'bg-purple-950/60 border border-purple-900/40 text-purple-400/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-purple-500 shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <Sparkles className="w-5 h-5 text-violet-200" />
          <span>
            {isLoading
              ? 'جاري استخراج بيانات المحاضرة وتوليد الملخص...'
              : 'بدء التلخيص وتوليد ملف الـ PDF المنسق'}
          </span>
        </button>
      </div>
    </div>
  );
};
