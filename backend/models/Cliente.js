const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  telefono: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', ClienteSchema);
