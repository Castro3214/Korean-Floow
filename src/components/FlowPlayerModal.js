/**
 * COMPONENTE: FlowPlayerModal
 * Modal de introdução e preparação da prática do dia, contendo:
 * - Respiração consciente K-Wellness
 * - Sequência guiada com cada exercício interativo e clicável
 * - Barra de progresso visual (X de 4 exercícios concluídos • XX%)
 * - Habilitação do botão 'CONCLUIR PRÁTICA DE HOJE' ao atingir 100%
 */

import { Icons } from './Icons.js';
import { renderButton } from './Button.js';
import { renderProgressBar } from './ProgressBar.js';
import { getDayById, getExercisesForDay } from '../data/journeyData.js';
import { store } from '../state/store.js';

export function renderFlowPlayerModal(selectedDay, isPracticeAlreadyCompleted = false) {
  if (!selectedDay) return '';

  const practice = getDayById(selectedDay) || {
    day: selectedDay,
    title: `Prática do Dia ${selectedDay}`,
    duration: '18 min',
    level: 'Iniciante',
    category: 'Pilates & Mobilidade',
    phaseName: 'Korean Flow',
    description: 'Conecte-se com seu corpo e respire no ritmo suave coreano.',
    mindsetTip: 'No lifestyle coreano, a elegância corporal nasce da tranquilidade interna. Não force o corpo; permita que ele se acomode com graça.'
  };

  const exercises = getExercisesForDay(selectedDay);
  const state = store.getState();
  const completedExercisesSet = new Set(state.completedExercises || []);

  const progress = store.getDayCompletionProgress(selectedDay);
  const allExercisesCompleted = progress.allDone || isPracticeAlreadyCompleted;
  const dayPadded = String(practice.day).padStart(2, '0');

  return `
    <div class="kf-modal-backdrop open" id="flow-player-modal-backdrop" style="z-index: 100;">
      <div class="kf-modal-sheet" id="flow-player-modal-sheet" style="max-height: 90vh; overflow-y: auto;">
        <div class="kf-modal-handle"></div>

        <!-- Cabeçalho do Modal -->
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
          <div>
            <span class="kf-caption-korean" style="display: flex; align-items: center; gap: 5px;">
              ${Icons.lotus(13)} DIA ${dayPadded} • ${practice.phaseName ? practice.phaseName.toUpperCase() : 'KOREAN FLOW'}
            </span>
            <h2 class="kf-title-lg" style="margin-top: 4px; font-size: 20px; font-weight: 800; color: var(--kf-black);">
              Dia ${practice.day}: ${practice.title}
            </h2>
            ${practice.subtitle ? `
              <p style="font-size: 12.5px; color: var(--kf-text-muted); margin-top: 2px;">
                ${practice.subtitle}
              </p>
            ` : ''}
          </div>

          <button 
            type="button" 
            class="kf-btn-close" 
            id="modal-close-btn"
            style="
              background: var(--kf-lilac-light); 
              border: none; 
              width: 34px; 
              height: 34px; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: var(--kf-lilac-dark);
              cursor: pointer;
              flex-shrink: 0;
            "
          >
            ${Icons.close(16)}
          </button>
        </div>

        <!-- Indicador de Duração, Nível e Categoria -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span class="kf-badge kf-badge-lilac" style="font-size: 11.5px;">
            ${Icons.clock(12)} ${practice.duration}
          </span>
          <span class="kf-badge kf-badge-white" style="border: 1px solid var(--kf-border-subtle); font-size: 11.5px;">
            ${practice.level}
          </span>
          <span class="kf-badge kf-badge-white" style="border: 1px solid var(--kf-border-subtle); font-size: 11.5px; color: var(--kf-lilac-dark);">
            ${practice.category}
          </span>
        </div>

        <!-- Animação do Círculo de Respiração Consciente K-Wellness -->
        <div 
          class="kf-breathing-widget"
          style="
            background: linear-gradient(145deg, #FAF8FC 0%, var(--kf-lilac-light) 100%); 
            border-radius: var(--kf-radius-lg); 
            padding: 20px 16px; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            gap: 10px;
            border: 1px solid rgba(201, 184, 220, 0.4);
            text-align: center;
          "
        >
          <div 
            class="kf-breath-circle"
            style="
              width: 72px; 
              height: 72px; 
              border-radius: 50%; 
              background: radial-gradient(circle, #FFFFFF 0%, var(--kf-lilac-primary) 100%); 
              box-shadow: 0 0 25px rgba(201, 184, 220, 0.7); 
              display: flex; 
              align-items: center; 
              justify-content: center;
              color: var(--kf-lilac-dark);
              animation: kfPulseBreathe 5s ease-in-out infinite;
            "
          >
            ${Icons.lotus(24)}
          </div>
          <span style="font-size: 11px; font-weight: 800; color: var(--kf-lilac-dark); letter-spacing: 0.06em; text-transform: uppercase;">
            Ritmo de Respiração & Presença
          </span>
          <p style="font-size: 12px; color: var(--kf-text-muted); max-width: 270px; line-height: 1.45;">
            Inspire profundamente pelo nariz expandindo a caixa torácica. Solte o ar suavemente pela boca.
          </p>
        </div>

        <!-- SEQUÊNCIA GUIADA INTERATIVA COM BARRA DE PROGRESSO -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h4 style="font-size: 13.5px; font-weight: 800; color: var(--kf-black); letter-spacing: 0.02em; text-transform: uppercase;">
                Sequência Guiada de Hoje
              </h4>
              <span style="font-size: 12px; font-weight: 700; color: var(--kf-lilac-dark);">
                ${progress.completed} de ${progress.total} concluídos • ${progress.percent}%
              </span>
            </div>

            <!-- Barra de Progresso Visual da Sequência -->
            ${renderProgressBar(progress.percent, { height: '6px' })}
          </div>

          <p style="font-size: 11.5px; color: var(--kf-text-muted);">
            Toque em qualquer exercício para abrir os detalhes, alinhamento e orientações:
          </p>

          <!-- Lista de Exercícios Clicáveis com 3 Estados Visuais (Seção 11) -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${(() => {
              let firstUnfinishedFound = false;
              return exercises.map((exercise, idx) => {
                const isExDone = completedExercisesSet.has(exercise.id);
                const isNext = !isExDone && !firstUnfinishedFound;
                if (isNext) firstUnfinishedFound = true;
                const numPadded = String(idx + 1).padStart(2, '0');

                let cardBg = 'var(--kf-bg-card)';
                let cardBorder = 'var(--kf-border-subtle)';
                let cardShadow = 'var(--kf-shadow-subtle)';
                let badgeClass = 'kf-badge-white';
                let badgeText = exercise.duration;

                if (isExDone) {
                  cardBg = 'rgba(237, 231, 243, 0.5)';
                  cardBorder = 'rgba(143, 120, 168, 0.35)';
                  badgeClass = 'kf-badge-lilac';
                  badgeText = 'Concluído ✓';
                } else if (isNext) {
                  cardBg = '#FFFFFF';
                  cardBorder = 'var(--kf-lilac-primary)';
                  cardShadow = '0 4px 18px rgba(143, 120, 168, 0.12)';
                  badgeClass = 'kf-badge-lilac';
                  badgeText = 'Próximo';
                }

                return `
                  <div 
                    class="kf-card kf-exercise-item ${isExDone ? 'completed' : ''} ${isNext ? 'in-progress' : ''}"
                    data-action="open-exercise"
                    data-exercise-id="${exercise.id}"
                    style="
                      padding: 13px 15px; 
                      display: flex; 
                      align-items: center; 
                      justify-content: space-between; 
                      gap: 12px; 
                      cursor: pointer;
                      background: ${cardBg};
                      border-color: ${cardBorder};
                      box-shadow: ${cardShadow};
                      transition: all var(--kf-transition-fast);
                    "
                  >
                    <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                      <!-- Número / Ícone de Conclusão -->
                      <div style="
                        width: 28px; 
                        height: 28px; 
                        border-radius: 50%; 
                        background: ${isExDone ? 'var(--kf-lilac-dark)' : (isNext ? 'var(--kf-lilac-primary)' : 'var(--kf-bg-subtle)')}; 
                        color: ${isExDone || isNext ? '#FFFFFF' : 'var(--kf-text-soft)'}; 
                        font-size: 11px; 
                        font-weight: 700; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center;
                        flex-shrink: 0;
                        transition: all var(--kf-transition-fast);
                      ">
                        ${isExDone ? Icons.check(14) : numPadded}
                      </div>

                      <div style="display: flex; flex-direction: column; gap: 2px;">
                        <span style="
                          font-size: 13.5px; 
                          font-weight: 700; 
                          color: var(--kf-black); 
                          font-family: var(--kf-font-heading);
                        ">
                          ${exercise.title}
                        </span>
                        <span style="font-size: 11.5px; color: var(--kf-text-soft);">
                          ${exercise.focus || exercise.category} • ${exercise.duration}
                        </span>
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="kf-badge ${badgeClass}" style="font-size: 10.5px; font-weight: 600;">
                        ${badgeText}
                      </span>
                      <span style="color: var(--kf-text-soft); font-size: 14px; font-weight: bold;">
                        ›
                      </span>
                    </div>
                  </div>
                `;
              }).join('');
            })()}
          </div>
        </div>

        <!-- Dica de Mindset Coreano -->
        <div style="
          padding: 14px 16px; 
          background: #FFFDF9; 
          border-left: 3px solid var(--kf-gold); 
          border-radius: 4px var(--kf-radius-sm) var(--kf-radius-sm) 4px;
        ">
          <span style="font-size: 11px; font-weight: 700; color: var(--kf-gold); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;">
            ${Icons.sparkles(12)} Sabedoria do Dia
          </span>
          <p style="font-size: 12px; color: #5C5242; line-height: 1.45; margin-top: 4px; font-style: italic;">
            "${practice.mindsetTip}"
          </p>
        </div>

        <!-- BOTÃO 'CONCLUIR DIA' (HABILITADO SE TODOS CONCLUÍDOS OU JÁ CONCLUÍDA - Seção 13) -->
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 6px;">
          ${allExercisesCompleted ? `
            <div style="
              background: linear-gradient(145deg, #FAF7FD 0%, #FFFFFF 100%);
              border: 1px solid var(--kf-lilac-primary);
              border-radius: var(--kf-radius-card);
              padding: 14px 16px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 3px;
              text-align: center;
              box-shadow: 0 4px 16px rgba(143, 120, 168, 0.1);
            ">
              <span style="font-size: 14px; font-weight: 800; color: var(--kf-lilac-dark); font-family: var(--kf-font-heading);">
                Flow concluído ✦
              </span>
              <p style="font-size: 12.5px; color: var(--kf-text-muted);">
                Você cumpriu sua prática de hoje.
              </p>
            </div>

            ${renderButton({
              text: isPracticeAlreadyCompleted ? 'VER CELEBRAÇÃO DO DIA ✓' : 'CONCLUIR DIA',
              variant: 'primary',
              icon: Icons.check(18),
              isBlock: true,
              id: 'btn-finish-practice',
              dataAttributes: `data-day="${practice.day}"`,
              style: 'padding: 16px; font-size: 14.5px; letter-spacing: 0.03em;'
            })}
          ` : `
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button 
                type="button" 
                class="kf-btn kf-btn-secondary kf-btn-block"
                style="
                  padding: 16px; 
                  font-size: 13.5px; 
                  opacity: 0.7; 
                  cursor: not-allowed; 
                  border: 1px dashed var(--kf-border-subtle);
                "
                title="Conclua todos os exercícios da lista acima primeiro"
              >
                Conclua os exercícios da lista (${progress.completed}/${progress.total})
              </button>
              <span style="font-size: 11px; color: var(--kf-text-soft); text-align: center;">
                Toque nos exercícios acima para ver o alinhamento e marcá-los como concluídos.
              </span>
            </div>
          `}

          <button 
            type="button" 
            id="btn-return-modal" 
            style="background: none; border: none; font-size: 13px; color: var(--kf-text-soft); font-weight: 600; cursor: pointer; padding: 6px;"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  `;
}
