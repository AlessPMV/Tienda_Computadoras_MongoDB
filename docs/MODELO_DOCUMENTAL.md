# Modelo Documental

## Colecciones

### productos
```json
{
  "_id": ObjectId("..."),
  "codigo": "PC001",
  "nombre": "ASUS TUF Laptop Gamer",
  "marca": "ASUS",
  "categoria": "Laptop",
  "procesador": "Intel Core i7",
  "ram": "16 GB",
  "almacenamiento": "512 GB SSD",
  "tarjetaGrafica": "RTX 4060",
  "precio": 4200,
  "stock": 5,
  "descripcion": "Laptop gamer de alto rendimiento",
  "estado": "ACTIVO",
  "proveedorId": ObjectId("..."),
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

### clientes
```json
{
  "_id": ObjectId("..."),
  "dni": "12345678",
  "nombre": "Juan Carlos Perez",
  "telefono": "987654321",
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

### proveedores
```json
{
  "_id": ObjectId("..."),
  "ruc": "20123456789",
  "nombre": "CompuPeru SAC",
  "telefono": "01-4567890",
  "correo": "ventas@compuperu.com",
  "direccion": "Av. Arequipa 1234, Lima",
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

### ventas
```json
{
  "_id": ObjectId("..."),
  "numeroFactura": "F001-000001",
  "fecha": ISODate("..."),
  "cliente": ObjectId("..."),
  "detalles": [
    {
      "productoId": ObjectId("..."),
      "codigo": "PC001",
      "nombre": "ASUS TUF Laptop Gamer",
      "cantidad": 2,
      "precioUnitario": 4200,
      "subtotal": 8400
    }
  ],
  "subtotal": 8400,
  "igv": 1512,
  "total": 9912,
  "metodoPago": "EFECTIVO",
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

## Conceptos

- **_id**: Identificador único generado por MongoDB (ObjectId)
- **ObjectId**: Tipo de dato utilizado para referencias entre documentos
- **Referencias**: Se usan ObjectId para relacionar documentos entre colecciones (ej. producto.proveedorId, venta.cliente)
- **Documentos embebidos**: Los detalles de venta se embeben directamente en el documento venta
- **Índices**: Se crean índices únicos para codigo, dni, ruc y numeroFactura
- **timestamps**: Mongoose agrega automáticamente createdAt y updatedAt
