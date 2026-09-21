import Donut from '@/components/primitives/Donut'
import InsightRow from '@/components/primitives/InsightRow'

export default function ComplianceView() {
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
          <div><h1 className="view-title">Status de conformidade</h1><p className="view-subtitle">Uma leitura operacional, auditável e em tempo real da exposição regulatória.</p></div>
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