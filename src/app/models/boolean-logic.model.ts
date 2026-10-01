export interface ReasoningStep {
  stepNumber: number;
  subExpression: string;
  operation: string;
  explanation: string;
  intermediateResult: boolean;
}

export interface BooleanExpressionResult {
  rawExpression: string;
  normalizedExpression: string;
  variables: Record<string, boolean>;
  finalResult: boolean;
  reasoningSteps: ReasoningStep[];
  isValid: boolean;
  errorMessage?: string;
  executionTimeMs: number;
}

export interface ExampleProblem {
  title: string;
  expression: string;
  variables: Record<string, boolean>;
  description: string;
}
