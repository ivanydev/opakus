'use client'

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
        <div>
          <div className="section-eyebrow">COMPLIANCE</div>
          <h1 className="section-title">Status de conformidade</h1>
        </div>
        <button className="btn btn-primary">Adicionar obrigação</button>
      </div>

      <div className="view-body">
        <div className="stack">
          {areas.map((area) => (
            <div key={area.label} className="progress-group">
              <div className="progress-head">
                <span>{area.label}</span>
                <strong>{area.value}</strong>
              </div>
              <div className="progress-track">
                <span className="progress-bar" style={{ width: area.width, background: area.tone }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
