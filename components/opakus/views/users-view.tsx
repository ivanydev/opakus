'use client'

export default function UsersView() {
  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">GESTÃO DA PLATAFORMAIVANY · IAM</div>
          <h1 className="section-title">Utilizadores e roles</h1>
          <p className="section-subtitle">Administre acessos, funções e segregação de responsabilidades da plataforma.</p>
        </div>
        <button className="btn btn-primary">Convidar utilizador</button>
      </div>

      <div className="view-body">
        <div className="card">
          <h3>Lista de utilizadores</h3>
          <ul className="simple-list">
            <li>Marta Domingos · Compliance Officer</li>
            <li>João Manuel · Risk Manager</li>
            <li>Ana Costa · Auditor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
