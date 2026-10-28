# Consultas MongoDB

## Consultas Básicas

### Listar todos los productos
```javascript
db.productos.find()
```

### Buscar productos activos
```javascript
db.productos.find({ estado: "ACTIVO" })
```

### Buscar productos con stock bajo (< 5)
```javascript
db.productos.find({ stock: { $lt: 5 } })
```

### Buscar productos por categoría
```javascript
db.productos.find({ categoria: "Laptop" })
```

### Listar clientes
```javascript
db.clientes.find()
```

### Listar proveedores
```javascript
db.proveedores.find()
```

### Listar ventas
```javascript
db.ventas.find()
```

## Consultas con Agregación

### Obtener total vendido
```javascript
db.ventas.aggregate([
  { $group: { _id: null, totalVendido: { $sum: "$total" } } }
])
```

### Ventas con información del cliente ($lookup)
```javascript
db.ventas.aggregate([
  {
    $lookup: {
      from: 'clientes',
      localField: 'cliente',
      foreignField: '_id',
      as: 'infoCliente'
    }
  },
  { $unwind: '$infoCliente' }
])
```

Ver archivo `database/03_queries.js` para más ejemplos.
