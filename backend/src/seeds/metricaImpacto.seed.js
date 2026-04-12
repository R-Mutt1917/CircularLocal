const MetricaImpacto = require('../models/metricaImpacto.model');

const inicializarMetricas = async () => {
    await MetricaImpacto.findOrCreate({
        where: { periodo: 'global' },
        defaults: {
            totalIntercambios: 0,
            totalMaterialesReutilizados: 0,
            totalServiciosBrindados: 0
        }
    });
};

module.exports = { inicializarMetricas };