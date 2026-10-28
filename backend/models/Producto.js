const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  categoria: { type: String, required: true },
  procesador: { type: String },
  ram: { type: String },
  almacenamiento: { type: String },
  tarjetaGrafica: { type: String },
  precio: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  descripcion: { type: String },
  estado: { type: String, enum: ['ACTIVO', 'INACTIVO'], default: 'ACTIVO' },
  proveedorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' }
}, { timestamps: true });

module.exports = mongoose.model('Producto', ProductoSchema);
