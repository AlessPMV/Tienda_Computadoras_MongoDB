const mongoose = require('mongoose');

const DetalleVentaSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  codigo: { type: String, required: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
}, { _id: false });

const VentaSchema = new mongoose.Schema({
  numeroFactura: { type: String, required: true, unique: true },
  fecha: { type: Date, default: Date.now },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  detalles: [DetalleVentaSchema],
  subtotal: { type: Number, required: true },
  igv: { type: Number, required: true },
  total: { type: Number, required: true },
  metodoPago: { type: String, enum: ['EFECTIVO', 'TARJETA', 'YAPE', 'PLIN', 'TRANSFERENCIA'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Venta', VentaSchema);
