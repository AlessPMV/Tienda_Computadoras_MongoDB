const API_URL = 'http://localhost:3000/api';

async function cargarClientes() {
  try {
    const res = await fetch(`${API_URL}/clientes`);
    const clientes = await res.json();
    const tbody = document.getElementById('clientesTable');
    tbody.innerHTML = '';
    
    clientes.forEach(cli => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cli.dni}</td>
        <td>${cli.nombre}</td>
        <td>${cli.telefono || ''}</td>
        <td>
          <button onclick='editarCliente(${JSON.stringify(cli)})'>Editar</button>
          <button class="btn-danger" onclick="eliminarCliente('${cli._id}')">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById('clienteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const clienteId = document.getElementById('clienteId').value;
  const data = {
    dni: document.getElementById('dni').value,
    nombre: document.getElementById('nombre').value,
    telefono: document.getElementById('telefono').value
  };
  
  try {
    if (clienteId) {
      await fetch(`${API_URL}/clientes/${clienteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Cliente actualizado');
    } else {
      await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Cliente registrado');
    }
    
    limpiarFormulario();
    cargarClientes();
  } catch (error) {
    console.error('Error:', error);
    alert('Error al guardar');
  }
});

function editarCliente(cli) {
  document.getElementById('clienteId').value = cli._id;
  document.getElementById('dni').value = cli.dni;
  document.getElementById('nombre').value = cli.nombre;
  document.getElementById('telefono').value = cli.telefono || '';
}

async function eliminarCliente(id) {
  if (confirm('¿Eliminar cliente?')) {
    try {
      await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
      alert('Cliente eliminado');
      cargarClientes();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

function limpiarFormulario() {
  document.getElementById('clienteForm').reset();
  document.getElementById('clienteId').value = '';
}

cargarClientes();
