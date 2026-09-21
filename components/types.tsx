'use client'

import { LayoutGrid } from 'lucide-react'

export type ViewId =
  | 'overview' | 'bna' | 'regulatory-search' | 'kyc' | 'kyc-cases'
  | 'due-diligence' | 'obligations' | 'matrix' | 'visibility' | 'risk'
  | 'audit' | 'compliance' | 'reports' | 'controls' | 'alerts' | 'users'
  | 'user-profile' | 'crud' | 'auth' | 'settings' | 'notifications'

export interface NavItem {
  id: ViewId
  label: string
  icon: typeof LayoutGrid
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const formDefinitions: Record<
  string,
  {
    eyebrow: string
    title: string
    description: string
    fields: { label: string; type?: string; placeholder?: string; options?: string[] }[]
  }
> = {
  'Novo caso': { eyebrow: 'CLIENTE & KYC / KYE / KYP', title: 'Criar novo caso de diligência', description: 'Registe clientes, colaboradores ou parceiros e inicie o fluxo de avaliação baseado em risco.', fields: [{ label: 'Tipo de caso', type: 'select', options: ['KYC · Cliente', 'KYE · Colaborador', 'KYP · Parceiro / fornecedor'] }, { label: 'Nome legal / entidade', placeholder: 'Ex.: Empresa ABC, Lda.' }, { label: 'NIF / identificador fiscal', placeholder: 'Número de identificação' }, { label: 'Segmento / departamento', type: 'select', options: ['Corporate', 'Institucional', 'Retalho', 'Compliance', 'Risco', 'Fornecedor crítico'] }, { label: 'Nível de risco inicial', type: 'select', options: ['Baixo · SDD', 'Médio · CDD', 'Alto · EDD'] }] },
  'Iniciar avaliação': { eyebrow: 'DUE DILIGENCE · KYC / KYE / KYP', title: 'Iniciar avaliação', description: 'Escolha a vertente de diligência e configure o primeiro ciclo de avaliação.', fields: [{ label: 'Vertente', type: 'select', options: ['KYC · Cliente', 'KYE · Colaborador', 'KYP · Parceiro / fornecedor'] }, { label: 'Nome do avaliado', placeholder: 'Nome da pessoa ou entidade' }, { label: 'Nível de diligência', type: 'select', options: ['SDD · Simplificada', 'CDD · Padrão', 'EDD · Aprofundada'] }, { label: 'Responsável pela avaliação', placeholder: 'Equipa ou pessoa responsável' }, { label: 'Observações', type: 'textarea', placeholder: 'Contexto inicial ou motivo da avaliação' }] },
  'Adicionar obrigação': { eyebrow: 'COMPLIANCE', title: 'Adicionar obrigação', description: 'Crie uma obrigação, defina a responsabilidade e acompanhe o seu cumprimento.', fields: [{ label: 'Nome da obrigação', placeholder: 'Ex.: Reporte prudencial Q3' }, { label: 'Regulador', type: 'select', options: ['BNA', 'UIF', 'Outro regulador'] }, { label: 'Data de vencimento', type: 'date' }, { label: 'Responsável', placeholder: 'Equipa ou pessoa responsável' }] },
  'Novo controlo': { eyebrow: 'CONTROL LIBRARY', title: 'Criar novo controlo', description: 'Adicione um controlo à biblioteca operacional e associe-o a um risco.', fields: [{ label: 'Nome do controlo', placeholder: 'Ex.: Screening de sanções' }, { label: 'Domínio', type: 'select', options: ['AML / CFT', 'KYC', 'Operações', 'Reporte'] }, { label: 'Natureza', type: 'select', options: ['Preventivo', 'Detectivo', 'Correctivo'] }, { label: 'Descrição', type: 'textarea', placeholder: 'Como o controlo funciona e qual evidência produz?' }] },
  'Criar report': { eyebrow: 'REPORTING', title: 'Criar report executivo', description: 'Configure um relatório e selecione os indicadores que serão apresentados.', fields: [{ label: 'Nome do report', placeholder: 'Ex.: Board Pack · Setembro' }, { label: 'Periodicidade', type: 'select', options: ['Pontual', 'Semanal', 'Mensal', 'Trimestral'] }, { label: 'Destinatários', placeholder: 'Emails separados por vírgula' }, { label: 'Notas', type: 'textarea', placeholder: 'Contexto ou instruções para o relatório' }] },
  'Guardar pesquisa': { eyebrow: 'PESQUISA REGULATÓRIA', title: 'Guardar pesquisa', description: 'Guarde estes filtros para voltar rapidamente à mesma pesquisa.', fields: [{ label: 'Nome da pesquisa', placeholder: 'Ex.: AML em vigor' }, { label: 'Notificar novas publicações?', type: 'select', options: ['Sim, por email', 'Sim, no centro de notificações', 'Não'] }] },
  'Adicionar requisito': { eyebrow: 'NORMATIVO', title: 'Adicionar requisito regulatório', description: 'Associe um requisito a um normativo e defina a sua aplicabilidade.', fields: [{ label: 'Código do requisito', placeholder: 'Ex.: BNA-AML-042' }, { label: 'Regulador', type: 'select', options: ['BNA', 'UIF', 'Outro regulador'] }, { label: 'Tema', placeholder: 'Ex.: Prevenção de branqueamento' }, { label: 'Aplicável a', type: 'select', options: ['Toda a organização', 'Corporate', 'Retalho'] }, { label: 'Descrição', type: 'textarea', placeholder: 'Detalhe o requisito e a evidência esperada.' }] },
  'Criar regra de alerta': { eyebrow: 'ALERTAS', title: 'Criar regra de alerta', description: 'Defina quando a Opakus deve gerar uma notificação e para quem.', fields: [{ label: 'Nome da regra', placeholder: 'Ex.: Obrigação crítica próxima do prazo' }, { label: 'Categoria', type: 'select', options: ['Regulatório', 'Operacional', 'Segurança'] }, { label: 'Condição', type: 'select', options: ['Prazo inferior a 7 dias', 'Score abaixo do limite', 'Novo acesso privilegiado'] }, { label: 'Notificar', placeholder: 'Equipa ou emails destinatários' }] },
  'Convidar utilizador': { eyebrow: 'IDENTITY & ACCESS', title: 'Convidar utilizador', description: 'Convide uma pessoa e atribua o role adequado ao seu âmbito de trabalho.', fields: [{ label: 'Nome completo', placeholder: 'Ex.: Marta Domingos' }, { label: 'Email profissional', type: 'email', placeholder: 'nome@organizacao.com' }, { label: 'Departamento', type: 'select', options: ['Compliance', 'Risco', 'Auditoria', 'IT & Segurança'] }, { label: 'Role', type: 'select', options: ['Compliance Officer', 'Risk Manager', 'Auditor', 'Administrador'] }] },
  'Adicionar normativo': { eyebrow: 'NORMATIVO', title: 'Adicionar normativo', description: 'Registe uma fonte regulatória e mantenha a sua vigência e aplicabilidade.', fields: [{ label: 'Código e título', placeholder: 'Ex.: Aviso 02/2026 · Governação' }, { label: 'Regulador', type: 'select', options: ['BNA', 'UIF', 'APD', 'Outro'] }, { label: 'Data de vigência', type: 'date' }, { label: 'Descrição', type: 'textarea', placeholder: 'Resumo e impacto operacional' }] },
  'Registar anomalia': { eyebrow: 'RISCO', title: 'Registar anomalia', description: 'Abra um incidente e encaminhe-o para análise.', fields: [{ label: 'Descrição do incidente', placeholder: 'Ex.: Concentração transacional fora do perfil' }, { label: 'Domínio', type: 'select', options: ['AML / CFT', 'KYC', 'Operações', 'Reporte'] }, { label: 'Prioridade', type: 'select', options: ['Crítico', 'Alta', 'Média', 'Baixa'] }, { label: 'Detalhes', type: 'textarea', placeholder: 'Evidências e contexto' }] },
  'Criar auditoria': { eyebrow: 'AUDITORIA', title: 'Criar auditoria', description: 'Planeie uma auditoria, defina o âmbito e atribua um responsável.', fields: [{ label: 'Nome da auditoria', placeholder: 'Ex.: Auditoria AML 2026' }, { label: 'Âmbito', placeholder: 'Processos, controlos ou equipas abrangidas' }, { label: 'Responsável', placeholder: 'Auditor ou equipa' }, { label: 'Data prevista', type: 'date' }] },
  'Criar matriz': { eyebrow: 'RISCO · REQUISITOS', title: 'Criar matriz', description: 'Crie uma matriz de requisitos e associe-a a um normativo.', fields: [{ label: 'Nome da matriz', placeholder: 'Ex.: Matriz BNA AML' }, { label: 'Normativo', placeholder: 'Normativo de referência' }, { label: 'Owner', placeholder: 'Equipa responsável' }, { label: 'Descrição', type: 'textarea', placeholder: 'Objetivo e âmbito da matriz' }] },
  'Criar perfil de visibilidade': { eyebrow: 'VISIBILIDADE', title: 'Criar perfil de visibilidade', description: 'Defina o âmbito de dados e permissões de leitura para um grupo.', fields: [{ label: 'Nome do perfil', placeholder: 'Ex.: Auditor externo' }, { label: 'Âmbito', type: 'select', options: ['Workspace', 'Reports', 'Auditoria', 'Diligência'] }, { label: 'Nível de acesso', type: 'select', options: ['Leitura', 'Leitura limitada', 'Leitura e exportação'] }, { label: 'Descrição', type: 'textarea', placeholder: 'Regras de visibilidade' }] },
}