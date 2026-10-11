/**
 * COMPONENTE: BottomNavigation
 * Barra inferior fixa mobile com 5 abas e microinterações táteis
 */

import { Icons } from './Icons.js';

export function renderBottomNavigation(activeTab) {
  const tabs = [
    { id: 'home', label: 'Início', icon: Icons.home },
    { id: 'practice', label: 'Prática', icon: Icons.practice },
    { id: 'progress', label: 'Progresso', icon: Icons.progress },
    { id: 'habits', label: 'Hábitos', icon: Icons.habits },
    { id: 'bonus', label: 'Bônus', icon: Icons.gift },
    { id: 'profile', label: 'Perfil', icon: Icons.profile }
  ];

  return `
    <nav class="kf-bottom-nav" aria-label="Navegação Principal">
      ${tabs.map(tab => {
        const isActive = activeTab === tab.id || (tab.id === 'bonus' && activeTab === 'library');
        return `
          <button 
            type="button" 
            class="kf-nav-item ${isActive ? 'active' : ''}" 
            data-tab="${tab.id}"
            aria-label="${tab.label}"
            aria-current="${isActive ? 'page' : 'false'}"
          >
            ${tab.icon(20, isActive ? 2.2 : 1.8)}
            <span class="kf-nav-label">${tab.label}</span>
          </button>
        `;
      }).join('')}
    </nav>
  `;
}
