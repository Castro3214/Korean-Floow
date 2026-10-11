/**
 * COMPONENTE: InstallAppModal
 * Modal / Bottom Sheet interativo para orientar os usuários a adicionarem
 * o Korean Flow à tela inicial no iPhone (iOS / Safari) e no Android (Chrome).
 */

import { Icons } from './Icons.js';

export function renderInstallAppModal(options = {}) {
  const {
    isOpen = false,
    activePlatform = 'ios', // 'ios' | 'android'
    canPromptNative = false // se window.__deferredPwaPrompt está disponível
  } = options;

  if (!isOpen) return '';

  return `
    <div 
      class="kf-modal-backdrop open" 
      id="install-modal-backdrop" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="install-modal-title"
    >
      <div class="kf-modal-sheet kf-install-modal-sheet" id="install-modal-sheet">
        <!-- Barra de arraste sutil no topo do sheet -->
        <div class="kf-modal-handle"></div>

        <!-- Cabeçalho do Modal -->
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="kf-badge kf-badge-lilac" style="font-size: 10px; font-weight: 700; padding: 2px 8px;">
                ATALHO INTELIGENTE
              </span>
              <span class="kf-caption-korean" style="font-size: 10.5px; color: var(--kf-lilac-dark);">
                홈 화면 추가
              </span>
            </div>
            <h2 
              id="install-modal-title" 
              style="
                font-size: 20px; 
                font-weight: 800; 
                color: var(--kf-black); 
                font-family: var(--kf-font-heading);
                margin: 0;
                letter-spacing: -0.02em;
              "
            >
              Leve seu Flow para a tela inicial
            </h2>
          </div>

          <button 
            type="button" 
            class="kf-modal-close-btn" 
            data-action="close-install-modal" 
            aria-label="Fechar instruções de instalação"
            style="
              width: 36px;
              height: 36px;
              border-radius: 50%;
              border: 1px solid var(--kf-border-subtle);
              background: var(--kf-bg-subtle);
              color: var(--kf-text-secondary);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all var(--kf-transition-fast);
              flex-shrink: 0;
            "
          >
            ${Icons.close(18)}
          </button>
        </div>

        <p style="
          font-size: 13px; 
          line-height: 1.55; 
          color: var(--kf-text-secondary); 
          margin: 0;
        ">
          Configure o acesso rápido no seu celular e encontre o Korean Flow sempre que quiser continuar sua jornada.
        </p>

        <!-- Segmented Control de Plataforma (iPhone vs Android) -->
        <div 
          class="kf-platform-tabs"
          role="tablist"
          aria-label="Selecione o sistema do seu celular"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            background: var(--kf-bg-subtle);
            padding: 4px;
            border-radius: var(--kf-radius-btn);
            gap: 4px;
            border: 1px solid var(--kf-border-subtle);
          "
        >
          <button
            type="button"
            role="tab"
            aria-selected="${activePlatform === 'ios' ? 'true' : 'false'}"
            data-action="select-install-platform"
            data-platform="ios"
            class="kf-platform-tab-btn ${activePlatform === 'ios' ? 'active' : ''}"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 10px 14px;
              border-radius: var(--kf-radius-sm);
              border: none;
              font-size: 13px;
              font-weight: 700;
              cursor: pointer;
              transition: all var(--kf-transition-fast);
              background: ${activePlatform === 'ios' ? 'var(--kf-white)' : 'transparent'};
              color: ${activePlatform === 'ios' ? 'var(--kf-black)' : 'var(--kf-text-secondary)'};
              box-shadow: ${activePlatform === 'ios' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'};
            "
          >
            ${Icons.apple(16)}
            <span>iPhone (iOS)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected="${activePlatform === 'android' ? 'true' : 'false'}"
            data-action="select-install-platform"
            data-platform="android"
            class="kf-platform-tab-btn ${activePlatform === 'android' ? 'active' : ''}"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 10px 14px;
              border-radius: var(--kf-radius-sm);
              border: none;
              font-size: 13px;
              font-weight: 700;
              cursor: pointer;
              transition: all var(--kf-transition-fast);
              background: ${activePlatform === 'android' ? 'var(--kf-white)' : 'transparent'};
              color: ${activePlatform === 'android' ? 'var(--kf-black)' : 'var(--kf-text-secondary)'};
              box-shadow: ${activePlatform === 'android' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'};
            "
          >
            ${Icons.android(16)}
            <span>Android</span>
          </button>
        </div>

        <!-- Conteúdo Específico da Plataforma -->
        ${activePlatform === 'ios' ? renderIosInstructions() : renderAndroidInstructions(canPromptNative)}

        <!-- Botão Final de Fechamento "Entendi" -->
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px;">
          <button
            type="button"
            data-action="close-install-modal"
            style="
              width: 100%;
              background: var(--kf-lilac-dark);
              color: #FFFFFF;
              border: none;
              border-radius: var(--kf-radius-btn);
              padding: 14px 20px;
              font-size: 13.5px;
              font-weight: 700;
              letter-spacing: 0.02em;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              box-shadow: 0 4px 16px rgba(143, 120, 168, 0.25);
              transition: all var(--kf-transition-fast);
            "
          >
            <span>ENTENDI</span>
            ${Icons.check(16)}
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Instruções passo a passo detalhadas para iPhone (iOS)
 */
function renderIosInstructions() {
  return `
    <div class="kf-install-instructions-content" style="display: flex; flex-direction: column; gap: 14px;">
      <!-- Aviso de recomendação do Safari -->
      <div style="
        background: rgba(201, 184, 220, 0.16);
        border: 1px solid var(--kf-border-subtle);
        border-radius: var(--kf-radius-sm);
        padding: 10px 14px;
        display: flex;
        align-items: center;
        gap: 10px;
      ">
        <span style="color: var(--kf-lilac-dark); display: flex;">
          ${Icons.safari(18)}
        </span>
        <span style="font-size: 12px; color: var(--kf-black); font-weight: 500; line-height: 1.45;">
          No iPhone, recomendamos abrir este link pelo navegador <strong>Safari</strong>.
        </span>
      </div>

      <h3 style="
        font-size: 14.5px; 
        font-weight: 700; 
        color: var(--kf-black); 
        font-family: var(--kf-font-heading);
        margin: 0;
      ">
        Como adicionar no iPhone
      </h3>

      <!-- Passos Ilustrados -->
      <ol class="kf-install-steps" style="
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      ">
        <!-- Passo 1 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">1</span>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
              Abra no navegador Safari
            </span>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              Certifique-se de que está acessando o Korean Flow pelo <strong>Safari</strong> do iPhone.
            </span>
          </div>
        </li>

        <!-- Passo 2 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">2</span>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
                Toque no botão de Compartilhar
              </span>
              <span style="
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 2px 6px;
                background: var(--kf-bg-subtle);
                border-radius: 6px;
                color: var(--kf-lilac-dark);
                font-size: 11px;
                font-weight: 600;
              ">
                ${Icons.shareIos(14)} barra inferior
              </span>
            </div>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              Localizado na barra inferior do Safari (ícone de um quadrado com uma seta apontando para cima).
            </span>
          </div>
        </li>

        <!-- Passo 3 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">3</span>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
                Selecione “Adicionar à Tela de Início”
              </span>
              <span style="
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 2px 6px;
                background: var(--kf-bg-subtle);
                border-radius: 6px;
                color: var(--kf-lilac-dark);
                font-size: 11px;
                font-weight: 600;
              ">
                ${Icons.plusSquare(14)}
              </span>
            </div>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              Deslize o menu para cima e procure a opção com o ícone de adição.
            </span>
          </div>
        </li>

        <!-- Passo 4 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">4</span>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
              Confirme o nome “Korean Flow”
            </span>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              O nome sugerido aparecerá automaticamente com o ícone sereno da flor de lótus.
            </span>
          </div>
        </li>

        <!-- Passo 5 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">5</span>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
              Toque em “Adicionar”
            </span>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              Toque no botão azul no canto superior direito para finalizar.
            </span>
          </div>
        </li>
      </ol>

      <!-- Mensagem de Conclusão Positiva -->
      <div style="
        background: linear-gradient(135deg, #F9F6FC 0%, #FFFFFF 100%);
        border: 1px solid rgba(143, 120, 168, 0.25);
        border-radius: var(--kf-radius-sm);
        padding: 12px 14px;
        display: flex;
        align-items: center;
        gap: 10px;
      ">
        <span style="color: var(--kf-success); display: flex;">
          ${Icons.checkCircle(20)}
        </span>
        <div style="display: flex; flex-direction: column; gap: 1px;">
          <span style="font-size: 12.5px; font-weight: 700; color: var(--kf-black);">
            Pronto!
          </span>
          <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.4;">
            O ícone do Korean Flow aparecerá na tela inicial do seu iPhone.
          </span>
        </div>
      </div>

      <span style="font-size: 11px; color: var(--kf-text-soft); font-style: italic; text-align: center;">
        * O procedimento pode ter pequenas variações conforme a versão do iOS.
      </span>
    </div>
  `;
}

/**
 * Instruções passo a passo detalhadas para Android
 */
function renderAndroidInstructions(canPromptNative = false) {
  return `
    <div class="kf-install-instructions-content" style="display: flex; flex-direction: column; gap: 14px;">
      <!-- Botão de Instalação Direta 1-Tap se o Chrome já disparou beforeinstallprompt -->
      ${canPromptNative ? `
        <div style="
          background: linear-gradient(135deg, #FFFDF8 0%, #F5ECDD 100%);
          border: 1.5px solid var(--kf-gold);
          border-radius: var(--kf-radius-sm);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        ">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="kf-badge kf-badge-gold" style="font-size: 10px; font-weight: 700; padding: 2px 8px;">
                INSTALAÇÃO RÁPIDA DISPONÍVEL
              </span>
            </div>
          </div>
          <p style="font-size: 12px; color: var(--kf-black); margin: 0; line-height: 1.45;">
            Seu navegador suporta instalação direta em 1 toque.
          </p>
          <button
            type="button"
            data-action="trigger-native-install"
            style="
              background: var(--kf-black);
              color: #FFFFFF;
              border: none;
              border-radius: var(--kf-radius-btn);
              padding: 12px 18px;
              font-size: 13px;
              font-weight: 700;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              transition: all var(--kf-transition-fast);
              box-shadow: 0 4px 12px rgba(23, 21, 23, 0.15);
            "
          >
            ${Icons.download(16)}
            <span>INSTALAR APLICATIVO AGORA</span>
          </button>
        </div>
      ` : ''}

      <!-- Aviso de recomendação do Chrome -->
      <div style="
        background: rgba(201, 184, 220, 0.16);
        border: 1px solid var(--kf-border-subtle);
        border-radius: var(--kf-radius-sm);
        padding: 10px 14px;
        display: flex;
        align-items: center;
        gap: 10px;
      ">
        <span style="color: var(--kf-lilac-dark); display: flex;">
          ${Icons.chrome(18)}
        </span>
        <span style="font-size: 12px; color: var(--kf-black); font-weight: 500; line-height: 1.45;">
          No Android, recomendamos usar o <strong>Google Chrome</strong>.
        </span>
      </div>

      <h3 style="
        font-size: 14.5px; 
        font-weight: 700; 
        color: var(--kf-black); 
        font-family: var(--kf-font-heading);
        margin: 0;
      ">
        Como adicionar no Android
      </h3>

      <!-- Passos Ilustrados -->
      <ol class="kf-install-steps" style="
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      ">
        <!-- Passo 1 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">1</span>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
              Abra no Google Chrome
            </span>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              Abra o Korean Flow no navegador Chrome do seu aparelho.
            </span>
          </div>
        </li>

        <!-- Passo 2 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">2</span>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
                Toque no menu do navegador
              </span>
              <span style="
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 2px 6px;
                background: var(--kf-bg-subtle);
                border-radius: 6px;
                color: var(--kf-lilac-dark);
                font-size: 11px;
                font-weight: 600;
              ">
                ${Icons.dotsVertical(14)} canto superior
              </span>
            </div>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              Toque nos três pontinhos verticais no canto superior direito da tela.
            </span>
          </div>
        </li>

        <!-- Passo 3 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">3</span>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
              Selecione “Instalar aplicativo”
            </span>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              Ou toque na opção “Adicionar à tela inicial” na lista do menu.
            </span>
          </div>
        </li>

        <!-- Passo 4 -->
        <li class="kf-install-step-item" style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-sm);
          padding: 12px 14px;
        ">
          <span class="kf-step-num" style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--kf-lilac-light);
            color: var(--kf-lilac-dark);
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">4</span>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
              Confirme a instalação
            </span>
            <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.45;">
              Toque no botão “Instalar” no diálogo de confirmação que surgir na tela.
            </span>
          </div>
        </li>
      </ol>

      <!-- Mensagem de Conclusão Positiva -->
      <div style="
        background: linear-gradient(135deg, #F9F6FC 0%, #FFFFFF 100%);
        border: 1px solid rgba(143, 120, 168, 0.25);
        border-radius: var(--kf-radius-sm);
        padding: 12px 14px;
        display: flex;
        align-items: center;
        gap: 10px;
      ">
        <span style="color: var(--kf-success); display: flex;">
          ${Icons.checkCircle(20)}
        </span>
        <div style="display: flex; flex-direction: column; gap: 1px;">
          <span style="font-size: 12.5px; font-weight: 700; color: var(--kf-black);">
            Pronto!
          </span>
          <span style="font-size: 12px; color: var(--kf-text-secondary); line-height: 1.4;">
            O Korean Flow será instalado como um aplicativo no seu celular.
          </span>
        </div>
      </div>
    </div>
  `;
}
