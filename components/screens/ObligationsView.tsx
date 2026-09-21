export default function ObligationsView() {
  const obligations = [
    { name: 'Reporte prudencial Q3', dueDate: '30 Set 2026', status: 'Em progresso', priority: 'Crítico' },
    { name: 'Revisão de políticas AML', dueDate: '15 Out 2026', status: 'Agendado', priority: 'Alta' },
    { name: 'Auditoria interna anual', dueDate: '30 Nov 2026', status: 'Planejado', priority: 'Alta' },
    { name: 'Validação de controlos', dueDate: '20 Set 2026', status: 'Em atraso', priority: 'Crítico' },
  ]
  return (
    <div className="view-enter">
      <div className="view-header"><h1 className="view-title">Obrigações e prazos</h1><p className="view-subtitle">Calendário centralizado de obrigações regulatórias e prazos críticos.</p></div>
      <div className="view-body">
        <div className="kpi-grid">
          <div className="kpi-card"><div className="kpi-label">Total de obrigações</div><div className="kpi-value">243</div></div>
          <div className="kpi-card"><div className="kpi-label">Vencimento próximo (7 dias)</div><div className="kpi-value">12</div><div className="kpi-badge red">Atenção</div></div>
          <div className="kpi-card"><div className="kpi-label">Em atraso</div><div className="kpi-value">3</div><div className="kpi-badge red">Crítico</div></div>
          <div className="kpi-card"><div className="kpi-label">Taxa de cumprimento</div><div className="kpi-value">96.8%</div><div className="kpi-badge green">Excelente</div></div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Obrigações regulatórias</h3><p className="card-subtitle">Estado de todas as obrigações mapeadas</p></div></div>
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Nome da obrigação</th><th>Data de vencimento</th><th>Estado</th><th>Prioridade</th></tr></thead>
              <tbody>
                {obligations.map(item => (
                  <tr key={item.name}>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td>{item.dueDate}</td>
                    <td><span className={`status ${item.status === 'Em progresso' ? 'info' : item.status === 'Agendado' ? 'success' : 'error'}`}>{item.status}</span></td>
                    <td><span className={`badge ${item.priority === 'Crítico' ? 'red' : ''}`}>{item.priority}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}