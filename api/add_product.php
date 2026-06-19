<?php
require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$product_name = mysqli_real_escape_string($conn, $data['product_name'] ?? '');
$price = mysqli_real_escape_string($conn, $data['price'] ?? 0);
$category_id = mysqli_real_escape_string($conn, $data['category_id'] ?? 1);
$unit = mysqli_real_escape_string($conn, $data['unit'] ?? 'per kg');

$query = "INSERT INTO products (product_name, price, category_id, unit) 
          VALUES ('$product_name', '$price', '$category_id', '$unit')";

if (mysqli_query($conn, $query)) {
    echo json_encode(['success' => true, 'id' => mysqli_insert_id($conn)]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>
