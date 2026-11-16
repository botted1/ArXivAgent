export interface PaperAnalysis {
  paperTitle: string;
  arxivId?: string;
  authors?: string[];
  published?: string;
  url?: string;
  wordCount: number;
  coreConcept: {
    problemStatement: string;
    primaryMethodology: string;
    keyBreakthroughs: string;
    plainSummary: string;
  };
  mermaidFlowchart: string;
  flowchartLabeledSegment: string;
  studentOpportunities: StudentOpportunity[];
  usage?: {
    promptTokens: number;
    outputTokens: number;
    totalTokens: number;
    maxConstraint: number;
    efficiencyPercentage: number;
  };
}

export interface StudentOpportunity {
  id: string;
  title: string;
  exactExtension: string;
  targetedMetric: string;
  recommendedTechStack: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedWeeks?: number;
  whyItImpresses?: string;
  resumeBullet?: string;
  milestones?: string[];
}

export interface ProjectScaffold {
  projectSlug: string;
  files: Array<{
    name: string;
    language: string;
    code: string;
  }>;
  interviewPrepQuestions: Array<{
    question: string;
    answerHint: string;
  }>;
}

export interface PresetPaper {
  id: string;
  title: string;
  shortTitle: string;
  authors: string;
  year: number;
  arxivUrl: string;
  badge: string;
  summaryPreview: string;
}
