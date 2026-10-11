/**
 * COMPONENTE: SectionHeader
 * Título de seção com subtítulo leve ou link de ação opcional
 */

export function renderSectionHeader({ title, subtitle = '', actionText = '', actionTarget = '' }) {
  return `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: -4px;">
      <div style="display: flex; flex-direction: column; gap: 2px;">
        <h2 class="kf-title-lg" style="font-size: 18px; font-weight: 700; color: var(--kf-black);">
          ${title}
        </h2>
        ${subtitle ? `
          <p class="kf-body-sm" style="color: var(--kf-text-muted);">
            ${subtitle}
          </p>
        ` : ''}
      </div>

      ${actionText ? `
        <button 
          type="button" 
          class="kf-link-btn" 
          data-tab="${actionTarget}" 
          style="
            background: none; 
            border: none; 
            color: var(--kf-lilac-dark); 
            font-size: 12.5px; 
            font-weight: 700; 
            cursor: pointer; 
            padding: 4px;
          "
        >
          ${actionText}
        </button>
      ` : ''}
    </div>
  `;
}
