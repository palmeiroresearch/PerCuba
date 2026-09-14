// === APP === //
// Inicialización, carga de datos, validación de formulario y orquestación.
let percentilesData = null;

const loadingState = document.getElementById('loadingState');
const errorMessage = document.getElementById('errorMessage');
const mainContent = document.getElementById('mainContent');
const resultsSection = document.getElementById('resultsSection');
const offlineBadge = document.getElementById('offlineBadge');

async function loadPercentiles() {
    try {
        const response = await fetch('percentiles-cubanos.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        percentilesData = await response.json();

        loadingState.style.display = 'none';
        mainContent.style.display = 'block';
    } catch (error) {
        console.error('Error al cargar las tablas de percentiles:', error);
        loadingState.style.display = 'none';
        errorMessage.innerHTML = `
            <strong>⚠️ Error al cargar las tablas</strong><br>
            No se pudo cargar el archivo de percentiles.
            <br><small>Asegúrese de tener conexión la primera vez, o de estar usando un servidor web.</small>
        `;
        errorMessage.style.display = 'block';
    }
}

function readInputs() {
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const edad = parseFloat(document.getElementById('edad').value);
    const unidadEdad = document.getElementById('unidadEdad').value;
    const peso = parseFloat(document.getElementById('peso').value) || null;
    const talla = parseFloat(document.getElementById('talla').value) || null;
    const cc = parseFloat(document.getElementById('circunferenciaCefalica').value) || null;
    return { sexo, edad, unidadEdad, peso, talla, cc };
}

function validateInputs({ edad, unidadEdad, peso, talla, cc }) {
    if (!edad || edad < 0) {
        UI.showToast('Por favor ingrese una edad válida', 'warning');
        return false;
    }
    if (!peso && !talla && !cc) {
        UI.showToast('Ingrese al menos una medida antropométrica', 'warning');
        return false;
    }
    if (unidadEdad === 'meses' && edad > 24) {
        UI.showToast('Para meses, ingrese un valor entre 0 y 24', 'warning');
        return false;
    }
    if (unidadEdad === 'anos' && edad > 19) {
        UI.showToast('Para años, ingrese un valor entre 0 y 19', 'warning');
        return false;
    }
    return true;
}

function calcularPercentiles() {
    const inputs = readInputs();
    if (!validateInputs(inputs)) return;

    const results = Percentiles.calculateAll(percentilesData, inputs);

    if (!results.length) {
        UI.showToast('No se encontraron datos de referencia para esa edad', 'error');
        return;
    }

    UI.renderResults(results);
}

function updateConnectionStatus() {
    offlineBadge.classList.toggle('show', !navigator.onLine);
}

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(reg => {
            console.log('Service Worker registrado:', reg);

            const checkForUpdate = (worker) => {
                worker.addEventListener('statechange', () => {
                    if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                        UI.showUpdateBanner(reg);
                    }
                });
            };

            reg.addEventListener('updatefound', () => checkForUpdate(reg.installing));

            // Si ya hay una versión esperando (ej. se cerró el banner en la sesión anterior)
            if (reg.waiting) UI.showUpdateBanner(reg);
        }).catch(err => console.log('Error al registrar Service Worker:', err));

        // Cuando el nuevo SW toma el control, recargar para servir los archivos nuevos
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    });
}

function initEventListeners() {
    document.getElementById('calcularBtn').addEventListener('click', calcularPercentiles);
    document.getElementById('themeToggleBtn').addEventListener('click', () => UI.toggleTheme());

    document.querySelectorAll('input[name="sexo"]').forEach(input => {
        input.addEventListener('change', updateSegmentedControl);
    });

    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
}

function updateSegmentedControl() {
    document.querySelectorAll('.segmented-option').forEach(option => {
        const input = document.getElementById(option.dataset.for);
        option.classList.toggle('selected', input.checked);
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    Storage.init();
    UI.applyTheme();
    initEventListeners();
    updateSegmentedControl();
    updateConnectionStatus();
    registerServiceWorker();
    await loadPercentiles();
});
