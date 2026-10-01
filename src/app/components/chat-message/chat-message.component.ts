import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../models/chat-message.model';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-wrapper" [class.user-msg]="message().sender === 'user'" [class.assistant-msg]="message().sender === 'assistant'">
      <!-- Avatar Section -->
      <div class="avatar-container">
        @if (message().sender === 'user') {
          <div class="user-avatar" title="User">
            <span>👤</span>
          </div>
        } @else {
          <div class="bot-avatar" title="Angular AI Assistant">
            <span>🅰️</span>
          </div>
        }
      </div>

      <!-- Content Bubble -->
      <div class="message-content">
        <!-- Message Header -->
        <div class="message-header">
          <span class="sender-name">
            {{ message().sender === 'user' ? 'You (Developer)' : 'Angular Coding Assistant' }}
          </span>
          <span class="timestamp">
            {{ message().timestamp | date:'shortTime' }}
          </span>
          @if (message().structuredResponse?.detectedTopic) {
            <span class="topic-chip">
              🏷️ {{ message().structuredResponse?.detectedTopic }}
            </span>
          }
        </div>

        <!-- Loading State Indicator -->
        @if (message().isLoading) {
          <div class="loading-bubble">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span class="loading-text">Analyzing prompt & synthesizing Angular solution...</span>
          </div>
        }

        <!-- Error State Display -->
        @if (message().isError) {
          <div class="error-box">
            <span class="error-icon">⚠️</span>
            <p>{{ message().text }}</p>
          </div>
        }

        <!-- Standard Message Text / Explanation -->
        @if (!message().isLoading && !message().isError) {
          <div class="message-text">
            @if (message().structuredResponse?.explanation) {
              <p class="explanation-text">{{ message().structuredResponse?.explanation }}</p>
            } @else if (message().text) {
              <p class="plain-text">{{ message().text }}</p>
            }
          </div>

          <!-- Code Block Section -->
          @if (message().structuredResponse?.codeBlock; as codeBlock) {
            <div class="code-container">
              <div class="code-header">
                <div class="code-info">
                  <span class="lang-tag">{{ codeBlock.language }}</span>
                  @if (codeBlock.filename) {
                    <span class="filename-tag">📄 {{ codeBlock.filename }}</span>
                  }
                </div>
                <button 
                  class="copy-btn" 
                  (click)="copyCode(codeBlock.code)"
                  [class.copied]="isCopied()"
                  title="Copy code snippet to clipboard"
                >
                  @if (isCopied()) {
                    <span>✓ Copied!</span>
                  } @else {
                    <span>📋 Copy Code</span>
                  }
                </button>
              </div>
              <div class="code-body">
                <pre><code>{{ codeBlock.code }}</code></pre>
              </div>
            </div>
          }

          <!-- Important Notes Section -->
          @if (message().structuredResponse?.importantNotes && message().structuredResponse?.importantNotes?.length) {
            <div class="notes-container">
              <div class="notes-header">
                <span class="notes-icon">💡</span>
                <strong>Key Architectural Notes & Best Practices:</strong>
              </div>
              <ul class="notes-list">
                @for (note of message().structuredResponse?.importantNotes; track $index) {
                  <li>{{ note }}</li>
                }
              </ul>
            </div>
          }

          <!-- Suggested Follow-ups Chips -->
          @if (message().structuredResponse?.suggestedFollowUps && message().structuredResponse?.suggestedFollowUps?.length) {
            <div class="followups-container">
              <span class="followups-label">Suggested next prompts:</span>
              <div class="followup-pills">
                @for (followUp of message().structuredResponse?.suggestedFollowUps; track $index) {
                  <button class="followup-pill" (click)="onPromptClick.emit(followUp)">
                    {{ followUp }} ↗
                  </button>
                }
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .message-wrapper {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      animation: fadeIn 0.25s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .avatar-container {
      flex-shrink: 0;
    }

    .user-avatar, .bot-avatar {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .user-avatar {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .bot-avatar {
      background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
    }

    .message-content {
      flex: 1;
      max-width: 900px;
      background: var(--bg-card);
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.5rem;
      box-shadow: var(--shadow-sm);
    }

    .user-msg .message-content {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(99, 102, 241, 0.2);
    }

    .message-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
    }

    .sender-name {
      font-weight: 700;
      font-size: 0.88rem;
      color: #f1f5f9;
    }

    .timestamp {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .topic-chip {
      font-size: 0.72rem;
      background: rgba(99, 102, 241, 0.15);
      color: #a5b4fc;
      border: 1px solid rgba(99, 102, 241, 0.25);
      padding: 2px 8px;
      border-radius: var(--radius-full);
    }

    .explanation-text {
      color: #e2e8f0;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .plain-text {
      color: #e2e8f0;
      font-size: 0.95rem;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    .code-container {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      margin: 1rem 0;
      overflow: hidden;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .code-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.78rem;
    }

    .lang-tag {
      color: #38bdf8;
      font-weight: 600;
      text-transform: uppercase;
    }

    .filename-tag {
      color: #94a3b8;
    }

    .copy-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #f1f5f9;
      font-size: 0.76rem;
      font-weight: 600;
      padding: 0.3rem 0.7rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .copy-btn:hover {
      background: #4f46e5;
      border-color: #6366f1;
    }

    .copy-btn.copied {
      background: #059669;
      border-color: #10b981;
    }

    .code-body {
      padding: 1.1rem;
      overflow-x: auto;
    }

    .code-body pre {
      margin: 0;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      line-height: 1.6;
      color: #e2e8f0;
      tab-size: 2;
    }

    .notes-container {
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: var(--radius-md);
      padding: 0.9rem 1.1rem;
      margin-top: 1rem;
    }

    .notes-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: #34d399;
      margin-bottom: 0.5rem;
    }

    .notes-list {
      margin: 0;
      padding-left: 1.25rem;
      color: #cbd5e1;
      font-size: 0.85rem;
    }

    .notes-list li {
      margin-bottom: 0.35rem;
    }

    .followups-container {
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .followups-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
      margin-bottom: 0.4rem;
    }

    .followup-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .followup-pill {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #93c5fd;
      font-size: 0.78rem;
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .followup-pill:hover {
      background: var(--primary-glow);
      border-color: var(--primary-light);
      color: #fff;
    }

    /* Typing indicator */
    .loading-bubble {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 0;
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      background: #6366f1;
      border-radius: 50%;
      animation: bounce 1.2s infinite ease-in-out;
    }
    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
      40% { transform: scale(1); opacity: 1; }
    }

    .loading-text {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-style: italic;
    }

    .error-box {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #f87171;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
    }
  `]
})
export class ChatMessageComponent {
  readonly message = input.required<ChatMessage>();
  readonly onPromptClick = output<string>();

  private readonly clipboard = inject(ClipboardService);
  readonly isCopied = signal<boolean>(false);

  async copyCode(code: string): Promise<void> {
    const success = await this.clipboard.copyToClipboard(code, 'Code snippet');
    if (success) {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    }
  }
}
