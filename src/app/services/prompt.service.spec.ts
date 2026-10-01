import { TestBed } from '@angular/core/testing';
import { PromptService } from './prompt.service';

describe('PromptService (Tasks 4, 6, 7 & Library)', () => {
  let service: PromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptService);
  });

  it('should initialize with at least 15 curated prompt library items', () => {
    expect(service).toBeTruthy();
    expect(service.libraryItems().length).toBeGreaterThanOrEqual(15);
  });

  it('should filter prompts by category and search query', () => {
    service.setCategory('forms');
    expect(service.filteredPrompts().every(p => p.category === 'forms')).toBe(true);

    service.setCategory('all');
    service.setSearchQuery('routing');
    expect(service.filteredPrompts().length).toBeGreaterThan(0);
    expect(service.filteredPrompts().some(p => p.title.toLowerCase().includes('routing'))).toBe(true);
  });

  // Task 4: Role-based prompts
  it('Task 4: should generate role-based prompt and structured output for Teacher, Programmer, and Marketer', () => {
    const teacherRes = service.generateRoleOutput('teacher', 'Teach greetings');
    expect(teacherRes.prompt).toContain('French Language Teacher');
    expect(teacherRes.response).toContain('French Language Lesson');

    const progRes = service.generateRoleOutput('programmer', 'Create a student management application');
    expect(progRes.prompt).toContain('Senior Angular Developer');
    expect(progRes.response).toContain('student.model.ts');

    const markRes = service.generateRoleOutput('marketer', 'Promote iced matcha');
    expect(markRes.prompt).toContain('Starbucks');
    expect(markRes.response).toContain('Campaign Headline');
  });

  // TC07: Prompt Optimization -> optimized prompt
  it('TC07: should optimize basic prompt into structured 6-parameter prompt', () => {
    const result = service.generateOptimizedPrompt({
      productService: 'new beverage',
      targetAudience: 'college students aged 18–24',
      campaignTone: 'energetic, friendly and modern',
      goal: 'Boost campus visits',
      constraints: 'Keep concise',
      outputFormat: 'campaign headline, short promotional message, call-to-action and social-media caption'
    });

    expect(result.originalPrompt).toBe('Promote a new beverage.');
    expect(result.optimizedPrompt).toContain('Act as a Starbucks marketer.');
    expect(result.optimizedPrompt).toContain('college students aged 18–24');
    expect(result.optimizedPrompt).toContain('energetic, friendly and modern');
    expect(result.breakdown['Role Persona']).toBeDefined();
    expect(result.breakdown['Target & Context']).toBeDefined();
  });

  // TC08: Complaint Template -> prompt generated
  it('TC08: should generate structured Amazon customer complaint prompt', () => {
    const complaintPrompt = service.generateComplaintPrompt({
      customerName: 'MANIKKAVEL S',
      orderNumber: '402-8761234-9876543',
      productName: 'Sony WH-1000XM5 Headphones',
      problemDescription: 'Left earbud not functioning',
      incidentDate: '2026-09-28',
      requestedResolution: 'Full refund',
      tone: 'Polite but firm'
    });

    expect(complaintPrompt).toContain('Customer Communications Specialist');
    expect(complaintPrompt).toContain('MANIKKAVEL S');
    expect(complaintPrompt).toContain('402-8761234-9876543');
    expect(complaintPrompt).toContain('Sony WH-1000XM5 Headphones');
    expect(complaintPrompt).toContain('Full refund');
  });

  // TC09: Sales Report Template -> prompt generated
  it('TC09: should generate structured Amazon sales performance report prompt', () => {
    const salesPrompt = service.generateSalesReportPrompt({
      reportingPeriod: 'Q3 2026',
      productCategory: 'Consumer Electronics',
      totalSales: '24,800 units',
      numberOfOrders: '19,450 orders',
      totalRevenue: '$1,240,000 USD',
      topProduct: 'Echo Studio Smart Speaker',
      targetAudience: 'Senior Vice President of Retail Operations'
    });

    expect(salesPrompt).toContain('E-commerce Business Analyst for Amazon Marketplace');
    expect(salesPrompt).toContain('Q3 2026');
    expect(salesPrompt).toContain('Consumer Electronics');
    expect(salesPrompt).toContain('$1,240,000 USD');
    expect(salesPrompt).toContain('Executive Summary');
  });
});
