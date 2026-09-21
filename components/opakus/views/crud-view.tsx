'use client'

export default function CrudView() {
  const entities = [
    { label: 'Casos KYC / KYE / KYP', action: 'Novo caso', count: '1.284' },
    { label: 'Obrigações', action: 'Adicionar obrigação', count: '42' },
    { label: 'Requisitos', action: 'Adicionar requisito', count: '186' },
    { label: 'Controlos', action: 'Novo controlo', count: '96' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">GESTÃO DE REGISTOS · CRUD</div>
          <h1 className="section-title">Central de registos</h1>
        </div>
        <button className="btn btn-primary">Novo caso</button>
      </div>

      <div className="view-body">
        <div className="cards-4">
          {entities.map((entity) => (
            <div key={entity.label} className="card small-card">
              <strong>{entity.label}</strong>
              <span>{entity.count}</span>
              <button className="text-btn">{entity.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
