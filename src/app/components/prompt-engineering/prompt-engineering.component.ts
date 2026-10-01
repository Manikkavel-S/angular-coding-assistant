import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
  selector: 'app-prompt-engineering',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pe-container">
      <!-- Page Header -->
      <div class="page-header">
        <div class="badge-row">
          <span class="badge badge-primary">Core Methodology</span>
          <span class="badge badge-angular">Angular Prompt Architecture</span>
        </div>
        <h1>🧠 Prompt Engineering Fundamentals & Optimization</h1>
        <p class="subtitle">
          Mastering prompt engineering principles: System Prompts vs. User Prompts, 5-part anatomical structure, contextual framing, operational constraints, and deterministic outputs.
        </p>
      </div>

      <!-- 1. System Prompt vs User Prompt Comparison -->
      <section class="glass-card section-card">
        <div class="section-title-wrap">
          <span class="icon-bubble">⚖️</span>
          <div>
            <h2>1. System Prompt vs. User Prompt</h2>
            <p>Understanding the dual-layer architecture of modern conversational AI models.</p>
          </div>
        </div>

        <div class="grid-2">
          <div class="compare-card system-card">
            <div class="card-head">
              <span class="badge badge-primary">Layer 1</span>
              <h3>System Prompt (Meta Instructions)</h3>
            </div>
            <p class="compare-desc">
              Immutable behavioral blueprint provided by the application developer before user interaction begins. It sets tone, domain expertise, forbidden actions, output schemas, and response rules.
            </p>
            <div class="code-container">
              <div class="code-header"><span>system_prompt.txt</span></div>
              <div class="code-body">
                <pre><code>"You are an expert Angular Developer and coding assistant. Help users create, understand, debug and improve Angular applications. Provide clear explanations, practical solutions and appropriate TypeScript, HTML and CSS code..."</code></pre>
              </div>
            </div>
            <ul class="prop-list">
              <li>🔒 Defined server-side / application-level</li>
              <li>🛡️ Prevents prompt injection & off-topic drifting</li>
              <li>📐 Standardizes code formatting & output schema</li>
            </ul>
          </div>

          <div class="compare-card user-card">
            <div class="card-head">
              <span class="badge badge-secondary">Layer 2</span>
              <h3>User Prompt (Dynamic Request)</h3>
            </div>
            <p class="compare-desc">
              Variable task instruction supplied dynamically by the end-user or developer requesting a specific component, service, bug fix, or explanation.
            </p>
            <div class="code-container">
              <div class="code-header"><span>user_prompt.txt</span></div>
              <div class="code-body">
                <pre><code>"Create a responsive Angular login page using TypeScript, HTML and CSS with email/password validation and accessible labels."</code></pre>
              </div>
            </div>
            <ul class="prop-list">
              <li>💬 Dynamic and user-controlled</li>
              <li>🎯 Focuses on immediate task requirements</li>
              <li>⚡ Synthesized through the System Prompt filter</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 2. The 5 Core Components of an Optimized Prompt -->
      <section class="glass-card section-card">
        <div class="section-title-wrap">
          <span class="icon-bubble">🧩</span>
          <div>
            <h2>2. Anatomy of a High-Performance Prompt (The 5 Pillars)</h2>
            <p>Every effective prompt contains 5 essential structural components.</p>
          </div>
        </div>

        <div class="pillars-grid">
          <div class="pillar-card">
            <div class="pillar-number">1</div>
            <h4>Role / Persona</h4>
            <p>Explicitly anchors the model to a domain expertise (e.g. <em>"Act as an experienced Angular developer"</em>).</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-number">2</div>
            <h4>Context & Domain</h4>
            <p>Describes the technical environment and dependencies (e.g. <em>"Angular standalone components, Signals, TypeScript"</em>).</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-number">3</div>
            <h4>Specific Task</h4>
            <p>Unambiguous command defining exactly what needs to be created, debugged, or analyzed.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-number">4</div>
            <h4>Constraints & Rules</h4>
            <p>Boundaries that eliminate guesswork (e.g. <em>"Use pure CSS without third-party UI libraries, include form validation"</em>).</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-number">5</div>
            <h4>Output Format</h4>
            <p>Prescribes structure (e.g. <em>"Separate output into Explanation, Component Code, and Key Notes"</em>).</p>
          </div>
        </div>
      </section>

      <!-- 3. Interactive Basic vs Optimized Prompt Breakdown Demo -->
      <section class="glass-card section-card highlight-card">
        <div class="section-title-wrap">
          <span class="icon-bubble">🔍</span>
          <div>
            <h2>3. Basic Prompt vs. Optimized Prompt (Live Demonstration)</h2>
            <p>See the dramatic difference in clarity and code generation quality.</p>
          </div>
        </div>

        <div class="demo-comparison-grid">
          <!-- Basic Vague Prompt -->
          <div class="prompt-comparison-box basic-box">
            <div class="box-head">
              <span class="badge badge-warning">❌ Vague / Basic Prompt</span>
              <button class="copy-link" (click)="copyText(basicPromptText, 'Basic Prompt')">Copy</button>
            </div>
            <div class="prompt-display">
              "{{ basicPromptText }}"
            </div>
            <div class="box-analysis">
              <h5>Why it underperforms:</h5>
              <ul>
                <li>⚠️ No role or expertise defined</li>
                <li>⚠️ Missing technology version / architecture context</li>
                <li>⚠️ No validation or accessibility constraints</li>
                <li>⚠️ Unstructured code output risk</li>
              </ul>
            </div>
          </div>

          <!-- Optimized Prompt -->
          <div class="prompt-comparison-box optimized-box">
            <div class="box-head">
              <span class="badge badge-success">✅ Optimized Production Prompt</span>
              <button class="copy-link" (click)="copyText(optimizedPromptText, 'Optimized Prompt')">Copy</button>
            </div>
            <div class="prompt-display">
              "{{ optimizedPromptText }}"
            </div>
            <div class="box-analysis">
              <h5>Anatomical Breakdown:</h5>
              <div class="breakdown-badges">
                <span class="breakdown-pill"><strong class="pill-title">Role:</strong> Act as an experienced Angular developer</span>
                <span class="breakdown-pill"><strong class="pill-title">Context:</strong> TypeScript, HTML and CSS</span>
                <span class="breakdown-pill"><strong class="pill-title">Features:</strong> Email/password fields, validation messages, login button</span>
                <span class="breakdown-pill"><strong class="pill-title">Constraints:</strong> Accessible labels, clean responsive styling</span>
                <span class="breakdown-pill"><strong class="pill-title">Output:</strong> Component structure explanation + complete code</span>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-cta-row">
          <a routerLink="/chat" class="btn btn-primary">
            <span>💬 Test this Optimized Prompt in Chat →</span>
          </a>
          <a routerLink="/prompt-optimization" class="btn btn-secondary">
            <span>✨ Open Interactive Prompt Optimizer (Task 6) →</span>
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .pe-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2.25rem;
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

    .section-card {
      padding: 2rem;
    }

    .section-title-wrap {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      padding-bottom: 1.25rem;
    }

    .icon-bubble {
      font-size: 2rem;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.3);
      width: 54px;
      height: 54px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .section-title-wrap h2 {
      font-size: 1.45rem;
      color: #ffffff;
      margin-bottom: 0.2rem;
    }

    .section-title-wrap p {
      font-size: 0.88rem;
      color: var(--text-secondary);
    }

    .compare-card {
      background: #0d131f;
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .card-head {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .card-head h3 {
      font-size: 1.1rem;
      color: #f1f5f9;
    }

    .compare-desc {
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.5;
    }

    .prop-list {
      margin: 0;
      padding-left: 1.25rem;
      font-size: 0.82rem;
      color: #cbd5e1;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
    }

    .pillar-card {
      background: #0d131f;
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: relative;
    }

    .pillar-number {
      width: 28px;
      height: 28px;
      background: var(--brand-gradient);
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.85rem;
    }

    .pillar-card h4 {
      font-size: 1rem;
      color: #f1f5f9;
    }

    .pillar-card p {
      font-size: 0.82rem;
      color: #94a3b8;
      line-height: 1.45;
    }

    .highlight-card {
      border-color: rgba(99, 102, 241, 0.4);
      background: linear-gradient(180deg, rgba(22, 30, 46, 0.9) 0%, rgba(13, 19, 31, 0.95) 100%);
    }

    .demo-comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 1.5rem;
      margin-bottom: 1.75rem;
    }

    .prompt-comparison-box {
      background: #090d16;
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .basic-box {
      border-color: rgba(245, 158, 11, 0.3);
    }

    .optimized-box {
      border-color: rgba(16, 185, 129, 0.4);
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.1);
    }

    .box-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .copy-link {
      background: transparent;
      border: none;
      color: #818cf8;
      font-size: 0.78rem;
      cursor: pointer;
      font-weight: 600;
    }

    .copy-link:hover {
      text-decoration: underline;
    }

    .prompt-display {
      font-size: 0.9rem;
      color: #f1f5f9;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.9rem;
      border-radius: var(--radius-sm);
      border-left: 3px solid var(--primary);
      line-height: 1.55;
    }

    .basic-box .prompt-display {
      border-left-color: var(--warning);
      color: #fcd34d;
    }

    .optimized-box .prompt-display {
      border-left-color: var(--success);
    }

    .box-analysis h5 {
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      color: #94a3b8;
    }

    .box-analysis ul {
      margin: 0;
      padding-left: 1.2rem;
      font-size: 0.82rem;
      color: #cbd5e1;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .breakdown-badges {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .breakdown-pill {
      font-size: 0.78rem;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: #cbd5e1;
      padding: 0.35rem 0.65rem;
      border-radius: var(--radius-sm);
    }

    .pill-title {
      color: #34d399;
      margin-right: 0.3rem;
    }

    .demo-cta-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    @media (max-width: 900px) {
      .demo-comparison-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PromptEngineeringComponent {
  private readonly clipboard = inject(ClipboardService);

  readonly basicPromptText = 'Create an Angular login page.';
  readonly optimizedPromptText = 'Act as an experienced Angular developer. Create a responsive Angular login page using TypeScript, HTML and CSS. Include email and password fields, validation messages, a login button, accessible labels and clean responsive styling. Explain the component structure and provide complete code.';

  copyText(text: string, label: string): void {
    this.clipboard.copyToClipboard(text, label);
  }
}
