'use client'

export default function DueDiligenceView() {
  const columns = [
    { key: 'SDD', label: 'SDD · Simplificada', risk: 'Baixo risco', tone: 'green' },
    { key: 'CDD', label: 'CDD · Padrão', risk: 'Médio risco', tone: 'blue' },
    { key: 'EDD', label: 'EDD · Aprofundada', risk: 'Alto risco / alertas', tone: 'red' },
  ]

  const rows = [
    {
      title: 'KYC · Clientes',
      subtitle: 'Identificação e monitorização do cliente',
      values: [
        'Nome, email e NIF/CPF; limites diários baixos.',
        'Documento + selfie/liveness + morada; listas de sanções.',
        'Comprovativo de fundos; análise manual e monitorização contínua.',
      ],
    },
    {
      title: 'KYE · Colaboradores',
      subtitle: 'Pessoas, integridade e acesso interno',
      values: [
        'Identidade básica, histórico académico e referências.',
        'Antecedentes criminais onde permitido + testes técnicos.',
        'Auditoria patrimonial, NDA reforçado e Zero Trust.',
      ],
    },
    {
      title: 'KYP · Parceiros',
      subtitle: 'Fornecedores e terceiros críticos',
      values: [
        'NIPC/CNPJ activo e certidão fiscal regularizada.',
        'Estatutos, sócios maioritários e saúde financeira básica.',
        'Auditoria de cibersegurança, UBOs e balanços auditados.',
      ],
    },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">CLIENTE & KYC · RISK-BASED DUE DILIGENCE</div>
          <h1 className="section-title">Due diligence</h1>
          <p className="section-subtitle">Aplique o nível certo de rigor a clientes, colaboradores e parceiros com base no risco.</p>
        </div>
        <button className="btn btn-primary">Iniciar avaliação</button>
      </div>

      <div className="view-body">
        <div className="matrix-table">
          <div className="matrix-head">
            {columns.map((column) => (
              <div key={column.key} className={`matrix-col ${column.tone}`}>
                <strong>{column.label}</strong>
                <span>{column.risk}</span>
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div key={row.title} className="matrix-row">
              <div className="matrix-row-title">
                <strong>{row.title}</strong>
                <small>{row.subtitle}</small>
              </div>
                {row.values.map((value, index) => (
                  <div key={`${row.title}-${index}`} className="matrix-cell">
                    {value}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
