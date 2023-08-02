const fileInput = document.getElementById("file-input");
const previewImage = document.getElementById("preview-image");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  // Check if the file is an image
  if (!file.type.match()) {
    alert("Please select an image file.");
    return;
  }

  // Create a new Image object
  const image = new Image();

  // Set the image's src to the file's path
  image.src = file.path;

  // Add the image to the preview area
  previewImage.appendChild(image);
});

function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  // Check if a file was selected
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  // Create a new FormData object
  const formData = new FormData();
  formData.append("file", file);

  // Create an XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set the XMLHttpRequest object's method to POST
  xhr.open("POST", "/upload");

  // Set the XMLHttpRequest object's contentType property
  xhr.setRequestHeader("Content-Type", "multipart/form-data");

  // Send the XMLHttpRequest object's request
  xhr.send(formData);

  // Check the XMLHttpRequest object's status code
  if (xhr.status === 200) {
    alert("File uploaded successfully.");
  } else {
    alert("Error uploading file.");
  }
}
