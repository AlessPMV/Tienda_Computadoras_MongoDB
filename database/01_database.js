// database/01_database.js

const dbName = "tienda_computadoras";

use(dbName);

print("Inicializando base de datos: " + dbName);

// Crear colecciones si no existen
const collections = [
    "productos",
    "clientes",
    "proveedores",
    "ventas"
];

collections.forEach(function(nombre) {
    const existe = db.getCollectionNames().includes(nombre);

    if (!existe) {
        db.createCollection(nombre);
        print("Colección creada: " + nombre);
    } else {
        print("Colección ya existe: " + nombre);
    }
});

// Crear índices únicos
db.productos.createIndex(
    { codigo: 1 },
    { unique: true }
);

db.clientes.createIndex(
    { dni: 1 },
    { unique: true }
);

db.proveedores.createIndex(
    { ruc: 1 },
    { unique: true }
);

db.ventas.createIndex(
    { numeroFactura: 1 },
    { unique: true }
);

print("Índices creados correctamente.");
print("Base de datos inicializada correctamente.");