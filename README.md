# INSTRUCCIONES PARA OPENCODE
## Proyecto: Sistema web para tienda de computadoras

## 1. OBJETIVO GENERAL

Desarrollar desde cero una aplicación web sencilla para una **tienda de computadoras**, orientada a la gestión de productos, clientes, proveedores y ventas/facturación.

El objetivo principal del proyecto universitario es demostrar:

- Conexión entre una aplicación web y MongoDB.
- Gestión de información mediante operaciones CRUD.
- Registro de ventas.
- Control básico de stock.
- Cálculo de subtotal, IGV y total.
- Uso de consultas y agregaciones de MongoDB.
- Organización básica de frontend, backend y base de datos.
- Documentación del diseño de la base de datos.

El proyecto debe ser **simple, funcional y fácil de explicar en una exposición universitaria**.

NO desarrollar funcionalidades innecesariamente avanzadas.

---

# 2. TECNOLOGÍAS OBLIGATORIAS

Utilizar únicamente:

### Frontend
- HTML5
- CSS3
- JavaScript vanilla

NO utilizar:
- React
- Angular
- Vue
- Bootstrap obligatorio
- TypeScript

### Backend
- Node.js
- Express.js

### Base de datos
- MongoDB
- Mongoose
- MongoDB local

### Herramientas
- MongoDB Compass, opcional
- mongosh

---

# 3. REGLAS IMPORTANTES

NO implementar:

- Sistema de autenticación.
- Login.
- Roles.
- JWT.
- Pasarelas de pago.
- SUNAT.
- Facturación electrónica real.
- IA.
- Microservicios.
- Docker.
- Arquitecturas innecesariamente complejas.
- APIs externas.
- React, Angular o Vue.

La aplicación debe poder ejecutarse localmente con:

1. MongoDB funcionando.
2. Backend Node.js ejecutándose.
3. Navegador para acceder al frontend.

---

# 4. ESTRUCTURA DEL PROYECTO

Crear exactamente una estructura organizada similar a:

```text
tienda-computadoras/
│
├── backend/
│   ├── models/
│   │   ├── Producto.js
│   │   ├── Cliente.js
│   │   ├── Proveedor.js
│   │   └── Venta.js
│   │
│   ├── routes/
│   │   ├── productos.js
│   │   ├── clientes.js
│   │   ├── proveedores.js
│   │   └── ventas.js
│   │
│   ├── controllers/
│   │   ├── productosController.js
│   │   ├── clientesController.js
│   │   ├── proveedoresController.js
│   │   └── ventasController.js
│   │
│   ├── services/
│   │   └── ventaService.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── productos.html
│   ├── clientes.html
│   ├── proveedores.html
│   ├── ventas.html
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   └── js/
│       ├── productos.js
│       ├── clientes.js
│       ├── proveedores.js
│       └── ventas.js
│
├── database/
│   ├── 01_database.js
│   ├── 02_data.js
│   └── 03_queries.js
│
├── docs/
│   ├── DER.md
│   ├── MODELO_DOCUMENTAL.md
│   ├── DICCIONARIO_DATOS.md
│   └── CONSULTAS.md
│
├── .env.example
├── .gitignore
└── README.md
```

---

# 5. BASE DE DATOS

Utilizar MongoDB con el nombre:

```text
tienda_computadoras
```

La conexión local será:

```text
mongodb://127.0.0.1:27017/tienda_computadoras
```

Utilizar Mongoose para la conexión desde Node.js.

---

# 6. VARIABLES DE ENTORNO

Crear:

```text
.env
```

con:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/tienda_computadoras
PORT=3000
```

También crear:

```text
.env.example
```

con el mismo formato, pero sin información sensible.

NO incluir `.env` en Git.

---

# 7. .GITIGNORE

Crear `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example

data/
mongodb-data/
dump/

*.log

.DS_Store
```

NO subir a GitHub:

- node_modules
- .env
- archivos físicos de MongoDB
- dumps
- logs innecesarios

El repositorio debe contener el código y los scripts necesarios para reconstruir la base de datos.

---

# 8. COLECCIONES

Crear las siguientes colecciones:

```text
productos
clientes
proveedores
ventas
```

---

# 9. COLECCIÓN PRODUCTOS

Cada producto debe contener:

```text
_id
codigo
nombre
marca
categoria
procesador
ram
almacenamiento
tarjetaGrafica
precio
stock
descripcion
estado
proveedorId
createdAt
updatedAt
```

### Ejemplo

```json
{
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
  "proveedorId": "ObjectId"
}
```

Estados permitidos:

```text
ACTIVO
INACTIVO
```

El precio no puede ser negativo.

El stock no puede ser negativo.

El código debe ser único.

---

# 10. COLECCIÓN CLIENTES

Campos:

```text
_id
dni
nombre
telefono
createdAt
updatedAt
```

El DNI debe ser único.

---

# 11. COLECCIÓN PROVEEDORES

Campos:

```text
_id
ruc
nombre
telefono
correo
direccion
createdAt
updatedAt
```

El RUC debe ser único.

---

# 12. COLECCIÓN VENTAS

Campos:

```text
_id
numeroFactura
fecha
cliente
detalles
subtotal
igv
total
metodoPago
createdAt
updatedAt
```

La información del cliente puede almacenarse como referencia:

```text
cliente: ObjectId
```

Los detalles deben contener:

```text
productoId
codigo
nombre
cantidad
precioUnitario
subtotal
```

Ejemplo:

```json
{
  "productoId": "ObjectId",
  "codigo": "PC001",
  "nombre": "ASUS TUF Laptop Gamer",
  "cantidad": 2,
  "precioUnitario": 4200,
  "subtotal": 8400
}
```

Métodos de pago permitidos:

```text
EFECTIVO
TARJETA
YAPE
PLIN
TRANSFERENCIA
```

---

# 13. IGV

Utilizar:

```text
IGV = 18%
```

La venta debe calcular:

```text
subtotal = suma de subtotales de los productos

igv = subtotal * 0.18

total = subtotal + igv
```

Estos valores deben calcularse en el backend.

NO confiar únicamente en los valores enviados por el frontend.

---

# 14. NUMERACIÓN DE FACTURAS

Utilizar un formato sencillo:

```text
F001-000001
F001-000002
F001-000003
```

El número debe ser único.

No implementar facturación electrónica real ni integración con SUNAT.

---

# 15. RELACIÓN PRODUCTO-PROVEEDOR

Cada producto debe tener:

```text
proveedorId
```

como referencia al `_id` de un proveedor.

Esto representa conceptualmente:

```text
Proveedor 1 ---- N Productos
```

---

# 16. RELACIÓN CLIENTE-VENTA

Un cliente puede tener muchas ventas:

```text
Cliente 1 ---- N Ventas
```

La venta debe guardar el `_id` del cliente.

---

# 17. DETALLE DE VENTA

Una venta puede contener varios productos:

```text
Venta 1 ---- N Detalles
```

Cada detalle contiene:

```text
productoId
codigo
nombre
cantidad
precioUnitario
subtotal
```

El precio utilizado debe ser el precio actual almacenado en MongoDB.

No confiar en el precio enviado desde el navegador.

---

# 18. CREACIÓN DE LA BASE DE DATOS

Crear:

```text
database/01_database.js
```

Este archivo debe:

1. Conectarse a la base de datos.
2. Crear las colecciones necesarias.
3. Crear validaciones mediante `$jsonSchema` cuando corresponda.
4. Crear índices únicos.
5. Mostrar mensajes indicando que la base de datos fue inicializada correctamente.

Crear índices únicos para:

```text
productos.codigo
clientes.dni
proveedores.ruc
ventas.numeroFactura
```

MongoDB no utiliza PK y FK como SQL tradicional.

En este proyecto:

```text
_id = identificador principal del documento
ObjectId = referencia entre documentos
```

---

# 19. DATOS DE PRUEBA

Crear:

```text
database/02_data.js
```

Debe insertar datos de prueba suficientes para demostrar el funcionamiento.

Crear al menos:

### Proveedores

3 proveedores.

Ejemplo:

```text
CompuPeru SAC
Tecnologia Andina SAC
Digital Center Peru
```

### Clientes

3 clientes.

### Productos

5 productos.

Utilizar ejemplos como:

```text
PC001 - ASUS TUF Laptop Gamer
PC002 - Lenovo IdeaPad
PC003 - AMD Ryzen 7 PC Gamer
PC004 - LG UltraGear Monitor
PC005 - Intel Core i5 Office PC
```

Los productos deben tener diferentes:

- marcas
- categorías
- precios
- stocks
- especificaciones

El `proveedorId` debe corresponder a proveedores existentes.

También insertar algunas ventas de prueba solamente si esto no genera problemas con el stock inicial.

---

# 20. CONSULTAS MONGODB

Crear:

```text
database/03_queries.js
```

Debe contener consultas demostrativas como:

### Listar productos

```javascript
db.productos.find()
```

### Buscar productos activos

```javascript
db.productos.find({
  estado: "ACTIVO"
})
```

### Buscar productos con stock bajo

```javascript
db.productos.find({
  stock: { $lt: 5 }
})
```

### Buscar productos por categoría

```javascript
db.productos.find({
  categoria: "Laptop"
})
```

### Buscar clientes

```javascript
db.clientes.find()
```

### Buscar proveedores

```javascript
db.proveedores.find()
```

### Consultar ventas

```javascript
db.ventas.find()
```

### Obtener total vendido

Utilizar `$group`.

### Productos más vendidos

Utilizar:

```text
$unwind
$group
$sort
```

### Ventas con información del cliente

Utilizar:

```text
$lookup
```

Documentar las consultas en:

```text
docs/CONSULTAS.md
```

---

# 21. API REST

Crear las siguientes rutas:

## Productos

```http
GET /api/productos
GET /api/productos/:id
POST /api/productos
PUT /api/productos/:id
DELETE /api/productos/:id
```

El DELETE no debe eliminar físicamente el documento.

Debe cambiar:

```text
estado = INACTIVO
```

---

## Clientes

```http
GET /api/clientes
GET /api/clientes/:id
POST /api/clientes
PUT /api/clientes/:id
DELETE /api/clientes/:id
```

Si se implementa eliminación, preferir desactivación cuando sea necesario preservar información histórica.

---

## Proveedores

```http
GET /api/proveedores
GET /api/proveedores/:id
POST /api/proveedores
PUT /api/proveedores/:id
DELETE /api/proveedores/:id
```

---

## Ventas

```http
GET /api/ventas
GET /api/ventas/:id
POST /api/ventas
```

NO implementar PUT o DELETE de ventas salvo que sea estrictamente necesario.

Las ventas deben conservarse como historial.

---

# 22. PROCESO DE REGISTRO DE VENTA

Crear:

```text
backend/services/ventaService.js
```

El servicio debe realizar el proceso completo.

### Paso 1

Recibir:

```text
cliente
detalles
metodoPago
```

### Paso 2

Verificar que el cliente exista.

### Paso 3

Por cada producto:

- verificar que exista
- verificar que esté ACTIVO
- verificar stock suficiente
- obtener precio actual desde MongoDB

### Paso 4

Calcular:

```text
subtotal del detalle
subtotal general
IGV
total
```

### Paso 5

Crear la venta.

### Paso 6

Descontar el stock de los productos vendidos.

### Paso 7

Guardar la venta.

### Paso 8

Responder al frontend con la venta registrada.

Si ocurre un error, no debe quedar una venta parcialmente registrada ni un stock parcialmente descontado.

Cuando sea viable, utilizar una transacción de MongoDB mediante una sesión.

---

# 23. FRONTEND

Crear interfaces HTML sencillas.

## index.html

Debe funcionar como página principal.

Mostrar:

```text
Tienda de Computadoras
```

y accesos a:

```text
Productos
Clientes
Proveedores
Ventas
```

También mostrar indicadores sencillos:

```text
Cantidad de productos
Cantidad de clientes
Cantidad de proveedores
Cantidad de ventas
```

---

# 24. PRODUCTOS.HTML

Debe permitir:

- listar productos
- registrar producto
- editar producto
- cambiar estado
- visualizar stock
- visualizar proveedor

Usar formularios HTML sencillos y tablas.

---

# 25. CLIENTES.HTML

Debe permitir:

- listar clientes
- registrar cliente
- editar cliente
- consultar información

---

# 26. PROVEEDORES.HTML

Debe permitir:

- listar proveedores
- registrar proveedor
- editar proveedor
- consultar información

---

# 27. VENTAS.HTML

Debe permitir registrar una venta.

La interfaz debe permitir:

1. Seleccionar cliente.
2. Seleccionar producto.
3. Indicar cantidad.
4. Agregar producto al detalle.
5. Mostrar subtotal.
6. Mostrar IGV.
7. Mostrar total.
8. Seleccionar método de pago.
9. Registrar venta.
10. Mostrar historial de ventas.

No permitir seleccionar productos inactivos.

No permitir comprar más unidades que el stock disponible.

---

# 28. DISEÑO VISUAL

Usar HTML y CSS sencillo.

La interfaz debe ser:

- limpia
- ordenada
- entendible
- responsive básico
- adecuada para una presentación universitaria

No dedicar tiempo excesivo a animaciones.

Priorizar funcionamiento sobre diseño.

---

# 29. MODELOS MONGOOSE

Crear:

```text
backend/models/Producto.js
backend/models/Cliente.js
backend/models/Proveedor.js
backend/models/Venta.js
```

Definir los esquemas correspondientes.

Utilizar:

```javascript
timestamps: true
```

cuando corresponda.

Usar referencias mediante:

```javascript
mongoose.Schema.Types.ObjectId
```

---

# 30. CONTROLADORES

Crear controladores separados:

```text
productosController.js
clientesController.js
proveedoresController.js
ventasController.js
```

Los controladores deben encargarse de:

- recibir solicitudes
- validar datos básicos
- llamar a los modelos/servicios
- devolver respuestas HTTP

La lógica compleja de ventas debe mantenerse en:

```text
ventaService.js
```

---

# 31. RESPUESTAS HTTP

Utilizar códigos adecuados:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

Las respuestas deben ser JSON.

Ejemplo:

```json
{
  "mensaje": "Producto registrado correctamente",
  "producto": {}
}
```

En caso de error:

```json
{
  "error": "No hay stock suficiente"
}
```

---

# 32. CORS Y DOTENV

Instalar y utilizar:

```text
express
mongoose
cors
dotenv
```

Configurar CORS para permitir el frontend local.

Utilizar `dotenv` para leer:

```text
MONGODB_URI
PORT
```

---

# 33. DOCUMENTACIÓN ACADÉMICA

El profesor solicita documentación equivalente a:

- DER
- modelo relacional
- diccionario de datos
- DDL
- DML
- rutas de base de datos
- consultas

Como el proyecto utiliza MongoDB y no SQL, adaptar estos requerimientos correctamente.

NO fingir que MongoDB utiliza tablas SQL.

---

# 34. DER

Crear:

```text
docs/DER.md
```

Explicar las entidades:

```text
Cliente
Venta
DetalleVenta
Producto
Proveedor
```

Representar las relaciones conceptuales:

```text
Proveedor 1 ---- N Producto

Cliente 1 ---- N Venta

Venta 1 ---- N DetalleVenta

Producto 1 ---- N DetalleVenta
```

Aclarar que en MongoDB el detalle de venta se almacena embebido dentro del documento de venta.

---

# 35. MODELO DOCUMENTAL

Crear:

```text
docs/MODELO_DOCUMENTAL.md
```

Explicar:

```text
productos
clientes
proveedores
ventas
```

Mostrar ejemplos JSON de cada colección.

Explicar:

- `_id`
- ObjectId
- referencias
- documentos embebidos
- índices

---

# 36. DICCIONARIO DE DATOS

Crear:

```text
docs/DICCIONARIO_DATOS.md
```

Para cada colección documentar:

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| _id | ObjectId | Sí | Identificador |
| codigo | String | Sí | Código del producto |
| nombre | String | Sí | Nombre |
| precio | Number | Sí | Precio |
| stock | Number | Sí | Stock disponible |
| estado | String | Sí | Estado |

Hacer lo mismo para:

- productos
- clientes
- proveedores
- ventas
- detalles de venta

---

# 37. EQUIVALENCIA DDL / DML

Crear documentación explicando:

### DDL en SQL

Normalmente:

```text
CREATE TABLE
ALTER TABLE
PRIMARY KEY
FOREIGN KEY
```

En MongoDB este proyecto utiliza:

```text
db.createCollection()
$jsonSchema
createIndex()
```

### DML en SQL

Normalmente:

```text
INSERT
UPDATE
DELETE
SELECT
```

En MongoDB utilizamos:

```text
insertOne()
insertMany()
updateOne()
updateMany()
deleteOne()
find()
aggregate()
```

Explicar claramente esta adaptación.

---

# 38. STORED PROCEDURES

MongoDB no utiliza stored procedures de la misma manera que un motor SQL.

Por lo tanto, no crear procedimientos almacenados artificiales.

La lógica equivalente para registrar una venta debe implementarse en:

```text
backend/services/ventaService.js
```

Explicar en la documentación que:

```text
SQL Stored Procedure
        ↓
Servicio de aplicación Node.js
        ↓
Transacción MongoDB
```

---

# 39. TRANSACCIONES

Para el registro de venta, utilizar una transacción de MongoDB cuando sea posible.

La operación debe considerar:

```text
crear venta
+
actualizar stock
```

como una sola operación lógica.

Si falla una parte:

```text
rollback
```

Esto evita inconsistencias entre las ventas y el stock.

---


# 41. INSTALACIÓN

El proyecto debe funcionar aproximadamente mediante:

```bash
cd backend
npm install
```

Después configurar:

```text
.env
```

con:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/tienda_computadoras
PORT=3000
```

MongoDB debe estar instalado y ejecutándose localmente.

---

# 42. INICIALIZACIÓN DE MONGODB

Documentar:

```bash
mongosh "mongodb://127.0.0.1:27017/tienda_computadoras" database/01_database.js
```

Después:

```bash
mongosh "mongodb://127.0.0.1:27017/tienda_computadoras" database/02_data.js
```

Y para las consultas:

```bash
mongosh "mongodb://127.0.0.1:27017/tienda_computadoras" database/03_queries.js
```

Si la versión de `mongosh` requiere otra forma de ejecutar scripts, documentar la alternativa correcta.

---

# 43. GITHUB

El proyecto debe estar preparado para subirlo a GitHub.

NO subir:

```text
.env
node_modules/
mongodb-data/
data/
dump/
```

SÍ subir:

```text
backend/
frontend/
database/
docs/
.env.example
.gitignore
README.md
package.json
```

El repositorio debe permitir que otra persona reconstruya la base de datos utilizando:

```text
01_database.js
02_data.js
```

No es necesario subir los archivos internos de MongoDB.

---

# 44. PRUEBAS MÍNIMAS

Antes de terminar, verificar:

### Base de datos

- [ ] MongoDB conecta.
- [ ] Colecciones creadas.
- [ ] Índices creados.
- [ ] Datos de prueba insertados.

### Backend

- [ ] Servidor inicia.
- [ ] MongoDB conecta.
- [ ] GET productos funciona.
- [ ] POST productos funciona.
- [ ] PUT productos funciona.
- [ ] DELETE/desactivación funciona.
- [ ] CRUD clientes funciona.
- [ ] CRUD proveedores funciona.
- [ ] GET ventas funciona.
- [ ] POST ventas funciona.

### Ventas

- [ ] Cliente válido.
- [ ] Producto existente.
- [ ] Producto activo.
- [ ] Stock suficiente.
- [ ] Subtotal correcto.
- [ ] IGV 18% correcto.
- [ ] Total correcto.
- [ ] Venta guardada.
- [ ] Stock descontado.
- [ ] Número de factura generado.

### Frontend

- [ ] Página principal funciona.
- [ ] Productos funcionan.
- [ ] Clientes funcionan.
- [ ] Proveedores funcionan.
- [ ] Ventas funcionan.
- [ ] Historial funciona.

---

# 45. REGLA FINAL PARA OPENCODE

No agregar funcionalidades que no hayan sido solicitadas.

Si existe una decisión técnica entre una solución sencilla y una solución avanzada, utilizar la solución sencilla.

El proyecto debe priorizar:

```text
FUNCIONAMIENTO
        ↓
CORRECTA CONEXIÓN CON MONGODB
        ↓
CRUD
        ↓
REGISTRO DE VENTAS
        ↓
CONTROL DE STOCK
        ↓
DOCUMENTACIÓN
        ↓
DISEÑO VISUAL
```

Todo el código debe quedar suficientemente organizado para que un estudiante pueda explicar:

- qué hace cada colección
- qué hace cada endpoint
- cómo se conecta Node.js con MongoDB
- cómo se registra una venta
- cómo se actualiza el stock
- cómo se calcula el IGV
- cómo se realizan las consultas
- cómo se reconstruye la base de datos desde el repositorio

No utilizar complejidad técnica únicamente para aparentar sofisticación.