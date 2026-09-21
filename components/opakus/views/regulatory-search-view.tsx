'use client'

import { useState } from 'react';

export default function RegulatorySearchView() {
  const [query, setQuery] = useState('')
  const [regulator, setRegulator] = useState('Todos os reguladores')

  const results = [
    { code: 'Aviso 02/2026', title: 'Governação corporativa', regulator: 'BNA', date: '15 Jun 2026', impact: 'Alto' },
    { code: 'Instrutivo UIF 04/2026', title: 'Prevenção de branqueamento de capitais', regulator: 'UIF', date: '10 Jun 2026', impact: 'Crítico' },
    { code: 'Circular 01/2026', title: 'Reporte prudencial e liquidez', regulator: 'BNA', date: '02 Jun 2026', impact: 'Médio' },
  ]

  const filtered = results.filter((item) => {
    const matchesRegulator = regulator === 'Todos os reguladores' || item.regulator === regulator
    const matchesQuery = `${item.code} ${item.title}`.toLowerCase().includes(query.toLowerCase())
    return matchesRegulator && matchesQuery
  })

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">NORMATIVO · INTELLIGENCE SEARCH</div>
          <h1 className="section-title">Pesquisar normativos</h1>
          <p className="section-subtitle">Encontre requisitos por regulador, tema, impacto e estado de vigência.</p>
        </div>
        <button className="btn btn-primary">Guardar pesquisa</button>
      </div>

      <div className="view-body">
        <div className="filters-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar requisitos ou código"
            className="input"
          />
          <select value={regulator} onChange={(event) => setRegulator(event.target.value)} className="select">
            <option>Todos os reguladores</option>
            <option>BNA</option>
            <option>UIF</option>
          </select>
        </div>

        <div className="list-grid compact">
          {filtered.map((item) => (
            <div key={`${item.code}-${item.title}`} className="list-card">
              <div className="list-head">
                <span className="tag">{item.regulator}</span>
                <span className="tag tag-warning">{item.impact}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.code}</p>
              <div className="meta-row">
                <span>{item.date}</span>
                <button className="text-btn">Ver detalhes</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
