document.addEventListener('DOMContentLoaded', function() {
  var paramoInput = document.getElementById('paramoid');
  var departamentoInput = document.getElementById('departamentoid');
  var municipioInput = document.getElementById('municipioid');
  var coordenadasInput = document.getElementById('cooid');

  function actualizarInput() {
    var popupJson = JSON.parse(localStorage.getItem('popupJson'));
    if (popupJson) {
      paramoInput.value = popupJson.nombre || '';
      departamentoInput.value = popupJson.dpto_cnmbr || '';
      municipioInput.value = popupJson.mpio_cnmbr || '';
      coordenadasInput.value = popupJson.coordenadas || '';
    }
  }

  actualizarInput();

  window.addEventListener('storage', function(event) {
    if (event.key === 'popupJson') {
      actualizarInput();
    }
  });

  var enviarBtn = document.querySelector('input[value="Enviar"]');

  if (enviarBtn) {
    enviarBtn.addEventListener('click', (event) => {
      console.log('Botón Enviar presionado');
    });
  }

  var formulario = document.querySelector('form');
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
  
    var usuarioInput = document.getElementById('usuarioid');
    var id = JSON.parse(localStorage.getItem('popupJson'));
  
    if (!usuarioInput.value) {
      alert('El campo de nombre de usuario no puede estar vacío');
      return;
    }
  
    var body = {
      username: usuarioInput.value,
      fk_join: id.id
    };
  
    fetch('http://localhost:3000/api/historial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  });
  


});
