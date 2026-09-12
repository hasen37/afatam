import React, { useState } from 'react';
import { QuizReview } from '../types';
import { HelpCircle, Eye, EyeOff, CheckCircle2, Lightbulb, GraduationCap } from 'lucide-react';

interface Props {
  quiz: QuizReview;
  advice?: string[];
}

export const QuizReviewView: React.FC<Props> = ({ quiz, advice }) => {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const revealAll = () => {
    const all: Record<number, boolean> = {};
    quiz.questions.forEach((_, idx) => (all[idx] = true));
    setRevealedAnswers(all);
  };

  const hideAll = () => {
    setRevealedAnswers({});
  };

  return (
    <div className="space-y-6 text-right">
      {/* Header with quick action */}
      <div className="bg-[#160f38]/90 p-5 rounded-2xl border border-purple-800/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-violet-400" />
            بنك الأسئلة والاختبار الذاتي للمحاضرة
          </h3>
          <p className="text-xs text-purple-300/70 mt-1">
            اختبر فهمك لنقاط المحاضرة الرئيسية مع وضع إخفاء الإجابات للاسترجاع النشط
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={revealAll}
            className="px-3 py-1.5 rounded-xl border border-purple-700/40 bg-[#1e1548] text-purple-200 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>إظهار جميع الإجابات</span>
          </button>
          <button
            onClick={hideAll}
            className="px-3 py-1.5 rounded-xl border border-purple-700/40 bg-[#1e1548] text-purple-200 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>إخفاء الكل (وضع الاختبار)</span>
          </button>
        </div>
      </div>

      {/* Study Advice Box */}
      {advice && advice.length > 0 && (
        <div className="bg-gradient-to-r from-[#221650] via-[#1a113d] to-[#150d33] border border-violet-500/40 rounded-2xl p-5 shadow-lg space-y-3">
          <h4 className="text-xs font-bold text-violet-200 uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-violet-300" />
            نصائح وتوجيهات المذاكرة للامتحان:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {advice.map((tip, tIdx) => (
              <div
                key={tIdx}
                className="bg-[#180f3b]/70 border border-purple-800/40 rounded-xl p-3 text-xs text-purple-100/90 leading-relaxed flex items-start gap-2"
              >
                <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-4">
        {quiz.questions.map((q, idx) => {
          const isRevealed = revealedAnswers[idx] ?? false;

          return (
            <div
              key={idx}
              className="bg-[#17103a]/90 rounded-2xl border border-purple-700/40 overflow-hidden shadow-md transition-all hover:border-violet-500/40"
            >
              {/* Question */}
              <div className="p-5 border-b border-purple-900/40 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    س{idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-violet-300 bg-purple-900/60 px-2 py-0.5 rounded border border-purple-700/40 inline-block mb-1.5">
                      سؤال امتحاني متوقع
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                      {q.question}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => toggleAnswer(idx)}
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-violet-200 bg-purple-900/60 hover:bg-purple-800/70 border border-purple-600/40 px-3 py-1.5 rounded-xl transition-all"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>إخفاء</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>كشف الإجابة</span>
                    </>
                  )}
                </button>
              </div>

              {/* Revealed Answer Content */}
              {isRevealed && (
                <div className="p-5 bg-gradient-to-r from-emerald-950/30 via-[#141c30]/50 to-[#120b2e]/80 border-t border-emerald-500/30 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block mb-1">
                        الإجابة النموذجية المعتمدة:
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        {q.answer}
                      </p>
                    </div>
                  </div>

                  {q.explanation && (
                    <div className="text-xs text-purple-200/80 bg-[#161f36]/70 p-3 rounded-xl border border-emerald-900/30 mr-6 leading-relaxed">
                      <strong className="text-purple-100 font-bold ml-1">توضيح إضافي:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
