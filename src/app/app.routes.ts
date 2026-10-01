import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Overview | Angular Coding Assistant'
  },
  {
    path: 'chat',
    loadComponent: () => import('./components/chat/chat.component').then(m => m.ChatComponent),
    title: 'AI Coding Chat | Angular Coding Assistant'
  },
  {
    path: 'prompt-library',
    loadComponent: () => import('./components/prompt-library/prompt-library.component').then(m => m.PromptLibraryComponent),
    title: 'Prompt Library | Angular Coding Assistant'
  },
  {
    path: 'prompt-engineering',
    loadComponent: () => import('./components/prompt-engineering/prompt-engineering.component').then(m => m.PromptEngineeringComponent),
    title: 'Prompt Engineering Guide | Angular Coding Assistant'
  },
  {
    path: 'role-based',
    loadComponent: () => import('./components/role-based/role-based.component').then(m => m.RoleBasedComponent),
    title: 'Task 4: Role-Based Prompts | Angular Coding Assistant'
  },
  {
    path: 'boolean-logic',
    loadComponent: () => import('./components/boolean-logic/boolean-logic.component').then(m => m.BooleanLogicComponent),
    title: 'Task 5: Boolean Logic CoT | Angular Coding Assistant'
  },
  {
    path: 'prompt-optimization',
    loadComponent: () => import('./components/prompt-optimization/prompt-optimization.component').then(m => m.PromptOptimizationComponent),
    title: 'Task 6: Prompt Optimization | Angular Coding Assistant'
  },
  {
    path: 'prompt-templates',
    loadComponent: () => import('./components/prompt-templates/prompt-templates.component').then(m => m.PromptTemplatesComponent),
    title: 'Task 7: Prompt Templates | Angular Coding Assistant'
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent),
    title: 'About Project | MANIKKAVEL S (811224243033)'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
