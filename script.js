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

function uploadFile(event) {
event.preventDefault();
const form = event.target;

const xhr = new XMLHttpRequest();
xhr.open(form.method, form.action);

xhr.onload = function() {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    alert(response.message);

    form.reset();
    document.querySelector("#imagePreview").src = "#";
  } else {
    alert('Error al subir la imagen');
  }
};

xhr.send(new FormData(form));
}  