const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Proveedor = require('../models/Proveedor');

// GET all
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate('proveedorId');
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by id
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate('proveedorId');
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST
exports.createProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json({ mensaje: 'Producto registrado correctamente', producto });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT
exports.updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto actualizado correctamente', producto });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE (desactivación)
exports.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, { estado: 'INACTIVO' }, { new: true });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto desactivado correctamente', producto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
