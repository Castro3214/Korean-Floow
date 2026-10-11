/**
 * COMPONENTE: BonusCard
 * Card refinado para a Central de Bônus e Ebooks do Korean Flow
 * Oferece visualização em modo completo (Biblioteca) e modo compacto (Home / Perfil)
 */

import { Icons } from './Icons.js';
import { renderButton } from './Button.js';

export function renderBonusCard(bonus, options = {}) {
  const { compact = false } = options;
  const isAvailable = bonus.status === 'available';

  if (compact) {
    return `
      <div 
        class="kf-card kf-bonus-card-compact" 
        data-action="open-bonus"
        data-bonus-id="${bonus.id}"
        style="
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          cursor: pointer;
          background: #FFFFFF;
          border: 1px solid var(--kf-border-subtle);
          border-radius: var(--kf-radius-md);
          transition: all 0.25s ease;
        "
      >
        <!-- Mini Capa / Ícone Estilizado -->
        <div style="
          width: 52px;
          height: 68px;
          flex-shrink: 0;
          border-radius: 8px;
          background: ${bonus.coverGradient || 'linear-gradient(135deg, #2D4F3E 0%, #1A3025 100%)'};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: rgba(255,255,255,0.25);
          "></div>
          ${Icons[bonus.iconName] ? Icons[bonus.iconName](22) : Icons.book(22)}
          <span style="font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; opacity: 0.9;">PDF</span>
        </div>

        <!-- Conteúdo Textual -->
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap;">
            <span class="kf-badge" style="background: rgba(127, 160, 134, 0.12); color: var(--kf-sage-dark); font-size: 10px; font-weight: 700; padding: 2px 7px;">
              ${bonus.category}
            </span>
            ${!isAvailable ? `
              <span class="kf-badge" style="background: rgba(224, 122, 95, 0.1); color: var(--kf-terracotta); font-size: 9.5px; font-weight: 600; padding: 2px 6px;">
                Em breve
              </span>
            ` : ''}
          </div>
          <h4 style="font-size: 15px; font-weight: 700; color: var(--kf-text-main); margin: 0 0 3px 0; font-family: var(--kf-font-serif); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${bonus.title}
          </h4>
          <p style="font-size: 12px; color: var(--kf-text-soft); margin: 0; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${bonus.shortDescription || bonus.description}
          </p>
        </div>

        <!-- Seta / Botão Indicativo -->
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--kf-bg-base);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--kf-text-soft);
          flex-shrink: 0;
        ">
          ${Icons.arrowRight(16)}
        </div>
      </div>
    `;
  }

  // Modo Completo (Padrão para a Biblioteca)
  return `
    <div 
      class="kf-card kf-bonus-card"
      data-action="open-bonus"
      data-bonus-id="${bonus.id}"
      style="
        display: flex;
        flex-direction: column;
        border-radius: 18px;
        overflow: hidden;
        border: 1px solid var(--kf-border-subtle);
        background: #FFFFFF;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        cursor: pointer;
      "
    >
      <!-- Capa Visual com Atmosfera Editorial & Minimalista Coreana -->
      <div style="
        background: ${bonus.coverGradient || 'linear-gradient(135deg, #2D4F3E 0%, #1A3025 100%)'};
        padding: 24px 20px;
        color: #FFFFFF;
        position: relative;
        overflow: hidden;
        min-height: 140px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      ">
        <!-- Efeito decorativo de lombada de livro e reflexo sutil -->
        <div style="
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          background: linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.15) 50%, rgba(0,0,0,0.1) 100%);
        "></div>
        
        <!-- Elemento de arte floral coreana em marca d'água -->
        <div style="
          position: absolute;
          right: -15px;
          bottom: -20px;
          font-size: 88px;
          opacity: 0.08;
          user-select: none;
          pointer-events: none;
          font-family: var(--kf-font-serif);
        ">🌸</div>

        <!-- Topo da Capa: Badges -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; position: relative; z-index: 1;">
          <span style="
            background: rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #FFFFFF;
            font-size: 10.5px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 20px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            border: 1px solid rgba(255, 255, 255, 0.25);
          ">
            ${bonus.badge || 'Bônus Especial'}
          </span>

          <span style="
            background: ${isAvailable ? 'rgba(92, 163, 123, 0.35)' : 'rgba(224, 122, 95, 0.3)'};
            color: #FFFFFF;
            font-size: 10px;
            font-weight: 600;
            padding: 4px 9px;
            border-radius: 20px;
            letter-spacing: 0.03em;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            ${isAvailable ? '● DISPONÍVEL' : '⏳ EM FINALIZAÇÃO'}
          </span>
        </div>

        <!-- Centro da Capa: Subtítulo em Hangul + Título Editorial -->
        <div style="margin-top: 14px; position: relative; z-index: 1;">
          <div style="font-size: 11px; letter-spacing: 0.08em; opacity: 0.85; font-weight: 500; margin-bottom: 4px;">
            ${bonus.koreanTitle || '한국 플로우'}
          </div>
          <h3 style="
            font-family: var(--kf-font-serif);
            font-size: 22px;
            font-weight: 600;
            color: #FFFFFF;
            margin: 0;
            line-height: 1.25;
            letter-spacing: -0.01em;
          ">
            ${bonus.title}
          </h3>
        </div>
      </div>

      <!-- Corpo do Card -->
      <div style="padding: 20px; display: flex; flex-direction: column; flex: 1; gap: 14px;">
        <!-- Meta Info (Categoria e Tempo de Leitura) -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
          <span style="
            font-size: 11.5px;
            font-weight: 600;
            color: var(--kf-sage-dark);
            background: rgba(127, 160, 134, 0.12);
            padding: 3px 9px;
            border-radius: 6px;
          ">
            ${bonus.category}
          </span>
          <span style="font-size: 11.5px; color: var(--kf-text-soft); display: flex; align-items: center; gap: 4px;">
            🕒 ${bonus.readTime || '15 min'}
          </span>
        </div>

        <!-- Descrição -->
        <p style="
          font-size: 13.5px;
          color: var(--kf-text-soft);
          line-height: 1.55;
          margin: 0;
          flex: 1;
        ">
          ${bonus.description}
        </p>

        <!-- Destaques / Conteúdo Incluso -->
        ${bonus.highlights && bonus.highlights.length > 0 ? `
          <div style="
            background: var(--kf-bg-base);
            border-radius: 10px;
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
          ">
            <span style="font-size: 10.5px; font-weight: 700; color: var(--kf-text-soft); text-transform: uppercase; letter-spacing: 0.05em;">
              O que você vai encontrar:
            </span>
            ${bonus.highlights.map(h => `
              <div style="display: flex; align-items: flex-start; gap: 6px; font-size: 12px; color: var(--kf-text-main);">
                <span style="color: var(--kf-sage-dark); font-weight: bold; line-height: 1.2;">✓</span>
                <span style="line-height: 1.35;">${h}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Rodapé de Ação -->
        <div style="margin-top: 4px; pt: 8px;">
          ${renderButton({
            text: isAvailable ? bonus.buttonLabel : `${bonus.buttonLabel} · EM BREVE`,
            variant: isAvailable ? 'primary' : 'outline',
            icon: isAvailable ? Icons.book(18) : Icons.fileText(18),
            style: 'width: 100%; justify-content: center; font-weight: 700; letter-spacing: 0.04em; height: 44px;',
            attributes: `data-action="open-bonus" data-bonus-id="${bonus.id}"`
          })}
        </div>
      </div>
    </div>
  `;
}
