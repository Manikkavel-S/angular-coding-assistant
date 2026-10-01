import { Injectable, signal, computed } from '@angular/core';
import { 
  PromptItem, 
  PromptCategory, 
  OptimizedPromptConfig, 
  RoleType, 
  RolePromptDefinition, 
  ComplaintTemplateForm, 
  SalesReportTemplateForm 
} from '../models/prompt.model';
import { PROMPT_LIBRARY_ITEMS } from '../constants/prompt-library.constant';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  // Library State
  private readonly _libraryItems = signal<PromptItem[]>(PROMPT_LIBRARY_ITEMS);
  private readonly _selectedCategory = signal<string>('all');
  private readonly _searchQuery = signal<string>('');

  readonly libraryItems = this._libraryItems.asReadonly();
  readonly selectedCategory = this._selectedCategory.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();

  // Filtered prompt library items
  readonly filteredPrompts = computed(() => {
    const category = this._selectedCategory();
    const query = this._searchQuery().toLowerCase().trim();

    return this._libraryItems().filter(item => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesQuery = !query || 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.promptText.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      
      return matchesCategory && matchesQuery;
    });
  });

  // Task 4: Role-Based Definitions
  readonly roleDefinitions: Record<RoleType, RolePromptDefinition> = {
    teacher: {
      id: 'teacher',
      title: 'Language Teacher (French)',
      roleDescription: 'Pedagogical language instruction focusing on pronunciation, greetings, vocabulary, and cultural context.',
      systemPersona: 'Act as an encouraging and expert French Language Teacher. Teach basic French to beginners with pronunciation guides, practical vocabulary, everyday greetings, and interactive practice exercises.',
      sampleRequirement: 'Teach basic everyday French greetings, numbers from 1 to 10, and how to order a croissant in a Parisian café.',
      outputStructure: ['1. Lesson Objective', '2. Essential Vocabulary & Phonics', '3. Practical Dialogue & Scenario', '4. Quick Student Exercise']
    },
    programmer: {
      id: 'programmer',
      title: 'Angular Developer (Programmer)',
      roleDescription: 'Production-grade Angular architecture, standalone components, TypeScript models, services, routing, and clean code.',
      systemPersona: 'Act as a Senior Angular Developer and software architect. Build modern, production-ready web applications using standalone components, TypeScript interfaces, reactive services, routing, and semantic styling.',
      sampleRequirement: 'Create a student management application with registration, CGPA tracking, department filters, and search functionality.',
      outputStructure: ['1. Architectural Overview', '2. TypeScript Interfaces', '3. Reactive State Service', '4. Standalone Component', '5. Routing Configuration']
    },
    marketer: {
      id: 'marketer',
      title: 'Starbucks Marketer',
      roleDescription: 'High-impact creative marketing strategy, audience segmentation, social media captions, and engaging calls-to-action.',
      systemPersona: 'Act as an innovative Starbucks Brand Marketer. Create viral, enticing promotional campaigns for premium beverages targeting youth and modern coffee enthusiasts with vibrant copy.',
      sampleRequirement: 'Promote a new seasonal iced matcha lavender oat-milk latte for college students during spring finals week.',
      outputStructure: ['1. Campaign Headline', '2. Core Value Proposition', '3. Instagram & TikTok Copy', '4. Limited-Time Call-to-Action']
    }
  };

  /**
   * Set category filter
   */
  setCategory(category: string): void {
    this._selectedCategory.set(category);
  }

  /**
   * Set search query
   */
  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  /**
   * Task 4: Generate Role-Based Prompt and Structured AI Output
   */
  generateRoleOutput(role: RoleType, requirement: string): { prompt: string; response: string; roleInfo: RolePromptDefinition } {
    const roleInfo = this.roleDefinitions[role];
    const userRequirement = requirement.trim() || roleInfo.sampleRequirement;

    let prompt = '';
    let response = '';

    if (role === 'teacher') {
      prompt = `${roleInfo.systemPersona}\n\nTask Requirement: ${userRequirement}`;
      response = `### 🇫🇷 French Language Lesson: Beginner Foundations

#### 1. Lesson Objective
Learn foundational French greetings, phonetics, and conversational etiquette for everyday interactions.

#### 2. Essential Vocabulary & Phonics
- **Bonjour** *(bohn-ZHOOR)*: Hello / Good morning (Formal & Polite)
- **Salut** *(sah-LOO)*: Hi / Bye (Informal between friends)
- **S'il vous plaît** *(seel voo PLEH)*: Please (Formal)
- **Merci beaucoup** *(mair-SEE boh-KOO)*: Thank you very much
- **Au revoir** *(oh ruh-VWAHR)*: Goodbye

#### 3. Real-World Café Dialogue
> **Barista:** "Bonjour ! Que désirez-vous ?" *(Hello! What would you like?)*  
> **Vous (You):** "Bonjour ! Un croissant et un café au lait, s'il vous plaît." *(A croissant and coffee with milk, please.)*  
> **Barista:** "Très bien, cela fera quatre euros." *(Very well, that will be 4 euros.)*  
> **Vous:** "Merci beaucoup, bonne journée !" *(Thank you very much, have a nice day!)*

#### 4. Interactive Student Practice
Translate the following sentence to French: *"Hello, please give me one coffee."*
*(Answer: Bonjour, un café s'il vous plaît !)*`;
    } else if (role === 'programmer') {
      prompt = `${roleInfo.systemPersona}\n\nProject Requirement: ${userRequirement}`;
      response = `### 🅰️ Angular Application Architecture: ${userRequirement}

#### 1. System Architecture & Folder Layout
\`\`\`text
src/app/
├── models/student.model.ts
├── services/student-management.service.ts
├── components/student-list/student-list.component.ts
├── components/student-form/student-form.component.ts
└── app.routes.ts
\`\`\`

#### 2. TypeScript Model Interface (\`student.model.ts\`)
\`\`\`typescript
export interface Student {
  id: string;
  regNo: string;
  name: string;
  department: string;
  cgpa: number;
  enrollmentDate: string;
}
\`\`\`

#### 3. Reactive State Service (\`student-management.service.ts\`)
\`\`\`typescript
import { Injectable, signal, computed } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentManagementService {
  private readonly _students = signal<Student[]>([
    { id: '1', regNo: '811224243033', name: 'MANIKKAVEL S', department: 'CSE', cgpa: 9.2, enrollmentDate: '2024-09-01' }
  ]);
  
  readonly students = this._students.asReadonly();
  readonly highAchievers = computed(() => this._students().filter(s => s.cgpa >= 9.0));

  addStudent(student: Omit<Student, 'id'>): void {
    const record: Student = { ...student, id: crypto.randomUUID() };
    this._students.update(list => [...list, record]);
  }
}
\`\`\`

#### 4. Standalone UI Component (\`student-list.component.ts\`)
\`\`\`typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentManagementService } from '../../services/student-management.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="table-container">
      <h2>Student Directory (Total: {{ service.students().length }})</h2>
      <table>
        <thead>
          <tr><th>Reg No</th><th>Name</th><th>Dept</th><th>CGPA</th></tr>
        </thead>
        <tbody>
          @for (student of service.students(); track student.id) {
            <tr>
              <td>{{ student.regNo }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.department }}</td>
              <td><span class="cgpa-badge">{{ student.cgpa }}</span></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`
})
export class StudentListComponent {
  readonly service = inject(StudentManagementService);
}
\`\`\``;
    } else {
      prompt = `${roleInfo.systemPersona}\n\nMarketing Task: ${userRequirement}`;
      response = `### ☕ Starbucks Seasonal Campaign Strategy

#### 1. Campaign Headline
**"Sip the Bloom: Refresh Your Focus with Lavender Cloud Matcha."**

#### 2. Core Value Proposition
Crafted specifically for late-night study sessions and sunny campus mornings, our botanical iced lavender matcha delivers sustained natural green tea energy infused with velvety oat milk foam.

#### 3. Social Media Copy (Instagram / TikTok)
> 🌿 **Finals week survival mode = Activated.**  
> Swap the stress for sips of smooth iced matcha crowned with lavender cold foam. 🌸⚡  
> Tag your study buddy who needs a caffeine glow-up today!  
> 📍 Available now at all campus Starbucks locations. #StarbucksBloom #MatchaVibes #StudyWithStarbucks

#### 4. Call-to-Action & Exclusive Promotion
*"Show your Student ID at the register between 2 PM – 5 PM for 20% off any venti iced handcrafted refresher this week only!"*`;
    }

    return { prompt, response, roleInfo };
  }

  /**
   * Task 6: Prompt Optimization Engine
   */
  generateOptimizedPrompt(config: OptimizedPromptConfig): { originalPrompt: string; optimizedPrompt: string; breakdown: Record<string, string> } {
    const rawProd = (config.productService || 'beverage').trim();
    const prodPhrase = rawProd.toLowerCase().startsWith('new ') ? rawProd : `new ${rawProd}`;
    const originalPrompt = `Promote a ${prodPhrase}.`;

    const roleClause = `Act as a Starbucks marketer.`;
    const taskClause = `Create a promotional campaign for a ${prodPhrase} targeting ${config.targetAudience || 'college students aged 18–24'}.`;
    const toneClause = `Use an ${config.campaignTone || 'energetic, friendly and modern'} tone.`;
    const goalClause = config.goal ? `Primary Campaign Goal: ${config.goal}.` : `Primary Campaign Goal: Drive store traffic and student engagement.`;
    const constraintsClause = config.constraints ? `Constraints: ${config.constraints}.` : `Constraints: Keep messaging concise, engaging, and suitable for social media.`;
    const formatClause = config.outputFormat 
      ? `Include ${config.outputFormat}.` 
      : `Include a campaign headline, short promotional message, call-to-action and social-media caption.`;

    const optimizedPrompt = `${roleClause} ${taskClause} ${toneClause} ${goalClause} ${constraintsClause} ${formatClause}`;

    return {
      originalPrompt,
      optimizedPrompt,
      breakdown: {
        'Role Persona': roleClause,
        'Target & Context': `${config.productService} targeting ${config.targetAudience}`,
        'Tone & Voice': config.campaignTone,
        'Goal & Objectives': config.goal || 'Drive awareness and engagement',
        'Constraints': config.constraints || 'Concise format, student appeal',
        'Output Format': config.outputFormat || 'Headline, promo body, CTA, social caption'
      }
    };
  }

  /**
   * Task 7 - Template 1: Amazon Customer Complaint Email Generator
   */
  generateComplaintPrompt(form: ComplaintTemplateForm): string {
    return `Act as a professional Customer Communications Specialist. Write a well-structured Amazon Customer Complaint Email based on the following specific incident details:

[CUSTOMER & ORDER DETAILS]
- Customer Name: ${form.customerName || 'John Doe'}
- Order ID: ${form.orderNumber || '112-9876543-1234567'}
- Product Name: ${form.productName || 'Wireless Noise-Canceling Headphones'}
- Date of Purchase / Delivery: ${form.incidentDate || '2026-09-28'}
- Desired Resolution: ${form.requestedResolution || 'Full replacement or refund'}
- Tone: ${form.tone || 'Polite but firm and clear'}

[PROBLEM DESCRIPTION]
${form.problemDescription || 'The package arrived damaged, and the left earbud does not power on or connect via Bluetooth.'}

[REQUIRED OUTPUT STRUCTURE]
1. Subject Line (Clear, referencing Order ID and Issue)
2. Professional Greeting to Amazon Customer Support
3. Clear Statement of Problem & Timeline
4. Order & Transaction Details Table
5. Explicit Requested Resolution & Expected Response Window
6. Professional Sign-off and Contact Information`;
  }

  /**
   * Task 7 - Template 2: Amazon Sales Report Generator
   */
  generateSalesReportPrompt(form: SalesReportTemplateForm): string {
    return `Act as an expert E-commerce Business Analyst for Amazon Marketplace. Generate a comprehensive, professional Sales Performance Report using the following verified quarterly business metrics:

[SALES & REVENUE DATA]
- Reporting Period: ${form.reportingPeriod || 'Q3 2026'}
- Product Category: ${form.productCategory || 'Consumer Electronics & Smart Home'}
- Total Units Sold: ${form.totalSales || '14,500 units'}
- Total Orders Processed: ${form.numberOfOrders || '11,200 orders'}
- Gross Revenue: ${form.totalRevenue || '$420,500'}
- Top Performing Product: ${form.topProduct || 'Smart Home Hub Pro'}
- Target Stakeholder Audience: ${form.targetAudience || 'Senior Leadership & Product Category Managers'}

[REQUIRED OUTPUT STRUCTURE]
1. Executive Summary (High-level revenue & order highlights)
2. Sales Performance Overview (Quarter-over-Quarter comparison)
3. Product Category & Top SKU Analysis
4. Revenue Trends & Conversion Efficiency
5. Key Market Observations & Customer Feedback Patterns
6. Strategic Recommendations for Next Quarter`;
  }
}
