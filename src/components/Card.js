/**
 * COMPONENTE: Card
 * Container arredondado com raio de 20-24px e sombras ultra-leves
 */

export function renderCard({ content, variant = 'default', className = '', style = '', id = '' }) {
  let variantClass = '';
  if (variant === 'lilac') variantClass = 'kf-card-lilac';
  if (variant === 'dark') variantClass = 'kf-card-dark';

  return `
    <div 
      ${id ? `id="${id}"` : ''} 
      class="kf-card ${variantClass} ${className}" 
      style="${style}"
    >
      ${content}
    </div>
  `;
}
