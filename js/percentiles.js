// === LÓGICA DE PERCENTILES === //
// Fórmulas y reglas puras — sin tocar el DOM. Recibe percentilesData como parámetro.
const Percentiles = {

    interpolate(value, lower, upper, lowerPercentile, upperPercentile) {
        if (value <= lower) return lowerPercentile;
        if (value >= upper) return upperPercentile;
        const ratio = (value - lower) / (upper - lower);
        return lowerPercentile + ratio * (upperPercentile - lowerPercentile);
    },

    findPercentile(value, ageData) {
        if (!ageData) return null;

        const percentiles = ['p3', 'p10', 'p25', 'p50', 'p75', 'p90', 'p97'];
        const percentileValues = [3, 10, 25, 50, 75, 90, 97];

        for (let i = 0; i < percentiles.length - 1; i++) {
            const lower = ageData[percentiles[i]];
            const upper = ageData[percentiles[i + 1]];

            if (value >= lower && value <= upper) {
                return this.interpolate(value, lower, upper, percentileValues[i], percentileValues[i + 1]);
            }
        }

        if (value < ageData.p3) {
            return Math.max(0, 3 * (value / ageData.p3));
        }

        if (value > ageData.p97) {
            return Math.min(100, 97 + 3 * ((value - ageData.p97) / (ageData.p97 * 0.1)));
        }

        return null;
    },

    findAgeData(percentilesData, edad, unidad, sexo, category) {
        const data = percentilesData[category][sexo];
        const dataArray = unidad === 'meses' ? data.meses : data.anos;

        if (!dataArray) return null;

        let exactMatch = dataArray.find(d => Math.abs(d.edad - edad) < 0.01);
        if (exactMatch) return exactMatch;

        let lower = null;
        let upper = null;

        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].edad <= edad) lower = dataArray[i];
            if (dataArray[i].edad >= edad && !upper) { upper = dataArray[i]; break; }
        }

        if (!lower || !upper) return lower || upper;
        if (lower === upper) return lower;

        const interpolated = { edad };
        const percentiles = ['p3', 'p10', 'p25', 'p50', 'p75', 'p90', 'p97'];

        percentiles.forEach(p => {
            interpolated[p] = this.interpolate(edad, lower.edad, upper.edad, lower[p], upper[p]);
        });

        return interpolated;
    },

    findPesoParaTallaData(percentilesData, talla, sexo) {
        const data = percentilesData.peso_para_talla[sexo];
        const tipo = talla < 85 ? 'supina' : 'estatura';
        const dataArray = data[tipo];

        if (!dataArray) return null;

        for (let i = 0; i < dataArray.length; i++) {
            const [min, max] = dataArray[i].rango.split('-').map(parseFloat);
            if (talla >= min && talla <= max) return dataArray[i];
        }

        return null;
    },

    getPercentileRange(percentile) {
        const rounded = Math.round(percentile * 10) / 10;
        const exactPercentiles = [3, 10, 25, 50, 75, 90, 97];

        for (const p of exactPercentiles) {
            if (Math.abs(rounded - p) < 0.1) return `P${p}`;
        }

        if (percentile < 3) return '< P3';
        if (percentile < 10) return 'P3 - P10';
        if (percentile < 25) return 'P10 - P25';
        if (percentile < 50) return 'P25 - P50';
        if (percentile < 75) return 'P50 - P75';
        if (percentile < 90) return 'P75 - P90';
        if (percentile < 97) return 'P90 - P97';
        return '> P97';
    },

    // color: 'success' | 'warning' | 'danger' — se mapea a variables CSS en ui.js
    getInterpretation(percentile) {
        if (percentile < 3) {
            return { text: 'Bajo peso/talla para la edad', color: 'danger' };
        } else if (percentile < 10) {
            return { text: 'Peso/talla por debajo del promedio', color: 'warning' };
        } else if (percentile <= 90) {
            return { text: 'Peso/talla normal para la edad', color: 'success' };
        } else if (percentile <= 97) {
            return { text: 'Peso/talla por encima del promedio', color: 'warning' };
        }
        return { text: 'Sobrepeso/talla elevada para la edad', color: 'danger' };
    },

    getInterpretationIMC(percentile) {
        if (percentile < 3) return { text: 'Desnutrición', color: 'danger' };
        if (percentile < 85) return { text: 'Peso normal', color: 'success' };
        if (percentile < 95) return { text: 'Sobrepeso', color: 'warning' };
        return { text: 'Obesidad', color: 'danger' };
    },

    getInterpretationPesoTalla(percentile) {
        if (percentile < 3) return { text: 'Desnutrición aguda severa', color: 'danger' };
        if (percentile < 10) return { text: 'Desnutrición aguda', color: 'warning' };
        if (percentile <= 90) return { text: 'Nutrición adecuada', color: 'success' };
        if (percentile <= 97) return { text: 'Riesgo de sobrepeso', color: 'warning' };
        return { text: 'Sobrepeso/Obesidad', color: 'danger' };
    },

    // Orquesta el cálculo completo a partir de los inputs del formulario.
    // Devuelve { results: [...], errors: [...] }
    calculateAll(percentilesData, inputs) {
        const { sexo, edad, unidadEdad, peso, talla, cc } = inputs;
        const results = [];

        if (peso) {
            const ageData = this.findAgeData(percentilesData, edad, unidadEdad, sexo, 'peso');
            if (ageData) {
                const percentile = this.findPercentile(peso, ageData);
                results.push({
                    key: 'peso',
                    value: `${peso} kg`,
                    percentile,
                    interpretation: this.getInterpretation(percentile),
                    ageData
                });
            }
        }

        if (talla) {
            const ageData = this.findAgeData(percentilesData, edad, unidadEdad, sexo, 'talla');
            if (ageData) {
                const percentile = this.findPercentile(talla, ageData);
                results.push({
                    key: 'talla',
                    value: `${talla} cm`,
                    percentile,
                    interpretation: this.getInterpretation(percentile),
                    ageData
                });
            }
        }

        if (cc) {
            const ageData = this.findAgeData(percentilesData, edad, unidadEdad, sexo, 'circunferencia_cefalica');
            if (ageData) {
                const percentile = this.findPercentile(cc, ageData);
                results.push({
                    key: 'circunferencia_cefalica',
                    value: `${cc} cm`,
                    percentile,
                    interpretation: this.getInterpretation(percentile),
                    ageData
                });
            }
        }

        if (peso && talla) {
            const imc = peso / Math.pow(talla / 100, 2);
            const edadAnos = unidadEdad === 'meses' ? edad / 12 : edad;
            const imcData = percentilesData.imc[sexo];
            const ageData = imcData.find(d => Math.abs(d.edad - edadAnos) < 0.1);

            if (ageData) {
                const percentile = this.findPercentile(imc, ageData);
                results.push({
                    key: 'imc',
                    value: `${imc.toFixed(1)} kg/m²`,
                    percentile,
                    interpretation: this.getInterpretationIMC(percentile),
                    ageData,
                    disclaimer: edadAnos < 5
                });
            }

            const pesoTallaData = this.findPesoParaTallaData(percentilesData, talla, sexo);
            if (pesoTallaData) {
                const percentile = this.findPercentile(peso, pesoTallaData);
                results.push({
                    key: 'peso_para_talla',
                    value: `${peso} kg para ${talla} cm`,
                    percentile,
                    interpretation: this.getInterpretationPesoTalla(percentile),
                    ageData: pesoTallaData
                });
            }
        }

        return results;
    }
};
