<?php
require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = (int)$data['id'];
$product_name = mysqli_real_escape_string($conn, $data['product_name'] ?? '');
$price = mysqli_real_escape_string($conn, $data['price'] ?? 0);

$query = "UPDATE products 
          SET product_name = '$product_name', price = '$price' 
          WHERE id = $id";

if (mysqli_query($conn, $query)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>