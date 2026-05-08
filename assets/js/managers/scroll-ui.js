import { debounce } from '../utils/formatters.js';
import { getById } from '../utils/dom.js';

export function initializeScrollUi({ debounceMs }) {
    const scrollProgressEl = getById('scroll-progress');
    const headerEl = document.querySelector('.site-header');

    const updateScrollProgress = debounce(() => {
        if (!scrollProgressEl) {
            return;
        }

        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        scrollProgressEl.style.width = `${scrolled}%`;
    }, debounceMs);

    const updateHeaderStyle = () => {
        if (!headerEl) {
            return;
        }

        const currentScroll = window.pageYOffset;
        headerEl.classList.toggle('scrolled', currentScroll > 100);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('scroll', updateHeaderStyle, { passive: true });

    updateScrollProgress();
    updateHeaderStyle();
}
