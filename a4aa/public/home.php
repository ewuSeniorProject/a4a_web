<?php
// Initialize the session
session_start();

// If session variable is not set it will redirect to login page
if(!isset($_SESSION['user_name']) || empty($_SESSION['user_name'])){
    header("location: login.php");
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

        <script type="text/javascript">
            $(window).on('load', function () {
                var $preloader = $('#page-preloader'),
                    $spinner   = $preloader.find('.spinner');
                $spinner.fadeOut();
                $preloader.delay(350).fadeOut('slow');
            });
        </script>

        <script src="script/home.js"></script>
    </head>
    <body>
        <div id="page-preloader">
            <span class="spinner"></span>
        </div>
        <nav class="navbar navbar-light bg-header">
            <span class="navbar-brand mb-0 pointer">
                <a href="home.php">
                    <h1>Access 4 All Spokane</h1>
                </a>
            </span>
            <a class="nav-link white-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="userMenu">
                <i class="fas fa-bars fa-lg"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="logout.php">Log Out</a>
            </div>
        </nav>
        <div class="page page-row">
            <div class="left-sidebar">
                <div class="left-sidebar-header">
                    <h5>
                        <p>Information Here</p>
                        <span class="pad" > Maybe stuff here?</span>
                    </h5>
                </div>
                <span>
                    <h6>Here Is A Title:</h6>
                </span>
            </div>
            <div class="section">
                <div class="container" id="establishment-list-wrapper">
                    <div class="box-container col-12" data-bind="template: {name: 'establishment-list-template',  foreach: establishmentList}"></div>
                </div>
            </div>
        </div>

    <!-- Template -->
        <script type="text/html" id="establishment-list-template">
            <div class="box-blank col-1">&nbsp;</div>
            <div class="box col-5">
                <a class="box-title pointer" data-bind="click: setEstablishmentId(est_id), attr: { href: baseUrl, title: 'Edit '+name+' information'}" >
                    <h4 class="col-10" data-bind="text:name"></h4>&nbsp;<div class="icon col-2"><i class="fas fa-chevron-circle-right fa-lg"></i></div><br>
                </a>
                <div class="box-padding">
                    <a class="white-link" data-bind="text:website, attr: { href: 'http://'+website }" target="_new"></a><br>
                    <span data-bind="text:phone"></span><br>
                    <span data-bind="text:street"></span><br>
                    <span data-bind="text:city +', '+ state +' '+ zip"></span><br>
                    <span data-bind="text:contact_fname +' ' + contact_lname"></span><br>
                </div>
            </div>
            <!--<div class="box-blank col-1">&emsp;</div>-->

        </script>
    <!-- End Template -->

    </body>
</html>