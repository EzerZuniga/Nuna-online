export class CartStore {
    #items = [];
    #storageKey;

    constructor(storageKey) {
        this.#storageKey = storageKey;
    }

    get items() {
        return [...this.#items];
    }

    add(product) {
        const existing = this.#items.find((item) => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.#items.push({ ...product, quantity: 1 });
        }

        this.save();
    }

    remove(productId) {
        const index = this.#items.findIndex((item) => item.id === productId);
        if (index < 0) {
            return null;
        }

        const [removed] = this.#items.splice(index, 1);
        this.save();
        return removed;
    }

    updateQuantity(productId, quantity) {
        const item = this.#items.find((currentItem) => currentItem.id === productId);
        if (!item) {
            return null;
        }

        if (quantity <= 0) {
            return this.remove(productId);
        }

        item.quantity = quantity;
        this.save();
        return item;
    }

    clear() {
        this.#items = [];
        this.save();
    }

    getTotal() {
        return this.#items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    getItemCount() {
        return this.#items.reduce((sum, item) => sum + item.quantity, 0);
    }

    load() {
        try {
            const saved = localStorage.getItem(this.#storageKey);
            this.#items = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            this.#items = [];
        }
    }

    save() {
        try {
            localStorage.setItem(this.#storageKey, JSON.stringify(this.#items));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }
}
