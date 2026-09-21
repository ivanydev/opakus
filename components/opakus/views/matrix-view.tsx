'use client'

import { useState } from 'react';

export default function MatrixView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { name: 'Governação', requisitos: 12, conformidade: '92%', status: 'success' },
    { name: 'AML / CFT', requisitos: 28, conformidade: '84%', status: 'warning' },
    { name: 'Risco de crédito', requisitos: 34, conformidade: '96%', status: 'success' },
    { name: 'Reporte prudencial', requisitos: 19, conformidade: '71%', status: 'error' },
    { name: 'Operações cambiais', requisitos: 22, conformidade: '89%', status: 'success' },
    { name: 'Proteção do consumidor', requisitos: 16, conformidade: '94%', status: 'success' },
  ]

  return (
    <div className="view-enter">
      <div className="view-header">
        <div>
          <div className="section-eyebrow">RISCO · REQUISITOS</div>
          <h1 className="section-title">Matriz de requisitos</h1>
        </div>
        <button className="btn btn-primary">Criar matriz</button>
      </div>

      <div className="view-body">
        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`category-card ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <span>{category.name}</span>
              <strong>{category.requisitos} requisitos</strong>
              <small>{category.conformidade}</small>
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="card">
            <h3>{selectedCategory}</h3>
            <p>Categoria selecionada com foco em controlo e avaliação contínua.</p>
          </div>
        )}
      </div>
    </div>
  )
}
