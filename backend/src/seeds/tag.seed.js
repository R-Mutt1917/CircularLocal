const Tag = require('../models/tags.model');

const seedTags = async () => {
    const initialTags = [
        'Madera Recup.',
        'Textiles Orgánicos',
        'Cerámica',
        'Herramientas',
        'Metalurgia'
    ];

    for (const name of initialTags) {
        await Tag.findOrCreate({
            where: { name }
        });
    }

    console.log('Tags insertados correctamente');
};

module.exports = { seedTags };