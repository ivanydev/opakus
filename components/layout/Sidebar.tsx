'use client'

import { useState } from 'react'
import { LayoutGrid, BookOpen, Users, ShieldAlert, BarChart3, Settings, ChevronDown } from 'lucide-react'
import { navGroups } from '@/components/shared'
import type { ViewId } from '@/components/types'

export default function Sidebar({ active, setActive }: { active: ViewId; setActive: (id: ViewId) => void }) {
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
            <item.icon size={18} /><span>{item.label}</span>
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
                <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)}>
                  <item.icon size={16} /><span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}