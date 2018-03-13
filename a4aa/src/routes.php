<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

//$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
//    // Sample log message
//    $this->logger->info("Slim-Skeleton '/' route");
//
//    // Render index view
//    return $this->renderer->render($response, 'index.phtml', $args);
//});

// home page
$app->get('/', function (Request $request, Response $response, array $args) {
    $url = 'http://www.mizesolutions.com/a4a_web/a4aa/public/estab.html';
    return $response->withRedirect($url, 301);
});


// get all data
$app->get('/establishment', function (Request $request, Response $response, array $args) {
    $sth = $this->db->prepare("SELECT * FROM Establishment");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->renderer->render($response, 'establishment.phtml', $data);
});


// get establishment data
$app->get('/estab', function () {
    $sth = $this->db->prepare("SELECT * FROM Establishment");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

