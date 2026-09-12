import React, { useState } from 'react';
import { SectionBreakdown } from '../types';
import { BookOpen, CheckCircle, Lightbulb, Calculator, Sparkles, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface Props {
  sections: SectionBreakdown[];
}

export const DetailedSectionsView: React.FC<Props> = ({ sections }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    sections.forEach((s) => {
      initial[s.sectionNumber] = true;
    });
    return initial;
  });

  const toggleSection = (num: number) => {
    setExpandedSections((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    sections.forEach((s) => {
      all[s.sectionNumber] = true;
    });
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keyPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 text-right">
      {/* Controls Bar */}
      <div className="bg-[#160f38]/90 p-4 rounded-2xl border border-purple-800/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="بحث في فصول ونقاط المحاضرة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-xs bg-[#1f164b] border border-purple-700/40 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <Search className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-semibold">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl border border-purple-700/40 bg-[#1e1548] text-purple-200 hover:text-white transition-colors"
          >
            توسيع الكل
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl border border-purple-700/40 bg-[#1e1548] text-purple-200 hover:text-white transition-colors"
          >
            طي الكل
          </button>
          <span className="text-purple-400 mr-2 text-[11px]">
            ({filteredSections.length} من {sections.length} فصول)
          </span>
        </div>
      </div>

      {filteredSections.length === 0 ? (
        <div className="bg-[#160f38] rounded-2xl border border-purple-800/40 p-12 text-center">
          <p className="text-purple-300 text-sm">لا توجد نتائج مطابقة لبحثك في فصول المحاضرة.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSections.map((section) => {
            const isExpanded = expandedSections[section.sectionNumber] ?? true;

            return (
              <div
                key={section.sectionNumber}
                className="bg-[#17103a]/90 rounded-2xl border border-purple-700/40 shadow-md overflow-hidden transition-all duration-200"
              >
                {/* Header */}
                <button
                  onClick={() => toggleSection(section.sectionNumber)}
                  className="w-full flex items-center justify-between p-5 text-right hover:bg-[#1f164d]/60 transition-colors border-b border-transparent focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-600 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                      {section.sectionNumber}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{section.title}</h3>
                      <p className="text-xs text-purple-300/70 mt-0.5">
                        {section.keyPoints?.length || 0} نقاط رئيسية •{' '}
                        {section.importantDefinitions?.length || 0} مصطلحات
                      </p>
                    </div>
                  </div>
                  <div className="p-1 rounded-lg text-purple-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Content */}
                {isExpanded && (
                  <div className="p-6 pt-2 border-t border-purple-900/40 space-y-5">
                    {/* Summary Explanation */}
                    <div className="bg-[#1d1445]/70 rounded-xl p-4 border border-purple-800/30">
                      <h4 className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                        الشرح والتفصيل المنهجي
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed text-purple-100/90 whitespace-pre-line">
                        {section.summary}
                      </p>
                    </div>

                    {/* Key Takeaways Points */}
                    {section.keyPoints && section.keyPoints.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          النقاط الجوهرية والمستفادة:
                        </h4>
                        <ul className="space-y-2">
                          {section.keyPoints.map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-purple-200/90 bg-[#1e1548]/50 p-3 rounded-xl border border-purple-800/30"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Important Definitions */}
                    {section.importantDefinitions && section.importantDefinitions.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          المصطلحات والتعريفات الهامة:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {section.importantDefinitions.map((def, dIdx) => (
                            <div
                              key={dIdx}
                              className="bg-[#21164e]/60 border border-purple-700/40 rounded-xl p-3.5"
                            >
                              <span className="font-bold text-sm text-amber-300 block mb-1">
                                {def.term}
                              </span>
                              <span className="text-xs text-purple-200/80 leading-relaxed block">
                                {def.definition}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Formulas / Rules if present */}
                    {section.formulasOrRules && section.formulasOrRules.length > 0 && (
                      <div className="bg-[#241755]/50 border border-purple-600/40 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-purple-200 mb-2 flex items-center gap-1.5">
                          <Calculator className="w-4 h-4 text-violet-400" />
                          القوانين والمعادلات أو القواعد المنطقية:
                        </h4>
                        <div className="space-y-1.5">
                          {section.formulasOrRules.map((rule, rIdx) => (
                            <div
                              key={rIdx}
                              className="font-mono text-xs bg-[#160e35] px-3 py-2 rounded-lg border border-purple-700/40 text-violet-200 font-semibold"
                            >
                              {rule}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Practical Examples */}
                    {section.practicalExamples && section.practicalExamples.length > 0 && (
                      <div className="bg-[#1a1240]/60 border border-purple-800/40 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-violet-300 mb-2 flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-violet-400" />
                          أمثلة وتطبيقات توضيحية:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-purple-200/80">
                          {section.practicalExamples.map((ex, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2">
                              <span className="text-violet-400 font-bold">•</span>
                              <span className="leading-relaxed">{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
