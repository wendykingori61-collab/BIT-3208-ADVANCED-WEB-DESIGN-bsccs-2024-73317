<?php
require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$query = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) == 1) {
    $user = mysqli_fetch_assoc($result);
    
    if (password_verify($password, $user['password'])) {
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'fullname' => $user['fullname'],
                'email' => $user['email']
            ]
        ]);
        exit();
    }
}

echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
?>