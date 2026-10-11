/**
 * COMPONENTE: Button
 * Botões com microinterações e variações estilísticas (primary, secondary, outline, gold)
 */

export function renderButton({
  text,
  variant = 'primary',
  icon = '',
  isBlock = false,
  className = '',
  id = '',
  dataAttributes = '',
  attributes = '',
  style = ''
}) {
  let variantClass = 'kf-btn-primary';
  if (variant === 'secondary') variantClass = 'kf-btn-secondary';
  if (variant === 'outline') variantClass = 'kf-btn-outline';
  if (variant === 'gold') variantClass = 'kf-btn-gold';

  const blockClass = isBlock ? 'kf-btn-block' : '';
  const extraAttrs = `${dataAttributes} ${attributes}`.trim();

  return `
    <button 
      type="button" 
      ${id ? `id="${id}"` : ''} 
      class="kf-btn ${variantClass} ${blockClass} ${className}" 
      style="${style}"
      ${extraAttrs}
    >
      ${icon ? `<span class="kf-btn-icon" style="display: flex; align-items: center;">${icon}</span>` : ''}
      <span class="kf-btn-text">${text}</span>
    </button>
  `;
}
