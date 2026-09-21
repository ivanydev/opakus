export type ViewId = 

  | 'overview' | 'bna' | 'regulatory-search' | 'kyc' | 'kyc-cases' 
  | 'due-diligence' | 'obligations' | 'matrix' | 'visibility' | 'risk' 
  | 'audit' | 'compliance' | 'reports' | 'controls' | 'alerts' 
  | 'users' | 'user-profile' | 'crud' | 'auth' | 'settings' | 'notifications'

export interface NavItem {
  id: ViewId
  label: string
  iconName: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  { label: 'VISÃO GERAL', items: [{ id: 'overview', label: 'Visão executiva', iconName: 'LayoutGrid' }] },
  {
    label: 'COMPLIANCE',
    items: [
      { id: 'compliance', label: 'Status de conformidade', iconName: 'CheckCircle2' },
      { id: 'controls', label: 'Biblioteca de controlos', iconName: 'CheckCircle2' },
      { id: 'obligations', label: 'Obrigações e prazos', iconName: 'Clock' },
    ],
  },
  { label: 'RISCO', items: [{ id: 'risk', label: 'Risco & anomalias', iconName: 'ShieldAlert' }, { id: 'matrix', label: 'Matriz de requisitos', iconName: 'Grid3x3' }] },
  { label: 'NORMATIVO', items: [{ id: 'bna', label: 'Biblioteca regulatória', iconName: 'BookOpen' }, { id: 'regulatory-search', label: 'Pesquisar normativos', iconName: 'Search' }] },
  {
    label: 'DILIGÊNCIA',
    items: [
      { id: 'kyc', label: '1 · Casos KYC / KYE / KYP', iconName: 'Users' },
      { id: 'due-diligence', label: '2 · Matriz de Due Diligence', iconName: 'ShieldCheck' },
      { id: 'kyc-cases', label: '3 · Todos os casos', iconName: 'Folder' },
    ],
  },
  { label: 'CLIENTE & KYC', items: [{ id: 'visibility', label: 'Camada de visibilidade', iconName: 'Eye' }] },
  { label: 'AUDITORIA & REPORTING', items: [{ id: 'audit', label: 'Auditoria', iconName: 'Activity' }, { id: 'reports', label: 'Reports executivos', iconName: 'BarChart3' }] },
  { label: 'GESTÃO DE REGISTOS', items: [{ id: 'crud', label: 'Central CRUD', iconName: 'FileText' }] },
  { label: 'GESTÃO DA PLATAFORMA', items: [{ id: 'alerts', label: 'Alertas e notificações', iconName: 'Bell' }, { id: 'users', label: 'Utilizadores e roles', iconName: 'Users' }] },
]
