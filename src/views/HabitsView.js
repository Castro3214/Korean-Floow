/**
 * TELA: HabitsView (HÁBITOS)
 * Rastreador dos 5 rituais diários do Método Korean Flow
 * com persistência reativa, cálculo de completude
 * e acesso direto ao Ebook oficial do Método de Hábitos Coreanos (Korean Lifestyle)
 */

import { INITIAL_HABITS } from '../data/habitsData.js';
import { renderHabitItem } from '../components/HabitItem.js';
import { renderProgressBar } from '../components/ProgressBar.js';
import { renderSectionHeader } from '../components/SectionHeader.js';
import { renderButton } from '../components/Button.js';
import { Icons } from '../components/Icons.js';

export function renderHabitsView(state) {
  const todayKey = new Date().toISOString().split('T')[0];
  const todayCompletedHabits = new Set(state.habits[todayKey] || []);
  const totalHabits = INITIAL_HABITS.length;
  const completedHabitsCount = todayCompletedHabits.size;
  const habitsPercent = Math.min(100, Math.round((completedHabitsCount / totalHabits) * 100));

  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(new Date());

  return `
    <div class="kf-view kf-habits-view" style="display: flex; flex-direction: column; gap: 24px; padding-bottom: 40px;">
      <!-- Cabeçalho -->
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span class="kf-caption-korean" style="display: flex; align-items: center; gap: 5px;">
          ${Icons.sparkles(12)} RITUAIS DE BEM-ESTAR
        </span>
        <h1 class="kf-title-xl" style="font-family: var(--kf-font-heading); font-weight: 800; letter-spacing: -0.02em;">
          Seu ritual de hoje
        </h1>
        <p class="kf-body-base" style="font-size: 13.5px; color: var(--kf-text-muted);">
          ${completedHabitsCount} de ${totalHabits} hábitos concluídos hoje
        </p>
      </div>

      <!-- Card de Progresso dos Hábitos de Hoje -->
      <div 
        class="kf-card" 
        style="
          background: linear-gradient(145deg, #FFFFFF 0%, #F6EFFC 100%); 
          border: 1px solid rgba(201, 184, 220, 0.6); 
          padding: 22px; 
          display: flex; 
          flex-direction: column; 
          gap: 14px;
        "
      >
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase;">
              RITUAIS CONCLUÍDOS
            </span>
            <h3 style="font-size: 22px; font-weight: 800; color: var(--kf-black);">
              ${completedHabitsCount} de ${totalHabits}
            </h3>
          </div>

          <span class="kf-badge ${completedHabitsCount === totalHabits ? 'kf-badge-gold' : 'kf-badge-lilac'}" style="font-weight: 700;">
            ${completedHabitsCount === totalHabits ? '✨ Harmonia Plena' : `${habitsPercent}% do dia`}
          </span>
        </div>

        ${renderProgressBar(habitsPercent, { height: '8px' })}

        <p style="font-size: 12px; color: var(--kf-text-muted); line-height: 1.4;">
          ${completedHabitsCount === totalHabits 
            ? 'Parabéns! Você completou todos os seus momentos sagrados de autocuidado hoje.' 
            : (completedHabitsCount === 0 
                ? 'Nenhum hábito registrado hoje ainda. Reserve pequenos instantes para você — cada ritual reconecta seu corpo à serenidade.' 
                : 'Continue com serenidade. Cada ritual concluído fortalece sua harmonia diária.')}
        </p>
      </div>

      <!-- Lista de Hábitos Diários -->
      <section style="display: flex; flex-direction: column; gap: 14px;">
        ${renderSectionHeader({
          title: 'Rituais Diários do Método',
          subtitle: 'Toque em um hábito para registrar sua realização'
        })}

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${INITIAL_HABITS.map(habit => {
            const isChecked = todayCompletedHabits.has(habit.id);
            return renderHabitItem(habit, isChecked);
          }).join('')}
        </div>
      </section>

      <!-- SEÇÃO DO EBOOK: MÉTODO DE HÁBITOS COREANOS (PDF & LEITOR) -->
      <section style="display: flex; flex-direction: column; gap: 12px;">
        ${renderSectionHeader({
          title: 'Ebook: Método de Hábitos Coreanos',
          subtitle: 'Seu material em PDF para aprofundar a rotina, o foco e a intenção'
        })}

        <div 
          class="kf-card kf-bonus-card"
          style="
            background: linear-gradient(135deg, #FFFFFF 0%, #F5F0FB 100%);
            border: 1px solid rgba(143, 120, 168, 0.4);
            border-radius: var(--kf-radius-lg);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            box-shadow: var(--kf-shadow-card);
          "
        >
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
            <div style="display: flex; gap: 12px; align-items: center;">
              <div style="
                width: 48px;
                height: 66px;
                border-radius: 8px;
                background: linear-gradient(135deg, #1E2738 0%, #101623 100%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #C9B8DC;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                flex-shrink: 0;
                position: relative;
                overflow: hidden;
              ">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: rgba(255,255,255,0.25);"></div>
                ${Icons.fileText(22)}
                <span style="font-size: 8px; font-weight: 700; margin-top: 3px; color: #FFFFFF;">PDF</span>
              </div>

              <div>
                <span class="kf-badge kf-badge-lilac" style="font-size: 10px; font-weight: 700; margin-bottom: 4px; display: inline-block;">
                  Ebook Liberado • 13 Páginas
                </span>
                <h3 style="font-size: 16px; font-weight: 700; color: var(--kf-black); margin: 0; font-family: var(--kf-font-heading); line-height: 1.25;">
                  Korean Lifestyle: Método de Hábitos Coreanos
                </h3>
                <p style="font-size: 12px; color: var(--kf-text-soft); margin: 3px 0 0 0; line-height: 1.4;">
                  Mentalidade Godsaeng, ritual matinal Modo K, cuidados em 5 etapas e desafio de 21 dias.
                </p>
              </div>
            </div>
          </div>

          <div style="
            background: rgba(255, 255, 255, 0.85);
            border: 1px solid var(--kf-border-subtle);
            border-radius: 10px;
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 12px;
          ">
            <div style="display: flex; align-items: center; gap: 6px; color: var(--kf-text-main);">
              <span style="color: var(--kf-lilac-dark); font-weight: bold;">✓</span>
              <span>5 Conceitos: Godsaeng, Nunchi, Jeong, Sohwakhaeng e Ppalli-ppalli</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; color: var(--kf-text-main);">
              <span style="color: var(--kf-lilac-dark); font-weight: bold;">✓</span>
              <span>Rotina Matinal Modo K passo a passo (despertar sem telas + hidratação)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; color: var(--kf-text-main);">
              <span style="color: var(--kf-lilac-dark); font-weight: bold;">✓</span>
              <span>Desafio Modo K de 21 dias para criar consistência duradoura</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            ${renderButton({
              text: 'Ler Ebook no App',
              variant: 'primary',
              icon: Icons.book(16),
              style: 'flex: 1; min-width: 140px; justify-content: center; font-weight: 700; height: 42px;',
              attributes: 'data-action="open-bonus" data-bonus-id="korean-lifestyle"'
            })}
            <a 
              href="assets/ebooks/korean-lifestyle.pdf" 
              download="korean-lifestyle.pdf"
              class="kf-btn kf-btn-outline" 
              style="padding: 10px 16px; font-size: 12px; border-radius: 12px; text-decoration: none; display: flex; align-items: center; gap: 6px; color: var(--kf-text-main); background: #FFFFFF; font-weight: 700; height: 42px; box-sizing: border-box;"
            >
              ${Icons.download(16)}
              <span>Baixar PDF</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Dica Coreana sobre Hábitos -->
      <div 
        class="kf-card" 
        style="
          background: #FFFFFF; 
          border: 1px solid var(--kf-border-subtle); 
          padding: 16px 18px; 
          border-radius: var(--kf-radius-md);
          display: flex; 
          align-items: flex-start; 
          gap: 12px;
        "
      >
        <div style="color: var(--kf-lilac-dark); margin-top: 2px;">
          ${Icons.lotus(18)}
        </div>
        <div style="display: flex; flex-direction: column; gap: 3px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--kf-lilac-dark); letter-spacing: 0.05em; text-transform: uppercase;">
            CONCEITO • 소확행 (SOHWAKHAENG)
          </span>
          <p style="font-size: 12px; color: var(--kf-text-muted); line-height: 1.45;">
            "Pequena, porém certa felicidade". Encontre contentamento na simplicidade de uma postura alinhada, uma xícara de chá morno e 15 minutos de respiração consciente.
          </p>
        </div>
      </div>
    </div>
  `;
}
