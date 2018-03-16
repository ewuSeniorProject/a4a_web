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
    $url = 'http://www.mizesolutions.com/a4a_web/a4aa/public/index.html';
    return $response->withRedirect($url, 301);
});


// get all data
$app->get('/establishment', function (Request $request, Response $response, array $args) {
    $sth = $this->db->prepare("SELECT * FROM Establishment ORDER BY name ASC");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->renderer->render($response, 'establishment.phtml', $data);
});


// get establishment data
$app->get('/estab', function (Request $request, Response $response, array $args) {
    $sth = $this->db->prepare("SELECT * FROM Establishment ORDER BY name ASC");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


// get establishment data by {id}
$app->get('/estab/[{id}]', function (Request $request, Response $response, array $args) {
    $url = 'http://www.mizesolutions.com/a4a_web/a4aa/public/update.html';
    return $response->withRedirect($url, 301);
});


// get establishment data by id
$app->get('/get/establishment/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Establishment WHERE est_id=$id UNION SELECT * FROM Category UNION SELECT * FROM Configuration UNION SELECT * FROM USER");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
//SELECT b.*, a.name FROM tableB AS b INNER JOIN tableA as A ON (b.id=a.id);

// delete establishment data by id
$app->delete('/delete/establishment/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Establishment WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post establishment data
$app->post('/post/establishment/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Establishment );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post establishment data
$app->put('/put/establishment/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Establishment );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});