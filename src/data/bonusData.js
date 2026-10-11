/**
 * Korean Flow - Catálogo Central de Bônus e Ebooks Complementares
 * FASE 5 & FASE 7: Central de Materiais com Ebooks 100% Integrados
 */

export const BONUS_MATERIALS = [
  {
    id: 'guia-refeicoes',
    title: 'Guia Xô Barriguinha',
    subtitle: 'Comida simples. Rotina leve. • 21 dias de praticidade, equilíbrio e bem-estar',
    koreanTitle: '가벼운 몸 · Xô Barriguinha & Nutrição Leve',
    category: 'Nutrição & Rotina Leve',
    badge: 'Ebook Liberado',
    readTime: '15 páginas • Leitura & PDF',
    description: '21 dias de praticidade, equilíbrio e bem-estar. Cardápio completo de 7 dias, método do prato ideal, 12 receitas econômicas e guia prático de marmitas sem dietas malucas.',
    shortDescription: 'Comida simples e rotina leve: método do prato ideal, lista de compras, cardápio de 7 dias e 12 receitas acessíveis.',
    buttonLabel: 'Ler Guia Xô Barriguinha',
    file: 'assets/ebooks/guia-xo-barriguinha.pdf',
    fallbackFile: 'assets/ebooks/guia-refeicoes.pdf',
    status: 'available', // Liberado para leitura interativa e download direto do PDF
    coverGradient: 'linear-gradient(135deg, #1C3326 0%, #0F1F17 100%)',
    coverAccent: '#DDA15E',
    iconName: 'book',
    totalPages: 15,
    highlights: [
      'Método do Prato Ideal (50% vegetais, 25% proteínas, 25% carboidratos complexos)',
      'Lista de compras de feira e supermercado inteligente',
      'Cardápio completo de 7 dias com 12 receitas de até R$ 8/porção',
      'Guia de marmitas (meal prep) para cozinhar 1x e comer 3 dias'
    ]
  },
  {
    id: 'korean-lifestyle',
    title: 'Korean Lifestyle: Método de Hábitos Coreanos',
    subtitle: 'Mentalidade, hábitos e uma rotina mais leve • Viver com mais intenção',
    koreanTitle: '한국 라이프스타일 · 습관 & 마음 챙김',
    category: 'Mentalidade & Hábitos K-Wellness',
    badge: 'Ebook Liberado',
    readTime: '13 páginas • Leitura & PDF',
    description: 'Os 5 conceitos de mentalidade coreana (Godsaeng, Nunchi, Jeong, Sohwakhaeng e Ppalli-ppalli), rotina matinal Modo K, cuidados com a pele em 5 etapas, foco 50/10 e o Desafio 21 Dias.',
    shortDescription: 'Guia prático para viver com mais intenção: mentalidade Godsaeng, rotina matinal Modo K, organização e desafio de 21 dias.',
    buttonLabel: 'Ler Método de Hábitos',
    file: 'assets/ebooks/korean-lifestyle.pdf',
    status: 'available', // Liberado para leitura interativa e download direto do PDF
    coverGradient: 'linear-gradient(135deg, #1E2738 0%, #101623 100%)',
    coverAccent: '#C9B8DC',
    iconName: 'fileText',
    totalPages: 13,
    highlights: [
      '5 Conceitos de Mentalidade (Godsaeng, Nunchi, Jeong, Sohwakhaeng e Ppalli-ppalli)',
      'Rotina Matinal Modo K: despertar sem telas, água morna e 10 min de movimento',
      'Skincare coreano em 5 etapas acessíveis com produtos brasileiros',
      'Desafio Modo K de 21 dias para transformar hábitos sem sobrecarga'
    ]
  }
];

/**
 * Retorna todos os materiais bônus cadastrados
 * @returns {Array}
 */
export function getAllBonuses() {
  return BONUS_MATERIALS;
}

/**
 * Busca um material bônus pelo seu identificador
 * @param {string} id
 * @returns {Object|null}
 */
export function getBonusById(id) {
  if (!id) return null;
  return BONUS_MATERIALS.find(b => b.id === id) || null;
}
