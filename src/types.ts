export interface OriginalPdfMeta {
  fileName: string;
  fileSizeFormatted: string;
  pageCount?: number;
  detectedTitle: string;
  detectedInstructor?: string;
  detectedSubject?: string;
  lectureNumber?: string;
  dateOrSemester?: string;
  primaryLanguage?: string;
  estimatedReadingTimeMinutes?: number;
  mainThemes: string[];
}

export interface SectionBreakdown {
  sectionNumber: number;
  title: string;
  summary: string;
  keyPoints: string[];
  importantDefinitions?: Array<{ term: string; definition: string }>;
  formulasOrRules?: string[];
  practicalExamples?: string[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
  importance?: string;
}

export interface ReviewQuestion {
  question: string;
  answer: string;
  explanation?: string;
  type?: 'multiple_choice' | 'short_answer' | 'true_false';
  options?: string[];
}

export interface QuizReview {
  questions: ReviewQuestion[];
}

export interface LectureSummaryData {
  originalMeta: OriginalPdfMeta;
  executiveSummary: {
    coreThesis: string;
    keyTakeaways: string[];
  };
  sections: SectionBreakdown[];
  glossary: GlossaryItem[];
  quizAndReview: QuizReview;
  studyAdvice: string[];
  generatedAt: string;
}

export interface SummarizeOptions {
  depth: 'detailed' | 'comprehensive' | 'concise';
  focus: 'general' | 'exam' | 'concepts';
  language: 'ar' | 'en' | 'auto';
}
