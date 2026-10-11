/**
 * COMPONENTE: DesktopNavigation
 * Cabeçalho refinado para desktop/tablet que se integra harmoniosamente ao topo
 */

import { Icons } from './Icons.js';

export function renderDesktopNavigation(activeTab, userName) {
  const tabs = [
    { id: 'home', label: 'Início', icon: Icons.home },
    { id: 'practice', label: 'Prática', icon: Icons.practice },
    { id: 'progress', label: 'Progresso', icon: Icons.progress },
    { id: 'habits', label: 'Hábitos', icon: Icons.habits },
    { id: 'bonus', label: 'Bônus', icon: Icons.gift },
    { id: 'profile', label: 'Perfil', icon: Icons.profile }
  ];

  const initial = (userName && userName.length > 0) ? userName.charAt(0).toUpperCase() : 'S';

  return `
    <div class="kf-desktop-nav-bar" style="display: none;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--kf-lilac-dark); display: flex; align-items: center; justify-content: center; color: white;">
          ${Icons.lotus(18)}
        </div>
        <span style="font-weight: 700; font-size: 15px; letter-spacing: -0.01em; color: var(--kf-black);">
          Korean Flow
        </span>
      </div>

      <div style="display: flex; align-items: center; gap: 6px;">
        ${tabs.map(tab => {
          const isActive = activeTab === tab.id || (tab.id === 'bonus' && activeTab === 'library');
          return `
            <button 
              type="button" 
              class="kf-desktop-nav-btn ${isActive ? 'active' : ''}" 
              data-tab="${tab.id}"
              style="
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 14px;
                border-radius: var(--kf-radius-full);
                font-size: 13px;
                font-weight: ${isActive ? '700' : '500'};
                color: ${isActive ? 'var(--kf-black)' : 'var(--kf-text-muted)'};
                background: ${isActive ? 'var(--kf-lilac-light)' : 'transparent'};
                border: none;
                cursor: pointer;
                transition: all 0.2s;
              "
            >
              ${tab.icon(16, isActive ? 2.2 : 1.8)}
              <span>${tab.label}</span>
            </button>
          `;
        }).join('')}
      </div>

      <div class="kf-avatar" style="width: 34px; height: 34px; font-size: 13px;" data-tab="profile">
        <span>${initial}</span>
      </div>
    </div>
  `;
}
