'use client'

export default function SectionHeader({ eyebrow, title, subtitle, action = 'Exportar' }: { eyebrow: string; title: string; subtitle: string; action?: string }) {
  const openForm = () => action !== 'Exportar' && window.dispatchEvent(new CustomEvent('opakus:open-form', { detail: { action } }))
  const openCrud = () => window.dispatchEvent(new CustomEvent('opakus:open-crud', { detail: { title, eyebrow } }))
  return <div className="view-header"><div className="section-eyebrow">{eyebrow}</div><div className="section-heading-row"><div><h1 className="view-title">{title}</h1><p className="view-subtitle">{subtitle}</p></div><div className="header-actions">{action !== 'Exportar' && <button className="btn btn-secondary" onClick={openCrud}>Gerir registos</button>}<button className="btn btn-primary" onClick={openForm}>{action}</button></div></div></div>
}