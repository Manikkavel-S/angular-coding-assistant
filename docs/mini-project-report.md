# COLLEGE MINI-PROJECT COMPREHENSIVE REPORT

---

## TITLE PAGE
**PROJECT TITLE:** Designing a Prompt-Based AI Assistant – Angular Coding Assistant  
**APP NAME:** Angular Coding Assistant  
**SUBTITLE:** Prompt-Based AI Assistant for Angular Development  
**TAGLINE:** *"Your Prompt-Based AI Assistant for Angular Development"*  

**STUDENT DETAILS:**
- **Name:** MANIKKAVEL S
- **Register Number:** 811224243033
- **Degree:** Bachelor of Technology (B.Tech)
- **Department:** Artificial Intelligence & Data Science
- **Academic Year:** 2024–2028

---

## TABLE OF CONTENTS
1. Abstract
2. Introduction
3. Problem Statement
4. Objectives
5. Existing System vs. Proposed System
6. System Requirements & Technologies Used
7. System Architecture & Workflow Pipeline
8. Assignment Task Mapping Matrix
9. Detailed Module Description
   - 9.1 Angular Coding Assistant (Mini-Project)
   - 9.2 Prompt Engineering Theory & Methodology
   - 9.3 Task 4: Role-Based Prompting Architecture
   - 9.4 Task 5: Chain-of-Thought Boolean Logic Reasoning
   - 9.5 Task 6: Interactive Prompt Optimization Engine
   - 9.6 Task 7: Structured Prompt Template Generators
10. Implementation Details
11. UI Screenshot Placeholders & Descriptions
12. Test Cases & Verification Results (TC01 to TC10)
13. Sample Outputs
14. Advantages & Limitations
15. Future Enhancements
16. Conclusion
17. References

---

## 1. ABSTRACT
Modern software development increasingly relies on Large Language Models (LLMs) to accelerate prototyping, code generation, and error resolution. However, generic AI chatbots often suffer from ambiguous requirements, lack of framework-specific best practices, hallucinations, and security vulnerabilities like arbitrary code execution.

This project, **"Angular Coding Assistant"**, presents an autonomous, production-grade web application built using modern standalone Angular architecture and TypeScript. The application implements foundational prompt engineering techniques—including System Prompt isolation, dual-layer prompt architecture, role-based persona prompting (Task 4), structured Chain-of-Thought (CoT) reasoning with safe Abstract Syntax Tree parsing (Task 5), multi-parameter prompt optimization (Task 6), and schema-enforced prompt templates (Task 7). Equipped with a deterministic local Mock AI inference provider, the system operates completely offline without external paid API keys while remaining 100% architecturally prepared for real-world LLM integration.

---

## 2. INTRODUCTION
Prompt Engineering is the discipline of structuring, optimizing, and refining instructions delivered to AI models to elicit predictable, accurate, and high-quality responses. In frontend frameworks like Angular, code generation requires strict adherence to standalone component patterns, reactive Signals state management, Dependency Injection rules, and TypeScript type safety.

The **Angular Coding Assistant** project bridges the gap between theoretical prompt engineering principles and practical developer tools. It provides an intuitive, high-performance web interface designed with clean modern CSS aesthetics, responsive layouts, and zero third-party UI framework bloat.

---

## 3. PROBLEM STATEMENT
Developers interacting with conversational AI models face several prominent challenges:
1. **Vague and Under-Specified Prompts:** Basic prompts (e.g., *"Create an Angular login page"*) produce generic code that lacks validation, error handling, accessibility, and modern framework patterns.
2. **Lack of Structural Separation:** In traditional applications, system instructions are often hardcoded into UI components, leading to prompt leakage and maintenance issues.
3. **Complex Logic Hallucinations:** AI models frequently make logic errors when evaluating nested Boolean expressions without structured step-by-step reasoning.
4. **Dependence on Paid APIs:** Educational demonstrations often fail due to expired API tokens or rate limits.

---

## 4. OBJECTIVES
- Build a complete, responsive Angular web application utilizing standalone components and modern TypeScript.
- Implement an isolated **System Prompt** architecture separating developer instructions from user input.
- Provide interactive modules covering **Assignment Tasks 4, 5, 6, and 7**.
- Implement a **Safe Recursive-Descent Boolean Parser** for educational Chain-of-Thought reasoning (Zero `eval()`).
- Create a **Mock AI Engine** capable of detecting 21 Angular topics and generating structured responses (Explanation, Syntax Code, Key Notes).
- Write automated unit tests achieving a 100% pass rate.

---

## 5. EXISTING SYSTEM VS. PROPOSED SYSTEM

| Feature / Dimension | Existing Generic AI Systems | Proposed Angular Coding Assistant |
| :--- | :--- | :--- |
| **Domain Specialization** | Generic, often outdated Angular JS / NgModule code | Modern Angular Standalone Components & Signals |
| **System Prompt Isolation** | Opaque / Unchangeable | Modular, verifiable, and isolated constant layer |
| **Prompt Optimization** | Manual trial and error | Interactive parameter tuning with side-by-side comparison |
| **Boolean Logic Reasoning** | Black-box output without derivation | Numbered educational Chain-of-Thought steps with AST parser |
| **Form-Based Templates** | Plain text prompts required | Form-driven structured prompt synthesizers with schema validation |
| **Cost & Reliability** | Requires paid API keys and internet connectivity | 100% offline, reproducible, local mock engine |

---

## 6. SYSTEM REQUIREMENTS & TECHNOLOGIES USED

### Hardware Requirements
- **Processor:** Intel Core i3 / AMD Ryzen 3 or higher
- **RAM:** Minimum 4 GB (8 GB recommended)
- **Storage:** 500 MB free disk space

### Software Requirements
- **Operating System:** Windows 10/11, macOS, or Linux
- **Runtime:** Node.js v18.x or higher (v22/v24 used)
- **Package Manager:** npm v9.x or higher
- **Browser:** Google Chrome, Microsoft Edge, Firefox, or Safari (modern evergreen browsers)

### Technologies & Frameworks
- **Frontend Framework:** Angular 22 (Standalone Component architecture)
- **Programming Language:** TypeScript 5.9+ (Strict Mode)
- **Styling:** Vanilla CSS with CSS Custom Properties, Glassmorphism, and Dark Mode
- **State Management:** Angular Signals (`signal`, `computed`, `effect`)
- **Unit Testing:** Angular Test Runner with Vitest (21 Passing Tests)

---

## 7. SYSTEM ARCHITECTURE & WORKFLOW PIPELINE

```
+-------------------------------------------------------------------------+
|                        ANGULAR FRONTEND (SPA)                          |
|                                                                         |
|  [Dashboard]  [AI Chat]  [Library]  [Roles: T4]  [CoT: T5]  [Templates] |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                       PROMPT PROCESSING LAYER                           |
|                                                                         |
|  1. Input Validation & Sanitization (Length, empty checks)              |
|  2. System Prompt Synthesis ([SYSTEM PROMPT] + [USER REQUEST])          |
|  3. Topic Analysis Engine (Scans 21 Angular Architectural Topics)       |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                    AI PROVIDER INTERFACE (AiProvider)                   |
|                                                                         |
|  +--------------------------------+   +-------------------------------+ |
|  | Mock AI Engine (Active)       |   | Gemini / OpenAI API (Pluggable)| |
|  | - 12 Predefined Knowledge Bases|   | - Future Extension Ready      | |
|  | - Dynamic Fallback Synthesizer |   |                               | |
|  +--------------------------------+   +-------------------------------+ |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                      STRUCTURED RESPONSE RENDERER                       |
|                                                                         |
|  [Explanation Body]  [Copyable Code Block]  [Architectural Best Notes]  |
+-------------------------------------------------------------------------+
```

---

## 8. ASSIGNMENT TASK MAPPING MATRIX

| Task | Title | App Route | Key Component & Service |
| :--- | :--- | :--- | :--- |
| **Mini-Project** | Angular Coding Assistant | `/chat`, `/prompt-library` | `ChatComponent`, `AiAssistantService` |
| **Task 4** | Role-Based Persona Prompts | `/role-based` | `RoleBasedComponent`, `PromptService` |
| **Task 5** | Chain-of-Thought Boolean Logic | `/boolean-logic` | `BooleanLogicComponent`, `BooleanLogicService` |
| **Task 6** | Prompt Optimization Demo | `/prompt-optimization` | `PromptOptimizationComponent`, `PromptService` |
| **Task 7** | Structured Prompt Templates | `/prompt-templates` | `PromptTemplatesComponent`, `PromptService` |
| **Theory & Info**| Prompt Engineering & About | `/prompt-engineering`, `/about`| `PromptEngineeringComponent`, `AboutComponent` |

---

## 9. DETAILED MODULE DESCRIPTION

### 9.1 Angular Coding Assistant (Mini-Project)
- **Chat Interface:** Offers seamless user-assistant dialogue with timestamped message bubbles, role avatars, loading indicators, and error banners.
- **Suggested Cards:** 8 pre-configured prompt cards allowing one-click query execution.
- **System Prompt Isolation:** Stores the core instruction set in `system-prompt.constant.ts`, isolating meta instructions from template markup.
- **Topic Analysis:** Automatically scans prompts for 21 core Angular topics (components, services, routing, forms, reactive forms, data binding, DI, lifecycle hooks, HttpClient, CRUD, TypeScript, etc.).

### 9.2 Prompt Engineering Methodology
- Explains the dual-layer architecture: System Prompts (developer-enforced boundaries) vs. User Prompts (dynamic task instructions).
- Teaches the 5 structural pillars: Role, Context, Task, Constraints, and Output Format.
- Features an interactive breakdown of Basic vs. Optimized prompt efficacy.

### 9.3 Task 4: Role-Based Prompting Architecture
- Implements 3 domain archetypes:
  1. **Language Teacher (French):** Generates phonetics, essential vocabulary, café dialogues, and interactive student exercises.
  2. **Angular Developer (Programmer):** Accepts student management or custom web application requirements and outputs folder layouts, models, reactive services, standalone components, and routing.
  3. **Starbucks Marketer:** Synthesizes campaign headlines, core value propositions, TikTok/Instagram copy, and discount CTAs.

### 9.4 Task 5: Chain-of-Thought Boolean Logic Reasoning
- Uses a **Safe Recursive-Descent Parser** to tokenize and evaluate Boolean expressions containing `AND`, `OR`, `NOT`, `XOR`, and nested parentheses.
- Emits numbered educational reasoning steps showing intermediate step-by-step simplification without using JavaScript `eval()`.
- Includes preset classic problems and truth value toggles.

### 9.5 Task 6: Interactive Prompt Optimization Engine
- Compares the baseline prompt (*"Promote a new beverage."*) with the parameterized optimized prompt.
- Allows users to adjust Target Audience, Tone, Product, Goal, Constraints, and Output Format with real-time updates and copy buttons.

### 9.6 Task 7: Structured Prompt Template Generators
- **Template 1 (Amazon Complaint Email):** Captures Customer Name, Order ID, Product, Problem, Date, Resolution, and Tone.
- **Template 2 (Amazon Sales Performance Report):** Captures Reporting Period, Category, Units Sold, Total Orders, Gross Revenue, Top SKU, and Audience.
- Enforces strict multi-section output schemas.

---

## 10. IMPLEMENTATION DETAILS
The system is built with Angular standalone components and Signals:
- `AiAssistantService`: Holds the system prompt, handles validation, detects topics, executes mock AI inference, and manages chat history.
- `BooleanLogicService`: Tokenizes strings into typed tokens and constructs an evaluation trace safely.
- `PromptService`: Manages the prompt library, generates role outputs, runs the optimization engine, and builds template prompts.
- `ClipboardService`: Provides copy-to-clipboard functionality with toast notifications.

---

## 11. UI SCREENSHOT PLACEHOLDERS & DESCRIPTIONS

```
+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 1: Home / Dashboard Page]                       |
| File: docs/screenshots/01_dashboard.png                                 |
| Shows: Student header, metrics, task roadmap, and workflow diagram      |
+-------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 2: AI Coding Assistant Chat UI]                 |
| File: docs/screenshots/02_chat_ui.png                                   |
| Shows: Suggested prompt cards, conversation stream, and input box       |
+-------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 3: Code Response & Copy Code Feature]           |
| File: docs/screenshots/03_code_response.png                             |
| Shows: Standalone component code, syntax block, copy button, and notes  |
+-------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 4: Curated Prompt Library (>= 15 Prompts)]      |
| File: docs/screenshots/04_prompt_library.png                            |
| Shows: Categorized grid, search bar, complexity tags, and actions       |
+-------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 5: Task 4 Role-Based Prompts]                   |
| File: docs/screenshots/05_role_based.png                                |
| Shows: Role tabs (Programmer, Teacher, Marketer) & structured response  |
+-------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 6: Task 5 Boolean Logic Chain-of-Thought Engine]|
| File: docs/screenshots/06_boolean_cot.png                               |
| Shows: Variable toggles, AST evaluation banner, and numbered CoT steps  |
+-------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 7: Task 6 Prompt Optimization Demonstration]    |
| File: docs/screenshots/07_prompt_optimizer.png                          |
| Shows: Side-by-side original vs optimized prompt with parameter matrix  |
+-------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 8: Task 7 Domain-Specific Prompt Templates]     |
| File: docs/screenshots/08_prompt_templates.png                          |
| Shows: Complaint and Sales Report forms with live prompt preview        |
+-------------------------------------------------------------------------+

+-------------------------------------------------------------------------+
| [SCREENSHOT PLACEHOLDER 9: About Project & Task Coverage Page]          |
| File: docs/screenshots/09_about_project.png                             |
| Shows: Student details (MANIKKAVEL S - 811224243033) & mapping table    |
+-------------------------------------------------------------------------+
```

---

## 12. TEST CASES & VERIFICATION RESULTS

| Test ID | Test Scenario / Objective | Input Data / Action | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | Standalone Component generation | Prompt: "Create an Angular component" | Standalone component code, explanation, and notes returned | Returned `user-profile.component.ts` with signals | **PASS** |
| **TC02** | Injectable Service generation | Prompt: "Create an Angular service" | Injectable service with providedIn root and signals returned | Returned `notification.service.ts` | **PASS** |
| **TC03** | Empty prompt validation | Input: `""` or `"   "` | Displays validation error; prevents processing | Error alert shown; message count unchanged | **PASS** |
| **TC04** | Boolean `AND` evaluation | Expr: `A AND B`, A=true, B=false | Result: `FALSE` with educational conjunction step | Result: `false`, step explaining conjunction recorded | **PASS** |
| **TC05** | Boolean `OR` evaluation | Expr: `A OR B`, A=false, B=true | Result: `TRUE` with educational disjunction step | Result: `true`, step explaining disjunction recorded | **PASS** |
| **TC06** | Boolean `NOT` evaluation | Expr: `NOT A`, A=true | Result: `FALSE` with inversion explanation | Result: `false`, step explaining negation recorded | **PASS** |
| **TC07** | Prompt Optimization generator | 6 parameters supplied in Task 6 | Generates structured Starbucks marketer prompt | Generated full 6-parameter structured prompt | **PASS** |
| **TC08** | Amazon Complaint Email prompt | Complaint form filled in Task 7 | Synthesizes 6-part formal complaint prompt | Formatted prompt with order ID and schema created | **PASS** |
| **TC09** | Amazon Sales Report prompt | Sales form filled in Task 7 | Synthesizes 6-part executive sales prompt | Formatted prompt with revenue metrics created | **PASS** |
| **TC10** | Clear chat state management | Click "Clear Chat" button | Message history resets to single initial welcome message | History cleared cleanly to default state | **PASS** |

---

## 13. SAMPLE OUTPUTS

### Sample 1: Angular Login Form Code Generation
```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `...`
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}
```

### Sample 2: Chain-of-Thought Reasoning Step
```text
Expression: (A AND B) OR (NOT C) [A=true, B=false, C=false]
1. [VARIABLE_LOOKUP] A -> value is true
2. [VARIABLE_LOOKUP] B -> value is false
3. [AND] true AND false -> both operands must be true. Result: false
4. [VARIABLE_LOOKUP] C -> value is false
5. [NOT] NOT (false) -> inverts truth value to true
6. [OR] false OR true -> at least one operand is true. Result: true
Final Result: TRUE
```

---

## 14. ADVANTAGES & LIMITATIONS

### Advantages
1. **100% Free & Reproducible:** Zero API key dependencies or subscription costs.
2. **Framework Modernity:** Employs modern Angular standalone components and Signals reactivity.
3. **Robust Security:** Safe AST Boolean parser eliminates `eval()` risks.
4. **Architectural Isolation:** Clean separation between system prompt and user requests.

### Limitations
1. Mock AI engine operates on curated knowledge bases rather than open-domain web browsing.
2. Chat history is currently stored in memory during the active session.

---

## 15. FUTURE ENHANCEMENTS
1. **Real-World API Bridge:** Add an API key configuration drawer to connect directly to the Google Gemini 2.0 Flash API.
2. **WebContainer Live Execution:** Integrate in-browser WebContainer to compile and preview generated Angular components in real time.
3. **Persistent History:** Store conversation logs in IndexedDB or Supabase.

---

## 16. CONCLUSION
The **Angular Coding Assistant** successfully implements all required prompt engineering methodologies and academic mini-project tasks. Through strict system prompt isolation, role-based persona prompting, chain-of-thought Boolean logic evaluation, and domain-specific prompt templates, the project proves how structured prompt engineering can enhance developer productivity, reliability, and code quality in Angular application development.

---

## 17. REFERENCES
1. Google DeepMind & Google Cloud. (2025). *Prompt Engineering Guide and Best Practices*.
2. Angular Team. (2025). *Angular Documentation: Standalone Components and Signals Architecture*. https://angular.dev
3. Wei, J., et al. (2022). *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*. NeurIPS.
4. Mozilla Developer Network (MDN). *Web APIs & Clipboard API Specifications*.
