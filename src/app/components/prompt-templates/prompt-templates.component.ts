import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../../services/prompt.service';
import { ClipboardService } from '../../services/clipboard.service';
import { ComplaintTemplateForm, SalesReportTemplateForm } from '../../models/prompt.model';

@Component({
  selector: 'app-prompt-templates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="templates-container">
      <!-- Header -->
      <div class="page-header">
        <div class="badge-row">
          <span class="badge badge-success">Assignment Task 7</span>
          <span class="badge badge-primary">Structured Prompt Templates</span>
        </div>
        <h1>📋 Domain-Specific Prompt Template Generators</h1>
        <p class="subtitle">
          Form-driven prompt generators transforming domain attributes into production-grade structured prompts with strict schemas and validations.
        </p>
      </div>

      <!-- Template Selector Tabs -->
      <div class="template-tabs-card glass-card">
        <div class="template-tabs">
          <button 
            class="template-tab" 
            [class.active]="activeTemplate() === 'complaint'"
            (click)="setTemplate('complaint')"
          >
            <span class="tab-icon">✉️</span>
            <div class="tab-meta">
              <span class="tab-title">Template 1: Amazon Customer Complaint</span>
              <span class="tab-desc">Structured formal customer support incident escalation</span>
            </div>
          </button>

          <button 
            class="template-tab" 
            [class.active]="activeTemplate() === 'sales'"
            (click)="setTemplate('sales')"
          >
            <span class="tab-icon">📈</span>
            <div class="tab-meta">
              <span class="tab-title">Template 2: Amazon Sales Performance Report</span>
              <span class="tab-desc">Executive e-commerce revenue & category metrics report</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Main Workspace: Form on Left, Generated Structured Prompt on Right -->
      <div class="grid-2 template-workspace">
        <!-- TEMPLATE 1: Amazon Customer Complaint Form -->
        @if (activeTemplate() === 'complaint') {
          <div class="glass-card form-card">
            <div class="card-head">
              <span class="step-badge">Form T1</span>
              <h3>Complaint Email Parameters</h3>
              <button class="sample-btn" (click)="loadSampleComplaint()">Load Sample</button>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="custName">Customer Name <span class="required">*</span></label>
                <input id="custName" type="text" [(ngModel)]="complaintForm.customerName" class="form-control" placeholder="e.g. John Doe" />
              </div>
              <div class="form-group">
                <label class="form-label" for="orderNum">Order ID <span class="required">*</span></label>
                <input id="orderNum" type="text" [(ngModel)]="complaintForm.orderNumber" class="form-control font-mono" placeholder="e.g. 112-9876543-1234567" />
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="prodName">Product Name <span class="required">*</span></label>
                <input id="prodName" type="text" [(ngModel)]="complaintForm.productName" class="form-control" placeholder="e.g. Wireless Noise-Canceling Headphones" />
              </div>
              <div class="form-group">
                <label class="form-label" for="incDate">Incident / Delivery Date</label>
                <input id="incDate" type="date" [(ngModel)]="complaintForm.incidentDate" class="form-control" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="probDesc">Problem Description <span class="required">*</span></label>
              <textarea id="probDesc" [(ngModel)]="complaintForm.problemDescription" rows="3" class="form-textarea" placeholder="Detail the exact defect or delivery issue..."></textarea>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="resReq">Requested Resolution</label>
                <input id="resReq" type="text" [(ngModel)]="complaintForm.requestedResolution" class="form-control" placeholder="e.g. Full replacement or refund" />
              </div>
              <div class="form-group">
                <label class="form-label" for="toneReq">Email Tone</label>
                <select id="toneReq" [(ngModel)]="complaintForm.tone" class="form-select">
                  <option value="Polite, firm and professional">Polite, firm and professional</option>
                  <option value="Urgent and formal">Urgent and formal</option>
                  <option value="Diplomatic and constructive">Diplomatic and constructive</option>
                </select>
              </div>
            </div>
          </div>
        }

        <!-- TEMPLATE 2: Amazon Sales Report Form -->
        @if (activeTemplate() === 'sales') {
          <div class="glass-card form-card">
            <div class="card-head">
              <span class="step-badge">Form T2</span>
              <h3>Sales Report Parameters</h3>
              <button class="sample-btn" (click)="loadSampleSales()">Load Sample</button>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="repPeriod">Reporting Period <span class="required">*</span></label>
                <input id="repPeriod" type="text" [(ngModel)]="salesForm.reportingPeriod" class="form-control" placeholder="e.g. Q3 2026" />
              </div>
              <div class="form-group">
                <label class="form-label" for="prodCat">Product Category <span class="required">*</span></label>
                <input id="prodCat" type="text" [(ngModel)]="salesForm.productCategory" class="form-control" placeholder="e.g. Consumer Electronics & Smart Home" />
              </div>
            </div>

            <div class="form-grid-3">
              <div class="form-group">
                <label class="form-label" for="totSales">Total Units</label>
                <input id="totSales" type="text" [(ngModel)]="salesForm.totalSales" class="form-control" placeholder="e.g. 14,500 units" />
              </div>
              <div class="form-group">
                <label class="form-label" for="numOrders">Total Orders</label>
                <input id="numOrders" type="text" [(ngModel)]="salesForm.numberOfOrders" class="form-control" placeholder="e.g. 11,200 orders" />
              </div>
              <div class="form-group">
                <label class="form-label" for="totRev">Revenue ($)</label>
                <input id="totRev" type="text" [(ngModel)]="salesForm.totalRevenue" class="form-control" placeholder="e.g. $420,500" />
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="topProd">Top Performing Product</label>
                <input id="topProd" type="text" [(ngModel)]="salesForm.topProduct" class="form-control" placeholder="e.g. Smart Home Hub Pro" />
              </div>
              <div class="form-group">
                <label class="form-label" for="targetAud">Target Stakeholder Audience</label>
                <input id="targetAud" type="text" [(ngModel)]="salesForm.targetAudience" class="form-control" placeholder="e.g. Senior Leadership & Product Category Managers" />
              </div>
            </div>
          </div>
        }

        <!-- Generated Structured Prompt Preview -->
        <div class="glass-card output-card">
          <div class="card-head">
            <span class="step-badge success">Structured Prompt</span>
            <h3>Live Synthesized Prompt</h3>
            <button class="btn btn-primary btn-sm" (click)="copyGeneratedPrompt()">
              📋 Copy Prompt
            </button>
          </div>

          <div class="prompt-preview-container">
            <pre class="prompt-preview-text"><code>{{ currentGeneratedPrompt() }}</code></pre>
          </div>

          <div class="structure-summary">
            <span class="summary-label">Enforced Output Schema:</span>
            @if (activeTemplate() === 'complaint') {
              <div class="schema-tags">
                <span class="schema-pill">1. Subject Line</span>
                <span class="schema-pill">2. Professional Greeting</span>
                <span class="schema-pill">3. Problem Statement</span>
                <span class="schema-pill">4. Order Details</span>
                <span class="schema-pill">5. Requested Resolution</span>
                <span class="schema-pill">6. Closing</span>
              </div>
            } @else {
              <div class="schema-tags">
                <span class="schema-pill">1. Executive Summary</span>
                <span class="schema-pill">2. Sales Overview</span>
                <span class="schema-pill">3. Product Performance</span>
                <span class="schema-pill">4. Revenue Analysis</span>
                <span class="schema-pill">5. Key Observations</span>
                <span class="schema-pill">6. Recommendations</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .templates-container {
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

    .template-tabs {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .template-tab {
      display: flex;
      align-items: center;
      gap: 1rem;
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

    .template-tab:hover {
      background: #172033;
      border-color: rgba(99, 102, 241, 0.4);
    }

    .template-tab.active {
      background: rgba(16, 185, 129, 0.12);
      border-color: #10b981;
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
    }

    .tab-icon {
      font-size: 1.8rem;
    }

    .tab-meta {
      display: flex;
      flex-direction: column;
    }

    .tab-title {
      font-weight: 700;
      font-size: 0.95rem;
      color: #f1f5f9;
    }

    .tab-desc {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .template-workspace {
      display: grid;
      grid-template-columns: 1fr 1.25fr;
      gap: 1.5rem;
      align-items: start;
    }

    .form-card, .output-card {
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

    .sample-btn {
      background: transparent;
      border: none;
      color: #38bdf8;
      font-size: 0.78rem;
      cursor: pointer;
      font-weight: 600;
    }

    .sample-btn:hover {
      text-decoration: underline;
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .form-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    .prompt-preview-container {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      max-height: 520px;
      overflow-y: auto;
    }

    .prompt-preview-text {
      margin: 0;
      font-family: var(--font-mono);
      font-size: 0.84rem;
      line-height: 1.6;
      color: #e2e8f0;
      white-space: pre-wrap;
    }

    .structure-summary {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 0.75rem;
    }

    .summary-label {
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .schema-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .schema-pill {
      font-size: 0.72rem;
      background: rgba(16, 185, 129, 0.12);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 2px 7px;
      border-radius: 4px;
    }

    @media (max-width: 900px) {
      .template-tabs {
        grid-template-columns: 1fr;
      }
      .template-workspace {
        grid-template-columns: 1fr;
      }
      .form-grid-2, .form-grid-3 {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PromptTemplatesComponent {
  readonly promptService = inject(PromptService);
  private readonly clipboard = inject(ClipboardService);

  readonly activeTemplate = signal<'complaint' | 'sales'>('complaint');

  complaintForm: ComplaintTemplateForm = {
    customerName: 'MANIKKAVEL S',
    orderNumber: '402-8761234-9876543',
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    problemDescription: 'The package arrived unsealed and the left ear cup has physical distortion with no audio output.',
    incidentDate: '2026-09-28',
    requestedResolution: 'Immediate replacement or full refund to original payment method',
    tone: 'Polite, firm and professional'
  };

  salesForm: SalesReportTemplateForm = {
    reportingPeriod: 'Q3 2026 (July – September)',
    productCategory: 'Consumer Electronics & Smart Audio',
    totalSales: '24,800 units',
    numberOfOrders: '19,450 orders',
    totalRevenue: '$1,240,000 USD',
    topProduct: 'Echo Studio Smart Speaker (38% of revenue)',
    targetAudience: 'Senior Vice President of Retail Operations & Category Managers'
  };

  setTemplate(tab: 'complaint' | 'sales'): void {
    this.activeTemplate.set(tab);
  }

  currentGeneratedPrompt(): string {
    if (this.activeTemplate() === 'complaint') {
      return this.promptService.generateComplaintPrompt(this.complaintForm);
    } else {
      return this.promptService.generateSalesReportPrompt(this.salesForm);
    }
  }

  loadSampleComplaint(): void {
    this.complaintForm = {
      customerName: 'MANIKKAVEL S',
      orderNumber: '402-8761234-9876543',
      productName: 'Sony WH-1000XM5 Wireless Headphones',
      problemDescription: 'The package arrived unsealed and the left ear cup has physical distortion with no audio output.',
      incidentDate: '2026-09-28',
      requestedResolution: 'Immediate replacement or full refund to original payment method',
      tone: 'Polite, firm and professional'
    };
  }

  loadSampleSales(): void {
    this.salesForm = {
      reportingPeriod: 'Q3 2026 (July – September)',
      productCategory: 'Consumer Electronics & Smart Audio',
      totalSales: '24,800 units',
      numberOfOrders: '19,450 orders',
      totalRevenue: '$1,240,000 USD',
      topProduct: 'Echo Studio Smart Speaker (38% of revenue)',
      targetAudience: 'Senior Vice President of Retail Operations & Category Managers'
    };
  }

  copyGeneratedPrompt(): void {
    const label = this.activeTemplate() === 'complaint' ? 'Customer Complaint Template' : 'Sales Report Template';
    this.clipboard.copyToClipboard(this.currentGeneratedPrompt(), label);
  }
}
