<?php
require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$fullname = $data['fullname'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Check if email exists
$check = mysqli_query($conn, "SELECT id FROM users WHERE email = '$email'");
if (mysqli_num_rows($check) > 0) {
    echo json_encode(['success' => false, 'error' => 'Email already registered']);
    exit();
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$query = "INSERT INTO users (fullname, email, password) VALUES ('$fullname', '$email', '$hashed_password')";

if (mysqli_query($conn, $query)) {
    echo json_encode(['success' => true, 'message' => 'Registration successful']);
} else {
    echo json_encode(['success' => false, 'error' => 'Registration failed']);
}
?>