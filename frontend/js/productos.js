const API_URL = 'http://localhost:3000/api';

async function cargarProductos() {
  try {
    const res = await fetch(`${API_URL}/productos`);
    const productos = await res.json();
    const tbody = document.getElementById('productosTable');
    tbody.innerHTML = '';
    
    productos.forEach(prod => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${prod.codigo}</td>
        <td>${prod.nombre}</td>
        <td>${prod.marca}</td>
        <td>${prod.categoria}</td>
        <td>S/. ${prod.precio}</td>
        <td>${prod.stock}</td>
        <td>${prod.estado}</td>
        <td>
          <button onclick='editarProducto(${JSON.stringify(prod)})'>Editar</button>
          <button class="btn-danger" onclick="desactivarProducto('${prod._id}')">Desactivar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function cargarProveedores() {
  try {
    const res = await fetch(`${API_URL}/proveedores`);
    const proveedores = await res.json();
    const select = document.getElementById('proveedorId');
    
    proveedores.forEach(prov => {
      const option = document.createElement('option');
      option.value = prov._id;
      option.textContent = prov.nombre;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById('productoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const productoId = document.getElementById('productoId').value;
  const data = {
    codigo: document.getElementById('codigo').value,
    nombre: document.getElementById('nombre').value,
    marca: document.getElementById('marca').value,
    categoria: document.getElementById('categoria').value,
    procesador: document.getElementById('procesador').value,
    ram: document.getElementById('ram').value,
    almacenamiento: document.getElementById('almacenamiento').value,
    tarjetaGrafica: document.getElementById('tarjetaGrafica').value,
    precio: Number(document.getElementById('precio').value),
    stock: Number(document.getElementById('stock').value),
    descripcion: document.getElementById('descripcion').value,
    estado: document.getElementById('estado').value,
    proveedorId: document.getElementById('proveedorId').value || null
  };
  
  try {
    if (productoId) {
      await fetch(`${API_URL}/productos/${productoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Producto actualizado');
    } else {
      await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Producto registrado');
    }
    
    limpiarFormulario();
    cargarProductos();
  } catch (error) {
    console.error('Error:', error);
    alert('Error al guardar');
  }
});

function editarProducto(prod) {
  document.getElementById('productoId').value = prod._id;
  document.getElementById('codigo').value = prod.codigo;
  document.getElementById('nombre').value = prod.nombre;
  document.getElementById('marca').value = prod.marca;
  document.getElementById('categoria').value = prod.categoria;
  document.getElementById('procesador').value = prod.procesador || '';
  document.getElementById('ram').value = prod.ram || '';
  document.getElementById('almacenamiento').value = prod.almacenamiento || '';
  document.getElementById('tarjetaGrafica').value = prod.tarjetaGrafica || '';
  document.getElementById('precio').value = prod.precio;
  document.getElementById('stock').value = prod.stock;
  document.getElementById('descripcion').value = prod.descripcion || '';
  document.getElementById('estado').value = prod.estado;
  document.getElementById('proveedorId').value = prod.proveedorId?._id || prod.proveedorId || '';
}

async function desactivarProducto(id) {
  if (confirm('¿Desactivar producto?')) {
    try {
      await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' });
      alert('Producto desactivado');
      cargarProductos();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

function limpiarFormulario() {
  document.getElementById('productoForm').reset();
  document.getElementById('productoId').value = '';
}

cargarProductos();
cargarProveedores();
