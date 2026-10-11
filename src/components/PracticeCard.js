/**
 * COMPONENTE: PracticeCard
 * Card refinado para a prática do dia e cards da jornada de 21 dias:
 * - Destaque tipográfico para o número do dia (01, 02, etc.)
 * - Título, subtítulo, duração e categoria
 * - Status pills: CONCLUÍDO, DISPONÍVEL, BLOQUEADO
 * - Botão de ação (Começar / Rever)
 */

import { Icons } from './Icons.js';
import { renderButton } from './Button.js';

export function renderPracticeCard(practice, options = {}) {
  const { isToday = false, isCompleted = false, isLocked = false } = options;
  const dayPadded = String(practice.day || practice.id).padStart(2, '0');

  // Determinar status pill
  let statusBadgeHtml = '';
  if (isCompleted) {
    statusBadgeHtml = `
      <span class="kf-badge" style="background: rgba(46, 125, 50, 0.1); color: #2E7D32; font-weight: 700; font-size: 10.5px; letter-spacing: 0.04em;">
        ✓ CONCLUÍDO
      </span>
    `;
  } else if (isLocked) {
    statusBadgeHtml = `
      <span class="kf-badge" style="background: rgba(0, 0, 0, 0.05); color: var(--kf-text-soft); font-weight: 600; font-size: 10.5px; letter-spacing: 0.04em;">
        🔒 BLOQUEADO
      </span>
    `;
  } else {
    statusBadgeHtml = `
      <span class="kf-badge kf-badge-lilac" style="font-weight: 700; font-size: 10.5px; letter-spacing: 0.04em;">
        DISPONÍVEL
      </span>
    `;
  }

  return `
    <div 
      class="kf-card ${isToday ? 'kf-card-lilac' : ''} ${isCompleted ? 'kf-card-completed' : ''}" 
      data-action="open-practice"
      data-day="${practice.day}"
      style="
        display: flex; 
        flex-direction: column; 
        gap: 12px; 
        cursor: pointer;
        transition: all 0.2s ease;
        ${isCompleted ? 'border-color: rgba(92, 163, 123, 0.35); background: linear-gradient(145deg, #FFFFFF 0%, #F6FAF7 100%);' : ''}
      "
    >
      <!-- Cabeçalho do Card: Número do Dia + Badges de Status e Categoria -->
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <!-- Número Grande e Elegante -->
          <div style="
            width: 42px; 
            height: 42px; 
            border-radius: var(--kf-radius-sm); 
            background: ${isCompleted ? 'rgba(46, 125, 50, 0.12)' : isToday ? 'var(--kf-lilac-dark)' : 'var(--kf-lilac-light)'}; 
            color: ${isCompleted ? '#2E7D32' : isToday ? '#FFFFFF' : 'var(--kf-lilac-dark)'}; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 17px; 
            font-weight: 800;
            flex-shrink: 0;
            letter-spacing: -0.02em;
          ">
            ${isCompleted ? Icons.check(18) : dayPadded}
          </div>

          <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              ${statusBadgeHtml}
              <span class="kf-badge kf-badge-white" style="border: 1px solid var(--kf-border-subtle); font-size: 10.5px; color: var(--kf-lilac-dark);">
                ${practice.category}
              </span>
            </div>
            <h3 class="kf-title-md" style="margin-top: 3px; font-weight: 700; font-size: 15.5px; color: var(--kf-black); line-height: 1.3;">
              ${practice.title}
            </h3>
          </div>
        </div>

        <!-- Indicador circular sutil ou seta -->
        <div style="
          width: 32px; 
          height: 32px; 
          border-radius: 50%; 
          background: ${isToday ? 'var(--kf-lilac-light)' : 'transparent'}; 
          color: ${isToday ? 'var(--kf-lilac-dark)' : 'var(--kf-text-soft)'}; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          flex-shrink: 0;
        ">
          ${Icons.arrowRight(16)}
        </div>
      </div>

      <!-- Subtítulo ou Descrição Breve -->
      <p class="kf-body-base" style="font-size: 12.5px; line-height: 1.45; color: var(--kf-text-muted);">
        ${practice.subtitle || practice.description}
      </p>

      <!-- Rodapé do Card: Duração, Nível e Botão de Ação -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 6px; border-top: 1px solid rgba(201, 184, 220, 0.25);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--kf-text-muted); font-weight: 500;">
            ${Icons.clock(12)} ${practice.duration}
          </span>
          <span style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--kf-lilac-dark); font-weight: 600;">
            ${practice.level}
          </span>
        </div>

        ${renderButton({
          text: isCompleted ? 'Rever' : 'Começar',
          variant: isCompleted ? 'outline' : isToday ? 'primary' : 'secondary',
          icon: isCompleted ? '' : Icons.arrowRight(13),
          className: 'kf-btn-sm',
          style: 'padding: 6px 14px; font-size: 12px; border-radius: 9999px;',
          dataAttributes: `data-action="open-practice" data-day="${practice.day}"`
        })}
      </div>
    </div>
  `;
}
