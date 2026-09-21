export default function KycView() {
  const clients = [
    { name: 'Empresa ABC Lda.', status: 'Completo', score: '98%', lastUpdate: '2 days ago' },
    { name: 'Pessoa XYZ', status: 'Em revisão', score: '65%', lastUpdate: '5 days ago' },
    { name: 'Grupo DEF SA', status: 'Pendente', score: '32%', lastUpdate: '8 days ago' },
    { name: 'Holdings GHI Ltd', status: 'Completo', score: '96%', lastUpdate: '1 day ago' },
  ]
  return (
    <div className="view-enter">
      <div className="view-header"><h1 className="view-title">Gestão de KYC</h1><p className="view-subtitle">Monitorização e acompanhamento centralizado de conformidade Know Your Customer.</p></div>
      <div className="view-body">
        <div className="kpi-grid">
          <div className="kpi-card"><div className="kpi-label">KYC Completos</div><div className="kpi-value">847</div><div className="kpi-badge green">↑ 12 novos</div></div>
          <div className="kpi-card"><div className="kpi-label">Em revisão</div><div className="kpi-value">23</div><div className="kpi-badge">Aguardando</div></div>
          <div className="kpi-card"><div className="kpi-label">Vencimento próximo</div><div className="kpi-value">34</div><div className="kpi-badge red">Crítico</div></div>
          <div className="kpi-card"><div className="kpi-label">Taxa de conformidade</div><div className="kpi-value">94.2%</div><div className="kpi-badge green">↑ 2.1%</div></div>
        </div>
        <div className="dashboard-grid grid-2col">
          <div className="card"><div className="card-header"><div><h3 className="card-title">Distribuição por estado</h3><p className="card-subtitle">Total de registos KYC</p></div></div><div className="card-content" style={{ height: '200px', background: 'rgba(15, 108, 189, 0.05)' }}><div style={{ textAlign: 'center', paddingTop: '60px', color: '#666' }}>Gráfico de barras</div></div></div>
          <div className="card"><div className="card-header"><div><h3 className="card-title">Matriz de risco KYC</h3><p className="card-subtitle">Análise probabilidade × impacto</p></div></div><div className="card-content" style={{ height: '200px', background: 'rgba(15, 108, 189, 0.05)' }}><div style={{ textAlign: 'center', paddingTop: '60px', color: '#666' }}>Heatmap</div></div></div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Últimos registos KYC</h3><p className="card-subtitle">Clientes com atualizações recentes</p></div><button className="btn btn-secondary btn-sm">Exportar</button></div>
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Nome do cliente</th><th>Estado</th><th>Conformidade</th><th>Última atualização</th></tr></thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.name}>
                    <td style={{ fontWeight: 600 }}>{client.name}</td>
                    <td><span className={`status ${client.status === 'Completo' ? 'success' : client.status === 'Em revisão' ? 'warning' : 'info'}`}>{client.status}</span></td>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="progress-bar" style={{ flex: 1, width: '60px' }}><div className="progress-fill success" style={{ width: client.score }} /></div><span style={{ fontSize: '12px', fontWeight: 600 }}>{client.score}</span></div></td>
                    <td style={{ fontSize: '12px', color: '#666' }}>{client.lastUpdate}</td>
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