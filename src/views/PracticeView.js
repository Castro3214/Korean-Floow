/**
 * TELA: PracticeView (PRÁTICA)
 * Jornada completa dos 21 dias do Método Korean Flow:
 * - Cabeçalho: "21 dias de movimento e presença"
 * - Filtros rápidos: TODOS, PILATES, MOBILIDADE, RESPIRAÇÃO
 * - 3 Fases estruturadas do método
 * - Cards elegantes com status (CONCLUÍDO, DISPONÍVEL, BLOQUEADO)
 */

import { JOURNEY_DAYS, JOURNEY_PHASES } from '../data/journeyData.js';
import { renderPracticeCard } from '../components/PracticeCard.js';
import { Icons } from '../components/Icons.js';

export function renderPracticeView(state, selectedCategory = 'all') {
  const completedDays = new Set(state.completedDays || []);
  const currentDay = state.currentDay || 1;

  const categories = [
    { id: 'all', label: 'TODOS' },
    { id: 'Pilates', label: 'PILATES' },
    { id: 'Mobilidade', label: 'MOBILIDADE' },
    { id: 'Respiração', label: 'RESPIRAÇÃO' }
  ];

  return `
    <div class="kf-view kf-practice-view" style="display: flex; flex-direction: column; gap: 22px;">
      <!-- Cabeçalho da Tela -->
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span class="kf-caption-korean" style="display: flex; align-items: center; gap: 5px;">
          ${Icons.lotus(12)} 한국의 흐름 • MÉTODO KOREAN FLOW
        </span>
        <h1 class="kf-title-xl" style="font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">
          21 Dias de Movimento e Presença
        </h1>
        <p class="kf-body-base" style="font-size: 13.5px; color: var(--kf-text-muted); line-height: 1.5;">
          Pilates, mobilidade e consciência corporal inspirados na delicadeza e na postura do lifestyle coreano.
        </p>
      </div>

      <!-- Filtros Rápidos por Categoria -->
      <div 
        class="kf-category-filter-bar" 
        style="
          display: flex; 
          gap: 8px; 
          overflow-x: auto; 
          padding-bottom: 4px;
          margin: 0 -4px;
          scrollbar-width: none;
        "
      >
        ${categories.map(cat => {
          const isSelected = (selectedCategory || 'all') === cat.id;
          return `
            <button 
              type="button" 
              class="kf-category-pill" 
              data-category="${cat.id}"
              style="
                white-space: nowrap; 
                padding: 7px 16px; 
                border-radius: var(--kf-radius-full); 
                font-size: 12px; 
                font-weight: ${isSelected ? '800' : '600'}; 
                letter-spacing: 0.04em;
                background: ${isSelected ? 'var(--kf-lilac-dark)' : 'var(--kf-bg-card)'}; 
                color: ${isSelected ? '#FFFFFF' : 'var(--kf-text-muted)'}; 
                border: 1px solid ${isSelected ? 'var(--kf-lilac-dark)' : 'var(--kf-border-subtle)'}; 
                cursor: pointer;
                transition: all 0.2s;
              "
            >
              ${cat.label}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Lista de Fases e Dias da Jornada -->
      <div style="display: flex; flex-direction: column; gap: 30px;">
        ${JOURNEY_PHASES.map(phase => {
          const phaseDays = JOURNEY_DAYS.filter(d => {
            const matchesPhase = d.phase === phase.id;
            const matchesCategory = selectedCategory === 'all' || 
              (d.category && d.category.toLowerCase().includes(selectedCategory.toLowerCase()));
            return matchesPhase && matchesCategory;
          });

          if (phaseDays.length === 0) return '';

          // Estatística de conclusão da fase
          const phaseCompletedCount = phaseDays.filter(d => completedDays.has(d.day)).length;
          const phaseTotal = phaseDays.length;

          return `
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <!-- Cabeçalho da Fase -->
              <div style="
                padding: 16px; 
                background: linear-gradient(135deg, #FAF7FD 0%, #FFFFFF 100%); 
                border-radius: var(--kf-radius-md); 
                border: 1px solid rgba(201, 184, 220, 0.4);
                border-left: 4px solid ${phase.color || 'var(--kf-lilac-primary)'};
                display: flex;
                flex-direction: column;
                gap: 4px;
              ">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--kf-lilac-dark); letter-spacing: 0.06em;">
                    FASE ${phase.id} • ${phase.week}
                  </span>
                  <span style="font-size: 11.5px; font-weight: 700; color: ${phaseCompletedCount === phaseTotal ? '#2E7D32' : 'var(--kf-text-soft)'};">
                    ${phaseCompletedCount}/${phaseTotal} concluídos
                  </span>
                </div>
                <h3 style="font-size: 16px; font-weight: 800; color: var(--kf-black); letter-spacing: -0.01em;">
                  ${phase.title}
                </h3>
                <p style="font-size: 12px; color: var(--kf-text-muted); line-height: 1.45;">
                  ${phase.subtitle}
                </p>
              </div>

              <!-- Cards dos Dias da Fase -->
              <div style="display: flex; flex-direction: column; gap: 12px;">
                ${phaseDays.map(practice => {
                  const isCompleted = completedDays.has(practice.day);
                  const isCurrent = practice.day === currentDay;

                  return renderPracticeCard(practice, {
                    isToday: isCurrent,
                    isCompleted: isCompleted,
                    isLocked: false // Dias disponíveis por padrão no MVP
                  });
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
