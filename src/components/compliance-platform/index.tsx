'use client'
import { useState } from 'react'
import * as LucideIcons from 'lucide-react'
import { navGroups, ViewId } from './constants/navigation'
import { translate } from './constants/translations'
import { OverviewView } from './views/overview'

export default function CompliancePlatform() {
  const [currentView, setCurrentView] = useState<ViewId>('overview')
  const [language, setLanguage] = useState<string>('pt')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const t = (text: string) => translate(text, language)

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <aside className={`bg-card border-r flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'} transition-all`}>
        <div className="h-16 border-b flex items-center justify-between px-4">
          {sidebarOpen && <span className="font-extrabold text-primary">Compliance OS</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-accent rounded-xl"><LucideIcons.Menu className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label}>
              {sidebarOpen && <p className="text-[10px] font-black text-muted-foreground/70 px-2 uppercase">{t(group.label)}</p>}
              {group.items.map((item) => {
                // @ts-ignore
                const IconComponent = LucideIcons[item.iconName] || LucideIcons.HelpCircle
                return (
                  <button key={item.id} onClick={() => setCurrentView(item.id)} className={`w-full flex items-center px-3 py-2 rounded-xl text-sm ${currentView === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                    <IconComponent className="h-4 w-4 mr-3" />{sidebarOpen && <span>{t(item.label)}</span>}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground">OPAKUS GROUP</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded-xl px-2 py-1 bg-background text-xs font-bold">
            <option value="pt">PT</option><option value="en">EN</option>
          </select>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/30">
          {currentView === 'overview' ? <OverviewView t={t} /> : <div className="p-6">Módulo {currentView} desacoplado.</div>}
        </main>
      </div>
    </div>
  )
}
