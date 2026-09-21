'use client'

export default function UserProfileView({ name = 'Marta Domingos' }: { name?: string }) {
  const permissions = [
    { name: 'Visão executiva', group: 'Workspace', level: 'Visualizar', tone: 'blue' },
    { name: 'Status de conformidade', group: 'Compliance', level: 'Editar', tone: 'green' },
    { name: 'Biblioteca de controlos', group: 'Compliance', level: 'Editar', tone: 'green' },
    { name: 'Risco & anomalias', group: 'Risco', level: 'Visualizar', tone: 'blue' },
    { name: 'Auditoria', group: 'Auditoria', level: 'Sem acesso', tone: 'red' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">PERFIL</div>
          <h1 className="section-title">{name}</h1>
        </div>
      </div>

      <div className="view-body">
        <div className="card">
          <h3>Permissões</h3>
          <ul className="simple-list">
            {permissions.map((permission) => (
              <li key={permission.name}>
                <span>{permission.name}</span>
                <span>{permission.group}</span>
                <span>{permission.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
