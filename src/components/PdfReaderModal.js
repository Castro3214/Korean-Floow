/**
 * COMPONENTE: PdfReaderModal
 * Leitor integrado do Korean Flow ("Leitor Korean Flow"):
 * - Oferece leitura digital interativa com tipografia refinada e diagramação editorial
 * - Alternador para o visualizador de PDF original (iframe embed)
 * - Botões imediatos de download do PDF e abertura em nova aba
 * - Navegação de capítulos, cartões de receitas, tabelas comparativas e citações
 */

import { Icons } from './Icons.js';
import { renderButton } from './Button.js';
import { getBonusById } from '../data/bonusData.js';
import { getEbookContent } from '../data/ebooksContent.js';

// Estado do leitor mantido em memória
let readerState = {
  bonusId: null,
  activeMode: 'interactive', // 'interactive' | 'pdf'
  activeChapterIndex: 0
};

export function setReaderChapter(index) {
  readerState.activeChapterIndex = Math.max(0, index);
}

export function setReaderMode(mode) {
  readerState.activeMode = mode;
}

export function resetReaderState(bonusId = null) {
  readerState.bonusId = bonusId;
  readerState.activeMode = 'interactive';
  readerState.activeChapterIndex = 0;
}

export function renderPdfReaderModal(bonusId) {
  if (!bonusId) {
    resetReaderState(null);
    return '';
  }

  const bonus = getBonusById(bonusId);
  if (!bonus) return '';

  if (readerState.bonusId !== bonusId) {
    resetReaderState(bonusId);
  }

  const isAvailable = bonus.status === 'available';
  const ebookData = getEbookContent(bonusId);
  const chapters = ebookData ? ebookData.chapters : [];
  const currentChapter = chapters[readerState.activeChapterIndex] || chapters[0] || null;
  const isFirstChapter = readerState.activeChapterIndex === 0;
  const isLastChapter = readerState.activeChapterIndex === chapters.length - 1;

  return `
    <div class="kf-modal-backdrop open" id="pdf-reader-modal-backdrop" style="z-index: 120;">
      <div 
        class="kf-modal-sheet kf-reader-modal-sheet" 
        id="pdf-reader-modal-sheet" 
        style="
          max-height: 94vh; 
          border-radius: 28px 28px 0 0; 
          padding: 20px 20px calc(36px + env(safe-area-inset-bottom, 0px));
          gap: 16px;
        "
      >
        <div class="kf-modal-handle"></div>

        <!-- Barra Superior: Navegação & Ações -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--kf-border-subtle); padding-bottom: 12px;">
          <!-- Botão Voltar -->
          <button 
            type="button" 
            id="btn-close-reader"
            data-action="close-reader"
            style="
              background: var(--kf-bg-base); 
              border: 1px solid var(--kf-border-subtle); 
              padding: 8px 14px; 
              border-radius: var(--kf-radius-full); 
              display: flex; 
              align-items: center; 
              gap: 6px; 
              color: var(--kf-text-main);
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.2s ease;
            "
          >
            ← Voltar
          </button>

          <!-- Título Centralizado do Leitor -->
          <div style="text-align: center; flex: 1; min-width: 0; padding: 0 8px;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--kf-sage-dark);">
              ${bonus.badge || 'Leitor Korean Flow'}
            </div>
            <div style="font-size: 14px; font-weight: 700; color: var(--kf-text-main); font-family: var(--kf-font-serif); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${bonus.title}
            </div>
          </div>

          <!-- Botão Fechar (X) -->
          <button 
            type="button" 
            data-action="close-reader"
            aria-label="Fechar leitor"
            style="
              background: var(--kf-bg-base); 
              border: none; 
              width: 34px; 
              height: 34px; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: var(--kf-text-soft); 
              cursor: pointer;
              font-size: 16px;
              font-weight: bold;
            "
          >
            ✕
          </button>
        </div>

        <!-- Cabeçalho de Metadados & Ações Rápidas de Arquivo -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; padding: 2px 0;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span class="kf-badge" style="background: rgba(127, 160, 134, 0.15); color: var(--kf-sage-dark); font-size: 11px; font-weight: 700;">
              ${bonus.category}
            </span>
            <span style="font-size: 11.5px; color: var(--kf-text-soft);">
              📄 ${bonus.totalPages || 15} págs • ${bonus.readTime || 'Leitura rápida'}
            </span>
          </div>

          <!-- Botões de Ação para o Arquivo PDF Físico -->
          <div style="display: flex; align-items: center; gap: 8px;">
            <a 
              href="${bonus.file}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="kf-btn kf-btn-outline" 
              style="padding: 6px 12px; font-size: 11.5px; border-radius: 20px; text-decoration: none; display: flex; align-items: center; gap: 5px; color: var(--kf-text-main); background: #FFFFFF;"
            >
              ${Icons.externalLink(14)}
              <span>Abrir PDF</span>
            </a>
            <a 
              href="${bonus.file}" 
              download="${bonus.id}.pdf"
              class="kf-btn kf-btn-primary" 
              style="padding: 6px 14px; font-size: 11.5px; border-radius: 20px; text-decoration: none; display: flex; align-items: center; gap: 5px; font-weight: 700;"
            >
              ${Icons.download(14)}
              <span>Baixar PDF</span>
            </a>
          </div>
        </div>

        <!-- Barra de Alternância: Leitura Interativa vs PDF Embed -->
        <div class="kf-reader-tabs-bar">
          <button 
            type="button" 
            class="kf-reader-tab-btn ${readerState.activeMode === 'interactive' ? 'active' : ''}"
            data-action="set-reader-mode"
            data-mode="interactive"
          >
            📖 Leitura no App
          </button>
          <button 
            type="button" 
            class="kf-reader-tab-btn ${readerState.activeMode === 'pdf' ? 'active' : ''}"
            data-action="set-reader-mode"
            data-mode="pdf"
          >
            📄 PDF Original
          </button>
        </div>

        <!-- CONTEÚDO PRINCIPAL -->
        ${readerState.activeMode === 'interactive' && ebookData && chapters.length > 0 ? `
          <!-- MODO 1: LEITURA DIGITAL INTERATIVA -->
          <div style="display: flex; flex-direction: column; gap: 14px; flex: 1; min-height: 0;">
            <!-- Seletor Rápido de Capítulos -->
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; background: var(--kf-bg-base); padding: 8px 12px; border-radius: 12px; border: 1px solid var(--kf-border-subtle);">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--kf-text-soft); text-transform: uppercase; letter-spacing: 0.04em;">
                Capítulo ${readerState.activeChapterIndex + 1} de ${chapters.length}
              </span>
              <select 
                id="kf-chapter-select"
                data-action="select-chapter"
                style="
                  background: #FFFFFF;
                  border: 1px solid var(--kf-border-subtle);
                  border-radius: 8px;
                  padding: 4px 8px;
                  font-size: 12px;
                  font-weight: 600;
                  color: var(--kf-text-main);
                  cursor: pointer;
                  max-width: 60%;
                  outline: none;
                "
              >
                ${chapters.map((ch, idx) => `
                  <option value="${idx}" ${idx === readerState.activeChapterIndex ? 'selected' : ''}>
                    ${ch.number}. ${ch.title}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Área de Leitura com Rolagem -->
            <div class="kf-ebook-reader-container" id="kf-reader-scroll-area">
              <!-- Banner do Capítulo Atual -->
              <div style="padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--kf-border-subtle);">
                <div style="font-size: 11px; font-weight: 700; color: var(--kf-sage-dark); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 2px;">
                  CAPÍTULO ${currentChapter.number}
                </div>
                <h2 style="font-family: var(--kf-font-serif); font-size: 22px; font-weight: 600; color: var(--kf-text-main); margin: 0; line-height: 1.25;">
                  ${currentChapter.title}
                </h2>
              </div>

              <!-- HTML Formatado do Capítulo -->
              ${currentChapter.html}

              <!-- Navegação Entre Capítulos no Fim do Texto -->
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--kf-border-subtle); flex-wrap: wrap;">
                <button 
                  type="button" 
                  data-action="prev-chapter"
                  ${isFirstChapter ? 'disabled' : ''}
                  style="
                    background: var(--kf-bg-base); 
                    border: 1px solid var(--kf-border-subtle); 
                    padding: 8px 14px; 
                    border-radius: var(--kf-radius-full); 
                    font-size: 12px; 
                    font-weight: 600; 
                    color: ${isFirstChapter ? 'var(--kf-text-soft)' : 'var(--kf-text-main)'};
                    opacity: ${isFirstChapter ? '0.4' : '1'};
                    cursor: ${isFirstChapter ? 'not-allowed' : 'pointer'};
                  "
                >
                  ← Anterior
                </button>

                <span style="font-size: 11.5px; color: var(--kf-text-soft);">
                  ${readerState.activeChapterIndex + 1} / ${chapters.length}
                </span>

                <button 
                  type="button" 
                  data-action="next-chapter"
                  ${isLastChapter ? 'disabled' : ''}
                  style="
                    background: var(--kf-sage-dark); 
                    border: none; 
                    padding: 8px 16px; 
                    border-radius: var(--kf-radius-full); 
                    font-size: 12px; 
                    font-weight: 700; 
                    color: #FFFFFF;
                    opacity: ${isLastChapter ? '0.4' : '1'};
                    cursor: ${isLastChapter ? 'not-allowed' : 'pointer'};
                  "
                >
                  Próximo →
                </button>
              </div>

              <!-- Rodapé de Apoio com Download -->
              <div style="background: var(--kf-bg-base); padding: 14px; border-radius: 12px; margin-top: 18px; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: var(--kf-text-main);">
                    Quer guardar este material no seu aparelho?
                  </div>
                  <div style="font-size: 11px; color: var(--kf-text-soft);">
                    Você pode baixar o PDF oficial com todas as ${bonus.totalPages || 15} páginas diagramadas.
                  </div>
                </div>
                <a 
                  href="${bonus.file}" 
                  download="${bonus.id}.pdf"
                  class="kf-btn kf-btn-primary" 
                  style="padding: 6px 14px; font-size: 11.5px; text-decoration: none; border-radius: 18px;"
                >
                  📥 Baixar PDF
                </a>
              </div>
            </div>
          </div>
        ` : `
          <!-- MODO 2: VISUALIZADOR DE PDF ORIGINAL EMBED -->
          <div style="flex: 1; min-height: 480px; display: flex; flex-direction: column;">
            <div style="
              flex: 1;
              min-height: 480px;
              height: 65vh;
              border-radius: 16px;
              overflow: hidden;
              border: 1px solid var(--kf-border-subtle);
              background: #F8F9FA;
              position: relative;
            ">
              <iframe 
                src="${bonus.file}#toolbar=1" 
                style="width: 100%; height: 100%; border: none;"
                title="${bonus.title}"
              >
                Seu navegador não suporta visualização direta de PDFs. 
                <a href="${bonus.file}" target="_blank">Clique aqui para baixar o arquivo.</a>
              </iframe>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px; font-size: 12px; color: var(--kf-text-soft); flex-wrap: wrap; gap: 8px;">
              <span>Dica: Toque em <strong>"Leitura no App"</strong> acima para ler com fontes ajustadas ao celular.</span>
              <a href="${bonus.file}" download="${bonus.id}.pdf" style="color: var(--kf-sage-dark); font-weight: 700; text-decoration: none;">
                📥 Salvar cópia local (.pdf)
              </a>
            </div>
          </div>
        `}
      </div>
    </div>
  `;
}

/**
 * Vincula eventos interativos específicos do leitor
 * @param {Function} onRerender Função para re-renderizar a aplicação ou modal
 */
export function bindReaderEvents(onRerender) {
  // 1. Mudança de Modo (Interativo vs PDF)
  document.querySelectorAll('[data-action="set-reader-mode"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mode = btn.getAttribute('data-mode');
      if (mode) {
        setReaderMode(mode);
        if (typeof onRerender === 'function') onRerender();
      }
    });
  });

  // 2. Seleção de Capítulo pelo dropdown
  const chapterSelect = document.getElementById('kf-chapter-select');
  if (chapterSelect) {
    chapterSelect.addEventListener('change', (e) => {
      const idx = parseInt(e.target.value, 10);
      if (!isNaN(idx)) {
        setReaderChapter(idx);
        if (typeof onRerender === 'function') onRerender();
      }
    });
  }

  // 3. Capítulo Anterior
  document.querySelectorAll('[data-action="prev-chapter"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (readerState.activeChapterIndex > 0) {
        setReaderChapter(readerState.activeChapterIndex - 1);
        if (typeof onRerender === 'function') onRerender();
      }
    });
  });

  // 4. Próximo Capítulo
  document.querySelectorAll('[data-action="next-chapter"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setReaderChapter(readerState.activeChapterIndex + 1);
      if (typeof onRerender === 'function') onRerender();
    });
  });
}
