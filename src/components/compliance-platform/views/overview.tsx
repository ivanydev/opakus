'use client'
import { BarChart3, CheckCircle2, Clock, ShieldAlert, TrendingUp } from 'lucide-react'

export function OverviewView({ t }: { t: (text: string) => string }) {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('Visão executiva')}</h1>
          <p className="text-sm text-muted-foreground mt-1">Painel de decisão para compliance, risk e obrigações regulatórias.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 border rounded-2xl bg-card shadow-sm">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-muted-foreground">{t('ÍNDICE GLOBAL')}</span><TrendingUp className="h-4 w-4 text-primary" /></div>
          <div className="mt-4"><span className="text-3xl font-black">85.4%</span></div>
        </div>
        <div className="p-5 border rounded-2xl bg-card shadow-sm">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-muted-foreground">CONTROLOS EFECTIVOS</span><CheckCircle2 className="h-4 w-4 text-emerald-500" /></div>
          <div className="mt-4"><span className="text-3xl font-black">162 / 210</span></div>
        </div>
      </div>
    </div>
  )
}
