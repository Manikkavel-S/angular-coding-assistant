export type MessageSender = 'user' | 'assistant' | 'system';

export interface CodeBlockData {
  language: string;
  code: string;
  filename?: string;
}

export interface CodeResponse {
  explanation: string;
  codeBlock?: CodeBlockData;
  importantNotes?: string[];
  detectedTopic?: string;
  matchedKeywords?: string[];
  suggestedFollowUps?: string[];
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  timestamp: Date;
  rawPrompt?: string;
  combinedPrompt?: string;
  text?: string;
  structuredResponse?: CodeResponse;
  isLoading?: boolean;
  isError?: boolean;
}

export interface AiProvider {
  name: string;
  isMock: boolean;
  processPrompt(userPrompt: string, systemPrompt: string): Promise<CodeResponse>;
}
