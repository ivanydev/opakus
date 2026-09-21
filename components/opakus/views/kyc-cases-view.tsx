'use client'

export default function KycCasesView() {
  const cases = [
    { name: 'Empresa ABC Lda.', type: 'KYC · Cliente', risk: 'Baixo', status: 'Completo' },
    { name: 'Marta Domingos', type: 'KYE · Colaborador', risk: 'Médio', status: 'Em revisão' },
    { name: 'Fornecedor XYZ SA', type: 'KYP · Parceiro', risk: 'Alto', status: 'Documentação pendente' },
    { name: 'Grupo DEF SA', type: 'KYC · Cliente', risk: 'Baixo', status: 'Completo' },
    { name: 'Ana Costa', type: 'KYE · Colaborador', risk: 'Baixo', status: 'Completo' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">CLIENTE & KYC · KYE · KYP</div>
          <h1 className="section-title">Todos os casos de diligência</h1>
        </div>
        <button className="btn btn-primary">Novo caso</button>
      </div>

      <div className="view-body">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Risco</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((item) => (
                <tr key={`${item.name}-${item.type}`}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.risk}</td>
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
