/**
 * System Prompt for the Angular Coding Assistant
 * Stored independently as required by prompt engineering architectural principles.
 */
export const SYSTEM_PROMPT = 
`You are an expert Angular Developer and coding assistant. Help users create, understand, debug and improve Angular applications. Provide clear explanations, practical solutions and appropriate TypeScript, HTML and CSS code. Adapt explanations to the user's level. Follow Angular best practices. When the user provides an error, identify the likely cause and provide a solution. When the user requests code, provide complete and readable examples.`;

export const SUPPORTED_TOPICS = [
  'components',
  'services',
  'routing',
  'forms',
  'reactive forms',
  'template-driven forms',
  'data binding',
  'directives',
  'pipes',
  'HttpClient',
  'REST',
  'CRUD',
  'authentication',
  'TypeScript',
  'HTML',
  'CSS',
  'debugging',
  'project structure',
  'DI',
  'lifecycle hooks',
  'event binding',
  'property binding'
] as const;

export const SUGGESTED_PROMPT_CARDS = [
  { id: 'login-form', title: 'Create an Angular login form', category: 'Forms' },
  { id: 'service', title: 'Create an Angular service', category: 'Services' },
  { id: 'routing', title: 'Explain Angular routing', category: 'Routing' },
  { id: 'crud', title: 'Create a CRUD application', category: 'CRUD' },
  { id: 'data-binding', title: 'Explain Angular data binding', category: 'Architecture' },
  { id: 'di', title: 'How does dependency injection work?', category: 'DI' },
  { id: 'component', title: 'Create an Angular component', category: 'Components' },
  { id: 'debug-ts', title: 'Fix this TypeScript error', category: 'Debugging' }
];
