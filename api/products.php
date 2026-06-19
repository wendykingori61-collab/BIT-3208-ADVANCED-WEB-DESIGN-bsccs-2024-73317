<?php
require_once 'db_connect.php';

$query = "SELECT * FROM products WHERE is_featured = 1 ORDER BY rating DESC";
$result = mysqli_query($conn, $query);

$products = [];
while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);
?>