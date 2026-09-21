export const translations: Record<string, Record<string, string>> = {
  en: { 
    'Visão executiva': 'Executive overview', 'VISÃO GERAL': 'OVERVIEW', 'COMPLIANCE': 'COMPLIANCE', 'RISCO': 'RISK', 'NORMATIVO': 'REGULATORY', 'DILIGÊNCIA': 'DUE DILIGENCE', 
    'CLIENTE & KYC': 'CLIENT & KYC', 'AUDITORIA & REPORTING': 'AUDIT & REPORTING', 'GESTÃO DE REGISTOS': 'RECORD MANAGEMENT', 'GESTÃO DA PLATAFORMA': 'PLATFORM MANAGEMENT', 
    'Status de conformidade': 'Compliance status', 'Biblioteca de controlos': 'Control library', 'Obrigações e prazos': 'Obligations & deadlines', 'Risco & anomalias': 'Risk & anomalies', 
    'Matriz de requisitos': 'Requirements matrix', 'Biblioteca regulatória': 'Regulatory library', 'Pesquisar normativos': 'Search regulations', '1 · Casos KYC / KYE / KYP': '1 · KYC / KYE / KYP cases'
  },
  zh: { 'Visão executiva': '执行概览', 'VISÃO GERAL': '概览', 'COMPLIANCE': '合规', 'RISCO': '风险', 'NORMATIVO': '监管' }
}
export function translate(text: string, language: string): string { return translations[language]?.[text] || text; }
