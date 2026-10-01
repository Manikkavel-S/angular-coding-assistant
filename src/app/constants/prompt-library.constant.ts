import { PromptItem } from '../models/prompt.model';

export const PROMPT_LIBRARY_ITEMS: PromptItem[] = [
  {
    id: 'p1',
    title: 'Create an Angular Standalone Component',
    category: 'components',
    categoryLabel: 'Components',
    description: 'Generate a modern standalone Angular component with TypeScript logic, HTML template, and CSS styling.',
    promptText: 'Act as an expert Angular developer. Create a modern standalone Angular component for a user profile card with input properties (avatar, name, role, email), an output event when clicked, and sleek CSS styling with responsive design.',
    tags: ['Component', 'Standalone', 'Inputs', 'Outputs', 'CSS'],
    complexity: 'Beginner'
  },
  {
    id: 'p2',
    title: 'Create an Injectable Angular Service',
    category: 'services',
    categoryLabel: 'Services',
    description: 'Create a singleton injectable service to manage centralized application state with RxJS BehaviorSubject or Signals.',
    promptText: 'Create an Angular service named NotificationService using @Injectable({ providedIn: "root" }). Include methods to push, dismiss, and observe alert notifications across components with TypeScript typing.',
    tags: ['Service', 'Dependency Injection', 'State', 'Singleton'],
    complexity: 'Intermediate'
  },
  {
    id: 'p3',
    title: 'Explain and Configure Angular Routing',
    category: 'routing',
    categoryLabel: 'Routing',
    description: 'Provide an in-depth explanation of Angular routing, Route configuration, Lazy Loading, and RouterLink.',
    promptText: 'Explain Angular routing with examples of Route definitions, RouterLink, RouterOutlet, route parameters (:id), and canActivate route guards in standalone Angular.',
    tags: ['Routing', 'RouterOutlet', 'Lazy Loading', 'Navigation'],
    complexity: 'Beginner'
  },
  {
    id: 'p4',
    title: 'Angular Reactive Login Form with Validation',
    category: 'forms',
    categoryLabel: 'Forms',
    description: 'Build a production-grade Reactive Form with email/password validation, touched error indicators, and submit handler.',
    promptText: 'Create a responsive Angular Login Form using ReactiveFormsModule, FormBuilder, and Validators (required, email, minLength). Include clean HTML error messages and submit logic.',
    tags: ['Forms', 'ReactiveFormsModule', 'Validation', 'Authentication'],
    complexity: 'Intermediate'
  },
  {
    id: 'p5',
    title: 'Angular Registration Form with Password Confirm',
    category: 'forms',
    categoryLabel: 'Forms',
    description: 'Create a full user registration form with custom password matching validator and real-time validation feedback.',
    promptText: 'Create an Angular user registration form with username, email, password, and confirmPassword fields. Include a custom validator function for password matching and accessible validation alerts.',
    tags: ['Forms', 'Custom Validator', 'FormGroup', 'Auth'],
    complexity: 'Intermediate'
  },
  {
    id: 'p6',
    title: 'Explain Angular Data Binding Mechanisms',
    category: 'data-binding',
    categoryLabel: 'Data Binding',
    description: 'Explain Interpolation {{ }}, Property Binding [ ], Event Binding ( ), and Two-Way Binding [(ngModel)] with diagrams and code.',
    promptText: 'Explain the 4 types of Angular data binding: Interpolation {{ }}, Property Binding [prop], Event Binding (event), and Two-Way Binding [(ngModel)]. Provide code snippets for each.',
    tags: ['Data Binding', 'Interpolation', 'Event Binding', 'Two-Way'],
    complexity: 'Beginner'
  },
  {
    id: 'p7',
    title: 'How Dependency Injection (DI) Works in Angular',
    category: 'di',
    categoryLabel: 'DI & Architecture',
    description: 'Deep dive into Angular hierarchical injectors, providedIn: "root", and the inject() function.',
    promptText: 'Explain how Dependency Injection works in Angular. Detail the injector hierarchy, constructor injection vs modern inject() function, and providedIn root singleton lifecycle.',
    tags: ['DI', 'Injectable', 'inject()', 'Architecture'],
    complexity: 'Intermediate'
  },
  {
    id: 'p8',
    title: 'HttpClient Service for REST API Integration',
    category: 'http',
    categoryLabel: 'HTTP & APIs',
    description: 'Implement an Angular HTTP service with HttpClient, RxJS Observable pipelining, error catching, and typed response interfaces.',
    promptText: 'Create an Angular ApiService using HttpClient that handles GET, POST, PUT, DELETE requests for a Product entity. Include error handling with catchError and strong TypeScript interfaces.',
    tags: ['HttpClient', 'REST API', 'RxJS', 'Observables', 'Error Handling'],
    complexity: 'Intermediate'
  },
  {
    id: 'p9',
    title: 'Build a Full Angular CRUD Application',
    category: 'crud',
    categoryLabel: 'CRUD Application',
    description: 'Step-by-step complete CRUD application structure: Create, Read, Update, Delete with state and local storage.',
    promptText: 'Act as an Angular architect. Create a complete CRUD application for a Student Management System. Provide TypeScript interface, Service with CRUD operations, and Component with table view and modal edit form.',
    tags: ['CRUD', 'Student Management', 'State', 'Service', 'Table'],
    complexity: 'Advanced'
  },
  {
    id: 'p10',
    title: 'Debug and Fix TypeScript Compile Errors',
    category: 'debugging',
    categoryLabel: 'Debugging',
    description: 'Troubleshoot common TypeScript compiler errors such as "Property does not exist on type" and "Object is possibly null".',
    promptText: 'Fix this TypeScript error in Angular: "TS2339: Property id does not exist on type Object". Explain why this occurs, how to define generic interfaces, and provide the fixed code.',
    tags: ['TypeScript', 'Debugging', 'Type Safety', 'Interfaces'],
    complexity: 'Beginner'
  },
  {
    id: 'p11',
    title: 'Create a Reusable UI Button Component',
    category: 'components',
    categoryLabel: 'Components',
    description: 'Create an accessible, variant-driven reusable button component with @Input() for size, variant, loading state, and icon.',
    promptText: 'Create a reusable Angular button component with variants (primary, secondary, danger, outline), loading spinner state, disabled handling, and emit click events.',
    tags: ['Component', 'Reusable', 'UI', 'Variants', 'Accessibility'],
    complexity: 'Beginner'
  },
  {
    id: 'p12',
    title: 'Angular Component Lifecycle Hooks Explained',
    category: 'lifecycle',
    categoryLabel: 'Lifecycle Hooks',
    description: 'Detailed explanation of ngOnInit, ngOnChanges, ngAfterViewInit, ngOnDestroy, and signal effect() equivalents.',
    promptText: 'Explain the complete lifecycle of an Angular component from initialization to destruction. Detail ngOnInit, ngOnChanges, ngDoCheck, ngAfterViewInit, and ngOnDestroy with practical use cases.',
    tags: ['Lifecycle', 'ngOnInit', 'ngOnDestroy', 'ngOnChanges'],
    complexity: 'Intermediate'
  },
  {
    id: 'p13',
    title: 'Responsive Navigation Bar Component',
    category: 'components',
    categoryLabel: 'Components',
    description: 'Build a modern responsive navigation bar with mobile hamburger toggle, active link indicators, and dark-theme CSS.',
    promptText: 'Create a responsive Angular navigation header component with RouterLinkActive, brand logo, desktop links, mobile hamburger drawer, and smooth transition animations.',
    tags: ['Navbar', 'Responsive', 'RouterLink', 'CSS Transitions'],
    complexity: 'Intermediate'
  },
  {
    id: 'p14',
    title: 'Responsive Dashboard Grid Layout',
    category: 'components',
    categoryLabel: 'Components',
    description: 'Create an analytics dashboard layout with responsive metric cards, charts container, and status badges.',
    promptText: 'Create a responsive Angular dashboard page component with summary metric cards, glassmorphic styling, and flexbox/grid layout that adapts from mobile to desktop.',
    tags: ['Dashboard', 'Grid', 'Analytics', 'Glassmorphism'],
    complexity: 'Intermediate'
  },
  {
    id: 'p15',
    title: 'Optimize an Angular Coding Prompt',
    category: 'optimization',
    categoryLabel: 'Prompt Engineering',
    description: 'Transform an ambiguous vague prompt into a structured, highly-effective prompt with Role, Context, Constraints, and Output format.',
    promptText: 'Transform this vague prompt "Make an Angular app" into an optimized prompt using the 5 core prompt engineering principles: Role, Context, Specific Task, Constraints, and Structured Output.',
    tags: ['Prompt Engineering', 'Optimization', 'Best Practices', 'Role-Based'],
    complexity: 'Beginner'
  }
];
