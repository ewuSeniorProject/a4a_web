<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

// home page
$app->get('/', function (Request $request, Response $response, array $args){
    $url = 'home.php';
    return $response->withRedirect($url, 301);
})->setname("root");


/**
 * ESTABLISHMENT ROUTES
 */
// get establishment data
$app->get('/establishment/', function (Request $request, Response $response, array $args){
    // Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}


    $sth = $this->db->prepare("SELECT * FROM Establishment ORDER BY name ASC");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get establishment by id
$app->get('/get/establishment/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];

    $sth = $this->db->prepare("SELECT * FROM Establishment WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();

    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get establishment id by name and date
$app->get('/get/establishment/{user_id}/{cat_id}/{config_id}/{year}/{month}/{day}/', function (Request $request, Response $response, array $args){
    // Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $user_id = $args['user_id'];
    $cat_id = $args['cat_id'];
    $config_id = $args['config_id'];
    $year = $args['year'];
    $month = $args['month'];
    $day = $args['day'];
    $date = $year.$month.$day;

    $sth = $this->db->prepare("SELECT est_id FROM Establishment WHERE user_id=$user_id AND cat_id=$cat_id AND config_id=$config_id AND date=$date");
    $sth->execute();
    $data = $sth->fetchAll();

    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get establishment name by id
$app->get('/get/establishment/name/{id}', function (Request $request, Response $response, array $args){
    // Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $est_id = $args['id'];

    $sth = $this->db->prepare("SELECT name FROM Establishment WHERE est_id=$est_id");
    $sth->execute();
    $data = $sth->fetchAll();

    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete establishment data by id
$app->delete('/delete/establishment/{id}', function (Request $request, Response $response, array $args){
    // Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Establishment WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post establishment data
$app->post('/post/establishment/', function (Request $request, Response $response, array $args){
    // Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

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

    $sth = $this->db->prepare("INSERT INTO Establishment (name, website, subtype, street, city, state, zip, phone, tty, contact_fname, contact_lname, contact_title, contact_email, user_id, cat_id, config_id, config_comment, date)
                               VALUES (:name, :website, :subtype, :street, :city, :state, :zip, :phone, :tty, :contact_fname, :contact_lname, :contact_title, :contact_email, :user_id, :cat_id, :config_id, :config_comment, :date)");

    $sth->bindParam(':name', $name, PDO::PARAM_STR);
    $sth->bindParam(':website', $website, PDO::PARAM_STR);
    $sth->bindParam(':subtype', $subtype, PDO::PARAM_STR);
    $sth->bindParam(':street', $street, PDO::PARAM_STR);
    $sth->bindParam(':city', $city, PDO::PARAM_STR);
    $sth->bindParam(':state', $state, PDO::PARAM_STR);
    $sth->bindParam(':zip', $zip, PDO::PARAM_INT);
    $sth->bindParam(':phone', $phone, PDO::PARAM_STR);
    $sth->bindParam(':tty', $phone_tty, PDO::PARAM_STR);
    $sth->bindParam(':contact_fname', $contact_fname, PDO::PARAM_STR);
    $sth->bindParam(':contact_lname', $contact_lname, PDO::PARAM_STR);
    $sth->bindParam(':contact_title', $contact_title, PDO::PARAM_STR);
    $sth->bindParam(':contact_email', $contact_email, PDO::PARAM_STR);
    $sth->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $sth->bindParam(':cat_id', $cat_id, PDO::PARAM_INT);
    $sth->bindParam(':config_id', $config_id, PDO::PARAM_INT);
    $sth->bindParam(':config_comment', $config_comment, PDO::PARAM_STR);
    $sth->bindParam(':date', $date, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put establishment data
$app->put('/put/establishment/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Establishment );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put category data by cat id
$app->put('/put/establishment/category/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $cat_id = $data["cat_id"];

    $sth = $this->db->prepare("UPDATE Establishment SET cat_id = :cat_id WHERE est_id=$id");

    $sth->bindParam(':cat_id', $cat_id, PDO::PARAM_STR);
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put config data by config id
$app->put('/put/establishment/config/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $config_id = $data["config_id"];

    $sth = $this->db->prepare("UPDATE Establishment SET config_id = :config_id WHERE est_id=$id");

    $sth->bindParam(':config_id', $config_id, PDO::PARAM_STR);
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put user data by user id
$app->put('/put/establishment/user/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $user_id = $data["user_id"];

    $sth = $this->db->prepare("UPDATE Establishment SET user_id = :user_id WHERE est_id=$id");

    $sth->bindParam(':user_id', $user_id, PDO::PARAM_STR);
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put establishment data by est id
$app->put('/put/establishment/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

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
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Category");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get category data by id
$app->get('/get/category/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Category WHERE cat_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete category data by id
$app->delete('/delete/category/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Category WHERE cat_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post category data
$app->post('/post/category/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Category );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put category data
$app->put('/put/category/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

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
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Configuration");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get configuration data by id
$app->get('/get/configuration/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Configuration WHERE config_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete configuration data by id
$app->delete('/delete/configuration/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Configuration WHERE config_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post configuration data
$app->post('/post/configuration/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO configuration );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put configuration data
$app->put('/put/configuration/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

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
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM User ORDER BY lname ASC");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get all active users
$app->get('/user/active/', function (Request $request, Response $response, array $args){
// Initialize the session
    session_start();

    $time = $_SERVER['REQUEST_TIME'];

    $timeout_duration = 1800;

    if (isset($_SESSION['LAST_ACTIVITY']) &&
        ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
        session_unset();
        session_destroy();
        session_start();
    }

    $_SESSION['LAST_ACTIVITY'] = $time;

// If session variable is not set it will redirect to login page
    if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
        header("location: login.php");
        exit;
    }

    $sth = $this->db->prepare("SELECT * FROM User WHERE active='yes' ORDER BY lname ASC");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get user data by id
$app->get('/get/user/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM User WHERE user_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get user data by id
$app->get('/get/user/mobile/{id}', function (Request $request, Response $response, array $args){

    $id = $args['id'];

    $sth = $this->db->prepare("SELECT * FROM User WHERE user_id=$id");
    $sth->execute();

    $data = $sth->fetchAll();

    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get user data by user name
$app->get('/get/user/name/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $user = $request->getParam("uname");

    $sth = $this->db->prepare("SELECT COUNT(1) AS count FROM User WHERE user_name LIKE '$user'");
    $sth->execute();
    $data = $sth->fetchAll();

    if ($data[0]['count'] != 1) {
//        $res = array("response" => true);
        $res = true;
        return $this->response->withJson($res)->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
    else {
//        $res = array("response" => false, "message" => 'User name already in use.');
        $res = false;
        return $this->response->withJson($res)->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }

});

// get user data by user name
$app->get('/get/user/email/', function (Request $request, Response $response, array $args){
// Initialize the session
    session_start();
    $time = $_SERVER['REQUEST_TIME'];
    $timeout_duration = 1800;
    if (isset($_SESSION['LAST_ACTIVITY']) &&
        ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
        session_unset();
        session_destroy();
        session_start();
    }
    $_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
    if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
        header("location: login.php");
        exit;
    }

    $email = $request->getParam("email");

    $sth = $this->db->prepare("SELECT COUNT(1) AS count FROM User WHERE email LIKE '$email'");
    $sth->execute();
    $data = $sth->fetchAll();

    if ($data[0]['count'] != 1) {
//        $res = array("response" => true);
        $res = true;
        return $this->response->withJson($res)->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
    else {
//        $res = array("response" => false, "message" => 'User name already in use.');
        $res = false;
        return $this->response->withJson($res)->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }

});

// delete user data by id
$app->delete('/delete/user/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM User WHERE user_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post user data
$app->post('/post/user/', function (Request $request, Response $response, array $args){ 
    // Initialize the session
    session_start();
    $time = $_SERVER['REQUEST_TIME'];
    $timeout_duration = 1800;
    if (isset($_SESSION['LAST_ACTIVITY']) &&
        ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
        session_unset();
        session_destroy();
        session_start();
    }
    $_SESSION['LAST_ACTIVITY'] = $time;
    // If session variable is not set it will redirect to login page
    if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
        header("location: login.php");
        exit;
    }

    $data = $request->getParsedBody();

    $fname = $data["fname"];
    $lname = $data["lname"];
    $user_name = $data["user_name"];
    $email = $data["email"];
    $password = password_hash($data["password"], PASSWORD_DEFAULT);
    $role = $data["role"];
    $active = $data["active"];

    $sth = $this->db->prepare("INSERT INTO User (fname, lname, user_name, email, password, role, active) 
                                VALUES (:fname, :lname, :user_name, :email, :password, :role, :active)");

    $sth->bindParam(':fname', $fname, PDO::PARAM_STR);
    $sth->bindParam(':lname', $lname, PDO::PARAM_STR);
    $sth->bindParam(':user_name', $user_name, PDO::PARAM_STR);
    $sth->bindParam(':email', $email, PDO::PARAM_STR);
    $sth->bindParam(':password', $password, PDO::PARAM_STR);
    $sth->bindParam(':role', $role, PDO::PARAM_STR);
    $sth->bindParam(':active', $active, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post user data
$app->post('/post/user/mobile', function (Request $request, Response $response, array $args){

    $data = $request->getParsedBody();

    $fname = $data["fname"];
    $lname = $data["lname"];
    $user_name = $data["user_name"];
    $email = $data["email"];
    $password = $data["password"];
    $role = $data["role"];
    $active = $data["active"];

    $sth = $this->db->prepare("INSERT INTO User (fname, lname, user_name, email, password, role, active) 
                                VALUES (:fname, :lname, :user_name, :email, :password, :role, :active)");

    $sth->bindParam(':fname', $fname, PDO::PARAM_STR);
    $sth->bindParam(':lname', $lname, PDO::PARAM_STR);
    $sth->bindParam(':user_name', $user_name, PDO::PARAM_STR);
    $sth->bindParam(':email', $email, PDO::PARAM_STR);
    $sth->bindParam(':password', $password, PDO::PARAM_STR);
    $sth->bindParam(':role', $role, PDO::PARAM_STR);
    $sth->bindParam(':active', $active, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put user data
$app->put('/put/user/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $fname = $data["fname"];
    $lname = $data["lname"];
    $user_name = $data["user_name"];
    $email = $data["email"];
    $role = $data["role"];
    $active = $data["active"];

    $sth = $this->db->prepare("UPDATE User SET fname = :fname,
                                               lname = :lname,
                                               user_name = :user_name,
                                               email = :email,
                                               role = :role,
                                               active = :active
                                               WHERE user_id=$id");

    $sth->bindParam(':fname', $fname, PDO::PARAM_STR);
    $sth->bindParam(':lname', $lname, PDO::PARAM_STR);
    $sth->bindParam(':user_name', $user_name, PDO::PARAM_STR);
    $sth->bindParam(':email', $email, PDO::PARAM_STR);
    $sth->bindParam(':role', $role, PDO::PARAM_STR);
    $sth->bindParam(':active', $active, PDO::PARAM_STR);
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});





/**
 * PARKING ROUTES
 */
// get all parking
$app->get('/parking/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Parking");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get parking data by parking id
$app->get('/get/parking/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Parking WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get parking data by establishment id
$app->get('/get/parking/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

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
$app->get('/get/park_id/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT park_id FROM Parking WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

});

// delete parking data by id
$app->delete('/delete/parking/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Parking WHERE park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete parking data by establishment id
$app->delete('/delete/parking/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Parking WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
// post parking data by est id
$app->post('/post/parking/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $lot_free = "";
    $street_metered = "";
    $parking_type = "";
    $total_num_spaces = 0;
    $num_reserved_spaces = 0;
    $num_accessable_space = 0;
    $num_van_accessible = 0;
    $reserve_space_sign = "";
    $reserve_space_obstacles = "";
    $comment = "No parking associated with this location. Do not remove this record.";
    $recommendations = "";
    $est_id = $args['id'];

    $sth = $this->db->prepare("INSERT INTO Parking (lot_free, street_metered, parking_type, total_num_spaces, num_reserved_spaces, num_accessable_space, num_van_accessible, reserve_space_sign, reserve_space_obstacles, comment, recommendations, est_id)
                                    VALUES (:lot_free, :street_metered, :parking_type, :total_num_spaces, :num_reserved_spaces, :num_accessable_space, :num_van_accessible, :reserve_space_sign, :reserve_space_obstacles, :comment, :recommendations, :est_id)");

    $sth->bindParam(':lot_free', $lot_free, PDO::PARAM_STR);
    $sth->bindParam(':street_metered', $street_metered, PDO::PARAM_STR);
    $sth->bindParam(':parking_type', $parking_type, PDO::PARAM_STR);
    $sth->bindParam(':total_num_spaces', $total_num_spaces, PDO::PARAM_INT);
    $sth->bindParam(':num_reserved_spaces', $num_reserved_spaces, PDO::PARAM_INT);
    $sth->bindParam(':num_accessable_space', $num_accessable_space, PDO::PARAM_INT);
    $sth->bindParam(':num_van_accessible', $num_van_accessible, PDO::PARAM_INT);
    $sth->bindParam(':reserve_space_sign', $reserve_space_sign, PDO::PARAM_STR);
    $sth->bindParam(':reserve_space_obstacles', $reserve_space_obstacles, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post parking data
$app->post('/post/parking/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

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
    $est_id = $data["est_id"];

    $sth = $this->db->prepare("INSERT INTO Parking (lot_free, street_metered, parking_type, total_num_spaces, num_reserved_spaces, num_accessable_space, num_van_accessible, reserve_space_sign, reserve_space_obstacles, comment, recommendations, est_id)
                                    VALUES (:lot_free, :street_metered, :parking_type, :total_num_spaces, :num_reserved_spaces, :num_accessable_space, :num_van_accessible, :reserve_space_sign, :reserve_space_obstacles, :comment, :recommendations, :est_id)");

    $sth->bindParam(':lot_free', $lot_free, PDO::PARAM_STR);
    $sth->bindParam(':street_metered', $street_metered, PDO::PARAM_STR);
    $sth->bindParam(':parking_type', $parking_type, PDO::PARAM_STR);
    $sth->bindParam(':total_num_spaces', $total_num_spaces, PDO::PARAM_INT);
    $sth->bindParam(':num_reserved_spaces', $num_reserved_spaces, PDO::PARAM_INT);
    $sth->bindParam(':num_accessable_space', $num_accessable_space, PDO::PARAM_INT);
    $sth->bindParam(':num_van_accessible', $num_van_accessible, PDO::PARAM_INT);
    $sth->bindParam(':reserve_space_sign', $reserve_space_sign, PDO::PARAM_STR);
    $sth->bindParam(':reserve_space_obstacles', $reserve_space_obstacles, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put parking data by est id
$app->put('/put/parking/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

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
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Route_From_Parking");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get route_from_parking data by route_from_parking id
$app->get('/get/route_from_parking/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Route_From_Parking WHERE route_park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get route_from_parking data by parking id
$app->get('/get/route_from_parking/park/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Route_From_Parking WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete route_from_parking data by id
$app->delete('/delete/route_from_parking/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Route_From_Parking WHERE route_park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete route_from_parking data by parking id
$app->delete('/delete/route_from_parking/park/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Route_From_Parking WHERE park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post route_from_parking data
$app->post('/post/route_from_parking/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}
    
    $data = $request->getParsedBody();

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
    $park_id = $data["park_id"];

    $sth = $this->db->prepare("INSERT INTO Route_From_Parking (distance, min_width, route_surface, route_curbs, tactile_warning, covered, lighting, lighting_option, lighting_type, comment, recommendations, park_id)
                                    VALUES (:distance, :min_width, :route_surface, :route_curbs, :tactile_warning, :covered, :lighting, :lighting_option, :lighting_type, :comment, :recommendations, :park_id)");

    $sth->bindParam(':distance', $distance, PDO::PARAM_STR);
    $sth->bindParam(':min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':route_surface', $route_surface, PDO::PARAM_STR);
    $sth->bindParam(':route_curbs', $route_curbs, PDO::PARAM_INT);
    $sth->bindParam(':tactile_warning', $tactile_warning, PDO::PARAM_INT);
    $sth->bindParam(':covered', $covered, PDO::PARAM_INT);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_INT);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':park_id', $park_id, PDO::PARAM_INT);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put route_from_parking data
$app->put('/put/route_from_parking/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Route_From_Parking );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put route_from_parking data by park id
$app->put('/put/route_from_parking/park/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

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
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Passenger_Loading");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get passenger_loading data by passenger_loading id
$app->get('/get/passenger_loading/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Passenger_Loading WHERE passenger_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get passenger_loading data by parking id
$app->get('/get/passenger_loading/park/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Passenger_Loading WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete passenger_loading data by id
$app->delete('/delete/passenger_loading/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Passenger_Loading WHERE passenger_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete passenger_loading data by parking id
$app->delete('/delete/passenger_loading/park/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Passenger_Loading WHERE park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post passenger_loading data
$app->post('/post/passenger_loading/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();
    
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
    $park_id = $data["park_id"];

    $sth = $this->db->prepare("INSERT INTO Passenger_Loading (designated_zone, distance, min_width, passenger_surface, tactile_warning_strips, covered, lighting, lighting_option, lighting_type, comment, recommendations, park_id)
                                    VALUES (:designated_zone, :distance, :min_width, :passenger_surface, :tactile_warning_strips, :covered, :lighting, :lighting_option, :lighting_type, :comment, :recommendations, :park_id)");

    $sth->bindParam(':designated_zone', $designated_zone, PDO::PARAM_STR);
    $sth->bindParam(':distance', $distance, PDO::PARAM_STR);
    $sth->bindParam(':min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':passenger_surface', $passenger_surface, PDO::PARAM_STR);
    $sth->bindParam(':tactile_warning_strips', $tactile_warning_strips, PDO::PARAM_STR);
    $sth->bindParam(':covered', $covered, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':park_id', $park_id, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put passenger_loading data
$app->put('/put/passenger_loading/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Passenger_Loading );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put passenger_loading data by park id
$app->put('/put/passenger_loading/park/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

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
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM STA_Bus");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get sta_bus data by sta_bus id
$app->get('/get/sta_bus/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM STA_Bus WHERE sta_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get sta_bus data by parking id
$app->get('/get/sta_bus/park/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM STA_Bus WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get sta_bus id by parking id
$app->get('/get/sta_bus_id/park/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT sta_id FROM STA_Bus WHERE park_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete sta_bus data by  id
$app->delete('/delete/sta_bus/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM STA_Bus WHERE sta_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete sta_bus data by parking id
$app->delete('/delete/sta_bus/park/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM STA_Bus WHERE park_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post sta_bus data
$app->post('/post/sta_bus/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

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
    $park_id = $data["park_id"];

    $sth = $this->db->prepare("INSERT INTO STA_Bus (sta_service_area, distance, min_width, route_surface, tactile_warning_strips, curb_cuts, lighting, lighting_option, lighting_type, shelter_bench, comment, recommendations, park_id)
                                  VALUES (:sta_service_area, :distance, :min_width, :route_surface, :tactile_warning_strips, :curb_cuts, :lighting, :lighting_option, :lighting_type, :shelter_bench, :comment, :recommendations, :park_id)");

    $sth->bindParam(':sta_service_area', $sta_service_area, PDO::PARAM_STR);
    $sth->bindParam(':distance', $distance, PDO::PARAM_STR);
    $sth->bindParam(':min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':route_surface', $route_surface, PDO::PARAM_INT);
    $sth->bindParam(':tactile_warning_strips', $tactile_warning_strips, PDO::PARAM_INT);
    $sth->bindParam(':curb_cuts', $curb_cuts, PDO::PARAM_INT);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_INT);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':shelter_bench', $shelter_bench, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':park_id', $park_id, PDO::PARAM_INT);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put sta_bus data
$app->put('/put/sta_bus/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO STA_Bus );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put sta_bus data by park id
$app->put('/put/sta_bus/park/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

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
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM STA_Route");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get all sta_route data id
$app->get('/get/sta_route/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM STA_Route WHERE sta_route_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get all sta_route data by sta_bus id
$app->get('/get/sta_route/sta_bus/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];

    $sth = $this->db->prepare("SELECT * FROM STA_Route WHERE sta_bus_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get single sta_route record by sta_route id and sta_bus id
$app->get('/get/sta_route/single/sta_bus/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();
    $sta_route_id = $data["sta_route_id"];

    $sth = $this->db->prepare("SELECT * FROM STA_Route WHERE sta_route_id=$sta_route_id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete sta_route data by id
$app->delete('/delete/sta_route/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM STA_Route WHERE sta_route_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete sta_route data by sta_bus id
$app->delete('/delete/sta_route/sta_bus/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM STA_Route WHERE sta_bus_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post sta_route data
$app->post('/post/sta_route/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $route_num = $data["route_num"];
    $north_bound_stop = $data["north_bound_stop"];
    $south_bound_stop = $data["south_bound_stop"];
    $east_bound_stop = $data["east_bound_stop"];
    $west_bound_stop = $data["west_bound_stop"];
    $sta_bus_id = $data["sta_bus_id"];

    $sth = $this->db->prepare("INSERT INTO STA_Route (route_num, north_bound_stop, south_bound_stop, east_bound_stop, west_bound_stop, sta_bus_id)
                                                     VALUES (:route_num, :north_bound_stop, :south_bound_stop, :east_bound_stop, :west_bound_stop, :sta_bus_id)");

    $sth->bindParam(':route_num', $route_num, PDO::PARAM_INT);
    $sth->bindParam(':north_bound_stop', $north_bound_stop, PDO::PARAM_INT);
    $sth->bindParam(':south_bound_stop', $south_bound_stop, PDO::PARAM_INT);
    $sth->bindParam(':east_bound_stop', $east_bound_stop, PDO::PARAM_INT);
    $sth->bindParam(':west_bound_stop', $west_bound_stop, PDO::PARAM_INT);
    $sth->bindParam(':sta_bus_id', $sta_bus_id, PDO::PARAM_INT);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put sta_route data
$app->put('/put/sta_route/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO STA_Route );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put sta_route data by sta_bus id
$app->put('/put/sta_route/sta_bus/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

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
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Exterior_Pathways");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_pathways data by id
$app->get('/get/exterior_pathways/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Pathways WHERE ext_path_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_pathways data by establishment id
$app->get('/get/exterior_pathways/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Pathways WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_pathways data by id
$app->delete('/delete/exterior_pathways/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Pathways WHERE exterior_pathways_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_pathways data by establishment id
$app->delete('/delete/exterior_pathways/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Pathways WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post exterior_pathways data
$app->post('/post/exterior_pathways/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $service_animal = $data["service_animal"];
    $service_animal_location = $data["service_animal_location"];
    $has_exterior_path = $data["has_exterior_path"];
    $min_width = $data["min_width"];
    $pathway_surface = $data["pathway_surface"];
    $pathway_curbs = $data["pathway_curbs"];
    $tactile_warning = $data["tactile_warning"];
    $slope = $data["slope"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data["est_id"];

    $sth = $this->db->prepare("INSERT INTO Exterior_Pathways (service_animal, service_animal_location, has_exterior_path, min_width, pathway_surface, pathway_curbs, tactile_warning, slope, lighting, lighting_option, lighting_type, comment, recommendations, est_id)
                                                     VALUES (:service_animal, :service_animal_location, :has_exterior_path, :min_width, :pathway_surface, :pathway_curbs, :tactile_warning, :slope, :lighting, :lighting_option, :lighting_type, :comment, :recommendations, :est_id)");

    $sth->bindParam(':service_animal', $service_animal, PDO::PARAM_STR);
    $sth->bindParam(':service_animal_location', $service_animal_location, PDO::PARAM_STR);
    $sth->bindParam(':has_exterior_path', $has_exterior_path, PDO::PARAM_STR);
    $sth->bindParam(':min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':pathway_surface', $pathway_surface, PDO::PARAM_STR);
    $sth->bindParam(':pathway_curbs', $pathway_curbs, PDO::PARAM_STR);
    $sth->bindParam(':tactile_warning', $tactile_warning, PDO::PARAM_STR);
    $sth->bindParam(':slope', $slope, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put exterior_pathways data by ext_path id and est id
$app->put('/put/exterior_pathways/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $ext_path_id = $data["ext_path_id"];
    $service_animal = $data["service_animal"];
    $service_animal_location = $data["service_animal_location"];
    $has_exterior_path = $data["has_exterior_path"];
    $min_width = $data["min_width"];
    $pathway_surface = $data["pathway_surface"];
    $pathway_curbs = $data["pathway_curbs"];
    $tactile_warning = $data["tactile_warning"];
    $slope = $data["slope"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Exterior_Pathways SET service_animal = :Service_animal,
                                                     service_animal_location = :Service_animal_location,
                                                     has_exterior_path = :Has_exterior_path,
                                                     min_width = :Min_width,
                                                     pathway_surface = :Pathway_surface,
                                                     pathway_curbs = :Pathway_curbs,
                                                     tactile_warning = :Tactile_warning,
                                                     slope = :Slope,
                                                     lighting = :Lighting,
                                                     lighting_option = :Lighting_option,
                                                     lighting_type = :Lighting_type,
                                                     comment = :Comment,
                                                     recommendations = :Recommendations
                                                     WHERE ext_path_id=$ext_path_id AND est_id=$id");

    $sth->bindParam(':Service_animal', $service_animal, PDO::PARAM_STR);
    $sth->bindParam(':Service_animal_location', $service_animal_location, PDO::PARAM_STR);
    $sth->bindParam(':Has_exterior_path', $has_exterior_path, PDO::PARAM_STR);
    $sth->bindParam(':Min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':Pathway_surface', $pathway_surface, PDO::PARAM_STR);
    $sth->bindParam(':Pathway_curbs', $pathway_curbs, PDO::PARAM_STR);
    $sth->bindParam(':Tactile_warning', $tactile_warning, PDO::PARAM_STR);
    $sth->bindParam(':Slope', $slope, PDO::PARAM_STR);
    $sth->bindParam(':Lighting', $lighting, PDO::PARAM_STR);
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
 * EXTERIOR STAIRS ROUTES
 */
// get all exterior_stairs
$app->get('/exterior_stairs/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Exterior_Stairs");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_stairs data by id
$app->get('/get/exterior_stairs/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Stairs WHERE ext_stair_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_stairs data by establishment id
$app->get('/get/exterior_stairs/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Stairs WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_stairs data by id
$app->delete('/delete/exterior_stairs/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Stairs WHERE ext_stair_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_stairs data by establishment id
$app->delete('/delete/exterior_stairs/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Stairs WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post exterior_stairs data
$app->post('/post/exterior_stairs/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $stairs_required = "No";
    $stairs_available =  "";
    $num_stairs =  0;
    $handrail_both_sides =  "";
    $handrail_side =  "";
    $handrail_regulation_height =  "";
    $handrail_height =  "";
    $obstacles =  "";
    $clearly_marked =  "";
    $lighting =  "";
    $lighting_option =  "";
    $lighting_type =  "";
    $comment = "Stairs not required for this location";
    $recommendations =  "";
    $est_id = $args['id'];

    $sth = $this->db->prepare("INSERT INTO Exterior_Stairs (stairs_required, stairs_available, num_stairs, handrail_both_sides, handrail_side, handrail_regulation_height, handrail_height, obstacles, clearly_marked, lighting, lighting_option, lighting_type, comment, recommendations, est_id)
                                  VALUES (:stairs_required, :stairs_available, :num_stairs, :handrail_both_sides, :handrail_side, :handrail_regulation_height, :handrail_height, :obstacles, :clearly_marked, :lighting, :lighting_option, :lighting_type, :comment, :recommendations, :est_id)");

    $sth->bindParam(':stairs_required', $stairs_required, PDO::PARAM_STR);
    $sth->bindParam(':stairs_available', $stairs_available, PDO::PARAM_STR);
    $sth->bindParam(':num_stairs', $num_stairs, PDO::PARAM_INT);
    $sth->bindParam(':handrail_both_sides', $handrail_both_sides, PDO::PARAM_STR);
    $sth->bindParam(':handrail_side', $handrail_side, PDO::PARAM_STR);
    $sth->bindParam(':handrail_regulation_height', $handrail_regulation_height, PDO::PARAM_STR);
    $sth->bindParam(':handrail_height', $handrail_height, PDO::PARAM_STR);
    $sth->bindParam(':obstacles', $obstacles, PDO::PARAM_STR);
    $sth->bindParam(':clearly_marked', $clearly_marked, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post exterior_stairs data
$app->post('/post/exterior_stairs/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $stairs_required = $data["stairs_required"];
    $stairs_available = $data["stairs_available"];
    $num_stairs = $data["num_stairs"];
    $handrail_both_sides = $data["handrail_both_sides"];
    $handrail_side = $data["handrail_side"];
    $handrail_regulation_height = $data["handrail_regulation_height"];
    $handrail_height = $data["handrail_height"];
    $obstacles = $data["obstacles"];
    $clearly_marked = $data["clearly_marked"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data['est_id'];

    $sth = $this->db->prepare("INSERT INTO Exterior_Stairs (stairs_required, stairs_available, num_stairs, handrail_both_sides, handrail_side, handrail_regulation_height, handrail_height, obstacles, clearly_marked, lighting, lighting_option, lighting_type, comment, recommendations, est_id)
                                     VALUES (:stairs_required, :stairs_available, :num_stairs, :handrail_both_sides, :handrail_side, :handrail_regulation_height, :handrail_height, :obstacles, :clearly_marked, :lighting, :lighting_option, :lighting_type, :comment, :recommendations, :est_id)");

    $sth->bindParam(':stairs_required', $stairs_required, PDO::PARAM_STR);
    $sth->bindParam(':stairs_available', $stairs_available, PDO::PARAM_STR);
    $sth->bindParam(':num_stairs', $num_stairs, PDO::PARAM_INT);
    $sth->bindParam(':handrail_both_sides', $handrail_both_sides, PDO::PARAM_STR);
    $sth->bindParam(':handrail_side', $handrail_side, PDO::PARAM_STR);
    $sth->bindParam(':handrail_regulation_height', $handrail_regulation_height, PDO::PARAM_STR);
    $sth->bindParam(':handrail_height', $handrail_height, PDO::PARAM_STR);
    $sth->bindParam(':obstacles', $obstacles, PDO::PARAM_STR);
    $sth->bindParam(':clearly_marked', $clearly_marked, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put exterior_stairs data
$app->put('/put/exterior_stairs/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Exterior_Stairs );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put exterior_stairs data by ext_stair id and est id
$app->put('/put/exterior_stairs/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $ext_stair_id = $data["ext_stair_id"];
    $stairs_required = $data["stairs_required"];
    $stairs_available = $data["stairs_available"];
    $num_stairs = $data["num_stairs"];
    $handrail_both_sides = $data["handrail_both_sides"];
    $handrail_side = $data["handrail_side"];
    $handrail_regulation_height = $data["handrail_regulation_height"];
    $handrail_height = $data["handrail_height"];
    $obstacles = $data["obstacles"];
    $clearly_marked = $data["clearly_marked"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Exterior_Stairs SET stairs_required = :Stairs_required,
                                                     stairs_available = :Stairs_available,
                                                     num_stairs = :Num_stairs,
                                                     handrail_both_sides = :Handrail_both_sides,
                                                     handrail_side = :Handrail_side,
                                                     handrail_regulation_height = :Handrail_regulation_height,
                                                     handrail_height = :Handrail_height,
                                                     obstacles = :Obstacles,
                                                     clearly_marked = :Clearly_marked,
                                                     lighting = :Lighting,
                                                     lighting_option = :Lighting_option,
                                                     lighting_type = :Lighting_type,
                                                     comment = :Comment,
                                                     recommendations = :Recommendations
                                                     WHERE ext_stair_id=$ext_stair_id AND est_id=$id");

    $sth->bindParam(':Stairs_required', $stairs_required, PDO::PARAM_STR);
    $sth->bindParam(':Stairs_available', $stairs_available, PDO::PARAM_STR);
    $sth->bindParam(':Num_stairs', $num_stairs, PDO::PARAM_INT);
    $sth->bindParam(':Handrail_both_sides', $handrail_both_sides, PDO::PARAM_STR);
    $sth->bindParam(':Handrail_side', $handrail_side, PDO::PARAM_STR);
    $sth->bindParam(':Handrail_regulation_height', $handrail_regulation_height, PDO::PARAM_STR);
    $sth->bindParam(':Handrail_height', $handrail_height, PDO::PARAM_STR);
    $sth->bindParam(':Obstacles', $obstacles, PDO::PARAM_STR);
    $sth->bindParam(':Clearly_marked', $clearly_marked, PDO::PARAM_STR);
    $sth->bindParam(':Lighting', $lighting, PDO::PARAM_STR);
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
 * EXTERIOR RAMPS ROUTES
 */
// get all exterior_ramps
$app->get('/exterior_ramps/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Exterior_Ramps");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_ramps data by id
$app->get('/get/exterior_ramps/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Ramps WHERE ext_ramp_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get exterior_ramps data by establishment id
$app->get('/get/exterior_ramps/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Exterior_Ramps WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_ramps data by id
$app->delete('/delete/exterior_ramps/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Ramps WHERE ext_ramp_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete exterior_ramps data by establishment id
$app->delete('/delete/exterior_ramps/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Exterior_Ramps WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post exterior_ramps data
$app->post('/post/exterior_ramps/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $ramp_required = "No";
    $ramp_available = "";
    $min_width = "";
    $width_between_handrails = "";
    $min_slope = "";
    $slope = "";
    $level_landing_both = "";
    $level_landing_location = "";
    $obstacles = "";
    $handrails_both_sides = "";
    $handrail_sides = "";
    $handrail_regulation_height = "";
    $handrail_height = "";
    $side_guards = "";
    $lighting = "";
    $lighting_option = "";
    $lighting_type = "";
    $comment = "";
    $recommendations = "Ramps not required for this location";
    $est_id = $args['id'];

    $sth = $this->db->prepare("INSERT INTO Exterior_Ramps (ramp_required, ramp_available, min_width, width_between_handrails, min_slope, slope, level_landing_both, level_landing_location, obstacles, handrails_both_sides, handrail_sides, handrail_regulation_height, handrail_height, side_guards, lighting, lighting_option, lighting_type, comment, recommendations, est_id) 
                                    VALUES (:ramp_required, :ramp_available, :min_width, :width_between_handrails, :min_slope, :slope, :level_landing_both, :level_landing_location, :obstacles, :handrails_both_sides, :handrail_sides, :handrail_regulation_height, :handrail_height, :side_guards, :lighting, :lighting_option, :lighting_type, :comment, :recommendations, :est_id)");

    $sth->bindParam(':ramp_required', $ramp_required, PDO::PARAM_STR);
    $sth->bindParam(':ramp_available', $ramp_available, PDO::PARAM_STR);
    $sth->bindParam(':min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':width_between_handrails', $width_between_handrails, PDO::PARAM_STR);
    $sth->bindParam(':min_slope', $min_slope, PDO::PARAM_STR);
    $sth->bindParam(':slope', $slope, PDO::PARAM_STR);
    $sth->bindParam(':level_landing_both', $level_landing_both, PDO::PARAM_STR);
    $sth->bindParam(':level_landing_location', $level_landing_location, PDO::PARAM_STR);
    $sth->bindParam(':obstacles', $obstacles, PDO::PARAM_STR);
    $sth->bindParam(':handrails_both_sides', $handrails_both_sides, PDO::PARAM_STR);
    $sth->bindParam(':handrail_sides', $handrail_sides, PDO::PARAM_STR);
    $sth->bindParam(':handrail_regulation_height', $handrail_regulation_height, PDO::PARAM_STR);
    $sth->bindParam(':handrail_height', $handrail_height, PDO::PARAM_STR);
    $sth->bindParam(':side_guards', $side_guards, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post exterior_ramps data
$app->post('/post/exterior_ramps/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $ramp_required = $data["ramp_required"];
    $ramp_available = $data["ramp_available"];
    $min_width = $data["min_width"];
    $width_between_handrails = $data["width_between_handrails"];
    $min_slope = $data["min_slope"];
    $slope = $data["slope"];
    $level_landing_both = $data["level_landing_both"];
    $level_landing_location = $data["level_landing_location"];
    $obstacles = $data["obstacles"];
    $handrails_both_sides = $data["handrails_both_sides"];
    $handrail_sides = $data["handrail_sides"];
    $handrail_regulation_height = $data["handrail_regulation_height"];
    $handrail_height = $data["handrail_height"];
    $side_guards = $data["side_guards"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data['est_id'];

    $sth = $this->db->prepare("INSERT INTO Exterior_Ramps (ramp_required, ramp_available, min_width, width_between_handrails, min_slope, slope, level_landing_both, level_landing_location, obstacles, handrails_both_sides, handrail_sides, handrail_regulation_height, handrail_height, side_guards, lighting, lighting_option, lighting_type, comment, recommendations, est_id) 
                                    VALUES (:ramp_required, :ramp_available, :min_width, :width_between_handrails, :min_slope, :slope, :level_landing_both, :level_landing_location, :obstacles, :handrails_both_sides, :handrail_sides, :handrail_regulation_height, :handrail_height, :side_guards, :lighting, :lighting_option, :lighting_type, :comment, :recommendations, :est_id)");

    $sth->bindParam(':ramp_required', $ramp_required, PDO::PARAM_STR);
    $sth->bindParam(':ramp_available', $ramp_available, PDO::PARAM_STR);
    $sth->bindParam(':min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':width_between_handrails', $width_between_handrails, PDO::PARAM_STR);
    $sth->bindParam(':min_slope', $min_slope, PDO::PARAM_STR);
    $sth->bindParam(':slope', $slope, PDO::PARAM_STR);
    $sth->bindParam(':level_landing_both', $level_landing_both, PDO::PARAM_STR);
    $sth->bindParam(':level_landing_location', $level_landing_location, PDO::PARAM_STR);
    $sth->bindParam(':obstacles', $obstacles, PDO::PARAM_STR);
    $sth->bindParam(':handrails_both_sides', $handrails_both_sides, PDO::PARAM_STR);
    $sth->bindParam(':handrail_sides', $handrail_sides, PDO::PARAM_STR);
    $sth->bindParam(':handrail_regulation_height', $handrail_regulation_height, PDO::PARAM_STR);
    $sth->bindParam(':handrail_height', $handrail_height, PDO::PARAM_STR);
    $sth->bindParam(':side_guards', $side_guards, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put exterior_ramps data
$app->put('/put/exterior_ramps/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Exterior_Ramps );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put exterior_ramps data by ext_ramp id and est id
$app->put('/put/exterior_ramps/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $ext_ramp_id = $data["ext_ramp_id"];
    $ramp_required = $data["ramp_required"];
    $ramp_available = $data["ramp_available"];
    $min_width = $data["min_width"];
    $width_between_handrails = $data["width_between_handrails"];
    $min_slope = $data["min_slope"];
    $slope = $data["slope"];
    $level_landing_both = $data["level_landing_both"];
    $level_landing_location = $data["level_landing_location"];
    $obstacles = $data["obstacles"];
    $handrails_both_sides = $data["handrails_both_sides"];
    $handrail_sides = $data["handrail_sides"];
    $handrail_regulation_height = $data["handrail_regulation_height"];
    $handrail_height = $data["handrail_height"];
    $side_guards = $data["side_guards"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Exterior_Ramps SET ramp_required = :Ramp_required,
                                                     ramp_available = :Ramp_available,
                                                     min_width = :Min_width,
                                                     width_between_handrails = :Width_between_handrails,
                                                     min_slope = :Min_slope,
                                                     slope = :Slope,
                                                     level_landing_both = :Level_landing_both,
                                                     level_landing_location = :Level_landing_location,
                                                     obstacles = :Obstacles,
                                                     handrails_both_sides = :Handrails_both_sides,
                                                     handrail_sides = :Handrail_sides,
                                                     handrail_regulation_height = :Handrail_regulation_height,
                                                     handrail_height = :Handrail_height,
                                                     side_guards = :Side_guards,
                                                     lighting = :Lighting,
                                                     lighting_option = :Lighting_option,
                                                     lighting_type = :Lighting_type,
                                                     comment = :Comment,
                                                     recommendations = :Recommendations
                                                     WHERE ext_ramp_id=$ext_ramp_id AND est_id=$id");

    $sth->bindParam(':Ramp_required', $ramp_required, PDO::PARAM_STR);
    $sth->bindParam(':Ramp_available', $ramp_available, PDO::PARAM_STR);
    $sth->bindParam(':Min_width', $min_width, PDO::PARAM_STR);
    $sth->bindParam(':Width_between_handrails', $width_between_handrails, PDO::PARAM_STR);
    $sth->bindParam(':Min_slope', $min_slope, PDO::PARAM_STR);
    $sth->bindParam(':Slope', $slope, PDO::PARAM_STR);
    $sth->bindParam(':Level_landing_both', $level_landing_both, PDO::PARAM_STR);
    $sth->bindParam(':Level_landing_location', $level_landing_location, PDO::PARAM_STR);
    $sth->bindParam(':Obstacles', $obstacles, PDO::PARAM_STR);
    $sth->bindParam(':Handrails_both_sides', $handrails_both_sides, PDO::PARAM_STR);
    $sth->bindParam(':Handrail_sides', $handrail_sides, PDO::PARAM_STR);
    $sth->bindParam(':Handrail_regulation_height', $handrail_regulation_height, PDO::PARAM_STR);
    $sth->bindParam(':Handrail_height', $handrail_height, PDO::PARAM_STR);
    $sth->bindParam(':Side_guards', $side_guards, PDO::PARAM_STR);
    $sth->bindParam(':Lighting', $lighting, PDO::PARAM_STR);
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
 * MAIN ENTRANCE ROUTES
 */
// get all main_entrance
$app->get('/main_entrance/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Main_Entrance");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get main_entrance data by id
$app->get('/get/main_entrance/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Main_Entrance WHERE main_ent_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get main_entrance data by establishment id
$app->get('/get/main_entrance/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Main_Entrance WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete main_entrance data by id
$app->delete('/delete/main_entrance/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Main_Entrance WHERE main_ent_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete main_entrance data by establishment id
$app->delete('/delete/main_entrance/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Main_Entrance WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post main_entrance data
$app->post('/post/main_entrance/', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $total_num_public_entrances = $data["total_num_public_entrances"];
    $main_ent_accessible = $data["main_ent_accessible"];
    $alt_ent_accessible = $data["alt_ent_accessible"];
    $accessable_signage = $data["accessable_signage"];
    $ground_level = $data["ground_level"];
    $threshold_level = $data["threshold_level"];
    $threshold_beveled = $data["threshold_beveled"];
    $beveled_height = $data["beveled_height"];
    $door_action = $data["door_action"];
    $door_open_clearance = $data["door_open_clearance"];
    $opening_measurement = $data["opening_measurement"];
    $door_easy_open = $data["door_easy_open"];
    $door_open_force = $data["door_open_force"];
    $door_use_with_fist = $data["door_use_with_fist"];
    $door_auto_open = $data["door_auto_open"];
    $second_door_inside = $data["second_door_inside"];
    $min_dist_between_doors = $data["min_dist_between_doors"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data["est_id"];

    $sth = $this->db->prepare("INSERT INTO Main_Entrance (total_num_public_entrances, main_ent_accessible, alt_ent_accessible, accessable_signage, ground_level, threshold_level, threshold_beveled, beveled_height, door_action, door_open_clearance, opening_measurement, door_easy_open, door_open_force, door_use_with_fist, door_auto_open, second_door_inside, min_dist_between_doors, lighting, lighting_option, lighting_type, comment, recommendations, est_id) 
                                VALUES (:total_num_public_entrances, :main_ent_accessible, :alt_ent_accessible, :accessable_signage, :ground_level, :threshold_level, :threshold_beveled, :beveled_height, :door_action, :door_open_clearance, :opening_measurement, :door_easy_open, :door_open_force, :door_use_with_fist, :door_auto_open, :second_door_inside, :min_dist_between_doors, :lighting, :lighting_option, :lighting_type, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':total_num_public_entrances', $total_num_public_entrances, PDO::PARAM_STR);
    $sth->bindParam(':main_ent_accessible', $main_ent_accessible, PDO::PARAM_STR);
    $sth->bindParam(':alt_ent_accessible', $alt_ent_accessible, PDO::PARAM_STR);
    $sth->bindParam(':accessable_signage', $accessable_signage, PDO::PARAM_STR);
    $sth->bindParam(':ground_level', $ground_level, PDO::PARAM_STR);
    $sth->bindParam(':threshold_level', $threshold_level, PDO::PARAM_STR);
    $sth->bindParam(':threshold_beveled', $threshold_beveled, PDO::PARAM_STR);
    $sth->bindParam(':beveled_height', $beveled_height, PDO::PARAM_STR);
    $sth->bindParam(':door_action', $door_action, PDO::PARAM_STR);
    $sth->bindParam(':door_open_clearance', $door_open_clearance, PDO::PARAM_STR);
    $sth->bindParam(':opening_measurement', $opening_measurement, PDO::PARAM_STR);
    $sth->bindParam(':door_easy_open', $door_easy_open, PDO::PARAM_STR);
    $sth->bindParam(':door_open_force', $door_open_force, PDO::PARAM_STR);
    $sth->bindParam(':door_use_with_fist', $door_use_with_fist, PDO::PARAM_STR);
    $sth->bindParam(':door_auto_open', $door_auto_open, PDO::PARAM_STR);
    $sth->bindParam(':second_door_inside', $second_door_inside, PDO::PARAM_STR);
    $sth->bindParam(':min_dist_between_doors', $min_dist_between_doors, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put main_entrance data
$app->put('/put/main_entrance/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Main_Entrance );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put main_entrance data by main_entrance id and est id
$app->put('/put/main_entrance/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $main_ent_id = $data["main_ent_id"];
    $total_num_public_entrances = $data["total_num_public_entrances"];
    $main_ent_accessible = $data["main_ent_accessible"];
    $alt_ent_accessible = $data["alt_ent_accessible"];
    $accessable_signage = $data["accessable_signage"];
    $ground_level = $data["ground_level"];
    $threshold_level = $data["threshold_level"];
    $threshold_beveled = $data["threshold_beveled"];
    $beveled_height = $data["beveled_height"];
    $door_action = $data["door_action"];
    $door_open_clearance = $data["door_open_clearance"];
    $opening_measurement = $data["opening_measurement"];
    $door_easy_open = $data["door_easy_open"];
    $door_open_force = $data["door_open_force"];
    $door_use_with_fist = $data["door_use_with_fist"];
    $door_auto_open = $data["door_auto_open"];
    $second_door_inside = $data["second_door_inside"];
    $min_dist_between_doors = $data["min_dist_between_doors"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Main_Entrance SET total_num_public_entrances = :total_num_public_entrances,
                                                     main_ent_accessible = :main_ent_accessible,
                                                     alt_ent_accessible = :alt_ent_accessible,
                                                     accessable_signage = :accessable_signage,
                                                     ground_level = :ground_level,
                                                     threshold_level = :threshold_level,
                                                     threshold_beveled = :threshold_beveled,
                                                     beveled_height = :beveled_height,
                                                     door_action = :door_action,
                                                     door_open_clearance = :door_open_clearance,
                                                     opening_measurement = :opening_measurement,
                                                     door_easy_open = :door_easy_open,
                                                     door_open_force = :door_open_force,
                                                     door_use_with_fist = :door_use_with_fist,
                                                     door_auto_open = :door_auto_open,
                                                     second_door_inside = :second_door_inside,
                                                     min_dist_between_doors = :min_dist_between_doors,
                                                     lighting = :lighting,
                                                     lighting_option = :lighting_option,
                                                     lighting_type = :lighting_type,
                                                     comment = :comment,
                                                     recommendations = :recommendations
                                                     WHERE main_ent_id=$main_ent_id AND est_id=$id");

    $sth->bindParam(':total_num_public_entrances', $total_num_public_entrances, PDO::PARAM_STR);
    $sth->bindParam(':main_ent_accessible', $main_ent_accessible, PDO::PARAM_STR);
    $sth->bindParam(':alt_ent_accessible', $alt_ent_accessible, PDO::PARAM_STR);
    $sth->bindParam(':accessable_signage', $accessable_signage, PDO::PARAM_STR);
    $sth->bindParam(':ground_level', $ground_level, PDO::PARAM_STR);
    $sth->bindParam(':threshold_level', $threshold_level, PDO::PARAM_STR);
    $sth->bindParam(':threshold_beveled', $threshold_beveled, PDO::PARAM_STR);
    $sth->bindParam(':beveled_height', $beveled_height, PDO::PARAM_STR);
    $sth->bindParam(':door_action', $door_action, PDO::PARAM_STR);
    $sth->bindParam(':door_open_clearance', $door_open_clearance, PDO::PARAM_STR);
    $sth->bindParam(':opening_measurement', $opening_measurement, PDO::PARAM_STR);
    $sth->bindParam(':door_easy_open', $door_easy_open, PDO::PARAM_STR);
    $sth->bindParam(':door_open_force', $door_open_force, PDO::PARAM_STR);
    $sth->bindParam(':door_use_with_fist', $door_use_with_fist, PDO::PARAM_STR);
    $sth->bindParam(':door_auto_open', $door_auto_open, PDO::PARAM_STR);
    $sth->bindParam(':second_door_inside', $second_door_inside, PDO::PARAM_STR);
    $sth->bindParam(':min_dist_between_doors', $min_dist_between_doors, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * INTERIOR ROUTES
 */
// get all interior
$app->get('/interior/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Interior");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get interior data by id
$app->get('/get/interior/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Interior WHERE interior_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get interior data by establishment id
$app->get('/get/interior/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Interior WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete interior data by id
$app->delete('/delete/interior/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Interior WHERE interior_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete interior data by establishment id
$app->delete('/delete/interior/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Interior WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post interior data
$app->post('/post/interior/', function (Request $request, Response $response, array $args){ 
//// Initialize the session
//    session_start();
//
//    // If session variable is not set it will redirect to login page
//    if(!isset($_SESSION['role']) || empty($_SESSION['role'])){
//        return $response->withRedirect($this->router->pathFor('root'));
//    }

    $data = $request->getParsedBody();

    $int_door_open_clearance = $data["int_door_open_clearance"];
    $int_opening_measurement = $data["int_opening_measurement"];
    $int_door_easy_open = $data["int_door_easy_open"];
    $int_door_open_force = $data["int_door_open_force"];
    $int_door_use_with_fist = $data["int_door_use_with_fist"];
    $five_second_close = $data["five_second_close"];
    $hallway_width = $data["hallway_width"];
    $narrowest_width = $data["narrowest_width"];
    $wheelchair_turnaround = $data["wheelchair_turnaround"];
    $hallway_obstacles = $data["hallway_obstacles"];
    $hallway_clear = $data["hallway_clear"];
    $lighting = $data["lighting"];
    $lighting_type = $data["lighting_type"];
    $service_counter = $data["service_counter"];
    $counter_height = $data["counter_height"];
    $writing_surface_height = $data["writing_surface_height"];
    $drinking_fountain = $data["drinking_fountain"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data['est_id'];

    $sth = $this->db->prepare("INSERT INTO Interior (int_door_open_clearance, int_opening_measurement, int_door_easy_open, int_door_open_force, int_door_use_with_fist, five_second_close, hallway_width, narrowest_width, wheelchair_turnaround, hallway_obstacles, hallway_clear, lighting, lighting_type, service_counter, counter_height, writing_surface_height, drinking_fountain, comment, recommendations, est_id)
                                    VALUES (:int_door_open_clearance, :int_opening_measurement, :int_door_easy_open, :int_door_open_force, :int_door_use_with_fist, :five_second_close, :hallway_width, :narrowest_width, :wheelchair_turnaround, :hallway_obstacles, :hallway_clear, :lighting, :lighting_type, :service_counter, :counter_height, :writing_surface_height, :drinking_fountain, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':int_door_open_clearance', $int_door_open_clearance, PDO::PARAM_STR);
    $sth->bindParam(':int_opening_measurement', $int_opening_measurement, PDO::PARAM_STR);
    $sth->bindParam(':int_door_easy_open', $int_door_easy_open, PDO::PARAM_STR);
    $sth->bindParam(':int_door_open_force', $int_door_open_force, PDO::PARAM_STR);
    $sth->bindParam(':int_door_use_with_fist', $int_door_use_with_fist, PDO::PARAM_STR);
    $sth->bindParam(':five_second_close', $five_second_close, PDO::PARAM_STR);
    $sth->bindParam(':hallway_width', $hallway_width, PDO::PARAM_STR);
    $sth->bindParam(':narrowest_width', $narrowest_width, PDO::PARAM_STR);
    $sth->bindParam(':wheelchair_turnaround', $wheelchair_turnaround, PDO::PARAM_STR);
    $sth->bindParam(':hallway_obstacles', $hallway_obstacles, PDO::PARAM_STR);
    $sth->bindParam(':hallway_clear', $hallway_clear, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':service_counter', $service_counter, PDO::PARAM_STR);
    $sth->bindParam(':counter_height', $counter_height, PDO::PARAM_STR);
    $sth->bindParam(':writing_surface_height', $writing_surface_height, PDO::PARAM_STR);
    $sth->bindParam(':drinking_fountain', $drinking_fountain, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_STR);

    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put interior data
$app->put('/put/interior/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Interior );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put interior data by interior id and est id
$app->put('/put/interior/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $interior_id = $data["interior_id"];
    $int_door_open_clearance = $data["int_door_open_clearance"];
    $int_opening_measurement = $data["int_opening_measurement"];
    $int_door_easy_open = $data["int_door_easy_open"];
    $int_door_open_force = $data["int_door_open_force"];
    $int_door_use_with_fist = $data["int_door_use_with_fist"];
    $five_second_close = $data["five_second_close"];
    $hallway_width = $data["hallway_width"];
    $narrowest_width = $data["narrowest_width"];
    $wheelchair_turnaround = $data["wheelchair_turnaround"];
    $hallway_obstacles = $data["hallway_obstacles"];
    $hallway_clear = $data["hallway_clear"];
    $lighting = $data["lighting"];
    $lighting_type = $data["lighting_type"];
    $service_counter = $data["service_counter"];
    $counter_height = $data["counter_height"];
    $writing_surface_height = $data["writing_surface_height"];
    $drinking_fountain = $data["drinking_fountain"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Interior SET int_door_open_clearance = :int_door_open_clearance,
                                                     int_opening_measurement = :int_opening_measurement,
                                                     int_door_easy_open = :int_door_easy_open,
                                                     int_door_open_force = :int_door_open_force,
                                                     int_door_use_with_fist = :int_door_use_with_fist,
                                                     five_second_close = :five_second_close,
                                                     hallway_width = :hallway_width,
                                                     narrowest_width = :narrowest_width,
                                                     wheelchair_turnaround = :wheelchair_turnaround,
                                                     hallway_obstacles = :hallway_obstacles,
                                                     hallway_clear = :hallway_clear,
                                                     lighting = :lighting,
                                                     lighting_type = :lighting_type,
                                                     service_counter = :service_counter,
                                                     counter_height = :counter_height,
                                                     writing_surface_height = :writing_surface_height,
                                                     drinking_fountain = :drinking_fountain,
                                                     comment = :comment,
                                                     recommendations = :recommendations
                                                     WHERE interior_id=$interior_id AND est_id=$id");

    $sth->bindParam(':int_door_open_clearance', $int_door_open_clearance, PDO::PARAM_STR);
    $sth->bindParam(':int_opening_measurement', $int_opening_measurement, PDO::PARAM_STR);
    $sth->bindParam(':int_door_easy_open', $int_door_easy_open, PDO::PARAM_STR);
    $sth->bindParam(':int_door_open_force', $int_door_open_force, PDO::PARAM_STR);
    $sth->bindParam(':int_door_use_with_fist', $int_door_use_with_fist, PDO::PARAM_STR);
    $sth->bindParam(':five_second_close', $five_second_close, PDO::PARAM_STR);
    $sth->bindParam(':hallway_width', $hallway_width, PDO::PARAM_STR);
    $sth->bindParam(':narrowest_width', $narrowest_width, PDO::PARAM_STR);
    $sth->bindParam(':wheelchair_turnaround', $wheelchair_turnaround, PDO::PARAM_STR);
    $sth->bindParam(':hallway_obstacles', $hallway_obstacles, PDO::PARAM_STR);
    $sth->bindParam(':hallway_clear', $hallway_clear, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':service_counter', $service_counter, PDO::PARAM_STR);
    $sth->bindParam(':counter_height', $counter_height, PDO::PARAM_STR);
    $sth->bindParam(':writing_surface_height', $writing_surface_height, PDO::PARAM_STR);
    $sth->bindParam(':drinking_fountain', $drinking_fountain, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * ELEVATOR ROUTES
 */
// get all elevator
$app->get('/elevator/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Elevator");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get elevator data by id
$app->get('/get/elevator/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Elevator WHERE elevator_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get elevator data by establishment id
$app->get('/get/elevator/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Elevator WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete elevator data by id
$app->delete('/delete/elevator/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Elevator WHERE elevator_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete elevator data by establishment id
$app->delete('/delete/elevator/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Elevator WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post elevator data
$app->post('/post/elevator/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}


    $is_elevator = "";
    $location = "";
    $works = "";
    $no_assist = "";
    $button_height = "";
    $outside_btn_height = "";
    $inside_btn_height = "";
    $button_use_fist = "";
    $braille = "";
    $audible_tones = "";
    $lighting = "";
    $lighting_type = "";
    $elevator_depth = "";
    $comment = "No elevators at this location.";
    $recommendations = "";
    $est_id = $args["id"];

    $sth = $this->db->prepare("INSERT INTO Elevator (is_elevator, location, works, no_assist, button_height, outside_btn_height, inside_btn_height, button_use_fist, braille, audible_tones, lighting, lighting_type, elevator_depth, comment, recommendations, est_id) 
                                  VALUES (:is_elevator, :location, :works, :no_assist, :button_height, :outside_btn_height, :inside_btn_height, :button_use_fist, :braille, :audible_tones, :lighting, :lighting_type, :elevator_depth, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':is_elevator', $is_elevator, PDO::PARAM_STR);
    $sth->bindParam(':location', $location, PDO::PARAM_STR);
    $sth->bindParam(':works', $works, PDO::PARAM_STR);
    $sth->bindParam(':no_assist', $no_assist, PDO::PARAM_STR);
    $sth->bindParam(':button_height', $button_height, PDO::PARAM_STR);
    $sth->bindParam(':outside_btn_height', $outside_btn_height, PDO::PARAM_STR);
    $sth->bindParam(':inside_btn_height', $inside_btn_height, PDO::PARAM_STR);
    $sth->bindParam(':button_use_fist', $button_use_fist, PDO::PARAM_STR);
    $sth->bindParam(':braille', $braille, PDO::PARAM_STR);
    $sth->bindParam(':audible_tones', $audible_tones, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':elevator_depth', $elevator_depth, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post elevator data
$app->post('/post/elevator/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $is_elevator = $data["is_elevator"];
    $location = $data["location"];
    $works = $data["works"];
    $no_assist = $data["no_assist"];
    $button_height = $data["button_height"];
    $outside_btn_height = $data["outside_btn_height"];
    $inside_btn_height = $data["inside_btn_height"];
    $button_use_fist = $data["button_use_fist"];
    $braille = $data["braille"];
    $audible_tones = $data["audible_tones"];
    $lighting = $data["lighting"];
    $lighting_type = $data["lighting_type"];
    $elevator_depth = $data["elevator_depth"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data["est_id"];

    $sth = $this->db->prepare("INSERT INTO Elevator (is_elevator, location, works, no_assist, button_height, outside_btn_height, inside_btn_height, button_use_fist, braille, audible_tones, lighting, lighting_type, elevator_depth, comment, recommendations, est_id) 
                                  VALUES (:is_elevator, :location, :works, :no_assist, :button_height, :outside_btn_height, :inside_btn_height, :button_use_fist, :braille, :audible_tones, :lighting, :lighting_type, :elevator_depth, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':is_elevator', $is_elevator, PDO::PARAM_STR);
    $sth->bindParam(':location', $location, PDO::PARAM_STR);
    $sth->bindParam(':works', $works, PDO::PARAM_STR);
    $sth->bindParam(':no_assist', $no_assist, PDO::PARAM_STR);
    $sth->bindParam(':button_height', $button_height, PDO::PARAM_STR);
    $sth->bindParam(':outside_btn_height', $outside_btn_height, PDO::PARAM_STR);
    $sth->bindParam(':inside_btn_height', $inside_btn_height, PDO::PARAM_STR);
    $sth->bindParam(':button_use_fist', $button_use_fist, PDO::PARAM_STR);
    $sth->bindParam(':braille', $braille, PDO::PARAM_STR);
    $sth->bindParam(':audible_tones', $audible_tones, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':elevator_depth', $elevator_depth, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put elevator data
$app->put('/put/elevator/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Elevator );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put elevator data by elevator id and est id
$app->put('/put/elevator/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $elevator_id = $data["elevator_id"];
    $is_elevator = $data["is_elevator"];
    $location = $data["location"];
    $works = $data["works"];
    $no_assist = $data["no_assist"];
    $button_height = $data["button_height"];
    $outside_btn_height = $data["outside_btn_height"];
    $inside_btn_height = $data["inside_btn_height"];
    $button_use_fist = $data["button_use_fist"];
    $braille = $data["braille"];
    $audible_tones = $data["audible_tones"];
    $lighting = $data["lighting"];
    $lighting_type = $data["lighting_type"];
    $elevator_depth = $data["elevator_depth"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Elevator SET is_elevator = :is_elevator,
                                                     location = :location,
                                                     works = :works,
                                                     no_assist = :no_assist,
                                                     button_height = :button_height,
                                                     outside_btn_height = :outside_btn_height,
                                                     inside_btn_height = :inside_btn_height,
                                                     button_use_fist = :button_use_fist,
                                                     braille = :braille,
                                                     audible_tones = :audible_tones,
                                                     lighting = :lighting,
                                                     lighting_type = :lighting_type,
                                                     elevator_depth = :elevator_depth,
                                                     comment = :comment,
                                                     recommendations = :recommendations
                                                     WHERE elevator_id=$elevator_id AND est_id=$id");

    $sth->bindParam(':is_elevator', $is_elevator, PDO::PARAM_STR);
    $sth->bindParam(':location', $location, PDO::PARAM_STR);
    $sth->bindParam(':works', $works, PDO::PARAM_STR);
    $sth->bindParam(':no_assist', $no_assist, PDO::PARAM_STR);
    $sth->bindParam(':button_height', $button_height, PDO::PARAM_STR);
    $sth->bindParam(':outside_btn_height', $outside_btn_height, PDO::PARAM_STR);
    $sth->bindParam(':inside_btn_height', $inside_btn_height, PDO::PARAM_STR);
    $sth->bindParam(':button_use_fist', $button_use_fist, PDO::PARAM_STR);
    $sth->bindParam(':braille', $braille, PDO::PARAM_STR);
    $sth->bindParam(':audible_tones', $audible_tones, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':elevator_depth', $elevator_depth, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * SIGNAGE ROUTES
 */
// get all signage
$app->get('/signage/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Signage");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get signage data by id
$app->get('/get/signage/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Signage WHERE sign_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get signage data by establishment id
$app->get('/get/signage/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Signage WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete signage data by id
$app->delete('/delete/signage/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Signage WHERE sign_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete signage data by establishment id
$app->delete('/delete/signage/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Signage WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post signage data
$app->post('/post/signage/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $is_directory = $data["is_directory"];
    $door_signs = $data["door_signs"];
    $sign_height = $data["sign_height"];
    $pub_sign_braile = $data["pub_sign_braile"];
    $sign_high_contrast = $data["sign_high_contrast"];
    $sign_images = $data["sign_images"];
    $written_material_images = $data["written_material_images"];
    $menu_access = $data["menu_access"];
    $alt_info = $data["alt_info"];
    $alt_info_type = $data["alt_info_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data["est_id"];

    $sth = $this->db->prepare("INSERT INTO Signage (is_directory, door_signs, sign_height, pub_sign_braile, sign_high_contrast, sign_images, written_material_images, menu_access, alt_info, alt_info_type, comment, recommendations, est_id) 
                                   VALUES (:is_directory, :door_signs, :sign_height, :pub_sign_braile, :sign_high_contrast, :sign_images, :written_material_images, :menu_access, :alt_info, :alt_info_type, :comment, :recommendations, :est_id)");

    $sth->bindParam(':is_directory', $is_directory, PDO::PARAM_STR);
    $sth->bindParam(':door_signs', $door_signs, PDO::PARAM_STR);
    $sth->bindParam(':sign_height', $sign_height, PDO::PARAM_STR);
    $sth->bindParam(':pub_sign_braile', $pub_sign_braile, PDO::PARAM_STR);
    $sth->bindParam(':sign_high_contrast', $sign_high_contrast, PDO::PARAM_STR);
    $sth->bindParam(':sign_images', $sign_images, PDO::PARAM_STR);
    $sth->bindParam(':written_material_images', $written_material_images, PDO::PARAM_STR);
    $sth->bindParam(':menu_access', $menu_access, PDO::PARAM_STR);
    $sth->bindParam(':alt_info', $alt_info, PDO::PARAM_STR);
    $sth->bindParam(':alt_info_type', $alt_info_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);
    
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put signage data
$app->put('/put/signage/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Signage );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put signage data by signage id and est id
$app->put('/put/signage/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $sign_id = $data["sign_id"];
    $is_directory = $data["is_directory"];
    $door_signs = $data["door_signs"];
    $sign_height = $data["sign_height"];
    $pub_sign_braile = $data["pub_sign_braile"];
    $sign_high_contrast = $data["sign_high_contrast"];
    $sign_images = $data["sign_images"];
    $written_material_images = $data["written_material_images"];
    $menu_access = $data["menu_access"];
    $alt_info = $data["alt_info"];
    $alt_info_type = $data["alt_info_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Signage SET is_directory = :is_directory,
                                                     door_signs = :door_signs,
                                                     sign_height = :sign_height,
                                                     pub_sign_braile = :pub_sign_braile,
                                                     sign_high_contrast = :sign_high_contrast,
                                                     sign_images = :sign_images,
                                                     written_material_images = :written_material_images,
                                                     menu_access = :menu_access,
                                                     alt_info = :alt_info,
                                                     alt_info_type = :alt_info_type,
                                                     comment = :comment,
                                                     recommendations = :recommendations
                                                     WHERE sign_id=$sign_id AND est_id=$id");

    $sth->bindParam(':is_directory', $is_directory, PDO::PARAM_STR);
    $sth->bindParam(':door_signs', $door_signs, PDO::PARAM_STR);
    $sth->bindParam(':sign_height', $sign_height, PDO::PARAM_STR);
    $sth->bindParam(':pub_sign_braile', $pub_sign_braile, PDO::PARAM_STR);
    $sth->bindParam(':sign_high_contrast', $sign_high_contrast, PDO::PARAM_STR);
    $sth->bindParam(':sign_images', $sign_images, PDO::PARAM_STR);
    $sth->bindParam(':written_material_images', $written_material_images, PDO::PARAM_STR);
    $sth->bindParam(':menu_access', $menu_access, PDO::PARAM_STR);
    $sth->bindParam(':alt_info', $alt_info, PDO::PARAM_STR);
    $sth->bindParam(':alt_info_type', $alt_info_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * EMERGENCY ROUTES
 */
// get all emergency
$app->get('/emergency/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Emergency");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get emergency data by id
$app->get('/get/emergency/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Emergency WHERE emergency_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get emergency data by establishment id
$app->get('/get/emergency/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Emergency WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete emergency data by id
$app->delete('/delete/emergency/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Emergency WHERE emergency_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete emergency data by establishment id
$app->delete('/delete/emergency/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Emergency WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post emergency data
$app->post('/post/emergency/', function (Request $request, Response $response, array $args){ 
//// Initialize the session
//    session_start();
//
//    // If session variable is not set it will redirect to login page
//    if(!isset($_SESSION['role']) || empty($_SESSION['role'])){
//        return $response->withRedirect($this->router->pathFor('root'));
//    }

    $data = $request->getParsedBody();

    $evac_info = $data["evac_info"];
    $alt_evac_info = $data["alt_evac_info"];
    $evac_info_format = $data["evac_info_format"];
    $alarms = $data["alarms"];
    $location_no_flash = $data["location_no_flash"];
    $shelter = $data["shelter"];
    $signs_to_exit = $data["signs_to_exit"];
    $wheelchair_plan = $data["wheelchair_plan"];
    $floor_plan_routes = $data["floor_plan_routes"];
    $fire_alarm_height = $data["fire_alarm_height"];
    $fire_extinguisher_height = $data["fire_extinguisher_height"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data['est_id'];

    $sth = $this->db->prepare("INSERT INTO Emergency (evac_info, alt_evac_info, evac_info_format, alarms, location_no_flash, shelter, signs_to_exit, wheelchair_plan, floor_plan_routes, fire_alarm_height, fire_extinguisher_height, comment, recommendations, est_id) 
                                  VALUES (:evac_info, :alt_evac_info, :evac_info_format, :alarms, :location_no_flash, :shelter, :signs_to_exit, :wheelchair_plan, :floor_plan_routes, :fire_alarm_height, :fire_extinguisher_height, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':evac_info', $evac_info, PDO::PARAM_STR);
    $sth->bindParam(':alt_evac_info', $alt_evac_info, PDO::PARAM_STR);
    $sth->bindParam(':evac_info_format', $evac_info_format, PDO::PARAM_STR);
    $sth->bindParam(':alarms', $alarms, PDO::PARAM_STR);
    $sth->bindParam(':location_no_flash', $location_no_flash, PDO::PARAM_STR);
    $sth->bindParam(':shelter', $shelter, PDO::PARAM_STR);
    $sth->bindParam(':signs_to_exit', $signs_to_exit, PDO::PARAM_STR);
    $sth->bindParam(':wheelchair_plan', $wheelchair_plan, PDO::PARAM_STR);
    $sth->bindParam(':floor_plan_routes', $floor_plan_routes, PDO::PARAM_STR);
    $sth->bindParam(':fire_alarm_height', $fire_alarm_height, PDO::PARAM_STR);
    $sth->bindParam(':fire_extinguisher_height', $fire_extinguisher_height, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put emergency data
$app->put('/put/emergency/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    
//    $sth = $this->db->prepare("UPDATE Emergency SET evac_info = :evac_info, WHERE ");
//
//    $sth->execute();
    
    
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put emergency data by emergency id and est id
$app->put('/put/emergency/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $emergency_id = $data["emergency_id"];
    $evac_info = $data["evac_info"];
    $alt_evac_info = $data["alt_evac_info"];
    $evac_info_format = $data["evac_info_format"];
    $alarms = $data["alarms"];
    $location_no_flash = $data["location_no_flash"];
    $shelter = $data["shelter"];
    $signs_to_exit = $data["signs_to_exit"];
    $wheelchair_plan = $data["wheelchair_plan"];
    $floor_plan_routes = $data["floor_plan_routes"];
    $fire_alarm_height = $data["fire_alarm_height"];
    $fire_extinguisher_height = $data["fire_extinguisher_height"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Emergency SET evac_info = :evac_info,
                                                     alt_evac_info = :alt_evac_info,
                                                     evac_info_format = :evac_info_format,
                                                     alarms = :alarms,
                                                     location_no_flash = :location_no_flash,
                                                     shelter = :shelter,
                                                     signs_to_exit = :signs_to_exit,
                                                     wheelchair_plan = :wheelchair_plan,
                                                     floor_plan_routes = :floor_plan_routes,
                                                     fire_alarm_height = :fire_alarm_height,
                                                     fire_extinguisher_height = :fire_extinguisher_height,
                                                     comment = :comment,
                                                     recommendations = :recommendations
                                                     WHERE emergency_id=$emergency_id AND est_id=$id");

    $sth->bindParam(':evac_info', $evac_info, PDO::PARAM_STR);
    $sth->bindParam(':alt_evac_info', $alt_evac_info, PDO::PARAM_STR);
    $sth->bindParam(':evac_info_format', $evac_info_format, PDO::PARAM_STR);
    $sth->bindParam(':alarms', $alarms, PDO::PARAM_STR);
    $sth->bindParam(':location_no_flash', $location_no_flash, PDO::PARAM_STR);
    $sth->bindParam(':shelter', $shelter, PDO::PARAM_STR);
    $sth->bindParam(':signs_to_exit', $signs_to_exit, PDO::PARAM_STR);
    $sth->bindParam(':wheelchair_plan', $wheelchair_plan, PDO::PARAM_STR);
    $sth->bindParam(':floor_plan_routes', $floor_plan_routes, PDO::PARAM_STR);
    $sth->bindParam(':fire_alarm_height', $fire_alarm_height, PDO::PARAM_STR);
    $sth->bindParam(':fire_extinguisher_height', $fire_extinguisher_height, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * SEATING ROUTES
 */
// get all seating
$app->get('/seating/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Seating");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get seating data by id
$app->get('/get/seating/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Seating WHERE seating_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get seating data by establishment id
$app->get('/get/seating/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Seating WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete seating data by id
$app->delete('/delete/seating/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Seating WHERE seating_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete seating data by establishment id
$app->delete('/delete/seating/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Seating WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post seating data
$app->post('/post/seating/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $seating_no_step = $data["seating_no_step"];
    $table_aisles = $data["table_aisles"];
    $legroom = $data["legroom"];
    $num_legroom = $data["num_legroom"];
    $rearranged = $data["rearranged"];
    $num_table_rearranged = $data["num_table_rearranged"];
    $num_chair_rearranged = $data["num_chair_rearranged"];
    $round_tables = $data["round_tables"];
    $num_round_tables = $data["num_round_tables"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $adjustable_lighting = $data["adjustable_lighting"];
    $low_visual_slim = $data["low_visual_slim"];
    $quiet_table = $data["quiet_table"];
    $low_sound = $data["low_sound"];
    $designated_space = $data["designated_space"];
    $num_desig_space = $data["num_desig_space"];
    $companion_space = $data["companion_space"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data['est_id'];

    $sth = $this->db->prepare("INSERT INTO Seating (seating_no_step, table_aisles, legroom, num_legroom, rearranged, num_table_rearranged, num_chair_rearranged, round_tables, num_round_tables, lighting, lighting_option, lighting_type, adjustable_lighting, low_visual_slim, quiet_table, low_sound, designated_space, num_desig_space, companion_space, comment, recommendations, est_id) 
                                    VALUES (:seating_no_step, :table_aisles, :legroom, :num_legroom, :rearranged, :num_table_rearranged, :num_chair_rearranged, :round_tables, :num_round_tables, :lighting, :lighting_option, :lighting_type, :adjustable_lighting, :low_visual_slim, :quiet_table, :low_sound, :designated_space, :num_desig_space, :companion_space, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':seating_no_step', $seating_no_step, PDO::PARAM_STR);
    $sth->bindParam(':table_aisles', $table_aisles, PDO::PARAM_STR);
    $sth->bindParam(':legroom', $legroom, PDO::PARAM_STR);
    $sth->bindParam(':num_legroom', $num_legroom, PDO::PARAM_STR);
    $sth->bindParam(':rearranged', $rearranged, PDO::PARAM_STR);
    $sth->bindParam(':num_table_rearranged', $num_table_rearranged, PDO::PARAM_STR);
    $sth->bindParam(':num_chair_rearranged', $num_chair_rearranged, PDO::PARAM_STR);
    $sth->bindParam(':round_tables', $round_tables, PDO::PARAM_STR);
    $sth->bindParam(':num_round_tables', $num_round_tables, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':adjustable_lighting', $adjustable_lighting, PDO::PARAM_STR);
    $sth->bindParam(':low_visual_slim', $low_visual_slim, PDO::PARAM_STR);
    $sth->bindParam(':quiet_table', $quiet_table, PDO::PARAM_STR);
    $sth->bindParam(':low_sound', $low_sound, PDO::PARAM_STR);
    $sth->bindParam(':designated_space', $designated_space, PDO::PARAM_STR);
    $sth->bindParam(':num_desig_space', $num_desig_space, PDO::PARAM_STR);
    $sth->bindParam(':companion_space', $companion_space, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();
    
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put seating data
$app->put('/put/seating/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Seating );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put seating data by seating id and est id
$app->put('/put/seating/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $seating_id = $data["seating_id"];
    $seating_no_step = $data["seating_no_step"];
    $table_aisles = $data["table_aisles"];
    $legroom = $data["legroom"];
    $num_legroom = $data["num_legroom"];
    $rearranged = $data["rearranged"];
    $num_table_rearranged = $data["num_table_rearranged"];
    $num_chair_rearranged = $data["num_chair_rearranged"];
    $round_tables = $data["round_tables"];
    $num_round_tables = $data["num_round_tables"];
    $lighting = $data["lighting"];
    $lighting_option = $data["lighting_option"];
    $lighting_type = $data["lighting_type"];
    $adjustable_lighting = $data["adjustable_lighting"];
    $low_visual_slim = $data["low_visual_slim"];
    $quiet_table = $data["quiet_table"];
    $low_sound = $data["low_sound"];
    $designated_space = $data["designated_space"];
    $num_desig_space = $data["num_desig_space"];
    $companion_space = $data["companion_space"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Seating SET seating_no_step = :seating_no_step,
                                                     table_aisles = :table_aisles,
                                                     legroom = :legroom,
                                                     num_legroom = :num_legroom,
                                                     rearranged = :rearranged,
                                                     num_table_rearranged = :num_table_rearranged,
                                                     num_chair_rearranged = :num_chair_rearranged,
                                                     round_tables = :round_tables,
                                                     num_round_tables = :num_round_tables,
                                                     lighting = :lighting,
                                                     lighting_option = :lighting_option,
                                                     lighting_type = :lighting_type,
                                                     adjustable_lighting = :adjustable_lighting,
                                                     low_visual_slim = :low_visual_slim,
                                                     quiet_table = :quiet_table,
                                                     low_sound = :low_sound,
                                                     designated_space = :designated_space,
                                                     num_desig_space = :num_desig_space,
                                                     companion_space = :companion_space,
                                                     comment = :comment,
                                                     recommendations = :recommendations
                                                     WHERE seating_id=$seating_id AND est_id=$id");

    $sth->bindParam(':seating_no_step', $seating_no_step, PDO::PARAM_STR);
    $sth->bindParam(':table_aisles', $table_aisles, PDO::PARAM_STR);
    $sth->bindParam(':legroom', $legroom, PDO::PARAM_STR);
    $sth->bindParam(':num_legroom', $num_legroom, PDO::PARAM_STR);
    $sth->bindParam(':rearranged', $rearranged, PDO::PARAM_STR);
    $sth->bindParam(':num_table_rearranged', $num_table_rearranged, PDO::PARAM_STR);
    $sth->bindParam(':num_chair_rearranged', $num_chair_rearranged, PDO::PARAM_STR);
    $sth->bindParam(':round_tables', $round_tables, PDO::PARAM_STR);
    $sth->bindParam(':num_round_tables', $num_round_tables, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_option', $lighting_option, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':adjustable_lighting', $adjustable_lighting, PDO::PARAM_STR);
    $sth->bindParam(':low_visual_slim', $low_visual_slim, PDO::PARAM_STR);
    $sth->bindParam(':quiet_table', $quiet_table, PDO::PARAM_STR);
    $sth->bindParam(':low_sound', $low_sound, PDO::PARAM_STR);
    $sth->bindParam(':designated_space', $designated_space, PDO::PARAM_STR);
    $sth->bindParam(':num_desig_space', $num_desig_space, PDO::PARAM_STR);
    $sth->bindParam(':companion_space', $companion_space, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * RESTROOM ROUTES
 */
// get all restroom
$app->get('/restroom/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Restroom");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get restroom data by id
$app->get('/get/restroom/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Restroom WHERE restroom_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get restroom data by establishment id
$app->get('/get/restroom/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Restroom WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete restroom data by id
$app->delete('/delete/restroom/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Restroom WHERE restroom_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete restroom data by establishment id
$app->delete('/delete/restroom/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Restroom WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post restroom data by est id
$app->post('/post/restroom/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $public_restroom = "";
    $total_num = "";
    $designated_number = "";
    $num_wheelchair_sign = "";
    $sign_accessable = "";
    $sign_location = "";
    $key_needed = "";
    $comment = "No public restrooms at this location";
    $recommendations = "";
    $est_id = $args['id'];

    $sth = $this->db->prepare("INSERT INTO Restroom (public_restroom, total_num, designated_number, num_wheelchair_sign, sign_accessable, sign_location, key_needed, comment, recommendations, est_id) 
                                  VALUES (:public_restroom, :total_num, :designated_number, :num_wheelchair_sign, :sign_accessable, :sign_location, :key_needed, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':public_restroom', $public_restroom, PDO::PARAM_STR);
    $sth->bindParam(':total_num', $total_num, PDO::PARAM_STR);
    $sth->bindParam(':designated_number', $designated_number, PDO::PARAM_STR);
    $sth->bindParam(':num_wheelchair_sign', $num_wheelchair_sign, PDO::PARAM_STR);
    $sth->bindParam(':sign_accessable', $sign_accessable, PDO::PARAM_STR);
    $sth->bindParam(':sign_location', $sign_location, PDO::PARAM_STR);
    $sth->bindParam(':key_needed', $key_needed, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post restroom data
$app->post('/post/restroom/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $public_restroom = $data["public_restroom"];
    $total_num = $data["total_num"];
    $designated_number = $data["designated_number"];
    $num_wheelchair_sign = $data["num_wheelchair_sign"];
    $sign_accessable = $data["sign_accessable"];
    $sign_location = $data["sign_location"];
    $key_needed = $data["key_needed"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data['est_id'];

    $sth = $this->db->prepare("INSERT INTO Restroom (public_restroom, total_num, designated_number, num_wheelchair_sign, sign_accessable, sign_location, key_needed, comment, recommendations, est_id) 
                                  VALUES (:public_restroom, :total_num, :designated_number, :num_wheelchair_sign, :sign_accessable, :sign_location, :key_needed, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':public_restroom', $public_restroom, PDO::PARAM_STR);
    $sth->bindParam(':total_num', $total_num, PDO::PARAM_STR);
    $sth->bindParam(':designated_number', $designated_number, PDO::PARAM_STR);
    $sth->bindParam(':num_wheelchair_sign', $num_wheelchair_sign, PDO::PARAM_STR);
    $sth->bindParam(':sign_accessable', $sign_accessable, PDO::PARAM_STR);
    $sth->bindParam(':sign_location', $sign_location, PDO::PARAM_STR);
    $sth->bindParam(':key_needed', $key_needed, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();
    
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put restroom data
$app->put('/put/restroom/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Restroom );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put restroom data by restroom id and est id
$app->put('/put/restroom/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $restroom_id = $data["restroom_id"];
    $public_restroom = $data["public_restroom"];
    $total_num = $data["total_num"];
    $designated_number = $data["designated_number"];
    $num_wheelchair_sign = $data["num_wheelchair_sign"];
    $sign_accessable = $data["sign_accessable"];
    $sign_location = $data["sign_location"];
    $key_needed = $data["key_needed"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Restroom SET public_restroom = :public_restroom,
                                                     total_num = :total_num,
                                                     designated_number = :designated_number,
                                                     num_wheelchair_sign = :num_wheelchair_sign,
                                                     sign_accessable = :sign_accessable,
                                                     sign_location = :sign_location,
                                                     key_needed = :key_needed,
                                                     comment = :comment,
                                                     recommendations = :recommendations
                                                     WHERE restroom_id=$restroom_id AND est_id=$id");

    $sth->bindParam(':public_restroom', $public_restroom, PDO::PARAM_STR);
    $sth->bindParam(':total_num', $total_num, PDO::PARAM_STR);
    $sth->bindParam(':designated_number', $designated_number, PDO::PARAM_STR);
    $sth->bindParam(':num_wheelchair_sign', $num_wheelchair_sign, PDO::PARAM_STR);
    $sth->bindParam(':sign_accessable', $sign_accessable, PDO::PARAM_STR);
    $sth->bindParam(':sign_location', $sign_location, PDO::PARAM_STR);
    $sth->bindParam(':key_needed', $key_needed, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/**
 * RESTROOM INFO ROUTES
 */
// get all restroom_info
$app->get('/restroom_info/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Restroom_Info");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get restroom_info data by id
$app->get('/get/restroom_info/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Restroom_Info WHERE rest_info_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get restroom_info data by restroom id
$app->get('/get/restroom_info/rest/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Restroom_Info WHERE rest_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete restroom_info data by id
$app->delete('/delete/restroom_info/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Restroom_Info WHERE rest_info_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete restroom_info data by restroom id
$app->delete('/delete/restroom_info/rest/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Restroom_Info WHERE rest_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post restroom_info data
$app->post('/post/restroom_info/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();
    
    $restroom_desc = $data["restroom_desc"];
    $easy_open = $data["easy_open"];
    $lbs_force = $data["lbs_force"];
    $clearance = $data["clearance"];
    $opening = $data["opening"];
    $opens_out = $data["opens_out"];
    $use_fist = $data["use_fist"];
    $can_turn_around = $data["can_turn_around"];
    $turn_width = $data["turn_width"];
    $turn_depth = $data["turn_depth"];
    $close_chair_inside = $data["close_chair_inside"];
    $grab_bars = $data["grab_bars"];
    $seat_height_req = $data["seat_height_req"];
    $seat_height = $data["seat_height"];
    $flush_auto_fist = $data["flush_auto_fist"];
    $ambulatory_accessible = $data["ambulatory_accessible"];
    $bar_height = $data["bar_height"];
    $coat_hook = $data["coat_hook"];
    $hook_height = $data["hook_height"];
    $sink = $data["sink"];
    $sink_height = $data["sink_height"];
    $faucet = $data["faucet"];
    $faucet_depth = $data["faucet_depth"];
    $faucet_auto_fist = $data["faucet_auto_fist"];
    $sink_clearance = $data["sink_clearance"];
    $sink_clearance_height = $data["sink_clearance_height"];
    $sink_pipes = $data["sink_pipes"];
    $soap_dispenser = $data["soap_dispenser"];
    $soap_height = $data["soap_height"];
    $dry_fist = $data["dry_fist"];
    $dry_fist_type = $data["dry_fist_type"];
    $dry_controls = $data["dry_controls"];
    $dry_control_height = $data["dry_control_height"];
    $mirror = $data["mirror"];
    $mirror_height = $data["mirror_height"];
    $shelves = $data["shelves"];
    $shelf_height = $data["shelf_height"];
    $trash_receptacles = $data["trash_receptacles"];
    $hygiene_seat_cover = $data["hygiene_seat_cover"];
    $hygiene_cover_height = $data["hygiene_cover_height"];
    $lighting = $data["lighting"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $rest_id = $data["rest_id"];

    $sth = $this->db->prepare("INSERT INTO Restroom_Info (restroom_desc, easy_open, lbs_force, clearance, opening, 
                                                          opens_out, use_fist, can_turn_around, turn_width, turn_depth, 
                                                          close_chair_inside, grab_bars, seat_height_req, seat_height, flush_auto_fist, 
                                                          ambulatory_accessible, bar_height, coat_hook, hook_height, sink, 
                                                          sink_height, faucet, faucet_depth, faucet_auto_fist, sink_clearance, 
                                                          sink_clearance_height, sink_pipes, soap_dispenser, soap_height, dry_fist, 
                                                          dry_fist_type, dry_controls, dry_control_height, mirror, mirror_height, 
                                                          shelves, shelf_height, trash_receptacles, hygiene_seat_cover, hygiene_cover_height, 
                                                          lighting, lighting_type, comment, recommendations, rest_id) 
                                                  VALUES (:restroom_desc, :easy_open, :lbs_force, :clearance, :opening, 
                                                          :opens_out, :use_fist, :can_turn_around, :turn_width, :turn_depth, 
                                                          :close_chair_inside, :grab_bars, :seat_height_req, :seat_height, :flush_auto_fist, 
                                                          :ambulatory_accessible, :bar_height, :coat_hook, :hook_height, :sink, 
                                                          :sink_height, :faucet, :faucet_depth, :faucet_auto_fist, :sink_clearance, 
                                                          :sink_clearance_height, :sink_pipes, :soap_dispenser, :soap_height, :dry_fist, 
                                                          :dry_fist_type, :dry_controls, :dry_control_height, :mirror, :mirror_height, 
                                                          :shelves, :shelf_height, :trash_receptacles, :hygiene_seat_cover, :hygiene_cover_height, 
                                                          :lighting, :lighting_type, :comment, :recommendations, :rest_id) ");

    $sth->bindParam(':restroom_desc', $restroom_desc, PDO::PARAM_STR);
    $sth->bindParam(':easy_open', $easy_open, PDO::PARAM_STR);
    $sth->bindParam(':lbs_force', $lbs_force, PDO::PARAM_STR);
    $sth->bindParam(':clearance', $clearance, PDO::PARAM_STR);
    $sth->bindParam(':opening', $opening, PDO::PARAM_STR);
    $sth->bindParam(':opens_out', $opens_out, PDO::PARAM_STR);
    $sth->bindParam(':use_fist', $use_fist, PDO::PARAM_STR);
    $sth->bindParam(':can_turn_around', $can_turn_around, PDO::PARAM_STR);
    $sth->bindParam(':turn_width', $turn_width, PDO::PARAM_STR);
    $sth->bindParam(':turn_depth', $turn_depth, PDO::PARAM_STR);
    $sth->bindParam(':close_chair_inside', $close_chair_inside, PDO::PARAM_STR);
    $sth->bindParam(':grab_bars', $grab_bars, PDO::PARAM_STR);
    $sth->bindParam(':seat_height_req', $seat_height_req, PDO::PARAM_STR);
    $sth->bindParam(':seat_height', $seat_height, PDO::PARAM_STR);
    $sth->bindParam(':flush_auto_fist', $flush_auto_fist, PDO::PARAM_STR);
    $sth->bindParam(':ambulatory_accessible', $ambulatory_accessible, PDO::PARAM_STR);
    $sth->bindParam(':bar_height', $bar_height, PDO::PARAM_STR);
    $sth->bindParam(':coat_hook', $coat_hook, PDO::PARAM_STR);
    $sth->bindParam(':hook_height', $hook_height, PDO::PARAM_STR);
    $sth->bindParam(':sink', $sink, PDO::PARAM_STR);
    $sth->bindParam(':sink_height', $sink_height, PDO::PARAM_STR);
    $sth->bindParam(':faucet', $faucet, PDO::PARAM_STR);
    $sth->bindParam(':faucet_depth', $faucet_depth, PDO::PARAM_STR);
    $sth->bindParam(':faucet_auto_fist', $faucet_auto_fist, PDO::PARAM_STR);
    $sth->bindParam(':sink_clearance', $sink_clearance, PDO::PARAM_STR);
    $sth->bindParam(':sink_clearance_height', $sink_clearance_height, PDO::PARAM_STR);
    $sth->bindParam(':sink_pipes', $sink_pipes, PDO::PARAM_STR);
    $sth->bindParam(':soap_dispenser', $soap_dispenser, PDO::PARAM_STR);
    $sth->bindParam(':soap_height', $soap_height, PDO::PARAM_STR);
    $sth->bindParam(':dry_fist', $dry_fist, PDO::PARAM_STR);
    $sth->bindParam(':dry_fist_type', $dry_fist_type, PDO::PARAM_STR);
    $sth->bindParam(':dry_controls', $dry_controls, PDO::PARAM_STR);
    $sth->bindParam(':dry_control_height', $dry_control_height, PDO::PARAM_STR);
    $sth->bindParam(':mirror', $mirror, PDO::PARAM_STR);
    $sth->bindParam(':mirror_height', $mirror_height, PDO::PARAM_STR);
    $sth->bindParam(':shelves', $shelves, PDO::PARAM_STR);
    $sth->bindParam(':shelf_height', $shelf_height, PDO::PARAM_STR);
    $sth->bindParam(':trash_receptacles', $trash_receptacles, PDO::PARAM_STR);
    $sth->bindParam(':hygiene_seat_cover', $hygiene_seat_cover, PDO::PARAM_STR);
    $sth->bindParam(':hygiene_cover_height', $hygiene_cover_height, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':rest_id', $rest_id, PDO::PARAM_INT);

    $sth->execute();
    
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put restroom_info data
$app->put('/put/restroom_info/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

//    $sth = $this->db->prepare("INSERT INTO Restroom_Info );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put restroom data by restroom id and rest id
$app->put('/put/restroom_info/rest/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $data = $request->getParsedBody();

    $rest_info_id = $data["rest_info_id"];
    $restroom_desc = $data["restroom_desc"];
    $easy_open = $data["easy_open"];
    $lbs_force = $data["lbs_force"];
    $clearance = $data["clearance"];
    $opening = $data["opening"];
    $opens_out = $data["opens_out"];
    $use_fist = $data["use_fist"];
    $can_turn_around = $data["can_turn_around"];
    $turn_width = $data["turn_width"];
    $turn_depth = $data["turn_depth"];
    $close_chair_inside = $data["close_chair_inside"];
    $grab_bars = $data["grab_bars"];
    $seat_height_req = $data["seat_height_req"];
    $seat_height = $data["seat_height"];
    $flush_auto_fist = $data["flush_auto_fist"];
    $ambulatory_accessible = $data["ambulatory_accessible"];
    $bar_height = $data["bar_height"];
    $coat_hook = $data["coat_hook"];
    $hook_height = $data["hook_height"];
    $sink = $data["sink"];
    $sink_height = $data["sink_height"];
    $faucet = $data["faucet"];
    $faucet_depth = $data["faucet_depth"];
    $faucet_auto_fist = $data["faucet_auto_fist"];
    $sink_clearance = $data["sink_clearance"];
    $sink_clearance_height = $data["sink_clearance_height"];
    $sink_pipes = $data["sink_pipes"];
    $soap_dispenser = $data["soap_dispenser"];
    $soap_height = $data["soap_height"];
    $dry_fist = $data["dry_fist"];
    $dry_fist_type = $data["dry_fist_type"];
    $dry_controls = $data["dry_controls"];
    $dry_control_height = $data["dry_control_height"];
    $mirror = $data["mirror"];
    $mirror_height = $data["mirror_height"];
    $shelves = $data["shelves"];
    $shelf_height = $data["shelf_height"];
    $trash_receptacles = $data["trash_receptacles"];
    $hygiene_seat_cover = $data["hygiene_seat_cover"];
    $hygiene_cover_height = $data["hygiene_cover_height"];
    $lighting = $data["lighting"];
    $lighting_type = $data["lighting_type"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];


    $sth = $this->db->prepare("UPDATE Restroom_Info SET restroom_desc = :restroom_desc,
                                                        easy_open = :easy_open,
                                                        lbs_force = :lbs_force,
                                                        clearance = :clearance,
                                                        opening = :opening,
                                                        opens_out = :opens_out,
                                                        use_fist = :use_fist,
                                                        can_turn_around = :can_turn_around,
                                                        turn_width = :turn_width,
                                                        turn_depth = :turn_depth,
                                                        close_chair_inside = :close_chair_inside,
                                                        grab_bars = :grab_bars,
                                                        seat_height_req = :seat_height_req,
                                                        seat_height = :seat_height,
                                                        flush_auto_fist = :flush_auto_fist,
                                                        ambulatory_accessible = :ambulatory_accessible,
                                                        bar_height = :bar_height,
                                                        coat_hook = :coat_hook,
                                                        hook_height = :hook_height,
                                                        sink = :sink,
                                                        sink_height = :sink_height,
                                                        faucet = :faucet,
                                                        faucet_depth = :faucet_depth,
                                                        faucet_auto_fist = :faucet_auto_fist,
                                                        sink_clearance = :sink_clearance,
                                                        sink_clearance_height = :sink_clearance_height,
                                                        sink_pipes = :sink_pipes,
                                                        soap_dispenser = :soap_dispenser,
                                                        soap_height = :soap_height,
                                                        dry_fist = :dry_fist,
                                                        dry_fist_type = :dry_fist_type,
                                                        dry_controls = :dry_controls,
                                                        dry_control_height = :dry_control_height,
                                                        mirror = :mirror,
                                                        mirror_height = :mirror_height,
                                                        shelves = :shelves,
                                                        shelf_height = :shelf_height,
                                                        trash_receptacles = :trash_receptacles,
                                                        hygiene_seat_cover = :hygiene_seat_cover,
                                                        hygiene_cover_height = :hygiene_cover_height,
                                                        lighting = :lighting,
                                                        lighting_type = :lighting_type,
                                                        comment = :comment,
                                                        recommendations = :recommendations
                                                     WHERE rest_info_id=$rest_info_id AND rest_id=$id");

    $sth->bindParam(':restroom_desc', $restroom_desc, PDO::PARAM_STR);
    $sth->bindParam(':easy_open', $easy_open, PDO::PARAM_STR);
    $sth->bindParam(':lbs_force', $lbs_force, PDO::PARAM_STR);
    $sth->bindParam(':clearance', $clearance, PDO::PARAM_STR);
    $sth->bindParam(':opening', $opening, PDO::PARAM_STR);
    $sth->bindParam(':opens_out', $opens_out, PDO::PARAM_STR);
    $sth->bindParam(':use_fist', $use_fist, PDO::PARAM_STR);
    $sth->bindParam(':can_turn_around', $can_turn_around, PDO::PARAM_STR);
    $sth->bindParam(':turn_width', $turn_width, PDO::PARAM_STR);
    $sth->bindParam(':turn_depth', $turn_depth, PDO::PARAM_STR);
    $sth->bindParam(':close_chair_inside', $close_chair_inside, PDO::PARAM_STR);
    $sth->bindParam(':grab_bars', $grab_bars, PDO::PARAM_STR);
    $sth->bindParam(':seat_height_req', $seat_height_req, PDO::PARAM_STR);
    $sth->bindParam(':seat_height', $seat_height, PDO::PARAM_STR);
    $sth->bindParam(':flush_auto_fist', $flush_auto_fist, PDO::PARAM_STR);
    $sth->bindParam(':ambulatory_accessible', $ambulatory_accessible, PDO::PARAM_STR);
    $sth->bindParam(':bar_height', $bar_height, PDO::PARAM_STR);
    $sth->bindParam(':coat_hook', $coat_hook, PDO::PARAM_STR);
    $sth->bindParam(':hook_height', $hook_height, PDO::PARAM_STR);
    $sth->bindParam(':sink', $sink, PDO::PARAM_STR);
    $sth->bindParam(':sink_height', $sink_height, PDO::PARAM_STR);
    $sth->bindParam(':faucet', $faucet, PDO::PARAM_STR);
    $sth->bindParam(':faucet_depth', $faucet_depth, PDO::PARAM_STR);
    $sth->bindParam(':faucet_auto_fist', $faucet_auto_fist, PDO::PARAM_STR);
    $sth->bindParam(':sink_clearance', $sink_clearance, PDO::PARAM_STR);
    $sth->bindParam(':sink_clearance_height', $sink_clearance_height, PDO::PARAM_STR);
    $sth->bindParam(':sink_pipes', $sink_pipes, PDO::PARAM_STR);
    $sth->bindParam(':soap_dispenser', $soap_dispenser, PDO::PARAM_STR);
    $sth->bindParam(':soap_height', $soap_height, PDO::PARAM_STR);
    $sth->bindParam(':dry_fist', $dry_fist, PDO::PARAM_STR);
    $sth->bindParam(':dry_fist_type', $dry_fist_type, PDO::PARAM_STR);
    $sth->bindParam(':dry_controls', $dry_controls, PDO::PARAM_STR);
    $sth->bindParam(':dry_control_height', $dry_control_height, PDO::PARAM_STR);
    $sth->bindParam(':mirror', $mirror, PDO::PARAM_STR);
    $sth->bindParam(':mirror_height', $mirror_height, PDO::PARAM_STR);
    $sth->bindParam(':shelves', $shelves, PDO::PARAM_STR);
    $sth->bindParam(':shelf_height', $shelf_height, PDO::PARAM_STR);
    $sth->bindParam(':trash_receptacles', $trash_receptacles, PDO::PARAM_STR);
    $sth->bindParam(':hygiene_seat_cover', $hygiene_seat_cover, PDO::PARAM_STR);
    $sth->bindParam(':hygiene_cover_height', $hygiene_cover_height, PDO::PARAM_STR);
    $sth->bindParam(':lighting', $lighting, PDO::PARAM_STR);
    $sth->bindParam(':lighting_type', $lighting_type, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


/**
 * COMMUNICATION ROUTES
 */
// get all communication
$app->get('/communication/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $sth = $this->db->prepare("SELECT * FROM Communication");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get communication data by id
$app->get('/get/communication/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Communication WHERE communication_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// get communication data by establishment id
$app->get('/get/communication/est/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("SELECT * FROM Communication WHERE est_id=$id");
    $sth->execute();
    $data = $sth->fetchAll();
    return $this->response->withJson($data)->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete communication data by id
$app->delete('/delete/communication/{id}', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Communication WHERE communication_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// delete communication data by establishment id
$app->delete('/delete/communication/est/{id}', function (Request $request, Response $response, array $args){
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $id = $args['id'];
    $sth = $this->db->prepare("DELETE FROM Communication WHERE est_id=$id");
    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// post communication data
$app->post('/post/communication/', function (Request $request, Response $response, array $args){ 
    // Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

    $data = $request->getParsedBody();

    $public_phone = $data["public_phone"];
    $phone_clearance = $data["phone_clearance"];
    $num_phone = $data["num_phone"];
    $tty = $data["tty"];
    $staff_tty = $data["staff_tty"];
    $assisted_listening = $data["assisted_listening"];
    $assisted_listen_type = $data["assisted_listen_type"];
    $assisted_listen_receiver = $data["assisted_listen_receiver"];
    $listening_signage = $data["listening_signage"];
    $staff_listening = $data["staff_listening"];
    $acoustics = $data["acoustics"];
    $acoustics_level = $data["acoustics_level"];
    $alt_comm_methods = $data["alt_comm_methods"];
    $alt_comm_type = $data["alt_comm_type"];
    $staff_ASL = $data["staff_ASL"];
    $captioning_default = $data["captioning_default"];
    $theater_captioning = $data["theater_captioning"];
    $theater_capt_type = $data["theater_capt_type"];
    $auditory_info_visual = $data["auditory_info_visual"];
    $visual_info_auditory = $data["visual_info_auditory"];
    $website_text_reader = $data["website_text_reader"];
    $alt_contact = $data["alt_contact"];
    $alt_contact_type = $data["alt_contact_type"];
    $shopping_assist = $data["shopping_assist"];
    $assist_service = $data["assist_service"];
    $assist_fee = $data["assist_fee"];
    $store_scooter = $data["store_scooter"];
    $scooter_fee = $data["scooter_fee"];
    $scooter_location = $data["scooter_location"];
    $restaurant_allergies = $data["restaurant_allergies"];
    $staff_disable_trained = $data["staff_disable_trained"];
    $staff_disable_trained_desc = $data["staff_disable_trained_desc"];
    $items_reach = $data["items_reach"];
    $service_alt_manner = $data["service_alt_manner"];
    $senior_discount = $data["senior_discount"];
    $senior_age = $data["senior_age"];
    $annual_A4A_review = $data["annual_A4A_review"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];
    $est_id = $data["est_id"];

    $sth = $this->db->prepare("INSERT INTO Communication (public_phone, phone_clearance, num_phone, tty, staff_tty, assisted_listening, assisted_listen_type, assisted_listen_receiver, listening_signage, staff_listening, acoustics, acoustics_level, alt_comm_methods, alt_comm_type, staff_ASL, captioning_default, theater_captioning, theater_capt_type, auditory_info_visual, visual_info_auditory, website_text_reader, alt_contact, alt_contact_type, shopping_assist, assist_service, assist_fee, store_scooter, scooter_fee, scooter_location, restaurant_allergies, staff_disable_trained, staff_disable_trained_desc, items_reach, service_alt_manner, senior_discount, senior_age, annual_A4A_review, comment, recommendations, est_id) 
                                  VALUES (:public_phone, :phone_clearance, :num_phone, :tty, :staff_tty, :assisted_listening, :assisted_listen_type, :assisted_listen_receiver, :listening_signage, :staff_listening, :acoustics, :acoustics_level, :alt_comm_methods, :alt_comm_type, :staff_ASL, :captioning_default, :theater_captioning, :theater_capt_type, :auditory_info_visual, :visual_info_auditory, :website_text_reader, :alt_contact, :alt_contact_type, :shopping_assist, :assist_service, :assist_fee, :store_scooter, :scooter_fee, :scooter_location, :restaurant_allergies, :staff_disable_trained, :staff_disable_trained_desc, :items_reach, :service_alt_manner, :senior_discount, :senior_age, :annual_A4A_review, :comment, :recommendations, :est_id) ");

    $sth->bindParam(':public_phone', $public_phone, PDO::PARAM_STR);
    $sth->bindParam(':phone_clearance', $phone_clearance, PDO::PARAM_STR);
    $sth->bindParam(':num_phone', $num_phone, PDO::PARAM_STR);
    $sth->bindParam(':tty', $tty, PDO::PARAM_STR);
    $sth->bindParam(':staff_tty', $staff_tty, PDO::PARAM_STR);
    $sth->bindParam(':assisted_listening', $assisted_listening, PDO::PARAM_STR);
    $sth->bindParam(':assisted_listen_type', $assisted_listen_type, PDO::PARAM_STR);
    $sth->bindParam(':assisted_listen_receiver', $assisted_listen_receiver, PDO::PARAM_STR);
    $sth->bindParam(':listening_signage', $listening_signage, PDO::PARAM_STR);
    $sth->bindParam(':staff_listening', $staff_listening, PDO::PARAM_STR);
    $sth->bindParam(':acoustics', $acoustics, PDO::PARAM_STR);
    $sth->bindParam(':acoustics_level', $acoustics_level, PDO::PARAM_STR);
    $sth->bindParam(':alt_comm_methods', $alt_comm_methods, PDO::PARAM_STR);
    $sth->bindParam(':alt_comm_type', $alt_comm_type, PDO::PARAM_STR);
    $sth->bindParam(':staff_ASL', $staff_ASL, PDO::PARAM_STR);
    $sth->bindParam(':captioning_default', $captioning_default, PDO::PARAM_STR);
    $sth->bindParam(':theater_captioning', $theater_captioning, PDO::PARAM_STR);
    $sth->bindParam(':theater_capt_type', $theater_capt_type, PDO::PARAM_STR);
    $sth->bindParam(':auditory_info_visual', $auditory_info_visual, PDO::PARAM_STR);
    $sth->bindParam(':visual_info_auditory', $visual_info_auditory, PDO::PARAM_STR);
    $sth->bindParam(':website_text_reader', $website_text_reader, PDO::PARAM_STR);
    $sth->bindParam(':alt_contact', $alt_contact, PDO::PARAM_STR);
    $sth->bindParam(':alt_contact_type', $alt_contact_type, PDO::PARAM_STR);
    $sth->bindParam(':shopping_assist', $shopping_assist, PDO::PARAM_STR);
    $sth->bindParam(':assist_service', $assist_service, PDO::PARAM_STR);
    $sth->bindParam(':assist_fee', $assist_fee, PDO::PARAM_STR);
    $sth->bindParam(':store_scooter', $store_scooter, PDO::PARAM_STR);
    $sth->bindParam(':scooter_fee', $scooter_fee, PDO::PARAM_STR);
    $sth->bindParam(':scooter_location', $scooter_location, PDO::PARAM_STR);
    $sth->bindParam(':restaurant_allergies', $restaurant_allergies, PDO::PARAM_STR);
    $sth->bindParam(':staff_disable_trained', $staff_disable_trained, PDO::PARAM_STR);
    $sth->bindParam(':staff_disable_trained_desc', $staff_disable_trained_desc, PDO::PARAM_STR);
    $sth->bindParam(':items_reach', $items_reach, PDO::PARAM_STR);
    $sth->bindParam(':service_alt_manner', $service_alt_manner, PDO::PARAM_STR);
    $sth->bindParam(':senior_discount', $senior_discount, PDO::PARAM_STR);
    $sth->bindParam(':senior_age', $senior_age, PDO::PARAM_STR);
    $sth->bindParam(':annual_A4A_review', $annual_A4A_review, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->bindParam(':est_id', $est_id, PDO::PARAM_INT);

    $sth->execute();
    
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put communication data
$app->put('/put/communication/', function (Request $request, Response $response, array $args){ 
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}
    
//    $sth = $this->db->prepare("INSERT INTO Communication );
//    $sth->execute();
    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// put communication data by communication id and est id
$app->put('/put/communication/est/{id}', function (Request $request, Response $response, array $args) use ($recommendations) {
// Initialize the session
session_start();
$time = $_SERVER['REQUEST_TIME'];
$timeout_duration = 1800;
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['LAST_ACTIVITY'] = $time;
// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}
    
    $id = $args['id'];
    $data = $request->getParsedBody();

    $communication_id = $data["communication_id"];
    $public_phone = $data["public_phone"];
    $phone_clearance = $data["phone_clearance"];
    $num_phone = $data["num_phone"];
    $tty = $data["tty"];
    $staff_tty = $data["staff_tty"];
    $assisted_listening = $data["assisted_listening"];
    $assisted_listen_type = $data["assisted_listen_type"];
    $assisted_listen_receiver = $data["assisted_listen_receiver"];
    $listening_signage = $data["listening_signage"];
    $staff_listening = $data["staff_listening"];
    $acoustics = $data["acoustics"];
    $acoustics_level = $data["acoustics_level"];
    $alt_comm_methods = $data["alt_comm_methods"];
    $alt_comm_type = $data["alt_comm_type"];
    $staff_ASL = $data["staff_ASL"];
    $captioning_default = $data["captioning_default"];
    $theater_captioning = $data["theater_captioning"];
    $theater_capt_type = $data["theater_capt_type"];
    $auditory_info_visual = $data["auditory_info_visual"];
    $visual_info_auditory = $data["visual_info_auditory"];
    $website_text_reader = $data["website_text_reader"];
    $alt_contact = $data["alt_contact"];
    $alt_contact_type = $data["alt_contact_type"];
    $shopping_assist = $data["shopping_assist"];
    $assist_service = $data["assist_service"];
    $assist_fee = $data["assist_fee"];
    $store_scooter = $data["store_scooter"];
    $scooter_fee = $data["scooter_fee"];
    $scooter_location = $data["scooter_location"];
    $restaurant_allergies = $data["restaurant_allergies"];
    $staff_disable_trained = $data["staff_disable_trained"];
    $staff_disable_trained_desc = $data["staff_disable_trained_desc"];
    $items_reach = $data["items_reach"];
    $service_alt_manner = $data["service_alt_manner"];
    $senior_discount = $data["senior_discount"];
    $senior_age = $data["senior_age"];
    $annual_A4A_review = $data["annual_A4A_review"];
    $comment = $data["comment"];
    $recommendations = $data["recommendations"];

    $sth = $this->db->prepare("UPDATE Communication SET public_phone = :public_phone,
                                                     phone_clearance = :phone_clearance,
                                                     num_phone = :num_phone,
                                                     tty = :tty,
                                                     staff_tty = :staff_tty,
                                                     assisted_listening = :assisted_listening,
                                                     assisted_listen_type = :assisted_listen_type,
                                                     assisted_listen_receiver = :assisted_listen_receiver,
                                                     listening_signage = :listening_signage,
                                                     staff_listening = :staff_listening,
                                                     acoustics = :acoustics,
                                                     acoustics_level = :acoustics_level,
                                                     alt_comm_methods = :alt_comm_methods,
                                                     alt_comm_type = :alt_comm_type,
                                                     staff_ASL = :staff_ASL,
                                                     captioning_default = :captioning_default,
                                                     theater_captioning = :theater_captioning,
                                                     theater_capt_type = :theater_capt_type,
                                                     auditory_info_visual = :auditory_info_visual,
                                                     visual_info_auditory = :visual_info_auditory,
                                                     website_text_reader = :website_text_reader,
                                                     alt_contact = :alt_contact,
                                                     alt_contact_type = :alt_contact_type,
                                                     shopping_assist = :shopping_assist,
                                                     assist_service = :assist_service,
                                                     assist_fee = :assist_fee,
                                                     store_scooter = :store_scooter,
                                                     scooter_fee = :scooter_fee,
                                                     scooter_location = :scooter_location,
                                                     restaurant_allergies = :restaurant_allergies,
                                                     staff_disable_trained = :staff_disable_trained,
                                                     staff_disable_trained_desc = :staff_disable_trained_desc,
                                                     items_reach = :items_reach,
                                                     service_alt_manner = :service_alt_manner,
                                                     senior_discount = :senior_discount,
                                                     senior_age = :senior_age,
                                                     annual_A4A_review = :annual_A4A_review,
                                                     comment = :comment,
                                                     recommendations = :recommendations
                                                     WHERE communication_id=$communication_id AND est_id=$id");

    $sth->bindParam(':public_phone', $public_phone, PDO::PARAM_STR);
    $sth->bindParam(':phone_clearance', $phone_clearance, PDO::PARAM_STR);
    $sth->bindParam(':num_phone', $num_phone, PDO::PARAM_STR);
    $sth->bindParam(':tty', $tty, PDO::PARAM_STR);
    $sth->bindParam(':staff_tty', $staff_tty, PDO::PARAM_STR);
    $sth->bindParam(':assisted_listening', $assisted_listening, PDO::PARAM_STR);
    $sth->bindParam(':assisted_listen_type', $assisted_listen_type, PDO::PARAM_STR);
    $sth->bindParam(':assisted_listen_receiver', $assisted_listen_receiver, PDO::PARAM_STR);
    $sth->bindParam(':listening_signage', $listening_signage, PDO::PARAM_STR);
    $sth->bindParam(':staff_listening', $staff_listening, PDO::PARAM_STR);
    $sth->bindParam(':acoustics', $acoustics, PDO::PARAM_STR);
    $sth->bindParam(':acoustics_level', $acoustics_level, PDO::PARAM_STR);
    $sth->bindParam(':alt_comm_methods', $alt_comm_methods, PDO::PARAM_STR);
    $sth->bindParam(':alt_comm_type', $alt_comm_type, PDO::PARAM_STR);
    $sth->bindParam(':staff_ASL', $staff_ASL, PDO::PARAM_STR);
    $sth->bindParam(':captioning_default', $captioning_default, PDO::PARAM_STR);
    $sth->bindParam(':theater_captioning', $theater_captioning, PDO::PARAM_STR);
    $sth->bindParam(':theater_capt_type', $theater_capt_type, PDO::PARAM_STR);
    $sth->bindParam(':auditory_info_visual', $auditory_info_visual, PDO::PARAM_STR);
    $sth->bindParam(':visual_info_auditory', $visual_info_auditory, PDO::PARAM_STR);
    $sth->bindParam(':website_text_reader', $website_text_reader, PDO::PARAM_STR);
    $sth->bindParam(':alt_contact', $alt_contact, PDO::PARAM_STR);
    $sth->bindParam(':alt_contact_type', $alt_contact_type, PDO::PARAM_STR);
    $sth->bindParam(':shopping_assist', $shopping_assist, PDO::PARAM_STR);
    $sth->bindParam(':assist_service', $assist_service, PDO::PARAM_STR);
    $sth->bindParam(':assist_fee', $assist_fee, PDO::PARAM_STR);
    $sth->bindParam(':store_scooter', $store_scooter, PDO::PARAM_STR);
    $sth->bindParam(':scooter_fee', $scooter_fee, PDO::PARAM_STR);
    $sth->bindParam(':scooter_location', $scooter_location, PDO::PARAM_STR);
    $sth->bindParam(':restaurant_allergies', $restaurant_allergies, PDO::PARAM_STR);
    $sth->bindParam(':staff_disable_trained', $staff_disable_trained, PDO::PARAM_STR);
    $sth->bindParam(':staff_disable_trained_desc', $staff_disable_trained_desc, PDO::PARAM_STR);
    $sth->bindParam(':items_reach', $items_reach, PDO::PARAM_STR);
    $sth->bindParam(':service_alt_manner', $service_alt_manner, PDO::PARAM_STR);
    $sth->bindParam(':senior_discount', $senior_discount, PDO::PARAM_STR);
    $sth->bindParam(':senior_age', $senior_age, PDO::PARAM_STR);
    $sth->bindParam(':annual_A4A_review', $annual_A4A_review, PDO::PARAM_STR);
    $sth->bindParam(':comment', $comment, PDO::PARAM_STR);
    $sth->bindParam(':recommendations', $recommendations, PDO::PARAM_STR);
    $sth->execute();

    return $this->response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

