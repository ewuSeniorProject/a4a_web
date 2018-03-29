<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

// home page
$app->get('/', function (Request $request, Response $response, array $args) {
    $url = 'index.html';
    return $response->withRedirect($url, 301);
});


/**
 * ESTABLISHMENT ROUTES
 */
// get establishment data
$app->get('/establishment/', function (Request $request, Response $response, array $args) {
    $sth = $this->db->prepare("SELECT * FROM Establishment ORDER BY name ASC");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get establishment data by id
$app->get('/get/establishment/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Establishment WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

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

// put establishment data
$app->put('/put/establishment/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Establishment );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * CATEGORY ROUTES
 */
// get all category
$app->get('/category/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Category");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get category data by id
$app->get('/get/category/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Category WHERE cat_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete category data by id
$app->delete('/delete/category/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Category WHERE cat_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post category data
$app->post('/post/category/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Category );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put category data
$app->put('/put/category/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Category );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * CONFIGURATION ROUTES
 */
// get all configuration
$app->get('/configuration/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Configuration");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get configuration data by id
$app->get('/get/configuration/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Configuration WHERE config_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete configuration data by id
$app->delete('/delete/configuration/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Configuration WHERE config_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post configuration data
$app->post('/post/configuration/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO configuration );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put configuration data
$app->put('/put/configuration/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO configuration );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * USER ROUTES
 */
// get all user
$app->get('/user/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM User");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get user data by id
$app->get('/get/user/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM User WHERE user_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete user data by id
$app->delete('/delete/user/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM User WHERE user_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post user data
$app->post('/post/user/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO User );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put user data
$app->put('/put/user/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO User );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * PARKING ROUTES
 */
// get all parking
$app->get('/parking/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Parking");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get parking data by parking id
$app->get('/get/parking/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Parking WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get parking data by establishment id
$app->get('/get/parking/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Parking WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get parking id by establishment id
$app->get('/get/park_id/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT park_id FROM Parking WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete parking data by id
$app->delete('/delete/parking/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Parking WHERE park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete parking data by establishment id
$app->delete('/delete/parking/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Parking WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post parking data
$app->post('/post/parking/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Parking );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put parking data by establishment id
$app->put('/put/parking/est/[{id}]', function (Request $request, Response $response, array $args){
//    $id = $args['id'];
//    $sth = $this->db->prepare("INSERT INTO Parking WHERE est_id=$id");
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * ROUTE FROM PARKING ROUTES
 */
// get all route_from_parking
$app->get('/route_from_parking/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Route_From_Parking");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get route_from_parking data by route_from_parking id
$app->get('/get/route_from_parking/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Route_From_Parking WHERE route_park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get route_from_parking data by parking id
$app->get('/get/route_from_parking/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Route_From_Parking WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete route_from_parking data by id
$app->delete('/delete/route_from_parking/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Route_From_Parking WHERE route_park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete route_from_parking data by parking id
$app->delete('/delete/route_from_parking/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Route_From_Parking WHERE park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post route_from_parking data
$app->post('/post/route_from_parking/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Route_From_Parking );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put route_from_parking data
$app->put('/put/route_from_parking/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Route_From_Parking );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * PASSENGER LOADING ROUTES
 */
// get all passenger_loading
$app->get('/passenger_loading/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Passenger_Loading");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get passenger_loading data by passenger_loading id
$app->get('/get/passenger_loading/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Passenger_Loading WHERE passenger_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get passenger_loading data by parking id
$app->get('/get/passenger_loading/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Passenger_Loading WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete passenger_loading data by id
$app->delete('/delete/passenger_loading/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Passenger_Loading WHERE passenger_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete passenger_loading data by parking id
$app->delete('/delete/passenger_loading/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Passenger_Loading WHERE park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post passenger_loading data
$app->post('/post/passenger_loading/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Passenger_Loading );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put passenger_loading data
$app->put('/put/passenger_loading/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Passenger_Loading );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put passenger_loading data by parkrk id
$app->put('/put/passenger_loading/park/[{id}]', function (Request $request, Response $response, array $args){
//    $id = $args['id'];
//    $sth = $this->db->prepare("INSERT INTO Passenger_Loading );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * STA BUS ROUTES
 */
// get all sta_bus
$app->get('/sta_bus/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM STA_Bus");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get sta_bus data by sta_bus id
$app->get('/get/sta_bus/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM STA_Bus WHERE sta_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get sta_bus data by parking id
$app->get('/get/sta_bus/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM STA_Bus WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get sta_bus id by parking id
$app->get('/get/sta_bus_id/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT sta_id FROM STA_Bus WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete sta_bus data by  id
$app->delete('/delete/sta_bus/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM STA_Bus WHERE sta_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete sta_bus data by parking id
$app->delete('/delete/sta_bus/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM STA_Bus WHERE park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post sta_bus data
$app->post('/post/sta_bus/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO STA_Bus );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put sta_bus data
$app->put('/put/sta_bus/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO STA_Bus );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put sta_bus data by park id
$app->put('/put/sta_bus/park/[{id}]', function (Request $request, Response $response, array $args){
//    $id = $args['id'];
//    $sth = $this->db->prepare("INSERT INTO STA_Bus );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * STA ROUTE ROUTES
 */
// get all sta_route
$app->get('/sta_route/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM STA_Route");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get sta_route data by sta_bus id
$app->get('/get/sta_route/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM STA_Route WHERE sta_route_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get sta_route data by sta_bus id
$app->get('/get/sta_route/sta_bus/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM STA_Route WHERE sta_bus_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete sta_route data by id
$app->delete('/delete/sta_route/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM STA_Route WHERE sta_route_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete sta_route data by sta_bus id
$app->delete('/delete/sta_route/sta_bus/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM STA_Route WHERE sta_bus_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post sta_route data
$app->post('/post/sta_route/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO STA_Route );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put sta_route data
$app->put('/put/sta_route/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO STA_Route );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * EXTERIOR PATHWAYS ROUTES
 */
// get all exterior_pathways
$app->get('/exterior_pathways/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Exterior_Pathways");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_pathways data by id
$app->get('/get/exterior_pathways/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Pathways WHERE ext_path_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_pathways data by establishment id
$app->get('/get/exterior_pathways/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Pathways WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_pathways data by id
$app->delete('/delete/exterior_pathways/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Pathways WHERE exterior_pathways_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_pathways data by establishment id
$app->delete('/delete/exterior_pathways/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Pathways WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post exterior_pathways data
$app->post('/post/exterior_pathways/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Exterior_Pathways );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put exterior_pathways data
$app->put('/put/exterior_pathways/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Exterior_Pathways );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * EXTERIOR STAIRS ROUTES
 */
// get all exterior_stairs
$app->get('/exterior_stairs/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Exterior_Stairs");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_stairs data by id
$app->get('/get/exterior_stairs/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Stairs WHERE ext_stair_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_stairs data by establishment id
$app->get('/get/exterior_stairs/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Stairs WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_stairs data by id
$app->delete('/delete/exterior_stairs/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Stairs WHERE ext_stair_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_stairs data by establishment id
$app->delete('/delete/exterior_stairs/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Stairs WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post exterior_stairs data
$app->post('/post/exterior_stairs/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Exterior_Stairs );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put exterior_stairs data
$app->put('/put/exterior_stairs/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Exterior_Stairs );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * EXTERIOR RAMPS ROUTES
 */
// get all exterior_ramps
$app->get('/exterior_ramps/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Exterior_Ramps");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_ramps data by id
$app->get('/get/exterior_ramps/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Ramps WHERE ext_ramp_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_ramps data by establishment id
$app->get('/get/exterior_ramps/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Ramps WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_ramps data by id
$app->delete('/delete/exterior_ramps/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Ramps WHERE ext_ramp_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_ramps data by establishment id
$app->delete('/delete/exterior_ramps/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Ramps WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post exterior_ramps data
$app->post('/post/exterior_ramps/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Exterior_Ramps );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put exterior_ramps data
$app->put('/put/exterior_ramps/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Exterior_Ramps );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * MAIN ENTRANCE ROUTES
 */
// get all main_entrance
$app->get('/main_entrance/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Main_Entrance");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get main_entrance data by id
$app->get('/get/main_entrance/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Main_Entrance WHERE main_ent_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get main_entrance data by establishment id
$app->get('/get/main_entrance/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Main_Entrance WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete main_entrance data by id
$app->delete('/delete/main_entrance/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Main_Entrance WHERE main_ent_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete main_entrance data by establishment id
$app->delete('/delete/main_entrance/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Main_Entrance WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post main_entrance data
$app->post('/post/main_entrance/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Main_Entrance );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put main_entrance data
$app->put('/put/main_entrance/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Main_Entrance );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * INTERIOR ROUTES
 */
// get all interior
$app->get('/interior/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Interior");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get interior data by id
$app->get('/get/interior/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Interior WHERE interior_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get interior data by establishment id
$app->get('/get/interior/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Interior WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete interior data by id
$app->delete('/delete/interior/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Interior WHERE interior_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete interior data by establishment id
$app->delete('/delete/interior/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Interior WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post interior data
$app->post('/post/interior/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Interior );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put interior data
$app->put('/put/interior/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Interior );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * ELEVATOR ROUTES
 */
// get all elevator
$app->get('/elevator/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Elevator");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get elevator data by id
$app->get('/get/elevator/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Elevator WHERE elevator_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get elevator data by establishment id
$app->get('/get/elevator/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Elevator WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete elevator data by id
$app->delete('/delete/elevator/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Elevator WHERE elevator_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete elevator data by establishment id
$app->delete('/delete/elevator/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Elevator WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post elevator data
$app->post('/post/elevator/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Elevator );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put elevator data
$app->put('/put/elevator/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Elevator );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * SIGNAGE ROUTES
 */
// get all signage
$app->get('/signage/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Signage");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get signage data by id
$app->get('/get/signage/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Signage WHERE sign_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get signage data by establishment id
$app->get('/get/signage/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Signage WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete signage data by id
$app->delete('/delete/signage/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Signage WHERE sign_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete signage data by establishment id
$app->delete('/delete/signage/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Signage WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post signage data
$app->post('/post/signage/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Signage );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put signage data
$app->put('/put/signage/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Signage );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * EMERGENCY ROUTES
 */
// get all emergency
$app->get('/emergency/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Emergency");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get emergency data by id
$app->get('/get/emergency/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Emergency WHERE emergency_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get emergency data by establishment id
$app->get('/get/emergency/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Emergency WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete emergency data by id
$app->delete('/delete/emergency/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Emergency WHERE emergency_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete emergency data by establishment id
$app->delete('/delete/emergency/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Emergency WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post emergency data
$app->post('/post/emergency/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Emergency );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put emergency data
$app->put('/put/emergency/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Emergency );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * SEATING ROUTES
 */
// get all seating
$app->get('/seating/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Seating");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get seating data by id
$app->get('/get/seating/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Seating WHERE seating_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get seating data by establishment id
$app->get('/get/seating/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Seating WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete seating data by id
$app->delete('/delete/seating/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Seating WHERE seating_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete seating data by establishment id
$app->delete('/delete/seating/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Seating WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post seating data
$app->post('/post/seating/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Seating );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put seating data
$app->put('/put/seating/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Seating );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * RESTROOM ROUTES
 */
// get all restroom
$app->get('/restroom/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Restroom");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get restroom data by id
$app->get('/get/restroom/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Restroom WHERE restroom_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get restroom data by establishment id
$app->get('/get/restroom/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Restroom WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete restroom data by id
$app->delete('/delete/restroom/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Restroom WHERE restroom_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete restroom data by establishment id
$app->delete('/delete/restroom/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Restroom WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post restroom data
$app->post('/post/restroom/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Restroom );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put restroom data
$app->put('/put/restroom/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Restroom );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * RESTROOM INFO ROUTES
 */
// get all restroom_info
$app->get('/restroom_info/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Restroom_Info");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get restroom_info data by id
$app->get('/get/restroom_info/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Restroom_Info WHERE rest_info_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get restroom_info data by restroom id
$app->get('/get/restroom_info/rest/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Restroom_Info WHERE rest_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete restroom_info data by id
$app->delete('/delete/restroom_info/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Restroom_Info WHERE rest_info_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete restroom_info data by restroom id
$app->delete('/delete/restroom_info/rest/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Restroom_Info WHERE rest_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post restroom_info data
$app->post('/post/restroom_info/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Restroom_Info );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put restroom_info data
$app->put('/put/restroom_info/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Restroom_Info );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * COMMUNICATION ROUTES
 */
// get all communication
$app->get('/communication/', function (Request $request, Response $response, array $args){
    $sth = $this->db->prepare("SELECT * FROM Communication");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get communication data by id
$app->get('/get/communication/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Communication WHERE communication_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get communication data by establishment id
$app->get('/get/communication/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Communication WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete communication data by id
$app->delete('/delete/communication/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Communication WHERE communication_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete communication data by establishment id
$app->delete('/delete/communication/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Communication WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post communication data
$app->post('/post/communication/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Communication );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put communication data
$app->put('/put/communication/', function (Request $request, Response $response, array $args){
//    $sth = $this->db->prepare("INSERT INTO Communication );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

