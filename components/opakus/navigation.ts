import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Folder,
  Grid3x3,
  LayoutGrid,
  type LucideIcon,
  Search,
  ShieldAlert,
  ShieldCheck,
  Users,
} from 'lucide-react';

export type ViewId =
  | 'overview'
  | 'bna'
  | 'regulatory-search'
  | 'kyc'
  | 'kyc-cases'
  | 'due-diligence'
  | 'obligations'
  | 'matrix'
  | 'visibility'
  | 'risk'
  | 'audit'
  | 'compliance'
  | 'reports'
  | 'controls'
  | 'alerts'
  | 'users'
  | 'user-profile'
  | 'crud'
  | 'auth'
  | 'settings'
  | 'notifications'

export interface NavItem {
  id: ViewId
  label: string
  icon: LucideIcon
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: 'VISÃO GERAL',
    items: [{ id: 'overview', label: 'Visão executiva', icon: LayoutGrid }],
  },
  {
    label: 'COMPLIANCE',
    items: [
      { id: 'compliance', label: 'Status de conformidade', icon: CheckCircle2 },
      { id: 'controls', label: 'Biblioteca de controlos', icon: CheckCircle2 },
      { id: 'obligations', label: 'Obrigações e prazos', icon: Clock },
    ],
  },
  {
    label: 'RISCO',
    items: [
      { id: 'risk', label: 'Risco & anomalias', icon: ShieldAlert },
      { id: 'matrix', label: 'Matriz de requisitos', icon: Grid3x3 },
    ],
  },
  {
    label: 'NORMATIVO',
    items: [
      { id: 'bna', label: 'Biblioteca regulatória', icon: BookOpen },
      { id: 'regulatory-search', label: 'Pesquisar normativos', icon: Search },
    ],
  },
  {
    label: 'DILIGÊNCIA',
    items: [
      { id: 'kyc', label: '1 · Casos KYC / KYE / KYP', icon: Users },
      { id: 'due-diligence', label: '2 · Matriz de Due Diligence', icon: ShieldCheck },
      { id: 'kyc-cases', label: '3 · Todos os casos', icon: Folder },
    ],
  },
  {
    label: 'CLIENTE & KYC',
    items: [{ id: 'visibility', label: 'Camada de visibilidade', icon: Eye }],
  },
  {
    label: 'AUDITORIA & REPORTING',
    items: [
      { id: 'audit', label: 'Auditoria', icon: Activity },
      { id: 'reports', label: 'Reports executivos', icon: BarChart3 },
    ],
  },
  {
    label: 'GESTÃO DE REGISTOS',
    items: [{ id: 'crud', label: 'Central CRUD', icon: FileText }],
  },
  {
    label: 'GESTÃO DA PLATAFORMA',
    items: [
      { id: 'alerts', label: 'Alertas e notificações', icon: Bell },
      { id: 'users', label: 'Utilizadores e roles', icon: Users },
    ],
  },
]

export const railItems = [
  { label: 'Início', icon: LayoutGrid, id: 'overview' as ViewId },
  { label: 'Normativos', icon: BookOpen, id: 'bna' as ViewId },
  { label: 'Diligência', icon: Users, id: 'kyc' as ViewId },
  { label: 'Risco', icon: ShieldAlert, id: 'risk' as ViewId },
  { label: 'Reports', icon: BarChart3, id: 'reports' as ViewId },
]
