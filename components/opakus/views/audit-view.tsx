'use client'

export default function AuditView() {
  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">AUDITORIA</div>
          <h1 className="section-title">Auditoria</h1>
          <p className="section-subtitle">Rastro de ações, mudanças e aprovações.</p>
        </div>
      </div>

      <div className="view-body">
        <div className="card">
          <h3>Atividade recente</h3>
          <ul className="simple-list">
            <li>Alta evidência validada às 09:15</li>
            <li>Acesso revisto às 08:40</li>
            <li>Plano de ação aprovado às 07:30</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
