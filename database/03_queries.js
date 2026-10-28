// database/03_queries.js

use("tienda_computadoras");

print("==========================================");
print("CONSULTAS DE LA BASE DE DATOS");
print("==========================================");

// ==========================================
// 1. LISTAR TODOS LOS PRODUCTOS
// ==========================================

print("\n=== LISTAR TODOS LOS PRODUCTOS ===");

db.productos.find().forEach(function(producto) {
    printjson(producto);
});


// ==========================================
// 2. BUSCAR PRODUCTOS ACTIVOS
// ==========================================

print("\n=== BUSCAR PRODUCTOS ACTIVOS ===");

db.productos.find({
    estado: "ACTIVO"
}).forEach(function(producto) {
    printjson(producto);
});


// ==========================================
// 3. PRODUCTOS CON STOCK BAJO
// ==========================================

print("\n=== BUSCAR PRODUCTOS CON STOCK BAJO (< 5) ===");

db.productos.find({
    stock: { $lt: 5 }
}).forEach(function(producto) {
    printjson(producto);
});


// ==========================================
// 4. PRODUCTOS POR CATEGORÍA
// ==========================================

print("\n=== BUSCAR PRODUCTOS POR CATEGORÍA (Laptop) ===");

db.productos.find({
    categoria: "Laptop"
}).forEach(function(producto) {
    printjson(producto);
});


// ==========================================
// 5. LISTAR CLIENTES
// ==========================================

print("\n=== LISTAR CLIENTES ===");

db.clientes.find().forEach(function(cliente) {
    printjson(cliente);
});


// ==========================================
// 6. LISTAR PROVEEDORES
// ==========================================

print("\n=== LISTAR PROVEEDORES ===");

db.proveedores.find().forEach(function(proveedor) {
    printjson(proveedor);
});


// ==========================================
// 7. LISTAR VENTAS
// ==========================================

print("\n=== LISTAR VENTAS ===");

db.ventas.find().forEach(function(venta) {
    printjson(venta);
});


// ==========================================
// 8. TOTAL VENDIDO
// ==========================================

print("\n=== TOTAL VENDIDO ===");

db.ventas.aggregate([
    {
        $group: {
            _id: null,
            totalVendido: {
                $sum: "$total"
            }
        }
    }
]).forEach(function(resultado) {
    printjson(resultado);
});


// ==========================================
// 9. VENTAS CON INFORMACIÓN DEL CLIENTE
// ==========================================

print("\n=== VENTAS CON INFORMACIÓN DEL CLIENTE ($lookup) ===");

db.ventas.aggregate([
    {
        $lookup: {
            from: "clientes",
            localField: "cliente",
            foreignField: "_id",
            as: "infoCliente"
        }
    },
    {
        $unwind: "$infoCliente"
    }
]).forEach(function(venta) {
    printjson(venta);
});


// ==========================================
// 10. PRODUCTOS MÁS VENDIDOS
// ==========================================

print("\n=== PRODUCTOS MÁS VENDIDOS ===");

db.ventas.aggregate([
    {
        $unwind: "$detalles"
    },
    {
        $group: {
            _id: "$detalles.productoId",
            codigo: {
                $first: "$detalles.codigo"
            },
            nombre: {
                $first: "$detalles.nombre"
            },
            cantidadVendida: {
                $sum: "$detalles.cantidad"
            }
        }
    },
    {
        $sort: {
            cantidadVendida: -1
        }
    }
]).forEach(function(producto) {
    printjson(producto);
});


// ==========================================
// FINAL
// ==========================================

print("\n==========================================");
print("Consultas ejecutadas correctamente.");
print("==========================================");