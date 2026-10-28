# Diccionario de Datos

## Colección: productos
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| _id | ObjectId | Sí | Identificador único |
| codigo | String | Sí | Código único del producto |
| nombre | String | Sí | Nombre del producto |
| marca | String | Sí | Marca del producto |
| categoria | String | Sí | Categoría (Laptop, PC, Monitor, etc.) |
| procesador | String | No | Especificación del procesador |
| ram | String | No | Memoria RAM |
| almacenamiento | String | No | Tipo y capacidad de almacenamiento |
| tarjetaGrafica | String | No | Tarjeta gráfica |
| precio | Number | Sí | Precio unitario (>= 0) |
| stock | Number | Sí | Cantidad en stock (>= 0) |
| descripcion | String | No | Descripción del producto |
| estado | String | Sí | ACTIVO o INACTIVO |
| proveedorId | ObjectId | No | Referencia al proveedor |
| createdAt | Date | Sí | Fecha de creación |
| updatedAt | Date | Sí | Fecha de actualización |

## Colección: clientes
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| _id | ObjectId | Sí | Identificador único |
| dni | String | Sí | DNI único del cliente |
| nombre | String | Sí | Nombre completo |
| telefono | String | No | Teléfono de contacto |
| createdAt | Date | Sí | Fecha de creación |
| updatedAt | Date | Sí | Fecha de actualización |

## Colección: proveedores
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| _id | ObjectId | Sí | Identificador único |
| ruc | String | Sí | RUC único del proveedor |
| nombre | String | Sí | Razón social |
| telefono | String | No | Teléfono de contacto |
| correo | String | No | Correo electrónico |
| direccion | String | No | Dirección fiscal |
| createdAt | Date | Sí | Fecha de creación |
| updatedAt | Date | Sí | Fecha de actualización |

## Colección: ventas
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| _id | ObjectId | Sí | Identificador único |
| numeroFactura | String | Sí | Número de factura único (F001-000001) |
| fecha | Date | Sí | Fecha de la venta |
| cliente | ObjectId | Sí | Referencia al cliente |
| detalles | Array | Sí | Array de detalles de venta |
| subtotal | Number | Sí | Suma de subtotales |
| igv | Number | Sí | IGV (18%) |
| total | Number | Sí | Total a pagar |
| metodoPago | String | Sí | EFECTIVO, TARJETA, YAPE, PLIN, TRANSFERENCIA |
| createdAt | Date | Sí | Fecha de creación |
| updatedAt | Date | Sí | Fecha de actualización |

## Detalles de venta (embebido)
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| productoId | ObjectId | Sí | Referencia al producto |
| codigo | String | Sí | Código del producto |
| nombre | String | Sí | Nombre del producto |
| cantidad | Number | Sí | Cantidad vendida |
| precioUnitario | Number | Sí | Precio al momento de la venta |
| subtotal | Number | Sí | cantidad * precioUnitario |
