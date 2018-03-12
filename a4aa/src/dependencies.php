<?php
// DIC configuration

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

//// PDO database library
//$container['db'] = function ($c) {
//    $settings = $c->get('settings')['db'];
//    $pdo = new PDO("mysql:host=" . $settings['host'] . ";dbname=" . $settings['dbname'], $settings['user'], $settings['pass']);
//    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
//    return $pdo;
//};

// Register component on container
$container['view'] = function ($container) {
    return new \Slim\Views\PhpRenderer('../templates/');
};

$container->add('Illuminate\Database\Capsule\Manager', function() {
    $dbconfig = require './config/database.php';
    $capsule = new \Illuminate\Database\Capsule\Manager;
    $capsule->addConnection([
        'driver' => 'mysql',
        'host' => $dbconfig['host'],
        'database' => $dbconfig['name'],
        'username' => $dbconfig['username'],
        'password' => $dbconfig['password'],
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => '',
    ]);

    $capsule->setAsGlobal();
    $capsule->bootEloquent();

    return $capsule;
});
