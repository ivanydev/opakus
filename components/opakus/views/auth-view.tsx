'use client'

export default function AuthView() {
  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">IDENTITY & ACCESS</div>
          <h1 className="section-title">Autenticação e segurança</h1>
          <p className="section-subtitle">Configure sessão, MFA, políticas de palavra-passe e dispositivos autorizados.</p>
        </div>
        <button className="btn btn-primary">Guardar política</button>
      </div>

      <div className="view-body">
        <div className="card">
          <h3>Segurança da conta</h3>
          <p>MFA obrigatório, sessão expira em 30 minutos e acesso condicional ativo.</p>
        </div>
      </div>
    </div>
  )
}
