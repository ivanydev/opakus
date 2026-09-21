'use client'

import { Search, Bell, HelpCircle, Settings } from 'lucide-react'

export default function Header() {
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
        <button className="icon-btn" aria-label="Ajuda"><HelpCircle size={18} /></button>
        <button className="icon-btn" aria-label="Definições" onClick={() => window.dispatchEvent(new CustomEvent('opakus:navigate', { detail: { view: 'settings' } }))}>
          <Settings size={18} />
        </button>
        <button className="user-avatar user-avatar-button" aria-label="Autenticação e perfil" onClick={() => window.dispatchEvent(new CustomEvent('opakus:navigate', { detail: { view: 'auth' } }))}>MD</button>
      </div>
    </header>
  )
}