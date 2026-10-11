/**
 * COMPONENTE: MoodCheckinCard
 * Check-in diário de bem-estar (Fase 6 - Seção 18)
 * 4 humores: Muito bem (😌), Bem (🙂), Normal (😐), Preciso desacelerar (🌿)
 * Campo opcional: "Quer registrar alguma coisa?"
 */

import { Icons } from './Icons.js';

export const MOODS = [
  { key: 'muito_bem', label: 'Muito bem', icon: '😌' },
  { key: 'bem', label: 'Bem', icon: '🙂' },
  { key: 'normal', label: 'Normal', icon: '😐' },
  { key: 'desacelerar', label: 'Preciso desacelerar', icon: '🌿' }
];

export function renderMoodCheckinCard(todayCheckin = null) {
  const currentMood = todayCheckin?.mood || null;
  const currentNote = todayCheckin?.note || '';

  return `
    <div 
      class="kf-card kf-mood-checkin-card"
      style="
        background: linear-gradient(150deg, #FFFFFF 0%, #FAF6FD 100%);
        border: 1px solid var(--kf-border-subtle);
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-radius: var(--kf-radius-card);
        box-shadow: var(--kf-shadow-card);
      "
    >
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: var(--kf-lilac-dark); display: flex; align-items: center;">
            ${Icons.heart(16)}
          </span>
          <h3 style="font-size: 15px; font-weight: 700; color: var(--kf-black); font-family: var(--kf-font-heading); letter-spacing: -0.01em;">
            Como você se sentiu hoje?
          </h3>
        </div>

        ${currentMood ? `
          <span class="kf-badge kf-badge-lilac" style="font-size: 10px; padding: 3px 9px; font-weight: 600;">
            ✓ Registrado
          </span>
        ` : `
          <span class="kf-badge kf-badge-white" style="font-size: 10px; padding: 3px 9px; color: var(--kf-text-soft);">
            Ritual Diário
          </span>
        `}
      </div>

      <p style="font-size: 13px; color: var(--kf-text-muted); line-height: 1.45;">
        Um momento para reconhecer seu estado com gentileza e sem cobranças.
      </p>

      <!-- Grade dos 4 Estados Emocionais -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
        ${MOODS.map(m => {
          const isSelected = currentMood === m.key || (m.key === 'muito_bem' && (currentMood === 'tranquilo' || currentMood === 'leve')) || (m.key === 'normal' && currentMood === 'neutro');
          return `
            <button
              type="button"
              class="kf-mood-btn ${isSelected ? 'selected' : ''}"
              data-action="set-mood"
              data-mood="${m.key}"
              title="${m.label}"
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 12px 4px;
                border-radius: var(--kf-radius-sm);
                border: 1.5px solid ${isSelected ? 'var(--kf-lilac-dark)' : 'var(--kf-border-subtle)'};
                background: ${isSelected ? 'linear-gradient(145deg, #FFFFFF 0%, var(--kf-lilac-light) 100%)' : '#FFFFFF'};
                color: ${isSelected ? 'var(--kf-lilac-dark)' : 'var(--kf-text-muted)'};
                cursor: pointer;
                transition: all var(--kf-transition-fast);
                box-shadow: ${isSelected ? '0 4px 12px rgba(143, 120, 168, 0.18)' : 'none'};
                outline: none;
                min-width: 0;
              "
            >
              <span style="font-size: 22px; line-height: 1;">${m.icon}</span>
              <span style="font-size: 10.5px; font-weight: ${isSelected ? '700' : '500'}; text-align: center; line-height: 1.2;">${m.label}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Campo Opcional de Registro / Reflexão -->
      <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 2px;">
        <label for="kf-checkin-note-input" style="font-size: 11.5px; font-weight: 600; color: var(--kf-text-secondary); display: flex; align-items: center; gap: 4px;">
          Quer registrar alguma coisa? <span style="font-weight: 400; color: var(--kf-text-soft);">(opcional)</span>
        </label>
        <div style="display: flex; gap: 8px; align-items: center;">
          <input
            type="text"
            id="kf-checkin-note-input"
            maxlength="120"
            value="${escapeHtml(currentNote)}"
            placeholder="Ex: Prática suave, mente tranquila..."
            style="
              flex: 1;
              padding: 9px 12px;
              border-radius: var(--kf-radius-sm);
              border: 1px solid var(--kf-border-subtle);
              background: #FFFFFF;
              font-family: var(--kf-font-main);
              font-size: 12.5px;
              color: var(--kf-black);
              outline: none;
              transition: border-color var(--kf-transition-fast);
            "
          />
          <button
            type="button"
            id="kf-btn-save-note"
            data-action="save-checkin-note"
            class="kf-btn kf-btn-secondary"
            title="Salvar reflexão"
            style="
              padding: 9px 14px;
              font-size: 12px;
              border-radius: var(--kf-radius-sm);
              white-space: nowrap;
            "
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}