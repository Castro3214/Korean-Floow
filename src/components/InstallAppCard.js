/**
 * COMPONENTE: InstallAppCard
 * Card elegante que convida o usuário a adicionar o Korean Flow à tela inicial do celular
 * ou exibe mensagem de confirmação caso já esteja instalado no modo standalone.
 */

import { Icons } from './Icons.js';
import { isAppStandalone } from '../state/store.js';

export function renderInstallAppCard(options = {}) {
  const isStandalone = options.isStandalone !== undefined 
    ? options.isStandalone 
    : isAppStandalone();

  // Caso já esteja em modo standalone (PWA instalado)
  if (isStandalone) {
    return `
      <section 
        class="kf-card kf-install-card-standalone"
        aria-label="Status do aplicativo instalado"
        style="
          background: linear-gradient(135deg, #FFFFFF 0%, #FAF8FC 100%);
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-card);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: var(--kf-shadow-subtle);
        "
      >
        <div style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--kf-lilac-light);
          color: var(--kf-lilac-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        ">
          ${Icons.checkCircle(20)}
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <span style="
            font-size: 13.5px;
            font-weight: 700;
            color: var(--kf-black);
            font-family: var(--kf-font-heading);
          ">
            Seu Korean Flow está pronto para acompanhar você.
          </span>
          <span style="
            font-size: 11.5px;
            color: var(--kf-text-soft);
          ">
            Aplicativo ativo na sua tela inicial com acesso rápido.
          </span>
        </div>
      </section>
    `;
  }

  // Card padrão de convite para adicionar à tela inicial
  return `
    <section 
      class="kf-card kf-install-card"
      aria-label="Adicione à tela inicial"
      style="
        background: linear-gradient(145deg, #FFFFFF 0%, #FAF7FD 100%);
        border: 1px solid var(--kf-border-subtle);
        border-radius: var(--kf-radius-card);
        padding: 20px 20px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        box-shadow: var(--kf-shadow-card);
        position: relative;
        overflow: hidden;
      "
    >
      <!-- Detalhe decorativo sutil lilás de fundo -->
      <div style="
        position: absolute;
        top: -24px;
        right: -24px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(201, 184, 220, 0.25) 0%, rgba(201, 184, 220, 0) 70%);
        pointer-events: none;
      "></div>

      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="
            width: 44px;
            height: 44px;
            border-radius: var(--kf-radius-sm);
            background: linear-gradient(135deg, var(--kf-lilac-light) 0%, #E2D7EE 100%);
            color: var(--kf-lilac-dark);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(143, 120, 168, 0.12);
          ">
            ${Icons.smartphone(22)}
          </div>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="kf-badge" style="
                background: rgba(200, 164, 93, 0.12);
                color: var(--kf-gold);
                font-size: 10px;
                font-weight: 700;
                padding: 2px 7px;
                border-radius: var(--kf-radius-full);
                letter-spacing: 0.04em;
              ">ACESSO RÁPIDO</span>
            </div>
            <h3 style="
              font-size: 16px;
              font-weight: 700;
              color: var(--kf-black);
              font-family: var(--kf-font-heading);
              margin: 0;
              letter-spacing: -0.01em;
            ">
              Tenha o Korean Flow sempre com você
            </h3>
          </div>
        </div>
      </div>

      <p style="
        font-size: 13px;
        line-height: 1.55;
        color: var(--kf-text-secondary);
        margin: 0;
      ">
        Adicione o Korean Flow à tela inicial do seu celular e acesse sua jornada com apenas um toque.
      </p>

      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 2px; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 6px; color: var(--kf-text-soft); font-size: 11.5px;">
          <span>iOS</span>
          <span>•</span>
          <span>Android</span>
          <span>•</span>
          <span>Sem baixar lojas</span>
        </div>

        <button
          type="button"
          class="kf-btn-install-trigger"
          data-action="open-install-modal"
          style="
            background: var(--kf-lilac-dark);
            color: #FFFFFF;
            border: none;
            border-radius: var(--kf-radius-btn);
            padding: 10px 18px;
            font-size: 12.5px;
            font-weight: 700;
            letter-spacing: 0.02em;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 14px rgba(143, 120, 168, 0.25);
            transition: all var(--kf-transition-fast);
            white-space: nowrap;
          "
        >
          <span>COMO INSTALAR</span>
          ${Icons.arrowRight(12)}
        </button>
      </div>
    </section>
  `;
}
