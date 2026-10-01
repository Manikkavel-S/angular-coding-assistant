# VIVA VOCE QUESTIONS & ANSWERS (≥ 20 QUESTIONS)

---

### Q1: What is Prompt Engineering?
**Answer:** Prompt Engineering is the systematic process of designing, structuring, and refining natural language inputs given to Large Language Models (LLMs) to maximize response accuracy, consistency, and alignment with user goals while minimizing hallucinations.

---

### Q2: What is the difference between a System Prompt and a User Prompt?
**Answer:**
- **System Prompt:** A meta-level instruction set defined by application developers to establish the AI’s persona, domain boundaries, ethical guardrails, and output format.
- **User Prompt:** A dynamic task-specific request provided by the end-user (e.g., *"Create a login form"*).

---

### Q3: Why is the System Prompt isolated from the UI in this project?
**Answer:** To enforce clean architectural separation of concerns. The system prompt is stored in `system-prompt.constant.ts` and managed exclusively by `AiAssistantService`. This prevents prompt tampering, hardcoding issues, and allows swapping or updating prompts without modifying visual components.

---

### Q4: Why did you choose Angular for this project?
**Answer:** Angular provides an enterprise-grade framework with built-in Dependency Injection, strict TypeScript typing, modular standalone components, reactive Signals, and declarative routing, making it ideal for building robust developer productivity tools.

---

### Q5: What are Angular Standalone Components?
**Answer:** Standalone components are self-contained Angular components that declare their own dependencies (imports) directly within their `@Component` decorator, eliminating the need for `NgModule` boilerplate and simplifying tree-shaking and lazy loading.

---

### Q6: What are Angular Signals, and how are they used in this project?
**Answer:** Signals are reactive primitives introduced in Angular that hold a value and notify consumers when that value changes. In this project, `signal()`, `computed()`, and `effect()` are used in services (`AiAssistantService`, `PromptService`, `BooleanLogicService`) to manage chat streams, loading states, and reactive filtering with fine-grained reactivity.

---

### Q7: What is Role-Based Prompting (Task 4)?
**Answer:** Role-based prompting instructs the model to adopt a specific professional persona (e.g., French Teacher, Angular Programmer, Starbucks Marketer). This focuses the model's latent knowledge on domain-specific vocabulary, tone, and formatting conventions.

---

### Q8: What is Chain-of-Thought (CoT) Prompting (Task 5)?
**Answer:** Chain-of-Thought prompting is a technique where the model breaks down complex multi-step reasoning problems into explicit intermediate steps before arriving at a final answer, dramatically improving reasoning accuracy.

---

### Q9: How is Boolean Logic evaluated in this application without using JavaScript `eval()`?
**Answer:** We implemented a custom **Safe Recursive-Descent Parser and Tokenizer** in `BooleanLogicService`. It safely breaks expressions into tokens (`VAR`, `AND`, `OR`, `NOT`, `LPAREN`, `RPAREN`) and computes the evaluation tree step-by-step while generating human-readable explanations. This eliminates code injection and security vulnerabilities associated with `eval()`.

---

### Q10: What are the 5 core components of an optimized prompt (Task 6)?
**Answer:**
1. **Role / Persona:** (Who the AI should act as)
2. **Context:** (Background technical stack, environment, dependencies)
3. **Specific Task:** (Clear, unambiguous command)
4. **Constraints:** (Word count limits, required libraries, validation rules)
5. **Output Format:** (Expected structure, e.g. explanation, code, notes)

---

### Q11: What is the purpose of Domain-Specific Prompt Templates (Task 7)?
**Answer:** Prompt templates provide structured form inputs (e.g., customer name, order number, product problem) and automatically format them into a standardized, schema-compliant prompt. This ensures non-technical users can generate professional prompts consistently.

---

### Q12: Why did you use a Mock AI Engine instead of a live API?
**Answer:**
1. **Reliability:** Guarantees zero failures during college demos caused by expired API keys, billing limits, or network drops.
2. **Deterministic Outputs:** Elicits verified, production-quality Angular standalone code.
3. **Cost Efficiency:** 100% free and open to all evaluators.
4. **Pluggable Architecture:** An `AiProvider` interface is implemented so a live API (Gemini/OpenAI) can replace the mock engine instantly.

---

### Q13: How can a real AI API like Gemini 2.0 Flash or OpenAI be connected?
**Answer:** Implement the `AiProvider` interface in a new service (`GeminiProviderService`), make an HTTP `POST` request to the API endpoint with the combined system and user prompt, and inject it into `AiAssistantService` via Angular’s Dependency Injection.

---

### Q14: How does Dependency Injection work in Angular?
**Answer:** Angular’s DI system creates and delivers dependent services to classes that request them. Using `@Injectable({ providedIn: 'root' })` registers a service as an application-level singleton, which can then be injected via constructor injection or the modern `inject()` function.

---

### Q15: What is the function of `<router-outlet></router-outlet>`?
**Answer:** `<router-outlet>` is a placeholder directive where the Angular Router dynamically renders the component matched by the current browser URL route.

---

### Q16: How does the application handle clipboard copying safely?
**Answer:** The `ClipboardService` first attempts to use the modern asynchronous `navigator.clipboard.writeText()` API. If unsupported or blocked, it gracefully falls back to creating an invisible `textarea` and invoking `document.execCommand('copy')`, with toast notifications informing the user.

---

### Q17: What happens if a user submits an empty or invalid prompt?
**Answer:** The `AiAssistantService` validates input length and whitespace before execution. If invalid, it sets a reactive error signal `lastError`, which displays a non-intrusive alert banner on the UI without crashing the application.

---

### Q18: How does the application detect topics from user input?
**Answer:** The `AiAssistantService` includes a prompt analysis layer that scans the user prompt against 21 Angular architectural keywords (such as `components`, `services`, `routing`, `forms`, `DI`, `HttpClient`, etc.) and attaches topic metadata to the response.

---

### Q19: What is the significance of the 21 passing unit tests?
**Answer:** The unit tests prove that all core services (`AiAssistantService`, `BooleanLogicService`, `PromptService`, `App`) function correctly according to the project specifications across 10 distinct test scenarios (`TC01` to `TC10`).

---

### Q20: What are the primary future enhancements planned for this project?
**Answer:**
1. Direct integration with Google Gemini 2.0 API.
2. Live in-browser component preview using WebContainer / StackBlitz engine.
3. Multi-session chat history persistence using IndexedDB.
