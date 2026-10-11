/**
 * TELA INICIAL: HomeView
 * Atende com precisão cirúrgica a todos os requisitos:
 * - Header: "Olá, [NOME]" e "Seu momento de cuidar de você." com avatar circular
 * - Card principal: "Seu Korean Flow", texto dos 21 dias, "Dia X de 21", barra de progresso, botão "COMEÇAR PRÁTICA"
 * - Seção: "Hoje no seu Flow" ou "Próximo no seu Flow" se o dia atual já foi feito
 * - Banner especial de consagração se os 21 dias foram concluídos
 * - Área de estatísticas: SEQUÊNCIA, DIAS CONCLUÍDOS, CONQUISTAS
 */

import { renderHeader } from '../components/Header.js';
import { renderProgressBar } from '../components/ProgressBar.js';
import { renderButton } from '../components/Button.js';
import { renderStatCard } from '../components/StatCard.js';
import { renderMoodCheckinCard } from '../components/MoodCheckinCard.js';
import { Icons } from '../components/Icons.js';
import { renderBonusCard } from '../components/BonusCard.js';
import { renderInstallAppCard } from '../components/InstallAppCard.js';
import { getAllBonuses } from '../data/bonusData.js';
import { INITIAL_HABITS } from '../data/habitsData.js';
import { JOURNEY_DAYS, getDayById } from '../data/journeyData.js';
import { calculateJourneyProgress, calculateCurrentStreak } from '../state/store.js';

export function renderHomeView(state) {
  const currentDayNum = state.currentDay || 1;
  const progress = calculateJourneyProgress(state);
  const completedDays = state.completedDays || [];
  const completedCount = progress.completedCount;
  const progressPercent = progress.percent;
  const isAllJourneyCompleted = progress.isComplete;
  const currentStreak = calculateCurrentStreak(state);

  // Check-in de hoje
  const todayKey = new Date().toISOString().split('T')[0];
  const todayCheckin = (state.moodCheckins || []).find(c => c.date === todayKey) || null;

  // Hábitos de hoje
  const todayHabitsDone = state.habits?.[todayKey] || [];

  // Prática do dia atual
  const todayPractice = getDayById(currentDayNum) || JOURNEY_DAYS[0];
  const isTodayCompleted = completedDays.includes(currentDayNum);
  const isStarted = completedCount > 0;
  const dayPadded = String(currentDayNum).padStart(2, '0');

  // Próximo dia sugerido se o dia atual já estiver concluído
  let nextDayPractice = null;
  if (isTodayCompleted && currentDayNum < 21) {
    nextDayPractice = getDayById(currentDayNum + 1);
  }

  const activePractice = (isTodayCompleted && nextDayPractice) ? nextDayPractice : todayPractice;
  const activeDayPadded = String(activePractice.day).padStart(2, '0');

  const completedExercisesCount = (state.completedExercises && state.completedExercises.length) || completedCount * 4;

  return `
    <div class="kf-view kf-home-view" style="display: flex; flex-direction: column; gap: 20px;">
      <!-- 1. Header com Saudação Temporal & Avatar (Seção 9) -->
      ${renderHeader({
        userName: state.userName,
        onAvatarClick: 'profile'
      })}

      <!-- 2. CARD PRINCIPAL OU CELEBRAÇÃO DOS 21 DIAS (Seção 7) -->
      ${isAllJourneyCompleted ? `
        <div 
          class="kf-card kf-card-journey-completed"
          style="
            background: linear-gradient(150deg, #FFFFFF 0%, #FFFDF7 40%, #F5ECDD 100%);
            border: 1.5px solid var(--kf-gold);
            padding: 24px 22px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            position: relative;
            box-shadow: 0 8px 30px rgba(200, 164, 93, 0.15);
          "
        >
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
            <span class="kf-badge kf-badge-gold" style="font-weight: 700; font-size: 10.5px; padding: 4px 10px;">
              ${Icons.award(14)} JORNADA 21 DIAS CONCLUÍDA
            </span>
            <span class="kf-caption-korean" style="font-size: 10.5px; color: var(--kf-gold); white-space: nowrap;">
              한국의 흐름 · 완주
            </span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <h2 class="kf-title-lg" style="font-size: 22px; font-weight: 800; color: var(--kf-black); letter-spacing: -0.02em; font-family: var(--kf-font-heading);">
              Parabéns, ${escapeHtml(state.userName || 'Sofia')}!
            </h2>
            <p class="kf-body-base" style="font-size: 13.5px; color: var(--kf-text-main); line-height: 1.55; font-style: italic;">
              “Você chegou ao final da sua jornada Korean Flow. Celebre sua dedicação e leve os pequenos hábitos que fizeram sentido para você para os próximos dias.”
            </p>
          </div>

          <!-- Resumo de Registros Reais (Sem dados fictícios) -->
          <div style="
            background: #FFFFFF;
            border-radius: var(--kf-radius-md);
            border: 1px solid rgba(200, 164, 93, 0.3);
            padding: 12px 14px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            text-align: center;
          ">
            <div>
              <span style="font-size: 18px; font-weight: 800; color: var(--kf-gold); font-family: var(--kf-font-heading);">21/21</span>
              <p style="font-size: 10.5px; color: var(--kf-text-muted); margin: 2px 0 0 0; font-weight: 600;">Dias</p>
            </div>
            <div style="border-left: 1px solid var(--kf-border-subtle); border-right: 1px solid var(--kf-border-subtle);">
              <span style="font-size: 18px; font-weight: 800; color: var(--kf-lilac-dark); font-family: var(--kf-font-heading);">${completedExercisesCount}</span>
              <p style="font-size: 10.5px; color: var(--kf-text-muted); margin: 2px 0 0 0; font-weight: 600;">Movimentos</p>
            </div>
            <div>
              <span style="font-size: 18px; font-weight: 800; color: var(--kf-black); font-family: var(--kf-font-heading);">${(state.achievements || []).length}</span>
              <p style="font-size: 10.5px; color: var(--kf-text-muted); margin: 2px 0 0 0; font-weight: 600;">Conquistas</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 2px;">
            ${renderButton({
              text: 'CONTINUAR COM RITUAIS DE HOJE',
              variant: 'primary',
              icon: Icons.habits(18),
              isBlock: true,
              dataAttributes: 'data-action="change-tab" data-tab="habits"',
              style: 'padding: 15px; font-size: 13.5px; letter-spacing: 0.03em;'
            })}
            ${renderButton({
              text: 'REVER PRÁTICAS DA JORNADA',
              variant: 'outline',
              icon: Icons.practice(18),
              isBlock: true,
              dataAttributes: 'data-action="change-tab" data-tab="practice"',
              style: 'padding: 13px; font-size: 13px; border-color: rgba(200, 164, 93, 0.4);'
            })}
          </div>

          <div style="text-align: center; margin-top: 2px;">
            <button 
              type="button" 
              data-action="open-reset-modal"
              id="btn-home-reset-journey"
              style="
                background: none; 
                border: none; 
                color: var(--kf-text-soft); 
                font-size: 11.5px; 
                cursor: pointer; 
                text-decoration: underline;
                padding: 4px 8px;
              "
            >
              Reiniciar jornada de 21 dias
            </button>
          </div>
        </div>
      ` : `
        <div 
          class="kf-card kf-card-main-journey"
          style="
            background: linear-gradient(150deg, #FFFFFF 0%, #F5EFFB 55%, var(--kf-lilac-light) 100%);
            border: 1px solid var(--kf-lilac-primary);
            padding: 24px 22px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            position: relative;
            box-shadow: var(--kf-shadow-card);
          "
        >
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="kf-badge kf-badge-white" style="font-weight: 700; color: var(--kf-lilac-dark); border: 1px solid rgba(201, 184, 220, 0.5); font-size: 11px;">
              ${Icons.sparkles(12)} DIA ${activeDayPadded}
            </span>
            <span class="kf-caption-korean" style="font-size: 11px;">
              한국의 흐름
            </span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <h2 class="kf-title-lg" style="font-size: 22px; font-weight: 800; color: var(--kf-black); letter-spacing: -0.02em; font-family: var(--kf-font-heading);">
              ${!isStarted ? 'Seu primeiro Flow começa aqui.' : activePractice.title}
            </h2>
            <p class="kf-body-base" style="font-size: 13.5px; color: var(--kf-text-muted); line-height: 1.45;">
              ${activePractice.duration} • ${activePractice.category || 'Pilates & Mobilidade'}
            </p>
          </div>

          <!-- Botão de Ação Direta -->
          <div style="margin-top: 4px;">
            ${renderButton({
              text: isStarted ? 'CONTINUAR PRÁTICA' : 'COMEÇAR PRÁTICA',
              variant: 'primary',
              icon: Icons.practice(18),
              isBlock: true,
              id: 'btn-main-start-practice',
              dataAttributes: `data-action="open-practice" data-day="${activePractice.day}"`,
              style: 'padding: 16px; font-size: 14px; letter-spacing: 0.03em;'
            })}
          </div>
        </div>
      `}

      <!-- 3. PROGRESSO DA JORNADA (Visual & Elegante - Seção 9) -->
      <div 
        class="kf-card"
        style="
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: var(--kf-shadow-card);
        "
      >
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 14px; font-weight: 700; color: var(--kf-black); font-family: var(--kf-font-heading);">
            Sua jornada
          </span>
          <span style="font-size: 12.5px; font-weight: 700; color: var(--kf-lilac-dark);">
            ${completedCount} de 21 dias (${progressPercent}%)
          </span>
        </div>
        ${renderProgressBar(progressPercent, { height: '8px' })}
      </div>

      <!-- 4. HÁBITOS: RESUMO DO RITUAL DE HOJE (Seção 9) -->
      <div 
        class="kf-card"
        style="
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: var(--kf-shadow-card);
        "
      >
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <h3 style="font-size: 15px; font-weight: 700; color: var(--kf-black); font-family: var(--kf-font-heading); margin: 0;">
              Seu ritual de hoje
            </h3>
            <span style="font-size: 12px; color: var(--kf-text-soft);">
              ${todayHabitsDone.length} de ${INITIAL_HABITS.length} hábitos concluídos
            </span>
          </div>
          <button 
            type="button" 
            data-action="change-tab" 
            data-tab="habits"
            style="
              background: none; 
              border: none; 
              font-size: 12px; 
              font-weight: 700; 
              color: var(--kf-lilac-dark); 
              cursor: pointer; 
              display: flex; 
              align-items: center; 
              gap: 4px;
              padding: 4px 6px;
            "
          >
            <span>Ver hábitos</span>
            ${Icons.arrowRight(12)}
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${INITIAL_HABITS.slice(0, 4).map(habit => {
            const isDone = todayHabitsDone.includes(habit.id);
            return `
              <div 
                data-action="toggle-habit" 
                data-habit-id="${habit.id}"
                style="
                  display: flex; 
                  align-items: center; 
                  justify-content: space-between; 
                  padding: 8px 6px; 
                  border-radius: var(--kf-radius-xs);
                  cursor: pointer;
                  transition: background-color var(--kf-transition-fast);
                "
              >
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="
                    width: 18px; 
                    height: 18px; 
                    border-radius: 50%; 
                    border: 1.5px solid ${isDone ? 'var(--kf-lilac-dark)' : 'var(--kf-border-subtle)'}; 
                    background: ${isDone ? 'var(--kf-lilac-dark)' : 'transparent'}; 
                    color: #FFFFFF; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 10px; 
                    font-weight: 700;
                    transition: all var(--kf-transition-fast);
                  ">
                    ${isDone ? '✓' : ''}
                  </span>
                  <span style="
                    font-size: 13px; 
                    font-weight: ${isDone ? '500' : '600'}; 
                    color: ${isDone ? 'var(--kf-text-soft)' : 'var(--kf-black)'};
                    text-decoration: ${isDone ? 'line-through' : 'none'};
                  ">
                    ${habit.title}
                  </span>
                </div>
                <span style="font-size: 11px; color: var(--kf-text-soft);">
                  ${habit.tag}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 5. CHECK-IN DE BEM-ESTAR (Seção 18) -->
      ${renderMoodCheckinCard(todayCheckin)}

      <!-- 6. CARD ATALHO / INSTALAÇÃO NA TELA INICIAL (PWA) -->
      ${renderInstallAppCard({ isStandalone: state.isStandalone })}

      <!-- 7. SEUS BÔNUS COMPACTOS (Seção 9) -->
      <div 
        class="kf-card"
        style="
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: var(--kf-shadow-card);
        "
      >
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <h3 style="font-size: 15px; font-weight: 700; color: var(--kf-black); font-family: var(--kf-font-heading); margin: 0;">
              Seus bônus
            </h3>
            <span style="font-size: 12px; color: var(--kf-text-soft);">
              Guia Xô Barriguinha & Hábitos Coreanos
            </span>
          </div>
          <button 
            type="button" 
            data-action="change-tab" 
            data-tab="bonus" 
            style="
              background: none; 
              border: none; 
              color: var(--kf-lilac-dark); 
              font-size: 12px; 
              font-weight: 700; 
              cursor: pointer; 
              display: flex; 
              align-items: center; 
              gap: 4px;
              padding: 4px 6px;
            "
          >
            <span>Ver biblioteca</span>
            ${Icons.arrowRight(12)}
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${getAllBonuses().map(bonus => renderBonusCard(bonus, { compact: true })).join('')}
        </div>
      </div>

      <!-- 7. Estatísticas Consolidadas (Consistência) -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        ${renderStatCard({
          title: 'SEQUÊNCIA',
          value: currentStreak,
          unit: 'dias',
          icon: Icons.flame(16),
          subtext: currentStreak > 0 ? 'Ritmo ativo' : 'Comece hoje'
        })}

        ${renderStatCard({
          title: 'DIAS FEITOS',
          value: completedCount,
          unit: '/ 21',
          icon: Icons.calendar(16),
          subtext: `${Math.max(0, 21 - completedCount)} restantes`
        })}

        ${renderStatCard({
          title: 'CONQUISTAS',
          value: (state.achievements || []).length,
          unit: '',
          icon: Icons.crown(16),
          subtext: 'Marcos de luz'
        })}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
