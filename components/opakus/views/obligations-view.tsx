'use client'

export default function ObligationsView() {
  const obligations = [
    { name: 'Reporte prudencial Q3', dueDate: '30 Set 2026', status: 'Em progresso', priority: 'Crítico' },
    { name: 'Revisão de políticas AML', dueDate: '15 Out 2026', status: 'Agendado', priority: 'Alta' },
    { name: 'Auditoria interna anual', dueDate: '30 Nov 2026', status: 'Planeado', priority: 'Alta' },
    { name: 'Validação de controlos', dueDate: '20 Set 2026', status: 'Em atraso', priority: 'Crítico' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">NORMATIVO</div>
          <h1 className="section-title">Obrigações e prazos</h1>
        </div>
        <button className="btn btn-primary">Adicionar obrigação</button>
      </div>

      <div className="view-body">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Obrigação</th>
                <th>Prazo</th>
                <th>Status</th>
                <th>Prioridade</th>
              </tr>
            </thead>
            <tbody>
              {obligations.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.dueDate}</td>
                  <td><span className="status-pill">{item.status}</span></td>
                  <td><span className="tag tag-warning">{item.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
