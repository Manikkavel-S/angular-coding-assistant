import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { ClipboardService } from '../../services/clipboard.service';
import { AiAssistantService } from '../../services/ai-assistant.service';
import { PromptItem } from '../../models/prompt.model';

@Component({
  selector: 'app-prompt-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="library-container">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <div class="category-badge-strip">
            <span class="badge badge-primary">Curated Knowledge Base</span>
            <span class="badge badge-secondary">{{ promptService.filteredPrompts().length }} Prompts Available</span>
          </div>
          <h1>📚 Angular Prompt Library</h1>
          <p class="subtitle">
            Battle-tested, structured prompt templates designed to elicit production-ready Angular code, explanations, and architectural patterns.
          </p>
        </div>
      </div>

      <!-- Search & Filters Toolbar -->
      <div class="filters-toolbar glass-card">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (ngModelChange)="onSearchChange($event)"
            placeholder="Search prompts by title, keyword, or concept (e.g., routing, reactive forms, DI)..."
            class="search-input"
          />
          @if (searchQuery) {
            <button class="clear-search-btn" (click)="clearSearch()">✕</button>
          }
        </div>

        <div class="category-tabs">
          <button 
            class="cat-tab" 
            [class.active]="promptService.selectedCategory() === 'all'"
            (click)="selectCategory('all')"
          >
            All ({{ promptService.libraryItems().length }})
          </button>
          <button 
            class="cat-tab" 
            [class.active]="promptService.selectedCategory() === 'components'"
            (click)="selectCategory('components')"
          >
            Components
          </button>
          <button 
            class="cat-tab" 
            [class.active]="promptService.selectedCategory() === 'services'"
            (click)="selectCategory('services')"
          >
            Services & DI
          </button>
          <button 
            class="cat-tab" 
            [class.active]="promptService.selectedCategory() === 'forms'"
            (click)="selectCategory('forms')"
          >
            Forms & Validation
          </button>
          <button 
            class="cat-tab" 
            [class.active]="promptService.selectedCategory() === 'routing'"
            (click)="selectCategory('routing')"
          >
            Routing
          </button>
          <button 
            class="cat-tab" 
            [class.active]="promptService.selectedCategory() === 'crud'"
            (click)="selectCategory('crud')"
          >
            CRUD & State
          </button>
          <button 
            class="cat-tab" 
            [class.active]="promptService.selectedCategory() === 'debugging'"
            (click)="selectCategory('debugging')"
          >
            Debugging
          </button>
        </div>
      </div>

      <!-- Prompt Cards Grid -->
      <div class="prompts-grid">
        @for (item of promptService.filteredPrompts(); track item.id) {
          <div class="prompt-card glass-card glass-card-interactive">
            <div class="card-top">
              <div class="card-meta">
                <span class="badge badge-secondary">{{ item.categoryLabel }}</span>
                <span 
                  class="badge" 
                  [class.badge-success]="item.complexity === 'Beginner'"
                  [class.badge-primary]="item.complexity === 'Intermediate'"
                  [class.badge-warning]="item.complexity === 'Advanced'"
                >
                  {{ item.complexity }}
                </span>
              </div>
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-desc">{{ item.description }}</p>
            </div>

            <!-- Prompt Preview Container -->
            <div class="prompt-box">
              <div class="prompt-box-header">
                <span>PROMPT TEXT:</span>
              </div>
              <p class="prompt-text">{{ item.promptText }}</p>
            </div>

            <!-- Tags -->
            <div class="tags-row">
              @for (tag of item.tags; track tag) {
                <span class="tag-pill">#{{ tag }}</span>
              }
            </div>

            <!-- Card Actions -->
            <div class="card-actions">
              <button class="btn btn-primary btn-sm" (click)="sendToChat(item)">
                <span>💬 Send to Chat</span>
              </button>
              <button class="btn btn-secondary btn-sm" (click)="copyPrompt(item)">
                <span>📋 Copy Prompt</span>
              </button>
            </div>
          </div>
        } @empty {
          <div class="empty-state glass-card">
            <span class="empty-icon">🔎</span>
            <h3>No matching prompts found</h3>
            <p>Try searching for a different keyword or select the "All" category filter.</p>
            <button class="btn btn-secondary btn-sm" (click)="resetFilters()">Reset Filters</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .library-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .category-badge-strip {
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
      max-width: 850px;
    }

    .filters-toolbar {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.25rem;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 14px;
      font-size: 1.1rem;
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 0.8rem 2.8rem 0.8rem 2.8rem;
      background: #0b0f19;
      border: 1px solid var(--bg-card-border);
      border-radius: var(--radius-md);
      color: #fff;
      font-size: 0.95rem;
      outline: none;
      transition: border-color var(--transition-fast);
    }

    .search-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-glow);
    }

    .clear-search-btn {
      position: absolute;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1rem;
    }

    .category-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .cat-tab {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--bg-card-border);
      color: var(--text-secondary);
      padding: 0.45rem 0.9rem;
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .cat-tab:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    .cat-tab.active {
      background: var(--primary-glow);
      border-color: var(--primary-light);
      color: #fff;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.25);
    }

    .prompts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 1.5rem;
    }

    .prompt-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .card-title {
      font-size: 1.15rem;
      color: #f1f5f9;
      margin-bottom: 0.4rem;
    }

    .card-desc {
      font-size: 0.85rem;
      color: #94a3b8;
      margin-bottom: 1rem;
      line-height: 1.45;
    }

    .prompt-box {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      padding: 0.9rem;
      margin-bottom: 1rem;
    }

    .prompt-box-header {
      font-size: 0.68rem;
      font-weight: 700;
      color: #818cf8;
      letter-spacing: 0.05em;
      margin-bottom: 0.35rem;
    }

    .prompt-text {
      font-size: 0.82rem;
      color: #e2e8f0;
      font-family: var(--font-sans);
      line-height: 1.45;
      font-style: italic;
    }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-bottom: 1.25rem;
    }

    .tag-pill {
      font-size: 0.72rem;
      color: #93c5fd;
      background: rgba(59, 130, 246, 0.1);
      padding: 2px 7px;
      border-radius: 4px;
    }

    .card-actions {
      display: flex;
      gap: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 1rem;
    }

    .card-actions button {
      flex: 1;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .empty-icon {
      font-size: 2.5rem;
    }

    @media (max-width: 600px) {
      .prompts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PromptLibraryComponent {
  readonly promptService = inject(PromptService);
  private readonly clipboard = inject(ClipboardService);
  private readonly aiService = inject(AiAssistantService);
  private readonly router = inject(Router);

  searchQuery = '';

  onSearchChange(query: string): void {
    this.promptService.setSearchQuery(query);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.promptService.setSearchQuery('');
  }

  selectCategory(cat: string): void {
    this.promptService.setCategory(cat);
  }

  resetFilters(): void {
    this.clearSearch();
    this.selectCategory('all');
  }

  copyPrompt(item: PromptItem): void {
    this.clipboard.copyToClipboard(item.promptText, `Prompt "${item.title}"`);
  }

  async sendToChat(item: PromptItem): Promise<void> {
    await this.router.navigate(['/chat']);
    setTimeout(() => {
      this.aiService.sendMessage(item.promptText);
    }, 100);
  }
}
