/**
 * TELA: OnboardingView (PRIMEIRO ACESSO)
 * Experiência elegante, fluida e personalizada de onboarding do Korean Flow
 * Estruturada em 6 etapas com indicador discreto de etapas e transições suaves.
 */

import { Icons } from '../components/Icons.js';
import { renderButton } from '../components/Button.js';
import { BONUS_MATERIALS } from '../data/bonusData.js';

export function renderOnboardingView(state) {
  const currentStep = state.onboardingStep || 0;
  const userName = state.userName || 'Sofia';

  let stepHtml = '';
  switch (currentStep) {
    case 1:
      stepHtml = renderNameStep();
      break;
    case 2:
      stepHtml = renderPersonalizedIntroStep(userName);
      break;
    case 3:
      stepHtml = renderWhatIsIncludedStep();
      break;
    case 4:
      stepHtml = renderPhasesStep();
      break;
    case 5:
      stepHtml = renderPreparationStep();
      break;
    case 0:
    default:
      stepHtml = renderWelcomeStep();
      break;
  }

  return `
    <div class="kf-onboarding-container" style="
      min-height: 100vh;
      width: 100%;
      max-width: var(--kf-app-max-width);
      margin: 0 auto;
      background: radial-gradient(circle at 50% 10%, rgba(201, 184, 220, 0.28) 0%, rgba(251, 249, 253, 0.98) 55%, #FBF9FD 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: clamp(24px, 5vw, 32px) clamp(16px, 5vw, 24px) calc(36px + env(safe-area-inset-bottom, 0px));
      position: relative;
      overflow-x: hidden;
      box-shadow: var(--kf-shadow-card);
      box-sizing: border-box;
    ">
      <!-- 1. Topo: Indicador Discreto de Etapas (Apenas a partir da etapa 1) -->
      <div style="display: flex; align-items: center; justify-content: space-between; height: 28px; width: 100%;">
        ${currentStep > 0 ? `
          <button 
            type="button" 
            data-action="prev-onboarding-step" 
            style="
              background: none; 
              border: none; 
              color: var(--kf-text-soft); 
              font-size: 12px; 
              font-weight: 600; 
              cursor: pointer; 
              display: flex; 
              align-items: center; 
              gap: 4px;
              padding: 4px 8px;
              border-radius: var(--kf-radius-full);
            "
          >
            ← Voltar
          </button>
        ` : `<div></div>`}

        <!-- Pílulas / Bolinhas discretas de progresso (6 etapas) -->
        <div style="display: flex; align-items: center; gap: 6px;">
          ${Array.from({ length: 6 }).map((_, idx) => {
            const isActive = idx === currentStep;
            const isPassed = idx < currentStep;
            return `
              <div 
                style="
                  width: ${isActive ? '20px' : '6px'}; 
                  height: 6px; 
                  border-radius: 9999px; 
                  background: ${isActive ? 'var(--kf-lilac-dark)' : (isPassed ? 'var(--kf-lilac-primary)' : 'rgba(201, 184, 220, 0.35)')}; 
                  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                "
              ></div>
            `;
          }).join('')}
        </div>

        <!-- Espaçador de simetria -->
        <div style="width: 48px;"></div>
      </div>

      <!-- 2. Conteúdo da Etapa com Animação Suave -->
      <div class="kf-onboarding-step-body" style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 16px 0; width: 100%; max-width: 100%; box-sizing: border-box;">
        ${stepHtml}
      </div>
    </div>
  `;
}

/**
 * ETAPA 0: Tela de Boas-Vindas
 */
function renderWelcomeStep() {
  return `
    <div class="kf-onboarding-step kf-step-welcome" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px; width: 100%; max-width: 100%; box-sizing: border-box;">
      <!-- Grafismo Abstrato Suave em Lilás -->
      <div style="
        width: 110px; 
        height: 110px; 
        border-radius: 50%; 
        background: radial-gradient(circle, rgba(201, 184, 220, 0.4) 0%, rgba(237, 231, 243, 0.8) 70%, transparent 100%); 
        display: flex; 
        align-items: center; 
        justify-content: center;
        box-shadow: 0 10px 30px rgba(143, 120, 168, 0.15);
        position: relative;
        flex-shrink: 0;
      ">
        <div style="
          width: 74px; 
          height: 74px; 
          border-radius: 50%; 
          background: linear-gradient(135deg, var(--kf-lilac-light) 0%, #FFFFFF 100%); 
          border: 1px solid rgba(201, 184, 220, 0.6); 
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: var(--kf-lilac-dark);
          box-shadow: 0 4px 18px rgba(143, 120, 168, 0.2);
        ">
          ${Icons.lotus(38)}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 100%; box-sizing: border-box; text-align: center; align-items: center;">
        <span class="kf-caption-korean" style="letter-spacing: 0.12em; font-size: 11.5px;">
          MÉTODO KOREAN FLOW
        </span>
        <h1 class="kf-title-xl" style="font-size: clamp(24px, 7vw, 28px); font-weight: 800; letter-spacing: -0.03em; overflow-wrap: break-word;">
          KOREAN FLOW
        </h1>
        <p style="font-size: 16px; font-weight: 600; color: var(--kf-lilac-dark); margin-top: 4px; overflow-wrap: break-word;">
          "Seu momento de cuidar de você começa aqui."
        </p>
      </div>

      <div class="kf-card" style="
        background: rgba(255, 255, 255, 0.85); 
        backdrop-filter: blur(12px); 
        padding: 18px 20px; 
        border-radius: var(--kf-radius-lg); 
        border: 1px solid rgba(201, 184, 220, 0.45);
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      ">
        <p class="kf-body-base" style="font-size: 13.5px; color: var(--kf-text-muted); line-height: 1.6; overflow-wrap: break-word;">
          Uma jornada de 21 dias para cultivar movimento, equilíbrio e constância através do Pilates e de momentos de autocuidado inspirados no estilo de vida coreano.
        </p>
      </div>

      <div style="width: 100%; margin-top: 8px;">
        ${renderButton({
          text: 'COMEÇAR',
          variant: 'primary',
          icon: Icons.arrowRight(16),
          isBlock: true,
          dataAttributes: 'data-action="start-onboarding"',
          style: 'padding: 18px; font-size: 15px; letter-spacing: 0.05em; border-radius: var(--kf-radius-md);'
        })}
      </div>
    </div>
  `;
}

/**
 * ETAPA 1: Coleta do Nome
 */
function renderNameStep() {
  return `
    <div class="kf-onboarding-step kf-step-name" style="display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 100%; box-sizing: border-box;">
      <div style="display: flex; flex-direction: column; gap: 6px; width: 100%; max-width: 100%; box-sizing: border-box;">
        <span class="kf-caption-korean" style="display: flex; align-items: center; gap: 5px;">
          ${Icons.sparkles(12)} PERSONALIZAÇÃO
        </span>
        <h2 class="kf-title-xl" style="font-size: clamp(20px, 5.5vw, 24px); font-weight: 800; line-height: 1.3; overflow-wrap: break-word; word-wrap: break-word;">
          Como podemos chamar você?
        </h2>
        <p class="kf-body-base" style="font-size: 13.5px; color: var(--kf-text-muted); line-height: 1.5; overflow-wrap: break-word;">
          Seu nome será usado para personalizar sua jornada dentro do Korean Flow.
        </p>
      </div>

      <div class="kf-card" style="
        background: #FFFFFF; 
        padding: 22px 20px; 
        border-radius: var(--kf-radius-lg); 
        border: 1px solid var(--kf-border-subtle);
        display: flex;
        flex-direction: column;
        gap: 12px;
      ">
        <label for="onboarding-name-input" style="font-size: 12px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
          Seu Nome
        </label>
        
        <input 
          type="text" 
          id="onboarding-name-input" 
          placeholder="Ex: Sofia" 
          autocomplete="given-name"
          autofocus
          style="
            width: 100%;
            padding: 16px 18px;
            border-radius: var(--kf-radius-md);
            border: 1.5px solid var(--kf-border-focus);
            font-family: var(--kf-font-main);
            font-size: 16px;
            font-weight: 600;
            color: var(--kf-black);
            background: var(--kf-bg-subtle);
            outline: none;
            transition: all 0.2s;
          "
        />

        <div id="onboarding-name-error" style="display: none; font-size: 12px; color: #C62828; font-weight: 600;">
          Por favor, digite seu nome para continuar.
        </div>
      </div>

      <div style="margin-top: 8px;">
        ${renderButton({
          text: 'CONTINUAR',
          variant: 'primary',
          icon: Icons.arrowRight(16),
          isBlock: true,
          id: 'btn-submit-onboarding-name',
          dataAttributes: 'data-action="submit-name"',
          style: 'padding: 18px; font-size: 15px; letter-spacing: 0.04em;'
        })}
      </div>
    </div>
  `;
}

/**
 * ETAPA 2: Boas-Vindas Personalizada
 */
function renderPersonalizedIntroStep(userName) {
  const displayName = escapeHtml(userName || 'Sofia');

  return `
    <div class="kf-onboarding-step kf-step-personalized" style="
      display: flex; 
      flex-direction: column; 
      gap: 22px; 
      text-align: center; 
      align-items: center;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    ">
      <div style="
        width: 68px; 
        height: 68px; 
        border-radius: 50%; 
        background: linear-gradient(135deg, var(--kf-lilac-light) 0%, #FFFFFF 100%); 
        border: 2px solid var(--kf-gold); 
        display: flex; 
        align-items: center; 
        justify-content: center;
        color: var(--kf-gold);
        box-shadow: var(--kf-shadow-gold);
        flex-shrink: 0;
      ">
        ${Icons.sparkles(28)}
      </div>

      <div class="kf-onboarding-heading-group" style="
        display: flex; 
        flex-direction: column; 
        gap: 10px; 
        width: 100%; 
        max-width: 380px; 
        margin: 0 auto; 
        padding: 0 4px; 
        box-sizing: border-box; 
        text-align: center; 
        align-items: center;
      ">
        <span class="kf-caption-korean" style="color: var(--kf-lilac-dark); display: block; width: 100%; text-align: center;">
          BEM-VINDA • 환영합니다
        </span>
        <h2 class="kf-title-xl kf-onboarding-personalized-title" style="
          font-size: clamp(21px, 5.8vw, 26px);
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: var(--kf-black);
          text-align: center;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: break-word;
          word-break: normal;
          text-wrap: balance;
          -webkit-text-wrap: balance;
        ">
          ${displayName}, sua jornada começa agora.
        </h2>
        <p class="kf-body-base" style="
          font-size: 14px; 
          color: var(--kf-text-muted); 
          line-height: 1.55; 
          width: 100%;
          max-width: 330px; 
          margin: 0 auto;
          box-sizing: border-box;
          text-align: center;
          overflow-wrap: break-word;
        ">
          Durante os próximos 21 dias, você terá uma rotina guiada para desenvolver mais presença, movimento e consistência.
        </p>
      </div>

      <div class="kf-card" style="
        background: linear-gradient(145deg, #FFFFFF 0%, #FAF6FE 100%); 
        border: 1px dashed rgba(143, 120, 168, 0.4); 
        padding: 18px 20px; 
        border-radius: var(--kf-radius-lg);
        text-align: left;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      ">
        <div style="color: var(--kf-lilac-dark); margin-top: 2px; flex-shrink: 0;">
          ${Icons.lotus(20)}
        </div>
        <div style="display: flex; flex-direction: column; gap: 3px; min-width: 0; flex: 1;">
          <span style="font-size: 11px; font-weight: 700; color: var(--kf-lilac-dark); text-transform: uppercase;">
            FILOSOFIA DO MÉTODO
          </span>
          <p style="font-size: 12.5px; color: var(--kf-text-muted); line-height: 1.45; font-style: italic; overflow-wrap: break-word;">
            "Respeite seu ritmo. Cada prática é uma oportunidade de se reconectar com seu corpo e cultivar paz interior todos os dias."
          </p>
        </div>
      </div>

      <div style="width: 100%; max-width: 100%; box-sizing: border-box; margin-top: 6px;">
        ${renderButton({
          text: 'CONTINUAR',
          variant: 'primary',
          icon: Icons.arrowRight(16),
          isBlock: true,
          dataAttributes: 'data-action="next-onboarding-step"',
          style: 'padding: 18px; font-size: 15px;'
        })}
      </div>
    </div>
  `;
}

/**
 * ETAPA 3: O Que Faz Parte da Sua Jornada
 */
function renderWhatIsIncludedStep() {
  const items = [
    {
      title: '21 DIAS',
      desc: 'Uma jornada dividida em 3 fases progressivas.',
      badge: 'Jornada',
      icon: Icons.calendar(18)
    },
    {
      title: 'PILATES & MOVIMENTO',
      desc: 'Práticas guiadas para diferentes momentos do seu dia.',
      badge: 'Prática',
      icon: Icons.practice(18)
    },
    {
      title: 'HÁBITOS',
      desc: 'Pequenos rituais para construir consistência serena.',
      badge: 'Rituais',
      icon: Icons.habits(18)
    },
    {
      title: 'PROGRESSO',
      desc: 'Acompanhe seus dias concluídos, sequência e conquistas.',
      badge: 'Evolução',
      icon: Icons.award(18)
    },
    {
      title: 'CONTEÚDOS EXCLUSIVOS',
      desc: 'Materiais extras para complementar sua experiência (Guia de Refeições & Ebook Lifestyle).',
      badge: 'Bônus',
      icon: Icons.sparkles(18)
    }
  ];

  return `
    <div class="kf-onboarding-step kf-step-included" style="display: flex; flex-direction: column; gap: 18px; width: 100%; max-width: 100%; box-sizing: border-box;">
      <div style="display: flex; flex-direction: column; gap: 4px; width: 100%; max-width: 100%; box-sizing: border-box;">
        <span class="kf-caption-korean">
          ${Icons.lotus(12)} ESTRUTURA DO PROGRAMA
        </span>
        <h2 class="kf-title-xl" style="font-size: clamp(20px, 5.5vw, 23px); font-weight: 800; line-height: 1.3; overflow-wrap: break-word; word-wrap: break-word;">
          O que faz parte da sua jornada
        </h2>
        <p class="kf-body-base" style="font-size: 13px; color: var(--kf-text-muted); overflow-wrap: break-word;">
          Tudo que você precisa para cultivar uma rotina de movimento leve:
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; max-height: 48vh; overflow-y: auto; padding-right: 2px;">
        ${items.map(item => `
          <div class="kf-card" style="
            padding: 12px 14px; 
            display: flex; 
            align-items: center; 
            gap: 12px; 
            border-radius: var(--kf-radius-md);
            background: #FFFFFF;
          ">
            <div style="
              width: 36px; 
              height: 36px; 
              border-radius: 50%; 
              background: var(--kf-lilac-light); 
              color: var(--kf-lilac-dark); 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              flex-shrink: 0;
            ">
              ${item.icon}
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px; flex: 1;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <h4 style="font-size: 13px; font-weight: 700; color: var(--kf-black);">
                  ${item.title}
                </h4>
                <span class="kf-badge kf-badge-lilac" style="font-size: 9.5px; padding: 2px 7px;">
                  ${item.badge}
                </span>
              </div>
              <p style="font-size: 11.5px; color: var(--kf-text-muted); line-height: 1.35;">
                ${item.desc}
              </p>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 4px;">
        ${renderButton({
          text: 'CONTINUAR',
          variant: 'primary',
          icon: Icons.arrowRight(16),
          isBlock: true,
          dataAttributes: 'data-action="next-onboarding-step"',
          style: 'padding: 17px; font-size: 14.5px;'
        })}
      </div>
    </div>
  `;
}

/**
 * ETAPA 4: As 3 Fases da Transformação
 */
function renderPhasesStep() {
  const phases = [
    {
      num: '01',
      title: 'DESPERTAR & CONSCIÊNCIA',
      days: 'Dias 1 — 7',
      color: '#C9B8DC',
      desc: 'Comece criando presença, consciência corporal e uma rotina de movimento.'
    },
    {
      num: '02',
      title: 'FORTALECIMENTO & FLUIDEZ',
      days: 'Dias 8 — 14',
      color: '#8F78A8',
      desc: 'Avance gradualmente com práticas focadas em controle, mobilidade e fluidez.'
    },
    {
      num: '03',
      title: 'TRANSFORMAÇÃO & HÁBITO',
      days: 'Dias 15 — 21',
      color: '#C8A45D',
      desc: 'Consolide sua rotina e transforme consistência em um ritual de autocuidado.'
    }
  ];

  return `
    <div class="kf-onboarding-step kf-step-phases" style="display: flex; flex-direction: column; gap: 18px; width: 100%; max-width: 100%; box-sizing: border-box;">
      <div style="display: flex; flex-direction: column; gap: 4px; width: 100%; max-width: 100%; box-sizing: border-box;">
        <span class="kf-caption-korean">
          ${Icons.sparkles(12)} EVOLUÇÃO GRADUAL
        </span>
        <h2 class="kf-title-xl" style="font-size: clamp(20px, 5.5vw, 23px); font-weight: 800; line-height: 1.3; overflow-wrap: break-word; word-wrap: break-word;">
          As 3 Fases da Sua Jornada
        </h2>
        <p class="kf-body-base" style="font-size: 13px; color: var(--kf-text-muted); overflow-wrap: break-word;">
          Um ritmo respeitoso, sem pressa, projetado para durar:
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${phases.map(p => `
          <div class="kf-card" style="
            padding: 16px; 
            border-radius: var(--kf-radius-lg); 
            border-left: 4px solid ${p.color}; 
            background: linear-gradient(135deg, #FFFFFF 0%, #FAF8FD 100%);
            display: flex;
            flex-direction: column;
            gap: 4px;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; font-weight: 800; color: var(--kf-lilac-dark); letter-spacing: 0.05em;">
                FASE ${p.num}
              </span>
              <span class="kf-badge kf-badge-white" style="border: 1px solid var(--kf-border-subtle); font-size: 10.5px; font-weight: 700;">
                ${p.days}
              </span>
            </div>

            <h4 style="font-size: 14px; font-weight: 700; color: var(--kf-black); margin-top: 2px;">
              ${p.title}
            </h4>

            <p style="font-size: 12.5px; color: var(--kf-text-muted); line-height: 1.45;">
              ${p.desc}
            </p>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 4px;">
        ${renderButton({
          text: 'CONTINUAR',
          variant: 'primary',
          icon: Icons.arrowRight(16),
          isBlock: true,
          dataAttributes: 'data-action="next-onboarding-step"',
          style: 'padding: 17px; font-size: 14.5px;'
        })}
      </div>
    </div>
  `;
}

/**
 * ETAPA 5: Checklist de Preparação
 */
function renderPreparationStep() {
  const checklist = [
    "Um espaço confortável para praticar",
    "Alguns minutos do seu dia",
    "Roupas confortáveis",
    "Uma atitude gentil com você mesma"
  ];

  return `
    <div class="kf-onboarding-step kf-step-prep" style="display: flex; flex-direction: column; gap: 20px; width: 100%; max-width: 100%; box-sizing: border-box;">
      <div style="display: flex; flex-direction: column; gap: 4px; width: 100%; max-width: 100%; box-sizing: border-box;">
        <span class="kf-caption-korean">
          ${Icons.lotus(12)} TUDO PRONTO
        </span>
        <h2 class="kf-title-xl" style="font-size: clamp(20px, 5.5vw, 24px); font-weight: 800; line-height: 1.3; overflow-wrap: break-word; word-wrap: break-word;">
          Você está pronta para começar?
        </h2>
        <p class="kf-body-base" style="font-size: 13.5px; color: var(--kf-text-muted); overflow-wrap: break-word;">
          Para o seu momento no Korean Flow, você só precisa de:
        </p>
      </div>

      <!-- Lista de Checklist Visual -->
      <div class="kf-card" style="
        background: #FFFFFF; 
        padding: 18px 20px; 
        border-radius: var(--kf-radius-lg); 
        display: flex; 
        flex-direction: column; 
        gap: 12px;
      ">
        ${checklist.map(item => `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 24px; 
              height: 24px; 
              border-radius: 50%; 
              background: var(--kf-lilac-dark); 
              color: white; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              flex-shrink: 0;
            ">
              ${Icons.check(13)}
            </div>
            <span style="font-size: 13.5px; font-weight: 600; color: var(--kf-black);">
              ${item}
            </span>
          </div>
        `).join('')}
      </div>

      <!-- Observação de Acolhimento -->
      <div style="
        padding: 14px 18px; 
        background: linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 100%); 
        border-left: 4px solid var(--kf-gold); 
        border-radius: 4px var(--kf-radius-md) var(--kf-radius-md) 4px;
        box-shadow: 0 4px 15px rgba(200, 164, 93, 0.08);
      ">
        <span style="font-size: 11px; font-weight: 700; color: var(--kf-gold); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;">
          ${Icons.sparkles(12)} LEMBRETE CARINHOSO
        </span>
        <p style="font-size: 12.5px; color: #524734; line-height: 1.45; margin-top: 4px; font-style: italic;">
          "Pequenos passos também fazem parte do progresso. Respeite seus limites — o objetivo é criar consistência serena, não perfeição."
        </p>
      </div>

      <!-- Botão Final de Consagração -->
      <div style="margin-top: 6px;">
        ${renderButton({
          text: 'COMEÇAR MINHA JORNADA',
          variant: 'primary',
          icon: Icons.practice(18),
          isBlock: true,
          id: 'btn-finish-onboarding',
          dataAttributes: 'data-action="finish-onboarding"',
          style: 'padding: 18px; font-size: 15px; letter-spacing: 0.04em;'
        })}
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
