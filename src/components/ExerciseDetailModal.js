/**
 * COMPONENTE: ExerciseDetailModal
 * Tela/Modal de detalhes ultra-visual do exercício:
 * - YouTube Embed responsivo (com placeholder elegante K-Wellness quando vazio)
 * - Ilustração vetorial elegante de alinhamento postural
 * - Seção 'COMO FAZER' com 3 passos estruturados (Posição inicial, Execução, Alinhamento)
 * - Bloco dedicado de 'Respiração Guiada'
 * - 'Dica Korean Flow' com aviso de segurança corporal
 * - Botão de alternância de conclusão individual (✓ Concluído)
 */

import { Icons } from './Icons.js';
import { renderButton } from './Button.js';
import { getExerciseById } from '../data/exercisesData.js';
import { JOURNEY_DAYS } from '../data/journeyData.js';
import { store } from '../state/store.js';

export function renderExerciseDetailModal(exerciseId, isCompleted = false) {
  if (!exerciseId) return '';

  const foundExercise = getExerciseById(exerciseId);
  if (!foundExercise) return '';

  const state = store.getState();
  let dayNumber = state.selectedPracticeDay || 1;

  // Se não houver dia selecionado, busca qual dia contém este exercício
  if (!state.selectedPracticeDay) {
    for (const d of JOURNEY_DAYS) {
      if (Array.isArray(d.exercises) && d.exercises.includes(exerciseId)) {
        dayNumber = d.day;
        break;
      }
    }
  }

  const youtubeEmbedHtml = getYouTubeEmbedHtml(foundExercise.youtubeUrl, foundExercise.title);
  const illustrationHtml = getIllustrationHtml(foundExercise.imageUrl, foundExercise.title);

  return `
    <div class="kf-modal-backdrop open" id="exercise-detail-modal-backdrop" style="z-index: 110;">
      <div class="kf-modal-sheet kf-exercise-modal-sheet" id="exercise-detail-modal-sheet" style="max-height: 90vh; overflow-y: auto;">
        <div class="kf-modal-handle"></div>

        <!-- Barra Superior com Botão Voltar e Fechar -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <button 
            type="button" 
            id="btn-back-to-practice"
            style="
              background: var(--kf-lilac-light); 
              border: none; 
              padding: 8px 14px; 
              border-radius: var(--kf-radius-full); 
              display: flex; 
              align-items: center; 
              gap: 6px; 
              color: var(--kf-lilac-dark);
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.2s;
            "
          >
            ← Voltar para a prática
          </button>

          <button 
            type="button" 
            id="exercise-close-btn"
            style="
              background: var(--kf-bg-subtle); 
              border: none; 
              width: 32px; 
              height: 32px; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: var(--kf-text-soft);
              cursor: pointer;
            "
          >
            ${Icons.close(14)}
          </button>
        </div>

        <!-- Título do Exercício e Categoria -->
        <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="kf-caption-korean" style="display: flex; align-items: center; gap: 4px;">
              ${Icons.lotus(12)} DIA ${dayNumber} • ${foundExercise.category ? foundExercise.category.toUpperCase() : 'PILATES'}
            </span>
            ${isCompleted ? `
              <span class="kf-badge" style="background: rgba(46, 125, 50, 0.12); color: #2E7D32; font-size: 10.5px; font-weight: 700;">
                ✓ Concluído
              </span>
            ` : ''}
          </div>
          <h2 class="kf-title-lg" style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: var(--kf-black);">
            ${foundExercise.title}
          </h2>
          <p class="kf-body-base" style="font-size: 13px; color: var(--kf-text-muted); line-height: 1.45;">
            ${foundExercise.description}
          </p>
        </div>

        <!-- Badges de Metadados: Duração, Nível e Foco -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <div style="
            display: inline-flex; 
            align-items: center; 
            gap: 5px; 
            padding: 6px 12px; 
            background: var(--kf-lilac-light); 
            color: var(--kf-lilac-dark); 
            border-radius: var(--kf-radius-full); 
            font-size: 12px; 
            font-weight: 700;
          ">
            ${Icons.clock(13)} ${foundExercise.duration}
          </div>

          <div style="
            display: inline-flex; 
            align-items: center; 
            gap: 5px; 
            padding: 6px 12px; 
            background: var(--kf-bg-card); 
            color: var(--kf-black); 
            border: 1px solid var(--kf-border-subtle); 
            border-radius: var(--kf-radius-full); 
            font-size: 12px; 
            font-weight: 600;
          ">
            Nível: ${foundExercise.level}
          </div>

          <div style="
            display: inline-flex; 
            align-items: center; 
            gap: 5px; 
            padding: 6px 12px; 
            background: #FFFDF8; 
            color: #8C7036; 
            border: 1px solid rgba(200, 164, 93, 0.35); 
            border-radius: var(--kf-radius-full); 
            font-size: 12px; 
            font-weight: 600;
          ">
            ${Icons.sparkles(12)} Foco: ${foundExercise.focus}
          </div>
        </div>

        <!-- 1. ÁREA DE VÍDEO (YOUTUBE EMBED OU PLACEHOLDER ELEGANTE) -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 11px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
              VÍDEO DEMONSTRATIVO
            </span>
            <span style="font-size: 11px; color: var(--kf-lilac-dark); font-weight: 600;">
              Método Korean Flow
            </span>
          </div>

          ${youtubeEmbedHtml}
        </div>

        <!-- 2. ÁREA DE IMAGEM / ILUSTRAÇÃO DEMONSTRATIVA DE ALINHAMENTO -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 11px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
              ALINHAMENTO & POSTURA
            </span>
            <span style="font-size: 11px; color: var(--kf-gold); font-weight: 600;">
              Guia Anatômico
            </span>
          </div>

          ${illustrationHtml}
        </div>

        <!-- 3. SEÇÃO COMO FAZER -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h3 style="font-size: 14px; font-weight: 800; color: var(--kf-black); letter-spacing: 0.03em; text-transform: uppercase;">
              COMO FAZER
            </h3>
            <div style="flex: 1; height: 1px; background: var(--kf-border-subtle);"></div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${(foundExercise.steps || []).map((step, index) => {
              const stepTitle = typeof step === 'object' ? (step.title || `Passo ${index + 1}`) : `Passo ${index + 1}`;
              const stepText = typeof step === 'object' ? step.text : step;

              return `
                <div 
                  class="kf-card" 
                  style="
                    padding: 13px 15px; 
                    display: flex; 
                    flex-direction: column; 
                    gap: 4px; 
                    border-radius: var(--kf-radius-md);
                    background: var(--kf-bg-subtle);
                    border: 1px solid rgba(235, 228, 242, 0.8);
                  "
                >
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="
                      width: 22px; 
                      height: 22px; 
                      border-radius: 50%; 
                      background: var(--kf-lilac-dark); 
                      color: white; 
                      font-size: 11px; 
                      font-weight: 800; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center;
                      flex-shrink: 0;
                    ">
                      ${index + 1}
                    </span>
                    <h4 style="font-size: 13.5px; font-weight: 700; color: var(--kf-black);">
                      ${stepTitle.replace(/^\d+\.\s*/, '')}
                    </h4>
                  </div>

                  <p style="font-size: 12.5px; color: var(--kf-text-muted); line-height: 1.5; padding-left: 30px;">
                    ${stepText}
                  </p>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 4. SEÇÃO RESPIRAÇÃO GUIADA -->
        ${foundExercise.breathing ? `
          <div style="
            background: linear-gradient(135deg, #FAF7FD 0%, #FFFFFF 100%); 
            border-left: 3px solid var(--kf-lilac-primary); 
            border-radius: 4px var(--kf-radius-sm) var(--kf-radius-sm) 4px; 
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            border: 1px solid rgba(201, 184, 220, 0.3);
            border-left-width: 3px;
          ">
            <span style="font-size: 11px; font-weight: 800; color: var(--kf-lilac-dark); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;">
              ${Icons.lotus(12)} Respiração Guiada
            </span>
            <p style="font-size: 12.5px; color: var(--kf-text-muted); line-height: 1.45;">
              ${foundExercise.breathing}
            </p>
          </div>
        ` : ''}

        <!-- 5. DICA KOREAN FLOW & SEGURANÇA -->
        <div 
          style="
            background: linear-gradient(145deg, #FFFDF8 0%, #FAF5EA 100%); 
            border-left: 4px solid var(--kf-gold); 
            border-radius: 6px var(--kf-radius-md) var(--kf-radius-md) 6px; 
            padding: 16px 18px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(200, 164, 93, 0.08);
          "
        >
          <div style="display: flex; align-items: center; gap: 6px; color: var(--kf-gold);">
            ${Icons.sparkles(15)}
            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em;">
              DICA KOREAN FLOW • CONSCIÊNCIA CORPORAL
            </span>
          </div>
          <p style="font-size: 12.5px; color: #524734; line-height: 1.5; font-style: italic;">
            "${foundExercise.tip}"
          </p>

          <div style="
            font-size: 11px; 
            color: #7D6B4E; 
            border-top: 1px dashed rgba(200, 164, 93, 0.35); 
            padding-top: 6px; 
            display: flex; 
            align-items: center; 
            gap: 4px;
          ">
            <span>🛡️</span>
            <span><strong>Respeite seus limites:</strong> O movimento deve ser suave e controlado, sem dor ou tensão excessiva.</span>
          </div>
        </div>

        <!-- 6. BOTÃO DE AÇÃO: CONCLUIR EXERCÍCIO -->
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
          ${renderButton({
            text: isCompleted ? 'EXERCÍCIO CONCLUÍDO ✓' : '✓ MARCAR COMO CONCLUÍDO',
            variant: isCompleted ? 'secondary' : 'primary',
            icon: Icons.check(18),
            isBlock: true,
            id: 'btn-toggle-exercise-complete',
            dataAttributes: `data-exercise-id="${foundExercise.id}"`,
            style: `padding: 16px; font-size: 14px; letter-spacing: 0.03em; ${isCompleted ? 'background: rgba(46, 125, 50, 0.12); color: #2E7D32; border: 1px solid rgba(46, 125, 50, 0.3);' : ''}`
          })}

          <button 
            type="button" 
            id="btn-return-to-sequence-bottom"
            style="
              background: none; 
              border: none; 
              padding: 8px; 
              color: var(--kf-text-soft); 
              font-size: 12.5px; 
              font-weight: 600; 
              cursor: pointer;
            "
          >
            Voltar para a sequência do dia
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Parser de YouTube Embed com fallback sofisticado para placeholder K-Wellness
 */
function getYouTubeEmbedHtml(url, title) {
  const videoId = extractYouTubeId(url);

  if (videoId) {
    return `
      <div style="
        position: relative; 
        width: 100%; 
        padding-top: 56.25%; 
        border-radius: var(--kf-radius-md); 
        overflow: hidden; 
        background: #000000;
        box-shadow: var(--kf-shadow-card);
      ">
        <iframe 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
          src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1" 
          title="${escapeHtml(title)}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    `;
  }

  // Placeholder elegante de vídeo (K-Wellness Video Player)
  return `
    <div style="
      width: 100%; 
      aspect-ratio: 16 / 9; 
      border-radius: var(--kf-radius-md); 
      background: linear-gradient(145deg, #242028 0%, #171517 100%); 
      border: 1px solid rgba(201, 184, 220, 0.2); 
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      justify-content: center; 
      gap: 10px;
      color: var(--kf-white);
      padding: 16px;
      text-align: center;
      box-shadow: var(--kf-shadow-subtle);
      position: relative;
      overflow: hidden;
    ">
      <div style="
        width: 48px; 
        height: 48px; 
        border-radius: 50%; 
        background: rgba(255, 255, 255, 0.15); 
        backdrop-filter: blur(8px);
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: var(--kf-lilac-primary);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      ">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 13.5px; font-weight: 700; font-family: var(--kf-font-heading); letter-spacing: -0.01em;">
          Demonstração em breve
        </span>
        <span style="font-size: 12px; color: var(--kf-lilac-light); opacity: 0.9; max-width: 280px; line-height: 1.4;">
          A demonstração deste exercício será adicionada em breve.
        </span>
      </div>
    </div>
  `;
}

/**
 * Área de ilustração/demonstração visual de alinhamento postural
 */
function getIllustrationHtml(imageUrl, title) {
  if (imageUrl) {
    return `
      <div style="
        width: 100%; 
        max-height: 220px; 
        border-radius: var(--kf-radius-md); 
        overflow: hidden; 
        border: 1px solid var(--kf-border-subtle);
      ">
        <img src="${imageUrl}" alt="${escapeHtml(title)}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    `;
  }

  // Ilustração vetorial minimalista elegante
  return `
    <div style="
      width: 100%; 
      padding: 18px 16px; 
      border-radius: var(--kf-radius-md); 
      background: linear-gradient(135deg, #FCFBFD 0%, #F5EEFC 100%); 
      border: 1px solid rgba(201, 184, 220, 0.5); 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      gap: 16px;
    ">
      <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#EDE7F3" stroke="#C9B8DC" stroke-width="2"/>
        <path d="M50 20 C35 35 65 50 50 80" stroke="#8F78A8" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="22" r="4" fill="#C8A45D"/>
        <circle cx="43" cy="40" r="3.5" fill="#8F78A8"/>
        <circle cx="56" cy="60" r="3.5" fill="#8F78A8"/>
        <circle cx="50" cy="78" r="4" fill="#C8A45D"/>
      </svg>

      <div style="display: flex; flex-direction: column; gap: 3px; max-width: 220px;">
        <span style="font-size: 11px; font-weight: 700; color: var(--kf-lilac-dark); letter-spacing: 0.05em; text-transform: uppercase;">
          Eixo Postural • Danjeon Flow
        </span>
        <p style="font-size: 12px; color: var(--kf-text-muted); line-height: 1.4;">
          Atenção ao alinhamento vertical entre a base do crânio, escápulas e bacia neutra durante todo o movimento.
        </p>
      </div>
    </div>
  `;
}

function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
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
