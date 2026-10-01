import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooleanLogicService } from '../../services/boolean-logic.service';
import { BooleanExpressionResult, ExampleProblem } from '../../models/boolean-logic.model';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
  selector: 'app-boolean-logic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="logic-container">
      <!-- Header -->
      <div class="page-header">
        <div class="badge-row">
          <span class="badge badge-warning">Assignment Task 5</span>
          <span class="badge badge-primary">Chain-of-Thought (CoT) Reasoning</span>
        </div>
        <h1>⚡ Chain-of-Thought Prompting: Boolean Logic Engine</h1>
        <p class="subtitle">
          Demonstrates structured step-by-step educational reasoning for complex logical expressions. Parses and breaks down Boolean operations into transparent intermediate sub-evaluations without exposing internal prompt state.
        </p>
      </div>

      <!-- Preset Example Loaders -->
      <div class="presets-card glass-card">
        <div class="presets-header">
          <span class="preset-icon">💡</span>
          <strong>Preset Example Problems (1-Click Load):</strong>
        </div>
        <div class="preset-buttons-grid">
          @for (ex of logicService.presetExamples; track ex.title) {
            <button class="preset-btn" (click)="loadPreset(ex)">
              <span class="preset-title">{{ ex.title }}</span>
              <span class="preset-expr">{{ ex.expression }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Main Layout: Inputs & Evaluation Stream -->
      <div class="grid-2 logic-workspace">
        <!-- Left Column: Variables & Expression Builder -->
        <div class="glass-card builder-card">
          <div class="card-head">
            <span class="step-badge">Inputs</span>
            <h3>Logical Expression & Variables</h3>
          </div>

          <!-- Variables Configuration Panel -->
          <div class="variables-panel">
            <span class="panel-label">Variable Truth Values:</span>
            <div class="variables-grid">
              <div class="var-toggle-card">
                <span class="var-name">Variable A</span>
                <button 
                  class="toggle-btn" 
                  [class.is-true]="varA"
                  [class.is-false]="!varA"
                  (click)="toggleVar('A')"
                >
                  {{ varA ? 'TRUE (1)' : 'FALSE (0)' }}
                </button>
              </div>

              <div class="var-toggle-card">
                <span class="var-name">Variable B</span>
                <button 
                  class="toggle-btn" 
                  [class.is-true]="varB"
                  [class.is-false]="!varB"
                  (click)="toggleVar('B')"
                >
                  {{ varB ? 'TRUE (1)' : 'FALSE (0)' }}
                </button>
              </div>

              <div class="var-toggle-card">
                <span class="var-name">Variable C</span>
                <button 
                  class="toggle-btn" 
                  [class.is-true]="varC"
                  [class.is-false]="!varC"
                  (click)="toggleVar('C')"
                >
                  {{ varC ? 'TRUE (1)' : 'FALSE (0)' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Expression Input Form -->
          <div class="form-group">
            <label class="form-label" for="expressionInput">
              <span>Boolean Expression:</span>
              <span class="syntax-hint">Operators: AND, OR, NOT, XOR, ()</span>
            </label>
            <input 
              id="expressionInput"
              type="text" 
              [(ngModel)]="expressionText" 
              (ngModelChange)="evaluateExpression()"
              placeholder="e.g. (A AND B) OR (NOT C)"
              class="form-control font-mono"
            />
          </div>

          <!-- Operator Quick Insert Buttons -->
          <div class="operator-helpers">
            <span class="helpers-label">Insert Operator:</span>
            <div class="btn-group">
              <button class="btn btn-secondary btn-sm font-mono" (click)="insertToken(' AND ')">AND</button>
              <button class="btn btn-secondary btn-sm font-mono" (click)="insertToken(' OR ')">OR</button>
              <button class="btn btn-secondary btn-sm font-mono" (click)="insertToken('NOT ')">NOT</button>
              <button class="btn btn-secondary btn-sm font-mono" (click)="insertToken(' XOR ')">XOR</button>
              <button class="btn btn-secondary btn-sm font-mono" (click)="insertToken('(')">(</button>
              <button class="btn btn-secondary btn-sm font-mono" (click)="insertToken(')')">)</button>
            </div>
          </div>

          <!-- Safety & Engine Details -->
          <div class="security-note">
            <span class="sec-icon">🛡️</span>
            <div>
              <strong>Safe AST Execution:</strong>
              <p>Evaluated using a custom recursive-descent parser. Zero JavaScript <code>eval()</code> or unsafe code execution.</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Step-by-Step Chain-of-Thought Reasoning Output -->
        <div class="glass-card result-card">
          <div class="card-head">
            <span class="step-badge success">Evaluation</span>
            <h3>Educational Chain-of-Thought Trace</h3>
            @if (evalResult()?.isValid) {
              <button class="btn btn-secondary btn-sm" (click)="copyReasoningTrace()">
                📋 Copy Steps
              </button>
            }
          </div>

          @if (evalResult(); as result) {
            @if (result.isValid) {
              <!-- Final Result Banner -->
              <div class="final-result-banner" [class.result-true]="result.finalResult" [class.result-false]="!result.finalResult">
                <div class="banner-left">
                  <span class="result-label">FINAL RESULT:</span>
                  <span class="result-value">{{ result.finalResult ? 'TRUE' : 'FALSE' }}</span>
                </div>
                <div class="banner-meta">
                  <span>Expression: <code>{{ result.normalizedExpression }}</code></span>
                  <span class="perf-tag">⚡ {{ result.executionTimeMs }}ms</span>
                </div>
              </div>

              <!-- Numbered Educational Steps -->
              <div class="steps-container">
                <span class="steps-heading">Educational Step-by-Step Reasoning:</span>
                <div class="steps-list">
                  @for (step of result.reasoningSteps; track step.stepNumber) {
                    <div class="step-item">
                      <div class="step-badge-num">{{ step.stepNumber }}</div>
                      <div class="step-body">
                        <div class="step-top">
                          <span class="sub-expr font-mono">{{ step.subExpression }}</span>
                          <span class="op-tag">{{ step.operation }}</span>
                        </div>
                        <p class="step-expl">{{ step.explanation }}</p>
                      </div>
                      <div class="step-outcome" [class.true-val]="step.intermediateResult" [class.false-val]="!step.intermediateResult">
                        {{ step.intermediateResult ? 'true' : 'false' }}
                      </div>
                    </div>
                  }
                </div>
              </div>
            } @else {
              <!-- Syntax Error Display -->
              <div class="syntax-error-card">
                <span class="error-big-icon">⚠️</span>
                <h4>Invalid Boolean Syntax</h4>
                <p class="error-msg-text">{{ result.errorMessage }}</p>
                <span class="fix-tip">Tip: Check for balanced parentheses and valid variables (A, B, C).</span>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .logic-container {
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

    .presets-card {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .presets-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: #fcd34d;
    }

    .preset-buttons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 0.6rem;
    }

    .preset-btn {
      background: #0d131f;
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-sm);
      padding: 0.6rem 0.8rem;
      color: var(--text-primary);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      transition: all var(--transition-fast);
      font-family: var(--font-sans);
    }

    .preset-btn:hover {
      background: #1a2333;
      border-color: rgba(99, 102, 241, 0.4);
      transform: translateY(-1px);
    }

    .preset-title {
      font-size: 0.78rem;
      font-weight: 600;
      color: #93c5fd;
    }

    .preset-expr {
      font-size: 0.72rem;
      color: #cbd5e1;
      font-family: var(--font-mono);
    }

    .logic-workspace {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 1.5rem;
      align-items: start;
    }

    .builder-card, .result-card {
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

    .variables-panel {
      background: #0d131f;
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-md);
      padding: 1rem;
    }

    .panel-label {
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 600;
      display: block;
      margin-bottom: 0.6rem;
    }

    .variables-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.6rem;
    }

    .var-toggle-card {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      align-items: center;
    }

    .var-name {
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 600;
    }

    .toggle-btn {
      width: 100%;
      padding: 0.5rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all var(--transition-fast);
      font-family: var(--font-mono);
    }

    .toggle-btn.is-true {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.4);
    }

    .toggle-btn.is-false {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.4);
    }

    .syntax-hint {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .operator-helpers {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .helpers-label {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .btn-group {
      display: flex;
      gap: 0.35rem;
      flex-wrap: wrap;
    }

    .security-note {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(6, 182, 212, 0.08);
      border: 1px solid rgba(6, 182, 212, 0.2);
      border-radius: var(--radius-md);
      padding: 0.75rem 0.9rem;
      font-size: 0.78rem;
      color: #cbd5e1;
    }

    .sec-icon {
      font-size: 1.2rem;
    }

    .final-result-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem;
      border-radius: var(--radius-md);
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .result-true {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%);
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .result-false {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%);
      border: 1px solid rgba(239, 68, 68, 0.4);
    }

    .result-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-secondary);
      display: block;
    }

    .result-value {
      font-size: 1.8rem;
      font-weight: 800;
      font-family: var(--font-mono);
    }

    .result-true .result-value {
      color: #34d399;
      text-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
    }

    .result-false .result-value {
      color: #f87171;
      text-shadow: 0 0 12px rgba(239, 68, 68, 0.5);
    }

    .banner-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
      font-size: 0.8rem;
    }

    .banner-meta code {
      background: rgba(0, 0, 0, 0.3);
      padding: 2px 6px;
      border-radius: 4px;
      color: #f1f5f9;
    }

    .perf-tag {
      font-size: 0.72rem;
      color: #a5b4fc;
    }

    .steps-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .steps-heading {
      font-size: 0.82rem;
      font-weight: 700;
      color: #93c5fd;
    }

    .steps-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .step-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #0d131f;
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-sm);
      padding: 0.75rem 0.9rem;
    }

    .step-badge-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.25);
      color: #818cf8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.75rem;
      flex-shrink: 0;
    }

    .step-body {
      flex: 1;
    }

    .step-top {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.2rem;
    }

    .sub-expr {
      font-size: 0.82rem;
      color: #f1f5f9;
    }

    .op-tag {
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.06);
      color: #a5b4fc;
      padding: 1px 5px;
      border-radius: 3px;
    }

    .step-expl {
      font-size: 0.78rem;
      color: #94a3b8;
    }

    .step-outcome {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .true-val {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
    }

    .false-val {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }

    .syntax-error-card {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: var(--radius-md);
      padding: 1.75rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .error-big-icon {
      font-size: 2.2rem;
    }

    .syntax-error-card h4 {
      color: #fca5a5;
    }

    .error-msg-text {
      color: #fecaca;
      font-size: 0.88rem;
    }

    .fix-tip {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    @media (max-width: 900px) {
      .logic-workspace {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BooleanLogicComponent {
  readonly logicService = inject(BooleanLogicService);
  private readonly clipboard = inject(ClipboardService);

  varA = true;
  varB = false;
  varC = true;
  expressionText = '(A AND B) OR (NOT C)';

  readonly evalResult = signal<BooleanExpressionResult | null>(null);

  constructor() {
    this.evaluateExpression();
  }

  toggleVar(name: 'A' | 'B' | 'C'): void {
    if (name === 'A') this.varA = !this.varA;
    if (name === 'B') this.varB = !this.varB;
    if (name === 'C') this.varC = !this.varC;
    this.evaluateExpression();
  }

  evaluateExpression(): void {
    const variables = {
      A: this.varA,
      B: this.varB,
      C: this.varC
    };
    const result = this.logicService.evaluate(this.expressionText, variables);
    this.evalResult.set(result);
  }

  loadPreset(example: ExampleProblem): void {
    this.expressionText = example.expression;
    if (example.variables['A'] !== undefined) this.varA = example.variables['A'];
    if (example.variables['B'] !== undefined) this.varB = example.variables['B'];
    if (example.variables['C'] !== undefined) this.varC = example.variables['C'];
    this.evaluateExpression();
  }

  insertToken(token: string): void {
    this.expressionText += token;
    this.evaluateExpression();
  }

  copyReasoningTrace(): void {
    const res = this.evalResult();
    if (res && res.isValid) {
      const formatted = `Boolean Expression: ${res.normalizedExpression}\nVariables: A=${this.varA}, B=${this.varB}, C=${this.varC}\nFinal Result: ${res.finalResult ? 'TRUE' : 'FALSE'}\n\nStep-by-step Reasoning Trace:\n` +
        res.reasoningSteps.map(s => `${s.stepNumber}. [${s.operation}] ${s.subExpression} -> ${s.explanation} (Result: ${s.intermediateResult})`).join('\n');
      this.clipboard.copyToClipboard(formatted, 'Chain-of-Thought Reasoning');
    }
  }
}
