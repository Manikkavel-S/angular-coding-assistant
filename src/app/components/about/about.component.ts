import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AiAssistantService } from '../../services/ai-assistant.service';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="about-container">
      <!-- Profile Hero Card -->
      <section class="glass-card student-hero-card">
        <div class="profile-header">
          <div class="avatar-box">
            <span>👨‍💻</span>
          </div>
          <div class="profile-text">
            <div class="badge-row">
              <span class="badge badge-primary">Department of Artificial Intelligence & Data Science (B.Tech)</span>
              <span class="badge badge-angular">Autonomous Mini-Project</span>
            </div>
            <h1>MANIKKAVEL S</h1>
            <div class="reg-strip">
              <span class="reg-label">Register Number:</span>
              <span class="reg-highlight font-mono">811224243033</span>
            </div>
            <p class="project-tagline">
              <strong>Project:</strong> Angular Coding Assistant – <em>"Prompt-Based AI Assistant for Angular Development"</em>
            </p>
          </div>
        </div>
      </section>

      <!-- Assignment Task Mapping Table -->
      <section class="glass-card section-card">
        <div class="section-title">
          <span class="section-icon">📑</span>
          <div>
            <h2>Assignment Task Coverage & Route Mapping</h2>
            <p>Direct mapping between the college assignment specifications and implemented application routes.</p>
          </div>
        </div>

        <div class="table-responsive">
          <table class="mapping-table">
            <thead>
              <tr>
                <th>Task Identifier</th>
                <th>Assignment Requirement</th>
                <th>Implemented Module & Route</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mini-Project</strong></td>
                <td>Prompt-Based AI Coding Assistant with standalone code generation & topic detection</td>
                <td><code>/chat</code>, <code>/prompt-library</code></td>
                <td><span class="badge badge-success">Completed & Tested</span></td>
                <td><a routerLink="/chat" class="table-link">Open Chat →</a></td>
              </tr>
              <tr>
                <td><strong>Task 4</strong></td>
                <td>Role-based prompts (Language Teacher, Angular Programmer, Starbucks Marketer)</td>
                <td><code>/role-based</code></td>
                <td><span class="badge badge-success">Completed & Tested</span></td>
                <td><a routerLink="/role-based" class="table-link">Open Roles →</a></td>
              </tr>
              <tr>
                <td><strong>Task 5</strong></td>
                <td>Chain-of-Thought prompting for Boolean Logic with safe AST reasoning traces</td>
                <td><code>/boolean-logic</code></td>
                <td><span class="badge badge-success">Completed & Tested</span></td>
                <td><a routerLink="/boolean-logic" class="table-link">Open CoT Logic →</a></td>
              </tr>
              <tr>
                <td><strong>Task 6</strong></td>
                <td>Prompt optimization demo with side-by-side comparison & parameter tuning</td>
                <td><code>/prompt-optimization</code></td>
                <td><span class="badge badge-success">Completed & Tested</span></td>
                <td><a routerLink="/prompt-optimization" class="table-link">Open Optimizer →</a></td>
              </tr>
              <tr>
                <td><strong>Task 7</strong></td>
                <td>Structured prompt templates for Amazon Complaint Email & Sales Performance Report</td>
                <td><code>/prompt-templates</code></td>
                <td><span class="badge badge-success">Completed & Tested</span></td>
                <td><a routerLink="/prompt-templates" class="table-link">Open Templates →</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Architecture & Tech Stack Grid -->
      <div class="grid-2">
        <!-- Tech Stack Card -->
        <div class="glass-card section-card">
          <div class="section-title">
            <span class="section-icon">⚙️</span>
            <div>
              <h3>Technologies & Architecture</h3>
              <p>Built with zero third-party UI framework bloat.</p>
            </div>
          </div>

          <ul class="tech-list">
            <li><strong>Core Framework:</strong> Angular (Latest Stable CLI, Standalone Components)</li>
            <li><strong>Language:</strong> TypeScript 5.9+ with strict type checking</li>
            <li><strong>Styling:</strong> Pure Vanilla CSS with CSS Custom Properties and Glassmorphism</li>
            <li><strong>State Management:</strong> Angular Signals (<code>signal</code>, <code>computed</code>, <code>effect</code>)</li>
            <li><strong>AI Architecture:</strong> Extensible <code>AiProvider</code> interface with Local Mock Engine (Zero API Keys required, 100% free & reproducible)</li>
            <li><strong>Parser:</strong> Safe AST Recursive-Descent Boolean Parser (No <code>eval()</code>)</li>
            <li><strong>Unit Testing:</strong> Native Angular test runner with comprehensive service suites</li>
          </ul>
        </div>

        <!-- System Prompt & Security -->
        <div class="glass-card section-card">
          <div class="section-title">
            <span class="section-icon">🛡️</span>
            <div>
              <h3>Prompt Engineering Design Standards</h3>
              <p>Separation of concerns between System Prompt & UI.</p>
            </div>
          </div>

          <div class="pe-standards">
            <div class="pe-item">
              <strong>1. System Prompt Isolation:</strong>
              <p>System instructions are stored in independent constants and injected strictly via <code>AiAssistantService</code>, not hardcoded inside component templates.</p>
            </div>
            <div class="pe-item">
              <strong>2. Topic Analysis Layer:</strong>
              <p>Detects 21 distinct Angular development topics and routes requests to appropriate architectural modules.</p>
            </div>
            <div class="pe-item">
              <strong>3. Pluggable AI Provider Interface:</strong>
              <p>Enables dropping in live Gemini 1.5/2.0 Flash or OpenAI API keys in production without changing a single line of UI code.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .student-hero-card {
      background: linear-gradient(135deg, rgba(30, 41, 63, 0.8) 0%, rgba(17, 24, 39, 0.95) 100%);
      border: 1px solid rgba(99, 102, 241, 0.35);
      padding: 2.25rem;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      flex-wrap: wrap;
    }

    .avatar-box {
      width: 80px;
      height: 80px;
      border-radius: var(--radius-lg);
      background: var(--brand-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
    }

    .profile-text {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .profile-text h1 {
      font-size: 2rem;
      color: #ffffff;
      margin: 0.2rem 0;
    }

    .reg-strip {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
    }

    .reg-label {
      color: var(--text-muted);
    }

    .reg-highlight {
      color: #38bdf8;
      font-weight: 800;
    }

    .project-tagline {
      font-size: 0.95rem;
      color: #cbd5e1;
    }

    .project-tagline strong {
      color: #93c5fd;
    }

    .section-card {
      padding: 1.75rem;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      padding-bottom: 0.75rem;
    }

    .section-icon {
      font-size: 1.6rem;
    }

    .section-title h2, .section-title h3 {
      font-size: 1.25rem;
      color: #ffffff;
    }

    .section-title p {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }

    .table-responsive {
      overflow-x: auto;
    }

    .mapping-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
    }

    .mapping-table th, .mapping-table td {
      padding: 0.9rem 1rem;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .mapping-table th {
      background: rgba(255, 255, 255, 0.03);
      color: #93c5fd;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .mapping-table td code {
      background: #090d16;
      color: #38bdf8;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    .table-link {
      color: #818cf8;
      font-weight: 600;
      text-decoration: none;
    }

    .table-link:hover {
      color: #22d3ee;
    }

    .tech-list {
      margin: 0;
      padding-left: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      font-size: 0.86rem;
      color: #cbd5e1;
    }

    .tech-list strong {
      color: #93c5fd;
    }

    .pe-standards {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .pe-item strong {
      color: #34d399;
      font-size: 0.88rem;
      display: block;
      margin-bottom: 0.2rem;
    }

    .pe-item p {
      font-size: 0.82rem;
      color: #94a3b8;
      line-height: 1.45;
    }
  `]
})
export class AboutComponent {
  readonly aiService = inject(AiAssistantService);
}
