import { getById } from '../utils/dom.js';

export class NotificationManager {
    #toastEl;
    #messageEl;
    #durationMs;
    #timerId;

    constructor({ durationMs }) {
        this.#toastEl = getById('notification-toast');
        this.#messageEl = getById('notification-message');
        this.#durationMs = durationMs;
    }

    show(message) {
        if (!this.#toastEl || !this.#messageEl) {
            return;
        }

        this.#messageEl.textContent = message;
        this.#toastEl.classList.add('show');

        window.clearTimeout(this.#timerId);
        this.#timerId = window.setTimeout(() => {
            this.#toastEl.classList.remove('show');
        }, this.#durationMs);
    }
}
