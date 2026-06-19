<?php
require_once 'db_connect.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

$query = "DELETE FROM products WHERE id = $id";

if (mysqli_query($conn, $query)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>