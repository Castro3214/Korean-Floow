/**
 * CONQUISTAS E MARCOS DE EVOLUÇÃO (KOREAN FLOW)
 * 8 Conquistas essenciais focadas em consistência, presença e autocuidado
 * Estética dourada (#C8A45D), lilás e minimalismo K-Wellness
 */

export const ACHIEVEMENTS_DATA = [
  {
    id: "first_movement",
    title: "Primeiro Movimento",
    koreanBadge: "첫 걸음",
    description: "Você concluiu sua primeira prática.",
    modalMessage: "Seu primeiro passo foi dado.",
    requirement: "1 dia concluído",
    icon: "flower-lotus",
    tier: "gold"
  },
  {
    id: "serene_consistency",
    title: "Consistência Serena",
    koreanBadge: "꾸준함",
    description: "Você criou uma sequência de 3 dias.",
    modalMessage: "3 dias em ritmo sereno e constante.",
    requirement: "Sequência de 3 dias",
    icon: "flame",
    tier: "gold"
  },
  {
    id: "first_week",
    title: "Primeira Semana",
    koreanBadge: "조화의 시작",
    description: "7 dias de presença e consistência.",
    modalMessage: "7 dias fortalecendo sua base e consciência.",
    requirement: "7 dias concluídos",
    icon: "award",
    tier: "gold"
  },
  {
    id: "habits_ritual",
    title: "Ritual de Hábitos",
    koreanBadge: "일상의 평화",
    description: "Você completou todos os hábitos de um dia.",
    modalMessage: "Harmonia completa no seu dia de bem-estar.",
    requirement: "5 hábitos no mesmo dia",
    icon: "heart-handshake",
    tier: "gold"
  },
  {
    id: "continuous_flow",
    title: "Flow Contínuo",
    koreanBadge: "완벽한 흐름",
    description: "Você manteve uma sequência de 7 dias.",
    modalMessage: "7 dias consecutivos de compromisso com você.",
    requirement: "Sequência de 7 dias",
    icon: "sparkles",
    tier: "gold"
  },
  {
    id: "halfway",
    title: "Meio do Caminho",
    koreanBadge: "반환점",
    description: "Você chegou à metade da jornada.",
    modalMessage: "10 dias construídos com dedicação e graça.",
    requirement: "10 dias concluídos",
    icon: "compass",
    tier: "gold"
  },
  {
    id: "two_weeks",
    title: "Duas Semanas",
    koreanBadge: "단단한 흐름",
    description: "14 dias construindo seu Korean Flow.",
    modalMessage: "14 dias transformando sua postura e presença.",
    requirement: "14 dias concluídos",
    icon: "star",
    tier: "gold"
  },
  {
    id: "master_flow",
    title: "Mestre do Korean Flow",
    koreanBadge: "완전한 변화",
    description: "Você completou os 21 dias da jornada.",
    modalMessage: "Jornada completa! O movimento agora é seu estilo de vida.",
    requirement: "21 dias concluídos",
    icon: "crown",
    tier: "gold"
  }
];

// Aliases para compatibilidade com versões anteriores salvas em localStorage
export const ACHIEVEMENT_ALIASES = {
  'first_flow': 'first_movement',
  'streak_3': 'serene_consistency',
  'week_1': 'first_week',
  'habits_champion': 'habits_ritual',
  'streak_7': 'continuous_flow'
};

/**
 * Retorna todas as conquistas do Korean Flow
 */
export function getAllAchievements() {
  return ACHIEVEMENTS_DATA;
}

/**
 * Busca uma conquista pelo ID (ou alias legado)
 */
export function getAchievementById(id) {
  const canonicalId = ACHIEVEMENT_ALIASES[id] || id;
  return ACHIEVEMENTS_DATA.find(a => a.id === canonicalId) || null;
}

/**
 * Avalia se as condições de uma conquista foram atendidas
 * @param {string} achievementId 
 * @param {Object} state 
 * @returns {boolean}
 */
export function evaluateAchievementCondition(achievementId, state) {
  const canonicalId = ACHIEVEMENT_ALIASES[achievementId] || achievementId;
  const completedDays = state.completedDays || [];
  const completedCount = completedDays.length;
  const streak = Math.max(state.currentStreak || 0, state.bestStreak || 0, state.streak || 0);

  // Hábitos do dia de hoje ou qualquer dia registrado com 5 hábitos
  const todayKey = new Date().toISOString().split('T')[0];
  const habitsToday = (state.habits && state.habits[todayKey]) ? state.habits[todayKey].length : 0;
  const hasAnyDayWithAllHabits = habitsToday >= 5 || Object.values(state.habits || {}).some(hList => Array.isArray(hList) && hList.length >= 5);

  switch (canonicalId) {
    case 'first_movement':
      return completedCount >= 1;
    case 'serene_consistency':
      return streak >= 3;
    case 'first_week':
      return completedCount >= 7;
    case 'habits_ritual':
      return hasAnyDayWithAllHabits;
    case 'continuous_flow':
      return streak >= 7;
    case 'halfway':
      return completedCount >= 10;
    case 'two_weeks':
      return completedCount >= 14;
    case 'master_flow':
      return completedCount >= 21;
    default:
      return false;
  }
}

// Retrocompatibilidade
export const INITIAL_ACHIEVEMENTS = ACHIEVEMENTS_DATA;

