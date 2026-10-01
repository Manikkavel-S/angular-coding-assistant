export type PromptCategory = 
  | 'components' 
  | 'services' 
  | 'routing' 
  | 'forms' 
  | 'data-binding' 
  | 'crud' 
  | 'di' 
  | 'http' 
  | 'debugging' 
  | 'lifecycle' 
  | 'optimization';

export interface PromptItem {
  id: string;
  title: string;
  category: PromptCategory;
  categoryLabel: string;
  description: string;
  promptText: string;
  tags: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface OptimizedPromptConfig {
  targetAudience: string;
  campaignTone: string;
  productService: string;
  goal: string;
  constraints: string;
  outputFormat: string;
}

export type RoleType = 'teacher' | 'programmer' | 'marketer';

export interface RolePromptDefinition {
  id: RoleType;
  title: string;
  roleDescription: string;
  systemPersona: string;
  sampleRequirement: string;
  outputStructure: string[];
}

export interface ComplaintTemplateForm {
  customerName: string;
  orderNumber: string;
  productName: string;
  problemDescription: string;
  incidentDate: string;
  requestedResolution: string;
  tone: string;
}

export interface SalesReportTemplateForm {
  reportingPeriod: string;
  productCategory: string;
  totalSales: string;
  numberOfOrders: string;
  totalRevenue: string;
  topProduct: string;
  targetAudience: string;
}
