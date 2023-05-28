// Obtener los elementos input del formulario
var id = localStorage.getItem("ID");
var usuarioInput = document.getElementById('usuarioid');

const formulario = document.querySelector('form');
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  enviarFormulario();
});

function enviarFormulario() {
  var valorUsuario = usuarioInput.value;
  const formData = new FormData();
  formData.append('username', valorUsuario);
  formData.append('fk_join', id);

  fetch('http://localhost:3001/api/historial', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

function actualizarInput() {
  // ... (tu código existente para actualizar el input de usuario)
}
