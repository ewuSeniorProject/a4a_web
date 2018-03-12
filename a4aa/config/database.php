<?php
$name = 'mizesolu_a4aa';
$username = 'mizesolu_a4aaB';
$password = 'QxUP=r@JE10P';
$host = 'localhost';

return [
    'type' => 'mysql',
    'options' => [
        'PDO::MYSQL_ATTR_INIT_COMMAND' => 'SET NAMES \'UTF8\''
    ],
    'dsn' => 'mysql:dbname=' . $name . ';host=' . $host,
    'host' => $host,
    'name' => $name,
    'username' => $username,
    'password' => $password,
];