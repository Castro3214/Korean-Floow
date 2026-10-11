/**
 * COMPONENTE: Header
 * Exibe a saudação calorosa e elegante "Olá, [NOME]" e o avatar circular
 */

import { Icons } from './Icons.js';

export function renderHeader({ userName, onAvatarClick }) {
  const initial = (userName && userName.length > 0) ? userName.charAt(0).toUpperCase() : 'S';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : (hour < 18 ? 'Boa tarde' : 'Boa noite');

  return `
    <header class="kf-header" style="display: flex; align-items: center; justify-content: space-between; padding: 4px 0 8px;">
      <div style="display: flex; flex-direction: column; gap: 3px;">
        <span class="kf-caption-korean" style="display: flex; align-items: center; gap: 5px;">
          ${Icons.lotus(13)} MÉTODO KOREAN FLOW
        </span>
        <h1 class="kf-title-xl" style="font-weight: 800; letter-spacing: -0.03em;">
          ${greeting}, ${escapeHtml(userName || 'Sofia')}.
        </h1>
        <p class="kf-body-base" style="color: var(--kf-text-muted); font-size: 14px; font-weight: 500;">
          Vamos continuar seu Flow?
        </p>
      </div>

      <div class="kf-avatar" id="header-user-avatar" title="Ver Perfil" style="border: 2px solid var(--kf-lilac-primary);">
        <span>${initial}</span>
      </div>
    </header>
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
