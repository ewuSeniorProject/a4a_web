<?php
include_once('user.cfg.php');
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
        <script src="script/common.js"></script>
        <script src="script/home.js"></script>
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
                <a class="dropdown-item" href="add.php"><i class="fas fa-clipboard-list"></i> Add New Survey</a>
                <?php if($_SESSION['role'] == 'admin') {
                    echo
                    '<a class="dropdown-item" href="add.php"><i class="fas fa-trash-alt"></i> Delete Survey</a>
                     <div class="dropdown-item"></div>
                    <a class="dropdown-item" href="users.php"><i class="fas fa-users"></i> Edit Users</a>';
                } ?>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="user_account.php"><i class="fas fa-user-circle"></i> My Account</a>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item pointer" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Log Out</div>
            </div>
        </nav>
        <div class="page">
            <div class="left-sidebar">
                <div class="left-sidebar-header" data-bind="foreach: establishmentVM.establishmentList">
                    <span class="h5">
                        <i class="fas fa-tachometer-alt"></i>&nbsp; Dashboard
                    </span>
                </div>
                <div class="left-sidebar-container">
                    <ul class="nav nav-pills flex-column">
                        <li>&nbsp;</li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="add.php" ><i class="fas fa-clipboard-list "></i> Add New Survey</a>
                        </li>
                        <?php if($_SESSION['role'] == 'admin') {
                            echo
                            '<li class="nav-item">
                                <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="delete.php" ><i class="fas fa-trash-alt "></i> Delete Survey</a>
                            </li>
                            <li>&nbsp;</li>
                            <li class="nav-item">
                                <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="users.php" ><i class="fas fa-users "></i> Edit Users</a>
                            </li>';
                        } ?>
                    </ul>
                </div>
            </div>
            <div class="section">
                <div class="container" id="establishment-list-wrapper">
                    <div class="box-container" data-bind="template: {name: 'establishment-list-template',  foreach: establishmentList}"></div>
                </div>
            </div>
        </div>

    <!-- Template -->
        <script type="text/html" id="establishment-list-template">
            <div class="box col-5">
                <?php if($_SESSION['role'] == 'admin') {
                    echo '<div class="box-title">
                        <div class="col-7 h4" data-bind="text:name"></div>
                        <a class="pointer" data-bind="click: setEstablishmentId(est_id), attr: { href: reportUrl, title: \'Report for \'+name}" >
                            <div class="icon col-2" style="float: right"><i class="fas fas fa-file-pdf fa-lg"></i>&nbsp;</div>
                        </a>
                        <a class="pointer" data-bind="click: setEstablishmentId(est_id), attr: { href: userUrl, title: \'View \'+name+\' information\'}" >
                            <div class="icon col-2" style="float: right"><i class="fas fas fa-folder-open fa-lg"></i>&nbsp;</div>
                        </a>
                        <a class="pointer" data-bind="click: setEstablishmentId(est_id), attr: { href: adminUrl, title: \'Edit \'+name+\' information\'}" >
                            <div class="icon col-2" style="float: right"><i class="fas fa-edit fa-lg"></i>&nbsp;</div>
                        </a>
                    </div>';
                }
                else {
                    echo '<div class="box-title">
                        <div class="col-10 h4" data-bind="text:name"></div>
                        <a class="pointer" data-bind="click: setEstablishmentId(est_id), attr: { href: userUrl, title: \'View \'+name+\' information\'}" >
                            <div class="icon col-2"><i class="fas fa-folder-open fa-lg"></i>&nbsp;</div>
                        </a>
                    </div>';
                }?>
                <div class="box-padding">
                    <a class="white-link" data-bind="text:website, attr: { href: website }" target="_new"></a><br>
                    <span data-bind="text:phone"></span><br>
                    <span data-bind="text:street"></span><br>
                    <span data-bind="text:city +', '+ state +' '+ zip"></span><br>
                    <span data-bind="text:contact_fname +' ' + contact_lname"></span><br>
                </div>
            </div>
            <div class="box-blank col-1"></div>
            <!--<div class="box-blank col-1">&emsp;</div>-->

        </script>
    <!-- End Template -->
<!--                         <a class="pointer" data-bind="click: setEstablishmentId(est_id), attr: { href: reportUrl, title: 'Report for '+name}" > -->
    </body>
</html>

