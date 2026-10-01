import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <!-- Hero Section -->
      <section class="hero-card glass-card">
        <div class="hero-content">
          <div class="hero-badge-row">
            <span class="badge badge-angular">Angular 22 Standalone</span>
            <span class="badge badge-primary">Prompt Engineering Mini-Project</span>
            <span class="badge badge-success">Zero External UI Dependencies</span>
          </div>
          <h1 class="hero-title">Designing a Prompt-Based AI Assistant</h1>
          <p class="hero-subtitle">
            A comprehensive, production-grade Angular Coding Assistant combining local mock AI inference, role-based persona prompting, Boolean chain-of-thought educational reasoning, prompt optimization, and structured prompt templates.
          </p>

          <div class="student-meta-strip">
            <div class="meta-item">
              <span class="meta-label">Student Name:</span>
              <span class="meta-val">MANIKKAVEL S</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Register Number:</span>
              <span class="meta-val font-mono">811224243033</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Architecture:</span>
              <span class="meta-val">Standalone Components + Signals + Services</span>
            </div>
          </div>

          <div class="hero-actions">
            <a routerLink="/chat" class="btn btn-primary">
              <span>🚀 Launch AI Coding Assistant</span>
            </a>
            <a routerLink="/prompt-library" class="btn btn-secondary">
              <span>📚 Explore 15+ Prompt Library</span>
            </a>
            <a routerLink="/about" class="btn btn-outline">
              <span>📋 Project Documentation</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Assignment Tasks Grid (Task 4, 5, 6, 7 & Mini-Project) -->
      <section class="tasks-section">
        <div class="section-heading">
          <h2>🎯 Assignment Tasks & Core Modules</h2>
          <p>Explore all 5 core modules designed and implemented in this workspace.</p>
        </div>

        <div class="grid-3">
          <!-- Card 1: Coding Assistant (Mini-Project) -->
          <div class="task-card glass-card glass-card-interactive">
            <div class="task-header">
              <span class="task-icon">🤖</span>
              <span class="badge badge-primary">Mini-Project</span>
            </div>
            <h3>Angular Coding Assistant</h3>
            <p>
              Interactive coding assistant with 21 detected topics, standalone code generator, syntax-formatted blocks with one-click copy, and system prompt isolation.
            </p>
            <div class="task-footer">
              <a routerLink="/chat" class="task-link">Open Chat Assistant →</a>
            </div>
          </div>

          <!-- Card 2: Task 4 Role-Based -->
          <div class="task-card glass-card glass-card-interactive">
            <div class="task-header">
              <span class="task-icon">🎭</span>
              <span class="badge badge-secondary">Task 4</span>
            </div>
            <h3>Role-Based Prompts</h3>
            <p>
              Role persona selector with 3 distinct domain outputs: Language Teacher (French), Angular Developer (Programmer), and Starbucks Marketer.
            </p>
            <div class="task-footer">
              <a routerLink="/role-based" class="task-link">Try Role Prompts →</a>
            </div>
          </div>

          <!-- Card 3: Task 5 Boolean Logic -->
          <div class="task-card glass-card glass-card-interactive">
            <div class="task-header">
              <span class="task-icon">⚡</span>
              <span class="badge badge-warning">Task 5</span>
            </div>
            <h3>Boolean Chain-of-Thought</h3>
            <p>
              Safe AST Boolean tokenizer & evaluator displaying step-by-step educational reasoning traces for conjunction, disjunction, and negation without eval.
            </p>
            <div class="task-footer">
              <a routerLink="/boolean-logic" class="task-link">Evaluate Logic Steps →</a>
            </div>
          </div>

          <!-- Card 4: Task 6 Prompt Optimization -->
          <div class="task-card glass-card glass-card-interactive">
            <div class="task-header">
              <span class="task-icon">✨</span>
              <span class="badge badge-angular">Task 6</span>
            </div>
            <h3>Prompt Optimization Demo</h3>
            <p>
              Side-by-side comparison of basic vague prompts versus structured prompts with Role, Context, Tone, Constraints, and Target Audience parameters.
            </p>
            <div class="task-footer">
              <a routerLink="/prompt-optimization" class="task-link">Run Optimizer →</a>
            </div>
          </div>

          <!-- Card 5: Task 7 Prompt Templates -->
          <div class="task-card glass-card glass-card-interactive">
            <div class="task-header">
              <span class="task-icon">📋</span>
              <span class="badge badge-success">Task 7</span>
            </div>
            <h3>Prompt Templates</h3>
            <p>
              Structured form-based prompt generators for Amazon Customer Complaint Emails and Amazon Sales Performance Reports with field validation.
            </p>
            <div class="task-footer">
              <a routerLink="/prompt-templates" class="task-link">Open Templates →</a>
            </div>
          </div>

          <!-- Card 6: Prompt Engineering Guide -->
          <div class="task-card glass-card glass-card-interactive">
            <div class="task-header">
              <span class="task-icon">🧠</span>
              <span class="badge badge-primary">Theory & Guide</span>
            </div>
            <h3>Prompt Engineering Guide</h3>
            <p>
              In-depth breakdown of System Prompts, User Prompts, 5-part prompt architecture, context framing, and best practice constraints.
            </p>
            <div class="task-footer">
              <a routerLink="/prompt-engineering" class="task-link">Read Guide →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- System Architecture & Workflow Flowchart -->
      <section class="workflow-section glass-card">
        <div class="section-heading">
          <h2>📐 Prompt Engineering & AI Execution Workflow</h2>
          <p>Deterministic 5-stage pipeline connecting UI input to structured Angular code generation.</p>
        </div>

        <div class="workflow-steps">
          <div class="wf-step">
            <div class="wf-number">1</div>
            <h4>Input & Validation</h4>
            <p>User enters prompt; checks for non-empty text, length constraints, and sanitization.</p>
          </div>
          <div class="wf-arrow">→</div>
          <div class="wf-step">
            <div class="wf-number">2</div>
            <h4>System Isolation</h4>
            <p>Combines independent System Prompt with User Request into structured payload.</p>
          </div>
          <div class="wf-arrow">→</div>
          <div class="wf-step">
            <div class="wf-number">3</div>
            <h4>Topic Analysis</h4>
            <p>Scans 21 Angular topics (Components, DI, Routing, Reactive Forms, Signals, REST).</p>
          </div>
          <div class="wf-arrow">→</div>
          <div class="wf-step">
            <div class="wf-number">4</div>
            <h4>Inference Engine</h4>
            <p>Executes provider interface logic (Mock Engine or pluggable Gemini/OpenAI API).</p>
          </div>
          <div class="wf-arrow">→</div>
          <div class="wf-step">
            <div class="wf-number">5</div>
            <h4>Structured Output</h4>
            <p>Renders Explanation, Syntax-formatted Code with Copy Button, and Key Best Practice Notes.</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .hero-card {
      background: linear-gradient(135deg, rgba(30, 41, 63, 0.7) 0%, rgba(17, 24, 39, 0.9) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      box-shadow: var(--shadow-lg), var(--shadow-glow);
      padding: 2.5rem;
    }

    .hero-badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
    }

    .hero-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #ffffff 0%, #93c5fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      color: #cbd5e1;
      max-width: 900px;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .student-meta-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      background: rgba(13, 19, 31, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      padding: 0.9rem 1.25rem;
      margin-bottom: 1.75rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
    }

    .meta-label {
      color: var(--text-muted);
    }

    .meta-val {
      font-weight: 700;
      color: #38bdf8;
    }

    .font-mono {
      font-family: var(--font-mono);
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .section-heading {
      margin-bottom: 1.5rem;
    }

    .section-heading h2 {
      font-size: 1.6rem;
      color: #ffffff;
      margin-bottom: 0.25rem;
    }

    .section-heading p {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .task-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .task-icon {
      font-size: 1.8rem;
    }

    .task-card h3 {
      font-size: 1.2rem;
      margin-bottom: 0.6rem;
      color: #f1f5f9;
    }

    .task-card p {
      font-size: 0.88rem;
      line-height: 1.55;
      color: #94a3b8;
      margin-bottom: 1.25rem;
      flex: 1;
    }

    .task-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 0.9rem;
    }

    .task-link {
      color: #818cf8;
      font-weight: 600;
      font-size: 0.88rem;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: color var(--transition-fast);
    }

    .task-link:hover {
      color: #22d3ee;
    }

    /* Workflow layout */
    .workflow-steps {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: 0.75rem;
      overflow-x: auto;
      padding: 1rem 0;
    }

    .wf-step {
      flex: 1;
      min-width: 180px;
      background: #0d131f;
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: var(--radius-md);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .wf-number {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--brand-gradient);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
      margin-bottom: 0.25rem;
    }

    .wf-step h4 {
      font-size: 0.95rem;
      color: #f1f5f9;
    }

    .wf-step p {
      font-size: 0.78rem;
      color: #94a3b8;
      line-height: 1.45;
    }

    .wf-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      color: #6366f1;
    }

    @media (max-width: 900px) {
      .workflow-steps {
        flex-direction: column;
      }
      .wf-arrow {
        transform: rotate(90deg);
        margin: -0.25rem auto;
      }
    }
  `]
})
export class DashboardComponent {}
