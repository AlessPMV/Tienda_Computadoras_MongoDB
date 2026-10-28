const Venta = require('../models/Venta');
const { registrarVenta } = require('../services/ventaService');

exports.getAllVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('cliente').populate('detalles.productoId');
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVentaById = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id).populate('cliente').populate('detalles.productoId');
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(venta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVenta = async (req, res) => {
  try {
    const venta = await registrarVenta(req.body);
    res.status(201).json({ mensaje: 'Venta registrada correctamente', venta });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
