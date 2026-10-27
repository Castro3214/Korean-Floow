/**
 * APLICAÇÃO PRINCIPAL: main.js
 * Ponto de entrada do Korean Flow, gerenciador de rotas, onboarding e eventos
 */

import { store } from './state/store.js';
import { renderBottomNavigation } from './components/BottomNavigation.js';
import { renderDesktopNavigation } from './components/DesktopNavigation.js';
import { renderFlowPlayerModal } from './components/FlowPlayerModal.js';
import { renderExerciseDetailModal } from './components/ExerciseDetailModal.js';
import { renderDayCompletionModal } from './components/DayCompletionModal.js';
import { renderAchievementUnlockModal } from './components/AchievementUnlockModal.js';
import { renderResetConfirmModal } from './components/ResetConfirmModal.js';
import { renderPdfReaderModal, bindReaderEvents } from './components/PdfReaderModal.js';
import { renderInstallAppModal } from './components/InstallAppModal.js';
import { renderHomeView } from './views/HomeView.js';
import { renderPracticeView } from './views/PracticeView.js';
import { renderProgressView } from './views/ProgressView.js';
import { renderHabitsView } from './views/HabitsView.js';
import { renderProfileView } from './views/ProfileView.js';
import { renderLibraryView } from './views/LibraryView.js';
import { renderOnboardingView } from './views/OnboardingView.js';
import { getAchievementById } from './data/achievementsData.js';
import { getExerciseById } from './data/exercisesData.js';
import { openVideoFullscreenOverlay, stopAllVideos } from './components/ExerciseVideoPlayer.js';

let selectedCategoryFilter = 'all';

function renderApp() {
  const state = store.getState();
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // 1. FLUXO DE ONBOARDING (PRIMEIRO ACESSO)
  if (!state.onboardingCompleted) {
    appContainer.innerHTML = `
      <div id="app-viewport-wrapper">
        ${renderOnboardingView(state)}
        <div class="kf-toast ${state.toastMessage ? 'show' : ''}" id="app-toast">
          ${state.toastMessage || ''}
        </div>
      </div>
    `;
    bindOnboardingEvents();
    return;
  }

  // 2. FLUXO PRINCIPAL DO APP (PÓS-ONBOARDING)
  let currentViewHtml = '';
  switch (state.activeTab) {
    case 'practice':
      currentViewHtml = renderPracticeView(state, state.practiceCategoryFilter || 'all');
      break;
    case 'progress':
      currentViewHtml = renderProgressView(state);
      break;
    case 'habits':
      currentViewHtml = renderHabitsView(state);
      break;
    case 'profile':
      currentViewHtml = renderProfileView(state);
      break;
    case 'bonus':
    case 'library':
      currentViewHtml = renderLibraryView(state);
      break;
    case 'home':
    default:
      currentViewHtml = renderHomeView(state);
      break;
  }

  // 3. Modal de Prática do Dia
  const isPracticeCompleted = state.selectedPracticeDay 
    ? (state.completedDays || []).includes(state.selectedPracticeDay)
    : false;
  const practiceModalHtml = state.selectedPracticeDay 
    ? renderFlowPlayerModal(state.selectedPracticeDay, isPracticeCompleted)
    : '';

  // 4. Modal Detalhado de Exercício (com YouTube Embed e passos Como Fazer)
  const isSelectedExerciseDone = state.selectedExerciseId
    ? store.isExerciseCompleted(state.selectedExerciseId)
    : false;
  const exerciseModalHtml = state.selectedExerciseId
    ? renderExerciseDetailModal(state.selectedExerciseId, isSelectedExerciseDone)
    : '';

  // 5. Modal de Celebração de Conclusão do Dia
  const completionModalHtml = state.activeCompletionDay
    ? renderDayCompletionModal(state.activeCompletionDay, state)
    : '';

  // 6. Modal de Desbloqueio de Conquista (Fase 4)
  const achievementModalHtml = state.activeAchievementUnlock
    ? renderAchievementUnlockModal(state.activeAchievementUnlock)
    : '';

  // 7. Modal de Confirmação de Reset Seguro (Fase 4)
  const resetModalHtml = state.showResetConfirmModal
    ? renderResetConfirmModal(state.showResetConfirmModal)
    : '';

  // 8. Modal do Leitor Korean Flow (Fase 5 - Bônus & Ebooks)
  const readerModalHtml = state.activeReaderBonus
    ? renderPdfReaderModal(state.activeReaderBonus)
    : '';

  // 9. Modal de Instalação na Tela Inicial (PWA)
  const installModalHtml = state.showInstallModal
    ? renderInstallAppModal({
        isOpen: true,
        activePlatform: state.installPlatform || 'ios',
        canPromptNative: Boolean(window.__deferredPwaPrompt)
      })
    : '';

  // 10. Monta a árvore completa do app mobile-first
  appContainer.innerHTML = `
    <div id="app-viewport-wrapper">
      <div class="kf-mobile-container">
        <!-- Barra de Navegação no Desktop -->
        ${renderDesktopNavigation(state.activeTab, state.userName)}

        <!-- Área de Conteúdo Rolável -->
        <main class="kf-content-area" id="main-content">
          ${currentViewHtml}
        </main>

        <!-- Barra de Navegação Inferior Fixa (Mobile/Tablet) -->
        ${renderBottomNavigation(state.activeTab)}

        <!-- Modal de Prática do Dia (Introdução & Sequência) -->
        ${practiceModalHtml}

        <!-- Modal de Detalhes do Exercício Específico -->
        ${exerciseModalHtml}

        <!-- Modal de Celebração de Conclusão do Dia -->
        ${completionModalHtml}

        <!-- Modal de Desbloqueio de Conquista -->
        ${achievementModalHtml}

        <!-- Modal de Confirmação de Reset -->
        ${resetModalHtml}

        <!-- Modal do Leitor Korean Flow (PDF / Bônus) -->
        ${readerModalHtml}

        <!-- Modal de Instalação / Adicionar à Tela Inicial -->
        ${installModalHtml}

        <!-- Toast de Notificação -->
        <div class="kf-toast ${state.toastMessage ? 'show' : ''}" id="app-toast">
          ${state.toastMessage || ''}
        </div>
      </div>
    </div>
  `;

  bindEvents();
}

/**
 * Eventos exclusivos do fluxo de Onboarding
 */
function bindOnboardingEvents() {
  const state = store.getState();

  // Iniciar Onboarding (passo 0 -> passo 1)
  const startBtn = document.querySelector('[data-action="start-onboarding"]');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      store.setOnboardingStep(1);
    });
  }

  // Voltar etapa no onboarding
  const prevBtn = document.querySelector('[data-action="prev-onboarding-step"]');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const prevStep = Math.max(0, (state.onboardingStep || 0) - 1);
      store.setOnboardingStep(prevStep);
    });
  }

  // Submissão do Nome (passo 1 -> passo 2)
  const nameInput = document.getElementById('onboarding-name-input');
  const nameError = document.getElementById('onboarding-name-error');
  const submitNameBtn = document.getElementById('btn-submit-onboarding-name');

  const handleNameSubmit = () => {
    if (!nameInput) return;
    const val = nameInput.value.trim();
    if (!val) {
      if (nameError) nameError.style.display = 'block';
      nameInput.focus();
      return;
    }
    if (nameError) nameError.style.display = 'none';
    store.setUserName(val);
    store.setOnboardingStep(2);
  };

  if (submitNameBtn) {
    submitNameBtn.addEventListener('click', handleNameSubmit);
  }

  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleNameSubmit();
      }
    });
    // Limpar erro ao digitar
    nameInput.addEventListener('input', () => {
      if (nameError && nameInput.value.trim()) {
        nameError.style.display = 'none';
      }
    });
  }

  // Próxima etapa genérica (passos 2, 3, 4)
  document.querySelectorAll('[data-action="next-onboarding-step"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = (state.onboardingStep || 0) + 1;
      store.setOnboardingStep(nextStep);
    });
  });

  // Finalizar Onboarding (passo 5 -> Home)
  const finishBtn = document.getElementById('btn-finish-onboarding');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      store.completeOnboarding(state.userName);
    });
  }
}

/**
 * Eventos da aplicação principal pós-onboarding
 */
function bindEvents() {
  // 1. Navegação de Abas (Mobile e Desktop)
  document.querySelectorAll('[data-tab]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const tab = elem.getAttribute('data-tab');
      if (tab) {
        stopAllVideos();
        store.setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const content = document.getElementById('main-content');
        if (content) content.scrollTop = 0;
      }
    });
  });

  // 2. Abertura do Modal de Prática
  document.querySelectorAll('[data-action="open-practice"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const day = parseInt(elem.getAttribute('data-day'), 10);
      if (day) {
        stopAllVideos();
        store.openPracticeModal(day);
      }
    });
  });

  // 3. Fechamento do Modal de Prática
  const practiceCloseBtn = document.getElementById('modal-close-btn');
  const practiceReturnBtn = document.getElementById('btn-return-modal');
  const practiceBackdrop = document.getElementById('flow-player-modal-backdrop');

  if (practiceCloseBtn) {
    practiceCloseBtn.addEventListener('click', () => {
      stopAllVideos();
      store.closePracticeModal();
    });
  }
  if (practiceReturnBtn) {
    practiceReturnBtn.addEventListener('click', () => {
      stopAllVideos();
      store.closePracticeModal();
    });
  }
  if (practiceBackdrop) {
    practiceBackdrop.addEventListener('click', (e) => {
      if (e.target === practiceBackdrop) {
        stopAllVideos();
        store.closePracticeModal();
      }
    });
  }

  // 4. Abertura do Modal Detalhado de Exercício
  document.querySelectorAll('[data-action="open-exercise"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAllVideos();
      const exerciseId = elem.getAttribute('data-exercise-id');
      if (exerciseId) {
        store.openExercise(exerciseId);
      }
    });
  });

  // 4b. Disparo de Visualização em Tela Cheia do Vídeo
  document.querySelectorAll('[data-action="watch-exercise-fullscreen"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const exerciseId = btn.getAttribute('data-exercise-id');
      if (exerciseId) {
        const exercise = getExerciseById(exerciseId);
        if (exercise) {
          openVideoFullscreenOverlay(exercise);
        }
      }
    });
  });

  // 5. Fechamento do Modal de Exercício (Retorno para a Prática e pausa do player)
  const backToPracticeBtn = document.getElementById('btn-back-to-practice');
  const exerciseCloseBtn = document.getElementById('exercise-close-btn');
  const returnToSeqBottomBtn = document.getElementById('btn-return-to-sequence-bottom');
  const exerciseBackdrop = document.getElementById('exercise-detail-modal-backdrop');

  const handleCloseExercise = () => {
    stopAllVideos();
    store.closeExercise();
  };

  if (backToPracticeBtn) {
    backToPracticeBtn.addEventListener('click', handleCloseExercise);
  }
  if (exerciseCloseBtn) {
    exerciseCloseBtn.addEventListener('click', handleCloseExercise);
  }
  if (returnToSeqBottomBtn) {
    returnToSeqBottomBtn.addEventListener('click', handleCloseExercise);
  }
  if (exerciseBackdrop) {
    exerciseBackdrop.addEventListener('click', (e) => {
      if (e.target === exerciseBackdrop) {
        handleCloseExercise();
      }
    });
  }

  // 6. Concluir ou Marcar Exercício como Pendente
  const toggleExerciseBtn = document.getElementById('btn-toggle-exercise-complete');
  if (toggleExerciseBtn) {
    toggleExerciseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const exerciseId = toggleExerciseBtn.getAttribute('data-exercise-id');
      if (exerciseId) {
        store.toggleCompleteExercise(exerciseId);
      }
    });
  }

  // 7. Concluir Prática do Dia e Abrir Celebração
  const finishBtn = document.getElementById('btn-finish-practice');
  if (finishBtn) {
    finishBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const day = parseInt(finishBtn.getAttribute('data-day'), 10);
      if (day) {
        store.closePracticeModal();
        store.confirmDayCompletion(day);
      }
    });
  }

  // 7.1 Fechar Modal de Celebração de Conclusão do Dia
  const closeCompletionBtn = document.getElementById('btn-close-completion-modal');
  const completionBackdrop = document.getElementById('day-completion-modal-backdrop');
  if (closeCompletionBtn) {
    closeCompletionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.closeCompletionModal();
    });
  }
  if (completionBackdrop) {
    completionBackdrop.addEventListener('click', (e) => {
      if (e.target === completionBackdrop) {
        store.closeCompletionModal();
      }
    });
  }

  // 8. Toggle de Hábitos
  document.querySelectorAll('[data-action="toggle-habit"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const habitId = elem.getAttribute('data-habit-id');
      if (habitId) {
        store.toggleHabit(habitId);
      }
    });
  });

  // 9. Check-in Diário de Bem-Estar (Fase 6: 4 humores e reflexão)
  document.querySelectorAll('[data-action="set-mood"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const mood = elem.getAttribute('data-mood');
      if (mood) {
        const noteInput = document.getElementById('kf-checkin-note-input');
        const noteVal = noteInput ? noteInput.value : '';
        store.setMoodCheckin(mood, noteVal);
      }
    });
  });

  const saveNoteBtn = document.getElementById('kf-btn-save-note');
  const noteInput = document.getElementById('kf-checkin-note-input');
  if (saveNoteBtn && noteInput) {
    saveNoteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = store.getTodayMoodCheckin();
      const moodKey = current ? current.mood : 'muito_bem';
      store.setMoodCheckin(moodKey, noteInput.value);
    });
    noteInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveNoteBtn.click();
      }
    });
  }

  // 9.1 Atalhos e Preferências do Perfil
  const prefsBtn = document.getElementById('btn-profile-preferences');
  if (prefsBtn) {
    prefsBtn.addEventListener('click', () => {
      store.showToast('🌿 Lembretes calmos e som suave ativos.');
    });
  }

  // 10. Fechar Modal de Conquista Desbloqueada (Fase 4)
  const closeAchBtn = document.getElementById('btn-close-achievement-modal');
  const achBackdrop = document.getElementById('achievement-unlock-modal-backdrop');
  if (closeAchBtn) {
    closeAchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.closeAchievementModal();
    });
  }
  if (achBackdrop) {
    achBackdrop.addEventListener('click', (e) => {
      if (e.target === achBackdrop) {
        store.closeAchievementModal();
      }
    });
  }

  // 11. Modal de Confirmação de Reset Seguro (Fase 4)
  const resetJourneyBtn = document.getElementById('btn-reset-journey');
  if (resetJourneyBtn) {
    resetJourneyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.openResetConfirmModal();
    });
  }

  const confirmResetBtn = document.getElementById('btn-confirm-reset');
  if (confirmResetBtn) {
    confirmResetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.resetProgress();
    });
  }

  const cancelResetBtn = document.getElementById('btn-cancel-reset');
  const resetBackdrop = document.getElementById('reset-confirm-modal-backdrop');
  if (cancelResetBtn) {
    cancelResetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.closeResetConfirmModal();
    });
  }
  if (resetBackdrop) {
    resetBackdrop.addEventListener('click', (e) => {
      if (e.target === resetBackdrop) {
        store.closeResetConfirmModal();
      }
    });
  }

  // 12. Filtros de Categoria na tela de Prática
  document.querySelectorAll('[data-category]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const cat = elem.getAttribute('data-category');
      if (cat) {
        selectedCategoryFilter = cat;
        store.setPracticeCategoryFilter(cat);
      }
    });
  });

  // 13. Salvar Nome de Perfil
  const saveNameBtn = document.getElementById('btn-save-profile-name');
  const nameInput = document.getElementById('input-profile-name');
  if (saveNameBtn && nameInput) {
    saveNameBtn.addEventListener('click', () => {
      const val = nameInput.value;
      if (val.trim()) {
        store.setUserName(val);
        store.showToast('✓ Nome atualizado com sucesso!');
      }
    });
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveNameBtn.click();
      }
    });
  }

  // 14. Demonstração: Simular avanço de 1 dia
  const advanceBtn = document.getElementById('btn-simulate-advance');
  if (advanceBtn) {
    advanceBtn.addEventListener('click', () => {
      store.simulateAdvance();
    });
  }

  // 15. Demonstração: Simular pausa de 2 dias (quebra de streak ativo)
  const pauseBtn = document.getElementById('btn-simulate-pause');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      store.simulatePause(2);
    });
  }

  // 16. Demonstração: Rever Onboarding de Boas-Vindas
  const restartOnboardingBtn = document.getElementById('btn-restart-onboarding');
  if (restartOnboardingBtn) {
    restartOnboardingBtn.addEventListener('click', () => {
      store.restartOnboarding();
    });
  }

  // 17. Abertura do Leitor de Bônus / Ebook (Fase 5)
  document.querySelectorAll('[data-action="open-bonus"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const bonusId = elem.getAttribute('data-bonus-id');
      if (bonusId) {
        store.openBonusReader(bonusId);
      }
    });
  });

  // 18. Fechamento do Leitor de Bônus / Ebook
  document.querySelectorAll('[data-action="close-reader"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      store.closeBonusReader();
    });
  });

  const readerBackdrop = document.getElementById('pdf-reader-modal-backdrop');
  if (readerBackdrop) {
    readerBackdrop.addEventListener('click', (e) => {
      if (e.target === readerBackdrop) {
        store.closeBonusReader();
      }
    });
  }

  // 18.1 Filtro de Bônus na Biblioteca
  document.querySelectorAll('[data-action="filter-bonus"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const filter = elem.getAttribute('data-bonus-filter');
      store.setState({ bonusFilter: filter || 'all' });
    });
  });

  // 19. Eventos internos do leitor de ebook (modo de leitura e capítulos)
  bindReaderEvents(renderApp);

  // 20. Eventos do Modal "Adicionar à Tela Inicial" (PWA / Install Experience)
  document.querySelectorAll('[data-action="open-install-modal"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      store.openInstallModal();
    });
  });

  document.querySelectorAll('[data-action="close-install-modal"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      store.closeInstallModal();
    });
  });

  const installBackdrop = document.getElementById('install-modal-backdrop');
  if (installBackdrop) {
    installBackdrop.addEventListener('click', (e) => {
      if (e.target === installBackdrop) {
        store.closeInstallModal();
      }
    });
  }

  document.querySelectorAll('[data-action="select-install-platform"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const platform = elem.getAttribute('data-platform');
      if (platform) {
        store.setInstallPlatform(platform);
      }
    });
  });

  document.querySelectorAll('[data-action="trigger-native-install"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.__deferredPwaPrompt) {
        window.__deferredPwaPrompt.prompt();
        window.__deferredPwaPrompt.userChoice.then((choiceResult) => {
          if (choiceResult && choiceResult.outcome === 'accepted') {
            store.showToast('✨ Korean Flow adicionado à tela inicial!');
            store.closeInstallModal();
          }
          window.__deferredPwaPrompt = null;
          renderApp();
        });
      }
    });
  });

  // Fechamento com a tecla Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const state = store.getState();
      if (state.showInstallModal) {
        store.closeInstallModal();
      }
    }
  }, { once: true });
}

// Inicializa a aplicação e se inscreve nas alterações da store
store.subscribe(() => {
  renderApp();
});

// Render inicial (com suporte a parâmetros de URL para navegação/testes diretos)
function initApp() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('onboarding')) {
      store.setState({ onboardingCompleted: false });
    }
    if (urlParams.has('skip_onboarding') || urlParams.has('home')) {
      store.setState({ onboardingCompleted: true });
    }
    if (urlParams.has('step')) {
      const step = parseInt(urlParams.get('step'), 10);
      if (!isNaN(step)) {
        store.setState({ 
          onboardingCompleted: false, 
          onboardingStep: Math.max(0, Math.min(5, step)) 
        });
      }
    }
    if (urlParams.has('name')) {
      const name = urlParams.get('name').trim();
      if (name) {
        store.setUserName(name);
      }
    }
    if (urlParams.has('tab')) {
      store.setActiveTab(urlParams.get('tab'));
    }
    if (urlParams.has('day')) {
      const day = parseInt(urlParams.get('day'), 10);
      if (!isNaN(day)) {
        store.openPracticeModal(day);
      }
    }
    if (urlParams.has('exercise')) {
      store.openExercise(urlParams.get('exercise'));
    }
    if (urlParams.has('celebrate')) {
      const day = parseInt(urlParams.get('celebrate'), 10);
      if (!isNaN(day)) {
        store.openCompletionModal(day);
      }
    }
    if (urlParams.has('achievement')) {
      const ach = getAchievementById(urlParams.get('achievement'));
      if (ach) {
        store.openAchievementModal(ach);
      }
    }
    if (urlParams.has('reset_modal')) {
      store.openResetConfirmModal();
    }
    if (urlParams.has('mood')) {
      store.setMoodCheckin(urlParams.get('mood'));
    }
    if (urlParams.has('bonus')) {
      store.openBonusReader(urlParams.get('bonus'));
    }
    if (urlParams.has('reader')) {
      store.openBonusReader(urlParams.get('reader'));
    }
    if (urlParams.has('install')) {
      const platformParam = urlParams.get('install');
      store.openInstallModal(platformParam === 'android' ? 'android' : 'ios');
    }
    if (urlParams.has('standalone')) {
      store.setState({ isStandalone: urlParams.get('standalone') === '1' || urlParams.get('standalone') === 'true' });
    }
  } catch (e) {
    console.warn('Erro ao processar parâmetros de URL:', e);
  }
  window.__store = store;
  window.getAchievementById = getAchievementById;
  renderApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Registro PWA (Service Worker) para suporte offline e instalabilidade
if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => {
        window.__swRegistered = true;
      })
      .catch((err) => {
        console.debug('PWA Service Worker offline notice:', err);
      });
  });
}

// Manipulador do prompt de instalação do PWA
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__deferredPwaPrompt = e;
  window.__pwaInstallable = true;
});
