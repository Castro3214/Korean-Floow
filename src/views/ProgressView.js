/**
 * VIEW: ProgressView
 * Tela completa de acompanhamento da jornada de 21 dias do Korean Flow
 * Inclui:
 * 1. Hero com anel circular de progresso SVG animado e dias concluídos
 * 2. 6 Cards de estatísticas dinâmicas (Sequência Atual, Melhor Sequência, Dias, Exercícios, Tempo de Flow, Conquistas)
 * 3. Card dedicado de Sequência (Streak) com frase de acolhimento
 * 4. Linha do Tempo da Evolução (Timeline visual das 3 fases)
 * 5. Calendário / Grid dos 21 Dias agrupado por fases (interativo e clicável)
 * 6. Check-in diário de bem-estar com histórico recente
 * 7. Mural com as 8 Conquistas K-Wellness e modal de celebração
 */

import { Icons } from '../components/Icons.js';
import { renderSectionHeader } from '../components/SectionHeader.js';
import { renderAchievementCard } from '../components/AchievementCard.js';
import { renderMoodCheckinCard } from '../components/MoodCheckinCard.js';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData.js';
import { JOURNEY_DAYS, JOURNEY_PHASES } from '../data/journeyData.js';
import { store } from '../state/store.js';

export function renderProgressView(state) {
  const completedDays = state.completedDays || [];
  const completedCount = completedDays.length;
  const currentDay = state.currentDay || 1;
  const completedSet = new Set(completedDays);

  // Cálculos dinâmicos centralizados
  const journeyProgress = store.calculateJourneyProgress(state);
  const progressPercent = typeof journeyProgress === 'object' && journeyProgress !== null ? journeyProgress.percent : Number(journeyProgress);
  const currentStreak = store.calculateCurrentStreak(state);
  const bestStreak = store.calculateBestStreak(state);
  const completedExercisesCount = store.calculateCompletedExercises(state);
  const flowMinutes = store.calculateFlowMinutes(state);

  // Conquistas desbloqueadas
  const unlockedSet = new Set(state.achievements || []);
  const unlockedCount = unlockedSet.size;

  // Parâmetros do SVG circular
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Histórico recente de check-ins (últimos 4)
  const recentMoods = (state.moodCheckins || []).slice(-4).reverse();
  const moodLabels = {
    leve: { label: 'Leve', icon: '☺', color: 'var(--kf-lilac-dark)' },
    bem: { label: 'Bem', icon: '🙂', color: '#3B7A57' },
    neutro: { label: 'Neutro', icon: '😐', color: 'var(--kf-text-muted)' },
    tranquilo: { label: 'Tranquilo', icon: '😌', color: 'var(--kf-gold)' }
  };

  return `
    <div class="kf-progress-view" style="display: flex; flex-direction: column; gap: 24px; padding-bottom: 40px;">

      <!-- 1. CABEÇALHO HERO (Seção 2) -->
      <header style="display: flex; flex-direction: column; gap: 4px;">
        <span class="kf-caption-korean" style="display: flex; align-items: center; gap: 5px;">
          ${Icons.sparkles(12)} 나의 흐름 • SEU PROGRESSO
        </span>
        <h1 class="kf-title-xl" style="font-size: 26px; font-weight: 800; color: var(--kf-black); letter-spacing: -0.02em;">
          Seu progresso
        </h1>
        <p class="kf-body-base" style="color: var(--kf-text-muted); font-size: 14px;">
          Cada prática conta. Sinta a evolução da sua postura e mente.
        </p>
      </header>

      <!-- 2. CARD HERO COM ANEL CIRCULAR DE PROGRESSO SVG (Seção 2) -->
      <div 
        class="kf-card kf-progress-hero-card" 
        style="
          padding: 22px 20px; 
          background: linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%);
          border: 1px solid rgba(179, 157, 219, 0.3);
          box-shadow: 0 4px 18px rgba(33, 33, 33, 0.04);
          display: flex; 
          align-items: center; 
          gap: 20px;
        "
      >
        <!-- Gráfico Circular SVG -->
        <div style="position: relative; width: 110px; height: 110px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="110" height="110" viewBox="0 0 110 110" style="transform: rotate(-90deg);">
            <!-- Trilha Base -->
            <circle 
              cx="55" 
              cy="55" 
              r="${radius}" 
              stroke="var(--kf-bg-subtle)" 
              stroke-width="8" 
              fill="transparent" 
            />
            <!-- Preenchimento Dinâmico com Gradiente -->
            <defs>
              <linearGradient id="kfProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#C5B4E3" />
                <stop offset="100%" stop-color="#9C77D6" />
              </linearGradient>
            </defs>
            <circle 
              class="kf-progress-ring-fill"
              cx="55" 
              cy="55" 
              r="${radius}" 
              stroke="url(#kfProgressGradient)" 
              stroke-width="8" 
              stroke-linecap="round" 
              stroke-dasharray="${circumference}" 
              stroke-dashoffset="${strokeDashoffset}" 
              fill="transparent" 
              style="transition: stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1);"
            />
          </svg>

          <!-- Texto Centralizado -->
          <div style="position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <span style="font-size: 22px; font-weight: 800; color: var(--kf-black); line-height: 1;">
              ${progressPercent}%
            </span>
            <span style="font-size: 9px; font-weight: 700; color: var(--kf-lilac-dark); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 3px;">
              FLUXO
            </span>
          </div>
        </div>

        <!-- Informações do Progresso -->
        <div style="display: flex; flex-direction: column; gap: 5px; flex: 1;">
          <span class="kf-badge kf-badge-lilac" style="align-self: flex-start; font-size: 10.5px; padding: 3px 9px; font-weight: 700;">
            DIA ${currentDay} DE 21
          </span>
          <h3 style="font-size: 18px; font-weight: 800; color: var(--kf-black); letter-spacing: -0.01em;">
            ${completedCount} de 21 dias concluídos
          </h3>
          <p style="font-size: 12px; color: var(--kf-text-muted); line-height: 1.4;">
            ${progressPercent >= 100 
              ? 'Parabéns! Você completou sua jornada completa.' 
              : 'Sua jornada de equilíbrio e postura está em evolução constante.'}
          </p>
        </div>
      </div>

      <!-- 3. GRADE COM 6 CARDS DE ESTATÍSTICAS (Seção 3) -->
      <section style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          
          <!-- Card 1: Sequência Atual -->
          <div class="kf-card" style="padding: 16px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 10.5px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase;">
                SEQUÊNCIA ATUAL
              </span>
              <span style="color: var(--kf-gold);">${Icons.flame(16)}</span>
            </div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--kf-black);">
              ${currentStreak} <span style="font-size: 13px; font-weight: 600; color: var(--kf-text-muted);">${currentStreak === 1 ? 'dia' : 'dias'}</span>
            </h4>
            <span style="font-size: 11px; color: var(--kf-text-soft);">
              Você está mantendo seu Flow.
            </span>
          </div>

          <!-- Card 2: Melhor Sequência -->
          <div class="kf-card" style="padding: 16px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 10.5px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase;">
                MELHOR SEQUÊNCIA
              </span>
              <span style="color: var(--kf-gold);">${Icons.award(16)}</span>
            </div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--kf-black);">
              ${bestStreak} <span style="font-size: 13px; font-weight: 600; color: var(--kf-text-muted);">${bestStreak === 1 ? 'dia' : 'dias'}</span>
            </h4>
            <span style="font-size: 11px; color: var(--kf-text-soft);">
              Seu recorde pessoal
            </span>
          </div>

          <!-- Card 3: Dias Concluídos -->
          <div class="kf-card" style="padding: 16px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 10.5px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase;">
                DIAS CONCLUÍDOS
              </span>
              <span style="color: var(--kf-lilac-dark);">${Icons.calendar(16)}</span>
            </div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--kf-black);">
              ${completedCount} <span style="font-size: 13px; font-weight: 600; color: var(--kf-text-muted);">/ 21</span>
            </h4>
            <span style="font-size: 11px; color: var(--kf-text-soft);">
              ${progressPercent}% da jornada
            </span>
          </div>

          <!-- Card 4: Exercícios Realizados -->
          <div class="kf-card" style="padding: 16px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 10.5px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase;">
                EXERCÍCIOS
              </span>
              <span style="color: var(--kf-lilac-dark);">${Icons.practice(16)}</span>
            </div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--kf-black);">
              ${completedExercisesCount}
            </h4>
            <span style="font-size: 11px; color: var(--kf-text-soft);">
              Movimentos guiados feitos
            </span>
          </div>

          <!-- Card 5: Tempo de Flow -->
          <div class="kf-card" style="padding: 16px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 10.5px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase;">
                TEMPO DE FLOW
              </span>
              <span style="color: var(--kf-lilac-dark);">${Icons.clock(16)}</span>
            </div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--kf-black);">
              ${(() => {
                const h = Math.floor(flowMinutes / 60);
                const m = flowMinutes % 60;
                return h > 0 ? `${String(h).padStart(2, '0')}h${String(m).padStart(2, '0')}` : `${m} min`;
              })()}
            </h4>
            <span style="font-size: 11px; color: var(--kf-text-soft);">
              Tempo dedicado a você
            </span>
          </div>

          <!-- Card 6: Conquistas -->
          <div class="kf-card" style="padding: 16px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 10.5px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase;">
                CONQUISTAS
              </span>
              <span style="color: var(--kf-gold);">${Icons.crown(16)}</span>
            </div>
            <h4 style="font-size: 20px; font-weight: 800; color: var(--kf-black);">
              ${unlockedCount} <span style="font-size: 13px; font-weight: 600; color: var(--kf-text-muted);">/ 8</span>
            </h4>
            <span style="font-size: 11px; color: var(--kf-text-soft);">
              Marcos de consistência
            </span>
          </div>
        </div>

        <!-- Frase Acolhedora sobre Tempo de Flow -->
        ${flowMinutes > 0 ? `
          <div style="text-align: center; padding: 6px 12px; font-size: 12.5px; color: var(--kf-text-muted); font-style: italic;">
            "Você dedicou ${flowMinutes} minutos a você e ao seu corpo."
          </div>
        ` : ''}
      </section>

      <!-- 4. CARD DEDICADO DA SEQUÊNCIA (STREAK - Seção 16) -->
      <div 
        class="kf-card kf-card-streak-dedicated"
        style="
          background: linear-gradient(145deg, #FFFFFF 0%, #FFFDF9 50%, #FAF5EE 100%);
          border: 1px solid rgba(200, 164, 93, 0.45);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        "
      >
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 46px; 
              height: 46px; 
              border-radius: var(--kf-radius-full); 
              background: ${currentStreak > 0 ? 'linear-gradient(135deg, #DFBE7B 0%, var(--kf-gold) 100%)' : 'var(--kf-bg-subtle)'}; 
              color: ${currentStreak > 0 ? '#FFFFFF' : 'var(--kf-text-soft)'}; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              box-shadow: ${currentStreak > 0 ? 'var(--kf-shadow-gold)' : 'none'};
            ">
              ${Icons.flame(24)}
            </div>
            <div>
              <span style="font-size: 11px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
                SEQUÊNCIA ATUAL
              </span>
              <h3 style="font-size: 24px; font-weight: 800; color: var(--kf-black); line-height: 1.2;">
                ${currentStreak} ${currentStreak === 1 ? 'dia' : 'dias'}
              </h3>
            </div>
          </div>

          <span class="kf-badge ${currentStreak > 0 ? 'kf-badge-gold' : 'kf-badge-lilac'}" style="padding: 4px 10px; font-weight: 700;">
            ${currentStreak > 0 ? '🔥 Flow Ativo' : 'Iniciar Hoje'}
          </span>
        </div>

        <p style="font-size: 13px; color: var(--kf-text-muted); line-height: 1.45;">
          ${currentStreak > 0 
            ? 'Você está mantendo seu Flow. A consistência gentil transforma seu corpo.' 
            : 'Comece hoje sua sequência.'}
        </p>

        <div style="padding-top: 12px; border-top: 1px solid rgba(200, 164, 93, 0.25); display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
          <span style="color: var(--kf-text-muted);">Melhor sequência:</span>
          <strong style="color: var(--kf-black); font-weight: 800;">${bestStreak} ${bestStreak === 1 ? 'dia' : 'dias'}</strong>
        </div>
      </div>

      <!-- 5. TIMELINE VISUAL DE EVOLUÇÃO (Seção 6) -->
      <section style="display: flex; flex-direction: column; gap: 14px;">
        ${renderSectionHeader({
          title: 'Sua jornada',
          subtitle: 'Progressão pelas 3 fases da transformação'
        })}

        <div class="kf-card" style="padding: 22px 18px; display: flex; flex-direction: column; gap: 18px;">
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${JOURNEY_PHASES.map((phase, idx) => {
              const phaseDays = JOURNEY_DAYS.filter(d => d.phase === phase.id);
              const phaseCompletedCount = phaseDays.filter(d => completedSet.has(d.day)).length;
              const isPhaseComplete = phaseCompletedCount === phaseDays.length && phaseDays.length > 0;
              const isPhaseActive = !isPhaseComplete && phaseDays.some(d => d.day === currentDay);
              const phasePercent = Math.round((phaseCompletedCount / phaseDays.length) * 100);

              return `
                <div style="display: flex; align-items: flex-start; gap: 14px; position: relative;">
                  <!-- Indicador de Ponto da Linha -->
                  <div style="display: flex; flex-direction: column; align-items: center; width: 32px; flex-shrink: 0;">
                    <div style="
                      width: 32px; 
                      height: 32px; 
                      border-radius: 50%; 
                      background: ${isPhaseComplete ? 'var(--kf-gold)' : (isPhaseActive ? 'var(--kf-lilac-dark)' : 'var(--kf-bg-subtle)')}; 
                      color: ${isPhaseComplete || isPhaseActive ? '#FFFFFF' : 'var(--kf-text-soft)'}; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      font-size: 12px; 
                      font-weight: 800;
                      box-shadow: ${isPhaseComplete ? 'var(--kf-shadow-gold)' : 'none'};
                    ">
                      ${isPhaseComplete ? '✓' : `0${idx + 1}`}
                    </div>
                    ${idx < JOURNEY_PHASES.length - 1 ? `
                      <div style="
                        width: 2px; 
                        height: 36px; 
                        background: ${isPhaseComplete ? 'var(--kf-gold)' : 'var(--kf-border-subtle)'}; 
                        margin-top: 4px;
                      "></div>
                    ` : ''}
                  </div>

                  <!-- Conteúdo da Fase -->
                  <div style="flex: 1; display: flex; flex-direction: column; gap: 3px;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <span style="font-size: 11px; font-weight: 700; color: ${isPhaseComplete ? 'var(--kf-gold)' : 'var(--kf-lilac-dark)'}; text-transform: uppercase; letter-spacing: 0.05em;">
                        FASE 0${phase.id}
                      </span>
                      <span style="font-size: 11px; font-weight: 600; color: var(--kf-text-soft);">
                        ${phaseCompletedCount}/${phaseDays.length} dias
                      </span>
                    </div>

                    <h4 style="font-size: 13.5px; font-weight: 700; color: var(--kf-black);">
                      ${phase.title}
                    </h4>

                    <!-- Barra de Progresso da Fase -->
                    <div style="width: 100%; height: 5px; border-radius: 999px; background: var(--kf-bg-subtle); overflow: hidden; margin-top: 4px;">
                      <div style="width: ${phasePercent}%; height: 100%; border-radius: 999px; background: ${isPhaseComplete ? 'var(--kf-gold)' : 'var(--kf-lilac-dark)'}; transition: width 0.4s ease;"></div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 6. CALENDÁRIO / GRID DOS 21 DIAS POR FASES (Seção 5) -->
      <section style="display: flex; flex-direction: column; gap: 14px;">
        ${renderSectionHeader({
          title: 'Mapa dos 21 Dias',
          subtitle: `${completedCount} de 21 práticas realizadas • Toque para abrir`
        })}

        <div class="kf-card" style="padding: 20px; display: flex; flex-direction: column; gap: 18px;">
          ${JOURNEY_PHASES.map(phase => {
            const phaseDays = JOURNEY_DAYS.filter(d => d.phase === phase.id);

            return `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid var(--kf-border-subtle);">
                  <span style="font-size: 11px; font-weight: 700; color: var(--kf-lilac-dark); text-transform: uppercase; letter-spacing: 0.04em;">
                    ${phase.name} • ${phase.title}
                  </span>
                  <span style="font-size: 10.5px; color: var(--kf-text-soft);">
                    Dias ${phaseDays[0].day} a ${phaseDays[phaseDays.length - 1].day}
                  </span>
                </div>

                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center;">
                  ${phaseDays.map(item => {
                    const day = item.day;
                    const isDone = completedSet.has(day);
                    const isCurrent = day === currentDay;
                    const isAvailable = isDone || day <= currentDay;

                    let bg = 'var(--kf-bg-subtle)';
                    let textColor = 'var(--kf-text-soft)';
                    let border = '1px solid transparent';
                    let statusLabel = 'FUTURO';

                    if (isDone) {
                      bg = 'var(--kf-lilac-dark)';
                      textColor = '#FFFFFF';
                      border = '1px solid var(--kf-lilac-dark)';
                      statusLabel = 'CONCLUÍDO';
                    } else if (isCurrent) {
                      bg = 'var(--kf-lilac-light)';
                      textColor = 'var(--kf-lilac-dark)';
                      border = '2px solid var(--kf-lilac-dark)';
                      statusLabel = 'ATUAL';
                    } else if (isAvailable) {
                      bg = '#FFFFFF';
                      textColor = 'var(--kf-black)';
                      border = '1px solid var(--kf-border-subtle)';
                      statusLabel = 'DISPONÍVEL';
                    }

                    const dayDisplay = day < 10 ? `0${day}` : `${day}`;

                    return `
                      <div 
                        class="kf-day-dot ${isCurrent ? 'kf-day-dot-current' : ''}"
                        data-action="open-practice"
                        data-day="${day}"
                        title="Dia ${day}: ${item.title} (${statusLabel})"
                        style="
                          aspect-ratio: 1; 
                          border-radius: 50%; 
                          background: ${bg}; 
                          color: ${textColor}; 
                          border: ${border}; 
                          display: flex; 
                          align-items: center; 
                          justify-content: center; 
                          font-size: 11px; 
                          font-weight: 700; 
                          cursor: pointer;
                          user-select: none;
                          transition: transform 0.15s ease, box-shadow 0.15s ease;
                        "
                      >
                        ${isDone ? '✓' : dayDisplay}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- 7. CHECK-IN DIÁRIO DE BEM-ESTAR & HISTÓRICO (Seção 8) -->
      <section style="display: flex; flex-direction: column; gap: 14px;">
        ${renderMoodCheckinCard(state)}

        <!-- Histórico Recente de Check-ins -->
        ${recentMoods.length > 0 ? `
          <div class="kf-card" style="padding: 16px 18px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase; letter-spacing: 0.04em;">
                Seu histórico de bem-estar
              </span>
              <span style="font-size: 11px; color: var(--kf-text-soft);">
                Últimos registros
              </span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${recentMoods.map(entry => {
                const conf = moodLabels[entry.mood] || { label: entry.mood, icon: '☺', color: 'var(--kf-lilac-dark)' };
                const parts = (entry.date || '').split('-');
                const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}` : entry.date;

                return `
                  <div style="display: flex; flex-direction: column; gap: 4px; padding: 8px 0; border-bottom: 1px solid var(--kf-border-subtle);">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 16px;">${conf.icon}</span>
                        <span style="font-size: 13px; font-weight: 600; color: var(--kf-black);">
                          Sentindo-se ${conf.label}
                        </span>
                      </div>
                      <span style="font-size: 11.5px; font-weight: 600; color: var(--kf-text-soft);">
                        ${formattedDate}
                      </span>
                    </div>
                    ${entry.note ? `
                      <p style="font-size: 12px; color: var(--kf-text-muted); margin: 2px 0 0 24px; font-style: italic; line-height: 1.4;">
                        "${entry.note}"
                      </p>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : `
          <div class="kf-card" style="padding: 18px 20px; text-align: center; border-radius: var(--kf-radius-card); border: 1px dashed var(--kf-border-subtle); background: #FFFFFF;">
            <span style="font-size: 20px; display: block; margin-bottom: 6px;">🌿</span>
            <p style="font-size: 13px; color: var(--kf-text-muted); line-height: 1.5; margin: 0;">
              Você ainda não possui check-ins registrados. Registre acima como você está se sentindo hoje para construir seu histórico de bem-estar ao longo da jornada.
            </p>
          </div>
        `}
      </section>

      <!-- 8. MURAL COM AS 8 CONQUISTAS (Seção 7) -->
      <section style="display: flex; flex-direction: column; gap: 14px;">
        ${renderSectionHeader({
          title: 'Conquistas Korean Flow',
          subtitle: `${unlockedCount} de 8 marcos desbloqueados • Toque para ver`
        })}

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          ${ACHIEVEMENTS_DATA.map(ach => {
            const isUnlocked = unlockedSet.has(ach.id);
            return renderAchievementCard(ach, isUnlocked);
          }).join('')}
        </div>
      </section>

    </div>
  `;
}
