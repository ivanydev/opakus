'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { CheckCircle2, X } from 'lucide-react'

import type { ViewId } from '@/components/types'
import { applyLanguage } from '@/components/shared'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

import OverviewView from '@/components/screens/OverviewView'
import BnaView from '@/components/screens/BnaView'
import RegulatorySearchView from '@/components/screens/RegulatorySearchView'
import KycView from '@/components/screens/KycView'
import KycDetailView from '@/components/screens/KycDetailView'
import AllKycCasesView from '@/components/screens/AllKycCasesView'
import DueDiligenceView from '@/components/screens/DueDiligenceView'
import ObligationsView from '@/components/screens/ObligationsView'
import ObligationsDetailView from '@/components/screens/ObligationsDetailView'
import MatrixView from '@/components/screens/MatrixView'
import ControlsView from '@/components/screens/ControlsView'
import RiskView from '@/components/screens/RiskView'
import ComplianceView from '@/components/screens/ComplianceView'
import ReportsDetailView from '@/components/screens/ReportsDetailView'
import AlertsView from '@/components/screens/AlertsView'
import UsersView from '@/components/screens/UsersView'
import UserProfileView from '@/components/screens/UserProfileView'
import CrudCenterView from '@/components/screens/CrudCenterView'
import CrudModal from '@/components/screens/CrudModal'
import FormModal from '@/components/screens/FormModal'
import AuthHub from '@/components/screens/AuthHub'
import SettingsView from '@/components/screens/SettingsView'
import NotificationsView from '@/components/screens/NotificationsView'
import GenericView from '@/components/screens/GenericView'

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