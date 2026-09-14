// === STORAGE === //
// Persistencia mínima en LocalStorage (solo preferencia de tema por ahora)
const Storage = {
    KEYS: {
        SETTINGS: 'percub_settings'
    },

    init() {
        if (!this.get(this.KEYS.SETTINGS)) this.setSettings(DEFAULT_SETTINGS);
    },

    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            // Almacenamiento no disponible (modo privado, cuota excedida, etc.) — no es crítico
        }
    },

    getSettings() {
        return { ...DEFAULT_SETTINGS, ...(this.get(this.KEYS.SETTINGS) || {}) };
    },

    setSettings(settings) {
        this.set(this.KEYS.SETTINGS, settings);
    },

    getSetting(key) {
        return this.getSettings()[key];
    },

    updateSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        this.setSettings(settings);
    }
};
