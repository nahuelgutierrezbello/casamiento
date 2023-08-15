<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_FILES['image'])) {
    $imageFile = $_FILES['image'];

    if (getimagesize($imageFile['tmp_name']) === false) {
      $response = array("message" => "Hubo un error al subir la imagen. Formato de archivo no válido.");
      echo json_encode($response);
      exit;
    }


    $uploadDirectory = "uploads/";
        if (!file_exists($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
        }

       $uploadFile = $uploadDirectory . basename($imageFile['name']);


    if (move_uploaded_file($imageFile['tmp_name'], $uploadFile)) {
      $mysqli = new mysqli('localhost', 'root', '', 'casamiento');

      if ($mysqli->connect_errno) {
        $response = array("message" => "Hubo un error al conectar a la base de datos.");
        echo json_encode($response);
        exit;
      }

      $path = mysqli_real_escape_string($mysqli, $uploadFile);
      $query = "INSERT INTO imagenes (ruta) VALUES ('$path')";
      $mysqli->query($query);

      $response = array("message" => "La imagen se ha subido y guardado correctamente.");
      echo json_encode($response);
    } else {
      $response = array("message" => "Hubo un error al subir la imagen.");
      echo json_encode($response);
    }
  } else {
    $response = array("message" => "No se ha seleccionado ninguna imagen.");
    echo json_encode($response);
  }
}
?>