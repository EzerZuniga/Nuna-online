import { CONFIG } from './config.js';
import { PRODUCTS } from './data/products.js';
import { CartStore } from './state/cart-store.js';
import { renderProductCard } from './components/product-card.js';
import { formatPrice, escapeHtml } from './utils/formatters.js';
import { NotificationManager } from './managers/notifications.js';
import { MobileMenuManager } from './managers/mobile-menu.js';
import { initializeScrollUi } from './managers/scroll-ui.js';

function initializeApp() {
    const cartStore = new CartStore(CONFIG.storageKeys.cart);
    cartStore.load();

    const notifications = new NotificationManager({
        durationMs: CONFIG.toastDurationMs
    });

    const mobileMenu = new MobileMenuManager();

    initializeScrollUi({ debounceMs: CONFIG.scrollDebounceMs });
    bindGlobalUiEvents({ cartStore, notifications, mobileMenu });
    updateCartBadges(cartStore);

    const page = document.body.dataset.page;
    if (page === 'home') {
        renderFeaturedProducts(cartStore, notifications);
    }

    if (page === 'catalog') {
        renderCatalogPage(cartStore, notifications);
    }

    if (page === 'cart') {
        renderCartPage(cartStore, notifications);
    }

    console.log(`Nuna multipage initialized: ${page || 'default'}`);
}

function bindGlobalUiEvents({ cartStore, notifications, mobileMenu }) {
    document.addEventListener('click', (event) => {
        if (event.target.id === 'mobile-menu') {
            mobileMenu.close();
            return;
        }

        const actionTarget = event.target.closest('[data-action]');
        if (!actionTarget) {
            return;
        }

        const { action, productId, quantity } = actionTarget.dataset;

        if (action === 'toggle-mobile-menu') {
            mobileMenu.toggle();
            return;
        }

        if (action === 'close-mobile-menu') {
            mobileMenu.close();
            return;
        }

        if (document.body.dataset.page !== 'cart') {
            return;
        }

        if (action === 'cart-change-qty' && productId && quantity) {
            cartStore.updateQuantity(productId, Number(quantity));
            updateCartBadges(cartStore);
            renderCartPage(cartStore, notifications);
            return;
        }

        if (action === 'cart-remove' && productId) {
            const removed = cartStore.remove(productId);
            if (removed) {
                notifications.show(`${removed.name} eliminado del carrito`);
            }

            updateCartBadges(cartStore);
            renderCartPage(cartStore, notifications);
            return;
        }

        if (action === 'clear-cart-page') {
            cartStore.clear();
            notifications.show('Carrito vaciado');
            updateCartBadges(cartStore);
            renderCartPage(cartStore, notifications);
            return;
        }

        if (action === 'checkout-cart-page') {
            checkout(cartStore, notifications);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            mobileMenu.close();
        }
    });
}

function renderFeaturedProducts(cartStore, notifications) {
    const featuredGrid = document.getElementById('featured-grid');
    if (!featuredGrid) {
        return;
    }

    const featuredProducts = PRODUCTS.slice(0, CONFIG.featuredProductsCount);
    featuredGrid.innerHTML = featuredProducts
        .map((product) => renderProductCard(product, CONFIG.currency))
        .join('');

    bindProductGridEvents(featuredGrid, cartStore, notifications);
}

function renderCatalogPage(cartStore, notifications) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = PRODUCTS.map((product) => renderProductCard(product, CONFIG.currency)).join('');

    bindProductGridEvents(productGrid, cartStore, notifications);
}

function bindProductGridEvents(gridElement, cartStore, notifications) {
    if (!gridElement.dataset.bound) {
        gridElement.addEventListener('click', (event) => {
            const button = event.target.closest('[data-action="add-to-cart"]');
            if (!button) {
                return;
            }

            const productId = button.dataset.productId;
            const product = PRODUCTS.find((item) => item.id === productId);
            if (!product) {
                return;
            }

            cartStore.add(product);
            updateCartBadges(cartStore);
            notifications.show(`${product.name} agregado al carrito`);
        });
        gridElement.dataset.bound = 'true';
    }
}

function renderCartPage(cartStore, notifications) {
    const cartItemsContainer = document.getElementById('cart-page-items');
    const subtotalElement = document.getElementById('cart-page-subtotal');
    const totalElement = document.getElementById('cart-page-total');

    if (!cartItemsContainer || !subtotalElement || !totalElement) {
        return;
    }

    const cartItems = cartStore.items;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <h2 class="font-display text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
                <p class="text-gray-600 mb-6">Explora nuestro catálogo y encuentra tu próxima pieza favorita.</p>
                <a href="./catalogo.html" class="btn btn-primary">Ir al Catálogo</a>
            </div>
        `;

        subtotalElement.textContent = formatPrice(0, CONFIG.currency);
        totalElement.textContent = formatPrice(0, CONFIG.currency);
        return;
    }

    cartItemsContainer.innerHTML = `
        <div class="space-y-4">
            ${cartItems
                .map(
                    (item) => `
                        <article class="cart-item">
                            <img
                                src="${escapeHtml(item.image)}"
                                alt="${escapeHtml(item.name)}"
                                class="cart-item-image">
                            <div class="flex-1 min-w-0">
                                <h3 class="font-semibold mb-1 truncate">${escapeHtml(item.name)}</h3>
                                <p class="text-sm mb-2" style="color: var(--oro-inca);">
                                    ${formatPrice(item.price, CONFIG.currency)}
                                </p>
                                <div class="cart-item__controls">
                                    <button
                                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                                        aria-label="Disminuir cantidad"
                                        data-action="cart-change-qty"
                                        data-product-id="${item.id}"
                                        data-quantity="${item.quantity - 1}">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                            <path d="M5 12h14"></path>
                                        </svg>
                                    </button>
                                    <span class="cart-item__qty">${item.quantity}</span>
                                    <button
                                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                                        aria-label="Aumentar cantidad"
                                        data-action="cart-change-qty"
                                        data-product-id="${item.id}"
                                        data-quantity="${item.quantity + 1}">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                            <path d="M12 5v14M5 12h14"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button
                                class="p-2 text-red-500 hover:bg-red-50 rounded-full transition self-start"
                                aria-label="Eliminar producto"
                                data-action="cart-remove"
                                data-product-id="${item.id}">
                                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            </button>
                        </article>
                    `
                )
                .join('')}
        </div>
    `;

    const total = cartStore.getTotal();
    subtotalElement.textContent = formatPrice(total, CONFIG.currency);
    totalElement.textContent = formatPrice(total, CONFIG.currency);
}

function checkout(cartStore, notifications) {
    if (cartStore.getItemCount() === 0) {
        notifications.show('Tu carrito está vacío');
        return;
    }

    const total = cartStore.getTotal();
    const itemCount = cartStore.getItemCount();

    alert(
        `Gracias por tu compra.\n\nTotal: ${formatPrice(total, CONFIG.currency)}\nProductos: ${itemCount}\n\nAquí se procesaría el pago en una integración real.`
    );

    cartStore.clear();
    updateCartBadges(cartStore);
    renderCartPage(cartStore, notifications);
}

function updateCartBadges(cartStore) {
    const count = cartStore.getItemCount();

    const desktopBadge = document.getElementById('cart-count-badge');
    if (desktopBadge) {
        desktopBadge.textContent = String(count);
        desktopBadge.classList.toggle('hidden', count === 0);
    }

    const mobileCount = document.getElementById('mobile-cart-count');
    if (mobileCount) {
        mobileCount.textContent = String(count);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
