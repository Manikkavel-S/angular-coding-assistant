import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="app-header">
      <!-- Top Student & Project Bar -->
      <div class="top-banner">
        <div class="banner-inner">
          <div class="student-info">
            <span class="student-name">🎓 MANIKKAVEL S</span>
            <span class="reg-divider">|</span>
            <span class="reg-no">Reg No: <strong>811224243033</strong></span>
          </div>
          <div class="project-tag">
            <span class="badge badge-primary">College Mini-Project</span>
            <span class="badge badge-angular">Angular Standalone</span>
          </div>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <nav class="main-nav">
        <div class="nav-container">
          <!-- Brand Logo -->
          <a routerLink="/dashboard" class="brand-link">
            <div class="brand-icon">
              <svg viewBox="0 0 250 250" class="angular-shield">
                <polygon fill="#DD0031" points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2"/>
                <polygon fill="#C3002F" points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2"/>
                <path fill="#FFFFFF" d="M125,52.1L66.8,182.6h21.7l11.7-29.2h49.4l11.7,29.2H183L125,52.1z M142,135.4H108l17-42.4L142,135.4z"/>
              </svg>
            </div>
            <div class="brand-text">
              <span class="brand-title">Angular Coding Assistant</span>
              <span class="brand-sub">Prompt-Based AI Assistant for Angular Development</span>
            </div>
          </a>

          <!-- Mobile Toggle Button -->
          <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Toggle navigation menu">
            <span class="bar" [class.open]="isMobileMenuOpen()"></span>
            <span class="bar" [class.open]="isMobileMenuOpen()"></span>
            <span class="bar" [class.open]="isMobileMenuOpen()"></span>
          </button>

          <!-- Desktop Navigation Links -->
          <ul class="nav-links" [class.nav-open]="isMobileMenuOpen()">
            <li>
              <a routerLink="/dashboard" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">📊</span> Overview
              </a>
            </li>
            <li>
              <a routerLink="/chat" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">💬</span> AI Chat
              </a>
            </li>
            <li>
              <a routerLink="/prompt-library" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">📚</span> Library
              </a>
            </li>
            <li>
              <a routerLink="/prompt-engineering" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">🧠</span> Engineering
              </a>
            </li>
            <li>
              <a routerLink="/role-based" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">🎭</span> Roles <span class="task-pill">T4</span>
              </a>
            </li>
            <li>
              <a routerLink="/boolean-logic" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">⚡</span> Boolean CoT <span class="task-pill">T5</span>
              </a>
            </li>
            <li>
              <a routerLink="/prompt-optimization" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">✨</span> Optimizer <span class="task-pill">T6</span>
              </a>
            </li>
            <li>
              <a routerLink="/prompt-templates" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">📋</span> Templates <span class="task-pill">T7</span>
              </a>
            </li>
            <li>
              <a routerLink="/about" routerLinkActive="active" (click)="closeMobileMenu()">
                <span class="nav-icon">ℹ️</span> About
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(10, 14, 23, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--bg-card-border);
    }

    .top-banner {
      background: linear-gradient(90deg, #111827 0%, #1e1b4b 50%, #0c4a6e 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding: 0.35rem 1.5rem;
      font-size: 0.78rem;
    }

    .banner-inner {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .student-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #e2e8f0;
    }

    .student-name {
      font-weight: 700;
      color: #93c5fd;
    }

    .reg-divider {
      color: var(--text-muted);
    }

    .reg-no strong {
      color: #38bdf8;
      font-family: var(--font-mono);
    }

    .project-tag {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .main-nav {
      padding: 0.65rem 1.5rem;
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }

    .angular-shield {
      width: 34px;
      height: 34px;
      filter: drop-shadow(0 0 8px rgba(221, 0, 49, 0.5));
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .brand-sub {
      font-size: 0.7rem;
      color: var(--text-secondary);
      line-height: 1.2;
    }

    .nav-links {
      display: flex;
      align-items: center;
      list-style: none;
      gap: 0.35rem;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-secondary);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      text-decoration: none;
      white-space: nowrap;
    }

    .nav-links a:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-links a.active {
      color: #ffffff;
      background: var(--primary-glow);
      border: 1px solid rgba(99, 102, 241, 0.4);
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.2);
    }

    .task-pill {
      font-size: 0.65rem;
      background: rgba(6, 182, 212, 0.2);
      color: #22d3ee;
      padding: 1px 5px;
      border-radius: 4px;
      font-weight: 700;
    }

    .mobile-toggle {
      display: none;
      background: transparent;
      border: none;
      cursor: pointer;
      flex-direction: column;
      gap: 5px;
      padding: 6px;
    }

    .mobile-toggle .bar {
      width: 22px;
      height: 2px;
      background-color: var(--text-primary);
      transition: 0.3s;
    }

    @media (max-width: 1100px) {
      .mobile-toggle {
        display: flex;
      }
      .nav-links {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #0d131f;
        flex-direction: column;
        align-items: stretch;
        padding: 1rem;
        border-bottom: 1px solid var(--bg-card-border);
        display: none;
      }
      .nav-links.nav-open {
        display: flex;
      }
      .nav-links a {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeaderComponent {
  readonly isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
