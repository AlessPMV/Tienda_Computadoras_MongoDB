const API_URL = 'http://localhost:3000/api';

async function cargarDashboard() {
  try {
    const [productos, clientes, proveedores, ventas] = await Promise.all([
      fetch(`${API_URL}/productos`).then(r => r.json()),
      fetch(`${API_URL}/clientes`).then(r => r.json()),
      fetch(`${API_URL}/proveedores`).then(r => r.json()),
      fetch(`${API_URL}/ventas`).then(r => r.json())
    ]);
    
    document.getElementById('totalProductos').textContent = productos.length;
    document.getElementById('totalClientes').textContent = clientes.length;
    document.getElementById('totalProveedores').textContent = proveedores.length;
    document.getElementById('totalVentas').textContent = ventas.length;
  } catch (error) {
    console.error('Error al cargar dashboard:', error);
  }
}

if (document.getElementById('totalProductos')) {
  cargarDashboard();
}
