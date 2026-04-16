const Tag = require('../models/tags.model');

const seedTags = async () => {
    const initialTags = [
        // MATERIAL
        'Madera',
        'Metal',
        'Plástico',
        'Vidrio',
        'Papel y Cartón',
        'Textil',
        'Electrónico',
        'Construcción',
        'Orgánico',

        // PRODUCTO
        'Muebles',
        'Decoración',
        'Ropa',
        'Accesorios',
        'Tecnología',
        'Herramientas',
        'Juguetes',
        'Libros',
        'Hogar',

        // SERVICIO
        'Reparación',
        'Diseño',
        'Transporte',
        'Capacitación',
        'Reciclaje',
        'Mantenimiento',
        'Jardinería',
        'Limpieza',
        'Logística'
    ];

    for (const name of initialTags) {
        await Tag.findOrCreate({
            where: { name }
        });
    }

    console.log('Tags insertados correctamente');
};

module.exports = { seedTags };