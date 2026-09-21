'use client'

export default function NotificationsView() {
  const notifications = [
    { title: 'Reporte prudencial vence em 5 dias', meta: 'Obrigação · BNA · há 12 min', tone: 'critical' },
    { title: 'Novo normativo UIF requer avaliação', meta: 'Monitor regulatório · há 46 min', tone: 'warning' },
    { title: 'Controlo AML-042 abaixo do limite', meta: 'Controlos · há 2 h', tone: 'info' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">CENTRO DE NOTIFICAÇÕES</div>
          <h1 className="section-title">Notificações</h1>
          <p className="section-subtitle">Reveja ocorrências, atribua responsáveis e marque alertas como tratados.</p>
        </div>
        <button className="btn btn-primary">Marcar todas como lidas</button>
      </div>

      <div className="view-body">
        <div className="stack">
          {notifications.map((item) => (
            <div key={item.title} className="alert-item">
              <div className={`dot ${item.tone}`} />
              <div>
                <strong>{item.title}</strong>
                <small>{item.meta}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
