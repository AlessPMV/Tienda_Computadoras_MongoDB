const Proveedor = require('../models/Proveedor');

exports.getAllProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProveedor = async (req, res) => {
  try {
    const proveedor = new Proveedor(req.body);
    await proveedor.save();
    res.status(201).json({ mensaje: 'Proveedor registrado correctamente', proveedor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json({ mensaje: 'Proveedor actualizado correctamente', proveedor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
