'use client'

export default function KycView() {
  const clients = [
    { name: 'Empresa ABC Lda.', status: 'Completo', score: '98%', lastUpdate: '2 days ago' },
    { name: 'Pessoa XYZ', status: 'Em revisão', score: '65%', lastUpdate: '5 days ago' },
    { name: 'Grupo DEF SA', status: 'Pendente', score: '32%', lastUpdate: '8 days ago' },
    { name: 'Holdings GHI Ltd', status: 'Completo', score: '96%', lastUpdate: '1 day ago' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">CLIENTE & KYC</div>
          <h1 className="section-title">Gestão de KYC, KYE e KYP</h1>
        </div>
        <button className="btn btn-primary">Novo caso</button>
      </div>

      <div className="view-body">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Status</th>
                <th>Score</th>
                <th>Última atualização</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.name}>
                  <td>{client.name}</td>
                  <td><span className="status-pill">{client.status}</span></td>
                  <td>{client.score}</td>
                  <td>{client.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
