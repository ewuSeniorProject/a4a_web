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

// put establishment data by est id
$app->put('/put/establishment/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $data = $request->getParsedBody();

    $name = $data["name"];
    $website = $data["website"];
    $cat_id = $data["cat_id"];
    $subtype = $data["subtype"];
    $config_id = $data["config_id"];
    $street = $data["street"];
    $city = $data["city"];
    $state = $data["state"];
    $zip = $data["zip"];
    $phone = $data["phone"];
    $phone_tty = $data["phone_tty"];
    $contact_fname = $data["contact_fname"];
    $contact_lname = $data["contact_lname"];
    $contact_title = $data["contact_title"];
    $contact_email = $data["contact_email"];
    $user_id = $data["user_id"];
    $date = $data["date"];
    $config_comment = $data["config_comment"];

//    $res = array("name" => $name, "website" => $website, "cat_id" => $cat_id, "subtype" => $subtype, "config_id" => $config_id, "street" => $street, "city" => $city, "state" => $state, "zip" => $zip, "phone" => $phone, "phone_tty" => $phone_tty, "contact_fname" => $contact_fname, "contact_lname" => $contact_lname, "contact_title" => $contact_title, "contact_email" => $contact_email, "user_id" => $user_id, "date" => $date, "config_comment" => $config_comment);

    $sth = $this->db->prepare("UPDATE Establishment SET  name = :Name,
                                                         website = :Website,
                                                         subtype = :Subtype,
                                                         street = :Street,
                                                         city = :City,
                                                         state = :State,
                                                         zip = :Zip,
                                                         phone = :Phone,
                                                         tty = :Phone_tty,
                                                         contact_fname = :Contact_fname,
                                                         contact_lname = :Contact_lname,
                                                         contact_title = :Contact_title,
                                                         contact_email = :Contact_email,
                                                         user_id = :User_id,
                                                         cat_id = :Cat_id,
                                                         config_id = :Config_id,
                                                         config_comment = :Config_comment,
                                                         date = :Date
                                                         WHERE est_id=$id");
    $sth->bindParam(':Name', $name, PDO::PARAM_STR);
    $sth->bindParam(':Website', $website, PDO::PARAM_STR);
    $sth->bindParam(':Subtype', $subtype, PDO::PARAM_STR);
    $sth->bindParam(':Street', $street, PDO::PARAM_STR);
    $sth->bindParam(':City', $city, PDO::PARAM_STR);
    $sth->bindParam(':State', $state, PDO::PARAM_STR);
    $sth->bindParam(':Zip', $zip, PDO::PARAM_INT);
    $sth->bindParam(':Phone', $phone, PDO::PARAM_STR);
    $sth->bindParam(':Phone_tty', $phone_tty, PDO::PARAM_STR);
    $sth->bindParam(':Contact_fname', $contact_fname, PDO::PARAM_STR);
    $sth->bindParam(':Contact_lname', $contact_lname, PDO::PARAM_STR);
    $sth->bindParam(':Contact_title', $contact_title, PDO::PARAM_STR);
    $sth->bindParam(':Contact_email', $contact_email, PDO::PARAM_STR);
    $sth->bindParam(':User_id', $user_id, PDO::PARAM_STR);
    $sth->bindParam(':Cat_id', $cat_id, PDO::PARAM_STR);
    $sth->bindParam(':Config_id', $config_id, PDO::PARAM_STR);
    $sth->bindParam(':Config_comment', $config_comment, PDO::PARAM_STR);
    $sth->bindParam(':Date', $date, PDO::PARAM_STR);
    $sth->execute();
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
    if (($this->db->prepare("SELECT * FROM Parking WHERE est_id=$id")) == null) {
        $data = array('success' => false, 'message' => "No record associated with current establishment.");
        return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
    else {
        $sth = $this->db->prepare("SELECT * FROM Parking WHERE est_id=$id");
        $sth->execute();
        $data = $sth->fetchAll();
        return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }

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

// put parking data by est id
$app->put('/put/parking/est/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $data = $request->getParsedBody();

    $park_id = $data["park_id"];
    $lot_free = $data["lot_free"];
    $street_metered = $data["street_metered"];
    $parking_type = $data["parking_type"];
    $total_num_spaces = $data["total_num_spaces"];
    $num_reserved_spaces = $data["num_reserved_spaces"];
    $num_accessable_space = $data["num_accessable_space"];
    $num_van_accessible = $data["num_van_accessible"];
    $reserve_space_sign = $data["reserve_space_sign"];
    $reserve_space_obstacles = $data["reserve_space_obstacles"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Parking SET    lot_free = :Lot_free,
                                                     street_metered = :Street_metered,
                                                     parking_type = :Parking_type,
                                                     total_num_spaces = :Total_num_spaces,
                                                     num_reserved_spaces = :Num_reserved_spaces,
                                                     num_accessable_space = :Num_accessable_space,
                                                     num_van_accessible = :Num_van_accessible,
                                                     reserve_space_sign = :Reserve_space_sign,
                                                     reserve_space_obstacles = :Reserve_space_obstacles,
                                                     comment = :Comment,
                                                     recommendations = :Recommendations
                                                     WHERE park_id=$park_id AND est_id=$id");

    $sth->bindParam(':Lot_free', $lot_free, PDO::PARAM_STR);
    $sth->bindParam(':Street_metered', $street_metered, PDO::PARAM_STR);
    $sth->bindParam(':Parking_type', $parking_type, PDO::PARAM_STR);
    $sth->bindParam(':Total_num_spaces', $total_num_spaces, PDO::PARAM_INT);
    $sth->bindParam(':Num_reserved_spaces', $num_reserved_spaces, PDO::PARAM_INT);
    $sth->bindParam(':Num_accessable_space', $num_accessable_space, PDO::PARAM_INT);
    $sth->bindParam(':Num_van_accessible', $num_van_accessible, PDO::PARAM_INT);
    $sth->bindParam(':Reserve_space_sign', $reserve_space_sign, PDO::PARAM_STR);
    $sth->bindParam(':Reserve_space_obstacles', $reserve_space_obstacles, PDO::PARAM_STR);
    $sth->bindParam(':Comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':Recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

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

// put route_from_parking data by park id
$app->put('/put/route_from_parking/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $data = $request->getParsedBody();

/**
        "distance" : distance,
        "min_width" : min_width,
        "route_surface" : route_surface,
        "route_curbs" : route_curbs,
        "tactile_warning" : tactile_warning,
        "covered" : covered,
        "lighting" : lighting,
        "lighting_option" : lighting_option,
        "lighting_type" : lighting_type,
        "comment" : comment,
        "recommendations" : recommendations
*/
    $route_park_id = $data["route_park_id"];
    $distance = $data["distance"];
    $min_width = $data["min_width"];
    $route_surface = $data["route_surface"];
    $route_curbs = $data["route_curbs"];
    $tactile_warning = $data["tactile_warning"];
    $covered = $data["covered"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Route_From_Parking SET distance = :Distance,
                                                     min_width = :Min_width,
                                                     route_surface = :Route_surface,
                                                     route_curbs = :Route_curbs,
                                                     tactile_warning = :Tactile_warning,
                                                     covered = :Covered,
                                                     lighting = :Lighting,
                                                     lighting_option = :Lighting_option,
                                                     lighting_type = :Lighting_type,
                                                     comment = :Comment,
                                                     recommendations = :Recommendations
                                                     WHERE route_park_id=$route_park_id AND park_id=$id");

    $sth->bindParam(':Distance', $distance, PDO::PARAM_STR);
    $sth->bindParam(':Min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':Route_surface', $route_surface, PDO::PARAM_STR);
    $sth->bindParam(':Route_curbs', $route_curbs, PDO::PARAM_INT);
    $sth->bindParam(':Tactile_warning', $tactile_warning, PDO::PARAM_INT);
    $sth->bindParam(':Covered', $covered, PDO::PARAM_INT);
    $sth->bindParam(':Lighting', $lighting, PDO::PARAM_INT);
    $sth->bindParam(':Lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':Lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':Comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':Recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

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

// put passenger_loading data by park id
$app->put('/put/passenger_loading/park/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $data = $request->getParsedBody();

    /**
    "passenger_id" : passenger_id,
    "designated_zone" : designated_zone,
    "distance" : distance,
    "min_width" : min_width,
    "passenger_surface" : passenger_surface,
    "tactile_warning_strips" : tactile_warning_strips,
    "covered" : covered,
    "lighting" : lighting,
    "lighting_option" : lighting_option,
    "lighting_type" : lighting_type,
    "comment" : comment,
    "recommendations" : recommendations
     */
    $passenger_id = $data["passenger_id"];
    $designated_zone= $data["designated_zone"];
    $distance = $data["distance"];
    $min_width = $data["min_width"];
    $passenger_surface = $data["passenger_surface"];
    $tactile_warning_strips = $data["tactile_warning_strips"];
    $covered = $data["covered"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Passenger_Loading SET designated_zone = :Designated_zone,
                                                     distance = :Distance,
                                                     min_width = :Min_width,
                                                     passenger_surface = :Passenger_surface,
                                                     tactile_warning_strips = :Tactile_warning_strips,
                                                     covered = :Covered,
                                                     lighting = :Lighting,
                                                     lighting_option = :Lighting_option,
                                                     lighting_type = :Lighting_type,
                                                     comment = :Comment,
                                                     recommendations = :Recommendations
                                                     WHERE passenger_id=$passenger_id AND park_id=$id");

    $sth->bindParam(':Designated_zone', $designated_zone, PDO::PARAM_STR);
    $sth->bindParam(':Distance', $distance, PDO::PARAM_STR);
    $sth->bindParam(':Min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':Passenger_surface', $passenger_surface, PDO::PARAM_INT);
    $sth->bindParam(':Tactile_warning_strips', $tactile_warning_strips, PDO::PARAM_INT);
    $sth->bindParam(':Covered', $covered, PDO::PARAM_INT);
    $sth->bindParam(':Lighting', $lighting, PDO::PARAM_INT);
    $sth->bindParam(':Lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':Lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':Comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':Recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

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
    $id = $args['id'];
    $data = $request->getParsedBody();

    /**
    "sta_id" : sta_id,
    "sta_service_area" : sta_service_area,
    "distance" : distance,
    "min_width" : min_width,
    "route_surface" : route_surface,
    "tactile_warning_strips" : tactile_warning_strips,
    "curb_cuts" : curb_cuts,
    "lighting" : lighting,
    "lighting_option" : lighting_option,
    "lighting_type" : lighting_type,
    "shelter_bench" : shelter_bench,
    "comment" : comment,
    "recommendations" : recommendations
     */
    $sta_id = $data["sta_id"];
    $sta_service_area = $data["sta_service_area"];
    $distance = $data["distance"];
    $min_width = $data["min_width"];
    $route_surface = $data["route_surface"];
    $tactile_warning_strips = $data["tactile_warning_strips"];
    $curb_cuts = $data["curb_cuts"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $shelter_bench = $data["shelter_bench"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE STA_Bus SET sta_service_area = :Sta_service_area,
                                                     distance = :Distance,
                                                     min_width = :Min_width,
                                                     route_surface = :Route_surface,
                                                     tactile_warning_strips = :Tactile_warning_strips,
                                                     curb_cuts = :Curb_cuts,
                                                     lighting = :Lighting,
                                                     lighting_option = :Lighting_option,
                                                     lighting_type = :Lighting_type,
                                                     shelter_bench = :Shelter_bench,
                                                     comment = :Comment,
                                                     recommendations = :Recommendations
                                                     WHERE sta_id=$sta_id AND park_id=$id");

    $sth->bindParam(':Sta_service_area', $sta_service_area, PDO::PARAM_STR);
    $sth->bindParam(':Distance', $distance, PDO::PARAM_STR);
    $sth->bindParam(':Min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':Route_surface', $route_surface, PDO::PARAM_INT);
    $sth->bindParam(':Tactile_warning_strips', $tactile_warning_strips, PDO::PARAM_INT);
    $sth->bindParam(':Curb_cuts', $curb_cuts, PDO::PARAM_INT);
    $sth->bindParam(':Lighting', $lighting, PDO::PARAM_INT);
    $sth->bindParam(':Lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':Lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':Shelter_bench', $shelter_bench, PDO::PARAM_STR);
    $sth->bindParam(':Comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':Recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

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

// get all sta_route data id
$app->get('/get/sta_route/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM STA_Route WHERE sta_route_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get all sta_route data by sta_bus id
$app->get('/get/sta_route/sta_bus/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];

    $sth = $this->db->prepare("SELECT * FROM STA_Route WHERE sta_bus_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get single sta_route record by sta_route id and sta_bus id
$app->get('/get/sta_route/single/sta_bus/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $data = $request->getParsedBody();
    $sta_route_id = $data["sta_route_id"];

    $sth = $this->db->prepare("SELECT * FROM STA_Route WHERE sta_route_id=$sta_route_id AND sta_bus_id=$id");
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

// put sta_route data by sta_bus id
$app->put('/put/sta_route/sta_bus/[{id}]', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $data = $request->getParsedBody();

    /**
    "sta_route_id" : sta_route_id,
    "route_num" : route_num,
    "north_bound_stop" : north_bound_stop,
    "south_bound_stop" : south_bound_stop,
    "east_bound_stop" : east_bound_stop,
    "west_bound_stop" : west_bound_stop
     */
    $sta_route_id = $data["sta_route_id"];
    $route_num = $data["route_num"];
    $north_bound_stop = $data["north_bound_stop"];
    $south_bound_stop = $data["south_bound_stop"];
    $east_bound_stop = $data["east_bound_stop"];
    $west_bound_stop = $data["west_bound_stop"];

    $sth = $this->db->prepare("UPDATE STA_Route SET route_num = :Route_num,
                                                     north_bound_stop = :North_bound_stop,
                                                     south_bound_stop = :South_bound_stop,
                                                     east_bound_stop = :East_bound_stop,
                                                     west_bound_stop = :West_bound_stop
                                                     WHERE sta_route_id=$sta_route_id AND sta_bus_id=$id");

    $sth->bindParam(':Route_num', $route_num, PDO::PARAM_STR);
    $sth->bindParam(':North_bound_stop', $north_bound_stop, PDO::PARAM_INT);
    $sth->bindParam(':South_bound_stop', $south_bound_stop, PDO::PARAM_INT);
    $sth->bindParam(':East_bound_stop', $east_bound_stop, PDO::PARAM_INT);
    $sth->bindParam(':West_bound_stop', $west_bound_stop, PDO::PARAM_INT);
    $sth->execute();

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

