/**
 * COMPONENTE: DayCompletionModal
 * Modal comemorativo e refinado ao concluir uma prática da jornada:
 * - Saudação personalizada e parabéns com animação suave
 * - Resumo das conquistas do dia (exercícios feitos, streak, progresso geral)
 * - Frase inspiradora de reflexão coreana
 * - Botão de ação para continuar a jornada
 */

import { Icons } from './Icons.js';
import { renderButton } from './Button.js';
import { renderProgressBar } from './ProgressBar.js';
import { getDayById } from '../data/journeyData.js';

export function renderDayCompletionModal(dayNumber, state) {
  if (!dayNumber) return '';

  const dayData = getDayById(dayNumber);
  const userName = state.userName || 'Sofia';
  const completedCount = (state.completedDays || []).length;
  const progressPercent = Math.min(100, Math.round((completedCount / 21) * 100));
  const streak = state.streak || 1;
  const isFinalDay = Number(dayNumber) === 21;

  const quote = isFinalDay 
    ? 'Você chegou ao final da sua jornada Korean Flow. Celebre sua dedicação e leve os pequenos hábitos que fizeram sentido para você para os próximos dias.'
    : (dayData?.quote || 'A constância e a suavidade transformam o corpo e aquietam a mente.');
  const dayTitle = dayData?.title || `Dia ${dayNumber}`;
  const phaseName = dayData?.phaseName || 'Korean Flow';

  return `
    <div class="kf-modal-backdrop open" id="day-completion-modal-backdrop" style="z-index: 120;">
      <div 
        class="kf-modal-sheet kf-completion-sheet" 
        id="day-completion-sheet"
        style="
          max-width: 440px; 
          background: ${isFinalDay ? 'linear-gradient(180deg, #FFFFFF 0%, #FAF5EB 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, #FAF7FD 100%)'};
          border-top: 2px solid ${isFinalDay ? 'var(--kf-gold)' : 'var(--kf-lilac-primary)'};
          text-align: center;
          padding-bottom: 28px;
        "
      >
        <div class="kf-modal-handle"></div>

        <!-- Ícone Animado de Celebração K-Wellness -->
        <div style="display: flex; justify-content: center; margin-top: 8px;">
          <div style="
            position: relative; 
            width: ${isFinalDay ? '92px' : '84px'}; 
            height: ${isFinalDay ? '92px' : '84px'}; 
            border-radius: 50%; 
            background: ${isFinalDay ? 'radial-gradient(circle, #FFF4D9 0%, rgba(200, 164, 93, 0.45) 100%)' : 'radial-gradient(circle, var(--kf-lilac-light) 0%, rgba(201, 184, 220, 0.5) 100%)'};
            display: flex; 
            align-items: center; 
            justify-content: center;
            box-shadow: 0 0 35px ${isFinalDay ? 'rgba(200, 164, 93, 0.55)' : 'rgba(201, 184, 220, 0.7)'};
            color: ${isFinalDay ? 'var(--kf-gold)' : 'var(--kf-lilac-dark)'};
            animation: kfPulseBreathe 4s ease-in-out infinite;
          ">
            ${isFinalDay ? Icons.award(42) : Icons.sparkles(38)}
            <div style="
              position: absolute; 
              bottom: 0; 
              right: 0; 
              width: 28px; 
              height: 28px; 
              background: ${isFinalDay ? 'var(--kf-gold)' : 'var(--kf-lilac-dark)'}; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: #FFFFFF;
              box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            ">
              ${Icons.check(14)}
            </div>
          </div>
        </div>

        <!-- Títulos de Celebração (Seção 7 e 14) -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 14px; align-items: center;">
          <span class="kf-caption-korean" style="font-size: 11px; letter-spacing: 0.08em; color: ${isFinalDay ? 'var(--kf-gold)' : 'var(--kf-lilac-dark)'}; display: flex; align-items: center; gap: 5px; font-weight: 700;">
            ${isFinalDay ? Icons.crown(13) : Icons.lotus(12)} ${isFinalDay ? 'JORNADA 21 DIAS CONCLUÍDA' : 'MÉTODO KOREAN FLOW'}
          </span>
          <h2 class="kf-title-lg" style="font-size: ${isFinalDay ? '25px' : '24px'}; font-weight: 800; color: var(--kf-black); letter-spacing: -0.02em; font-family: var(--kf-font-heading);">
            ${isFinalDay ? 'Parabéns pela Jornada! ✦' : 'Flow concluído ✦'}
          </h2>
          <p style="font-size: 15px; font-weight: 700; color: ${isFinalDay ? 'var(--kf-gold)' : 'var(--kf-lilac-dark)'}; margin-top: -2px;">
            ${isFinalDay ? 'Você completou todos os 21 dias.' : `Dia ${String(dayNumber).padStart(2, '0')} completo.`}
          </p>
          <p class="kf-body-base" style="font-size: 13.5px; color: var(--kf-text-muted); max-width: 310px; line-height: 1.45;">
            ${isFinalDay ? 'Sua dedicação transformou pequenos momentos diários em constância e bem-estar.' : 'Você está construindo consistência, um dia de cada vez.'}
          </p>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: ${isFinalDay ? '#FFF3D6' : 'var(--kf-lilac-light)'}; color: ${isFinalDay ? '#8A6D2B' : 'var(--kf-lilac-dark)'}; border-radius: var(--kf-radius-full); font-size: 12px; font-weight: 700; margin-top: 4px;">
            ${isFinalDay ? '✦ 21 de 21 dias completados' : '+1 dia na sua jornada'}
          </div>
        </div>

        <!-- Card de Resumo de Conquistas do Dia -->
        <div style="
          background: #FFFFFF; 
          border: 1px solid rgba(201, 184, 220, 0.5); 
          border-radius: var(--kf-radius-md); 
          padding: 16px; 
          margin-top: 18px;
          display: flex; 
          flex-direction: column; 
          gap: 12px;
          text-align: left;
          box-shadow: 0 4px 16px rgba(143, 120, 168, 0.08);
        ">
          <!-- Item 1: Exercícios do dia -->
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="
                width: 24px; 
                height: 24px; 
                border-radius: 50%; 
                background: var(--kf-lilac-light); 
                color: var(--kf-lilac-dark); 
                display: flex; 
                align-items: center; 
                justify-content: center;
              ">
                ${Icons.check(13)}
              </div>
              <span style="font-size: 13px; font-weight: 600; color: var(--kf-black);">
                Sequência do dia realizada
              </span>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: var(--kf-lilac-dark);">
              4 de 4 exercícios
            </span>
          </div>

          <!-- Item 2: Sequência ativa (Streak) -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px solid rgba(201, 184, 220, 0.25);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="
                width: 24px; 
                height: 24px; 
                border-radius: 50%; 
                background: #FFF3E0; 
                color: #E65100; 
                display: flex; 
                align-items: center; 
                justify-content: center;
              ">
                ${Icons.flame(13)}
              </div>
              <span style="font-size: 13px; font-weight: 600; color: var(--kf-black);">
                Sequência ativa (Streak)
              </span>
            </div>
            <span style="font-size: 12px; font-weight: 800; color: #E65100;">
              ${streak} ${streak === 1 ? 'dia ativo' : 'dias seguidos'}
            </span>
          </div>

          <!-- Item 3: Progresso total da jornada -->
          <div style="display: flex; flex-direction: column; gap: 6px; padding-top: 8px; border-top: 1px solid rgba(201, 184, 220, 0.25);">
            <div style="display: justify; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12.5px; font-weight: 600; color: var(--kf-black);">
                Progresso geral da jornada
              </span>
              <span style="font-size: 12px; font-weight: 700; color: var(--kf-lilac-dark);">
                ${completedCount} de 21 dias (${progressPercent}%)
              </span>
            </div>
            ${renderProgressBar(progressPercent, { height: '6px' })}
          </div>
        </div>

        <!-- Frase Inspiradora K-Wellness -->
        <div style="
          margin-top: 18px; 
          padding: 14px 16px; 
          background: #FFFDF9; 
          border-left: 3px solid var(--kf-gold); 
          border-radius: 4px var(--kf-radius-sm) var(--kf-radius-sm) 4px;
          text-align: left;
        ">
          <span style="font-size: 11px; font-weight: 700; color: var(--kf-gold); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;">
            ${Icons.lotus(12)} ${isFinalDay ? 'Mensagem de Conclusão' : 'Sabedoria do Dia'}
          </span>
          <p style="font-size: 12.5px; color: #5C5242; line-height: 1.5; margin-top: 4px; font-style: italic;">
            "${quote}"
          </p>
        </div>

        <!-- Botão Continuar / Ver Jornada Completa -->
        <div style="margin-top: 22px;">
          ${renderButton({
            text: isFinalDay ? 'VER MINHA JORNADA COMPLETA ✦' : 'CONTINUAR',
            variant: 'primary',
            icon: Icons.arrowRight(16),
            isBlock: true,
            id: 'btn-close-completion-modal',
            style: isFinalDay 
              ? 'padding: 16px; font-size: 14px; letter-spacing: 0.03em; background: linear-gradient(135deg, var(--kf-lilac-dark) 0%, #6E5388 100%);'
              : 'padding: 16px; font-size: 14px; letter-spacing: 0.03em;'
          })}
        </div>
      </div>
    </div>
  `;
}
