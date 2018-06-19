<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
define('DB_SERVER', '66.147.244.98');
define('DB_USERNAME', 'mizesolu_a4aaB');
define('DB_PASSWORD', 'QxUP=r@JE10P');
define('DB_NAME', 'mizesolu_a4aa');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}