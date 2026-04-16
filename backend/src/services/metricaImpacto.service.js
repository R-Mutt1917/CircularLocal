const { MetricaImpacto } = require('../models');

const actualizarMetricaPorPeriodo = async (periodo, cantidadReutilizada, fecha) => {
    const [metrica] = await MetricaImpacto.findOrCreate({
        where: { periodo },
        defaults: {
            totalIntercambios: 0,
            totalMaterialesReutilizados: 0
        }
    });

    await metrica.increment({
        totalIntercambios: 1,
        totalMaterialesReutilizados: cantidadReutilizada,
    });

    await metrica.update({
        fechaUltimaActualizacion: fecha
    });
};

module.exports = {
    actualizarMetricaPorPeriodo,
};