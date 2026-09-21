import { BookOpen, CheckCircle2, Clock, AlertCircle, Search, ChevronRight, X } from 'lucide-react'
import MiniBars from '@/components/primitives/MiniBars'
import InsightRow from '@/components/primitives/InsightRow'

export default function BnaView() {
  const normativos = [
    { code: 'Aviso 02/2026', title: 'Governação corporativa', date: '15 Jun 2026', status: 'Em vigor' },
    { code: 'Instrutivo 04/2026', title: 'Reporte prudencial', date: '10 Jun 2026', status: 'Em vigor' },
    { code: 'Aviso 01/2026', title: 'Prevenção de branqueamento', date: '01 Jun 2026', status: 'Em vigor' },
    { code: 'Instrutivo 02/2026', title: 'Operações cambiais', date: '28 Mai 2026', status: 'Em vigor' },
  ]
  return (
    <div className="view-enter">
      <div className="view-header">
        <div className="section-kicker">NORMATIVOS · PESQUISA MULTI-REGULADOR</div><h1 className="view-title">Pesquisa regulatória</h1>
        <p className="view-subtitle">Pesquise avisos, instrutivos e obrigações em tempo real por regulador, tema, estado ou impacto.</p>
      </div>
      <div className="view-body">
        <div className="regulatory-tree-card card"><div className="card-header"><div><span className="card-eyebrow">TAXONOMIA REGULATÓRIA</span><h3 className="card-title">Angola · Instituições Financeiras</h3><p className="card-subtitle">Estrutura de normas e reguladores aplicável ao sector</p></div><span className="live-tag"><i/> Estrutura activa</span></div><div className="regulatory-tree"><div className="tree-root">Angola · Instituições Financeiras</div><div className="tree-columns"><div><b>1. Leis do sector e afectas</b><span>Leis do sector</span><span>Leis do sistema de pagamentos</span><span>Leis afectas / transversais</span></div><div><b>2. Reguladores</b><span className="tree-highlight">Banco Nacional de Angola (BNA)</span><span>UAF · Unidade de Informação Financeira</span><span>APD · Proteção de Dados</span></div><div><b>3. Normativos do BNA</b><span>Avisos</span><span>Instrutivos</span><span>Directivas</span></div><div><b>4–5. Actos e decisões</b><span>Licenciamentos e autorizações</span><span>Medidas correctivas</span><span>Processos sancionatórios</span></div></div><div className="tree-subsectors"><span><strong>Subsector bancário</strong> Bancos comerciais · Bancos de desenvolvimento</span><span><strong>Subsector não bancário</strong> Fintechs · Pagamentos · Microfinanças · Câmbio</span></div></div></div>
        <div className="bna-metrics">
          <div className="metric-card"><span className="metric-icon blue"><BookOpen /></span><div><small>Total indexado</small><strong>162</strong><em>+8 este mês</em></div></div>
          <div className="metric-card"><span className="metric-icon green"><CheckCircle2 /></span><div><small>Em vigor</small><strong>148</strong><em>91.4% do acervo</em></div></div>
          <div className="metric-card"><span className="metric-icon amber"><Clock /></span><div><small>Requer análise</small><strong>09</strong><em>3 alta prioridade</em></div></div>
          <div className="metric-card"><span className="metric-icon red"><AlertCircle /></span><div><small>Impacto pendente</small><strong>05</strong><em>Atualizar controlos</em></div></div>
        </div>
        <div className="bna-insight-grid">
          <div className="card compact-chart"><div className="card-header"><div><h3 className="card-title">Publicações BNA</h3><p className="card-subtitle">Volume por mês · últimos 6 meses</p></div><span className="live-tag"><i /> sincronizado</span></div><div className="card-content"><MiniBars /><div className="chart-axis"><span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span></div></div></div>
          <div className="card"><div className="card-header"><div><h3 className="card-title">Cobertura temática</h3><p className="card-subtitle">Normativos por domínio</p></div></div><div className="card-content"><InsightRow label="AML / CFT" value="38" detail="23.5%" tone="purple" /><InsightRow label="Governação" value="31" detail="19.1%" tone="blue" /><InsightRow label="Reporte prudencial" value="27" detail="16.7%" tone="amber" /><InsightRow label="Operações cambiais" value="22" detail="13.6%" tone="green" /></div></div>
        </div>
        <div className="regulatory-search-panel">
          <div className="regulator-tabs"><button className="regulator-tab active">Todos os reguladores <span>392</span></button><button className="regulator-tab">BNA <span>162</span></button><button className="regulator-tab">UIF <span>88</span></button><button className="regulator-tab">Outro regulador <span>142</span></button></div>
          <div className="regulatory-search-row"><div className="regulatory-search-field"><Search size={17} /><input aria-label="Pesquisar normativos" placeholder="Pesquisar por código, tema, palavra-chave ou obrigação" /></div><button className="btn btn-secondary">Filtros avançados</button><button className="btn btn-primary">Pesquisar</button></div>
          <div className="search-chips"><span>Estado: Em vigor <X /></span><span>Período: Últimos 12 meses <X /></span><button>Limpar filtros</button><small>392 resultados sincronizados há 2 min</small></div>
        </div>
        <div className="tabs">
          <button className="tab active">Todos <span style={{ marginLeft: '6px', color: '#666' }}>162</span></button>
          <button className="tab">Avisos <span style={{ marginLeft: '6px', color: '#666' }}>48</span></button>
          <button className="tab">Instrutivos <span style={{ marginLeft: '6px', color: '#666' }}>71</span></button>
          <button className="tab">Circulares <span style={{ marginLeft: '6px', color: '#666' }}>43</span></button>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Código</th><th>Título</th><th>Data publicação</th><th>Status</th><th style={{ textAlign: 'center' }}>Ações</th></tr></thead>
            <tbody>
              {normativos.map(item => (
                <tr key={item.code}>
                  <td style={{ fontWeight: 600 }}>{item.code}</td>
                  <td>{item.title}</td>
                  <td style={{ fontSize: '12px', color: '#666' }}>{item.date}</td>
                  <td><span className="status success">{item.status}</span></td>
                  <td style={{ textAlign: 'center' }}><button className="icon-btn" style={{ color: '#666' }}><ChevronRight size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}