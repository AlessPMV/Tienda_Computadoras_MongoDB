// database/02_data.js

use("tienda_computadoras");

print("Iniciando carga de datos de prueba...");

// Limpiar datos existentes
db.ventas.deleteMany({});
db.productos.deleteMany({});
db.clientes.deleteMany({});
db.proveedores.deleteMany({});

print("Datos anteriores eliminados.");

// ==========================================
// PROVEEDORES
// ==========================================

const proveedor1 = ObjectId();
const proveedor2 = ObjectId();
const proveedor3 = ObjectId();

db.proveedores.insertMany([
    {
        _id: proveedor1,
        ruc: "20123456789",
        nombre: "CompuPeru SAC",
        telefono: "01-4567890",
        correo: "ventas@compuperu.com",
        direccion: "Av. Arequipa 1234, Lima",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: proveedor2,
        ruc: "20987654321",
        nombre: "Tecnologia Andina SAC",
        telefono: "01-5678901",
        correo: "ventas@tecandina.com",
        direccion: "Jr. Union 567, Lima",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: proveedor3,
        ruc: "20543216789",
        nombre: "Digital Center Peru",
        telefono: "01-6789012",
        correo: "ventas@digitalcenter.com",
        direccion: "Av. Larco 890, Lima",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

print("Proveedores insertados correctamente.");

// ==========================================
// CLIENTES
// ==========================================

const cliente1 = ObjectId();
const cliente2 = ObjectId();
const cliente3 = ObjectId();

db.clientes.insertMany([
    {
        _id: cliente1,
        dni: "12345678",
        nombre: "Juan Carlos Perez",
        telefono: "987654321",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: cliente2,
        dni: "87654321",
        nombre: "Maria Lopez Garcia",
        telefono: "976543210",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: cliente3,
        dni: "11223344",
        nombre: "Pedro Sanchez Torres",
        telefono: "965432109",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

print("Clientes insertados correctamente.");

// ==========================================
// PRODUCTOS
// ==========================================

const producto1 = ObjectId();
const producto2 = ObjectId();
const producto3 = ObjectId();
const producto4 = ObjectId();
const producto5 = ObjectId();

db.productos.insertMany([
    {
        _id: producto1,
        codigo: "PC001",
        nombre: "ASUS TUF Laptop Gamer",
        marca: "ASUS",
        categoria: "Laptop",
        procesador: "Intel Core i7",
        ram: "16 GB",
        almacenamiento: "512 GB SSD",
        tarjetaGrafica: "RTX 4060",
        precio: 4200,
        stock: 5,
        descripcion: "Laptop gamer de alto rendimiento",
        estado: "ACTIVO",
        proveedorId: proveedor1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: producto2,
        codigo: "PC002",
        nombre: "Lenovo IdeaPad",
        marca: "Lenovo",
        categoria: "Laptop",
        procesador: "Intel Core i5",
        ram: "8 GB",
        almacenamiento: "256 GB SSD",
        tarjetaGrafica: "Integrada",
        precio: 2500,
        stock: 10,
        descripcion: "Laptop para uso diario",
        estado: "ACTIVO",
        proveedorId: proveedor2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: producto3,
        codigo: "PC003",
        nombre: "AMD Ryzen 7 PC Gamer",
        marca: "AMD",
        categoria: "PC",
        procesador: "AMD Ryzen 7",
        ram: "32 GB",
        almacenamiento: "1 TB SSD",
        tarjetaGrafica: "RTX 4070",
        precio: 6500,
        stock: 3,
        descripcion: "PC gamer de alta gama",
        estado: "ACTIVO",
        proveedorId: proveedor1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: producto4,
        codigo: "PC004",
        nombre: "LG UltraGear Monitor",
        marca: "LG",
        categoria: "Monitor",
        procesador: "",
        ram: "",
        almacenamiento: "",
        tarjetaGrafica: "",
        precio: 1500,
        stock: 8,
        descripcion: "Monitor gaming de 27 pulgadas",
        estado: "ACTIVO",
        proveedorId: proveedor3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: producto5,
        codigo: "PC005",
        nombre: "Intel Core i5 Office PC",
        marca: "Intel",
        categoria: "PC",
        procesador: "Intel Core i5",
        ram: "16 GB",
        almacenamiento: "512 GB SSD",
        tarjetaGrafica: "Integrada",
        precio: 3200,
        stock: 6,
        descripcion: "PC para oficina",
        estado: "ACTIVO",
        proveedorId: proveedor2,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

print("Productos insertados correctamente.");

// ==========================================
// FINAL
// ==========================================

print("==========================================");
print("Datos de prueba insertados correctamente.");
print("==========================================");