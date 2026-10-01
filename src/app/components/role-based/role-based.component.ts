import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../../services/prompt.service';
import { ClipboardService } from '../../services/clipboard.service';
import { RoleType } from '../../models/prompt.model';

@Component({
  selector: 'app-role-based',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="roles-container">
      <!-- Header -->
      <div class="page-header">
        <div class="badge-row">
          <span class="badge badge-secondary">Assignment Task 4</span>
          <span class="badge badge-primary">Role-Based Persona Prompting</span>
        </div>
        <h1>🎭 Role-Based Prompting Architecture</h1>
        <p class="subtitle">
          Role prompting assigns a specific identity, tone, domain knowledge, and behavioral archetype to the model to produce targeted, highly-specialized domain outputs.
        </p>
      </div>

      <!-- Role Selector Tabs -->
      <div class="role-selector-bar glass-card">
        <div class="roles-tabs">
          <button 
            class="role-tab-btn" 
            [class.active]="selectedRole() === 'programmer'"
            (click)="selectRole('programmer')"
          >
            <span class="tab-icon">🅰️</span>
            <div class="tab-text">
              <span class="tab-name">Angular Developer (Programmer)</span>
              <span class="tab-sub">Web Application Engineering</span>
            </div>
          </button>

          <button 
            class="role-tab-btn" 
            [class.active]="selectedRole() === 'teacher'"
            (click)="selectRole('teacher')"
          >
            <span class="tab-icon">🇫🇷</span>
            <div class="tab-text">
              <span class="tab-name">Language Teacher</span>
              <span class="tab-sub">French Phonics & Dialogue</span>
            </div>
          </button>

          <button 
            class="role-tab-btn" 
            [class.active]="selectedRole() === 'marketer'"
            (click)="selectRole('marketer')"
          >
            <span class="tab-icon">☕</span>
            <div class="tab-text">
              <span class="tab-name">Starbucks Marketer</span>
              <span class="tab-sub">Campaigns & Social Copy</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Workspace Grid: Input Configuration & Generated Output -->
      <div class="grid-2 role-workspace-grid">
        <!-- Left: Persona & Requirement Input -->
        <div class="glass-card config-card">
          <div class="card-head">
            <span class="step-badge">Config</span>
            <h3>Role Persona & Requirement</h3>
          </div>

          <!-- Persona Info Box -->
          <div class="persona-info-box">
            <div class="persona-label">Active System Persona:</div>
            <p class="persona-text">"{{ currentRoleDefinition.systemPersona }}"</p>
          </div>

          <!-- Requirement Input -->
          <div class="form-group">
            <label class="form-label" for="requirementInput">
              <span>Task Requirement:</span>
              <button class="sample-link" (click)="loadSampleRequirement()">Load Sample</button>
            </label>
            <textarea
              id="requirementInput"
              [(ngModel)]="requirementInput"
              rows="4"
              class="form-textarea"
              placeholder="Enter your requirement (e.g. Create a student management application)..."
            ></textarea>
          </div>

          <!-- Expected Output Structure -->
          <div class="expected-structure">
            <span class="struct-title">Enforced Output Structure:</span>
            <div class="struct-tags">
              @for (struct of currentRoleDefinition.outputStructure; track $index) {
                <span class="struct-chip">{{ struct }}</span>
              }
            </div>
          </div>

          <button class="btn btn-primary generate-btn" (click)="generateOutput()">
            <span>⚡ Generate Role-Specific Output</span>
          </button>
        </div>

        <!-- Right: Generated Structured Response -->
        <div class="glass-card output-card">
          <div class="card-head">
            <span class="step-badge success">Output</span>
            <h3>Generated Response</h3>
            @if (generatedResult()) {
              <div class="output-actions">
                <button class="btn btn-secondary btn-sm" (click)="copyPrompt()">Copy Prompt</button>
                <button class="btn btn-primary btn-sm" (click)="copyResponse()">Copy Output</button>
              </div>
            }
          </div>

          @if (generatedResult(); as result) {
            <div class="output-content-area">
              <!-- Executed Prompt Snippet -->
              <div class="executed-prompt-box">
                <span class="box-tag">SYNTHESIZED PROMPT</span>
                <p>{{ result.prompt }}</p>
              </div>

              <!-- Formatted Markdown-like Response -->
              <div class="response-rendered">
                <pre class="response-pre"><code>{{ result.response }}</code></pre>
              </div>
            </div>
          } @else {
            <div class="empty-output">
              <span class="empty-icon">🎭</span>
              <h4>Ready to generate</h4>
              <p>Select a role, customize your requirement, and click "Generate Role-Specific Output".</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .roles-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .badge-row {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .page-header h1 {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1rem;
      color: #94a3b8;
      max-width: 900px;
    }

    .roles-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .role-tab-btn {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      background: #0d131f;
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-md);
      padding: 1rem 1.25rem;
      color: var(--text-primary);
      cursor: pointer;
      text-align: left;
      transition: all var(--transition-base);
      font-family: var(--font-sans);
    }

    .role-tab-btn:hover {
      background: #172033;
      border-color: rgba(99, 102, 241, 0.4);
    }

    .role-tab-btn.active {
      background: rgba(99, 102, 241, 0.15);
      border-color: var(--primary-light);
      box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
    }

    .tab-icon {
      font-size: 1.8rem;
    }

    .tab-text {
      display: flex;
      flex-direction: column;
    }

    .tab-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: #f1f5f9;
    }

    .tab-sub {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .role-workspace-grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 1.5rem;
      align-items: start;
    }

    .config-card, .output-card {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .card-head {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      padding-bottom: 0.85rem;
    }

    .card-head h3 {
      font-size: 1.15rem;
      flex: 1;
    }

    .step-badge {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      padding: 2px 7px;
      border-radius: 4px;
    }

    .step-badge.success {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
    }

    .output-actions {
      display: flex;
      gap: 0.5rem;
    }

    .persona-info-box {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      padding: 0.9rem;
    }

    .persona-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: #818cf8;
      margin-bottom: 0.35rem;
      text-transform: uppercase;
    }

    .persona-text {
      font-size: 0.85rem;
      color: #cbd5e1;
      font-style: italic;
      line-height: 1.45;
    }

    .sample-link {
      background: transparent;
      border: none;
      color: #38bdf8;
      font-size: 0.78rem;
      cursor: pointer;
      font-weight: 600;
    }

    .sample-link:hover {
      text-decoration: underline;
    }

    .expected-structure {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .struct-title {
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .struct-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .struct-chip {
      font-size: 0.72rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
      padding: 2px 7px;
      border-radius: 4px;
    }

    .generate-btn {
      width: 100%;
      padding: 0.85rem;
      margin-top: 0.5rem;
    }

    .output-content-area {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .executed-prompt-box {
      background: #090d16;
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: var(--radius-md);
      padding: 0.85rem;
    }

    .box-tag {
      font-size: 0.68rem;
      font-weight: 700;
      color: #a5b4fc;
      display: block;
      margin-bottom: 0.35rem;
    }

    .executed-prompt-box p {
      font-size: 0.82rem;
      color: #94a3b8;
      white-space: pre-wrap;
    }

    .response-rendered {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      max-height: 600px;
      overflow-y: auto;
    }

    .response-pre {
      margin: 0;
      font-family: var(--font-sans);
      white-space: pre-wrap;
      font-size: 0.88rem;
      line-height: 1.6;
      color: #e2e8f0;
    }

    .empty-output {
      padding: 3rem 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .empty-icon {
      font-size: 2.5rem;
    }

    @media (max-width: 900px) {
      .roles-tabs {
        grid-template-columns: 1fr;
      }
      .role-workspace-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RoleBasedComponent {
  readonly promptService = inject(PromptService);
  private readonly clipboard = inject(ClipboardService);

  readonly selectedRole = signal<RoleType>('programmer');
  requirementInput = '';
  readonly generatedResult = signal<{ prompt: string; response: string } | null>(null);

  get currentRoleDefinition() {
    return this.promptService.roleDefinitions[this.selectedRole()];
  }

  constructor() {
    this.loadSampleRequirement();
    this.generateOutput();
  }

  selectRole(role: RoleType): void {
    this.selectedRole.set(role);
    this.loadSampleRequirement();
    this.generateOutput();
  }

  loadSampleRequirement(): void {
    this.requirementInput = this.currentRoleDefinition.sampleRequirement;
  }

  generateOutput(): void {
    const output = this.promptService.generateRoleOutput(this.selectedRole(), this.requirementInput);
    this.generatedResult.set(output);
  }

  copyPrompt(): void {
    if (this.generatedResult()) {
      this.clipboard.copyToClipboard(this.generatedResult()!.prompt, 'Role Prompt');
    }
  }

  copyResponse(): void {
    if (this.generatedResult()) {
      this.clipboard.copyToClipboard(this.generatedResult()!.response, 'Role Output');
    }
  }
}
