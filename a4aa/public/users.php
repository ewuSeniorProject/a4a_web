<?php
// Initialize the session
session_start();

$time = $_SERVER['REQUEST_TIME'];

/**
 * for a 30 minute timeout, specified in seconds
 */
$timeout_duration = 1800;

/**
 * Here we look for the user's LAST_ACTIVITY timestamp. If
 * it's set and indicates our $timeout_duration has passed,
 * blow away any previous $_SESSION data and start a new one.
 */
if (isset($_SESSION['LAST_ACTIVITY']) &&
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();
}

/**
 * Finally, update LAST_ACTIVITY so that our timeout
 * is based on it and not the user's login time.
 */
$_SESSION['LAST_ACTIVITY'] = $time;

// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
    header("location: login.php");
    exit;
}

if($_SESSION['role'] !== 'admin'){
    header("location: home.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>A4ASpokane</title>

        <link href='//fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css' />
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="./style/style.css" rel="stylesheet" type="text/css" />

        <!-- Optional JavaScript -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
        <script src="https://ajax.aspnetcdn.com/ajax/knockout/knockout-3.4.2.js"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.js"></script>
        <!--jQuery Validation Plugin -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.js"></script>

        <script type="text/javascript">
            $(window).on('load', function () {
                var $preloader = $('#page-preloader'),
                    $spinner   = $preloader.find('.spinner');
                $spinner.fadeOut();
                $preloader.delay(350).fadeOut('slow');
            });
        </script>

        <script src="script/users.js"></script>
    </head>
    <body>
        <div id="page-preloader">
            <span class="spinner"></span>
        </div>
        <nav class="navbar navbar-light bg-header">
            <span class="navbar-brand mb-0 pointer">
                <a href="home.php" class="h1">
                    Access 4 All Spokane
                </a>
            </span>
            <div class="nav-link white-link pointer" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="userMenu">
                <i class="fas fa-bars fa-lg"></i>
            </div>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="home.php"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                <div class="dropdown-item"></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item pointer" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Log Out</div>
            </div>
        </nav>
        <div class="page">
            <div class="left-sidebar">
                <div class="left-sidebar-header" aria-label="Delete Survey Title" >
                        <span class="h5">
                            <i class="fas fa-users"></i>&nbsp; Edit Users
                        </span>
                </div>
                <div class="left-sidebar-container">
                    <ul class="nav nav-pills flex-column" aria-label="Navigaiton Links">
                        <li>&nbsp;</li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="home.php" ><i class="fas fa-tachometer-alt "></i> Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <div class="nav-link pointer left-sidebar-row left-sidebar-non-link" onclick="addUserView()" ><i class="fas fa-user-plus "></i> Add User</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="section">
                <div class="container" id="user-container">
                    <div class="box-container" id="edit-user-view"></div>
                </div>
            </div>
        </div>

        <!-- ALERT MODAL -->
        <div class="modal fade bd-example-modal-lg" id="alert" tabindex="-1" role="dialog" aria-labelledby="alert" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-alert-header">
                        <span class="h5 modal-title modal-alert-title" id="alertTitle"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fas fa-times"></i></span>
                        </button>
                    </div>
                    <div id="alert-body" class="modal-body modal-alert-body"></div>
                    <div class="modal-footer" id="alertFooter"></div>
                </div>
            </div>
        </div>
        <!-- SUCCESS MODAL -->
        <div class="modal fade" id="success" tabindex="-1" role="dialog" aria-labelledby="success" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-success-header">
                        <span class="h5 modal-title modal-success-title" id="successTitle">Success</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fas fa-times"></i></span>
                        </button>
                    </div>
                    <div id="success-body" class="modal-body modal-success-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </body>
</html>