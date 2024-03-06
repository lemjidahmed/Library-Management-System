<?php
$uploadDir = 'uploads/'; // Directory where uploaded files will be stored

// Check if the upload directory exists, if not, create it
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $tmpName = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];

    // Move the uploaded file to the upload directory
    if (move_uploaded_file($tmpName, $uploadDir . $fileName)) {
        echo json_encode(['success' => true, 'message' => 'File uploaded successfully.', 'filename' => $fileName]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error uploading file.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'File upload error: ' . $_FILES['file']['error']]);
}
?>
