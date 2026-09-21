'use client'

export default function BnaView() {
  const normativos = [
    { code: 'Aviso 02/2026', title: 'Governação corporativa', date: '15 Jun 2026', status: 'Em vigor' },
    { code: 'Instrutivo 04/2026', title: 'Reporte prudencial', date: '10 Jun 2026', status: 'Em vigor' },
    { code: 'Aviso 01/2026', title: 'Prevenção de branqueamento', date: '01 Jun 2026', status: 'Em vigor' },
    { code: 'Instrutivo 02/2026', title: 'Operações cambiais', date: '28 Mai 2026', status: 'Em vigor' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">NORMATIVO</div>
          <h1 className="section-title">Biblioteca regulatória</h1>
        </div>
        <button className="btn btn-primary">Adicionar normativo</button>
      </div>

      <div className="view-body">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Título</th>
                <th>Data</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {normativos.map((item) => (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td><span className="status-pill success">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
