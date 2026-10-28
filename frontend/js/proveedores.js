const API_URL = 'http://localhost:3000/api';

async function cargarProveedores() {
  try {
    const res = await fetch(`${API_URL}/proveedores`);
    const proveedores = await res.json();
    const tbody = document.getElementById('proveedoresTable');
    tbody.innerHTML = '';
    
    proveedores.forEach(prov => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${prov.ruc}</td>
        <td>${prov.nombre}</td>
        <td>${prov.telefono || ''}</td>
        <td>${prov.correo || ''}</td>
        <td>${prov.direccion || ''}</td>
        <td>
          <button onclick='editarProveedor(${JSON.stringify(prov)})'>Editar</button>
          <button class="btn-danger" onclick="eliminarProveedor('${prov._id}')">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById('proveedorForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const proveedorId = document.getElementById('proveedorId').value;
  const data = {
    ruc: document.getElementById('ruc').value,
    nombre: document.getElementById('nombre').value,
    telefono: document.getElementById('telefono').value,
    correo: document.getElementById('correo').value,
    direccion: document.getElementById('direccion').value
  };
  
  try {
    if (proveedorId) {
      await fetch(`${API_URL}/proveedores/${proveedorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Proveedor actualizado');
    } else {
      await fetch(`${API_URL}/proveedores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Proveedor registrado');
    }
    
    limpiarFormulario();
    cargarProveedores();
  } catch (error) {
    console.error('Error:', error);
    alert('Error al guardar');
  }
});

function editarProveedor(prov) {
  document.getElementById('proveedorId').value = prov._id;
  document.getElementById('ruc').value = prov.ruc;
  document.getElementById('nombre').value = prov.nombre;
  document.getElementById('telefono').value = prov.telefono || '';
  document.getElementById('correo').value = prov.correo || '';
  document.getElementById('direccion').value = prov.direccion || '';
}

async function eliminarProveedor(id) {
  if (confirm('¿Eliminar proveedor?')) {
    try {
      await fetch(`${API_URL}/proveedores/${id}`, { method: 'DELETE' });
      alert('Proveedor eliminado');
      cargarProveedores();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

function limpiarFormulario() {
  document.getElementById('proveedorForm').reset();
  document.getElementById('proveedorId').value = '';
}

cargarProveedores();
