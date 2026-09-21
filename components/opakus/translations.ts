export type SupportedLanguage = 'pt' | 'en' | 'zh'

export const translations: Record<string, Record<string, string>> = {
  pt: {
    'Visão executiva': 'Visão executiva',
    'Compliance Platform': 'Compliance Platform',
    'Pesquisar normativos, obrigações...': 'Pesquisar normativos, obrigações...',
    'Definições': 'Definições',
    'Notificações': 'Notificações',
    'Ajuda': 'Ajuda',
    'Início': 'Início',
    'Normativos': 'Normativos',
    'Diligência': 'Diligência',
    'Risco': 'Risco',
    'Reports': 'Reports',
    'OPAKUS GROUP': 'OPAKUS GROUP',
    'Centro de conformidade': 'Centro de conformidade',
    Operacional: 'Operacional',
  },
  en: {
    'Visão executiva': 'Executive overview',
    'Compliance Platform': 'Compliance Platform',
    'Pesquisar normativos, obrigações...': 'Search regulations, obligations...',
    'Definições': 'Settings',
    'Notificações': 'Notifications',
    'Ajuda': 'Help',
    'Início': 'Home',
    'Normativos': 'Regulations',
    'Diligência': 'Due diligence',
    'Risco': 'Risk',
    'Reports': 'Reports',
    'OPAKUS GROUP': 'OPAKUS GROUP',
    'Centro de conformidade': 'Compliance center',
    Operacional: 'Operational',
  },
  zh: {
    'Visão executiva': '执行概览',
    'Compliance Platform': '合规平台',
    'Pesquisar normativos, obrigações...': '搜索法规、义务...',
    'Definições': '设置',
    'Notificações': '通知',
    'Ajuda': '帮助',
    'Início': '首页',
    'Normativos': '法规',
    'Diligência': '尽职调查',
    'Risco': '风险',
    'Reports': '报告',
    'OPAKUS GROUP': 'OPAKUS GROUP',
    'Centro de conformidade': '合规中心',
    Operacional: '运营',
  },
}

export function applyLanguage(language: SupportedLanguage | string) {
  if (typeof document === 'undefined') return

  const dictionary = translations[language] || translations.pt
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let node: Node | null

  while ((node = walker.nextNode())) {
    const textNode = node as Text
    const parent = textNode.parentElement

    if (parent && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
      nodes.push(textNode)
    }
  }

  nodes.forEach((textNode) => {
    const original = textNode.nodeValue || ''
    const translated = dictionary[original] || original
    if (textNode.nodeValue !== translated) {
      textNode.nodeValue = translated
    }
  })
}
