import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../../services/prompt.service';
import { ClipboardService } from '../../services/clipboard.service';
import { OptimizedPromptConfig } from '../../models/prompt.model';

@Component({
  selector: 'app-prompt-optimization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="opt-container">
      <!-- Header -->
      <div class="page-header">
        <div class="badge-row">
          <span class="badge badge-angular">Assignment Task 6</span>
          <span class="badge badge-primary">Prompt Optimization & Parameterization</span>
        </div>
        <h1>✨ Prompt Optimization Demonstration Engine</h1>
        <p class="subtitle">
          Transform unstructured, ambiguous prompts into precision-engineered instructions with explicit Persona, Target Audience, Tone, Constraints, and Output Format parameters.
        </p>
      </div>

      <!-- Main Layout: Interactive Configuration Form & Live Side-by-Side Comparison -->
      <div class="grid-2 opt-workspace">
        <!-- Left: Parameter Customization Form -->
        <div class="glass-card form-card">
          <div class="card-head">
            <span class="step-badge">Parameters</span>
            <h3>Prompt Parameter Tuning</h3>
            <button class="reset-link" (click)="resetToDefaults()">Reset Defaults</button>
          </div>

          <!-- Product / Service -->
          <div class="form-group">
            <label class="form-label" for="productInput">
              <span>Product / Service:</span>
              <span class="required">*</span>
            </label>
            <input 
              id="productInput"
              type="text" 
              [(ngModel)]="config.productService" 
              (ngModelChange)="onParamChange()"
              placeholder="e.g. new iced lavender matcha latte"
              class="form-control"
            />
          </div>

          <!-- Target Audience -->
          <div class="form-group">
            <label class="form-label" for="audienceInput">
              <span>Target Audience:</span>
              <span class="required">*</span>
            </label>
            <input 
              id="audienceInput"
              type="text" 
              [(ngModel)]="config.targetAudience" 
              (ngModelChange)="onParamChange()"
              placeholder="e.g. college students aged 18–24"
              class="form-control"
            />
          </div>

          <!-- Campaign Tone -->
          <div class="form-group">
            <label class="form-label" for="toneInput">
              <span>Campaign Tone & Voice:</span>
            </label>
            <select 
              id="toneInput"
              [(ngModel)]="config.campaignTone" 
              (ngModelChange)="onParamChange()"
              class="form-select"
            >
              <option value="energetic, friendly and modern">Energetic, friendly and modern</option>
              <option value="professional, authoritative and data-driven">Professional, authoritative and data-driven</option>
              <option value="inspirational, warm and welcoming">Inspirational, warm and welcoming</option>
              <option value="humorous, catchy and conversational">Humorous, catchy and conversational</option>
              <option value="minimalist, premium and elegant">Minimalist, premium and elegant</option>
            </select>
          </div>

          <!-- Campaign Goal -->
          <div class="form-group">
            <label class="form-label" for="goalInput">
              <span>Campaign Goal:</span>
            </label>
            <input 
              id="goalInput"
              type="text" 
              [(ngModel)]="config.goal" 
              (ngModelChange)="onParamChange()"
              placeholder="e.g. Boost afternoon café visits during finals week"
              class="form-control"
            />
          </div>

          <!-- Constraints -->
          <div class="form-group">
            <label class="form-label" for="constraintsInput">
              <span>Constraints & Rules:</span>
            </label>
            <input 
              id="constraintsInput"
              type="text" 
              [(ngModel)]="config.constraints" 
              (ngModelChange)="onParamChange()"
              placeholder="e.g. Keep under 150 words, include student discount mention"
              class="form-control"
            />
          </div>

          <!-- Output Format -->
          <div class="form-group">
            <label class="form-label" for="formatInput">
              <span>Output Format Structure:</span>
            </label>
            <input 
              id="formatInput"
              type="text" 
              [(ngModel)]="config.outputFormat" 
              (ngModelChange)="onParamChange()"
              placeholder="e.g. campaign headline, short promotional message, call-to-action and social-media caption"
              class="form-control"
            />
          </div>
        </div>

        <!-- Right: Side-by-Side Comparison -->
        <div class="comparison-column">
          <!-- Original Prompt Card -->
          <div class="glass-card prompt-display-card original-card">
            <div class="card-head">
              <span class="badge badge-warning">Original (Basic Prompt)</span>
              <button class="btn btn-secondary btn-sm" (click)="copyOriginal()">
                📋 Copy
              </button>
            </div>
            <div class="prompt-text-box original-box">
              <p>"{{ optimizationResult().originalPrompt }}"</p>
            </div>
            <div class="evaluation-note">
              <span class="eval-tag">⚠️ Limitations:</span>
              <p>Lacks persona context, target demographic, tone constraints, and structural deliverables.</p>
            </div>
          </div>

          <!-- Optimized Prompt Card -->
          <div class="glass-card prompt-display-card optimized-card">
            <div class="card-head">
              <span class="badge badge-success">Optimized (Task 6 Prompt)</span>
              <button class="btn btn-primary btn-sm" (click)="copyOptimized()">
                📋 Copy Optimized Prompt
              </button>
            </div>
            <div class="prompt-text-box optimized-box">
              <p>"{{ optimizationResult().optimizedPrompt }}"</p>
            </div>

            <!-- Breakdown Matrix -->
            <div class="parameter-matrix">
              <span class="matrix-heading">Parameter Breakdown:</span>
              <div class="matrix-grid">
                @for (entry of parameterEntries(); track entry.key) {
                  <div class="matrix-cell">
                    <span class="cell-key">{{ entry.key }}:</span>
                    <span class="cell-val">{{ entry.value }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .opt-container {
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

    .opt-workspace {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 1.5rem;
      align-items: start;
    }

    .form-card {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
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

    .reset-link {
      background: transparent;
      border: none;
      color: #93c5fd;
      font-size: 0.78rem;
      cursor: pointer;
      font-weight: 600;
    }

    .reset-link:hover {
      text-decoration: underline;
    }

    .comparison-column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .prompt-display-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .original-card {
      border-color: rgba(245, 158, 11, 0.3);
    }

    .optimized-card {
      border-color: rgba(16, 185, 129, 0.4);
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
    }

    .prompt-text-box {
      padding: 1rem;
      border-radius: var(--radius-md);
      font-size: 0.92rem;
      line-height: 1.55;
    }

    .original-box {
      background: #10141f;
      border: 1px solid rgba(245, 158, 11, 0.2);
      color: #fcd34d;
      font-style: italic;
    }

    .optimized-box {
      background: #09131a;
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #e2e8f0;
      line-height: 1.6;
    }

    .evaluation-note {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #94a3b8;
    }

    .eval-tag {
      color: #f59e0b;
      font-weight: 700;
      white-space: nowrap;
    }

    .parameter-matrix {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: var(--radius-md);
      padding: 1rem;
    }

    .matrix-heading {
      font-size: 0.78rem;
      font-weight: 700;
      color: #34d399;
      display: block;
      margin-bottom: 0.6rem;
    }

    .matrix-grid {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .matrix-cell {
      display: flex;
      font-size: 0.8rem;
      gap: 0.4rem;
    }

    .cell-key {
      font-weight: 600;
      color: #93c5fd;
      min-width: 130px;
    }

    .cell-val {
      color: #cbd5e1;
    }

    @media (max-width: 900px) {
      .opt-workspace {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PromptOptimizationComponent {
  readonly promptService = inject(PromptService);
  private readonly clipboard = inject(ClipboardService);

  config: OptimizedPromptConfig = {
    productService: 'new beverage',
    targetAudience: 'college students aged 18–24',
    campaignTone: 'energetic, friendly and modern',
    goal: 'Boost campus store engagement during finals week',
    constraints: 'Keep messaging concise, engaging, and suitable for social media',
    outputFormat: 'a campaign headline, short promotional message, call-to-action and social-media caption'
  };

  readonly optimizationResult = signal<{ originalPrompt: string; optimizedPrompt: string; breakdown: Record<string, string> }>(
    this.promptService.generateOptimizedPrompt(this.config)
  );

  onParamChange(): void {
    const res = this.promptService.generateOptimizedPrompt(this.config);
    this.optimizationResult.set(res);
  }

  resetToDefaults(): void {
    this.config = {
      productService: 'new beverage',
      targetAudience: 'college students aged 18–24',
      campaignTone: 'energetic, friendly and modern',
      goal: 'Boost campus store engagement during finals week',
      constraints: 'Keep messaging concise, engaging, and suitable for social media',
      outputFormat: 'a campaign headline, short promotional message, call-to-action and social-media caption'
    };
    this.onParamChange();
  }

  parameterEntries(): { key: string; value: string }[] {
    const breakdown = this.optimizationResult().breakdown;
    return Object.entries(breakdown).map(([key, value]) => ({ key, value }));
  }

  copyOriginal(): void {
    this.clipboard.copyToClipboard(this.optimizationResult().originalPrompt, 'Original Prompt');
  }

  copyOptimized(): void {
    this.clipboard.copyToClipboard(this.optimizationResult().optimizedPrompt, 'Optimized Prompt');
  }
}
