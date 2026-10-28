const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
  ruc: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  telefono: { type: String },
  correo: { type: String },
  direccion: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Proveedor', ProveedorSchema);
