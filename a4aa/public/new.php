<?php
// Initialize the session
session_start();

// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role'])){
    header("location: login.php");
    exit;
}
?>