/**
 * COMPONENTE: ResetConfirmModal
 * Modal de confirmação seguro antes de zerar a jornada (Seção 19)
 * Opções: CANCELAR e RECOMEÇAR
 */

import { Icons } from './Icons.js';

export function renderResetConfirmModal(isOpen = false) {
  if (!isOpen) return '';

  return `
    <div 
      class="kf-modal-backdrop open" 
      id="reset-confirm-modal-backdrop"
      style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(23, 21, 23, 0.65);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1100;
        padding: 20px;
        animation: kfFadeIn 0.25s ease-out;
      "
    >
      <div 
        class="kf-card"
        style="
          width: 100%;
          max-width: 360px;
          background: #FFFFFF;
          border-radius: 24px;
          padding: 28px 22px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          animation: kfScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
        "
      >
        <!-- Ícone de Alerta Serena -->
        <div style="
          width: 56px; 
          height: 56px; 
          border-radius: 50%; 
          background: #FDF2F2; 
          color: #D9534F; 
          display: flex; 
          align-items: center; 
          justify-content: center;
        ">
          ${Icons.flame(28)}
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <h3 style="font-size: 19px; font-weight: 800; color: var(--kf-black); letter-spacing: -0.01em; font-family: var(--kf-font-heading);">
            Reiniciar jornada?
          </h3>
          <p style="font-size: 13px; color: var(--kf-text-muted); line-height: 1.5;">
            Isso apagará seu progresso atual neste dispositivo. Seu nome e perfil continuarão salvos.
          </p>
        </div>

        <!-- Ações do Modal (Seção 30) -->
        <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: 6px;">
          <button 
            type="button" 
            class="kf-btn"
            id="btn-confirm-reset"
            style="
              width: 100%; 
              padding: 14px; 
              background: #C94A4A; 
              color: #FFFFFF; 
              border: none; 
              border-radius: var(--kf-radius-btn); 
              font-weight: 700; 
              font-size: 13.5px; 
              letter-spacing: 0.02em;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(201, 74, 74, 0.25);
            "
          >
            Reiniciar jornada
          </button>

          <button 
            type="button" 
            class="kf-btn kf-btn-secondary"
            id="btn-cancel-reset"
            style="
              width: 100%; 
              padding: 13px; 
              font-size: 13.5px; 
              font-weight: 700;
              background: var(--kf-bg-subtle);
              color: var(--kf-text-muted);
              border: 1px solid var(--kf-border-subtle);
              border-radius: var(--kf-radius-btn);
              cursor: pointer;
            "
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  `;
}
