# Equivalencia DDL / DML

## DDL (Data Definition Language) en SQL vs MongoDB

En SQL tradicional se utilizan:
- `CREATE TABLE`
- `ALTER TABLE`
- `PRIMARY KEY`
- `FOREIGN KEY`

En este proyecto MongoDB utilizamos:
- `db.createCollection()` - Crear colecciones
- `$jsonSchema` - Validación de esquema
- `createIndex()` - Crear índices

## DML (Data Manipulation Language) en SQL vs MongoDB

En SQL tradicional se utilizan:
- `INSERT`
- `UPDATE`
- `DELETE`
- `SELECT`

En MongoDB utilizamos:
- `insertOne()` / `insertMany()` - Equivalente a INSERT
- `updateOne()` / `updateMany()` / `findByIdAndUpdate()` - Equivalente a UPDATE
- `deleteOne()` / `deleteMany()` / `findByIdAndDelete()` - Equivalente a DELETE
- `find()` / `findOne()` - Equivalente a SELECT
- `aggregate()` - Para consultas complejas con $lookup, $group, etc.

## Stored Procedures

MongoDB no utiliza *stored procedures* de la misma manera que los motores SQL tradicionales.

**Equivalencia en este proyecto:**

```
SQL Stored Procedure
        ↓
Servicio de aplicación Node.js (backend/services/ventaService.js)
        ↓
Transacción MongoDB
```

La lógica compleja de registro de venta se implementa en el servicio de aplicación, utilizando transacciones de MongoDB para garantizar la integridad de los datos.
