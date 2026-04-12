const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MetricaImpacto = sequelize.define('MetricaImpacto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    totalIntercambios: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    totalMaterialesReutilizados: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    totalServiciosBrindados: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaUltimaActualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'MetricaImpacto',
    timestamps: false
});

module.exports = MetricaImpacto;