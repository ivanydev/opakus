'use client'

import {
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export default function OverviewView() {
  const kpis = [
    { label: 'Score de conformidade', value: '87.4%', delta: '+4.2%', tone: 'positive' },
    { label: 'Obrigações em dia', value: '96.2%', delta: '+1.8%', tone: 'positive' },
    { label: 'Risco residual', value: '8.7%', delta: '−12%', tone: 'positive' },
    { label: 'Alertas críticos', value: '3', delta: '2 atenção', tone: 'warning' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header executive-header">
        <div>
          <div className="section-eyebrow">VISÃO GERAL</div>
          <h1 className="section-title">Visão executiva</h1>
        </div>
        <button className="btn btn-primary">Exportar relatório</button>
      </div>

      <div className="view-body executive-body">
        <div className="kpi-grid">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="kpi-card">
              <div className="kpi-label">{kpi.label}</div>
              <div className={`kpi-value ${kpi.tone}`}>{kpi.value}</div>
              <div className="kpi-detail">
                <TrendingUp size={14} />
                <span>{kpi.delta} vs. mês anterior</span>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-grid">
          <div className="card">
            <div className="card-header">
              <div>
                <div className="section-eyebrow">PERÍODO DE ANÁLISE</div>
                <h3 className="card-title">Evolução do índice</h3>
              </div>
              <ArrowUpRight size={18} />
            </div>
            <div className="card-content">
              <div className="headline">94%</div>
              <p>Índice global de conformidade em evolução positiva.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <div className="section-eyebrow">ÍNDICE GLOBAL</div>
                <h3 className="card-title">Controlo de riscos</h3>
              </div>
              <ShieldCheck size={18} />
            </div>
            <div className="card-content">
              <div className="headline">84/100</div>
              <p>74% dos requisitos estão dentro do apetite de risco.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
