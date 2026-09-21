// View IDs
export type ViewId = 
  | 'overview' | 'bna' | 'regulatory-search' | 'kyc' | 'kyc-cases' 
  | 'due-diligence' | 'obligations' | 'matrix' | 'visibility' | 'risk' 
  | 'audit' | 'compliance' | 'reports' | 'controls' | 'alerts' 
  | 'users' | 'user-profile' | 'crud' | 'auth' | 'settings' | 'notifications'

// Navegação
export interface NavItem {
  id: ViewId
  label: string
  icon: typeof import('lucide-react')[keyof typeof import('lucide-react')]
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

// Modais
export type TopModalType = 'auth' | 'settings' | 'notifications' | null
export type CrudContextType = { title: string; eyebrow: string } | null

// Formulários
export interface FormField {
  label: string
  type?: string
  placeholder?: string
  options?: string[]
}

export interface FormDefinition {
  eyebrow: string
  title: string
  description: string
  fields: FormField[]
}

// KPIs e Analytics
export interface KPICard {
  label: string
  value: string
  trend: string
  status: 'positive' | 'warning' | 'negative'
}

export interface AnalyticsTile {
  label: string
  value: string
  delta: string
  tone?: 'blue' | 'green' | 'amber' | 'red' | 'purple'
}

// Dados de entidades
export interface Client {
  name: string
  status: 'Completo' | 'Em revisão' | 'Pendente'
  score: string
  lastUpdate: string
}

export interface CaseItem {
  name: string
  type: string
  risk: string
  status: string
}

export interface Obligation {
  name: string
  dueDate: string
  status: string
  priority: string
}

export interface Normativo {
  code: string
  title: string
  date: string
  status: string
}

export interface Alert {
  title: string
  source: string
  time: string
  tone: 'critical' | 'warning' | 'info' | 'success'
  status: string
}

export interface Permission {
  name: string
  group: string
  level: string
  tone: string
}

export interface User {
  name: string
  email: string
  department: string
  role: string
  status: string
}

// Traduções
export type LanguageCode = 'pt' | 'en' | 'zh'
export type Translations = Record<LanguageCode, Record<string, string>>

// Estados da aplicação
export interface AppState {
  activeView: ViewId
  language: LanguageCode
  formAction: string | null
  crudContext: CrudContextType
  topModal: TopModalType
  profileName: string
  toast: string | null
}
