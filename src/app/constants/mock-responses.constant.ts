import { CodeResponse } from '../models/chat-message.model';

export const MOCK_KNOWLEDGE_BASE: Record<string, CodeResponse> = {
  // 1. Create Component
  'create-component': {
    detectedTopic: 'Components (Standalone)',
    matchedKeywords: ['component', 'create component', 'user profile', 'standalone'],
    explanation: 'In modern Angular, components are standalone by default. A standalone component manages its own template, styles, imports, and reactive state without requiring NgModule declarations.',
    codeBlock: {
      language: 'typescript',
      filename: 'user-profile.component.ts',
      code: `import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="profile-card">
      <img [src]="user().avatarUrl" [alt]="user().name" class="avatar" />
      <div class="details">
        <h3>{{ user().name }}</h3>
        <span class="badge">{{ user().role }}</span>
        <p class="email">{{ user().email }}</p>
      </div>
      <button class="btn-action" (click)="onSelect.emit(user())">
        View Profile
      </button>
    </div>
  \`,
  styles: [\`
    .profile-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: #1a2234;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      color: #f3f4f6;
    }
    .avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #6366f1;
    }
    .badge {
      font-size: 0.75rem;
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      padding: 2px 8px;
      border-radius: 999px;
    }
    .btn-action {
      margin-left: auto;
      background: #6366f1;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
    }
  \`]
})
export class UserProfileComponent {
  // Modern Signal-based inputs and outputs
  readonly user = input.required<UserProfile>();
  readonly onSelect = output<UserProfile>();
}`
    },
    importantNotes: [
      'Standalone components eliminate the need for NgModules, simplifying the mental model and tree-shaking.',
      'Angular modern signal inputs input() and output() provide full type safety and automatic reactivity.',
      'Always import CommonModule or required directives in the imports array.'
    ],
    suggestedFollowUps: [
      'How do I test this standalone component?',
      'How do I pass data using Angular signals?',
      'Create an Angular service'
    ]
  },

  // 2. Create Service
  'create-service': {
    detectedTopic: 'Services & Dependency Injection',
    matchedKeywords: ['service', 'create service', 'injectable', 'state'],
    explanation: 'Angular Services are singleton classes decorated with @Injectable({ providedIn: "root" }). They encapsulate business logic, API communication, and centralized state management across multiple components.',
    codeBlock: {
      language: 'typescript',
      filename: 'notification.service.ts',
      code: `import { Injectable, signal, computed } from '@angular/core';

export interface AppNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root' // Singleton provided at application root level
})
export class NotificationService {
  // Private reactive state using modern Angular Signals
  private readonly _notifications = signal<AppNotification[]>([]);

  // Public read-only signal computed accessor
  readonly notifications = this._notifications.asReadonly();
  readonly unreadCount = computed(() => this._notifications().length);

  /**
   * Add a new notification
   */
  notify(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
    const newNotification: AppNotification = {
      id: crypto.randomUUID(),
      message,
      type,
      timestamp: new Date()
    };
    
    this._notifications.update(current => [newNotification, ...current]);
  }

  /**
   * Dismiss a notification by ID
   */
  dismiss(id: string): void {
    this._notifications.update(current => current.filter(n => n.id !== id));
  }

  /**
   * Clear all active notifications
   */
  clearAll(): void {
    this._notifications.set([]);
  }
}`
    },
    importantNotes: [
      'Using providedIn: "root" registers the service as a tree-shakeable application-level singleton.',
      'Using Angular Signals (signal, computed) in services provides reactive state management with minimal boilerplate.',
      'Inject services into components using constructor injection or the modern inject(NotificationService) function.'
    ],
    suggestedFollowUps: [
      'How to inject services using inject() function?',
      'Create an HttpClient service for REST APIs',
      'Explain Angular data binding'
    ]
  },

  // 3. Explain Routing
  'explain-routing': {
    detectedTopic: 'Routing & Navigation',
    matchedKeywords: ['routing', 'router', 'routerlink', 'routeroutlet', 'routes', 'explain routing'],
    explanation: 'Angular Router enables Single Page Application (SPA) navigation by mapping URL paths to specific components without full browser page reloads.',
    codeBlock: {
      language: 'typescript',
      filename: 'app.routes.ts',
      code: `import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Auth Guard function
const authGuard = () => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  return isAuthenticated ? true : router.parseUrl('/login');
};

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'students',
    loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'students/:id',
    loadComponent: () => import('./students/student-detail.component').then(m => m.StudentDetailComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**', // Wildcard 404 handler
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];`
    },
    importantNotes: [
      '<router-outlet></router-outlet> acts as the placeholder container where matched components are rendered.',
      'Use [routerLink]="[\'/path\']" and routerLinkActive="active-tab" in HTML templates for declarative navigation.',
      'loadComponent with dynamic import() enables automatic code splitting and lazy loading of routes.'
    ],
    suggestedFollowUps: [
      'How to pass query params in Angular router?',
      'Create an Angular login form',
      'Explain Angular lifecycle hooks'
    ]
  },

  // 4. Login Form
  'login-form': {
    detectedTopic: 'Reactive Forms & Validation',
    matchedKeywords: ['login', 'login form', 'reactive forms', 'formbuilder', 'validators'],
    explanation: 'Angular Reactive Forms provide a model-driven approach to handling form inputs whose values change over time. They offer programmatic validation, testability, and reactive streams.',
    codeBlock: {
      language: 'typescript',
      filename: 'login.component.ts',
      code: `import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="login-card">
      <h2>Welcome Back</h2>
      <p class="subtitle">Please enter your credentials to sign in.</p>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            id="email" 
            type="email" 
            formControlName="email" 
            placeholder="developer@example.com"
            [class.invalid]="isFieldInvalid('email')" 
          />
          @if (isFieldInvalid('email')) {
            <span class="error-msg">
              @if (loginForm.get('email')?.hasError('required')) { Email is required. }
              @if (loginForm.get('email')?.hasError('email')) { Enter a valid email format. }
            </span>
          }
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password" 
            type="password" 
            formControlName="password" 
            placeholder="••••••••"
            [class.invalid]="isFieldInvalid('password')" 
          />
          @if (isFieldInvalid('password')) {
            <span class="error-msg">
              Password must be at least 6 characters.
            </span>
          }
        </div>

        <button type="submit" [disabled]="loginForm.invalid || isSubmitting" class="btn-submit">
          {{ isSubmitting ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
    </div>
  \`,
  styles: [\`
    .login-card { max-width: 420px; margin: 2rem auto; padding: 2rem; background: #161e2e; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
    .form-group { margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
    input { padding: 0.75rem; background: #0b0f19; border: 1px solid #2d3748; border-radius: 6px; color: #fff; }
    input.invalid { border-color: #ef4444; }
    .error-msg { font-size: 0.8rem; color: #ef4444; }
    .btn-submit { width: 100%; padding: 0.8rem; background: #6366f1; color: #fff; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  \`]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  isSubmitting = false;

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.loginForm.value;
      console.log('Authenticating with:', { email, password });
      // Execute authentication service call here
    }
  }
}`
    },
    importantNotes: [
      'Always import ReactiveFormsModule in your standalone component imports array.',
      'Check control.touched || control.dirty so errors do not display before user interaction.',
      'Use FormBuilder for a clean, concise declarative syntax when setting up form groups and controls.'
    ],
    suggestedFollowUps: [
      'Create a registration form with custom password matching validator',
      'Explain Angular data binding',
      'Create an HTTP API service'
    ]
  },

  // 5. Registration Form
  'registration-form': {
    detectedTopic: 'Forms & Custom Validators',
    matchedKeywords: ['registration', 'register form', 'registration form', 'custom validator', 'password match'],
    explanation: 'A registration form typically requires multi-field cross-validation (e.g. matching Password and Confirm Password) using a custom FormGroup validator function.',
    codeBlock: {
      language: 'typescript',
      filename: 'registration.component.ts',
      code: `import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Custom Validator function for password confirmation match
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="register-container">
      <h2>Create New Account</h2>
      <form [formGroup]="regForm" (ngSubmit)="onRegister()">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" formControlName="fullName" placeholder="John Doe" />
        </div>

        <div class="form-group">
          <label>Email Address</label>
          <input type="email" formControlName="email" placeholder="john@example.com" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" formControlName="password" placeholder="Min 8 characters" />
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" formControlName="confirmPassword" placeholder="Confirm password" />
          @if (regForm.hasError('passwordMismatch') && regForm.get('confirmPassword')?.touched) {
            <span class="error">Passwords do not match!</span>
          }
        </div>

        <button type="submit" [disabled]="regForm.invalid" class="btn-reg">Register</button>
      </form>
    </div>
  \`
})
export class RegistrationComponent {
  private readonly fb = inject(FormBuilder);

  readonly regForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: [passwordMatchValidator] });

  onRegister(): void {
    if (this.regForm.valid) {
      console.log('Registration submitted:', this.regForm.value);
    }
  }
}`
    },
    importantNotes: [
      'Cross-field validation rules are placed at the FormGroup options level ({ validators: [passwordMatchValidator] }).',
      'Check group.hasError("passwordMismatch") directly on the form instance.',
      'Always disable submit buttons when form.invalid is true to prevent faulty state.'
    ],
    suggestedFollowUps: [
      'How to do async validators for email uniqueness in Angular?',
      'Create an Angular login form',
      'Explain Angular routing'
    ]
  },

  // 6. Explain Data Binding
  'explain-data-binding': {
    detectedTopic: 'Data Binding Mechanisms',
    matchedKeywords: ['data binding', 'interpolation', 'property binding', 'event binding', 'two way binding', 'explain data binding'],
    explanation: 'Data binding coordinates communication between a component TypeScript class (business logic) and its HTML template (view). Angular supports four fundamental data binding techniques.',
    codeBlock: {
      language: 'typescript',
      filename: 'data-binding-demo.component.ts',
      code: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding-demo',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <!-- 1. Interpolation: Component Class -> DOM Text (One-way) -->
    <h2>1. Interpolation: {{ title() }}</h2>

    <!-- 2. Property Binding: Component Property -> DOM Property (One-way) -->
    <img [src]="imageUrl" [alt]="imageDescription" [disabled]="isDisabled" />

    <!-- 3. Event Binding: DOM Event -> Component Method (One-way) -->
    <button (click)="handleButtonClick($event)" class="btn">
      Clicked {{ clickCount() }} times
    </button>

    <!-- 4. Two-Way Binding: Component Property <-> DOM Form Input (Two-way) -->
    <input [(ngModel)]="username" placeholder="Type username..." />
    <p>Live synchronized username: {{ username }}</p>
  \`
})
export class DataBindingDemoComponent {
  // Signals & Properties
  readonly title = signal('Mastering Angular Data Binding');
  imageUrl = 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png';
  imageDescription = 'Angular Official Logo';
  isDisabled = false;
  
  readonly clickCount = signal(0);
  username = 'Manikkavel';

  handleButtonClick(event: MouseEvent): void {
    this.clickCount.update(c => c + 1);
    console.log('Button clicked at coordinates:', event.clientX, event.clientY);
  }
}`
    },
    importantNotes: [
      'Interpolation: {{ expression }} embeds calculated dynamic text into the view.',
      'Property Binding: [property]="value" sets attributes, classes, styles, and component inputs.',
      'Event Binding: (event)="handler($event)" listens to DOM and custom component output events.',
      'Two-Way Binding: [(ngModel)]="property" combines property and event binding (Banana in a Box) using FormsModule.'
    ],
    suggestedFollowUps: [
      'How do Angular Signals improve change detection?',
      'Explain Dependency Injection in Angular',
      'Create an Angular component'
    ]
  },

  // 7. Explain Dependency Injection
  'explain-di': {
    detectedTopic: 'Dependency Injection (DI)',
    matchedKeywords: ['dependency injection', 'di', 'explain di', 'how does dependency injection work', 'inject', 'injector'],
    explanation: 'Dependency Injection is a design pattern in which a class requests dependencies from external sources rather than creating them itself. Angular has a built-in hierarchical dependency injection framework.',
    codeBlock: {
      language: 'typescript',
      filename: 'di-showcase.component.ts',
      code: `import { Component, Injectable, inject } from '@angular/core';

// Step 1: Define an Injectable Service
@Injectable({
  providedIn: 'root' // Singleton injector available across the entire app
})
export class LoggerService {
  log(message: string): void {
    console.log(\`[AppLog \${new Date().toISOString()}]: \${message}\`);
  }
}

// Step 2: Injecting the service in a Standalone Component
@Component({
  selector: 'app-di-showcase',
  standalone: true,
  template: \`
    <div class="card">
      <h3>Dependency Injection Demonstration</h3>
      <button (click)="triggerLog()">Write Log Entry</button>
    </div>
  \`
})
export class DiShowcaseComponent {
  // Method A: Modern Angular inject() function (Recommended)
  private readonly logger = inject(LoggerService);

  // Method B: Traditional constructor injection
  // constructor(private logger: LoggerService) {}

  triggerLog(): void {
    this.logger.log('Action performed from DiShowcaseComponent');
  }
}`
    },
    importantNotes: [
      'providedIn: "root" provides the dependency in the root application injector (singleton instance).',
      'The modern inject() function provides clean injection directly in property initializers and functional guards/interceptors.',
      'Hierarchical Injectors allow providing services at Module, Route, or Component levels for scoped instance lifecycles.'
    ],
    suggestedFollowUps: [
      'What is the difference between providedIn root and component providers?',
      'Create an Angular service',
      'Create an HttpClient REST API service'
    ]
  },

  // 8. CRUD Application
  'crud-app': {
    detectedTopic: 'Complete CRUD Application',
    matchedKeywords: ['crud', 'crud app', 'crud application', 'create a crud application', 'student management'],
    explanation: 'A complete CRUD (Create, Read, Update, Delete) application in Angular combines a typed model interface, an injectable state management service, and an interactive UI component.',
    codeBlock: {
      language: 'typescript',
      filename: 'student-crud.service.ts',
      code: `import { Injectable, signal, computed } from '@angular/core';

export interface Student {
  id: string;
  regNo: string;
  name: string;
  department: string;
  cgpa: number;
}

@Injectable({ providedIn: 'root' })
export class StudentCrudService {
  // Centralized signal state
  private readonly _students = signal<Student[]>([
    { id: '1', regNo: '811224243033', name: 'MANIKKAVEL S', department: 'Computer Science', cgpa: 9.2 },
    { id: '2', regNo: '811224243012', name: 'Ananya Sharma', department: 'Information Tech', cgpa: 8.8 },
    { id: '3', regNo: '811224243045', name: 'Rahul Verma', department: 'Artificial Intelligence', cgpa: 9.0 }
  ]);

  readonly students = this._students.asReadonly();
  readonly studentCount = computed(() => this._students().length);

  // CREATE
  create(student: Omit<Student, 'id'>): void {
    const newStudent: Student = { ...student, id: crypto.randomUUID() };
    this._students.update(list => [...list, newStudent]);
  }

  // READ by ID
  getById(id: string): Student | undefined {
    return this._students().find(s => s.id === id);
  }

  // UPDATE
  update(id: string, updatedData: Partial<Student>): void {
    this._students.update(list => 
      list.map(s => s.id === id ? { ...s, ...updatedData } : s)
    );
  }

  // DELETE
  delete(id: string): void {
    this._students.update(list => list.filter(s => s.id !== id));
  }
}`
    },
    importantNotes: [
      'Immutable state updates using this._students.update() guarantee optimal change detection cycles.',
      'Computed signals (e.g. studentCount) derive values automatically with zero manual subscriptions.',
      'Separate service logic cleanly from UI templates for high maintainability and testability.'
    ],
    suggestedFollowUps: [
      'Create an Angular component for the CRUD UI table and form',
      'Add local storage persistence to the CRUD service',
      'Explain Angular data binding'
    ]
  },

  // 9. HTTP API Request
  'http-request': {
    detectedTopic: 'HttpClient & REST API Integration',
    matchedKeywords: ['http', 'httpclient', 'rest', 'api', 'http api request', 'get post'],
    explanation: 'Angular HttpClient provides a robust HTTP communication layer built on RxJS Observables, supporting request interceptors, typed responses, and structured error handling.',
    codeBlock: {
      language: 'typescript',
      filename: 'api-product.service.ts',
      code: `import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: { rate: number; count: number };
}

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://fakestoreapi.com/products';

  /**
   * GET: Retrieve all products
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      retry(2), // Automatically retry up to 2 times on transient failures
      catchError(this.handleError)
    );
  }

  /**
   * POST: Create a new product
   */
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Centralized Error Handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown network error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = \`Client Error: \${error.error.message}\`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = \`Server Error: HTTP \${error.status} - \${error.message}\`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}`
    },
    importantNotes: [
      'Enable HttpClient in app.config.ts by adding provideHttpClient() to the app providers.',
      'Always use typed generics like http.get<Product[]>(url) to ensure TypeScript compile-time safety.',
      'Use the RxJS pipe(retry(n), catchError(...)) pattern for resilient network calls.'
    ],
    suggestedFollowUps: [
      'How to create an HTTP Interceptor for JWT authentication headers?',
      'Create a CRUD application',
      'Explain Angular services'
    ]
  },

  // 10. Fix TypeScript Error
  'fix-ts-error': {
    detectedTopic: 'TypeScript Error Debugging',
    matchedKeywords: ['fix typescript error', 'ts error', 'typescript error', 'property does not exist', 'debug', 'debugging'],
    explanation: 'The error "TS2339: Property \'x\' does not exist on type \'y\'" occurs when TypeScript cannot verify the existence of a property on a specified type due to generic type erasure or missing interface definitions.',
    codeBlock: {
      language: 'typescript',
      filename: 'solution-fix.ts',
      code: `// ❌ PROBLEM CODE CAUSING TS2339:
// const user: object = { id: 101, name: 'Manikkavel' };
// console.log(user.id); // Error: Property 'id' does not exist on type 'object'.

// ✅ SOLUTION 1: Define a strongly-typed interface (Best Practice)
export interface UserRecord {
  id: number;
  name: string;
  role?: string; // Optional property
}

const user: UserRecord = {
  id: 101,
  name: 'Manikkavel',
  role: 'Admin'
};
console.log(user.id); // ✅ Works cleanly with full IntelliSense autocomplete

// ✅ SOLUTION 2: Using Record<string, unknown> for dynamic key-value maps
const dynamicMap: Record<string, unknown> = {
  id: 101,
  name: 'Manikkavel'
};
console.log(dynamicMap['id']); // ✅ Safe dictionary access

// ✅ SOLUTION 3: Type narrowing with Type Guards
function isUserRecord(obj: unknown): obj is UserRecord {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj;
}`
    },
    importantNotes: [
      'Never type objects as object or any. Define descriptive TypeScript interfaces for every entity.',
      'Use type guards (arg is Type) to safely narrow unknown API payloads.',
      'Enable strict: true in tsconfig.json to catch type discrepancies at compile-time before runtime errors.'
    ],
    suggestedFollowUps: [
      'How to type Angular form value objects in TypeScript?',
      'Create an Angular component',
      'Explain Angular data binding'
    ]
  },

  // 11. Reusable Button Component
  'reusable-button': {
    detectedTopic: 'Reusable UI Component Architecture',
    matchedKeywords: ['reusable button', 'button component', 'reusable component', 'button'],
    explanation: 'Building reusable UI components requires flexible input configuration (variants, sizes, loading indicators, disabled states) and accessible keyboard/focus handling.',
    codeBlock: {
      language: 'typescript',
      filename: 'custom-button.component.ts',
      code: `import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="'custom-btn ' + variant() + ' ' + size()"
      (click)="handleClick($event)"
    >
      @if (loading()) {
        <span class="spinner"></span>
      }
      <ng-content></ng-content>
    </button>
  \`,
  styles: [\`
    .custom-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 8px;
      font-weight: 600;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .custom-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .primary { background: #6366f1; color: #fff; }
    .secondary { background: #1f2937; color: #f3f4f6; border-color: #374151; }
    .danger { background: #ef4444; color: #fff; }
    .outline { background: transparent; border-color: #6366f1; color: #818cf8; }
    .sm { padding: 0.35rem 0.75rem; font-size: 0.8rem; }
    .md { padding: 0.6rem 1.2rem; font-size: 0.9rem; }
    .lg { padding: 0.8rem 1.6rem; font-size: 1rem; }
    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  \`]
})
export class CustomButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  
  readonly onClick = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit(event);
    }
  }
}`
    },
    importantNotes: [
      '<ng-content></ng-content> enables content projection so callers can pass labels, icons, or text directly.',
      'input() and output() signals make consumer data binding effortless with standard Angular syntax.',
      'Ensure the loading state sets disabled to prevent accidental double-submits.'
    ],
    suggestedFollowUps: [
      'How to use content projection with multiple slots in Angular?',
      'Create an Angular login form',
      'Explain Angular components'
    ]
  },

  // 12. Lifecycle Hooks
  'lifecycle-hooks': {
    detectedTopic: 'Component Lifecycle Hooks',
    matchedKeywords: ['lifecycle', 'lifecycle hooks', 'ngoninit', 'ngondestroy', 'ngonchanges', 'explain lifecycle hooks'],
    explanation: 'An Angular component undergoes a series of lifecycle phases from instantiation to destruction. Angular provides lifecycle hook interfaces to execute custom logic at each stage.',
    codeBlock: {
      language: 'typescript',
      filename: 'lifecycle-demo.component.ts',
      code: `import { 
  Component, 
  OnInit, 
  OnChanges, 
  DoCheck, 
  AfterViewInit, 
  OnDestroy, 
  SimpleChanges, 
  input, 
  effect 
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  template: \`<p>Component lifecycle active for user: {{ userId() }}</p>\`
})
export class LifecycleDemoComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {
  readonly userId = input<string>('default-id');

  constructor() {
    console.log('1. constructor: Component instance created via Dependency Injection.');
    
    // Modern Signal effect (reacts whenever userId signal changes)
    effect(() => {
      console.log('Signal Effect: userId changed to', this.userId());
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('2. ngOnChanges: Called when @Input properties change.', changes);
  }

  ngOnInit(): void {
    console.log('3. ngOnInit: Component inputs initialized. Best place for HTTP API calls & setup.');
  }

  ngDoCheck(): void {
    console.log('4. ngDoCheck: Custom change detection check.');
  }

  ngAfterViewInit(): void {
    console.log('5. ngAfterViewInit: Component template and child views are fully rendered in DOM.');
  }

  ngOnDestroy(): void {
    console.log('6. ngOnDestroy: Component is about to be destroyed. Clean up subscriptions and timers.');
  }
}`
    },
    importantNotes: [
      'Use ngOnInit for data-fetching operations rather than the constructor.',
      'Always clean up RxJS subscriptions or event listeners inside ngOnDestroy to avoid memory leaks.',
      'Modern Angular Signals and effect() provide fine-grained reactivity that reduces the need for manual lifecycle tracking.'
    ],
    suggestedFollowUps: [
      'How to use takeUntilDestroyed in Angular for auto-unsubscribing?',
      'Explain Angular data binding',
      'Create an Angular service'
    ]
  }
};
