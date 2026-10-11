/**
 * COMPONENTE: StatCard
 * Card minimalista de estatísticas com número em destaque e legenda sofisticada
 */

export function renderStatCard({ title, value, unit = '', icon = '', subtext = '' }) {
  return `
    <div class="kf-card" style="padding: 16px 14px; display: flex; flex-direction: column; gap: 8px; justify-content: space-between; border-radius: var(--kf-radius-md);">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--kf-text-muted);">
          ${title}
        </span>
        ${icon ? `<span style="color: var(--kf-lilac-dark); display: flex;">${icon}</span>` : ''}
      </div>

      <div style="display: flex; align-items: baseline; gap: 4px;">
        <span style="font-size: 26px; font-weight: 800; line-height: 1; letter-spacing: -0.03em; color: var(--kf-black);">
          ${value}
        </span>
        ${unit ? `<span style="font-size: 12px; font-weight: 600; color: var(--kf-text-muted);">${unit}</span>` : ''}
      </div>

      ${subtext ? `
        <span style="font-size: 11px; color: var(--kf-text-soft); line-height: 1.2;">
          ${subtext}
        </span>
      ` : ''}
    </div>
  `;
}
