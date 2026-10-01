# Angular Coding Assistant

> **Subtitle:** Prompt-Based AI Assistant for Angular Development  
> **Header Tagline:** *"Your Prompt-Based AI Assistant for Angular Development"*

---

## 🌐 Live Demo

**https://angular-coding-assistant-manikkavel.netlify.app**

Hosted on Netlify (free tier) with HTTPS and full SPA route support.  
All features work from the live URL — no server required.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start dev server (opens at http://localhost:4200)
npm start
```

## 📦 Production Build

```bash
npm run build
# Output: dist/angular-coding-assistant/browser/
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

```bash
# Add SPA fallback, then deploy to Netlify:
echo "/* /index.html 200" > dist/angular-coding-assistant/browser/_redirects
netlify deploy --dir="dist/angular-coding-assistant/browser" --prod --no-build
```

---


## 🎓 Academic Project Information
- **Student Name:** MANIKKAVEL S
- **Register Number:** 811224243033
- **Course / Degree:** B.Tech, Artificial Intelligence & Data Science
- **Project Title:** Designing a Prompt-Based AI Assistant – Angular Coding Assistant
- **Assignment Tasks Covered:** Mini Project (Coding AI Assistant), Task 4 (Role-based prompts), Task 5 (Chain-of-thought / structured reasoning), Task 6 (Prompt optimization), Task 7 (Prompt templates)

---

## 🌟 Executive Overview
**Angular Coding Assistant** is a modern, standalone web application engineered from the ground up to showcase state-of-the-art **Prompt Engineering** techniques integrated with Angular application development. 

The application features a clean, developer-focused aesthetic without third-party UI framework dependencies. It utilizes an extensible, local Mock AI inference engine (requiring zero API keys or external paid subscriptions) that is architecturally prepared for drop-in real-world LLM APIs (such as Google Gemini or OpenAI).

---

## 🚀 Key Features & Modules

### 1. Interactive AI Coding Chat (`/chat`)
- **System Prompt Isolation:** Enforces consistent Angular domain persona and formatting standards.
- **Topic Analysis Layer:** Identifies over 21 Angular topics (Components, Services, Routing, Reactive Forms, Signals, Data Binding, DI, Lifecycle Hooks, HttpClient, etc.).
- **Code Block Formatting:** Clean syntax presentation preserving line breaks and indentation.
- **Copy Code System:** Working one-click clipboard copy button with visual feedback and cross-browser fallback.
- **Suggested Prompt Cards:** 8 instant prompt cards for 1-click execution.
- **Safety & Error Handling:** Empty-input validation, message history management, and clear chat.

### 2. Curated Angular Prompt Library (`/prompt-library`)
- Over 15 battle-tested, structured prompt templates across 7 categories.
- Real-time search filtering by keyword, concept, and tag.
- Complexity indicators (Beginner, Intermediate, Advanced).
- One-click copy or direct routing to the AI chat workspace.

### 3. Prompt Engineering Theory & Anatomy (`/prompt-engineering`)
- In-depth architectural explanation of **System Prompt (Layer 1)** vs. **User Prompt (Layer 2)**.
- Detailed breakdown of the **5 Core Prompt Pillars**: Role/Persona, Context, Specific Task, Constraints, and Output Format.
- Live Basic vs. Optimized prompt breakdown demonstration with visual parameter tags.

### 4. Task 4: Role-Based Persona Prompting (`/role-based`)
- Domain-specific persona switching between 3 distinct archetypes:
  1. **Language Teacher (French):** Phonics, greetings, vocabulary, and café dialogues.
  2. **Angular Developer (Programmer):** End-to-end architecture, interfaces, reactive state services, components, and routing.
  3. **Starbucks Marketer:** Value propositions, TikTok/Instagram copy, and limited-time promotions.
- Interactive requirement inputs with sample loaders.

### 5. Task 5: Chain-of-Thought Boolean Logic Engine (`/boolean-logic`)
- Custom safe AST Recursive-Descent Tokenizer and Parser (**Zero `eval()`**).
- Educational step-by-step reasoning trace illustrating logical simplification for `AND`, `OR`, `NOT`, `XOR`, and parentheses.
- Interactive variable toggles (A, B, C) and preloaded classic Boolean problems.

### 6. Task 6: Prompt Optimization Engine (`/prompt-optimization`)
- Interactive parameter tuner allowing users to adjust Target Audience, Tone, Product/Service, Goal, Constraints, and Output Format.
- Side-by-side comparison of original vague prompts vs. optimized 6-parameter structured prompts.

### 7. Task 7: Domain-Specific Prompt Templates (`/prompt-templates`)
- Form-driven structured prompt synthesizers with real-time preview and copy functionality:
  1. **Template 1:** Amazon Customer Complaint Email Generator.
  2. **Template 2:** Amazon Quarterly Sales Performance Report Generator.

---

## 🛠️ Technology Stack
- **Framework:** Angular 22 (Latest stable standalone architecture)
- **Language:** TypeScript 5.9+ with strict mode
- **State Management:** Angular Signals (`signal`, `computed`, `effect`)
- **Styling:** Custom CSS with CSS Custom Properties, Dark Mode theme, and Glassmorphism
- **Routing:** Angular Standalone Router with lazy component loading
- **Testing:** Angular Test Runner & Vitest suite (21 unit tests, 100% passing)

---

## 📦 Project Directory Structure
```text
angular-coding-assistant/
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── README.md
├── docs/
│   ├── mini-project-report.md
│   ├── presentation-content.md
│   ├── viva-questions.md
│   └── screenshot-checklist.md
├── public/
│   └── favicon.ico
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    └── app/
        ├── app.ts
        ├── app.html
        ├── app.css
        ├── app.routes.ts
        ├── app.config.ts
        ├── app.spec.ts
        ├── constants/
        │   ├── system-prompt.constant.ts
        │   ├── prompt-library.constant.ts
        │   └── mock-responses.constant.ts
        ├── models/
        │   ├── chat-message.model.ts
        │   ├── prompt.model.ts
        │   └── boolean-logic.model.ts
        ├── services/
        │   ├── ai-assistant.service.ts
        │   ├── prompt.service.ts
        │   ├── boolean-logic.service.ts
        │   └── clipboard.service.ts
        └── components/
            ├── header/
            ├── chat/
            ├── chat-message/
            ├── dashboard/
            ├── prompt-library/
            ├── prompt-engineering/
            ├── role-based/
            ├── boolean-logic/
            ├── prompt-optimization/
            ├── prompt-templates/
            └── about/
```

---

## ⚡ Installation & Execution Guide

### Prerequisites
- Node.js (v18.x or higher, v22/v24 recommended)
- npm (v9.x or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm start
# or
npx ng serve
```
Open your browser and navigate to:
```
http://localhost:4200
```

### 3. Run Automated Unit Tests
```bash
npm test -- --watch=false
```

### 4. Build for Production
```bash
npm run build
```

---

## 🧪 Automated Test Suite (21 Tests)
The project includes automated unit test suites verifying all core logic and test cases:
- `TC01`: Angular component request → returns standalone component code and guidance (**PASSED**)
- `TC02`: Angular service request → returns injectable service code and state management (**PASSED**)
- `TC03`: Empty input validation → triggers validation error message without crashing (**PASSED**)
- `TC04`: Boolean `AND` evaluation → returns correct truth table and step reasoning (**PASSED**)
- `TC05`: Boolean `OR` evaluation → returns correct truth table and step reasoning (**PASSED**)
- `TC06`: Boolean `NOT` evaluation → returns correct negation and step reasoning (**PASSED**)
- `TC07`: Prompt Optimization → generates structured 6-parameter optimized prompt (**PASSED**)
- `TC08`: Complaint Template → generates complete Amazon complaint prompt (**PASSED**)
- `TC09`: Sales Report Template → generates complete Amazon sales report prompt (**PASSED**)
- `TC10`: Clear Chat → resets chat history and state (**PASSED**)

---

## 🔮 Future Enhancements
1. **Live LLM Integration:** Connect the `AiProvider` interface to the Google Gemini 2.0 Flash or OpenAI API via secure backend proxy.
2. **Persistent Storage:** Integrate IndexedDB or Firebase for multi-session chat history saving.
3. **Interactive Code Playground:** Embed a live in-browser WebContainer / StackBlitz runner for instant Angular component execution.
4. **Syntax Token Highlighter:** Integrate Prism.js or highlight.js for advanced multi-language syntax theme selection.

---

## 📄 License
Academic Mini-Project Submission for Anna University / Autonomous College Curriculum. Developed by **MANIKKAVEL S (811224243033)**.
#   a n g u l a r - c o d i n g - a s s i s t a n t  
 