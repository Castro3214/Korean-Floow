/**
 * GERENCIADOR DE ESTADO CENTRALIZADO (KOREAN FLOW STORE)
 * Persistência automática no localStorage, controle de onboarding, streak real e emissão de eventos reativos
 */

import { ACHIEVEMENTS_DATA, evaluateAchievementCondition, getAchievementById } from '../data/achievementsData.js';
import { JOURNEY_DAYS, getDayById } from '../data/journeyData.js';

const STORAGE_KEY = 'korean_flow_app_state_v1';

export const DEFAULT_STATE = {
  onboardingCompleted: false, // Controle de primeiro acesso
  onboardingStep: 0,          // Etapa ativa do onboarding (0 a 5)
  userName: '',               // Nome fornecido no onboarding
  currentDay: 1,
  completedDays: [],
  completedExercises: [],     // Array de ids dos exercícios concluídos, ex: ['gato-vaca']
  exerciseCompletionDates: {},// Registro de conclusão de exercício { [exerciseId]: 'YYYY-MM-DD' }
  practiceCompletionDates: {},// Registro de conclusão de prática { [dayNumber]: 'YYYY-MM-DD' }
  dayCompletionDates: {},     // Sinônimo para retrocompatibilidade
  currentStreak: 0,           // Sequência ativa real consecutiva
  bestStreak: 0,              // Melhor sequência consecutiva já alcançada
  streak: 0,                  // Sinônimo para retrocompatibilidade
  lastPracticeDate: null,     // Data no formato YYYY-MM-DD para cálculo de streak
  totalFlowMinutes: 0,        // Total de minutos dedicados ao Korean Flow
  activeCompletionDay: null,  // Dia sendo celebrado no DayCompletionModal
  practiceCategoryFilter: 'all', // Filtro ativo da tela de prática
  achievements: [],           // Array de IDs de conquistas desbloqueadas
  activeAchievementUnlock: null, // Conquista recém-desbloqueada para celebrar
  habits: {},                 // { 'YYYY-MM-DD': ['habit_posture', ...] }
  moodCheckins: [],           // Histórico de check-ins [{ date, mood, label, icon }]
  showResetConfirmModal: false, // Modal de confirmação de reinício da jornada
  profile: {
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    focus: 'Pilates, Postura & Bem-estar Coreano',
    notifications: true,
    gentleSounds: true
  },
  activeTab: 'home',
  selectedPracticeDay: null,  // Para abertura do modal da prática do dia
  selectedExerciseId: null,   // Para abertura da tela/modal detalhada do exercício
  activeReaderBonus: null,    // ID do bônus aberto no Leitor Korean Flow
  showInstallModal: false,    // Modal com orientações de instalação na tela inicial
  installPlatform: 'ios',     // Plataforma ativa nas instruções: 'ios' | 'android'
  toastMessage: null
};

// ============================================================================
// FUNÇÕES CENTRAIS DE CÁLCULO (Seção 14 - Fonte Única de Verdade)
// ============================================================================

/**
 * Calcula o progresso global da jornada de 21 dias
 */
export function calculateJourneyProgress(stateOrDays) {
  const completed = Array.isArray(stateOrDays) 
    ? stateOrDays 
    : calculateCompletedDays(stateOrDays);
  const count = completed.length;
  const total = 21;
  const percent = Math.min(100, Math.round((count / total) * 100));
  return {
    completedCount: count,
    totalDays: total,
    percent,
    isComplete: count >= total,
    valueOf() { return percent; },
    toString() { return String(percent); }
  };
}

/**
 * Retorna os dias concluídos ordenados sem repetições
 */
export function calculateCompletedDays(stateOrDays) {
  let list = [];
  if (Array.isArray(stateOrDays)) {
    list = stateOrDays;
  } else if (stateOrDays && Array.isArray(stateOrDays.completedDays)) {
    list = stateOrDays.completedDays;
  }
  return Array.from(new Set(list)).sort((a, b) => a - b);
}

/**
 * Retorna o total de exercícios concluídos
 */
export function calculateCompletedExercises(stateOrExercises) {
  if (stateOrExercises && Array.isArray(stateOrExercises.completedExercises) && stateOrExercises.completedExercises.length > 0) {
    return Array.from(new Set(stateOrExercises.completedExercises)).length;
  }
  if (Array.isArray(stateOrExercises) && stateOrExercises.length > 0) {
    if (typeof stateOrExercises[0] === 'string') {
      return Array.from(new Set(stateOrExercises)).length;
    }
    return stateOrExercises.length * 4;
  }
  if (stateOrExercises && Array.isArray(stateOrExercises.completedDays)) {
    return stateOrExercises.completedDays.length * 4;
  }
  return 0;
}

/**
 * Calcula a soma dos minutos das práticas concluídas a partir dos dados da jornada
 */
export function calculateFlowMinutes(stateOrDays) {
  const completed = calculateCompletedDays(stateOrDays);
  let total = 0;
  for (const dayNum of completed) {
    const practice = getDayById(dayNum);
    if (practice && practice.duration) {
      const match = practice.duration.match(/\d+/);
      const mins = match ? parseInt(match[0], 10) : 18;
      total += mins;
    } else {
      total += 18;
    }
  }
  return total;
}

/**
 * Retorna a sequência atual válida
 */
export function calculateCurrentStreak(stateOrStreak) {
  if (typeof stateOrStreak === 'number') return stateOrStreak;
  return stateOrStreak?.currentStreak ?? stateOrStreak?.streak ?? 0;
}

/**
 * Retorna a melhor sequência alcançada
 */
export function calculateBestStreak(stateOrStreak, previousBest) {
  if (typeof stateOrStreak === 'number') {
    return Math.max(stateOrStreak, previousBest || 0);
  }
  const current = calculateCurrentStreak(stateOrStreak);
  const best = stateOrStreak?.bestStreak ?? 0;
  return Math.max(best, current);
}

/**
 * Retorna a lista de conquistas com status isUnlocked avaliado
 */
export function calculateAchievements(state) {
  const unlocked = new Set(state?.achievements || []);
  return ACHIEVEMENTS_DATA.map(ach => ({
    ...ach,
    isUnlocked: unlocked.has(ach.id)
  }));
}

// ============================================================================
// STORE PRINCIPAL
// ============================================================================

class Store {
  constructor() {
    this.state = this.loadState();
    this.listeners = new Set();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const completedDays = Array.isArray(parsed.completedDays) ? parsed.completedDays : [];
        const completedExercises = Array.isArray(parsed.completedExercises) ? parsed.completedExercises : [];
        const practiceDates = parsed.practiceCompletionDates || parsed.dayCompletionDates || {};
        const currentStreak = parsed.currentStreak ?? parsed.streak ?? 0;
        const bestStreak = parsed.bestStreak ?? currentStreak;

        const loaded = {
          ...DEFAULT_STATE,
          ...parsed,
          onboardingCompleted: parsed.onboardingCompleted === true,
          completedDays,
          completedExercises,
          practiceCompletionDates: practiceDates,
          dayCompletionDates: practiceDates,
          currentStreak,
          bestStreak,
          streak: currentStreak,
          moodCheckins: Array.isArray(parsed.moodCheckins) ? parsed.moodCheckins : [],
          activeCompletionDay: null,
          activeAchievementUnlock: null,
          showResetConfirmModal: false,
          practiceCategoryFilter: parsed.practiceCategoryFilter || 'all',
          profile: {
            ...DEFAULT_STATE.profile,
            ...(parsed.profile || {})
          }
        };

        // Calcula totalFlowMinutes dinamicamente
        loaded.totalFlowMinutes = calculateFlowMinutes(loaded);
        return loaded;
      }
    } catch (e) {
      console.warn('Erro ao carregar estado do localStorage, usando padrão:', e);
    }
    return { ...DEFAULT_STATE };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Falha ao salvar no localStorage:', e);
    }
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.saveState();
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Erro em listener do store:', err);
      }
    });
  }

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState
    };
    this.checkAchievements();
    this.notify();
  }

  // Métodos de Onboarding
  setOnboardingStep(stepNumber) {
    this.state.onboardingStep = Math.max(0, Math.min(5, stepNumber));
    this.notify();
  }

  completeOnboarding(name) {
    const trimmed = (name || this.state.userName || 'Sofia').trim();
    this.state.userName = trimmed;
    this.state.profile.name = trimmed;
    this.state.onboardingCompleted = true;
    this.state.onboardingStep = 0;
    this.state.currentDay = 1;
    this.state.completedDays = [];
    this.state.completedExercises = [];
    this.state.currentStreak = 0;
    this.state.bestStreak = 0;
    this.state.streak = 0;
    this.state.totalFlowMinutes = 0;
    this.state.achievements = [];
    this.state.moodCheckins = [];
    this.state.activeTab = 'home';
    this.saveState();
    this.showToast(`✨ Bem-vinda ao Korean Flow, ${trimmed}!`);
    this.notify();
  }

  restartOnboarding() {
    this.state.onboardingCompleted = false;
    this.state.onboardingStep = 0;
    this.saveState();
    this.notify();
  }

  setActiveTab(tabName) {
    if (this.state.activeTab !== tabName) {
      this.state.activeTab = tabName;
      this.notify();
    }
  }

  setUserName(name) {
    const trimmed = (name || '').trim() || 'Sofia';
    this.state.userName = trimmed;
    this.state.profile.name = trimmed;
    this.notify();
  }

  openPracticeModal(dayNumber) {
    this.state.selectedPracticeDay = dayNumber;
    this.state.selectedExerciseId = null;
    this.notify();
  }

  closePracticeModal() {
    this.state.selectedPracticeDay = null;
    this.state.selectedExerciseId = null;
    this.notify();
  }

  openExercise(exerciseId) {
    this.state.selectedExerciseId = exerciseId;
    this.notify();
  }

  closeExercise() {
    this.state.selectedExerciseId = null;
    this.notify();
  }

  openBonusReader(bonusId) {
    this.state.activeReaderBonus = bonusId;
    this.notify();
  }

  closeBonusReader() {
    this.state.activeReaderBonus = null;
    this.notify();
  }

  openInstallModal(platform = null) {
    if (platform) {
      this.state.installPlatform = platform;
    } else {
      this.state.installPlatform = detectUserPlatform();
    }
    this.state.showInstallModal = true;
    this.notify();
  }

  closeInstallModal() {
    this.state.showInstallModal = false;
    this.notify();
  }

  setInstallPlatform(platform) {
    if (platform === 'ios' || platform === 'android') {
      this.state.installPlatform = platform;
      this.notify();
    }
  }

  isExerciseCompleted(exerciseId) {
    return (this.state.completedExercises || []).includes(exerciseId);
  }

  toggleCompleteExercise(exerciseId) {
    const completedSet = new Set(this.state.completedExercises || []);
    const wasDone = completedSet.has(exerciseId);
    const today = this.getTodayDateKey();

    if (wasDone) {
      completedSet.delete(exerciseId);
      this.showToast('Exercício marcado como pendente.');
    } else {
      completedSet.add(exerciseId);
      this.state.exerciseCompletionDates = {
        ...(this.state.exerciseCompletionDates || {}),
        [exerciseId]: today
      };
      this.showToast('✓ Exercício concluído com sucesso!');
    }

    this.state.completedExercises = Array.from(completedSet);
    this.checkAchievements();
    this.notify();
  }

  getDayCompletionProgress(dayNumber) {
    const practice = JOURNEY_DAYS.find(p => p.day === dayNumber);
    if (!practice || !practice.exercises || practice.exercises.length === 0) {
      return { completed: 0, total: 0, percent: 0, allDone: false };
    }

    const total = practice.exercises.length;
    const completedSet = new Set(this.state.completedExercises || []);
    let count = 0;

    for (const ex of practice.exercises) {
      const id = typeof ex === 'object' && ex !== null ? ex.id : ex;
      if (completedSet.has(id)) {
        count++;
      }
    }

    const percent = total > 0 ? Math.round((count / total) * 100) : 0;

    return {
      completed: count,
      total: total,
      percent: percent,
      allDone: count === total && total > 0
    };
  }

  /**
   * Conclui a prática do dia e atualiza sequência, tempo e conquistas
   */
  confirmDayCompletion(dayNumber) {
    const completedSet = new Set(this.state.completedDays || []);
    const wasAlreadyCompleted = completedSet.has(dayNumber);
    const today = this.getTodayDateKey();

    if (!wasAlreadyCompleted) {
      completedSet.add(dayNumber);
      this.state.completedDays = Array.from(completedSet).sort((a, b) => a - b);

      // Atualização de sequência (streak) baseada em calendário e continuidade
      const lastDate = this.state.lastPracticeDate;
      let newStreak = this.state.currentStreak || this.state.streak || 0;

      if (!lastDate) {
        // Primeira prática da jornada
        newStreak = 1;
      } else if (lastDate === today) {
        // Já praticou hoje e concluiu um novo dia consecutivamente
        newStreak = Math.max(1, newStreak + 1);
      } else {
        const todayDate = new Date(today);
        const last = new Date(lastDate);
        const diffDays = Math.round((todayDate - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          // Dia consecutivo no calendário
          newStreak += 1;
        } else {
          // Houve pausa maior que 1 dia
          newStreak = 1;
        }
      }

      this.state.currentStreak = newStreak;
      this.state.streak = newStreak;
      this.state.bestStreak = Math.max(this.state.bestStreak || 0, newStreak);
      this.state.lastPracticeDate = today;

      const dates = {
        ...(this.state.practiceCompletionDates || this.state.dayCompletionDates || {}),
        [dayNumber]: today
      };
      this.state.practiceCompletionDates = dates;
      this.state.dayCompletionDates = dates;

      // Recalcular minutos totais de flow
      this.state.totalFlowMinutes = calculateFlowMinutes(this.state);

      const nextDay = Math.min(21, Math.max(this.state.currentDay, dayNumber + 1));
      this.state.currentDay = nextDay;
    }

    // Garantir que todos os 4 exercícios do dia fiquem marcados como concluídos
    const practice = JOURNEY_DAYS.find(p => p.day === dayNumber);
    if (practice && practice.exercises) {
      const exSet = new Set(this.state.completedExercises || []);
      practice.exercises.forEach(ex => {
        const id = typeof ex === 'object' && ex !== null ? ex.id : ex;
        exSet.add(id);
      });
      this.state.completedExercises = Array.from(exSet);
    }

    // Abre modal comemorativo de dia concluído
    this.state.activeCompletionDay = dayNumber;
    this.checkAchievements();
    this.notify();
  }

  completeDay(dayNumber) {
    this.confirmDayCompletion(dayNumber);
  }

  openCompletionModal(dayNumber) {
    this.state.activeCompletionDay = dayNumber;
    this.notify();
  }

  closeCompletionModal() {
    this.state.activeCompletionDay = null;
    this.notify();
  }

  setPracticeCategoryFilter(category) {
    this.state.practiceCategoryFilter = category;
    this.notify();
  }

  getTodayDateKey() {
    return new Date().toISOString().split('T')[0];
  }

  toggleHabit(habitId) {
    const today = this.getTodayDateKey();
    const todayHabits = new Set(this.state.habits[today] || []);

    if (todayHabits.has(habitId)) {
      todayHabits.delete(habitId);
    } else {
      todayHabits.add(habitId);
    }

    this.state.habits = {
      ...this.state.habits,
      [today]: Array.from(todayHabits)
    };

    this.checkAchievements();
    this.notify();
  }

  // ==========================================================================
  // CHECK-IN DIÁRIO DE BEM-ESTAR (Seções 18, 19, 38)
  // ==========================================================================
  setMoodCheckin(moodKey, note = '') {
    const today = this.getTodayDateKey();
    const MOOD_META = {
      'muito_bem': { label: 'Muito bem', icon: '😌' },
      'bem': { label: 'Bem', icon: '🙂' },
      'normal': { label: 'Normal', icon: '😐' },
      'desacelerar': { label: 'Preciso desacelerar', icon: '🌿' },
      // Retrocompatibilidade com chaves anteriores
      'leve': { label: 'Muito bem', icon: '😌' },
      'tranquilo': { label: 'Muito bem', icon: '😌' },
      'neutro': { label: 'Normal', icon: '😐' }
    };
    const meta = MOOD_META[moodKey] || { label: moodKey, icon: '✨' };

    const checkins = Array.isArray(this.state.moodCheckins) ? [...this.state.moodCheckins] : [];
    const existingIndex = checkins.findIndex(c => c.date === today);

    const checkinRecord = {
      date: today,
      mood: moodKey,
      label: meta.label,
      icon: meta.icon,
      note: typeof note === 'string' ? note.trim() : (checkins[existingIndex]?.note || ''),
      timestamp: Date.now()
    };

    if (existingIndex >= 0) {
      checkins[existingIndex] = checkinRecord;
    } else {
      checkins.unshift(checkinRecord);
    }

    this.state.moodCheckins = checkins;
    this.saveState();
    this.notify();
    this.showToast(`✨ Check-in registrado: sentindo-se ${meta.label}.`);
  }

  getTodayMoodCheckin() {
    const today = this.getTodayDateKey();
    const checkins = Array.isArray(this.state.moodCheckins) ? this.state.moodCheckins : [];
    return checkins.find(c => c.date === today) || null;
  }

  // ==========================================================================
  // CONQUISTAS E MODAIS
  // ==========================================================================
  checkAchievements() {
    const currentUnlocked = new Set(this.state.achievements || []);
    const newlyUnlocked = [];

    ACHIEVEMENTS_DATA.forEach(ach => {
      if (!currentUnlocked.has(ach.id)) {
        if (evaluateAchievementCondition(ach.id, this.state)) {
          currentUnlocked.add(ach.id);
          newlyUnlocked.push(ach);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      this.state.achievements = Array.from(currentUnlocked);
      // Apresenta a primeira conquista desbloqueada
      this.state.activeAchievementUnlock = newlyUnlocked[0];
      this.showToast(`✨ Nova Conquista: ${newlyUnlocked[0].title}!`);
    }
  }

  openAchievementModal(achievement) {
    this.state.activeAchievementUnlock = achievement;
    this.notify();
  }

  closeAchievementModal() {
    this.state.activeAchievementUnlock = null;
    this.notify();
  }

  // ==========================================================================
  // CONFIRMAÇÃO DE RESET SEGURO (Seção 19)
  // ==========================================================================
  openResetConfirmModal() {
    this.state.showResetConfirmModal = true;
    this.notify();
  }

  closeResetConfirmModal() {
    this.state.showResetConfirmModal = false;
    this.notify();
  }

  resetProgress() {
    const keptName = this.state.userName || 'Sofia';
    this.state = {
      ...DEFAULT_STATE,
      onboardingCompleted: true, // Preserva onboarding já realizado
      userName: keptName,
      profile: {
        ...DEFAULT_STATE.profile,
        name: keptName
      },
      showResetConfirmModal: false
    };
    this.saveState();
    this.notify();
    this.showToast('Jornada reiniciada para o Dia 1.');
  }

  // ==========================================================================
  // UTILITÁRIOS DE TESTE & DEMONSTRAÇÃO
  // ==========================================================================
  simulateAdvance() {
    const current = this.state.currentDay;
    if (current <= 21) {
      this.confirmDayCompletion(current);
    }
  }

  simulatePause(daysCount = 2) {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - daysCount);
    const pastKey = pastDate.toISOString().split('T')[0];
    this.state.lastPracticeDate = pastKey;
    this.state.currentStreak = 0;
    this.state.streak = 0;
    this.saveState();
    this.notify();
    this.showToast(`Pausa simulada de ${daysCount} dias no seu Flow.`);
  }

  showToast(message) {
    this.state.toastMessage = message;
    this.notify();
    setTimeout(() => {
      if (this.state.toastMessage === message) {
        this.state.toastMessage = null;
        this.notify();
      }
    }, 3500);
  }
}

Store.prototype.calculateJourneyProgress = function(arg) { return calculateJourneyProgress(arg || this.state); };
Store.prototype.calculateCompletedDays = function(arg) { return calculateCompletedDays(arg || this.state); };
Store.prototype.calculateCompletedExercises = function(arg) { return calculateCompletedExercises(arg || this.state); };
Store.prototype.calculateFlowMinutes = function(arg) { return calculateFlowMinutes(arg || this.state); };
Store.prototype.calculateCurrentStreak = function(arg) { return calculateCurrentStreak(arg || this.state); };
Store.prototype.calculateBestStreak = function(arg, prev) { return calculateBestStreak(arg || this.state, prev); };
Store.prototype.calculateAchievements = function(arg) { return calculateAchievements(arg || this.state); };

// Métodos exigidos na Seção 38 (Single Source of Truth)
Store.prototype.getJourneyProgress = function() { return calculateJourneyProgress(this.state); };
Store.prototype.getCompletedDays = function() { return calculateCompletedDays(this.state); };
Store.prototype.getCompletedExercises = function() { return calculateCompletedExercises(this.state); };
Store.prototype.getCurrentStreak = function() { return calculateCurrentStreak(this.state); };
Store.prototype.getBestStreak = function() { return calculateBestStreak(this.state); };
Store.prototype.getTotalFlowMinutes = function() { return calculateFlowMinutes(this.state); };
Store.prototype.getUnlockedAchievements = function() { return (calculateAchievements(this.state) || []).filter(a => a.isUnlocked); };
Store.prototype.getHabitProgress = function() {
  const today = this.getTodayDateKey();
  const completedList = this.state.habits?.[today] || [];
  const total = 5;
  return {
    completed: completedList.length,
    total,
    percent: Math.min(100, Math.round((completedList.length / total) * 100))
  };
};

export const store = new Store();

// Exportações utilitárias avulsas para consumo direto
export function getJourneyProgress(state = store.getState()) { return calculateJourneyProgress(state); }
export function getCompletedDays(state = store.getState()) { return calculateCompletedDays(state); }
export function getCompletedExercises(state = store.getState()) { return calculateCompletedExercises(state); }
export function getCurrentStreak(state = store.getState()) { return calculateCurrentStreak(state); }
export function getBestStreak(state = store.getState()) { return calculateBestStreak(state); }
export function getTotalFlowMinutes(state = store.getState()) { return calculateFlowMinutes(state); }
export function getUnlockedAchievements(state = store.getState()) { return (calculateAchievements(state) || []).filter(a => a.isUnlocked); }
export function getHabitProgress(state = store.getState()) {
  const today = new Date().toISOString().split('T')[0];
  const completedList = state?.habits?.[today] || [];
  const total = 5;
  return {
    completed: completedList.length,
    total,
    percent: Math.min(100, Math.round((completedList.length / total) * 100))
  };
}

/**
 * Detecta se a plataforma do usuário é iOS ou Android
 */
export function detectUserPlatform() {
  if (typeof navigator === 'undefined') return 'ios';
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'ios';
  }
  if (/Android/i.test(ua)) {
    return 'android';
  }
  return 'ios';
}

/**
 * Detecta se a aplicação já está rodando em modo standalone (PWA instalado)
 */
export function isAppStandalone() {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true ||
    (typeof document !== 'undefined' && document.referrer && document.referrer.includes('android-app://'))
  );
}


