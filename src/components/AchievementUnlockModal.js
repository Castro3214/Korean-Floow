/**
 * COMPONENTE: AchievementUnlockModal
 * Modal comemorativo e discreto para desbloqueio de novas conquistas
 * Microanimação comemorativa e fechamento com 'CONTINUAR'
 */

import { Icons } from './Icons.js';

export function renderAchievementUnlockModal(achievement) {
  if (!achievement) return '';

  return `
    <div 
      class="kf-modal-backdrop open" 
      id="achievement-unlock-modal-backdrop"
      style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(23, 21, 23, 0.68);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
        animation: kfFadeIn 0.25s ease-out;
      "
    >
      <div 
        class="kf-card kf-achievement-modal-card"
        style="
          width: 100%;
          max-width: 360px;
          background: linear-gradient(155deg, #FFFFFF 0%, #FFFDF8 60%, #FAF5EE 100%);
          border: 1.5px solid rgba(200, 164, 93, 0.5);
          box-shadow: 0 20px 50px -10px rgba(200, 164, 93, 0.35);
          border-radius: 28px;
          padding: 32px 24px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          animation: kfScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        "
      >
        <!-- Badge Superior -->
        <span 
          class="kf-badge kf-badge-gold"
          style="
            font-size: 11px;
            font-weight: 800;
            padding: 5px 14px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            box-shadow: 0 2px 10px rgba(200, 164, 93, 0.25);
          "
        >
          ✨ NOVA CONQUISTA
        </span>

        <!-- Círculo Central com Microanimação Dourada -->
        <div 
          class="kf-achievement-circle-glow"
          style="
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #DFBE7B 0%, var(--kf-gold) 100%);
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 28px rgba(200, 164, 93, 0.5);
            margin: 6px 0;
            animation: kfPulseGlow 2s infinite ease-in-out;
          "
        >
          ${Icons.crown(38)}
        </div>

        <!-- Textos de Conquista -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <h3 style="font-size: 20px; font-weight: 800; color: var(--kf-black); letter-spacing: -0.02em;">
            ${achievement.title}
          </h3>
          <p style="font-size: 13.5px; color: var(--kf-text-muted); line-height: 1.45; font-style: italic;">
            "${achievement.modalMessage || achievement.description}"
          </p>
        </div>

        <!-- Requisito Cumprido -->
        <div 
          style="
            background: rgba(200, 164, 93, 0.1);
            border: 1px dashed rgba(200, 164, 93, 0.4);
            border-radius: 12px;
            padding: 8px 16px;
            font-size: 11.5px;
            font-weight: 700;
            color: #8C7036;
          "
        >
          ✓ ${achievement.requirement}
        </div>

        <!-- Botão CONTINUAR -->
        <button 
          class="kf-btn kf-btn-primary"
          id="btn-close-achievement-modal"
          data-action="close-achievement-modal"
          style="
            width: 100%;
            margin-top: 6px;
            padding: 14px;
            font-size: 14px;
            font-weight: 800;
            letter-spacing: 0.04em;
            background: linear-gradient(135deg, #2D2738 0%, #1A1721 100%);
            color: #FFFFFF;
            border: none;
            border-radius: 999px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(26, 23, 33, 0.25);
            transition: transform 0.2s, box-shadow 0.2s;
          "
        >
          CONTINUAR
        </button>
      </div>
    </div>
  `;
}
