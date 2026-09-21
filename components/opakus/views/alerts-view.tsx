'use client'

import { useState } from 'react';

export default function AlertsView() {
  const [filter, setFilter] = useState('Todos')

  const alerts = [
    { title: 'Reporte prudencial vence em 5 dias', source: 'Obrigações · BNA', time: 'Há 12 min', tone: 'critical', status: 'Não lido' },
    { title: 'Novo normativo UIF requer avaliação', source: 'Monitor regulatório · UIF', time: 'Há 46 min', tone: 'warning', status: 'Não lido' },
    { title: 'Controlo AML-042 com eficácia abaixo do limite', source: 'Controlos · AML / CFT', time: 'Há 2 h', tone: 'info', status: 'Em acompanhamento' },
    { title: 'Novo acesso atribuído a João Manuel', source: 'Segurança · Utilizadores', time: 'Há 4 h', tone: 'success', status: 'Resolvido' },
  ]

  const visible = filter === 'Todos' ? alerts : alerts.filter((alert) => alert.status === filter)

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">GESTÃO DA PLATAFORMA</div>
          <h1 className="section-title">Alertas e notificações</h1>
          <p className="section-subtitle">Centralize alertas operacionais, regulatórios e de segurança num único centro.</p>
        </div>
        <button className="btn btn-primary">Criar regra de alerta</button>
      </div>

      <div className="view-body">
        <div className="filters-row">
          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="select">
            <option>Todos</option>
            <option>Não lido</option>
            <option>Em acompanhamento</option>
            <option>Resolvido</option>
          </select>
        </div>

        <div className="stack">
          {visible.map((item) => (
            <div key={item.title} className="alert-item">
              <div className={`dot ${item.tone}`} />
              <div>
                <strong>{item.title}</strong>
                <small>{item.source}</small>
              </div>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
