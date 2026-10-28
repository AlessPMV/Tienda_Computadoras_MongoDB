# Documentación - Tienda de Computadoras

## DER (Diagrama Entidad-Relación)

### Entidades

- **Cliente**: Almacena información de los clientes que realizan compras.
- **Venta**: Registra cada transacción realizada.
- **DetalleVenta**: Se almacena embebido dentro de Venta (documentos embebidos en MongoDB).
- **Producto**: Catálogo de productos disponibles en la tienda.
- **Proveedor**: Información de los proveedores que abastecen productos.

### Relaciones Conceptuales

```
Proveedor 1 ---- N Producto
Cliente 1 ---- N Venta
Venta 1 ---- N DetalleVenta (embebido)
Producto 1 ---- N DetalleVenta
```

**Nota**: En MongoDB, el detalle de venta se almacena embebido dentro del documento de venta, no como una colección separada. Las relaciones se manejan mediante referencias con ObjectId.
