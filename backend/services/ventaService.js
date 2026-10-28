const mongoose = require('mongoose');
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');

async function generarNumeroFactura() {
  const count = await Venta.countDocuments();
  const numero = String(count + 1).padStart(6, '0');
  return `F001-${numero}`;
}

async function registrarVenta(data) {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { cliente, detalles, metodoPago } = data;
    
    // Verificar cliente
    const clienteExiste = await Cliente.findById(cliente).session(session);
    if (!clienteExiste) {
      throw new Error('Cliente no encontrado');
    }
    
    if (!detalles || detalles.length === 0) {
      throw new Error('Debe agregar al menos un producto');
    }
    
    let subtotalGeneral = 0;
    const detallesProcesados = [];
    
    // Procesar cada detalle
    for (let item of detalles) {
      const producto = await Producto.findById(item.productoId).session(session);
      
      if (!producto) {
        throw new Error(`Producto no encontrado`);
      }
      if (producto.estado !== 'ACTIVO') {
        throw new Error(`Producto ${producto.nombre} no está activo`);
      }
      if (producto.stock < item.cantidad) {
        throw new Error(`No hay stock suficiente para ${producto.nombre}`);
      }
      
      const precioUnitario = producto.precio;
      const subtotalDetalle = precioUnitario * item.cantidad;
      subtotalGeneral += subtotalDetalle;
      
      detallesProcesados.push({
        productoId: producto._id,
        codigo: producto.codigo,
        nombre: producto.nombre,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal: subtotalDetalle
      });
      
      // Descontar stock
      producto.stock -= item.cantidad;
      await producto.save({ session });
    }
    
    const igv = subtotalGeneral * 0.18;
    const total = subtotalGeneral + igv;
    const numeroFactura = await generarNumeroFactura();
    
    const venta = new Venta({
      numeroFactura,
      fecha: new Date(),
      cliente,
      detalles: detallesProcesados,
      subtotal: subtotalGeneral,
      igv,
      total,
      metodoPago
    });
    
    await venta.save({ session });
    await session.commitTransaction();
    
    return await venta.populate('cliente');
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

module.exports = { registrarVenta };
