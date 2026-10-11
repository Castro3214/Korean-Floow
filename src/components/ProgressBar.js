/**
 * COMPONENTE: ProgressBar
 * Barra de progresso com cantos arredondados e transição suave
 */

export function renderProgressBar(percentage = 0, options = {}) {
  const clamped = Math.min(100, Math.max(0, Math.round(percentage)));
  const { height = '8px', showLabel = false, label = '' } = options;

  return `
    <div class="kf-progress-container" style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
      ${showLabel ? `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="kf-body-sm" style="color: var(--kf-text-muted); font-weight: 500;">${label}</span>
          <span class="kf-body-sm" style="color: var(--kf-lilac-dark); font-weight: 700;">${clamped}%</span>
        </div>
      ` : ''}
      <div class="kf-progress-track" style="height: ${height};">
        <div class="kf-progress-fill" style="width: ${clamped}%;"></div>
      </div>
    </div>
  `;
}
