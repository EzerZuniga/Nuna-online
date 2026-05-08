import { escapeHtml } from '../utils/formatters.js';

export function renderProductCard(product, currency) {
    return `
        <article class="product-card">
            <div class="product-image-wrapper">
                <img
                    src="${escapeHtml(product.image)}"
                    alt="${escapeHtml(product.name)}"
                    class="product-image"
                    loading="lazy">
                <div class="product-badge">
                    <span class="badge ${product.badgeClass}">${escapeHtml(product.badge)}</span>
                </div>
            </div>
            <div class="product-content">
                <h3 class="product-title font-display">${escapeHtml(product.name)}</h3>
                <p class="product-description">${escapeHtml(product.description)}</p>
                <div class="product-footer">
                    <div>
                        <span class="product-price">
                            <span class="product-price-currency">${currency}</span>
                            ${product.price}
                        </span>
                    </div>
                    <button
                        class="btn btn-primary"
                        style="padding: 0.75rem 1.5rem; font-size: 0.875rem;"
                        data-action="add-to-cart"
                        data-product-id="${product.id}">
                        Agregar
                    </button>
                </div>
            </div>
        </article>
    `;
}
