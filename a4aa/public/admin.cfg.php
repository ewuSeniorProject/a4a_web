<?php
if($_SESSION['role'] !== 'admin'){
    header("location: home.php");
    exit;
}