export function formatPrice(price, currency) {
    return `${currency} ${Number(price).toFixed(0)}`;
}

export function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = String(value ?? '');
    return div.innerHTML;
}

export function debounce(fn, waitMs) {
    let timeoutId;

    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => fn(...args), waitMs);
    };
}
