'use client'

import { useState } from 'react'
import { MoreVertical, ChevronRight, X } from 'lucide-react'

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
      <div className="view-header"><h1 className="view-title">Matriz de requisitos</h1><p className="view-subtitle">Cruze normativos BNA, obrigações, controlos e evidências num único mapa.</p></div>
      <div className="view-body">
        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>162 requisitos mapeados</span>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('opakus:open-form', { detail: { action: 'Adicionar requisito' } }))}>+ Adicionar requisito</button>
        </div>
        <div className="matrix-grid">
          {categories.map(cat => (
            <div key={cat.name} className="matrix-item">
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div><h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600 }}>{cat.name}</h4><p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{cat.requisitos} requisitos · 4 normativos</p></div>
                <button className="icon-btn" style={{ color: '#666' }} onClick={() => setSelectedCategory(cat.name)} aria-label={`Abrir ${cat.name}`}><MoreVertical size={16} /></button>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ fontSize: '11px', fontWeight: 600 }}>Conformidade</span><strong style={{ fontSize: '12px' }}>{cat.conformidade}</strong></div>
                <div className="progress-bar"><div className={`progress-fill ${cat.status}`} style={{ width: cat.conformidade }} /></div>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', fontSize: '12px' }} onClick={() => setSelectedCategory(cat.name)}>Abrir matriz <ChevronRight size={14} /></button>
            </div>
          ))}
        </div>
      </div>
      {selectedCategory && <div className="matrix-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCategory(null) }}><aside className="matrix-drawer" role="dialog" aria-modal="true" aria-labelledby="matrix-drawer-title"><div className="drawer-header"><div><span className="card-eyebrow">REQUIREMENT MATRIX</span><h2 id="matrix-drawer-title">{selectedCategory}</h2><p>Mapa detalhado de requisitos e controlos associados.</p></div><button className="modal-close" onClick={() => setSelectedCategory(null)} aria-label="Fechar matriz"><X size={18}/></button></div><div className="drawer-score"><div><span>Conformidade</span><strong>{categories.find((category) => category.name === selectedCategory)?.conformidade}</strong></div><div className="drawer-progress"><i style={{ width: categories.find((category) => category.name === selectedCategory)?.conformidade }}/></div><small>Última atualização hoje · 4 normativos associados</small></div><div className="drawer-section"><div className="drawer-section-title"><strong>Requisitos associados</strong><span>12 itens</span></div>{['Política e procedimentos documentados','Evidência de execução do controlo','Revisão periódica pelo responsável','Reporte de exceções e planos de ação'].map((item, index) => <div className="drawer-requirement" key={item}><span className={`drawer-check ${index === 3 ? 'pending' : ''}`}>{index === 3 ? '!' : '✓'}</span><div><strong>{item}</strong><small>{index === 3 ? 'Evidência pendente · vence em 5 dias' : 'Validado · atualizado há 2 dias'}</small></div><ChevronRight size={14}/></div>)}</div><div className="drawer-section"><div className="drawer-section-title"><strong>Controlos relacionados</strong><button className="text-action">Ver todos</button></div><div className="drawer-control"><span className="control-code">AML-042</span><div><strong>Screening de sanções</strong><small>Eficácia 76% · Em validação</small></div><span className="risk-pill medium">Atenção</span></div><div className="drawer-control"><span className="control-code">REG-031</span><div><strong>Reporte prudencial</strong><small>Eficácia 91% · Operacional</small></div><span className="risk-pill low">Conforme</span></div></div><div className="drawer-actions"><button className="btn btn-secondary" onClick={() => setSelectedCategory(null)}>Fechar</button><button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('opakus:open-form', { detail: { action: 'Adicionar requisito' } }))}>Adicionar requisito</button></div></aside></div>}
    </div>
  )
}