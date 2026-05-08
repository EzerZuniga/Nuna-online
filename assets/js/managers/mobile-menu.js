import { getById } from '../utils/dom.js';

export class MobileMenuManager {
    #menuEl;
    #toggleButtonEl;

    constructor() {
        this.#menuEl = getById('mobile-menu');
        this.#toggleButtonEl = getById('mobile-menu-button');
    }

    toggle() {
        if (!this.#menuEl || !this.#toggleButtonEl) {
            return;
        }

        const isHidden = this.#menuEl.classList.contains('hidden');
        this.#menuEl.classList.toggle('hidden');
        this.#toggleButtonEl.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        document.body.style.overflow = isHidden ? 'hidden' : '';
    }

    close() {
        if (!this.#menuEl || !this.#toggleButtonEl) {
            return;
        }

        this.#menuEl.classList.add('hidden');
        this.#toggleButtonEl.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}
