'use client'

export default function SettingsView() {
  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">WORKSPACE SETTINGS</div>
          <h1 className="section-title">Definições</h1>
          <p className="section-subtitle">Personalize a workspace, notificações e preferências operacionais.</p>
        </div>
        <button className="btn btn-primary">Guardar definições</button>
      </div>

      <div className="view-body">
        <div className="card">
          <h3>Preferências</h3>
          <p>Idioma, notificações por email e dashboards favoritos configurados.</p>
        </div>
      </div>
    </div>
  )
}
