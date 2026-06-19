<?php
require_once 'db_connect.php';

$query = "SELECT * FROM categories WHERE is_active = 1 ORDER BY display_order";
$result = mysqli_query($conn, $query);

$categories = [];
while ($row = mysqli_fetch_assoc($result)) {
    $categories[] = $row;
}

echo json_encode($categories);
?>