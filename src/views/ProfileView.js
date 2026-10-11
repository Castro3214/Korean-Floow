/**
 * TELA: ProfileView (PERFIL)
 * Configuração de perfil, edição de nome, preferências
 * e ferramentas de demonstração e controle de dados
 */

import { renderAvatar } from '../components/Avatar.js';
import { renderButton } from '../components/Button.js';
import { renderSectionHeader } from '../components/SectionHeader.js';
import { Icons } from '../components/Icons.js';

export function renderProfileView(state) {
  const completedCount = (state.completedDays || []).length;

  return `
    <div class="kf-view kf-profile-view" style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Cabeçalho & Avatar em Destaque -->
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; padding: 12px 0;">
        <div style="position: relative;">
          ${renderAvatar({
            name: state.userName,
            size: 82,
            fontSize: 28,
            style: 'border: 3px solid var(--kf-lilac-primary); box-shadow: var(--kf-shadow-card);'
          })}
          <div style="
            position: absolute; 
            bottom: 0; 
            right: 0; 
            width: 24px; 
            height: 24px; 
            border-radius: 50%; 
            background: var(--kf-gold); 
            color: white; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            border: 2px solid white;
          ">
            ${Icons.sparkles(12)}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 4px;">
          <h2 class="kf-title-lg" style="font-size: 24px; font-weight: 800; font-family: var(--kf-font-heading); letter-spacing: -0.02em;">
            Olá, ${escapeHtml(state.userName || 'Sofia')}.
          </h2>
          <span style="color: var(--kf-lilac-dark); font-size: 13px; font-weight: 600; letter-spacing: 0.01em;">
            Sua jornada Korean Flow
          </span>
        </div>

        <span class="kf-badge kf-badge-lilac" style="padding: 4px 14px; font-size: 11px; font-weight: 600;">
          Iniciada em ${formatDate(state.profile?.startDate || new Date().toISOString().split('T')[0])}
        </span>
      </div>

      <!-- Informações Principais da Jornada (Seção 22: 4 métricas) -->
      <div class="kf-card" style="padding: 18px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center; box-shadow: var(--kf-shadow-card);">
        <div>
          <span style="font-size: 17px; font-weight: 800; color: var(--kf-lilac-dark); font-family: var(--kf-font-heading);">${completedCount}</span>
          <p style="font-size: 10.5px; color: var(--kf-text-muted); font-weight: 600; margin-top: 2px;">Dias concluídos</p>
        </div>
        <div style="border-left: 1px solid var(--kf-border-subtle);">
          <span style="font-size: 17px; font-weight: 800; color: var(--kf-black); font-family: var(--kf-font-heading);">${state.currentStreak || state.streak || 0}</span>
          <p style="font-size: 10.5px; color: var(--kf-text-muted); font-weight: 600; margin-top: 2px;">Sequência</p>
        </div>
        <div style="border-left: 1px solid var(--kf-border-subtle);">
          <span style="font-size: 17px; font-weight: 800; color: var(--kf-gold); font-family: var(--kf-font-heading);">${(state.achievements || []).length}</span>
          <p style="font-size: 10.5px; color: var(--kf-text-muted); font-weight: 600; margin-top: 2px;">Conquistas</p>
        </div>
        <div style="border-left: 1px solid var(--kf-border-subtle);">
          <span style="font-size: 17px; font-weight: 800; color: var(--kf-lilac-dark); font-family: var(--kf-font-heading);">${Math.min(100, Math.round((completedCount / 21) * 100))}%</span>
          <p style="font-size: 10.5px; color: var(--kf-text-muted); font-weight: 600; margin-top: 2px;">Progresso</p>
        </div>
      </div>

      <!-- Links Rápidos de Navegação (Seção 22) -->
      <section style="display: flex; flex-direction: column; gap: 10px;">
        <!-- Link 1: Meus bônus -->
        <div 
          class="kf-card" 
          data-action="change-tab" 
          data-tab="bonus"
          style="
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
            padding: 14px 16px; 
            cursor: pointer;
            transition: all var(--kf-transition-fast);
          "
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 36px; 
              height: 36px; 
              border-radius: 50%; 
              background: var(--kf-lilac-light); 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: var(--kf-lilac-dark);
              flex-shrink: 0;
            ">
              ${Icons.gift(18)}
            </div>
            <div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--kf-black); margin: 0; font-family: var(--kf-font-heading);">
                Meus bônus
              </h4>
              <p style="font-size: 11.5px; color: var(--kf-text-soft); margin: 0;">
                Guia Xô Barriguinha e Hábitos Coreanos
              </p>
            </div>
          </div>
          <div style="color: var(--kf-text-soft);">
            ${Icons.arrowRight(14)}
          </div>
        </div>

        <!-- Link 2: Preferências -->
        <div 
          class="kf-card" 
          id="btn-profile-preferences"
          data-action="show-preferences"
          style="
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
            padding: 14px 16px; 
            cursor: pointer;
            transition: all var(--kf-transition-fast);
          "
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 36px; 
              height: 36px; 
              border-radius: 50%; 
              background: var(--kf-bg-subtle); 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: var(--kf-text-muted);
              flex-shrink: 0;
            ">
              ${Icons.sparkles(16)}
            </div>
            <div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--kf-black); margin: 0; font-family: var(--kf-font-heading);">
                Preferências
              </h4>
              <p style="font-size: 11.5px; color: var(--kf-text-soft); margin: 0;">
                Lembretes calmos e som suave
              </p>
            </div>
          </div>
          <div style="color: var(--kf-text-soft);">
            ${Icons.arrowRight(14)}
          </div>
        </div>

        <!-- Link 3: Sobre o Korean Flow -->
        <div 
          class="kf-card" 
          data-action="scroll-to-about"
          style="
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
            padding: 14px 16px; 
            cursor: pointer;
            transition: all var(--kf-transition-fast);
          "
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 36px; 
              height: 36px; 
              border-radius: 50%; 
              background: var(--kf-bg-subtle); 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: var(--kf-text-muted);
              flex-shrink: 0;
            ">
              ${Icons.lotus(16)}
            </div>
            <div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--kf-black); margin: 0; font-family: var(--kf-font-heading);">
                Sobre o Korean Flow
              </h4>
              <p style="font-size: 11.5px; color: var(--kf-text-soft); margin: 0;">
                Pilates, consistência e filosofia K-Wellness
              </p>
            </div>
          </div>
          <div style="color: var(--kf-text-soft);">
            ${Icons.arrowRight(14)}
          </div>
        </div>
      </section>

      <!-- Formulário: Editar Nome de Exibição -->
      <section style="display: flex; flex-direction: column; gap: 12px;">
        ${renderSectionHeader({
          title: 'Dados Pessoais',
          subtitle: 'Como você deseja ser chamada no app'
        })}

        <div class="kf-card" style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <label for="input-profile-name" style="font-size: 12px; font-weight: 700; color: var(--kf-text-muted); text-transform: uppercase; letter-spacing: 0.04em;">
              Seu Nome
            </label>
            <input 
              type="text" 
              id="input-profile-name" 
              value="${escapeHtml(state.userName)}" 
              placeholder="Digite seu nome..."
              style="
                padding: 14px 16px; 
                border-radius: var(--kf-radius-md); 
                border: 1px solid var(--kf-border-subtle); 
                font-family: var(--kf-font-main); 
                font-size: 14px; 
                color: var(--kf-black); 
                background: var(--kf-bg-subtle); 
                outline: none;
                transition: border-color 0.2s;
              "
            />
          </div>

          ${renderButton({
            text: 'Salvar Nome',
            variant: 'primary',
            id: 'btn-save-profile-name',
            style: 'padding: 12px; font-size: 13.5px;'
          })}
        </div>
      </section>

      <!-- Acesso & Armazenamento do Produto (Fase 7 - Seção 3) -->
      <section style="display: flex; flex-direction: column; gap: 12px;">
        ${renderSectionHeader({
          title: 'Acesso & Armazenamento',
          subtitle: 'Privacidade e licença de uso do produto'
        })}

        <div class="kf-card" style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="
                width: 34px; 
                height: 34px; 
                border-radius: 50%; 
                background: var(--kf-lilac-light); 
                color: var(--kf-lilac-dark); 
                display: flex; 
                align-items: center; 
                justify-content: center;
              ">
                ${Icons.shield(16)}
              </div>
              <div>
                <h4 style="font-size: 13.5px; font-weight: 700; color: var(--kf-black); margin: 0; font-family: var(--kf-font-heading);">
                  Modo de Acesso Local
                </h4>
                <p style="font-size: 11.5px; color: var(--kf-text-soft); margin: 0;">
                  Dispositivo Atual • Licença Ativa
                </p>
              </div>
            </div>
            <span class="kf-badge kf-badge-lilac" style="font-size: 10.5px; font-weight: 700;">
              ATIVO
            </span>
          </div>

          <div style="
            background: var(--kf-bg-subtle);
            border-radius: var(--kf-radius-sm);
            padding: 12px 14px;
            border-left: 3px solid var(--kf-lilac-primary);
          ">
            <p style="font-size: 12.5px; color: var(--kf-text-main); margin: 0; line-height: 1.5;">
              <strong>Seus dados estão salvos localmente neste dispositivo.</strong> Em breve: sincronização em nuvem e acesso multiplataforma.
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11.5px; color: var(--kf-text-muted);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--kf-border-subtle); padding-bottom: 4px;">
              <span>Armazenamento:</span>
              <span style="font-weight: 600; color: var(--kf-black);">LocalStorage seguro (PWA Offline)</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--kf-border-subtle); padding-bottom: 4px;">
              <span>Privacidade:</span>
              <span style="font-weight: 600; color: var(--kf-black);">100% no seu dispositivo</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Sincronização Nuvem:</span>
              <span style="font-weight: 600; color: var(--kf-lilac-dark);">Preparado para próxima versão</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Demonstração & Controle da Jornada (Útil para testes do usuário) -->
      <section style="display: flex; flex-direction: column; gap: 12px;">
        ${renderSectionHeader({
          title: 'Controle de Demonstração',
          subtitle: 'Ferramentas para simulação do MVP'
        })}

        <div class="kf-card" style="display: flex; flex-direction: column; gap: 12px;">
          <p style="font-size: 12px; color: var(--kf-text-muted); line-height: 1.45;">
            Use os botões abaixo para testar instantaneamente a evolução de dias, streak e desbloqueio de conquistas.
          </p>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${renderButton({
              text: '+ Avançar 1 Dia',
              variant: 'secondary',
              id: 'btn-simulate-advance',
              style: 'flex: 1; padding: 12px; font-size: 13px; min-width: 130px;'
            })}

            ${renderButton({
              text: 'Simular Pausa (2 dias)',
              variant: 'secondary',
              id: 'btn-simulate-pause',
              style: 'flex: 1; padding: 12px; font-size: 13px; min-width: 130px;'
            })}

            ${renderButton({
              text: 'Reiniciar Jornada',
              variant: 'outline',
              id: 'btn-reset-journey',
              style: 'width: 100%; padding: 12px; font-size: 13px; color: #B05555; border-color: rgba(176, 85, 85, 0.3);'
            })}
          </div>

          <div style="margin-top: 4px; padding-top: 10px; border-top: 1px solid var(--kf-border-subtle);">
            ${renderButton({
              text: 'Rever Onboarding de Boas-Vindas',
              variant: 'secondary',
              id: 'btn-restart-onboarding',
              style: 'width: 100%; padding: 12px; font-size: 13px; background: var(--kf-lilac-light); color: var(--kf-lilac-dark);'
            })}
          </div>
        </div>
      </section>

      <!-- Sobre o Método Korean Flow -->
      <section style="display: flex; flex-direction: column; gap: 12px;">
        ${renderSectionHeader({
          title: 'Sobre o Método',
          subtitle: 'Filosofia K-Wellness'
        })}

        <div class="kf-card" style="display: flex; flex-direction: column; gap: 12px; font-size: 12.5px; color: var(--kf-text-muted); line-height: 1.55;">
          <p>
            O <strong>Método Korean Flow</strong> combina a precisão postural e ativação de core do Pilates clássico com a serenidade, alinhamento e rituais de autocuidado da cultura coreana.
          </p>
          <p>
            Durante os 21 dias, você cultiva uma relação de gentileza e respeito com seu corpo, desenvolvendo hábitos sustentáveis sem sofrimento.
          </p>
          <div style="padding-top: 8px; border-top: 1px solid var(--kf-border-subtle); display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 11px; color: var(--kf-text-soft);">Versão 1.0.0 • MVP Premium</span>
            <span class="kf-caption-korean" style="font-size: 10px;">KOREAN FLOW</span>
          </div>
        </div>
      </section>
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

function formatDate(isoStr) {
  try {
    const d = new Date(isoStr);
    return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
  } catch {
    return 'Recente';
  }
}
