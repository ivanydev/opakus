'use client'

export default function ControlsView() {
  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">CONTROLO · CONTROL LIBRARY</div>
          <h1 className="section-title">Controlos</h1>
          <p className="section-subtitle">Biblioteca operacional de controlos, testes, evidências e eficácia por domínio.</p>
        </div>
        <button className="btn btn-primary">Novo controlo</button>
      </div>

      <div className="view-body">
        <div className="card">
          <h3>Screening de sanções</h3>
          <p>Controle preventivo com revisão periódica e evidência de execução.</p>
        </div>
      </div>
    </div>
  )
}
