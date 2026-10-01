# PRESENTATION SLIDES CONTENT (15 SLIDES)

---

### Slide 1: Title Slide
- **Project Title:** Designing a Prompt-Based AI Assistant – Angular Coding Assistant
- **Subtitle:** Prompt-Based AI Assistant for Angular Development
- **Student Name:** MANIKKAVEL S | **Register Number:** 811224243033
- **Degree & Branch:** B.Tech Artificial Intelligence & Data Science
- **Core Focus:** Standalone Angular Architecture & Advanced Prompt Engineering Techniques

---

### Slide 2: Introduction & Background
- **Prompt Engineering:** The discipline of designing structured prompts to maximize AI accuracy and reduce hallucinations.
- **Angular Modernization:** Modern Angular emphasizes standalone components, signal-based reactivity, and strict typing.
- **Project Purpose:** Build an autonomous web assistant that guides developers through Angular coding with tailored prompt templates, roles, and reasoning.

---

### Slide 3: Problem Statement
- Generic AI chatbots produce outdated Angular syntax (e.g. NgModule-heavy, deprecated APIs).
- Basic prompts lack context, validation rules, constraints, and structured output formatting.
- Educational AI tools often fail when external paid API quotas expire during evaluations.
- Unstructured Boolean logic evaluation in LLMs often produces logical errors without step-by-step reasoning.

---

### Slide 4: Objectives
- Implement an autonomous Angular standalone web application with zero external UI library bloat.
- Isolate the System Prompt from UI logic using an independent service architecture.
- Cover all assignment tasks: Mini Project, Task 4 (Roles), Task 5 (Boolean CoT), Task 6 (Optimization), and Task 7 (Templates).
- Build a safe recursive-descent Boolean AST parser (no `eval()`).
- Implement automated unit tests achieving 100% passing results.

---

### Slide 5: Proposed System Overview
- **Zero Cost & Offline:** High-fidelity local Mock AI engine; zero API keys required.
- **Provider Pattern:** `AiProvider` interface ready for instant Gemini 2.0 / OpenAI API drop-in.
- **Aesthetic Excellence:** Modern developer-tool dark theme, glassmorphism, responsive navigation.
- **Full Transparency:** Educational step-by-step reasoning traces and parameter breakdown matrix.

---

### Slide 6: Technologies Used
- **Frontend Framework:** Angular 22 (Standalone components, no NgModules).
- **Language:** TypeScript 5.9+ with strict mode type checking.
- **State Management:** Angular Signals (`signal`, `computed`, `effect`).
- **Styling:** Vanilla CSS with custom design tokens and media queries.
- **Testing:** Native Angular test runner with Vitest (21 automated unit tests).

---

### Slide 7: System Architecture & Workflow
- **Pipeline:** User Prompt → Validation → System Prompt Synthesis → Topic Detection → Provider Execution → Structured Markdown / Code Output.
- **Topic Detector:** Automatically identifies 21 Angular architectural domains (Routing, DI, Signals, Reactive Forms, etc.).
- **Response Format:** Explanation → Syntax Highlighted Code with Copy Button → Key Best Practice Notes.

---

### Slide 8: Mini-Project Module: AI Coding Chat
- Interactive conversation interface with timestamps, user/bot avatars, and clear chat.
- 8 one-click suggested prompt cards (Login Form, Service, Routing, CRUD, Data Binding, DI, etc.).
- System Prompt preview modal showing active behavioral instructions and detected topic chips.
- Interactive copy-to-clipboard functionality with cross-browser fallback and toast alerts.

---

### Slide 9: Prompt Engineering Theory & Anatomy
- **Dual-Layer Architecture:** System Prompt (Layer 1 meta-rules) vs. User Prompt (Layer 2 task commands).
- **The 5 Core Pillars:**
  1. Role / Persona
  2. Context & Environment
  3. Specific Task
  4. Constraints & Boundaries
  5. Structured Output Format
- Live Basic vs. Optimized prompt comparative breakdown.

---

### Slide 10: Task 4: Role-Based Prompting
- Persona-driven prompting for 3 distinct domain archetypes:
  - **Language Teacher (French):** Phonics, greetings, vocabulary, and café conversation.
  - **Angular Developer (Programmer):** End-to-end application architecture, models, state services, and routing.
  - **Starbucks Marketer:** Promotional headlines, Instagram/TikTok captions, and student discount CTAs.
- Interactive requirement customization with 1-click sample loaders.

---

### Slide 11: Task 5: Boolean Logic Chain-of-Thought
- Safe Recursive-Descent Tokenizer & AST Parser without JavaScript `eval()`.
- Supports `AND`, `OR`, `NOT`, `XOR`, and nested parentheses.
- Emits numbered educational reasoning steps showing intermediate step-by-step simplification.
- Preloaded classic Boolean example problems and variable truth toggles (A, B, C).

---

### Slide 12: Task 6: Prompt Optimization Demonstration
- Demonstrates transforming basic prompts (*"Promote a new beverage."*) into 6-parameter structured prompts.
- Interactive parameter tuner: Target Audience, Campaign Tone, Product/Service, Goal, Constraints, Output Format.
- Live side-by-side comparison with instant copy button and parameter breakdown matrix.

---

### Slide 13: Task 7: Structured Prompt Templates
- **Template 1: Amazon Customer Complaint Email**
  - Inputs: Name, Order ID, Product, Problem, Date, Resolution, Tone.
  - Schema: Subject line, greeting, problem statement, order table, resolution, closing.
- **Template 2: Amazon Sales Performance Report**
  - Inputs: Period, Category, Units, Orders, Revenue, Top SKU, Target Audience.
  - Schema: Executive summary, category analysis, revenue trends, recommendations.

---

### Slide 14: Testing & Verification Results
- **Automated Unit Tests:** 21 test specs across 4 suites (**100% Passed**).
- **Key Verified Test Cases:**
  - `TC01` Component generation | `TC02` Service generation | `TC03` Empty prompt validation
  - `TC04` Boolean AND | `TC05` Boolean OR | `TC06` Boolean NOT
  - `TC07` Optimization generator | `TC08` Complaint template | `TC09` Sales report template
  - `TC10` Clear chat history
- Production build verified with zero bundle budget warnings.

---

### Slide 15: Conclusion & Future Scope
- **Conclusion:** The project demonstrates how structured prompt engineering unlocks accurate, secure, and production-grade Angular code generation.
- **Future Scope:**
  1. Live Gemini / OpenAI API integration via backend gateway.
  2. In-browser live Angular execution playground via WebContainers.
  3. Persistent multi-session conversation history with cloud database sync.
- **Thank You!** Questions & Discussion.
