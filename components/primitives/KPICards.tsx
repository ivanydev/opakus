import { TrendingUp } from 'lucide-react'

export default function KPICards() {
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
          <div className="kpi-detail"><TrendingUp size={14} /><span>{kpi.trend} vs. mês anterior</span></div>
        </div>
      ))}
    </div>
  )
}