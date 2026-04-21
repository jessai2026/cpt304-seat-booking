'use strict';

const i18n = {
    currentLang: localStorage.getItem('lang') || 'en',

    async load(lang) {
        try {
            const res = await fetch(`locales/${lang}.json`);
            const data = await res.json();
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            this._apply(data);
        } catch (e) {
            console.warn(`i18n: failed to load language "${lang}"`, e);
        }
    },

    _apply(data) {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (data[key] !== undefined) {
                el.textContent = data[key];
            }
        });
    },

    toggle() {
        const next = this.currentLang === 'en' ? 'zh' : 'en';
        this.load(next);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    i18n.load(i18n.currentLang);
});
