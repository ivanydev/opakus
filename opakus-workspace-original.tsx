'use client'

import { useState, useMemo, ReactNode, useEffect } from 'react'
import { BarChart3, Bell, BookOpen, Building2, CheckCircle2, ChevronDown, ChevronRight, Clock, Eye, FileText, Folder, Grid3x3, HelpCircle, LayoutGrid, Menu, MoreVertical, Search, Settings, ShieldAlert, ShieldCheck, TrendingUp, Users, X, AlertCircle, Activity, Zap } from 'lucide-react'

type ViewId = 'overview' | 'bna' | 'regulatory-search' | 'kyc' | 'kyc-cases' | 'due-diligence' | 'obligations' | 'matrix' | 'visibility' | 'risk' | 'audit' | 'compliance' | 'reports' | 'controls' | 'alerts' | 'users' | 'user-profile' | 'crud' | 'auth' | 'settings' | 'notifications'

interface NavItem {
  id: ViewId
  label: string
  icon: typeof LayoutGrid
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'VISÃO GERAL',
    items: [
      { id: 'overview', label: 'Visão executiva', icon: LayoutGrid },
    ],
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
    items: [
      { id: 'visibility', label: 'Camada de visibilidade', icon: Eye },
    ],
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

const translations: Record<string, Record<string, string>> = {
  en: { 'Visão executiva':'Executive overview', 'VISÃO GERAL':'OVERVIEW', 'COMPLIANCE':'COMPLIANCE', 'RISCO':'RISK', 'NORMATIVO':'REGULATORY', 'DILIGÊNCIA':'DUE DILIGENCE', 'CLIENTE & KYC':'CLIENT & KYC', 'AUDITORIA & REPORTING':'AUDIT & REPORTING', 'GESTÃO DE REGISTOS':'RECORD MANAGEMENT', 'GESTÃO DA PLATAFORMA':'PLATFORM MANAGEMENT', 'Status de conformidade':'Compliance status', 'Biblioteca de controlos':'Control library', 'Obrigações e prazos':'Obligations & deadlines', 'Risco & anomalias':'Risk & anomalies', 'Matriz de requisitos':'Requirements matrix', 'Biblioteca regulatória':'Regulatory library', 'Pesquisar normativos':'Search regulations', '1 · Casos KYC / KYE / KYP':'1 · KYC / KYE / KYP cases', '2 · Matriz de Due Diligence':'2 · Due diligence matrix', '3 · Todos os casos':'3 · All cases', 'Camada de visibilidade':'Visibility layer', 'Auditoria':'Audit', 'Reports executivos':'Executive reports', 'Central CRUD':'CRUD center', 'Alertas e notificações':'Alerts & notifications', 'Utilizadores e roles':'Users & roles', 'Compliance Platform':'Compliance Platform', 'Pesquisar normativos, obrigações...':'Search regulations, obligations...', 'Definições':'Settings', 'Notificações':'Notifications', 'Ajuda':'Help', 'Diligência':'Due diligence', 'Normativos':'Regulations', 'Início':'Home', 'Exportar relatório':'Export report', 'Ver todos os casos':'View all cases', 'Gerir registos':'Manage records', 'Novo caso':'New case', 'Painel de decisão para compliance, risk e obrigações regulatórias.':'Decision dashboard for compliance, risk and regulatory obligations.', 'PERÍODO DE ANÁLISE':'ANALYSIS PERIOD', 'ÍNDICE GLOBAL':'GLOBAL INDEX', 'CONTROLOS EFECTIVOS':'EFFECTIVE CONTROLS', 'Obrigações críticas':'Critical obligations', 'Dentro do prazo':'On schedule', 'Em atraso':'Overdue', 'Tendência':'Trend', 'Operacional':'Operational', 'Centro de compliance':'Compliance center', 'Painel de decisão para COMPLIANCE, RISK e obrigações regulatórias.':'Decision dashboard for COMPLIANCE, RISK and regulatory obligations.', 'Score global':'Global score', 'Meta 90%':'Target 90%', '162 requisitos monitorizados':'162 requirements monitored', '3 críticas · 11 em análise':'3 critical · 11 under review', '74% dos requisitos estão dentro do apetite de risco.':'74% of requirements are within risk appetite.', '6.8 pts de melhoria':'6.8 pts improvement', 'AO VIVO':'LIVE', 'Baixo RISK':'Low risk', 'RISK medium':'Medium risk' },
  zh: { 'Visão executiva':'执行概览', 'VISÃO GERAL':'概览', 'COMPLIANCE':'合规', 'RISCO':'风险', 'NORMATIVO':'监管', 'DILIGÊNCIA':'尽职调查', 'CLIENTE & KYC':'客户与KYC', 'AUDITORIA & REPORTING':'审计与报告', 'GESTÃO DE REGISTOS':'记录管理', 'GESTÃO DA PLATAFORMA':'平台管理', 'Status de conformidade':'合规状态', 'Biblioteca de controlos':'控制库', 'Obrigações e prazos':'义务与期限', 'Risco & anomalias':'风险与异常', 'Matriz de requisitos':'要求矩阵', 'Biblioteca regulatória':'法规库', 'Pesquisar normativos':'搜索法规', '1 · Casos KYC / KYE / KYP':'1 · KYC / KYE / KYP 案例', '2 · Matriz de Due Diligence':'2 · 尽职调查矩阵', '3 · Todos os casos':'3 · 全部案例', 'Camada de visibilidade':'可见性层', 'Auditoria':'审计', 'Reports executivos':'管理层报告', 'Central CRUD':'CRUD 中心', 'Alertas e notificações':'警报与通知', 'Utilizadores e roles':'用户与角色', 'Compliance Platform':'合规平台', 'Pesquisar normativos, obrigações...':'搜索法规、义务...', 'Definições':'设置', 'Notificações':'通知', 'Ajuda':'帮助', 'Diligência':'尽职调查', 'Normativos':'法规', 'Início':'首页', 'Exportar relatório':'导出报告', 'Ver todos os casos':'查看全部案例', 'Gerir registos':'管理记录', 'Novo caso':'新建案例', 'Painel de decisão para compliance, risk e obrigações regulatórias.':'合规、风险和监管义务决策面板。', 'PERÍODO DE ANÁLISE':'分析期间', 'ÍNDICE GLOBAL':'全球指数', 'CONTROLOS EFECTIVOS':'有效控制', 'Obrigações críticas':'关键义务', 'Dentro do prazo':'按时', 'Em atraso':'逾期', 'Tendência':'趋势', 'Operacional':'运营', 'Centro de compliance':'合规中心' }
}

function applyLanguage(language: string) {
  const dictionary = translations[language] || {}
  const wordMap: Record<string, string> = language === 'en' ? { 'Visão':'View', 'executiva':'executive', 'Gestão':'Management', 'casos':'cases', 'caso':'case', 'cliente':'client', 'clientes':'clients', 'colaborador':'employee', 'colaboradores':'employees', 'parceiro':'partner', 'parceiros':'partners', 'risco':'risk', 'Risco':'Risk', 'estado':'status', 'conformidade':'compliance', 'Descrição':'Description', 'Nome':'Name', 'Tipo':'Type', 'Guardar':'Save', 'Cancelar':'Cancel', 'Fechar':'Close', 'Editar':'Edit', 'Abrir':'Open', 'Adicionar':'Add', 'Criar':'Create', 'Pesquisar':'Search', 'Detalhes':'Details', 'Histórico':'History', 'Permissões':'Permissions', 'Activo':'Active', 'Completo':'Complete', 'Em análise':'Under review', 'Hoje':'Today', 'há':'ago', 'dias':'days', 'mensagem':'message', 'notificações':'notifications', 'Centro':'Center', 'compliance':'compliance', 'obrigações':'obligations', 'regulatórias':'regulatory', 'Índice':'Index', 'Controlos':'Controls', 'efectivos':'effective', 'residual':'residual', 'Excepções':'Exceptions', 'abertas':'open', 'Evolução':'Evolution', 'do índice':'of the index', 'Score':'Score', 'global':'global', 'Meta':'Target', 'Mapa':'Map', 'exposição':'exposure', 'Baixa':'Low', 'exposição':'exposure', 'requisitos':'requirements', 'monitorizados':'monitored', 'melhoria':'improvement', 'médio':'medium', 'Biblioteca':'Library', 'Regulatório':'Regulatory', 'Utilizadores':'Users', 'roles':'roles', 'sessão':'session', 'palavra-passe':'password', 'Verificação':'Verification', 'segurança':'security', 'documentação':'documentation', 'OPAKUS GROUP':'OPAKUS GROUP', 'Centro de conformidade':'Compliance center', 'Operacional':'Operational', 'VISÃO GERAL':'OVERVIEW', 'Status de conformidade':'Compliance status', 'Biblioteca de controlos':'Control library', 'Obrigações e prazos':'Obligations and deadlines', 'Risco & anomalias':'Risk and anomalies', 'Matriz de requisitos':'Requirements matrix', 'Biblioteca regulatória':'Regulatory library', 'Pesquisar normativos':'Search regulations', 'PERFORMANCE':'PERFORMANCE', 'Evolução do índice de conformidade':'Compliance index evolution', 'Score consolidado do domínio · últimos 12 meses':'Consolidated domain score · last 12 months', 'Mapa de exposição':'Exposure map', 'AO VIVO':'LIVE', 'Baixa exposição':'Low exposure', 'dos requisitos estão dentro do apetite de risco.':'of requirements are within risk appetite.', 'Baixo risco':'Low risk', 'Risco médio':'Medium risk', 'Alto risco':'High risk', 'críticas':'critical', 'em análise':'under review', 'período anterior':'previous period', 'concluídos':'completed', 'requisitos monitorizados':'requirements monitored', 'de melhoria':'improvement', 'Jun':'Jun', 'Jan':'Jan', 'Fev':'Feb', 'Mar':'Mar', 'Abr':'Apr', 'Mai':'May', 'Set':'Sep', 'Out':'Oct', 'Nov':'Nov', 'Dez':'Dec' } : language === 'zh' ? { 'Visão':'视图', 'executiva':'概览', 'Gestão':'管理', 'casos':'案例', 'caso':'案例', 'cliente':'客户', 'clientes':'客户', 'colaborador':'员工', 'colaboradores':'员工', 'parceiro':'合作伙伴', 'parceiros':'合作伙伴', 'risco':'风险', 'Risco':'风险', 'estado':'状态', 'conformidade':'合规', 'Descrição':'描述', 'Nome':'名称', 'Tipo':'类型', 'Guardar':'保存', 'Cancelar':'取消', 'Fechar':'关闭', 'Editar':'编辑', 'Abrir':'打开', 'Adicionar':'添加', 'Criar':'创建', 'Pesquisar':'搜索', 'Detalhes':'详情', 'Histórico':'历史', 'Permissões':'权限', 'Activo':'启用', 'Completo':'已完成', 'Hoje':'今天', 'dias':'天', 'notificações':'通知', 'Centro':'中心', 'compliance':'合规', 'obrigações':'义务', 'regulatórias':'监管', 'Índice':'指数', 'Controlos':'控制', 'efectivos':'有效', 'Excepções':'例外', 'abertas':'开放', 'Evolução':'变化', 'do índice':'指数', 'Mapa':'地图', 'exposição':'暴露', 'requisitos':'要求', 'monitorizados':'已监控', 'melhoria':'改善', 'Baixa':'低', 'médio':'中', 'Biblioteca':'库', 'Regulatório':'监管', 'Utilizadores':'用户', 'roles':'角色', 'sessão':'会话', 'palavra-passe':'密码', 'Verificação':'验证', 'segurança':'安全', 'documentação':'文档', 'Centro de conformidade':'合规中心', 'Operacional':'运营', 'Status de conformidade':'合规状态', 'Biblioteca de controlos':'控制库', 'Obrigações e prazos':'义务与期限', 'Risco & anomalias':'风险与异常', 'Matriz de requisitos':'要求矩阵', 'Biblioteca regulatória':'法规库', 'Pesquisar normativos':'搜索法规', 'Evolução do índice de conformidade':'合规指数变化', 'Score consolidado do domínio · últimos 12 meses':'领域综合得分 · 最近12个月', 'Mapa de exposição':'暴露地图', 'AO VIVO':'实时', 'Baixa exposição':'低暴露', 'dos requisitos estão dentro do apetite de risco.':'的要求在风险偏好范围内。', 'Baixo risco':'低风险', 'Risco médio':'中风险', 'Alto risco':'高风险', 'críticas':'关键', 'em análise':'审核中', 'período anterior':'上期', 'concluídos':'已完成', 'requisitos monitorizados':'已监控要求', 'de melhoria':'改善', 'Jun':'六月', 'Jan':'一月', 'Fev':'二月', 'Mar':'三月', 'Abr':'四月', 'Mai':'五月', 'Set':'九月', 'Out':'十月', 'Nov':'十一月', 'Dez':'十二月' } : {}
  const translate = (value: string) => {
    if (!value.trim()) return value
    let result = value
    Object.entries(dictionary).sort(([a], [b]) => b.length - a.length).forEach(([from, to]) => { const escaped = from.trim().replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&').replace(/\\s+/g, '\\\\s+'); result = result.replace(new RegExp(escaped, 'giu'), to) })
    Object.entries(wordMap).sort(([a], [b]) => b.length - a.length).forEach(([from, to]) => { const escaped = from.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'); result = result.replace(new RegExp(`(^|[^\\p{L}])${escaped}(?=$|[^\\p{L}])`, 'gu'), `$1${to}`) })
    return result
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []; let node: Node | null
  while ((node = walker.nextNode())) { const parent = (node as Text).parentElement; if (parent && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) nodes.push(node as Text) }
  nodes.forEach((textNode) => {
    const element = textNode.parentElement
    const sourceKey = 'data-opakus-source-text'
    const original = element?.getAttribute(sourceKey) || textNode.nodeValue || ''
    if (element && !element.hasAttribute(sourceKey)) element.setAttribute(sourceKey, original)
    const translated = translate(original)
    if (textNode.nodeValue !== translated) textNode.nodeValue = translated
  })
  const translatableAttributes = ['placeholder', 'aria-label', 'title', 'alt', 'data-tooltip', 'data-label', 'data-description', 'value']
  document.querySelectorAll<HTMLElement>('*').forEach((element) => {
    translatableAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute) && !element.matches(`option[value], input[type="button"], input[type="submit"]`)) return
      const originalKey = `data-opakus-source-${attribute}`
      const original = element.getAttribute(originalKey) || element.getAttribute(attribute) || (attribute === 'value' ? (element as HTMLInputElement).value : '')
      if (!original) return
      if (!element.hasAttribute(originalKey)) element.setAttribute(originalKey, original)
      const translated = translate(original)
      if (attribute === 'value' && element instanceof HTMLInputElement) { if (element.value !== translated) element.value = translated } else if (element.getAttribute(attribute) !== translated) element.setAttribute(attribute, translated)
    })
  })
  document.querySelectorAll<HTMLOptionElement>('option').forEach((option) => { const original = option.dataset.opakusOriginalText || option.textContent || ''; option.dataset.opakusOriginalText = original; const translated = translate(original); if (option.textContent !== translated) option.textContent = translated })
}

function Header() {
  return (
    <header className="opakus-header">
      <div className="header-brand">
        <div className="brand-icon">O</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>OPAKUS</div>
          <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>Compliance Platform</div>
        </div>
      </div>
      <div className="header-search">
        <Search size={16} />
        <input placeholder="Pesquisar normativos, obrigações..." />
      </div>
      <div className="header-actions">
        <label className="language-switcher"><span className="sr-only">Idioma / Language / 语言</span><select defaultValue="pt" aria-label="Idioma / Language / 语言" title="Idioma / Language / 语言" onChange={(event) => window.dispatchEvent(new CustomEvent('opakus:language', { detail: event.target.value }))}><option value="pt">Português (PT)</option><option value="en">English (EN)</option><option value="zh">简体中文</option></select></label>
        <button className="icon-btn" aria-label="Notificações" onClick={() => window.dispatchEvent(new CustomEvent('opakus:navigate', { detail: { view: 'notifications' } }))}>
          <Bell size={18} /><span className="header-badge">3</span>
        </button>
        <button className="icon-btn" aria-label="Ajuda">
          <HelpCircle size={18} />
        </button>
        <button className="icon-btn" aria-label="Definições" onClick={() => window.dispatchEvent(new CustomEvent('opakus:navigate', { detail: { view: 'settings' } }))}>
          <Settings size={18} />
        </button>
        <button className="user-avatar user-avatar-button" aria-label="Autenticação e perfil" onClick={() => window.dispatchEvent(new CustomEvent('opakus:navigate', { detail: { view: 'auth' } }))}>MD</button>
      </div>
    </header>
  )
}

function Sidebar({ active, setActive }: { active: ViewId; setActive: (id: ViewId) => void }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ 'VISÃO GERAL': true, COMPLIANCE: true, RISCO: true, NORMATIVO: true, DILIGÊNCIA: true, 'CLIENTE & KYC': true, 'AUDITORIA & REPORTING': true, 'GESTÃO DA PLATAFORMA': true })
  const railItems = [
    { label: 'Início', icon: LayoutGrid, id: 'overview' as ViewId },
    { label: 'Normativos', icon: BookOpen, id: 'bna' as ViewId },
    { label: 'Diligência', icon: Users, id: 'kyc' as ViewId },
    { label: 'Risco', icon: ShieldAlert, id: 'risk' as ViewId },
    { label: 'Reports', icon: BarChart3, id: 'reports' as ViewId },
  ]

  return (
    <aside className="sidebar">
      <div className="office-rail" aria-label="Aplicações Opakus">
        {railItems.map((item) => (
          <button key={item.label} className={`rail-item ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)} title={item.label}>
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
        <div className="rail-spacer" />
        <button className="rail-item" title="Definições"><Settings size={18} /><span>Definições</span></button>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-eyebrow">OPAKUS GROUP</div>
          <h2 className="sidebar-title">Centro de conformidade</h2>
          <span className="workspace-status"><i /> Operacional</span>
        </div>
      <nav className="sidebar-nav">
        {navGroups.map(group => (
          <div key={group.label} className={`nav-section ${openGroups[group.label] ? 'is-open' : 'is-closed'}`}>
            <button className="nav-section-label nav-section-toggle" onClick={() => setOpenGroups((current) => ({ ...current, [group.label]: !current[group.label] }))}><span>{group.label}</span><ChevronDown size={12} /></button>
            {openGroups[group.label] && group.items.map(item => (
              <button
                key={item.id}
                className={`nav-item ${active === item.id ? 'active' : ''}`}
                onClick={() => setActive(item.id)}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>
      </div>
    </aside>
  )
}

// KPI Cards Component
function KPICards() {
  const kpis = [
    { label: 'Score de conformidade', value: '87.4%', trend: '+4.2%', status: 'positive' },
    { label: 'Obrigações em dia', value: '96.2%', trend: '+1.8%', status: 'positive' },
    { label: 'Risco residual', value: '8.7%', trend: '−12%', status: 'positive' },
    { label: 'Alertas críticos', value: '3', trend: '2 atenção', status: 'warning' },
  ]

  return (
    <div className="kpi-grid">
      {kpis.map(kpi => (
        <div key={kpi.label} className="kpi-card">
          <div className="kpi-label">{kpi.label}</div>
          <div className={`kpi-value ${kpi.status}`}>{kpi.value}</div>
          <div className="kpi-detail">
            <TrendingUp size={14} />
            <span>{kpi.trend} vs. mês anterior</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function Sparkline({ tone = 'blue', points = '0,42 16,35 32,38 48,22 64,28 80,14 96,18 112,6' }: { tone?: 'blue' | 'green' | 'red' | 'purple'; points?: string }) {
  return (
    <svg className={`sparkline sparkline-${tone}`} viewBox="0 0 112 48" role="img" aria-label="Tendência">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,47 ${points} 112,47`} fill="currentColor" opacity=".08" stroke="none" />
    </svg>
  )
}

function MiniBars({ values = [42, 58, 48, 76, 64, 82, 72, 91] }: { values?: number[] }) {
  return <div className="mini-bars" aria-label="Evolução semanal">{values.map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}</div>
}

function Donut({ value, label, tone = 'blue' }: { value: number; label: string; tone?: string }) {
  return (
    <div className={`donut donut-${tone}`} style={{ '--donut-value': `${value * 3.6}deg` } as React.CSSProperties}>
      <div className="donut-center"><strong>{value}%</strong><span>{label}</span></div>
    </div>
  )
}

function InsightRow({ label, value, detail, tone = 'blue' }: { label: string; value: string; detail: string; tone?: string }) {
  return <div className="insight-row"><span className={`insight-dot ${tone}`} /><div><strong>{label}</strong><small>{detail}</small></div><b>{value}</b></div>
}

// Dashboard Main View
function OverviewView() {
  const trend = [68, 72, 70, 78, 76, 83, 81, 88, 86, 91, 89, 94]
  const heat = ['good','good','watch','good','good','risk','good','good','watch','good','risk','good']
  return (
    <div className="view-enter">
      <div className="view-header executive-header">
        <div><span className="section-kicker">OPAKUS GROUP / EXECUTIVE CENTER</span><h1 className="view-title">Visão executiva</h1><p className="view-subtitle">Painel de decisão para compliance, risco e obrigações regulatórias.</p></div>
        <div className="header-period"><span>PERÍODO DE ANÁLISE</span><strong>01 Jun — 30 Jun 2026</strong><button className="btn btn-secondary">Exportar relatório</button></div>
      </div>
      <div className="view-body executive-body">
        <div className="executive-kpis"><div className="exec-kpi primary"><span>Índice global</span><strong>87.4%</strong><small><TrendingUp /> +4.2% vs. período anterior</small><Sparkline tone="blue" points="0,36 16,34 32,30 48,32 64,22 80,25 96,12 112,8" /></div><div className="exec-kpi"><span>Controlos efectivos</span><strong>754 <em>/ 812</em></strong><small className="positive-text">92.9% concluídos</small><MiniBars values={[50,62,58,72,69,80,76,91]} /></div><div className="exec-kpi"><span>Risco residual</span><strong>8.7%</strong><small className="positive-text">−12% este mês</small><Sparkline tone="green" points="0,10 16,16 32,14 48,25 64,20 80,30 96,35 112,42" /></div><div className="exec-kpi alert"><span>Excepções abertas</span><strong>14</strong><small>3 críticas · 11 em análise</small><Sparkline tone="red" points="0,34 16,30 32,32 48,18 64,26 80,16 96,20 112,8" /></div></div>
        <div className="executive-grid main-grid">
          <div className="card executive-chart-card"><div className="card-header"><div><span className="card-eyebrow">PERFORMANCE</span><h3 className="card-title">Evolução do índice de conformidade</h3><p className="card-subtitle">Score consolidado por domínio · últimos 12 meses</p></div><div className="chart-legend"><span><i className="legend-blue"/>Score global</span><span><i className="legend-green"/>Meta 90%</span></div></div><div className="card-content"><div className="hero-chart"><div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-plot"><div className="chart-gridlines"><i/><i/><i/><i/></div><div className="column-series">{trend.map((v,i)=><div className="column-wrap" key={i}><span className="column-value">{v}%</span><b style={{height:`${v}%`}}/><small>{['Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun'][i]}</small></div>)}</div><svg className="trend-overlay" viewBox="0 0 600 180" preserveAspectRatio="none"><polyline points="0,76 54,70 109,74 163,60 218,63 272,48 327,52 381,36 436,42 490,27 545,32 600,15" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/></svg></div></div></div></div>
          <div className="card risk-card"><div className="card-header"><div><span className="card-eyebrow">RISK INTELLIGENCE</span><h3 className="card-title">Mapa de exposição</h3><p className="card-subtitle">162 requisitos monitorizados</p></div><span className="live-tag"><i/> Ao vivo</span></div><div className="card-content"><div className="risk-donut-row"><Donut value={74} label="controlado" tone="green"/><div><strong className="risk-score">Baixa exposição</strong><p>74% dos requisitos estão dentro do apetite de risco.</p><span className="risk-trend"><TrendingUp/> 6.8 pts de melhoria</span></div></div><div className="risk-bars"><InsightRow label="Baixo risco" value="120" detail="74%" tone="green"/><InsightRow label="Risco médio" value="29" detail="18%" tone="amber"/><InsightRow label="Alto risco" value="13" detail="8%" tone="red"/></div></div></div>
        </div>
        <div className="executive-grid lower-grid"><div className="card"><div className="card-header"><div><span className="card-eyebrow">CONTROL ENVIRONMENT</span><h3 className="card-title">Saúde dos controlos</h3><p className="card-subtitle">Distribuição por estado e criticidade</p></div><button className="btn btn-ghost">Ver detalhes <ChevronRight/></button></div><div className="card-content control-health"><div className="health-ring"><Donut value={93} label="efectivos" tone="blue"/></div><div className="health-list"><InsightRow label="Controlos efectivos" value="754" detail="92.9% do total" tone="green"/><InsightRow label="Em validação" value="34" detail="4.2% do total" tone="amber"/><InsightRow label="Com excepção" value="24" detail="3.0% do total" tone="red"/></div></div></div><div className="card"><div className="card-header"><div><span className="card-eyebrow">DOMAIN COVERAGE</span><h3 className="card-title">Cobertura por domínio</h3><p className="card-subtitle">Maturidade de compliance</p></div></div><div className="card-content domain-bars"><div><span>AML / CFT <b>94%</b></span><i><em style={{width:'94%'}}/></i></div><div><span>Governação <b>88%</b></span><i><em style={{width:'88%'}}/></i></div><div><span>Reporte prudencial <b>82%</b></span><i><em style={{width:'82%'}}/></i></div><div><span>KYC e cliente <b>79%</b></span><i><em style={{width:'79%'}}/></i></div></div></div><div className="card"><div className="card-header"><div><span className="card-eyebrow">30-DAY OUTLOOK</span><h3 className="card-title">Radar executivo</h3><p className="card-subtitle">Sinais que requerem atenção</p></div></div><div className="card-content signal-list"><div><span className="signal-icon red"><AlertCircle/></span><p><strong>3 obrigações críticas</strong><small>Prazo nos próximos 7 dias</small></p><ChevronRight/></div><div><span className="signal-icon amber"><Clock/></span><p><strong>12 revisões pendentes</strong><small>Impacto operacional moderado</small></p><ChevronRight/></div><div><span className="signal-icon blue"><Zap/></span><p><strong>8 normativos novos</strong><small>Detectados pelo monitor BNA</small></p><ChevronRight/></div></div></div></div>
        <div className="card executive-foot"><div><span className="card-eyebrow">ACTIVITY MAP · REAL TIME</span><h3 className="card-title">Atividade de compliance por dia</h3></div><div className="activity-heat">{heat.concat(heat, heat).map((tone,i)=><span key={i} className={tone} title={`${i+1} eventos`}/>)}</div><div className="activity-caption"><span>Menos actividade</span><i className="good"/><i className="watch"/><i className="risk"/><span>Mais actividade</span><b>Última sincronização: há 2 min</b></div></div>
      </div>
    </div>
  )
}

// BNA Normativos View
function BnaView() {
  const normativos = [
    { code: 'Aviso 02/2026', title: 'Governação corporativa', date: '15 Jun 2026', status: 'Em vigor' },
    { code: 'Instrutivo 04/2026', title: 'Reporte prudencial', date: '10 Jun 2026', status: 'Em vigor' },
    { code: 'Aviso 01/2026', title: 'Prevenção de branqueamento', date: '01 Jun 2026', status: 'Em vigor' },
    { code: 'Instrutivo 02/2026', title: 'Operações cambiais', date: '28 Mai 2026', status: 'Em vigor' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div className="section-kicker">NORMATIVOS · PESQUISA MULTI-REGULADOR</div><h1 className="view-title">Pesquisa regulatória</h1>
        <p className="view-subtitle">Pesquise avisos, instrutivos e obrigações em tempo real por regulador, tema, estado ou impacto.</p>
      </div>
  <div className="view-body">
  <div className="regulatory-tree-card card"><div className="card-header"><div><span className="card-eyebrow">TAXONOMIA REGULATÓRIA</span><h3 className="card-title">Angola · Instituições Financeiras</h3><p className="card-subtitle">Estrutura de normas e reguladores aplicável ao sector</p></div><span className="live-tag"><i/> Estrutura activa</span></div><div className="regulatory-tree"><div className="tree-root">Angola · Instituições Financeiras</div><div className="tree-columns"><div><b>1. Leis do sector e afectas</b><span>Leis do sector</span><span>Leis do sistema de pagamentos</span><span>Leis afectas / transversais</span></div><div><b>2. Reguladores</b><span className="tree-highlight">Banco Nacional de Angola (BNA)</span><span>UAF · Unidade de Informação Financeira</span><span>APD · Proteção de Dados</span></div><div><b>3. Normativos do BNA</b><span>Avisos</span><span>Instrutivos</span><span>Directivas</span></div><div><b>4–5. Actos e decisões</b><span>Licenciamentos e autorizações</span><span>Medidas correctivas</span><span>Processos sancionatórios</span></div></div><div className="tree-subsectors"><span><strong>Subsector bancário</strong> Bancos comerciais · Bancos de desenvolvimento</span><span><strong>Subsector não bancário</strong> Fintechs · Pagamentos · Microfinanças · Câmbio</span></div></div></div>
  <div className="bna-metrics">
          <div className="metric-card"><span className="metric-icon blue"><BookOpen /></span><div><small>Total indexado</small><strong>162</strong><em>+8 este mês</em></div></div>
          <div className="metric-card"><span className="metric-icon green"><CheckCircle2 /></span><div><small>Em vigor</small><strong>148</strong><em>91.4% do acervo</em></div></div>
          <div className="metric-card"><span className="metric-icon amber"><Clock /></span><div><small>Requer análise</small><strong>09</strong><em>3 alta prioridade</em></div></div>
          <div className="metric-card"><span className="metric-icon red"><AlertCircle /></span><div><small>Impacto pendente</small><strong>05</strong><em>Atualizar controlos</em></div></div>
        </div>
        <div className="bna-insight-grid">
          <div className="card compact-chart"><div className="card-header"><div><h3 className="card-title">Publicações BNA</h3><p className="card-subtitle">Volume por mês · últimos 6 meses</p></div><span className="live-tag"><i /> sincronizado</span></div><div className="card-content"><MiniBars /><div className="chart-axis"><span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span></div></div></div>
          <div className="card"><div className="card-header"><div><h3 className="card-title">Cobertura temática</h3><p className="card-subtitle">Normativos por domínio</p></div></div><div className="card-content"><InsightRow label="AML / CFT" value="38" detail="23.5%" tone="purple" /><InsightRow label="Governação" value="31" detail="19.1%" tone="blue" /><InsightRow label="Reporte prudencial" value="27" detail="16.7%" tone="amber" /><InsightRow label="Operações cambiais" value="22" detail="13.6%" tone="green" /></div></div>
        </div>
        <div className="regulatory-search-panel">
          <div className="regulator-tabs"><button className="regulator-tab active">Todos os reguladores <span>392</span></button><button className="regulator-tab">BNA <span>162</span></button><button className="regulator-tab">UIF <span>88</span></button><button className="regulator-tab">Outro regulador <span>142</span></button></div>
          <div className="regulatory-search-row"><div className="regulatory-search-field"><Search size={17} /><input aria-label="Pesquisar normativos" placeholder="Pesquisar por código, tema, palavra-chave ou obrigação" /></div><button className="btn btn-secondary">Filtros avançados</button><button className="btn btn-primary">Pesquisar</button></div>
          <div className="search-chips"><span>Estado: Em vigor <X /></span><span>Período: Últimos 12 meses <X /></span><button>Limpar filtros</button><small>392 resultados sincronizados há 2 min</small></div>
        </div>

        <div className="tabs">
          <button className="tab active">Todos <span style={{ marginLeft: '6px', color: '#666' }}>162</span></button>
          <button className="tab">Avisos <span style={{ marginLeft: '6px', color: '#666' }}>48</span></button>
          <button className="tab">Instrutivos <span style={{ marginLeft: '6px', color: '#666' }}>71</span></button>
          <button className="tab">Circulares <span style={{ marginLeft: '6px', color: '#666' }}>43</span></button>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Título</th>
                <th>Data publicação</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {normativos.map(item => (
                <tr key={item.code}>
                  <td style={{ fontWeight: 600 }}>{item.code}</td>
                  <td>{item.title}</td>
                  <td style={{ fontSize: '12px', color: '#666' }}>{item.date}</td>
                  <td>
                    <span className="status success">{item.status}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="icon-btn" style={{ color: '#666' }}>
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function RegulatorySearchView() {
  const [query, setQuery] = useState('')
  const [regulator, setRegulator] = useState('Todos os reguladores')
  const results = [{ code: 'Aviso 02/2026', title: 'Governação corporativa', regulator: 'BNA', date: '15 Jun 2026', impact: 'Alto' }, { code: 'Instrutivo UIF 04/2026', title: 'Prevenção de branqueamento de capitais', regulator: 'UIF', date: '10 Jun 2026', impact: 'Crítico' }, { code: 'Circular 01/2026', title: 'Reporte prudencial e liquidez', regulator: 'BNA', date: '02 Jun 2026', impact: 'Médio' }]
  const filtered = results.filter((item) => (regulator === 'Todos os reguladores' || item.regulator === regulator) && `${item.code} ${item.title}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="view-enter"><SectionHeader eyebrow="NORMATIVO · INTELLIGENCE SEARCH" title="Pesquisar normativos" subtitle="Encontre requisitos por regulador, tema, impacto e estado de vigência." action="Guardar pesquisa"/><div className="view-body"><div className="search-hero"><div className="regulator-tabs">{['Todos os reguladores','BNA','UIF','Outro regulador'].map((item) => <button key={item} className={`regulator-tab ${regulator === item ? 'active' : ''}`} onClick={() => setRegulator(item)}>{item}<span>{item === 'BNA' ? '162' : item === 'UIF' ? '88' : item === 'Outro regulador' ? '142' : '392'}</span></button>)}</div><div className="regulatory-search-row"><div className="regulatory-search-field"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Código, palavra-chave, obrigação ou tema"/></div><button className="btn btn-secondary" onClick={() => setQuery('')}>Limpar</button><button className="btn btn-primary">Pesquisar</button></div><div className="search-suggestions"><span>Pesquisas recentes</span><button onClick={() => setQuery('AML')}>AML / CFT</button><button onClick={() => setQuery('reporte prudencial')}>Reporte prudencial</button><button onClick={() => setQuery('governação')}>Governação</button></div></div><div className="search-results-header"><div><span className="section-kicker">RESULTADOS INDEXADOS</span><h2>{filtered.length} normativos encontrados</h2><p>Ordenados por relevância · sincronizados há 2 min</p></div><button className="btn btn-secondary">Filtros avançados</button></div><div className="card search-results-card"><div className="table-wrapper"><table className="table"><thead><tr><th>Normativo</th><th>Regulador</th><th>Publicação</th><th>Impacto</th><th>Estado</th><th/></tr></thead><tbody>{filtered.map((item) => <tr key={item.code}><td><strong>{item.code}</strong><small className="result-title">{item.title}</small></td><td><span className="regulator-badge">{item.regulator}</span></td><td>{item.date}</td><td><span className={`risk-pill ${item.impact === 'Crítico' ? 'high' : item.impact === 'Alto' ? 'medium' : 'low'}`}>{item.impact}</span></td><td><span className="status success">Em vigor</span></td><td><button className="icon-btn" aria-label={`Abrir ${item.code}`}><ChevronRight size={16}/></button></td></tr>)}</tbody></table></div></div></div></div>
}

function DueDiligenceView() {
  const columns = [{ key: 'SDD', label: 'SDD · Simplificada', risk: 'Baixo risco', tone: 'green' }, { key: 'CDD', label: 'CDD · Padrão', risk: 'Médio risco', tone: 'blue' }, { key: 'EDD', label: 'EDD · Aprofundada', risk: 'Alto risco / alertas', tone: 'red' }]
  const rows = [{ title: 'KYC · Clientes', subtitle: 'Identificação e monitorização do cliente', values: ['Nome, email e NIF/CPF; limites diários baixos.', 'Documento + selfie/liveness + morada; listas de sanções.', 'Comprovativo de fundos; análise manual e monitorização contínua.'] }, { title: 'KYE · Colaboradores', subtitle: 'Pessoas, integridade e acesso interno', values: ['Identidade básica, histórico académico e referências.', 'Antecedentes criminais onde permitido + testes técnicos.', 'Auditoria patrimonial, NDA reforçado e Zero Trust.'] }, { title: 'KYP · Parceiros', subtitle: 'Fornecedores e terceiros críticos', values: ['NIPC/CNPJ activo e certidão fiscal regularizada.', 'Estatutos, sócios maioritários e saúde financeira básica.', 'Auditoria de cibersegurança, UBOs e balanços auditados.'] }]
  return <div className="view-enter"><SectionHeader eyebrow="CLIENTE & KYC · RISK-BASED DUE DILIGENCE" title="Due diligence" subtitle="Aplique o nível certo de rigor a clientes, colaboradores e parceiros com base no risco." action="Iniciar avaliação"/><div className="view-body"><AnalyticsStrip items={[{label:'Avaliações activas',value:'1.284',delta:'+8,4% este mês',tone:'blue'},{label:'Baixo risco · SDD',value:'68%',delta:'872 processos',tone:'green'},{label:'Médio risco · CDD',value:'25%',delta:'321 processos',tone:'purple'},{label:'Alto risco · EDD',value:'07%',delta:'91 processos críticos',tone:'red'}]}/><div className="card dd-trigger-card"><div className="card-header"><div><span className="card-eyebrow">CONTINUOUS DUE DILIGENCE</span><h3 className="card-title">Ciclo baseado em gatilhos</h3><p className="card-subtitle">A diligência não termina na entrada: é reavaliada quando o risco muda.</p></div><span className="live-tag"><i/> Monitorização contínua</span></div><div className="trigger-flow"><div><b>1</b><strong>Entrada</strong><span>Tipo de utilizador define o ponto de partida</span></div><ChevronRight/><div><b>2</b><strong>Monitorização</strong><span>Transações, listas, alterações e alertas</span></div><ChevronRight/><div><b>3</b><strong>Gatilho</strong><span>PEP, mudança societária ou anomalia</span></div><ChevronRight/><div><b>4</b><strong>Reavaliação</strong><span>Escalar SDD → CDD → EDD</span></div></div></div><div className="dd-matrix-wrap"><div className="dd-matrix-title"><div><span className="card-eyebrow">RISK-BASED FRAMEWORK</span><h2>Matriz KYC vs. KYE vs. KYP</h2><p>O rigor aumenta proporcionalmente à exposição, alertas e criticidade da relação.</p></div><button className="btn btn-secondary">Exportar matriz</button></div><div className="dd-matrix"><div className="dd-row dd-head"><div>Vertente</div>{columns.map((column) => <div key={column.key}><span className={`dd-tone ${column.tone}`}>{column.key}</span><strong>{column.label}</strong><small>{column.risk}</small></div>)}</div>{rows.map((row) => <div className="dd-row" key={row.title}><div className="dd-vertical"><strong>{row.title}</strong><span>{row.subtitle}</span></div>{row.values.map((value, index) => <div className={`dd-cell ${columns[index].tone}`} key={value}><p>{value}</p><button className="text-action">Ver requisitos <ChevronRight size={12}/></button></div>)}</div>)}</div></div></div></div>
}

// KYC Gestão View
function KycView() {
  const clients = [
    { name: 'Empresa ABC Lda.', status: 'Completo', score: '98%', lastUpdate: '2 days ago' },
    { name: 'Pessoa XYZ', status: 'Em revisão', score: '65%', lastUpdate: '5 days ago' },
    { name: 'Grupo DEF SA', status: 'Pendente', score: '32%', lastUpdate: '8 days ago' },
    { name: 'Holdings GHI Ltd', status: 'Completo', score: '96%', lastUpdate: '1 day ago' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <h1 className="view-title">Gestão de KYC</h1>
        <p className="view-subtitle">Monitorização e acompanhamento centralizado de conformidade Know Your Customer.</p>
      </div>
      <div className="view-body">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">KYC Completos</div>
            <div className="kpi-value">847</div>
            <div className="kpi-badge green">↑ 12 novos</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Em revisão</div>
            <div className="kpi-value">23</div>
            <div className="kpi-badge">Aguardando</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Vencimento próximo</div>
            <div className="kpi-value">34</div>
            <div className="kpi-badge red">Crítico</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Taxa de conformidade</div>
            <div className="kpi-value">94.2%</div>
            <div className="kpi-badge green">↑ 2.1%</div>
          </div>
        </div>

        <div className="dashboard-grid grid-2col">
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Distribuição por estado</h3>
                <p className="card-subtitle">Total de registos KYC</p>
              </div>
            </div>
            <div className="card-content" style={{ height: '200px', background: 'rgba(15, 108, 189, 0.05)' }}>
              <div style={{ textAlign: 'center', paddingTop: '60px', color: '#666' }}>Gráfico de barras</div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Matriz de risco KYC</h3>
                <p className="card-subtitle">Análise probabilidade × impacto</p>
              </div>
            </div>
            <div className="card-content" style={{ height: '200px', background: 'rgba(15, 108, 189, 0.05)' }}>
              <div style={{ textAlign: 'center', paddingTop: '60px', color: '#666' }}>Heatmap</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Últimos registos KYC</h3>
              <p className="card-subtitle">Clientes com atualizações recentes</p>
            </div>
            <button className="btn btn-secondary btn-sm">Exportar</button>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome do cliente</th>
                  <th>Estado</th>
                  <th>Conformidade</th>
                  <th>Última atualização</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.name}>
                    <td style={{ fontWeight: 600 }}>{client.name}</td>
                    <td>
                      <span className={`status ${client.status === 'Completo' ? 'success' : client.status === 'Em revisão' ? 'warning' : 'info'}`}>
                        {client.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="progress-bar" style={{ flex: 1, width: '60px' }}>
                          <div className="progress-fill success" style={{ width: client.score }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{client.score}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '12px', color: '#666' }}>{client.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Obligations View
function ObligationsView() {
  const obligations = [
    { name: 'Reporte prudencial Q3', dueDate: '30 Set 2026', status: 'Em progresso', priority: 'Crítico' },
    { name: 'Revisão de políticas AML', dueDate: '15 Out 2026', status: 'Agendado', priority: 'Alta' },
    { name: 'Auditoria interna anual', dueDate: '30 Nov 2026', status: 'Planejado', priority: 'Alta' },
    { name: 'Validação de controlos', dueDate: '20 Set 2026', status: 'Em atraso', priority: 'Crítico' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <h1 className="view-title">Obrigações e prazos</h1>
        <p className="view-subtitle">Calendário centralizado de obrigações regulatórias e prazos críticos.</p>
      </div>
      <div className="view-body">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Total de obrigações</div>
            <div className="kpi-value">243</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Vencimento próximo (7 dias)</div>
            <div className="kpi-value">12</div>
            <div className="kpi-badge red">Atenção</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Em atraso</div>
            <div className="kpi-value">3</div>
            <div className="kpi-badge red">Crítico</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Taxa de cumprimento</div>
            <div className="kpi-value">96.8%</div>
            <div className="kpi-badge green">Excelente</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Obrigações regulatórias</h3>
              <p className="card-subtitle">Estado de todas as obrigações mapeadas</p>
            </div>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome da obrigação</th>
                  <th>Data de vencimento</th>
                  <th>Estado</th>
                  <th>Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {obligations.map(item => (
                  <tr key={item.name}>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td>{item.dueDate}</td>
                    <td>
                      <span className={`status ${item.status === 'Em progresso' ? 'info' : item.status === 'Agendado' ? 'success' : 'error'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${item.priority === 'Crítico' ? 'red' : ''}`}>{item.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Matrix View
function MatrixView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const categories = [
    { name: 'Governação', requisitos: 12, conformidade: '92%', status: 'success' },
    { name: 'AML / CFT', requisitos: 28, conformidade: '84%', status: 'warning' },
    { name: 'Risco de crédito', requisitos: 34, conformidade: '96%', status: 'success' },
    { name: 'Reporte prudencial', requisitos: 19, conformidade: '71%', status: 'error' },
    { name: 'Operações cambiais', requisitos: 22, conformidade: '89%', status: 'success' },
    { name: 'Proteção do consumidor', requisitos: 16, conformidade: '94%', status: 'success' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <h1 className="view-title">Matriz de requisitos</h1>
        <p className="view-subtitle">Cruze normativos BNA, obrigações, controlos e evidências num único mapa.</p>
      </div>
      <div className="view-body">
        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>162 requisitos mapeados</span>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('opakus:open-form', { detail: { action: 'Adicionar requisito' } }))}>+ Adicionar requisito</button>
        </div>

        <div className="matrix-grid">
          {categories.map(cat => (
            <div key={cat.name} className="matrix-item">
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600 }}>{cat.name}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{cat.requisitos} requisitos · 4 normativos</p>
                </div>
<button className="icon-btn" style={{ color: '#666' }} onClick={() => setSelectedCategory(cat.name)} aria-label={`Abrir ${cat.name}`}>
  <MoreVertical size={16} />
  </button>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600 }}>Conformidade</span>
                  <strong style={{ fontSize: '12px' }}>{cat.conformidade}</strong>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${cat.status}`} style={{ width: cat.conformidade }} />
                </div>
              </div>
<button className="btn btn-secondary" style={{ width: '100%', fontSize: '12px' }} onClick={() => setSelectedCategory(cat.name)}>
  Abrir matriz <ChevronRight size={14} />
  </button>
            </div>
          ))}
        </div>
  </div>
  {selectedCategory && <div className="matrix-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCategory(null) }}><aside className="matrix-drawer" role="dialog" aria-modal="true" aria-labelledby="matrix-drawer-title"><div className="drawer-header"><div><span className="card-eyebrow">REQUIREMENT MATRIX</span><h2 id="matrix-drawer-title">{selectedCategory}</h2><p>Mapa detalhado de requisitos e controlos associados.</p></div><button className="modal-close" onClick={() => setSelectedCategory(null)} aria-label="Fechar matriz"><X size={18}/></button></div><div className="drawer-score"><div><span>Conformidade</span><strong>{categories.find((category) => category.name === selectedCategory)?.conformidade}</strong></div><div className="drawer-progress"><i style={{ width: categories.find((category) => category.name === selectedCategory)?.conformidade }}/></div><small>Última atualização hoje · 4 normativos associados</small></div><div className="drawer-section"><div className="drawer-section-title"><strong>Requisitos associados</strong><span>12 itens</span></div>{['Política e procedimentos documentados','Evidência de execução do controlo','Revisão periódica pelo responsável','Reporte de exceções e planos de ação'].map((item, index) => <div className="drawer-requirement" key={item}><span className={`drawer-check ${index === 3 ? 'pending' : ''}`}>{index === 3 ? '!' : '✓'}</span><div><strong>{item}</strong><small>{index === 3 ? 'Evidência pendente · vence em 5 dias' : 'Validado · atualizado há 2 dias'}</small></div><ChevronRight size={14}/></div>)}</div><div className="drawer-section"><div className="drawer-section-title"><strong>Controlos relacionados</strong><button className="text-action">Ver todos</button></div><div className="drawer-control"><span className="control-code">AML-042</span><div><strong>Screening de sanções</strong><small>Eficácia 76% · Em validação</small></div><span className="risk-pill medium">Atenção</span></div><div className="drawer-control"><span className="control-code">REG-031</span><div><strong>Reporte prudencial</strong><small>Eficácia 91% · Operacional</small></div><span className="risk-pill low">Conforme</span></div></div><div className="drawer-actions"><button className="btn btn-secondary" onClick={() => setSelectedCategory(null)}>Fechar</button><button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('opakus:open-form', { detail: { action: 'Adicionar requisito' } }))}>Adicionar requisito</button></div></aside></div>}
  </div>
  )
  }
  
  // Risk View
function RiskView() {
  const anomalies = [{ id: 'R-2841', desc: 'Concentração de operações fora do perfil', domain: 'Transações · AML', date: 'Hoje, 09:14', priority: 'Crítico', status: 'Em análise' }, { id: 'R-2838', desc: 'Atraso no reporte prudencial', domain: 'Reporte · BNA', date: 'Ontem, 16:42', priority: 'Crítico', status: 'Escalado' }, { id: 'R-2829', desc: 'Evidência expirada em controlo AML', domain: 'Controlos · Compliance', date: '12 Jun, 11:08', priority: 'Alta', status: 'Em análise' }, { id: 'R-2821', desc: 'Variação atípica no perfil de cliente', domain: 'KYC · Retalho', date: '10 Jun, 14:30', priority: 'Média', status: 'Monitorizado' }]
  return <div className="view-enter"><div className="view-header executive-header"><div><span className="section-kicker">RISK INTELLIGENCE · OPAKUS ENGINE</span><h1 className="view-title">Risco & anomalias</h1><p className="view-subtitle">Deteção contínua de exposição, incidentes e padrões fora do comportamento esperado.</p></div><div className="header-period"><span>JANELA DE RISCO</span><strong>Últimos 90 dias</strong><button className="btn btn-primary">Novo incidente</button></div></div><div className="view-body executive-body"><div className="executive-kpis"><div className="exec-kpi primary"><span>Score de risco residual</span><strong>8,7%</strong><small className="positive-text"><TrendingUp/> −12% vs. trimestre anterior</small><Sparkline tone="blue" points="0,28 16,24 32,30 48,20 64,22 80,14 96,17 112,8"/></div><div className="exec-kpi alert"><span>Anomalias abertas</span><strong>08</strong><small><AlertCircle/> 3 críticas · 5 em análise</small><MiniBars values={[30,55,42,78,62,83,70,92]}/></div><div className="exec-kpi"><span>Incidentes em análise</span><strong>12</strong><small className="positive-text">−4 desde a semana passada</small><Sparkline tone="purple" points="0,10 16,16 32,12 48,25 64,19 80,28 96,22 112,36"/></div><div className="exec-kpi"><span>Tempo médio de resolução</span><strong>4,2 <em>dias</em></strong><small className="positive-text">Dentro do SLA de 5 dias</small><Sparkline tone="green" points="0,12 16,20 32,14 48,28 64,24 80,33 96,29 112,40"/></div></div><div className="executive-grid main-grid"><div className="card executive-chart-card"><div className="card-header"><div><span className="card-eyebrow">EXPOSURE TREND</span><h3 className="card-title">Evolução da exposição de risco</h3><p className="card-subtitle">Score residual, risco inerente e apetite aprovado</p></div><div className="chart-legend"><span><i className="legend-blue"/>Residual</span><span><i className="legend-red"/>Apetite</span></div></div><div className="card-content risk-line-chart"><svg viewBox="0 0 640 190" preserveAspectRatio="none"><path className="risk-area" d="M0 125 C55 120 72 108 126 116 S195 92 250 105 S320 78 375 88 S440 62 495 73 S565 46 640 55 V190 H0Z"/><path className="risk-line" d="M0 125 C55 120 72 108 126 116 S195 92 250 105 S320 78 375 88 S440 62 495 73 S565 46 640 55"/><path className="risk-target" d="M0 82 L640 82"/></svg><div className="chart-axis"><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span><span>Hoje</span></div><div className="risk-callout"><strong>8,7%</strong><span>−12% no período</span></div></div></div><div className="card"><div className="card-header"><div><span className="card-eyebrow">RISK MATRIX</span><h3 className="card-title">Mapa de exposição</h3><p className="card-subtitle">Probabilidade × impacto</p></div><button className="btn btn-ghost">Abrir matriz <ChevronRight/></button></div><div className="card-content professional-heatmap"><div className="heatmap-y"><span>Alto</span><span>Médio</span><span>Baixo</span></div><div><div className="heatmap-grid refined-heatmap">{['low','low','medium','high','critical','low','medium','high','critical','critical','low','medium','high','high','critical','low','low','medium','high','high','low','low','medium','medium','high'].map((tone,i)=><button className={`heatmap-cell ${tone}`} key={i} aria-label={`Risco ${i+1}`}>{i+1}</button>)}</div><div className="heatmap-x"><span>Baixo impacto</span><span>Impacto</span><span>Alto impacto</span></div></div></div></div></div><div className="dashboard-grid grid-3col"><div className="card"><div className="card-header"><div><span className="card-eyebrow">RISK BY DOMAIN</span><h3 className="card-title">Exposição por domínio</h3></div></div><div className="card-content domain-bars risk-domain-bars"><div><span>AML / CFT <b>6,2%</b></span><i><em style={{width:'32%'}}/></i></div><div><span>KYC <b>8,7%</b></span><i><em style={{width:'48%'}}/></i></div><div><span>Operações <b>11,4%</b></span><i><em style={{width:'68%',background:'#f59e0b'}}/></i></div><div><span>Reporte <b>14,1%</b></span><i><em style={{width:'84%',background:'#ef4444'}}/></i></div></div></div><div className="card"><div className="card-header"><div><span className="card-eyebrow">ANOMALY SIGNALS</span><h3 className="card-title">Sinais detectados</h3></div></div><div className="card-content signal-list"><div><span className="signal-icon red"><AlertCircle/></span><p><strong>Concentração transacional</strong><small>+32% acima do padrão</small></p></div><div><span className="signal-icon amber"><Clock/></span><p><strong>Atrasos recorrentes</strong><small>4 obrigações impactadas</small></p></div><div><span className="signal-icon blue"><Zap/></span><p><strong>Mudança de comportamento</strong><small>12 clientes sinalizados</small></p></div></div></div><div className="card"><div className="card-header"><div><span className="card-eyebrow">RESPONSE SLA</span><h3 className="card-title">Resposta a incidentes</h3></div></div><div className="card-content status-donut-layout"><Donut value={78} label="no SLA" tone="green"/><div className="insight-list"><InsightRow label="Dentro do SLA" value="78%" detail="28 incidentes" tone="green"/><InsightRow label="Em risco" value="14%" detail="5 incidentes" tone="amber"/><InsightRow label="Fora do SLA" value="8%" detail="3 incidentes" tone="red"/></div></div></div></div><div className="card alert-inbox"><div className="card-header"><div><span className="card-eyebrow">ANOMALY QUEUE · LIVE</span><h3 className="card-title">Anomalias em acompanhamento</h3><p className="card-subtitle">Ocorrências priorizadas pelo Opakus Engine</p></div><button className="btn btn-secondary">Filtros avançados</button></div><div className="table-wrapper"><table className="table"><thead><tr><th>ID / descrição</th><th>Domínio</th><th>Deteção</th><th>Prioridade</th><th>Estado</th><th/></tr></thead><tbody>{anomalies.map((item)=><tr key={item.id}><td><strong>{item.id} · {item.desc}</strong></td><td>{item.domain}</td><td>{item.date}</td><td><span className={`risk-pill ${item.priority === 'Crítico' ? 'high' : item.priority === 'Alta' ? 'medium' : 'low'}`}>{item.priority}</span></td><td><span className={`status ${item.status === 'Escalado' ? 'error' : item.status === 'Em análise' ? 'warning' : 'success'}`}>{item.status}</span></td><td><button className="btn btn-ghost">Abrir <ChevronRight size={14}/></button></td></tr>)}</tbody></table></div></div></div></div>
}

// Compliance Status View
function ComplianceView() {
  const areas = [
    { label: 'AML / CFT', value: '94%', width: '94%', tone: '#14b8a6' },
    { label: 'Governação', value: '91%', width: '91%', tone: '#3b82f6' },
    { label: 'Reporte prudencial', value: '86%', width: '86%', tone: '#8b5cf6' },
    { label: 'Operações cambiais', value: '79%', width: '79%', tone: '#f59e0b' },
    { label: 'Proteção do cliente', value: '74%', width: '74%', tone: '#ef4444' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div className="section-eyebrow">OPAKUS GROUP · CONTROLO CONTÍNUO</div>
        <div className="section-heading-row">
          <div>
            <h1 className="view-title">Status de conformidade</h1>
            <p className="view-subtitle">Uma leitura operacional, auditável e em tempo real da exposição regulatória.</p>
          </div>
          <div className="header-cta-row"><span className="live-tag"><i /> Atualizado há 2 min</span><button className="btn btn-primary">Exportar relatório</button></div>
        </div>
      </div>
      <div className="view-body">
        <div className="analytics-strip">
          <div className="analytics-tile green"><span>Score global</span><strong>87,4%</strong><small>+4,2% vs. mês anterior</small></div>
          <div className="analytics-tile blue"><span>Controlos testados</span><strong>754</strong><small>89 esta semana</small></div>
          <div className="analytics-tile amber"><span>Planos de ação</span><strong>23</strong><small>8 vencem em 7 dias</small></div>
          <div className="analytics-tile red"><span>Exceções críticas</span><strong>03</strong><small>−2 desde sexta-feira</small></div>
        </div>

        <div className="dashboard-grid grid-2col">
          <div className="card compliance-hero-card">
            <div className="card-header"><div><h3 className="card-title">Conformidade por domínio</h3><p className="card-subtitle">Índice ponderado por criticidade e evidência</p></div><button className="chart-menu">•••</button></div>
            <div className="card-content area-score-list">{areas.map((area) => <div className="score-row" key={area.label}><div className="score-row-top"><span>{area.label}</span><strong>{area.value}</strong></div><div className="score-track"><i style={{ width: area.width, background: area.tone }} /></div><small>Controlos com evidência validada · {area.value}</small></div>)}</div>
          </div>
          <div className="card">
            <div className="card-header"><div><h3 className="card-title">Tendência de conformidade</h3><p className="card-subtitle">Score mensal · últimos 12 meses</p></div><span className="chart-period">12M⌄</span></div>
            <div className="card-content detailed-line-chart"><div className="chart-legend"><span><i className="legend-dot blue" /> Score global</span><span><i className="legend-dot green" /> Meta 90%</span></div><svg viewBox="0 0 620 190" preserveAspectRatio="none" aria-label="Tendência de conformidade"><path className="chart-fill" d="M0 145 C50 138 65 120 110 128 S170 110 220 116 S275 95 330 104 S390 80 440 88 S500 65 550 72 S590 48 620 55 L620 190 L0 190Z" /><path className="chart-line blue-line" d="M0 145 C50 138 65 120 110 128 S170 110 220 116 S275 95 330 104 S390 80 440 88 S500 65 550 72 S590 48 620 55" /><path className="target-line" d="M0 68 L620 68" /></svg><div className="chart-axis"><span>Jul</span><span>Set</span><span>Nov</span><span>Jan</span><span>Mar</span><span>Mai</span><span>Jun</span></div><div className="chart-callout"><strong>87,4%</strong><span>+4,2% no período</span></div></div>
          </div>
        </div>

        <div className="dashboard-grid grid-3col">
          <div className="card"><div className="card-header"><div><h3 className="card-title">Estado dos controlos</h3><p className="card-subtitle">1.026 controlos no universo</p></div></div><div className="card-content status-donut-layout"><Donut value={74} label="eficazes" tone="green" /><div className="insight-list"><InsightRow label="Eficazes" value="754" detail="74% do universo" tone="green" /><InsightRow label="Em teste" value="182" detail="18% do universo" tone="blue" /><InsightRow label="Deficientes" value="90" detail="8% do universo" tone="red" /></div></div></div>
          <div className="card"><div className="card-header"><div><h3 className="card-title">Exceções por severidade</h3><p className="card-subtitle">Ações abertas por prioridade</p></div></div><div className="card-content severity-bars"><div><span>Crítica</span><b>3</b><i><em style={{ width: '18%', background: '#ef4444' }} /></i></div><div><span>Alta</span><b>12</b><i><em style={{ width: '52%', background: '#f59e0b' }} /></i></div><div><span>Média</span><b>28</b><i><em style={{ width: '78%', background: '#3b82f6' }} /></i></div><div><span>Baixa</span><b>41</b><i><em style={{ width: '92%', background: '#14b8a6' }} /></i></div></div></div>
          <div className="card"><div className="card-header"><div><h3 className="card-title">Próximos marcos</h3><p className="card-subtitle">Agenda de conformidade</p></div></div><div className="card-content milestone-list"><div><strong>Reporte prudencial Q3</strong><span>vence em 5 dias</span><b className="status-pill danger">Crítico</b></div><div><strong>Revisão AML anual</strong><span>vence em 12 dias</span><b className="status-pill warning">Atenção</b></div><div><strong>Comité de risco</strong><span>24 Jun · 09:30</span><b className="status-pill success">Agendado</b></div></div></div>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, subtitle, action = 'Exportar' }: { eyebrow: string; title: string; subtitle: string; action?: string }) {
  const openForm = () => action !== 'Exportar' && window.dispatchEvent(new CustomEvent('opakus:open-form', { detail: { action } }))
  const openCrud = () => window.dispatchEvent(new CustomEvent('opakus:open-crud', { detail: { title, eyebrow } }))
  return <div className="view-header"><div className="section-eyebrow">{eyebrow}</div><div className="section-heading-row"><div><h1 className="view-title">{title}</h1><p className="view-subtitle">{subtitle}</p></div><div className="header-actions">{action !== 'Exportar' && <button className="btn btn-secondary" onClick={openCrud}>Gerir registos</button>}<button className="btn btn-primary" onClick={openForm}>{action}</button></div></div></div>
}

const formDefinitions: Record<string, { eyebrow: string; title: string; description: string; fields: { label: string; type?: string; placeholder?: string; options?: string[] }[] }> = {
  'Novo caso': { eyebrow: 'CLIENTE & KYC / KYE / KYP', title: 'Criar novo caso de diligência', description: 'Registe clientes, colaboradores ou parceiros e inicie o fluxo de avaliação baseado em risco.', fields: [{ label: 'Tipo de caso', type: 'select', options: ['KYC · Cliente', 'KYE · Colaborador', 'KYP · Parceiro / fornecedor'] }, { label: 'Nome legal / entidade', placeholder: 'Ex.: Empresa ABC, Lda.' }, { label: 'NIF / identificador fiscal', placeholder: 'Número de identificação' }, { label: 'Segmento / departamento', type: 'select', options: ['Corporate', 'Institucional', 'Retalho', 'Compliance', 'Risco', 'Fornecedor crítico'] }, { label: 'Nível de risco inicial', type: 'select', options: ['Baixo · SDD', 'Médio · CDD', 'Alto · EDD'] }] },
  'Iniciar avaliação': { eyebrow: 'DUE DILIGENCE · KYC / KYE / KYP', title: 'Iniciar avaliação', description: 'Escolha a vertente de diligência e configure o primeiro ciclo de avaliação.', fields: [{ label: 'Vertente', type: 'select', options: ['KYC · Cliente', 'KYE · Colaborador', 'KYP · Parceiro / fornecedor'] }, { label: 'Nome do avaliado', placeholder: 'Nome da pessoa ou entidade' }, { label: 'Nível de diligência', type: 'select', options: ['SDD · Simplificada', 'CDD · Padrão', 'EDD · Aprofundada'] }, { label: 'Responsável pela avaliação', placeholder: 'Equipa ou pessoa responsável' }, { label: 'Observações', type: 'textarea', placeholder: 'Contexto inicial ou motivo da avaliação' }] },
  'Adicionar obrigação': { eyebrow: 'COMPLIANCE', title: 'Adicionar obrigação', description: 'Crie uma obrigação, defina a responsabilidade e acompanhe o seu cumprimento.', fields: [{ label: 'Nome da obrigação', placeholder: 'Ex.: Reporte prudencial Q3' }, { label: 'Regulador', type: 'select', options: ['BNA', 'UIF', 'Outro regulador'] }, { label: 'Data de vencimento', type: 'date' }, { label: 'Responsável', placeholder: 'Equipa ou pessoa responsável' }] },
  'Novo controlo': { eyebrow: 'CONTROL LIBRARY', title: 'Criar novo controlo', description: 'Adicione um controlo à biblioteca operacional e associe-o a um risco.', fields: [{ label: 'Nome do controlo', placeholder: 'Ex.: Screening de sanções' }, { label: 'Domínio', type: 'select', options: ['AML / CFT', 'KYC', 'Operações', 'Reporte'] }, { label: 'Natureza', type: 'select', options: ['Preventivo', 'Detectivo', 'Correctivo'] }, { label: 'Descrição', type: 'textarea', placeholder: 'Como o controlo funciona e qual evidência produz?' }] },
  'Criar report': { eyebrow: 'REPORTING', title: 'Criar report executivo', description: 'Configure um relatório e selecione os indicadores que serão apresentados.', fields: [{ label: 'Nome do report', placeholder: 'Ex.: Board Pack · Setembro' }, { label: 'Periodicidade', type: 'select', options: ['Pontual', 'Semanal', 'Mensal', 'Trimestral'] }, { label: 'Destinatários', placeholder: 'Emails separados por vírgula' }, { label: 'Notas', type: 'textarea', placeholder: 'Contexto ou instruções para o relatório' }] },
  'Guardar pesquisa': { eyebrow: 'PESQUISA REGULATÓRIA', title: 'Guardar pesquisa', description: 'Guarde estes filtros para voltar rapidamente à mesma pesquisa.', fields: [{ label: 'Nome da pesquisa', placeholder: 'Ex.: AML em vigor' }, { label: 'Notificar novas publicações?', type: 'select', options: ['Sim, por email', 'Sim, no centro de notificações', 'Não'] }] },
  'Adicionar requisito': { eyebrow: 'NORMATIVO', title: 'Adicionar requisito regulatório', description: 'Associe um requisito a um normativo e defina a sua aplicabilidade.', fields: [{ label: 'Código do requisito', placeholder: 'Ex.: BNA-AML-042' }, { label: 'Regulador', type: 'select', options: ['BNA', 'UIF', 'Outro regulador'] }, { label: 'Tema', placeholder: 'Ex.: Prevenção de branqueamento' }, { label: 'Aplicável a', type: 'select', options: ['Toda a organização', 'Corporate', 'Retalho'] }, { label: 'Descrição', type: 'textarea', placeholder: 'Detalhe o requisito e a evidência esperada.' }] },
  'Criar regra de alerta': { eyebrow: 'ALERTAS', title: 'Criar regra de alerta', description: 'Defina quando a Opakus deve gerar uma notificação e para quem.', fields: [{ label: 'Nome da regra', placeholder: 'Ex.: Obrigação crítica próxima do prazo' }, { label: 'Categoria', type: 'select', options: ['Regulatório', 'Operacional', 'Segurança'] }, { label: 'Condição', type: 'select', options: ['Prazo inferior a 7 dias', 'Score abaixo do limite', 'Novo acesso privilegiado'] }, { label: 'Notificar', placeholder: 'Equipa ou emails destinatários' }] },
  'Convidar utilizador': { eyebrow: 'IDENTITY & ACCESS', title: 'Convidar utilizador', description: 'Convide uma pessoa e atribua o role adequado ao seu âmbito de trabalho.', fields: [{ label: 'Nome completo', placeholder: 'Ex.: Marta Domingos' }, { label: 'Email profissional', type: 'email', placeholder: 'nome@organizacao.com' }, { label: 'Departamento', type: 'select', options: ['Compliance', 'Risco', 'Auditoria', 'IT & Segurança'] }, { label: 'Role', type: 'select', options: ['Compliance Officer', 'Risk Manager', 'Auditor', 'Administrador'] }] },
  'Adicionar normativo': { eyebrow: 'NORMATIVO', title: 'Adicionar normativo', description: 'Registe uma fonte regulatória e mantenha a sua vigência e aplicabilidade.', fields: [{ label: 'Código e título', placeholder: 'Ex.: Aviso 02/2026 · Governação' }, { label: 'Regulador', type: 'select', options: ['BNA', 'UIF', 'APD', 'Outro'] }, { label: 'Data de vigência', type: 'date' }, { label: 'Descrição', type: 'textarea', placeholder: 'Resumo e impacto operacional' }] },
  'Registar anomalia': { eyebrow: 'RISCO', title: 'Registar anomalia', description: 'Abra um incidente e encaminhe-o para análise.', fields: [{ label: 'Descrição do incidente', placeholder: 'Ex.: Concentração transacional fora do perfil' }, { label: 'Domínio', type: 'select', options: ['AML / CFT', 'KYC', 'Operações', 'Reporte'] }, { label: 'Prioridade', type: 'select', options: ['Crítico', 'Alta', 'Média', 'Baixa'] }, { label: 'Detalhes', type: 'textarea', placeholder: 'Evidências e contexto' }] },
  'Criar auditoria': { eyebrow: 'AUDITORIA', title: 'Criar auditoria', description: 'Planeie uma auditoria, defina o âmbito e atribua um responsável.', fields: [{ label: 'Nome da auditoria', placeholder: 'Ex.: Auditoria AML 2026' }, { label: 'Âmbito', placeholder: 'Processos, controlos ou equipas abrangidas' }, { label: 'Responsável', placeholder: 'Auditor ou equipa' }, { label: 'Data prevista', type: 'date' }] },
  'Criar matriz': { eyebrow: 'RISCO · REQUISITOS', title: 'Criar matriz', description: 'Crie uma matriz de requisitos e associe-a a um normativo.', fields: [{ label: 'Nome da matriz', placeholder: 'Ex.: Matriz BNA AML' }, { label: 'Normativo', placeholder: 'Normativo de referência' }, { label: 'Owner', placeholder: 'Equipa responsável' }, { label: 'Descrição', type: 'textarea', placeholder: 'Objetivo e âmbito da matriz' }] },
  'Criar perfil de visibilidade': { eyebrow: 'VISIBILIDADE', title: 'Criar perfil de visibilidade', description: 'Defina o âmbito de dados e permissões de leitura para um grupo.', fields: [{ label: 'Nome do perfil', placeholder: 'Ex.: Auditor externo' }, { label: 'Âmbito', type: 'select', options: ['Workspace', 'Reports', 'Auditoria', 'Diligência'] }, { label: 'Nível de acesso', type: 'select', options: ['Leitura', 'Leitura limitada', 'Leitura e exportação'] }, { label: 'Descrição', type: 'textarea', placeholder: 'Regras de visibilidade' }] },
}

function CrudModal({ title, eyebrow, onClose }: { title: string; eyebrow: string; onClose: () => void }) {
  const [saved, setSaved] = useState(false)
  const [records, setRecords] = useState(['Registo principal', 'Registo em revisão', 'Registo arquivado'])
  const createRecord = () => setRecords((current) => [...current, `Novo registo ${current.length + 1}`])
  const archiveRecord = (record: string) => setRecords((current) => current.filter((item) => item !== record))
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="form-modal crud-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={18}/></button><span className="section-kicker">{eyebrow}</span><h2>Gerir registos · {title}</h2><p className="form-description">Crie, edite, consulte ou arquive os registos desta área.</p>{saved ? <div className="form-success"><CheckCircle2 size={34}/><p>Alteração guardada com sucesso.</p><button className="btn btn-primary" onClick={onClose}>Concluir</button></div> : <><div className="crud-list">{records.map((record, index) => <div className="crud-record" key={record}><div><strong>{record}</strong><small>{index === 0 ? 'Activo · actualizado hoje' : index === 1 ? 'Em revisão · requer atenção' : 'Arquivado · histórico'}</small></div><div className="crud-record-actions"><button className="btn btn-ghost" onClick={() => setSaved(true)}>Editar</button><button className="btn btn-ghost danger-action" onClick={() => archiveRecord(record)}>Arquivar</button></div></div>)}</div><div className="form-actions"><button className="btn btn-secondary" onClick={onClose}>Fechar</button><button className="btn btn-primary" onClick={createRecord}>+ Criar registo</button></div></>}</section></div>
}

function FormModal({ action, onClose }: { action: string; onClose: () => void }) {
  const definition = formDefinitions[action] || { eyebrow: 'OPAKUS', title: action, description: 'Preencha os dados para continuar.', fields: [{ label: 'Nome', placeholder: 'Introduza um nome' }, { label: 'Descrição', type: 'textarea', placeholder: 'Detalhes' }] }
  const [submitted, setSubmitted] = useState(false)
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-modal-title"><button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={18}/></button><span className="section-kicker">{definition.eyebrow}</span><h2 id="form-modal-title">{submitted ? 'Registo criado com sucesso' : definition.title}</h2>{submitted ? <div className="form-success"><CheckCircle2 size={34}/><p>Os dados foram validados e o registo foi adicionado ao workflow Opakus.</p><button className="btn btn-primary" onClick={onClose}>Concluir</button></div> : <><p className="form-description">{definition.description}</p><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><div className="form-grid">{definition.fields.map((field) => <label key={field.label}>{field.label}{field.type === 'select' ? <select required defaultValue=""><option value="" disabled>Selecione uma opção</option>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : field.type === 'textarea' ? <textarea required placeholder={field.placeholder}/> : <input required type={field.type || 'text'} placeholder={field.placeholder}/>}</label>)}</div><div className="form-actions"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="btn btn-primary">Guardar registo</button></div></form></>}</section></div>
}

function AnalyticsStrip({ items }: { items: { label: string; value: string; delta: string; tone?: string }[] }) {
  return <div className="analytics-strip">{items.map((item) => <div className={`analytics-tile ${item.tone || ''}`} key={item.label}><span>{item.label}</span><strong>{item.value}</strong><small>{item.delta}</small></div>)}</div>
}

function DetailChart({ title, subtitle, tone = 'blue' }: { title: string; subtitle: string; tone?: string }) {
  return <div className="card detail-chart"><div className="card-header"><div><h3 className="card-title">{title}</h3><p className="card-subtitle">{subtitle}</p></div><button className="chart-menu">•••</button></div><div className="card-content"><div className={`chart-area chart-area-${tone}`}><div className="chart-grid-lines"><i/><i/><i/><i/></div><svg viewBox="0 0 640 160" preserveAspectRatio="none" aria-label={title}><path d="M0 132 C55 122 75 96 128 110 S205 70 258 84 S330 38 384 72 S468 55 520 27 S590 44 640 14" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M0 132 C55 122 75 96 128 110 S205 70 258 84 S330 38 384 72 S468 55 520 27 S590 44 640 14 V160 H0Z" fill="currentColor" opacity=".09"/></svg></div><div className="chart-axis"><span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span></div></div></div>
}

function KycDetailView() {
  const [selectedCase, setSelectedCase] = useState<{ name: string; type: string; risk: string; status: string } | null>(null)
  const cases = [{ name:'Empresa ABC Lda.', type:'KYC · Cliente', risk:'Baixo', status:'Completo' }, { name:'Marta Domingos', type:'KYE · Colaborador', risk:'Médio', status:'Em revisão' }, { name:'Fornecedor XYZ SA', type:'KYP · Parceiro', risk:'Alto', status:'Documentação pendente' }, { name:'Grupo DEF SA', type:'KYC · Cliente', risk:'Baixo', status:'Completo' }]
  const openCases = () => window.dispatchEvent(new CustomEvent('opakus:navigate', { detail: { view: 'kyc-cases' } }))
  return <div className="view-enter"><SectionHeader eyebrow="CLIENTE & KYC · KYE · KYP" title="Gestão de KYC, KYE e KYP" subtitle="Visão operacional de clientes, colaboradores e parceiros através de diligência baseada em risco." action="Novo caso" /><div className="view-body"><AnalyticsStrip items={[{label:'Casos ativos',value:'1.284',delta:'+8,4% este mês',tone:'blue'},{label:'Taxa de aprovação',value:'91,8%',delta:'+2,1% vs. anterior',tone:'green'},{label:'Revisões vencidas',value:'42',delta:'12 críticas',tone:'red'},{label:'SLA médio',value:'18h 42m',delta:'−4h 12m',tone:'purple'}]} /><div className="dashboard-grid grid-2col"><DetailChart title="Volume de casos KYC" subtitle="Entradas, aprovados e encerrados" tone="purple" /><div className="card"><div className="card-header"><div><h3 className="card-title">Fila por prioridade</h3><p className="card-subtitle">Distribuição atual de casos</p></div></div><div className="card-content queue-list"><InsightRow label="Alta prioridade" value="87" detail="Requer ação hoje" tone="red"/><InsightRow label="Revisão standard" value="416" detail="Dentro do SLA" tone="blue"/><InsightRow label="Baixa prioridade" value="781" detail="Monitorização" tone="green"/><div className="stacked-bar"><i style={{width:'9%'}}/><i style={{width:'32%'}}/><i style={{width:'59%'}}/></div></div></div></div><div className="card"><div className="card-header"><div><h3 className="card-title">Casos recentes</h3><p className="card-subtitle">Últimas atualizações do workflow</p></div><button className="btn btn-secondary" onClick={openCases}>Ver todos os casos</button></div><div className="table-wrapper"><table className="table"><thead><tr><th>Cliente</th><th>Segmento</th><th>Risco</th><th>Estado</th><th>Atualizado</th></tr></thead><tbody>{cases.map((item,i)=><tr key={item.name}><td><button className="case-link" onClick={() => setSelectedCase(item)}><strong>{item.name}</strong><small>{item.type}</small></button></td><td>{['Corporate','Compliance','Fornecedor crítico','Institucional'][i]}</td><td><span className={`risk-pill ${item.risk==='Alto'?'high':item.risk==='Médio'?'medium':'low'}`}>{item.risk}</span></td><td><span className={`status ${item.status==='Documentação pendente'?'warning':'success'}`}>{item.status}</span></td><td>Hoje, {9+i}:2{i}</td></tr>)}</tbody></table></div></div></div></div>
}

function AllKycCasesView() {
  const [selectedCase, setSelectedCase] = useState<{ name:string; type:string; risk:string; status:string } | null>(null)
  const cases = [{name:'Empresa ABC Lda.',type:'KYC · Cliente',risk:'Baixo',status:'Completo'},{name:'Marta Domingos',type:'KYE · Colaborador',risk:'Médio',status:'Em revisão'},{name:'Fornecedor XYZ SA',type:'KYP · Parceiro',risk:'Alto',status:'Documentação pendente'},{name:'Grupo DEF SA',type:'KYC · Cliente',risk:'Baixo',status:'Completo'},{name:'Ana Costa',type:'KYE · Colaborador',risk:'Baixo',status:'Completo'}]
  return <div className="view-enter"><SectionHeader eyebrow="CLIENTE & KYC · KYE · KYP" title="Todos os casos de diligência" subtitle="Pesquise, filtre e abra o detalhe de qualquer caso de cliente, colaborador ou parceiro." action="Novo caso"/><div className="view-body"><AnalyticsStrip items={[{label:'Casos encontrados',value:'1.284',delta:'Todos os tipos',tone:'blue'},{label:'KYC · Clientes',value:'872',delta:'68% da carteira',tone:'green'},{label:'KYE · Colaboradores',value:'321',delta:'25% da carteira',tone:'purple'},{label:'KYP · Parceiros',value:'91',delta:'7% · 12 críticos',tone:'red'}]}/><div className="card cases-list-card"><div className="card-header"><div><span className="card-eyebrow">DUE DILIGENCE REGISTER</span><h3 className="card-title">Registo completo de casos</h3><p className="card-subtitle">Cada caso abre o detalhe operacional num painel lateral direito.</p></div><div className="cases-filter-row"><button className="btn btn-secondary">Filtrar tipo</button><button className="btn btn-secondary">Filtrar risco</button></div></div><div className="table-wrapper"><table className="table"><thead><tr><th>Nome / tipo</th><th>Segmento</th><th>Risco</th><th>Estado</th><th>Última atualização</th><th/></tr></thead><tbody>{cases.map((item,i)=><tr key={item.name}><td><button className="case-link" onClick={() => setSelectedCase(item)}><strong>{item.name}</strong><small>{item.type}</small></button></td><td>{['Corporate','Compliance','Fornecedor crítico','Institucional','Compliance'][i]}</td><td><span className={`risk-pill ${item.risk==='Alto'?'high':item.risk==='Médio'?'medium':'low'}`}>{item.risk}</span></td><td><span className={`status ${item.status==='Documentação pendente'?'warning':'success'}`}>{item.status}</span></td><td>Hoje, 09:{20+i}</td><td><button className="btn btn-ghost" onClick={() => setSelectedCase(item)}>Abrir <ChevronRight size={14}/></button></td></tr>)}</tbody></table></div></div>{selectedCase && <CaseDrawer item={selectedCase} onClose={() => setSelectedCase(null)}/>}</div></div>
}

function CaseDrawer({ item, onClose }: { item: {name:string; type:string; risk:string; status:string}; onClose:()=>void }) { return <div className="matrix-drawer-backdrop" onMouseDown={(event) => { if(event.target===event.currentTarget) onClose() }}><aside className="matrix-drawer case-drawer" role="dialog" aria-modal="true"><div className="drawer-header"><div><span className="card-eyebrow">DUE DILIGENCE CASE</span><h2>{item.name}</h2><p>{item.type} · último ciclo atualizado hoje</p></div><button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={18}/></button></div><div className="case-profile-summary"><span className="profile-avatar small">{item.name.split(' ').map((word)=>word[0]).join('').slice(0,2)}</span><div><strong>{item.name}</strong><small>{item.type}</small></div><span className={`risk-pill ${item.risk==='Alto'?'high':item.risk==='Médio'?'medium':'low'}`}>{item.risk} risco</span></div><div className="drawer-score"><div><span>Progresso da avaliação</span><strong>{item.status==='Completo'?'100%':item.status==='Em revisão'?'72%':'38%'}</strong></div><div className="drawer-progress"><i style={{width:item.status==='Completo'?'100%':item.status==='Em revisão'?'72%':'38%'}}/></div><small>Documentos, listas, risco e aprovação</small></div><div className="drawer-section"><div className="drawer-section-title"><strong>Checklist do caso</strong><span>4 etapas</span></div>{['Identidade e dados base','Screening de sanções e PEP','Avaliação de risco','Aprovação e monitorização'].map((step,i)=><div className="drawer-requirement" key={step}><span className={`drawer-check ${item.status!=='Completo'&&i===3?'pending':''}`}>{item.status!=='Completo'&&i===3?'!':'✓'}</span><div><strong>{step}</strong><small>{item.status!=='Completo'&&i===3?'Pendente · requer ação':'Validado · evidência anexada'}</small></div></div>)}</div><div className="drawer-actions"><button className="btn btn-secondary" onClick={onClose}>Fechar</button><button className="btn btn-primary">Editar caso</button></div></aside></div> }

function ObligationsDetailView() {
  return <div className="view-enter"><SectionHeader eyebrow="NORMATIVO" title="Obrigações e prazos" subtitle="Calendário regulatório, responsáveis e evidências de execução." action="Adicionar obrigação"/><div className="view-body"><AnalyticsStrip items={[{label:'Total de obrigações',value:'248',delta:'32 este trimestre',tone:'blue'},{label:'No prazo',value:'224',delta:'90,3% da carteira',tone:'green'},{label:'Próximas 7 dias',value:'16',delta:'4 críticas',tone:'amber'},{label:'Em atraso',value:'8',delta:'−3 vs. semana passada',tone:'red'}]}/><div className="dashboard-grid grid-2col"><DetailChart title="Cumprimento de obrigações" subtitle="Tendência dos últimos 12 meses" tone="green"/><div className="card"><div className="card-header"><div><h3 className="card-title">Calendário de vencimentos</h3><p className="card-subtitle">Setembro 2026</p></div></div><div className="card-content calendar-widget"><div className="calendar-head">SEG TER QUA QUI SEX SÁB DOM</div><div className="calendar-grid">{Array.from({length:35},(_,i)=><span className={i%7===2?'marked':''} key={i}>{i<4?'':(i-3)}</span>)}</div><div className="calendar-legend"><i className="dot red"/> Crítico <i className="dot blue"/> Em acompanhamento</div></div></div></div><div className="card"><div className="card-header"><div><h3 className="card-title">Agenda regulatória</h3><p className="card-subtitle">Obrigações ordenadas por data de vencimento</p></div><button className="btn btn-secondary">Filtros</button></div><div className="obligation-rows">{['Reporte prudencial Q3','Revisão de políticas AML','Mapa de risco operacional','Declaração de transações cambiais'].map((item,i)=><div className="obligation-row" key={item}><span className={`priority-dot p${i}`}/><div><strong>{item}</strong><small>Responsável: {['Financeiro','Compliance','Risco','Tesouraria'][i]} · Evidências  {i+2}/5</small></div><b>{['30 Set','15 Out','21 Out','04 Nov'][i]}</b><span className="status success">{i===0?'Em progresso':'Agendado'}</span></div>)}</div></div></div></div>
}

function ReportsDetailView() {
  return <div className="view-enter"><SectionHeader eyebrow="CONTROLO" title="Reports & inteligência" subtitle="Relatórios executivos, indicadores e exporta��ões para decisão." action="Criar report"/><div className="view-body"><AnalyticsStrip items={[{label:'Reports publicados',value:'36',delta:'+6 este mês',tone:'blue'},{label:'Leitores ativos',value:'184',delta:'+18,2%',tone:'purple'},{label:'Exportações',value:'412',delta:'Últimos 30 dias',tone:'green'},{label:'Agendados',value:'12',delta:'3 esta semana',tone:'amber'}]}/><div className="dashboard-grid grid-2col"><DetailChart title="Leitura executiva" subtitle="Acessos aos reports por semana" tone="blue"/><DetailChart title="Indicadores por domínio" subtitle="Comparativo de performance" tone="purple"/></div><div className="report-card-grid">{['Board Pack · Setembro','Mapa de risco trimestral','Relatório KYC consolidado','BNA · Acompanhamento regulatório'].map((item,i)=><div className="report-card" key={item}><div className={`report-cover cover-${i}`}><BarChart3 size={24}/><span>PDF</span></div><div><strong>{item}</strong><small>Atualizado hoje · {12+i} páginas</small><button className="text-action">Abrir relatório →</button></div></div>)}</div></div></div>
}

function ControlsView() {
  return <div className="view-enter"><SectionHeader eyebrow="CONTROLO · CONTROL LIBRARY" title="Controlos" subtitle="Biblioteca operacional de controlos, testes, evidências e eficácia por domínio." action="Novo controlo"/><div className="view-body"><AnalyticsStrip items={[{label:'Controlos activos',value:'812',delta:'+24 este mês',tone:'blue'},{label:'Eficácia média',value:'92,9%',delta:'+3,4% vs. anterior',tone:'green'},{label:'Testes pendentes',value:'34',delta:'12 vencem esta semana',tone:'amber'},{label:'Excepções',value:'24',delta:'3 críticas',tone:'red'}]}/><div className="dashboard-grid grid-2col"><DetailChart title="Eficácia dos controlos" subtitle="Resultado dos testes por mês" tone="blue"/><div className="card"><div className="card-header"><div><span className="card-eyebrow">CONTROL MIX</span><h3 className="card-title">Distribuição por natureza</h3><p className="card-subtitle">812 controlos catalogados</p></div></div><div className="card-content"><InsightRow label="Preventivos" value="384" detail="47,3% da biblioteca" tone="blue"/><InsightRow label="Detectivos" value="267" detail="32,9% da biblioteca" tone="purple"/><InsightRow label="Correctivos" value="161" detail="19,8% da biblioteca" tone="amber"/><div className="stacked-bar"><i style={{width:'47%'}}/><i style={{width:'33%'}}/><i style={{width:'20%'}}/></div></div></div></div><div className="card detail-table"><div className="card-header"><div><span className="card-eyebrow">CONTROL TESTING</span><h3 className="card-title">Controlos que requerem atenção</h3><p className="card-subtitle">Prioridade calculada por impacto, evidência e data do próximo teste</p></div><button className="btn btn-secondary">Exportar catálogo</button></div><div className="table-wrapper"><table className="table"><thead><tr><th>ID / controlo</th><th>Domínio</th><th>Owner</th><th>Último teste</th><th>Eficácia</th><th>Estado</th></tr></thead><tbody>{['AML-042 · Screening de sanções','KYC-118 · Beneficiário efectivo','OPS-207 · Reconciliação diária','REG-031 · Reporte prudencial'].map((item,i)=><tr key={item}><td><strong>{item}</strong></td><td>{['AML / CFT','KYC','Operações','Reporte'][i]}</td><td>{['Compliance','KYC Office','Financeiro','Regulatory'][i]}</td><td>{['18 Jun','16 Jun','12 Jun','10 Jun'][i]} 2026</td><td><span className={`risk-pill ${i===0?'high':i===1?'medium':'low'}`}>{['76%','84%','96%','91%'][i]}</span></td><td><span className={`status ${i===0?'warning':'success'}`}>{i===0?'Em validação':'Operacional'}</span></td></tr>)}</tbody></table></div></div></div></div>
}

function AlertsView() {
  const [filter, setFilter] = useState('Todos')
  const alerts = [{title:'Reporte prudencial vence em 5 dias', source:'Obrigações · BNA', time:'Há 12 min', tone:'critical', status:'Não lido'}, {title:'Novo normativo UIF requer avaliação', source:'Monitor regulatório · UIF', time:'Há 46 min', tone:'warning', status:'Não lido'}, {title:'Controlo AML-042 com eficácia abaixo do limite', source:'Controlos · AML / CFT', time:'Há 2 h', tone:'info', status:'Em acompanhamento'}, {title:'Novo acesso atribuído a João Manuel', source:'Segurança · Utilizadores', time:'Há 4 h', tone:'success', status:'Resolvido'}]
  const visible = filter === 'Todos' ? alerts : alerts.filter((a) => a.status === filter)
  return <div className="view-enter"><SectionHeader eyebrow="GESTÃO DA PLATAFORMA" title="Alertas e notificações" subtitle="Centralize alertas operacionais, regulatórios e de segurança num único centro." action="Criar regra de alerta"/><div className="view-body"><AnalyticsStrip items={[{label:'Alertas activos',value:'27',delta:'+6 hoje',tone:'blue'},{label:'Críticos',value:'03',delta:'Requerem ação imediata',tone:'red'},{label:'Não lidos',value:'11',delta:'−4 desde ontem',tone:'amber'},{label:'Regras activas',value:'18',delta:'+2 este mês',tone:'green'}]}/><div className="dashboard-grid grid-2col"><DetailChart title="Volume de alertas" subtitle="Detecções por dia · últimos 30 dias" tone="red"/><div className="card"><div className="card-header"><div><span className="card-eyebrow">ALERT GOVERNANCE</span><h3 className="card-title">Regras de monitorização</h3><p className="card-subtitle">Estado das regras activas</p></div></div><div className="card-content"><InsightRow label="Regulatório" value="8" detail="BNA, UIF e outros" tone="blue"/><InsightRow label="Operacional" value="6" detail="SLA e obrigações" tone="amber"/><InsightRow label="Segurança" value="4" detail="Acessos e permissões" tone="red"/></div></div></div><div className="card alert-inbox"><div className="card-header"><div><h3 className="card-title">Caixa de alertas</h3><p className="card-subtitle">Priorize e encaminhe as ocorrências da sua equipa</p></div><div className="alert-filters">{['Todos','Não lido','Em acompanhamento','Resolvido'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="alert-list">{visible.map((alert) => <div className="alert-row" key={alert.title}><span className={`alert-symbol ${alert.tone}`}><Bell size={15}/></span><div className="alert-copy"><strong>{alert.title}</strong><small>{alert.source} · {alert.time}</small></div><span className={`status-pill ${alert.tone === 'critical' ? 'danger' : alert.tone === 'warning' ? 'warning' : 'success'}`}>{alert.status}</span><button className="btn btn-ghost">Abrir <ChevronRight size={14}/></button></div>)}</div></div></div></div>
}

function UsersView() {
  const openProfile = (name: string) => window.dispatchEvent(new CustomEvent('opakus:navigate', { detail: { view: 'user-profile', name } }))
  return <div className="view-enter"><SectionHeader eyebrow="GESTÃO DA PLATAFORMA · IAM" title="Utilizadores e roles" subtitle="Administre acessos, funções e segregação de responsabilidades da plataforma." action="Convidar utilizador"/><div className="view-body"><AnalyticsStrip items={[{label:'Utilizadores activos',value:'48',delta:'+3 este mês',tone:'blue'},{label:'Convites pendentes',value:'05',delta:'2 expiram amanhã',tone:'amber'},{label:'Roles configuradas',value:'09',delta:'3 customizadas',tone:'purple'},{label:'Acessos revistos',value:'96%',delta:'+4,1% este trimestre',tone:'green'}]}/><div className="dashboard-grid grid-2col"><DetailChart title="Actividade de utilizadores" subtitle="Sessões e acessos · últimos 30 dias" tone="purple"/><div className="card"><div className="card-header"><div><span className="card-eyebrow">ACCESS CONTROL</span><h3 className="card-title">Distribuição por role</h3><p className="card-subtitle">Princípio do menor privilégio</p></div></div><div className="card-content"><InsightRow label="Compliance Officer" value="12" detail="Acesso operacional" tone="blue"/><InsightRow label="Risk Manager" value="8" detail="Acesso a risco" tone="purple"/><InsightRow label="Auditor" value="6" detail="Somente leitura" tone="amber"/><InsightRow label="Administrador" value="3" detail="Acesso privilegiado" tone="red"/></div></div></div><div className="card user-table"><div className="card-header"><div><h3 className="card-title">Utilizadores da organização</h3><p className="card-subtitle">Última revisão de acessos: 18 Jun 2026</p></div><button className="btn btn-secondary">Rever acessos</button></div><div className="table-wrapper"><table className="table"><thead><tr><th>Utilizador</th><th>Departamento</th><th>Role</th><th>Último acesso</th><th>Estado</th><th/></tr></thead><tbody>{[['Marta Domingos','Compliance','Compliance Officer'],['João Manuel','Risco','Risk Manager'],['Ana Costa','Auditoria','Auditor'],['Paulo Silva','IT & Segurança','Administrador']].map(([name,dept,role],i)=><tr key={name}><td><div className="user-cell"><span className="avatar-small">{name.split(' ').map((n) => n[0]).join('')}</span><strong>{name}</strong></div></td><td>{dept}</td><td><span className="role-badge">{role}</span></td><td>{i + 1} h atrás</td><td><span className="status success">Activo</span></td><td><button className="btn btn-ghost" onClick={() => openProfile(name)}>Ver perfil <ChevronRight size={14}/></button></td></tr>)}</tbody></table></div></div></div></div>
}

function UserProfileView({ name = 'Marta Domingos' }: { name?: string }) {
  const permissions = [{ name: 'Visão executiva', group: 'Workspace', level: 'Visualizar', tone: 'blue' }, { name: 'Status de conformidade', group: 'Compliance', level: 'Editar', tone: 'green' }, { name: 'Biblioteca de controlos', group: 'Compliance', level: 'Editar', tone: 'green' }, { name: 'Risco & anomalias', group: 'Risco', level: 'Visualizar', tone: 'blue' }, { name: 'Auditoria', group: 'Auditoria', level: 'Sem acesso', tone: 'red' }]
  return <div className="view-enter"><div className="view-header profile-header"><div><span className="section-kicker">GESTÃO DA PLATAFORMA · IAM</span><button className="back-link" onClick={() => window.dispatchEvent(new CustomEvent('opakus:navigate', { detail: { view: 'users' } }))}>← Utilizadores e roles</button><h1 className="view-title">Perfil de utilizador</h1><p className="view-subtitle">Identidade, acessos, roles e histórico de permissões.</p></div><div className="profile-actions"><button className="btn btn-secondary">Suspender acesso</button><button className="btn btn-primary">Editar perfil</button></div></div><div className="view-body"><div className="profile-identity card"><div className="profile-avatar">MD</div><div className="profile-main"><span className="status success">Activo</span><h2>{name}</h2><p>marta.domingos@opakus.ao · Compliance</p><small>Último acesso hoje às 09:42 · Sessão via MFA</small></div><div className="profile-meta"><span>ROLE PRINCIPAL<strong>Compliance Officer</strong></span><span>MEMBRO DESDE<strong>12 Jan 2024</strong></span></div></div><div className="dashboard-grid grid-2col"><div className="card"><div className="card-header"><div><span className="card-eyebrow">ACCESS MATRIX</span><h3 className="card-title">Permissões por módulo</h3><p className="card-subtitle">Acesso efetivo calculado a partir das roles atribuídas</p></div><button className="btn btn-secondary">Editar permissões</button></div><div className="permission-list">{permissions.map((permission) => <div className="permission-row" key={permission.name}><span className="permission-icon">{permission.group.slice(0,1)}</span><div><strong>{permission.name}</strong><small>{permission.group}</small></div><span className={`permission-level ${permission.tone}`}>{permission.level}</span><ChevronRight size={14}/></div>)}</div></div><div className="card"><div className="card-header"><div><span className="card-eyebrow">ROLES & POLICIES</span><h3 className="card-title">Roles atribuídas</h3><p className="card-subtitle">Políticas herdadas e exceções</p></div></div><div className="role-stack"><div className="role-card"><strong>Compliance Officer</strong><span>Role principal · 18 permissões</span><b>Herdada</b></div><div className="role-card"><strong>AML Reviewer</strong><span>Role complementar · 6 permissões</span><b>Herdada</b></div><button className="add-role">+ Atribuir nova role</button></div></div></div><div className="card audit-access"><div className="card-header"><div><h3 className="card-title">Histórico de acessos e alterações</h3><p className="card-subtitle">Últimos eventos de segurança deste utilizador</p></div></div><div className="timeline-list">{['Login aprovado com MFA','Permissão “Controlos” atualizada para Editar','Role AML Reviewer atribuída por Paulo Silva'].map((item, i) => <div className="timeline-item" key={item}><span className={`timeline-icon t${i}`}><Activity size={13}/></span><div><strong>{item}</strong><small>{i === 0 ? 'Hoje, 09:42' : i === 1 ? 'Ontem, 16:20' : '12 Jun 2026'} · Sistema IAM</small></div></div>)}</div></div></div></div>
}

function CrudCenterView() {
  const entities = [{ key:'cases', label:'Casos KYC / KYE / KYP', action:'Novo caso', count:'1.284', columns:['Nome / tipo','Risco','Estado','Última atualização'], rows:[['Empresa ABC Lda.','Baixo','Completo','Hoje, 09:20'],['Marta Domingos','Médio','Em revisão','Hoje, 09:18']] }, { key:'obligations', label:'Obrigações', action:'Adicionar obrigação', count:'42', columns:['Obrigação','Regulador','Prazo','Estado'], rows:[['Reporte prudencial Q3','BNA','30 Jun 2026','Em curso'],['Revisão AML anual','UIF','15 Jul 2026','Pendente']] }, { key:'requirements', label:'Requisitos', action:'Adicionar requisito', count:'186', columns:['C��digo / requisito','Regulador','Aplicabilidade','Estado'], rows:[['BNA-AML-042 · Screening','BNA','Toda a organização','Conforme'],['UIF-031 · Reporte','UIF','Corporate','Em revisão']] }, { key:'controls', label:'Controlos', action:'Novo controlo', count:'96', columns:['Controlo','Domínio','Owner','Estado'], rows:[['Screening de sanções','AML / CFT','Compliance','Activo'],['Revisão de alertas','Operações','Risco','Em validação']] }, { key:'alerts', label:'Regras de alertas', action:'Criar regra de alerta', count:'18', columns:['Regra','Categoria','Gatilho','Estado'], rows:[['Obrigação crítica','Regulatório','Prazo < 7 dias','Activa'],['Acesso privilegiado','Segurança','Novo acesso','Activa']] }, { key:'users', label:'Utilizadores e roles', action:'Convidar utilizador', count:'48', columns:['Utilizador','Departamento','Role','Estado'], rows:[['Marta Domingos','Compliance','Compliance Officer','Activo'],['João Manuel','Risco','Risk Manager','Activo']] }, { key:'normativos', label:'Normativos', action:'Adicionar normativo', count:'248', columns:['Código / título','Regulador','Vigência','Estado'], rows:[['Aviso 02/2026 · Governação','BNA','15 Jun 2026','Em vigor'],['Instrutivo 07/2025 · AML','BNA','01 Jan 2025','Em vigor']] }, { key:'risks', label:'Riscos e anomalias', action:'Registar anomalia', count:'8', columns:['Incidente','Domínio','Prioridade','Estado'], rows:[['R-2841 · Concentração transacional','AML / CFT','Crítico','Em análise'],['R-2829 · Evidência expirada','Compliance','Alta','Monitorizado']] }, { key:'reports', label:'Reports', action:'Criar report', count:'24', columns:['Report','Periodicidade','Owner','Estado'], rows:[['Board Pack · Setembro','Mensal','Compliance','Publicado'],['Risk Committee Pack','Trimestral','Risco','Em preparação']] }, { key:'audit', label:'Auditoria', action:'Criar auditoria', count:'36', columns:['Auditoria','Âmbito','Responsável','Estado'], rows:[['Auditoria AML 2026','AML / CFT','Ana Costa','Em curso'],['Revisão de acessos Q3','IAM','Paulo Silva','Planeada']] }, { key:'matrices', label:'Matrizes de requisitos', action:'Criar matriz', count:'12', columns:['Matriz','Normativo','Owner','Estado'], rows:[['Matriz BNA AML','BNA','Compliance','Activa'],['Matriz KYC / KYE / KYP','Interna','Risco','Em revisão']] }, { key:'assessments', label:'Avaliações de diligência', action:'Iniciar avaliação', count:'1.284', columns:['Avaliado / tipo','Nível','Responsável','Estado'], rows:[['Empresa ABC · KYC','CDD','Compliance','Completa'],['Marta Domingos · KYE','CDD','Risco','Em revisão']] }, { key:'visibility', label:'Perfis de visibilidade', action:'Criar perfil de visibilidade', count:'16', columns:['Perfil','Âmbito','Acesso','Estado'], rows:[['Board / Executivo','Reports','Leitura','Activo'],['Auditor externo','Auditoria','Leitura limitada','Activo']] }, { key:'searches', label:'Pesquisas regulatórias', action:'Guardar pesquisa', count:'24', columns:['Pesquisa','Reguladores','Última execução','Estado'], rows:[['AML em vigor','BNA · UIF','Hoje, 09:20','Activa'],['Pagamentos digitais','BNA','Ontem, 16:42','Activa']] }]
  const [entityKey, setEntityKey] = useState('cases')
  const [editing, setEditing] = useState<string | null>(null)
  const entity = entities.find((item) => item.key === entityKey) || entities[0]
  const openForm = () => window.dispatchEvent(new CustomEvent('opakus:open-form', { detail: { action: entity.action } }))
  return <div className="view-enter"><SectionHeader eyebrow="GESTÃO DE REGISTOS · CRUD" title="Central de registos" subtitle="Crie, consulte, atualize e remova registos operacionais num ��nico espaço de trabalho." action={entity.action}/><div className="view-body"><div className="crud-tabs">{entities.map((item) => <button key={item.key} className={item.key === entityKey ? 'active' : ''} onClick={() => setEntityKey(item.key)}>{item.label}<b>{item.count}</b></button>)}</div><div className="card crud-card"><div className="card-header"><div><span className="card-eyebrow">{entity.label.toUpperCase()}</span><h3 className="card-title">Registos existentes</h3><p className="card-subtitle">Lista completa com ações de leitura, edição e remoção.</p></div><div className="crud-actions"><button className="btn btn-secondary">Exportar</button><button className="btn btn-primary" onClick={openForm}>+ {entity.action}</button></div></div><div className="table-wrapper"><table className="table"><thead><tr>{entity.columns.map((column) => <th key={column}>{column}</th>)}<th>Ações</th></tr></thead><tbody>{entity.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}<td><div className="row-actions"><button className="btn btn-ghost" onClick={() => setEditing(row[0])}>Ver</button><button className="btn btn-ghost" onClick={() => openForm()}>Editar</button><button className="icon-btn danger" onClick={() => setEditing(`delete:${row[0]}`)} aria-label={`Remover ${row[0]}`}><X size={14}/></button></div></td></tr>)}</tbody></table></div></div>{editing && <div className="modal-backdrop" onMouseDown={(event) => { if(event.target === event.currentTarget) setEditing(null) }}><section className="crud-detail-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={() => setEditing(null)} aria-label="Fechar"><X size={18}/></button>{editing.startsWith('delete:') ? <><span className="section-kicker">CONFIRMAR REMOÇÃO</span><h2>Remover registo?</h2><p>Esta ação ficará registada no histórico de auditoria e não poderá ser desfeita.</p><div className="form-actions"><button className="btn btn-secondary" onClick={() => setEditing(null)}>Cancelar</button><button className="btn btn-danger" onClick={() => setEditing(null)}>Remover</button></div></> : <><span className="section-kicker">DETALHE DO REGISTO</span><h2>{editing}</h2><p>Detalhe completo, histórico de alterações e evidências associadas a este registo.</p><div className="detail-facts"><span>Estado<strong>Activo</strong></span><span>Owner<strong>Compliance</strong></span><span>Atualizado<strong>Hoje, 09:20</strong></span></div><div className="form-actions"><button className="btn btn-secondary" onClick={() => setEditing(null)}>Fechar</button><button className="btn btn-primary" onClick={openForm}>Editar registo</button></div></>}</section></div>}</div></div>
}

function AuthHub() {
  const [mode, setMode] = useState<'login' | 'forgot' | 'otp' | 'logout'>('login')
  const [submitted, setSubmitted] = useState(false)
  const titles = { login: 'Entrar na plataforma', forgot: 'Recuperar palavra-passe', otp: 'Verificação de segurança', logout: 'Sessão terminada' }
  if (submitted && mode !== 'logout') return <div className="auth-screen"><section className="auth-card"><div className="auth-mark">O</div><span className="section-kicker">OPAKUS SECURITY</span><h1>{mode === 'forgot' ? 'Link enviado' : 'Código validado'}</h1><p>{mode === 'forgot' ? 'Enviámos instruções para o seu email profissional.' : 'A sua identidade foi confirmada. Pode continuar para a workspace.'}</p><button className="btn btn-primary auth-full" onClick={() => { setSubmitted(false); setMode('login') }}>Voltar ao login</button></section></div>
  return <div className="auth-screen"><section className="auth-card"><div className="auth-mark">O</div><span className="section-kicker">OPAKUS · IDENTITY & ACCESS</span><h1>{titles[mode]}</h1><p className="auth-intro">Acesso seguro ao centro de conformidade.</p>{mode === 'logout' ? <><div className="logout-icon"><CheckCircle2 size={32}/></div><p>A sessão de Marta Domingos foi terminada com segurança.</p><button className="btn btn-primary auth-full" onClick={() => setMode('login')}>Entrar novamente</button></> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>{mode === 'login' && <><label>Email profissional<input type="email" required placeholder="nome@organizacao.com"/></label><label>Palavra-passe<input type="password" required placeholder="••••••••••••"/></label><div className="auth-options"><label className="auth-check"><input type="checkbox"/> Manter sessão</label><button type="button" className="text-action" onClick={() => setMode('forgot')}>Esqueci a palavra-passe</button></div><button className="btn btn-primary auth-full">Entrar com segurança</button><button type="button" className="auth-secondary" onClick={() => setMode('otp')}>Usar código OTP</button></>}{mode === 'forgot' && <><label>Email profissional<input type="email" required placeholder="nome@organizacao.com"/></label><button className="btn btn-primary auth-full">Enviar instruções</button><button type="button" className="auth-secondary" onClick={() => setMode('login')}>Voltar ao login</button></>}{mode === 'otp' && <><p className="otp-hint">Introduza o código de 6 dígitos enviado para o seu dispositivo autenticador.</p><label>Código OTP<input inputMode="numeric" pattern="[0-9]{6}" minLength={6} maxLength={6} required placeholder="000000"/></label><button className="btn btn-primary auth-full">Validar código</button><button type="button" className="auth-secondary" onClick={() => setMode('login')}>Usar palavra-passe</button></>}</form>}<div className="auth-footer"><button onClick={() => setMode('logout')}>Terminar sessão</button><span>Protegido por Opakus IAM · MFA activo</span></div></section></div>
}

function AuthView() { return <div className="view-enter"><SectionHeader eyebrow="IDENTITY & ACCESS" title="Autenticação e segurança" subtitle="Configure sessão, MFA, políticas de palavra-passe e dispositivos autorizados." action="Guardar política"/><div className="view-body"><div className="settings-grid"><div className="card settings-panel"><div className="card-header"><div><span className="card-eyebrow">SESSION SECURITY</span><h3 className="card-title">Métodos de autenticação</h3></div></div><label className="setting-row"><span><strong>Autenticação multifator (MFA)</strong><small>Exigir MFA para todos os utilizadores</small></span><input className="toggle-input" type="checkbox" defaultChecked /></label><label className="setting-row"><span><strong>SSO corporativo</strong><small>Permitir login através do fornecedor de identidade</small></span><input className="toggle-input" type="checkbox" /></label><label className="setting-row"><span><strong>Encerrar sessões inactivas</strong><small>Após 30 minutos sem actividade</small></span><input className="toggle-input" type="checkbox" defaultChecked /></label></div><div className="card settings-panel"><div className="card-header"><div><span className="card-eyebrow">PASSWORD POLICY</span><h3 className="card-title">Política de acesso</h3></div></div><div className="form-grid"><label>Expiração da palavra-passe<select defaultValue="90 dias"><option>30 dias</option><option>90 dias</option><option>180 dias</option></select></label><label>Tentativas máximas<input defaultValue="5" type="number" /></label><label>Comprimento mínimo<input defaultValue="12" type="number" /></label><label>Requer caracteres especiais<select defaultValue="Sim"><option>Sim</option><option>Não</option></select></label></div></div></div><div className="card"><div className="card-header"><div><h3 className="card-title">Actividade de segurança</h3><p className="card-subtitle">Últimas alterações na autenticação</p></div></div><div className="security-events"><span><strong>MFA activado globalmente</strong><small>Hoje, 09:42 · Paulo Silva</small></span><span><strong>Nova sessão autorizada</strong><small>Ontem, 16:20 · Marta Domingos</small></span></div></div></div></div> }

function SettingsView() { return <div className="view-enter"><SectionHeader eyebrow="WORKSPACE SETTINGS" title="Definições" subtitle="Personalize a workspace, notificações e preferências operacionais." action="Guardar definições"/><div className="view-body"><div className="settings-grid"><div className="card settings-panel"><div className="card-header"><div><span className="card-eyebrow">WORKSPACE</span><h3 className="card-title">Preferências gerais</h3></div></div><label className="setting-row"><span><strong>Modo de revisão obrigatório</strong><small>Exigir aprovação antes de fechar um caso</small></span><input className="toggle-input" type="checkbox" defaultChecked /></label><label className="setting-row"><span><strong>Alertas por email</strong><small>Enviar ocorrências críticas para a equipa</small></span><input className="toggle-input" type="checkbox" defaultChecked /></label><label className="setting-row"><span><strong>Resumo semanal</strong><small>Receber síntese executiva todas as segundas</small></span><input className="toggle-input" type="checkbox" /></label></div><div className="card settings-panel"><div className="card-header"><div><span className="card-eyebrow">APPEARANCE</span><h3 className="card-title">Apresentação</h3></div></div><div className="form-grid"><label>Tema<select defaultValue="Claro"><option>Claro</option><option>Escuro</option><option>Sistema</option></select></label><label>Idioma<select defaultValue="Português (AO)"><option>Português (AO)</option><option>Português (PT)</option><option>English</option></select></label><label>Fuso horário<select defaultValue="Africa/Luanda"><option>Africa/Luanda</option><option>UTC</option></select></label></div></div></div></div></div> }

function NotificationsView() { const notifications = [{title:'Reporte prudencial vence em 5 dias',meta:'Obrigação · BNA · há 12 min',tone:'critical'},{title:'Novo normativo UIF requer avaliação',meta:'Monitor regulatório · há 46 min',tone:'warning'},{title:'Controlo AML-042 abaixo do limite',meta:'Controlos · há 2 h',tone:'info'}]; return <div className="view-enter"><SectionHeader eyebrow="CENTRO DE NOTIFICAÇÕES" title="Notificações" subtitle="Reveja ocorrências, atribua responsáveis e marque alertas como tratados." action="Marcar todas como lidas"/><div className="view-body"><div className="notifications-toolbar"><span>3 notificações por tratar</span><button className="btn btn-secondary">Filtrar notificações</button></div><div className="card notification-center">{notifications.map((item)=><div className="notification-item" key={item.title}><span className={`notification-dot ${item.tone}`}/><div><strong>{item.title}</strong><small>{item.meta}</small></div><button className="btn btn-ghost">Marcar como lida</button><button className="btn btn-primary">Abrir</button></div>)}</div></div></div> }

// Rich fallback for remaining workspaces
function GenericView({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="view-enter"><SectionHeader eyebrow="OPAKUS GROUP" title={title} subtitle={subtitle}/><div className="view-body"><AnalyticsStrip items={[{label:'Itens monitorizados',value:'162',delta:'+8 este mês',tone:'blue'},{label:'Conformes',value:'87,4%',delta:'+4,2% vs. anterior',tone:'green'},{label:'Em atenção',value:'23',delta:'5 requerem ação',tone:'amber'},{label:'Críticos',value:'03',delta:'−2 esta semana',tone:'red'}]}/><div className="dashboard-grid grid-2col"><DetailChart title={`Evolução de ${title.toLowerCase()}`} subtitle="Indicadores dos últimos 12 meses"/><div className="card"><div className="card-header"><div><h3 className="card-title">Sinais de atenção</h3><p className="card-subtitle">Itens que precisam de acompanhamento</p></div></div><div className="card-content"><InsightRow label="Controlos em revisão" value="18" detail="Atualizados hoje" tone="amber"/><InsightRow label="Processos completos" value="87%" detail="Dentro do SLA" tone="green"/><InsightRow label="Exceções abertas" value="06" detail="3 de alta prioridade" tone="red"/><InsightRow label="Última sincronização" value="2m" detail="Todos os dados atualizados" tone="blue"/></div></div></div><div className="card detail-table"><div className="card-header"><div><h3 className="card-title">Atividade recente</h3><p className="card-subtitle">Linha de auditoria e alterações</p></div><button className="btn btn-secondary">Ver histórico</button></div><div className="timeline-list">{['Nova evidência anexada ao controlo AML-042','Regra de risco atualizada pelo administrador','Relatório mensal disponibilizado ao board','Sincronização com fonte regulatória concluída'].map((item,i)=><div className="timeline-item" key={item}><span className={`timeline-icon t${i}`}><Activity size={13}/></span><div><strong>{item}</strong><small>{i+1} hora{i?'s':''} atrás · Opakus Group</small></div><ChevronRight size={15}/></div>)}</div></div></div></div>
}

export default function OpakusWorkspace() {
  const [active, setActive] = useState<ViewId>('overview')
  const [formAction, setFormAction] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (message: string) => { setToast(message); window.setTimeout(() => setToast(null), 2800) }
  const [crudContext, setCrudContext] = useState<{ title: string; eyebrow: string } | null>(null)
  const [topModal, setTopModal] = useState<'auth' | 'settings' | 'notifications' | null>(null)
  const [language, setLanguage] = useState('pt')
  const [profileName, setProfileName] = useState('Marta Domingos')

  useEffect(() => {
    const locale = language === 'zh' ? 'zh-CN' : language === 'en' ? 'en' : 'pt-PT'
    document.documentElement.lang = locale
    applyLanguage(language)
    const observer = new MutationObserver(() => { observer.disconnect(); window.requestAnimationFrame(() => { applyLanguage(language); observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title', 'alt', 'value', 'data-tooltip', 'data-label', 'data-description'] }) }) })
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title', 'alt', 'value', 'data-tooltip', 'data-label', 'data-description'] })
    const translationFrame = window.requestAnimationFrame(() => applyLanguage(language))
    return () => { observer.disconnect(); window.cancelAnimationFrame(translationFrame) }
  }, [language, active, formAction, crudContext, topModal])

  useEffect(() => {
    const handleOpenForm = (event: Event) => setFormAction((event as CustomEvent<{ action: string }>).detail.action)
    const handleLanguage = (event: Event) => setLanguage((event as CustomEvent<string>).detail)
    window.addEventListener('opakus:language', handleLanguage)
    const handleOpenCrud = (event: Event) => setCrudContext((event as CustomEvent<{ title: string; eyebrow: string }>).detail)
    const handleNavigate = (event: Event) => { const detail = (event as CustomEvent<{ view: ViewId; name?: string }>).detail; setProfileName(detail.name || 'Marta Domingos'); if (detail.view === 'auth' || detail.view === 'settings' || detail.view === 'notifications') setTopModal(detail.view); else setActive(detail.view) }
    window.addEventListener('opakus:open-form', handleOpenForm)
    window.addEventListener('opakus:open-crud', handleOpenCrud)
    window.addEventListener('opakus:navigate', handleNavigate)
    return () => { window.removeEventListener('opakus:open-form', handleOpenForm); window.removeEventListener('opakus:open-crud', handleOpenCrud); window.removeEventListener('opakus:navigate', handleNavigate); window.removeEventListener('opakus:language', handleLanguage) }
  }, [])

  let content: ReactNode = <GenericView title="Visão executiva" subtitle="Estado consolidado" />

  if (active === 'overview') content = <OverviewView />
  if (active === 'bna') content = <BnaView />
  if (active === 'regulatory-search') content = <RegulatorySearchView />
  if (active === 'kyc') content = <KycDetailView />
  if (active === 'kyc-cases') content = <AllKycCasesView />
  if (active === 'due-diligence') content = <DueDiligenceView />
  if (active === 'obligations') content = <ObligationsDetailView />
  if (active === 'matrix') content = <MatrixView />
  if (active === 'controls') content = <ControlsView />
  if (active === 'risk') content = <RiskView />
  if (active === 'compliance') content = <ComplianceView />
  if (active === 'visibility') content = <GenericView title="Camada de visibilidade" subtitle="Acesso centralizado a dados operacionais e de conformidade" />
  if (active === 'audit') content = <GenericView title="Auditoria" subtitle="Rastro de ações, mudanças e aprovações" />
  if (active === 'reports') content = <ReportsDetailView />
  if (active === 'alerts') content = <AlertsView />
  if (active === 'users') content = <UsersView />
  if (active === 'user-profile') content = <UserProfileView name={profileName} />
  if (active === 'auth') content = <AuthHub />
  if (active === 'settings') content = <SettingsView />
  if (active === 'notifications') content = <NotificationsView />
  if (active === 'crud') content = <CrudCenterView />

  const handleWorkspaceClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const button = (event.target as HTMLElement).closest('button')
    if (!button || button.dataset.handled === 'true') return
    const label = button.textContent?.replace(/\s+/g, ' ').trim() || button.getAttribute('aria-label') || ''
    if (/Exportar|relatório|Pesquisar|Filtros|Limpar filtros|Ver detalhes|Ver todos|Abrir matriz|Ver requisitos/.test(label)) showToast(`${label.replace(/[<>]/g, '')} executado com sucesso.`)
    else if (/Notificações/.test(label)) showToast('Centro de notificações aberto.')
    else if (/Ajuda/.test(label)) showToast('Ajuda e documentação disponíveis.')
    else if (/Definições/.test(label)) showToast('Definições da workspace abertas.')
    else if (/Rever acessos|Suspender acesso|Editar perfil|Editar permissões|Atribuir nova role/.test(label)) showToast(`${label} iniciado.`)
  }

  return (
    <div className="opakus-shell" onClick={handleWorkspaceClick}>
      <Header />
      <div className="workspace-layout">
        <Sidebar active={active} setActive={setActive} />
        <div className="main-content">{content}</div>
      </div>
      {crudContext && <CrudModal title={crudContext.title} eyebrow={crudContext.eyebrow} onClose={() => setCrudContext(null)} />}
      {formAction && <FormModal action={formAction} onClose={() => setFormAction(null)} />}
      {topModal && <div className="top-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setTopModal(null) }}><div className={`top-modal-shell ${topModal === 'auth' ? 'top-modal-auth' : ''}`} role="dialog" aria-modal="true" aria-label={topModal === 'auth' ? 'Autenticação' : topModal === 'settings' ? 'Definições' : 'Notificações'}><button className="top-modal-close" onClick={() => setTopModal(null)} aria-label="Fechar modal"><X size={18}/></button>{topModal === 'auth' ? <AuthHub /> : topModal === 'settings' ? <SettingsView /> : <NotificationsView />}</div></div>}
      {toast && <div className="action-toast" role="status"><CheckCircle2 size={16}/>{toast}</div>}
    </div>
  )
}
