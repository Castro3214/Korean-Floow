/**
 * COMPONENTE: AchievementCard
 * Badge visual de conquistas com estética dourada discreta (#C8A45D), lilás e branco
 * Suporte suave a conquistas bloqueadas (🔒) e desbloqueadas (✓)
 */

import { Icons } from './Icons.js';

function renderAchievementIcon(iconName, isUnlocked) {
  const size = 20;
  switch (iconName) {
    case 'flame':
      return Icons.flame(size);
    case 'award':
      return Icons.award(size);
    case 'sparkles':
      return Icons.sparkles(size);
    case 'crown':
      return Icons.crown(size);
    case 'flower-lotus':
    case 'lotus':
      return Icons.lotus(size);
    case 'heart-handshake':
      return Icons.heart(size);
    case 'compass':
      return Icons.compass(size);
    case 'star':
      return Icons.star(size);
    default:
      return isUnlocked ? Icons.crown(size) : Icons.award(size);
  }
}

export function renderAchievementCard(achievement, isUnlocked = false) {
  const iconSvg = renderAchievementIcon(achievement.icon, isUnlocked);

  return `
    <div 
      class="kf-card kf-achievement-card ${isUnlocked ? 'kf-achievement-unlocked' : 'kf-achievement-locked'}" 
      style="
        padding: 16px; 
        display: flex; 
        align-items: center; 
        gap: 14px; 
        border-radius: var(--kf-radius-md);
        background: ${isUnlocked ? 'linear-gradient(145deg, #FFFFFF 0%, #FAF6EE 100%)' : 'var(--kf-bg-card)'};
        border: 1px solid ${isUnlocked ? 'rgba(200, 164, 93, 0.45)' : 'var(--kf-border-subtle)'};
        opacity: ${isUnlocked ? '1' : '0.72'};
        transition: all var(--kf-transition-base);
        box-shadow: ${isUnlocked ? '0 4px 18px rgba(200, 164, 93, 0.12)' : 'none'};
      "
    >
      <div 
        style="
          width: 44px; 
          height: 44px; 
          border-radius: var(--kf-radius-full); 
          background: ${isUnlocked ? 'linear-gradient(135deg, #DFBE7B 0%, var(--kf-gold) 100%)' : 'var(--kf-bg-subtle)'}; 
          color: ${isUnlocked ? '#FFFFFF' : 'var(--kf-text-soft)'}; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          flex-shrink: 0;
          box-shadow: ${isUnlocked ? 'var(--kf-shadow-gold)' : 'none'};
          transition: transform 0.2s ease;
        "
      >
        ${iconSvg}
      </div>

      <div style="display: flex; flex-direction: column; gap: 3px; flex: 1;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <h4 style="font-size: 14px; font-weight: 700; color: ${isUnlocked ? 'var(--kf-black)' : 'var(--kf-text-muted)'}; display: flex; align-items: center; gap: 6px;">
            ${isUnlocked ? '<span style="color: var(--kf-gold); font-size: 13px;">✓</span>' : '<span style="color: var(--kf-text-soft); font-size: 12px;">🔒</span>'}
            ${achievement.title}
          </h4>
          <span class="kf-badge ${isUnlocked ? 'kf-badge-gold' : 'kf-badge-lilac'}" style="font-size: 9.5px; padding: 2px 8px; font-weight: 700;">
            ${achievement.koreanBadge}
          </span>
        </div>

        <p style="font-size: 12px; color: var(--kf-text-muted); line-height: 1.35;">
          ${achievement.description}
        </p>

        <span style="font-size: 11px; font-weight: 600; color: ${isUnlocked ? 'var(--kf-gold)' : 'var(--kf-text-soft)'}; margin-top: 2px;">
          ${isUnlocked ? '✓ Desbloqueada' : `Requisito: ${achievement.requirement}`}
        </span>
      </div>
    </div>
  `;
}

