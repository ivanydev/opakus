'use client'

export default function RiskView() {
  const anomalies = [
    { id: 'R-2841', desc: 'Concentração de operações fora do perfil', domain: 'Transações · AML', date: 'Hoje, 09:14', priority: 'Crítico', status: 'Em análise' },
    { id: 'R-2838', desc: 'Atraso no reporte prudencial', domain: 'Reporte · BNA', date: 'Ontem, 16:42', priority: 'Crítico', status: 'Escalado' },
    { id: 'R-2829', desc: 'Evidência expirada em controlo AML', domain: 'Controlos · Compliance', date: '12 Jun, 11:08', priority: 'Alta', status: 'Em análise' },
    { id: 'R-2821', desc: 'Variação atípica no perfil de cliente', domain: 'KYC · Retalho', date: '10 Jun, 14:30', priority: 'Média', status: 'Monitorizado' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">RISCO</div>
          <h1 className="section-title">Risco & anomalias</h1>
        </div>
        <button className="btn btn-primary">Registar anomalia</button>
      </div>

      <div className="view-body">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Domínio</th>
                <th>Prioridade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.desc}</td>
                  <td>{item.domain}</td>
                  <td><span className="tag tag-warning">{item.priority}</span></td>
                  <td><span className="status-pill">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
