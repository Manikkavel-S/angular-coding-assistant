import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiAssistantService } from '../../services/ai-assistant.service';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { SUGGESTED_PROMPT_CARDS } from '../../constants/system-prompt.constant';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatMessageComponent],
  template: `
    <div class="chat-page-container">
      <!-- Chat Sub-Header / Tool Bar -->
      <div class="chat-toolbar">
        <div class="toolbar-left">
          <div class="bot-status-indicator">
            <span class="status-dot"></span>
            <span class="status-title">Angular Assistant Online</span>
            <span class="provider-pill">Mock Engine Ready</span>
          </div>
        </div>
        <div class="toolbar-right">
          <button class="btn btn-secondary btn-sm" (click)="toggleSystemPromptModal()">
            <span>⚙️</span> View System Prompt
          </button>
          <button 
            class="btn btn-danger-outline btn-sm" 
            (click)="clearChat()"
            [disabled]="aiService.messageCount() <= 1 || aiService.isProcessing()"
          >
            <span>🗑️</span> Clear Chat
          </button>
        </div>
      </div>

      <!-- Main Messages Scroll Area -->
      <div class="messages-scroll-area" #scrollContainer>
        <!-- Suggested Prompt Cards Header (Visible at all times or initial) -->
        <div class="suggestions-section">
          <div class="suggestions-header">
            <span class="suggest-icon">💡</span>
            <strong>Try asking:</strong>
          </div>
          <div class="suggested-cards-grid">
            @for (card of suggestedPrompts; track card.id) {
              <button 
                class="suggest-card" 
                (click)="onCardClick(card.title)"
                [disabled]="aiService.isProcessing()"
              >
                <span class="card-category">{{ card.category }}</span>
                <span class="card-title">{{ card.title }}</span>
                <span class="arrow-icon">→</span>
              </button>
            }
          </div>
        </div>

        <!-- Chat Message List -->
        <div class="chat-stream">
          @for (msg of aiService.chatMessages(); track msg.id) {
            <app-chat-message 
              [message]="msg"
              (onPromptClick)="onCardClick($event)"
            ></app-chat-message>
          }
        </div>
      </div>

      <!-- Input Area & Validation Bar -->
      <div class="chat-input-wrapper">
        <!-- Error Bar -->
        @if (aiService.lastError(); as err) {
          <div class="input-error-alert">
            <span>⚠️ {{ err }}</span>
          </div>
        }

        <div class="input-box-container">
          <textarea
            #promptInput
            [(ngModel)]="userInput"
            (keydown)="handleKeyDown($event)"
            placeholder="Ask me anything about Angular development (e.g. Create a standalone login form, explain routing)..."
            [disabled]="aiService.isProcessing()"
            rows="2"
            class="chat-textarea"
          ></textarea>

          <div class="input-actions">
            <span class="key-hint">Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for newline</span>
            <button 
              class="btn btn-primary send-btn" 
              (click)="sendUserMessage()"
              [disabled]="!userInput.trim() || aiService.isProcessing()"
            >
              @if (aiService.isProcessing()) {
                <span class="spinner-small"></span> Generating...
              } @else {
                <span>Send 🚀</span>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- System Prompt Modal -->
      @if (showSystemPromptModal()) {
        <div class="modal-overlay" (click)="toggleSystemPromptModal()">
          <div class="modal-dialog glass-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>⚙️ Active System Prompt</h3>
              <button class="btn-close" (click)="toggleSystemPromptModal()">✕</button>
            </div>
            <div class="modal-body">
              <p class="modal-desc">
                In prompt engineering architecture, the system prompt defines the AI assistant's persona, constraints, behavioral rules, and formatting standards prior to receiving user input.
              </p>
              <div class="code-container">
                <div class="code-header">
                  <span>system-prompt.constant.ts</span>
                  <button class="copy-btn" (click)="copySystemPrompt()">Copy System Prompt</button>
                </div>
                <div class="code-body">
                  <pre><code>{{ aiService.systemPrompt }}</code></pre>
                </div>
              </div>

              <div class="topics-tag-container">
                <strong>Supported Architectural Topics (21):</strong>
                <div class="topics-flex">
                  @for (topic of aiService.supportedTopics; track $index) {
                    <span class="topic-tag-pill">{{ topic }}</span>
                  }
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" (click)="toggleSystemPromptModal()">Close</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .chat-page-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 120px);
      max-width: 1300px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      gap: 0.75rem;
    }

    .chat-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-card);
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-md);
      padding: 0.6rem 1.25rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .bot-status-indicator {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.85rem;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.7; }
    }

    .status-title {
      font-weight: 700;
      color: #f1f5f9;
    }

    .provider-pill {
      font-size: 0.7rem;
      background: rgba(6, 182, 212, 0.15);
      color: #22d3ee;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--font-mono);
    }

    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .messages-scroll-area {
      flex: 1;
      overflow-y: auto;
      background: rgba(13, 19, 31, 0.6);
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .suggestions-section {
      background: rgba(26, 34, 52, 0.5);
      border: 1px dashed rgba(99, 102, 241, 0.3);
      border-radius: var(--radius-md);
      padding: 0.9rem 1rem;
      margin-bottom: 0.5rem;
    }

    .suggestions-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.82rem;
      color: #93c5fd;
      margin-bottom: 0.6rem;
    }

    .suggested-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 0.6rem;
    }

    .suggest-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      background: #131b2c;
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: var(--radius-sm);
      padding: 0.5rem 0.8rem;
      color: var(--text-primary);
      text-align: left;
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: var(--font-sans);
    }

    .suggest-card:hover:not(:disabled) {
      background: #1e293b;
      border-color: rgba(99, 102, 241, 0.5);
      transform: translateY(-1px);
    }

    .card-category {
      font-size: 0.68rem;
      color: #818cf8;
      background: rgba(99, 102, 241, 0.15);
      padding: 1px 5px;
      border-radius: 3px;
      font-weight: 600;
    }

    .card-title {
      font-size: 0.8rem;
      font-weight: 500;
      flex: 1;
      color: #e2e8f0;
    }

    .arrow-icon {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .chat-stream {
      display: flex;
      flex-direction: column;
    }

    .chat-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .input-error-alert {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-md);
      font-size: 0.82rem;
    }

    .input-box-container {
      background: var(--bg-card);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: var(--radius-lg);
      padding: 0.75rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .chat-textarea {
      background: transparent;
      border: none;
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 0.95rem;
      resize: none;
      outline: none;
      width: 100%;
      min-height: 48px;
    }

    .chat-textarea::placeholder {
      color: var(--text-muted);
    }

    .input-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 0.5rem;
    }

    .key-hint {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .key-hint strong {
      color: var(--text-secondary);
    }

    .send-btn {
      padding: 0.5rem 1.25rem;
      font-size: 0.88rem;
    }

    .spinner-small {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 1.5rem;
    }

    .modal-dialog {
      max-width: 720px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      background: #0f172a;
      border: 1px solid rgba(99, 102, 241, 0.4);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 0.75rem;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1.2rem;
      cursor: pointer;
    }

    .btn-close:hover {
      color: #ffffff;
    }

    .modal-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .topics-tag-container {
      margin-top: 1rem;
    }

    .topics-tag-container strong {
      font-size: 0.85rem;
      color: #93c5fd;
      display: block;
      margin-bottom: 0.5rem;
    }

    .topics-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .topic-tag-pill {
      font-size: 0.72rem;
      background: rgba(99, 102, 241, 0.15);
      color: #c7d2fe;
      border: 1px solid rgba(99, 102, 241, 0.25);
      padding: 2px 7px;
      border-radius: 4px;
    }

    .modal-footer {
      margin-top: 1.25rem;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ChatComponent implements AfterViewChecked {
  readonly aiService = inject(AiAssistantService);
  private readonly clipboard = inject(ClipboardService);

  readonly suggestedPrompts = SUGGESTED_PROMPT_CARDS;
  readonly showSystemPromptModal = signal<boolean>(false);
  userInput = '';

  @ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('promptInput') private promptInputElement?: ElementRef<HTMLTextAreaElement>;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      try {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Scroll error:', err);
      }
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendUserMessage();
    }
  }

  async sendUserMessage(): Promise<void> {
    const promptToSend = this.userInput;
    if (!promptToSend.trim() || this.aiService.isProcessing()) {
      return;
    }

    this.userInput = '';
    await this.aiService.sendMessage(promptToSend);
  }

  onCardClick(promptText: string): void {
    this.userInput = promptText;
    if (this.promptInputElement) {
      this.promptInputElement.nativeElement.focus();
    }
    this.sendUserMessage();
  }

  clearChat(): void {
    if (confirm('Are you sure you want to clear the chat history?')) {
      this.aiService.clearChat();
    }
  }

  toggleSystemPromptModal(): void {
    this.showSystemPromptModal.update(v => !v);
  }

  copySystemPrompt(): void {
    this.clipboard.copyToClipboard(this.aiService.systemPrompt, 'System Prompt');
  }
}
