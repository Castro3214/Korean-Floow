/**
 * VIEW: LibraryView
 * Central de Materiais, Ebooks e Bônus do Korean Flow
 * FASE 5 & 7: "Biblioteca Korean Flow" / "Seus Bônus"
 * Apresenta o Guia Xô Barriguinha e o Método de Hábitos Coreanos com leitura e download imediato
 */

import { Icons } from '../components/Icons.js';
import { renderBonusCard } from '../components/BonusCard.js';
import { renderSectionHeader } from '../components/SectionHeader.js';
import { renderButton } from '../components/Button.js';
import { getAllBonuses } from '../data/bonusData.js';

export function renderLibraryView(state) {
  const userName = state.userName || 'Sofia';
  const allBonuses = getAllBonuses();
  const currentFilter = state.bonusFilter || 'all';

  const filteredBonuses = allBonuses.filter(bonus => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'nutricao' || currentFilter === 'xo-barriguinha') {
      return bonus.id === 'guia-refeicoes';
    }
    if (currentFilter === 'habitos' || currentFilter === 'korean-lifestyle') {
      return bonus.id === 'korean-lifestyle';
    }
    return true;
  });

  return `
    <div class="kf-view kf-library-view" style="display: flex; flex-direction: column; gap: 24px; padding-bottom: 40px;">
      <!-- 1. Header Editorial K-Wellness -->
      <header style="display: flex; flex-direction: column; gap: 6px;">
        <span class="kf-caption-korean" style="display: flex; align-items: center; gap: 6px; color: var(--kf-sage-dark); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
          ${Icons.sparkles(13)} 보너스 서재 • SEUS BÔNUS & EBOOKS
        </span>
        <h1 style="font-family: var(--kf-font-serif); font-size: 28px; font-weight: 600; color: var(--kf-text-main); margin: 0; line-height: 1.2;">
          Biblioteca Korean Flow
        </h1>
        <p style="font-size: 14px; color: var(--kf-text-soft); margin: 0; line-height: 1.5;">
          Seu espaço de conteúdos, <strong>${userName}</strong>. Guias oficiais diagramados em PDF e disponíveis para leitura imediata no app.
        </p>
      </header>

      <!-- 2. Banner de Esclarecimento de Acesso Livre & Downloads -->
      <div 
        class="kf-card"
        style="
          background: linear-gradient(135deg, #F8FAF8 0%, #EFF4F0 100%);
          border: 1px solid rgba(127, 160, 134, 0.25);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-radius: var(--kf-radius-md);
        "
      >
        <div style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(127, 160, 134, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--kf-sage-dark);
          flex-shrink: 0;
        ">
          ${Icons.gift(22)}
        </div>
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-size: 14px; font-weight: 700; color: var(--kf-text-main); margin: 0 0 2px 0;">
            Ebooks Liberados & Acesso Vitalício
          </h4>
          <p style="font-size: 12px; color: var(--kf-text-soft); margin: 0; line-height: 1.4;">
            Você pode ler diretamente na tela ou baixar os PDFs originais para guardar no celular ou tablet.
          </p>
        </div>
      </div>

      <!-- 3. Abas de Filtro de Categoria dos Ebooks -->
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
        <button 
          type="button"
          data-action="filter-bonus"
          data-bonus-filter="all"
          class="kf-filter-pill ${currentFilter === 'all' ? 'active' : ''}"
        >
          Todos (${allBonuses.length})
        </button>

        <button 
          type="button"
          data-action="filter-bonus"
          data-bonus-filter="xo-barriguinha"
          class="kf-filter-pill ${currentFilter === 'xo-barriguinha' ? 'active' : ''}"
        >
          🥑 Guia Xô Barriguinha
        </button>

        <button 
          type="button"
          data-action="filter-bonus"
          data-bonus-filter="korean-lifestyle"
          class="kf-filter-pill ${currentFilter === 'korean-lifestyle' ? 'active' : ''}"
        >
          🌿 Hábitos Coreanos
        </button>
      </div>

      <!-- 4. Seção Principal: Lista dos Bônus Cadastrados -->
      <section style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h2 style="font-family: var(--kf-font-serif); font-size: 20px; font-weight: 600; color: var(--kf-text-main); margin: 0;">
            Materiais Disponíveis (${filteredBonuses.length})
          </h2>
          <span style="font-size: 11.5px; font-weight: 600; color: var(--kf-sage-dark);">
            ✓ 100% Liberados
          </span>
        </div>

        <div class="kf-bonus-grid" style="display: flex; flex-direction: column; gap: 18px;">
          ${filteredBonuses.map(bonus => renderBonusCard(bonus)).join('')}
        </div>
      </section>

      <!-- 5. Seção: Continue Sua Jornada -->
      <section 
        class="kf-card"
        style="
          background: linear-gradient(135deg, #FFFDFB 0%, #FAF6F0 100%);
          border: 1px solid var(--kf-border-subtle);
          padding: 22px 20px;
          border-radius: var(--kf-radius-lg);
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: center;
          align-items: center;
        "
      >
        <div style="
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(224, 122, 95, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--kf-terracotta);
          font-size: 22px;
        ">
          🧘‍♀️
        </div>

        <div style="max-width: 420px;">
          <h3 style="font-family: var(--kf-font-serif); font-size: 18px; font-weight: 600; color: var(--kf-text-main); margin: 0 0 6px 0;">
            Continue Sua Jornada de Movimento
          </h3>
          <p style="font-size: 13px; color: var(--kf-text-soft); margin: 0; line-height: 1.5;">
            Os ebooks apoiam sua alimentação e hábitos diários, e a prática no tapete ativa o tônus, postura e serenidade do corpo.
          </p>
        </div>

        <div style="display: flex; gap: 10px; width: 100%; max-width: 380px; justify-content: center; flex-wrap: wrap;">
          ${renderButton({
            text: 'Ir para a Prática',
            variant: 'primary',
            icon: Icons.play(16),
            style: 'flex: 1; min-width: 140px; justify-content: center;',
            attributes: 'data-action="change-tab" data-tab="practice"'
          })}
          ${renderButton({
            text: 'Ver Hábitos Diários',
            variant: 'outline',
            icon: Icons.habits(16),
            style: 'flex: 1; min-width: 140px; justify-content: center;',
            attributes: 'data-action="change-tab" data-tab="habits"'
          })}
        </div>
      </section>
    </div>
  `;
}
