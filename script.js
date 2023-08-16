function previewImage(event) {
  const input = event.target;
  const preview = document.querySelector("#imagePreview");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function uploadImage(event) {
  event.preventDefault();
  const form = event.target;

  const xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      updateAlert(response.message, "success"); 

      form.reset();
      document.querySelector("#imagePreview").src = "#";
    } else {
      updateAlert("Error al subir la imagen", "error"); 
    }
  };

  xhr.send(new FormData(form));
}

function updateAlert(message, alertType) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert ${alertType}`;
  alertDiv.innerHTML = message;

  const container = document.querySelector(".alert-container");
  container.appendChild(alertDiv);

  setTimeout(function() {
    container.removeChild(alertDiv);
    location.reload();
  }, 700);
}

// Obtener las imágenes de la base de datos y renderizar la galería
function getImages() {
  fetch('upload.php', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const gallery = document.getElementById('gallery');
      
      data.images.forEach(image => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const imgElement = document.createElement('img');
        imgElement.src = image.ruta;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.addEventListener('click', () => deleteImage(image.id, imageContainer));
        
        imageContainer.appendChild(imgElement);
        imageContainer.appendChild(deleteButton);
        
        gallery.appendChild(imageContainer);
      });     
    } else {
      console.log(data.message);
    }
  })
  .catch(error => console.log(error));
}

// Llamar a la función para obtener las imágenes al cargar la página
getImages();

// Eliminar una imagen de la base de datos
function deleteImage(imageId, imageContainer) {
  const id = Number(imageId)
  
  const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta imagen?');
  if (confirmDelete) {
    fetch('upload.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `imageId=${id}`
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Eliminar el contenedor de la imagen de la galería
        if (imageContainer) {
          imageContainer.remove();
        }
      } else {
        console.log(data.message);
        

      if (data.message == "No se encontró la imagen en la base de datos.") {
        // Recargar la página si la imagen no se encontró en la base de datos
        location.reload();
      }
      }
    })
    .catch(error => {
      console.log(error)
      location.reload();
    });
  }
}