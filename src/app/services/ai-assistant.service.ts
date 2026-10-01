import { Injectable, signal, computed } from '@angular/core';
import { ChatMessage, CodeResponse, AiProvider } from '../models/chat-message.model';
import { SYSTEM_PROMPT, SUPPORTED_TOPICS } from '../constants/system-prompt.constant';
import { MOCK_KNOWLEDGE_BASE } from '../constants/mock-responses.constant';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService implements AiProvider {
  // Provider Metadata
  readonly name = 'Angular Mock AI Engine (Ready for Gemini/OpenAI API)';
  readonly isMock = true;

  // System Prompt encapsulation
  readonly systemPrompt = SYSTEM_PROMPT;
  readonly supportedTopics = SUPPORTED_TOPICS;

  // Reactive State Management
  private readonly _chatMessages = signal<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      timestamp: new Date(),
      text: 'Hello! I am your Angular Coding Assistant. I can help you create standalone components, build reactive forms, design injectable services, configure routing, debug TypeScript errors, and master prompt engineering. Ask me anything about Angular development!',
      structuredResponse: {
        explanation: 'Welcome to the Angular Coding Assistant! Click any suggested prompt card below or enter your own question.',
        importantNotes: [
          'Engineered using Angular standalone architecture and TypeScript.',
          'System Prompt is active and guiding all coding outputs.',
          'Supports interactive prompt templates, role-based prompting, and Boolean reasoning.'
        ],
        suggestedFollowUps: [
          'Create an Angular login form',
          'Create an Angular service',
          'Explain Angular routing',
          'Create a CRUD application'
        ]
      }
    }
  ]);

  private readonly _isProcessing = signal<boolean>(false);
  private readonly _lastError = signal<string | null>(null);

  // Read-only public signals
  readonly chatMessages = this._chatMessages.asReadonly();
  readonly isProcessing = this._isProcessing.asReadonly();
  readonly lastError = this._lastError.asReadonly();
  readonly messageCount = computed(() => this._chatMessages().length);

  /**
   * Primary workflow method:
   * Validates input -> Combines system + user prompt -> Analyzes topics -> Generates structured response
   */
  async sendMessage(rawPrompt: string): Promise<boolean> {
    const trimmed = rawPrompt ? rawPrompt.trim() : '';
    this._lastError.set(null);

    // Step 1: Input Validation
    if (!trimmed) {
      this._lastError.set('Please enter a question or prompt before sending.');
      return false;
    }

    if (trimmed.length > 3000) {
      this._lastError.set('Prompt exceeds the maximum character limit (3000 characters).');
      return false;
    }

    // Step 2: Combine System and User Prompt
    const combinedPrompt = this.constructCombinedPrompt(trimmed);

    // Step 3: Append user message to state
    const userMessageId = crypto.randomUUID();
    const userMessage: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      timestamp: new Date(),
      rawPrompt: trimmed,
      combinedPrompt,
      text: trimmed
    };

    // Step 4: Create pending assistant placeholder message
    const assistantMessageId = crypto.randomUUID();
    const pendingAssistantMessage: ChatMessage = {
      id: assistantMessageId,
      sender: 'assistant',
      timestamp: new Date(),
      isLoading: true
    };

    this._chatMessages.update(messages => [...messages, userMessage, pendingAssistantMessage]);
    this._isProcessing.set(true);

    try {
      // Simulate realistic AI generation latency (500ms - 900ms)
      await new Promise(resolve => setTimeout(resolve, 650));

      // Step 5: Process prompt through AI Engine / Provider
      const response = await this.processPrompt(trimmed, this.systemPrompt);

      // Step 6: Update assistant message with completed structured response
      this._chatMessages.update(messages =>
        messages.map(msg =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                isLoading: false,
                text: response.explanation,
                structuredResponse: response
              }
            : msg
        )
      );

      this._isProcessing.set(false);
      return true;
    } catch (error) {
      console.error('Error generating AI response:', error);
      this._chatMessages.update(messages =>
        messages.map(msg =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                isLoading: false,
                isError: true,
                text: 'An error occurred while generating the response. Please try again.'
              }
            : msg
        )
      );
      this._lastError.set('Failed to generate response. Please check your prompt and try again.');
      this._isProcessing.set(false);
      return false;
    }
  }

  /**
   * Combines system prompt and user input with clear delimiters
   */
  constructCombinedPrompt(userPrompt: string): string {
    return `[SYSTEM PROMPT]\n${this.systemPrompt}\n\n[USER REQUEST]\n${userPrompt}`;
  }

  /**
   * Prompt Processing & Knowledge Retrieval Engine
   */
  async processPrompt(userPrompt: string, systemPrompt: string): Promise<CodeResponse> {
    const lowerPrompt = userPrompt.toLowerCase();

    // 1. Check for Direct Keyword Matches against predefined knowledge base
    if (this.matchesAny(lowerPrompt, ['login form', 'login', 'login page', 'signin', 'sign in'])) {
      return MOCK_KNOWLEDGE_BASE['login-form'];
    }
    if (this.matchesAny(lowerPrompt, ['registration form', 'register form', 'registration', 'register', 'sign up', 'signup'])) {
      return MOCK_KNOWLEDGE_BASE['registration-form'];
    }
    if (this.matchesAny(lowerPrompt, ['create service', 'service', 'injectable service', 'notification service', 'state service'])) {
      return MOCK_KNOWLEDGE_BASE['create-service'];
    }
    if (this.matchesAny(lowerPrompt, ['explain routing', 'routing', 'router', 'routes', 'navigation menu', 'route guard'])) {
      return MOCK_KNOWLEDGE_BASE['explain-routing'];
    }
    if (this.matchesAny(lowerPrompt, ['crud', 'crud app', 'crud application', 'student management', 'create read update delete'])) {
      return MOCK_KNOWLEDGE_BASE['crud-app'];
    }
    if (this.matchesAny(lowerPrompt, ['explain data binding', 'data binding', 'interpolation', 'event binding', 'property binding', 'two way binding', 'banana in a box'])) {
      return MOCK_KNOWLEDGE_BASE['explain-data-binding'];
    }
    if (this.matchesAny(lowerPrompt, ['dependency injection', 'explain di', 'how does dependency injection work', 'inject()', 'injector'])) {
      return MOCK_KNOWLEDGE_BASE['explain-di'];
    }
    if (this.matchesAny(lowerPrompt, ['lifecycle', 'lifecycle hooks', 'ngoninit', 'ngondestroy', 'ngonchanges', 'explain lifecycle hooks'])) {
      return MOCK_KNOWLEDGE_BASE['lifecycle-hooks'];
    }
    if (this.matchesAny(lowerPrompt, ['http', 'httpclient', 'rest api', 'api request', 'get post', 'rest', 'fakestore'])) {
      return MOCK_KNOWLEDGE_BASE['http-request'];
    }
    if (this.matchesAny(lowerPrompt, ['fix typescript error', 'ts error', 'typescript error', 'property does not exist', 'ts2339', 'debug'])) {
      return MOCK_KNOWLEDGE_BASE['fix-ts-error'];
    }
    if (this.matchesAny(lowerPrompt, ['reusable button', 'button component', 'reusable component', 'custom button'])) {
      return MOCK_KNOWLEDGE_BASE['reusable-button'];
    }
    if (this.matchesAny(lowerPrompt, ['create component', 'component', 'standalone component', 'user profile'])) {
      return MOCK_KNOWLEDGE_BASE['create-component'];
    }

    // 2. Topic Detection Layer across all 21 topics
    const detectedTopics = this.analyzeTopics(lowerPrompt);

    // 3. Dynamic Knowledge Synthesizer for arbitrary user prompts
    return this.generateDynamicResponse(userPrompt, detectedTopics);
  }

  /**
   * Topic Analysis Engine
   */
  private analyzeTopics(promptText: string): string[] {
    const matched: string[] = [];
    for (const topic of SUPPORTED_TOPICS) {
      if (promptText.includes(topic.toLowerCase())) {
        matched.push(topic);
      }
    }
    return matched.length > 0 ? matched : ['General Angular Architecture'];
  }

  private matchesAny(text: string, keywords: string[]): boolean {
    return keywords.some(kw => text.includes(kw));
  }

  /**
   * Fallback Generator for custom/unknown prompts
   */
  private generateDynamicResponse(prompt: string, detectedTopics: string[]): CodeResponse {
    const topicSummary = detectedTopics.join(', ');
    const safeTitle = prompt.length > 40 ? prompt.substring(0, 40) + '...' : prompt;

    return {
      detectedTopic: topicSummary,
      matchedKeywords: detectedTopics,
      explanation: `I have analyzed your request: "${prompt}". Based on your prompt, I have identified key Angular concepts related to ${topicSummary}. Here is a tailored, production-ready solution adhering to modern Angular best practices, standalone components, and strong TypeScript typings.`,
      codeBlock: {
        language: 'typescript',
        filename: 'angular-solution.component.ts',
        code: `import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Custom Solution for: ${safeTitle}
 * Architectural topics identified: ${topicSummary}
 */
@Component({
  selector: 'app-custom-solution',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <section class="solution-container">
      <header class="solution-header">
        <h2>Angular Solution</h2>
        <span class="topic-tag">${topicSummary}</span>
      </header>
      
      <div class="solution-content">
        <p>Dynamic state value: <strong>{{ computedMessage() }}</strong></p>
        <button class="btn-action" (click)="performAction()">
          Trigger Angular Action
        </button>
      </div>
    </section>
  \`,
  styles: [\`
    .solution-container {
      padding: 1.5rem;
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #f3f4f6;
    }
    .topic-tag {
      font-size: 0.75rem;
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      padding: 4px 10px;
      border-radius: 999px;
    }
    .btn-action {
      margin-top: 1rem;
      background: #6366f1;
      color: white;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  \`]
})
export class CustomSolutionComponent {
  // Reactive Signal State
  readonly query = signal('${prompt.replace(/'/g, "\\'")}');
  readonly clickCounter = signal(0);
  
  // Computed Signal derivation
  readonly computedMessage = computed(() => 
    \`\${this.query()} (Actions executed: \${this.clickCounter()})\`
  );

  performAction(): void {
    this.clickCounter.update(count => count + 1);
    console.log('Angular custom action executed for:', this.query());
  }
}`
      },
      importantNotes: [
        `Request analyzed against System Prompt standards and detected topic area: ${topicSummary}.`,
        'Leverages Angular standalone components with signal-based reactivity.',
        'Modular and ready to be integrated directly into your workspace.'
      ],
      suggestedFollowUps: [
        'How do I test this component with Angular testing utilities?',
        'How to integrate this with an Angular service?',
        'Explain Angular routing'
      ]
    };
  }

  /**
   * Resets chat history to default state
   */
  clearChat(): void {
    this._chatMessages.set([
      {
        id: 'cleared-welcome-msg',
        sender: 'assistant',
        timestamp: new Date(),
        text: 'Chat history has been cleared. Ask me anything about Angular development!'
      }
    ]);
    this._lastError.set(null);
  }
}
