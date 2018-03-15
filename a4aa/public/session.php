<?php
$sessionID = "";
if (isset($_POST)) {
    $sessionID = $_POST['id'];
} else  {
    return $sessionID;
}