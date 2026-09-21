'use client'

import { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'

export default function CrudModal({ title, eyebrow, onClose }: { title: string; eyebrow: string; onClose: () => void }) {
  const [saved, setSaved] = useState(false)
  const [records, setRecords] = useState(['Registo principal', 'Registo em revisão', 'Registo arquivado'])
  const createRecord = () => setRecords((current) => [...current, `Novo registo ${current.length + 1}`])
  const archiveRecord = (record: string) => setRecords((current) => current.filter((item) => item !== record))
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="form-modal crud-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={18}/></button><span className="section-kicker">{eyebrow}</span><h2>Gerir registos · {title}</h2><p className="form-description">Crie, edite, consulte ou arquive os registos desta área.</p>{saved ? <div className="form-success"><CheckCircle2 size={34}/><p>Alteração guardada com sucesso.</p><button className="btn btn-primary" onClick={onClose}>Concluir</button></div> : <><div className="crud-list">{records.map((record, index) => <div className="crud-record" key={record}><div><strong>{record}</strong><small>{index === 0 ? 'Activo · actualizado hoje' : index === 1 ? 'Em revisão · requer atenção' : 'Arquivado · histórico'}</small></div><div className="crud-record-actions"><button className="btn btn-ghost" onClick={() => setSaved(true)}>Editar</button><button className="btn btn-ghost danger-action" onClick={() => archiveRecord(record)}>Arquivar</button></div></div>)}</div><div className="form-actions"><button className="btn btn-secondary" onClick={onClose}>Fechar</button><button className="btn btn-primary" onClick={createRecord}>+ Criar registo</button></div></>}</section></div>
}