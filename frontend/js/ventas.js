const API_URL = 'http://localhost:3000/api';
let detalles = [];
let productos = [];
let clientes = [];

async function cargarDatos() {
  try {
    const [resProd, resCli, resVentas] = await Promise.all([
      fetch(`${API_URL}/productos`),
      fetch(`${API_URL}/clientes`),
      fetch(`${API_URL}/ventas`)
    ]);
    
    productos = await resProd.json();
    clientes = await resCli.json();
    const ventas = await resVentas.json();
    
    // Cargar clientes
    const selectCliente = document.getElementById('cliente');
    clientes.forEach(cli => {
      const option = document.createElement('option');
      option.value = cli._id;
      option.textContent = `${cli.dni} - ${cli.nombre}`;
      selectCliente.appendChild(option);
    });
    
    // Cargar productos activos
    const selectProducto = document.getElementById('producto');
    productos.filter(p => p.estado === 'ACTIVO').forEach(prod => {
      const option = document.createElement('option');
      option.value = prod._id;
      option.textContent = `${prod.codigo} - ${prod.nombre} (Stock: ${prod.stock}, S/. ${prod.precio})`;
      option.dataset.precio = prod.precio;
      option.dataset.stock = prod.stock;
      option.dataset.nombre = prod.nombre;
      option.dataset.codigo = prod.codigo;
      selectProducto.appendChild(option);
    });
    
    // Cargar historial
    cargarHistorial(ventas);
  } catch (error) {
    console.error('Error:', error);
  }
}

function cargarHistorial(ventas) {
  const tbody = document.getElementById('ventasTable');
  tbody.innerHTML = '';
  
  ventas.forEach(venta => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${venta.numeroFactura}</td>
      <td>${new Date(venta.fecha).toLocaleDateString()}</td>
      <td>${venta.cliente?.nombre || '-'}</td>
      <td>S/. ${venta.subtotal.toFixed(2)}</td>
      <td>S/. ${venta.igv.toFixed(2)}</td>
      <td>S/. ${venta.total.toFixed(2)}</td>
      <td>${venta.metodoPago}</td>
    `;
    tbody.appendChild(tr);
  });
}

function agregarDetalle() {
  const selectProducto = document.getElementById('producto');
  const cantidad = parseInt(document.getElementById('cantidad').value);
  
  if (!selectProducto.value) {
    alert('Seleccione un producto');
    return;
  }
  
  const producto = productos.find(p => p._id === selectProducto.value);
  if (producto.stock < cantidad) {
    alert('No hay stock suficiente');
    return;
  }
  
  const precio = parseFloat(selectProducto.selectedOptions[0].dataset.precio);
  const subtotal = precio * cantidad;
  
  detalles.push({
    productoId: producto._id,
    codigo: producto.codigo,
    nombre: producto.nombre,
    cantidad: cantidad,
    precioUnitario: precio,
    subtotal: subtotal
  });
  
  mostrarDetalles();
}

function mostrarDetalles() {
  const tbody = document.getElementById('detalleTable');
  tbody.innerHTML = '';
  
  let subtotalGeneral = 0;
  
  detalles.forEach((det, index) => {
    subtotalGeneral += det.subtotal;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${det.codigo} - ${det.nombre}</td>
      <td>S/. ${det.precioUnitario}</td>
      <td>${det.cantidad}</td>
      <td>S/. ${det.subtotal}</td>
      <td><button type="button" onclick="eliminarDetalle(${index})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
  
  const igv = subtotalGeneral * 0.18;
  const total = subtotalGeneral + igv;
  
  document.getElementById('subtotal').textContent = subtotalGeneral.toFixed(2);
  document.getElementById('igv').textContent = igv.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}

function eliminarDetalle(index) {
  detalles.splice(index, 1);
  mostrarDetalles();
}

document.getElementById('ventaForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (detalles.length === 0) {
    alert('Agregue al menos un producto');
    return;
  }
  
  const data = {
    cliente: document.getElementById('cliente').value,
    detalles: detalles,
    metodoPago: document.getElementById('metodoPago').value
  };
  
  try {
    const res = await fetch(`${API_URL}/ventas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    
    if (res.ok) {
      alert('Venta registrada correctamente. Factura: ' + result.venta.numeroFactura);
      detalles = [];
      mostrarDetalles();
      document.getElementById('ventaForm').reset();
      cargarDatos();
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al registrar venta');
  }
});

cargarDatos();
