/**
 * COMPONENTE: HabitItem
 * Item interativo de hábito diário com checkbox animado e feedback
 */

import { Icons } from './Icons.js';

export function renderHabitItem(habit, isChecked = false) {
  return `
    <div 
      class="kf-card kf-habit-item ${isChecked ? 'completed' : ''}" 
      data-action="toggle-habit"
      data-habit-id="${habit.id}"
      style="
        padding: 16px; 
        display: flex; 
        align-items: center; 
        justify-content: space-between; 
        gap: 14px; 
        cursor: pointer;
        background: ${isChecked ? 'rgba(237, 231, 243, 0.45)' : 'var(--kf-bg-card)'};
        border-color: ${isChecked ? 'rgba(143, 120, 168, 0.4)' : 'var(--kf-border-subtle)'};
        border-radius: var(--kf-radius-card);
        transition: all var(--kf-transition-fast);
      "
    >
      <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
        <div 
          class="kf-checkbox ${isChecked ? 'checked' : ''}"
          style="
            width: 24px; 
            height: 24px; 
            border-radius: 50%; 
            border: 2px solid ${isChecked ? 'var(--kf-lilac-dark)' : 'var(--kf-border-subtle)'}; 
            background: ${isChecked ? 'var(--kf-lilac-dark)' : 'transparent'}; 
            color: #FFFFFF; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            flex-shrink: 0;
            transition: all var(--kf-transition-fast);
            box-shadow: ${isChecked ? '0 2px 8px rgba(143, 120, 168, 0.3)' : 'none'};
          "
        >
          ${isChecked ? Icons.check(13) : ''}
        </div>

        <div style="display: flex; flex-direction: column; gap: 2px;">
          <span style="
            font-size: 14px; 
            font-weight: 700; 
            color: ${isChecked ? 'var(--kf-text-secondary)' : 'var(--kf-black)'}; 
            font-family: var(--kf-font-heading);
            letter-spacing: -0.01em;
          ">
            ${habit.title}
          </span>
          <span style="font-size: 12px; color: var(--kf-text-soft); line-height: 1.35;">
            ${habit.description}
          </span>
        </div>
      </div>

      <span class="kf-badge ${isChecked ? 'kf-badge-lilac' : 'kf-badge-white'}" style="font-size: 10px; flex-shrink: 0;">
        ${habit.tag}
      </span>
    </div>
  `;
}
