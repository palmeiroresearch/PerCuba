// === CONFIG === //
// Versión de la app — usada por la UI y por sw.js (mantener sincronizada con CACHE_NAME en service-worker.js)
const APP_VERSION = '1.2.1';

// Metadata de cada medida antropométrica calculable
const MEASURE_CONFIG = {
    peso: {
        icon: '⚖️',
        title: 'Peso para la Edad',
        category: 'peso'
    },
    talla: {
        icon: '📏',
        title: 'Talla para la Edad',
        category: 'talla'
    },
    circunferencia_cefalica: {
        icon: '👶',
        title: 'Circunferencia Cefálica',
        category: 'circunferencia_cefalica'
    },
    imc: {
        icon: '📊',
        title: 'Índice de Masa Corporal (IMC)',
        category: 'imc'
    },
    peso_para_talla: {
        icon: '📏⚖️',
        title: 'Peso para la Talla',
        category: 'peso_para_talla'
    }
};

const DEFAULT_SETTINGS = {
    darkMode: true
};
