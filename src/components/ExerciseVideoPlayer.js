/**
 * COMPONENTE REUTILIZÁVEL: ExerciseVideoPlayer.js
 * Módulo especializado na integração, renderização e controle de vídeos do YouTube:
 * - Construção segura de embed URL (controls, fs, playsinline, rel, start, end)
 * - Iframe acessível com atributos de segurança e reprodução
 * - Visualização em tela cheia via Fullscreen API com alternativa ampliada fluida
 * - Encerramento e destruição automática de players para evitar áudio simultâneo
 * - Tratamento gracioso de status: "verified", "pending_review", "unavailable"
 * - Fallbacks diretos para 'Assistir no YouTube'
 */

import { Icons } from './Icons.js';

let activeKeydownListener = null;

/**
 * Constrói a URL do iframe de embed do YouTube respeitando parâmetros do projeto
 */
export function buildYouTubeEmbedUrl(exercise, options = {}) {
  if (!exercise || !exercise.youtubeId) return '';

  const params = new URLSearchParams();
  params.set('controls', '1');
  params.set('fs', '1');
  params.set('playsinline', '1');
  params.set('rel', '0');
  params.set('modestbranding', '1');
  params.set('enablejsapi', '1');

  // Adiciona start e end apenas quando tempos numéricos estiverem formalmente verificados
  if (typeof exercise.videoStartSeconds === 'number' && !isNaN(exercise.videoStartSeconds) && exercise.videoStartSeconds >= 0) {
    params.set('start', String(Math.floor(exercise.videoStartSeconds)));
  }

  if (typeof exercise.videoEndSeconds === 'number' && !isNaN(exercise.videoEndSeconds) && exercise.videoEndSeconds > 0) {
    params.set('end', String(Math.floor(exercise.videoEndSeconds)));
  }

  if (options.autoplay) {
    params.set('autoplay', '1');
  }

  return `https://www.youtube.com/embed/${encodeURIComponent(exercise.youtubeId)}?${params.toString()}`;
}

/**
 * Retorna a URL canônica para assistir diretamente no YouTube
 */
export function getYouTubeWatchUrl(youtubeId) {
  if (!youtubeId) return '';
  return `https://www.youtube.com/watch?v=${encodeURIComponent(youtubeId)}`;
}

/**
 * Renderiza o componente inline do vídeo dentro do modal de detalhes do exercício
 */
export function renderVideoSection(exercise) {
  if (!exercise) return '';

  const status = exercise.videoStatus || (exercise.youtubeId ? 'pending_review' : 'unavailable');
  const watchUrl = getYouTubeWatchUrl(exercise.youtubeId);

  // 1. ESTADO: VÍDEO INDISPONÍVEL / REMOVIDO / NÃO ENCONTRADO
  if (status === 'unavailable' || !exercise.youtubeId) {
    return `
      <div class="kf-video-section-container" style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 11px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            VÍDEO DEMONSTRATIVO
          </span>
          <span class="kf-badge" style="background: rgba(220, 53, 69, 0.1); color: #B02A37; font-size: 10px; font-weight: 700;">
            Indisponível no momento
          </span>
        </div>

        <div style="
          width: 100%; 
          padding: 20px 18px; 
          border-radius: var(--kf-radius-card); 
          background: linear-gradient(145deg, #FAF7FD 0%, #F5EEFA 100%); 
          border: 1px dashed rgba(201, 184, 220, 0.7); 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          text-align: center; 
          gap: 12px;
        ">
          <div style="
            width: 44px; 
            height: 44px; 
            border-radius: 50%; 
            background: rgba(143, 120, 168, 0.12); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: var(--kf-lilac-dark);
          ">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
          </div>

          <div style="display: flex; flex-direction: column; gap: 4px; max-width: 320px;">
            <h4 style="font-size: 14px; font-weight: 800; color: var(--kf-black); font-family: var(--kf-font-heading);">
              Demonstração em atualização
            </h4>
            <p style="font-size: 12px; color: var(--kf-text-muted); line-height: 1.45;">
              A demonstração deste movimento está passando por curadoria técnica. Utilize as instruções completas de respiração e alinhamento descritas abaixo.
            </p>
          </div>

          <a 
            href="https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.title + ' Pilates')}" 
            target="_blank" 
            rel="noopener noreferrer"
            style="
              display: inline-flex; 
              align-items: center; 
              gap: 6px; 
              padding: 8px 14px; 
              background: #FFFFFF; 
              border: 1px solid var(--kf-border-subtle); 
              border-radius: var(--kf-radius-full); 
              font-size: 11.5px; 
              font-weight: 700; 
              color: var(--kf-lilac-dark); 
              text-decoration: none; 
              transition: all var(--kf-transition-fast);
            "
          >
            Pesquisar no YouTube ↗
          </a>
        </div>
      </div>
    `;
  }

  // 2. ESTADOS: "pending_review" OU "verified"
  const isVerified = status === 'verified';
  const hasTimestamps = typeof exercise.videoStartSeconds === 'number' && typeof exercise.videoEndSeconds === 'number';
  const thumbUrl = `https://img.youtube.com/vi/${exercise.youtubeId}/hqdefault.jpg`;

  return `
    <div class="kf-video-section-container" style="display: flex; flex-direction: column; gap: 8px;">
      <!-- Cabeçalho da Seção de Vídeo -->
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
        <span style="font-size: 11px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
          VÍDEO DEMONSTRATIVO
        </span>
        ${isVerified ? `
          <span class="kf-badge" style="background: rgba(46, 125, 50, 0.12); color: #2E7D32; font-size: 10.5px; font-weight: 700;">
            ✓ Demonstração validada
          </span>
        ` : `
          <span class="kf-badge" style="background: rgba(200, 164, 93, 0.15); color: #8C7036; font-size: 10.5px; font-weight: 700;">
            ⏱ Em revisão técnica
          </span>
        `}
      </div>

      <!-- Card Interativo de Vídeo com Thumbnail e Play -->
      <div 
        class="kf-video-preview-card"
        style="
          position: relative; 
          width: 100%; 
          aspect-ratio: 16 / 9; 
          border-radius: var(--kf-radius-card); 
          overflow: hidden; 
          background: #171517; 
          box-shadow: var(--kf-shadow-card);
          border: 1px solid rgba(201, 184, 220, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <!-- Imagem de Capa do YouTube -->
        <img 
          src="${thumbUrl}" 
          alt="${escapeHtml(exercise.title)}"
          loading="lazy"
          style="
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            opacity: 0.72;
            transition: transform var(--kf-transition-smooth), opacity var(--kf-transition-fast);
          "
        />

        <!-- Gradiente Sutil de Profundidade -->
        <div style="
          position: absolute; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%; 
          background: linear-gradient(180deg, rgba(23, 21, 23, 0.25) 0%, rgba(23, 21, 23, 0.75) 100%);
        "></div>

        <!-- Botão Central de Reprodução & Disparo de Tela Cheia -->
        <button
          type="button"
          class="kf-btn-video-play-trigger"
          data-action="watch-exercise-fullscreen"
          data-exercise-id="${exercise.id}"
          aria-label="Assistir demonstração do exercício ${escapeHtml(exercise.title)} em tela cheia"
          style="
            position: relative;
            z-index: 2;
            background: rgba(255, 255, 255, 0.94);
            color: var(--kf-lilac-dark);
            border: none;
            padding: 12px 20px;
            border-radius: var(--kf-radius-full);
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 13.5px;
            font-weight: 700;
            font-family: var(--kf-font-heading);
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
            transition: all var(--kf-transition-fast);
          "
        >
          <span style="
            width: 28px; 
            height: 28px; 
            border-radius: 50%; 
            background: var(--kf-lilac-dark); 
            color: #FFFFFF; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            flex-shrink: 0;
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3"></polygon>
            </svg>
          </span>
          <span>Assistir exercício</span>
        </button>

        <!-- Indicador de Duração/Timestamp se houver -->
        ${hasTimestamps ? `
          <div style="
            position: absolute; 
            bottom: 10px; 
            left: 12px; 
            z-index: 2; 
            background: rgba(23, 21, 23, 0.85); 
            color: #FFFFFF; 
            padding: 4px 8px; 
            border-radius: var(--kf-radius-xs); 
            font-size: 11px; 
            font-weight: 600;
            backdrop-filter: blur(4px);
          ">
            Trecho: ${exercise.videoStartSeconds}s — ${exercise.videoEndSeconds}s
          </div>
        ` : ''}
      </div>

      <!-- Barra de Ações Rápidas: Tela Cheia e Link Externo YouTube -->
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
        <button
          type="button"
          data-action="watch-exercise-fullscreen"
          data-exercise-id="${exercise.id}"
          style="
            background: var(--kf-bg-subtle); 
            border: 1px solid var(--kf-border-subtle); 
            padding: 7px 12px; 
            border-radius: var(--kf-radius-full); 
            font-size: 11.5px; 
            font-weight: 700; 
            color: var(--kf-black); 
            display: inline-flex; 
            align-items: center; 
            gap: 6px; 
            cursor: pointer;
            transition: all var(--kf-transition-fast);
          "
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
          Abrir em tela cheia
        </button>

        <a 
          href="${watchUrl}" 
          target="_blank" 
          rel="noopener noreferrer"
          style="
            display: inline-flex; 
            align-items: center; 
            gap: 5px; 
            color: var(--kf-lilac-dark); 
            font-size: 11.5px; 
            font-weight: 600; 
            text-decoration: none;
            padding: 6px 8px;
            border-radius: var(--kf-radius-sm);
            transition: color var(--kf-transition-fast);
          "
        >
          Assistir no YouTube ↗
        </a>
      </div>

      <!-- Aviso Contextual se o vídeo estiver em revisão -->
      ${!isVerified ? `
        <div style="
          padding: 8px 12px; 
          border-radius: var(--kf-radius-sm); 
          background: rgba(200, 164, 93, 0.08); 
          border-left: 3px solid var(--kf-gold); 
          display: flex; 
          flex-direction: column; 
          gap: 2px;
        ">
          <span style="font-size: 11px; font-weight: 700; color: #7D6B4E;">
            Demonstração preliminar em revisão
          </span>
          <p style="font-size: 11px; color: var(--kf-text-muted); line-height: 1.4;">
            ${exercise.videoNote ? exercise.videoNote + ' ' : ''}Siga os passos e adaptações descritos abaixo para executar com máxima segurança corporal.
          </p>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Abre a visualização em tela cheia do vídeo
 */
export function openVideoFullscreenOverlay(exercise) {
  if (!exercise || !exercise.youtubeId) return;

  // 1. Pausa qualquer outro vídeo existente antes de abrir
  stopAllVideos();

  // 2. Garante que o container de overlay exista no body
  let overlay = document.getElementById('kf-video-fullscreen-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'kf-video-fullscreen-overlay';
    document.body.appendChild(overlay);
  }

  const embedUrl = buildYouTubeEmbedUrl(exercise, { autoplay: true });
  const watchUrl = getYouTubeWatchUrl(exercise.youtubeId);
  const statusBadgeText = exercise.videoStatus === 'verified' ? 'Demonstração Validada' : 'Em Revisão Técnica';

  overlay.className = 'kf-video-fullscreen-overlay active';
  overlay.innerHTML = `
    <div class="kf-video-overlay-backdrop" id="kf-video-overlay-backdrop"></div>

    <div class="kf-video-overlay-content">
      <!-- Barra Superior do Player -->
      <div class="kf-video-overlay-header">
        <div class="kf-video-overlay-title-group">
          <span class="kf-video-overlay-badge">
            ${Icons.lotus(12)} ${statusBadgeText}
          </span>
          <h3 class="kf-video-overlay-title">
            ${escapeHtml(exercise.title)}
          </h3>
        </div>

        <button 
          type="button" 
          id="btn-close-video-overlay" 
          class="kf-video-overlay-close-btn"
          aria-label="Fechar visualização de vídeo"
        >
          ✕ Fechar
        </button>
      </div>

      <!-- Iframe 16:9 Centralizado -->
      <div class="kf-video-overlay-frame-wrapper">
        <iframe
          id="kf-active-youtube-iframe"
          src="${embedUrl}"
          title="Demonstração do exercício ${escapeHtml(exercise.title)} - Método Korean Flow"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowfullscreen
          referrerpolicy="origin-when-cross-origin"
          class="kf-video-overlay-iframe"
        ></iframe>
      </div>

      <!-- Barra Inferior com Fallbacks e Acessibilidade -->
      <div class="kf-video-overlay-footer">
        <a 
          href="${watchUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="kf-video-overlay-external-link"
        >
          Não carregou? Assistir diretamente no YouTube ↗
        </a>
        <span class="kf-video-overlay-hint">
          Pressione ESC ou clique em Fechar para voltar
        </span>
      </div>
    </div>
  `;

  // 3. Solicita Fullscreen API pelo navegador a partir do clique
  try {
    if (overlay.requestFullscreen) {
      overlay.requestFullscreen().catch(() => {
        // Se recusado pelo navegador/permissões, a visualização ampliada continua normalmente
      });
    } else if (overlay.webkitRequestFullscreen) {
      overlay.webkitRequestFullscreen().catch(() => {});
    }
  } catch (err) {
    // Falha silenciosa permitida: mantém visualização ampliada padrão
  }

  // 4. Vincula eventos de fechamento
  const closeBtn = document.getElementById('btn-close-video-overlay');
  const backdrop = document.getElementById('kf-video-overlay-backdrop');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeVideoFullscreenOverlay());
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => closeVideoFullscreenOverlay());
  }

  // 5. Suporte a tecla Escape
  if (activeKeydownListener) {
    window.removeEventListener('keydown', activeKeydownListener);
  }
  activeKeydownListener = (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeVideoFullscreenOverlay();
    }
  };
  window.addEventListener('keydown', activeKeydownListener);
}

/**
 * Fecha a visualização em tela cheia e destrói o iframe para interromper áudio
 */
export function closeVideoFullscreenOverlay() {
  const overlay = document.getElementById('kf-video-fullscreen-overlay');
  if (overlay) {
    // Se o navegador estiver em modo tela cheia nativo, sai dele
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch (e) {}
    } else if (document.webkitFullscreenElement) {
      try {
        document.webkitExitFullscreen().catch(() => {});
      } catch (e) {}
    }

    // Interrompe imediatamente o áudio destruindo o conteúdo do iframe
    overlay.innerHTML = '';
    overlay.className = 'kf-video-fullscreen-overlay';
  }

  if (activeKeydownListener) {
    window.removeEventListener('keydown', activeKeydownListener);
    activeKeydownListener = null;
  }
}

/**
 * Interrompe todos os vídeos tocando em qualquer player
 */
export function stopAllVideos() {
  closeVideoFullscreenOverlay();

  // Limpa também qualquer iframe que tenha sido injetado diretamente no DOM
  const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
  iframes.forEach(iframe => {
    try {
      iframe.src = '';
    } catch (e) {}
  });
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
