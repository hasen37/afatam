import React, { useState } from 'react';
import { GlossaryItem } from '../types';
import { BookMarked, Search, Star } from 'lucide-react';

interface Props {
  glossary: GlossaryItem[];
}

export const GlossaryView: React.FC<Props> = ({ glossary }) => {
  const [search, setSearch] = useState('');

  const filtered = glossary.filter(
    (item) =>
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-right">
      {/* Header & Search */}
      <div className="bg-[#160f38]/90 p-5 rounded-2xl border border-purple-800/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-violet-400" />
            معجم المصطلحات والمفاهيم العلمية المستخرجة
          </h3>
          <p className="text-xs text-purple-300/70 mt-1">
            دليل سريع ومفهرس لأبرز المصطلحات والمفردات التخصصية الواردة في المحاضرة
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="ابحث في المصطلحات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2 text-xs bg-[#1f164b] border border-purple-700/40 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <Search className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Terms Grid */}
      {filtered.length === 0 ? (
        <div className="bg-[#160f38] rounded-2xl border border-purple-800/40 p-12 text-center">
          <p className="text-purple-300 text-sm">لا توجد مصطلحات مطابقة للبحث.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#17103a]/90 rounded-2xl border border-purple-700/40 p-5 shadow-md hover:border-violet-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-base text-white">{item.term}</h4>
                  {item.importance && (
                    <span className="text-[10px] font-bold bg-purple-900/60 text-purple-300 border border-purple-700/40 px-2 py-0.5 rounded-full shrink-0">
                      {item.importance}
                    </span>
                  )}
                </div>
                <p className="text-xs text-purple-100/90 leading-relaxed mt-2">
                  {item.definition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-900/40 flex items-center justify-between text-[11px] text-purple-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>مصطلح رئيسي للاختبار</span>
                </span>
                <span className="font-mono text-purple-300">#{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
