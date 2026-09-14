// === UI === //
// Renderizado dinámico — tarjetas de resultado, toasts y tema.
const UI = {

    applyTheme() {
        const darkMode = Storage.getSetting('darkMode');
        document.body.classList.toggle('dark-mode', !!darkMode);
    },

    toggleTheme() {
        const darkMode = !Storage.getSetting('darkMode');
        Storage.updateSetting('darkMode', darkMode);
        this.applyTheme();
    },

    showToast(message, type = 'info', duration = 3500) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = { success: '✓', error: '✕', warning: '⚠️', info: 'ℹ️' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.25s ease forwards';
            setTimeout(() => toast.remove(), 260);
        }, duration);
    },

    showUpdateBanner(registration) {
        if (document.getElementById('updateBanner')) return;

        const banner = document.createElement('div');
        banner.id = 'updateBanner';
        banner.className = 'update-banner';
        banner.innerHTML = `
            <div class="update-banner__icon">🔄</div>
            <div class="update-banner__body">
                <div class="update-banner__title">Nueva versión disponible</div>
                <div class="update-banner__sub">Toca "Ahora" para actualizar</div>
            </div>
            <div class="update-banner__actions">
                <button id="updateNowBtn" class="update-btn update-btn--primary">Ahora</button>
                <button id="dismissUpdateBtn" class="update-btn update-btn--secondary">Luego</button>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('updateNowBtn').addEventListener('click', () => {
            if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        });

        document.getElementById('dismissUpdateBtn').addEventListener('click', () => {
            banner.classList.add('update-banner--dismissing');
            setTimeout(() => banner.remove(), 350);
        });
    },

    renderResults(results) {
        const section = document.getElementById('resultsSection');
        if (!results.length) {
            section.innerHTML = '';
            section.style.display = 'none';
            return;
        }
        section.innerHTML = results.map(r => this.createResultCard(r)).join('');
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    createResultCard(result) {
        const config = MEASURE_CONFIG[result.key];
        const percentileRounded = Math.round(result.percentile * 10) / 10;
        const percentileRange = Percentiles.getPercentileRange(result.percentile);
        const markerPos = Math.min(100, Math.max(0, result.percentile));
        const interp = result.interpretation;

        const ageData = result.ageData;
        const p3 = ageData.p3 !== undefined ? ageData.p3.toFixed(1) : '—';
        const p50 = ageData.p50 !== undefined ? ageData.p50.toFixed(1) : '—';
        const p97 = ageData.p97 !== undefined ? ageData.p97.toFixed(1) : '—';

        let disclaimerHtml = '';
        if (result.disclaimer) {
            disclaimerHtml = `
                <div class="disclaimer-box">
                    <strong>⚠️ Nota:</strong> El IMC en menores de 5 años debe usarse con cautela.
                    Priorizar peso para talla y evaluación clínica completa.
                </div>
            `;
        }

        return `
            <div class="result-card" data-category="${config.category}">
                <div class="result-card-header">
                    <div class="result-icon-wrapper">${config.icon}</div>
                    <h3>${config.title}</h3>
                </div>

                <div class="percentile-range">${percentileRange}</div>
                <div class="percentile-meta">Percentil exacto: ${percentileRounded}</div>
                <div class="percentile-meta">Valor medido: ${result.value}</div>

                <div class="percentile-bar-container">
                    <div class="percentile-marker" style="left: ${markerPos}%"></div>
                </div>
                <div class="percentile-labels">
                    <span>P3</span><span>P10</span><span>P25</span><span>P50</span><span>P75</span><span>P90</span><span>P97</span>
                </div>

                <div class="interpretation-box">
                    <span class="interp-label interp-${interp.color}">${interp.text}</span>
                    <br>
                    <strong>Valores de referencia para esta edad/talla:</strong><br>
                    P3: ${p3} &nbsp;|&nbsp; P50: ${p50} &nbsp;|&nbsp; P97: ${p97}
                </div>
                ${disclaimerHtml}
            </div>
        `;
    }
};
