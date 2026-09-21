'use client'

export default function ReportsView() {
  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">CONTROLO</div>
          <h1 className="section-title">Reports & inteligência</h1>
          <p className="section-subtitle">Relatórios executivos, indicadores e exportações para decisão.</p>
        </div>
        <button className="btn btn-primary">Criar report</button>
      </div>

      <div className="view-body">
        <div className="card">
          <h3>Board Pack · Setembro</h3>
          <p>Resumo de risco, status de conformidade e obrigações críticas.</p>
        </div>
      </div>
    </div>
  )
}
