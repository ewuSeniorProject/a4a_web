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

// get all data
$app->get('/establishment', function (Request $request, Response $response, array $args) {
    $sth = $this->db->prepare("SELECT * FROM Establishment");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->renderer->render($response, 'establishment.phtml', $data);
});


