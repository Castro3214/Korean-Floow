/**
 * COMPONENTE: Avatar
 * Avatar circular com inicial do nome e acabamento refinado
 */

export function renderAvatar({ name = 'Sofia', size = 44, fontSize = 16, id = '', className = '', style = '' }) {
  const initial = (name && name.length > 0) ? name.charAt(0).toUpperCase() : 'S';

  return `
    <div 
      ${id ? `id="${id}"` : ''} 
      class="kf-avatar ${className}" 
      style="width: ${size}px; height: ${size}px; font-size: ${fontSize}px; ${style}"
    >
      <span>${initial}</span>
    </div>
  `;
}
