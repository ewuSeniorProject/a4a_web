<?php
// Initialize the session
session_start();

// If session variable is not set it will redirect to login page
if(!isset($_SESSION['role']) || empty($_SESSION['role']) || $_SESSION['active'] === 'no'){
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

        <!--jQuery Validation Plugin -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>

        <script type="text/javascript">
            $(window).on('load', function () {
                var $preloader = $('#page-preloader'),
                    $spinner   = $preloader.find('.spinner');
                $spinner.fadeOut();
                $preloader.delay(350).fadeOut('slow');
            });
        </script>

        <script src="script/update.js"></script>
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
                <a class="dropdown-item" href="add.php"><i class="fas fa-clipboard-list"></i> Add New Survey</a>
                <div class="dropdown-item"></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item pointer" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Log Out</div>
            </div>
        </nav>
        <div class="page">
            <!-- LEFT SIDEBAR -->
            <div class="left-sidebar">
                <div class="left-sidebar-header" data-bind="foreach: establishmentVM.establishmentList">
                    <span class="h7">
                        <?php if($_SESSION['role'] == 'admin') {
                            echo
                            '<p>Viewing/Editing:</p>';
                        }
                        else {
                            echo
                            '<p>Viewing:</p>';
                        } ?>
                    </span>
                    <span class="h5">
                        <span class="pad" data-bind="text: name"></span>
                    </span>
                </div>
                <div class="left-sidebar-container">
                    <ul class="nav nav-pills flex-column">
                        <li><p> </p></li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="home.php" ><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                        </li>
                        <span class="h6">Quick Access Shortcuts:</span>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Premises Information</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Parking</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Route From Accessible Parking</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Passenger Loading Zones</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">STA Bus Information</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">Exterior Pathways</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">Exterior Stairs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">Exterior Ramps</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">Main Entrance</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">Interior</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">Elevator</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">Signage</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">Emergency Preparedness</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">Seating</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">Restroom</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseSixteen" aria-expanded="false" aria-controls="collapseSixteen">Restroom Information</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link pointer left-sidebar-row left-sidebar-non-link" href="#" data-toggle="collapse" data-target="#collapseSeventeen" aria-expanded="false" aria-controls="collapseSeventeen">Communication Technologies</a>
                        </li>
                    </ul>
                    <div class="pad">&nbsp;</div>
                </div>
            </div>
            <div class="section-update">
                <div class="container">
                    <!-- ACCORDION TABLE SECTION -->
                    <div id="accordion">
                        <!-- Establishment / Premises Information -->
                        <div class="card">
                            <div class="card-header phead-color pointer non-link collapsed" id="headerOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                <div>
                                    <a name="premises-information"></a>
                                    <i class="fas fa-plus-square fa-lg" aria-hidden="true"></i>&emsp;Premises Information
                                </div>
                            </div>
                            <div id="collapseOne" class="collapse form-group" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: establishmentVM.establishmentList">
                                    <div class="card-row">
                                        <div class="col-6"><label for="name"> Establishment Name: </label><input type="name" class="form-control" id="name" data-bind="value: name, hasfocus: name.focused" requireds></div>
                                        <div class="col-6"><label for="website"> Website: </label><input type="url" class="form-control" id="website" data-bind="value: website, hasfocus: website.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <input type="hidden" class="form-control" id="cat_id" data-bind="value: cat_id">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<label for="cat_name">
                                                    <span onclick="editCategory()" class="pointer" title="Click To Change Category"><i class="fas fa-edit"></i>&nbsp;Category:</span>
                                                </label>
                                                <input onclick="editCategory()" class="form-control pointer" title="Click To Change Category" id="cat_name" data-bind="value: cat_name, hasfocus: cat_name.focused" readonly>';
                                            }
                                            else {
                                                echo
                                                '<label for="cat_name">
                                                    <span title="Click To Change Category">Category:</span>
                                                </label>
                                                <input class="form-control" title="Category" id="cat_name" data-bind="value: cat_name, hasfocus: cat_name.focused" readonly>';
                                            } ?>
                                        </div>
                                        <div class="col-4">
                                            <label for="subtype"> Subtype: </label>
                                            <input class="form-control" id="subtype" data-bind="value: subtype, hasfocus: subtype.focused">
                                        </div>
                                        <input type="hidden" class="form-control" id="config_id" data-bind="value: config_id">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<label for="config_name">
                                                    <span onclick="editConfig()" class="pointer" title="Click To Change Configuration"><i class="fas fa-edit"></i>&nbsp;Configuration:</span>
                                                </label>
                                                <input onclick="editConfig()" class="form-control pointer" title="Click To Change Configuration" id="config_name" data-bind="value: config_name, hasfocus: config_name.focused" readonly>';
                                            }
                                            else {
                                                echo
                                                '<label for="config_name">
                                                    <span title="Configuration">Configuration:</span>
                                                </label>
                                                <input class="form-control" title="Configuration" id="config_name" data-bind="value: config_name, hasfocus: config_name.focused" readonly>';
                                            } ?>
                                        </div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="street"> Street: </label><input class="form-control" id="street" data-bind="value: street, hasfocus: street.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="city"> City: </label><input class="form-control" id="city" data-bind="value: city, hasfocus: city.focused"></div>
                                        <div class="col-2"><label for="state"> State: </label><input class="form-control" id="state" data-bind="value: state, hasfocus: state.focused"></div>
                                        <div class="col-4"><label for="zip"> Zip: </label><input class="form-control" id="zip" data-bind="value: zip, hasfocus: zip.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="phone"> Main Phone: </label><input class="form-control" id="phone" data-bind="value: phone, hasfocus: phone.focused"></div>
                                        <div class="col-6"><label for="phone_tty"> TTY/TTD: </label><input class="form-control" id="phone_tty" data-bind="value: phone_tty, hasfocus: phone_tty.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="contact_fname"> Contact First Name: </label><input class="form-control" id="contact_fname" data-bind="value: contact_fname, hasfocus: contact_fname.focused"></div>
                                        <div class="col-4"><label for="contact_lname"> Contact Last Name: </label><input class="form-control" id="contact_lname" data-bind="value: contact_lname, hasfocus: contact_lname.focused"></div>
                                        <div class="col-4"><label for="contact_title"> Contact Title: </label><input class="form-control" id="contact_title" data-bind="value: contact_title, hasfocus: contact_title.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="contact_email"> Email: </label><input class="form-control" id="contact_email" data-bind="value: contact_email, hasfocus: contact_email.focused"></div>
                                        <input type="hidden" class="form-control" id="user_id" data-bind="value: user_id">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<label for="user_name">
                                                    <span onclick="editUser()" class="pointer" title="Click To Change Surveyor"><i class="fas fa-edit"></i>&nbsp;Surveyor:</span>
                                                </label>
                                                <input onclick="editUser()" class="form-control pointer" title="Click To Change Surveyor" id="user_name" data-bind="value: user_name, hasfocus: user_name.focused" readonly>';
                                            }
                                            else {
                                                echo
                                                '<label for="user_name">
                                                    <span title="Surveyor">Surveyor:</span>
                                                </label>
                                                <input class="form-control" title="Surveyor" id="user_name" data-bind="value: user_name, hasfocus: user_name.focused" readonly>';
                                            } ?>
                                        </div>
                                        <div class="col-4"><label for="date"> Survey Date: </label><input class="form-control" type="date" id="date" data-bind="value: date, hasfocus: date.focused" required></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentEstablishment"> Comment: </label><input class="form-control" id="commentEstablishment" data-bind="value: config_comment, hasfocus: config_comment.focused"></div>
                                        <input type="hidden" class="form-control" id="est_id" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_establishment" class="btn btn-success" onclick="updateEstablishment()"><i class="fas fa-save"></i>&nbsp; Save Premises Information</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Parking -->
                        <div class="card">
                            <div class="card-header phead-color pointer non-link collapsed" id="headerTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <div>
                                    <a name="parking"></a>
                                    <i class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Parking
                                </div>
                            </div>
                            <div id="collapseTwo" class="collapse form-group" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: parkingVM.parkingList">
                                    <div class="card-row">
                                        <div class="col-4"><label for="lot_free"> Lot parking Free/Paid: </label> <input class="form-control" id="lot_free" data-bind="value: lot_free,hasfocus: lot_free.focused"></div>
                                        <div class="col-4"><label for="street_metered"> Street parking Metered/Not Metered: </label><input class="form-control" id="street_metered" data-bind="value: street_metered, hasfocus: street_metered.focused"></div>
                                        <div class="col-4"><label for="parking_type"> Other type of parking: </label><input class="form-control" id="parking_type" data-bind="value: parking_type, hasfocus: parking_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="total_num_spaces"> Total number of spaces: </label> <input class="form-control" id="total_num_spaces" data-bind="value: total_num_spaces,hasfocus: total_num_spaces.focused"></div>
                                        <div class="col-6"><label for="num_reserved_spaces"> Number of reserved spaces: </label><input class="form-control" id="num_reserved_spaces" data-bind="value: num_reserved_spaces, hasfocus: num_reserved_spaces.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="num_accessable_space"> Number of accessible spaces: </label><input class="form-control" id="num_accessable_space" data-bind="value: num_accessable_space, hasfocus: num_accessable_space.focused"></div>
                                        <div class="col-6"><label for="num_van_accessible"> Number of van accessible spaces: </label><input class="form-control" id="num_van_accessible" data-bind="value: num_van_accessible, hasfocus: num_van_accessible.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="reserve_space_sign"> Reserved space signage is unobstructed: </label><input class="form-control" id="reserve_space_sign" data-bind="value: reserve_space_sign, hasfocus: reserve_space_sign.focused"></div>
                                        <div class="col-6"><label for="reserve_space_obstacles"> Reserved parking free of obstacles: </label><input class="form-control" id="reserve_space_obstacles" data-bind="value: reserve_space_obstacles, hasfocus: reserve_space_obstacles.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="comment"> Describe parking area: </label><input class="form-control" id="comment" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendations"> Recommendations: </label><input class="form-control" id="recommendations" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="park_id" data-bind="value: park_id">
                                        <input type="hidden" class="form-control" id="park_est_id" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_parking" class="btn btn-success" onclick="updateParking()"><i class="fas fa-save"></i>&nbsp; Save Parking</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Route From Accessible Parking -->
                        <div class="card">
                            <div class="card-header phead-color pointer non-link collapsed" id="headerThree"  data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <div>
                                    <a name="route-from-accessible-parking"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Route From Accessible Parking
                                </div>
                            </div>
                            <div id="collapseThree" class="collapse form-group" aria-labelledby="headingThree" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: routeFromParkingVM.routeFromParkingList">
                                    <div class="card-row">
                                        <div class="col-4"><label for="distance"> Distance from reserved parking to accessible entrance (feet): </label> <input class="form-control" id="distance" data-bind="value: distance,hasfocus: distance.focused" ></div>
                                        <div class="col-4"><label for="min_width"> Route is minimum width and free of obstacles: </label><input class="form-control" id="min_width" data-bind="value: min_width, hasfocus: min_width.focused"></div>
                                        <div class="col-4"><label for="route_surface"> Route surface is level, unbroken, firm, slip-resistant: </label><input class="form-control" id="route_surface" data-bind="value: route_surface, hasfocus: route_surface.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="route_curbs"> Route has curb ramps and curb cuts where needed: </label> <input class="form-control" id="route_curbs" data-bind="value: route_curbs,hasfocus: route_curbs.focused"></div>
                                        <div class="col-4"><label for="tactile_warning"> Tactile warning strips are installed: </label><input class="form-control" id="tactile_warning" data-bind="value: tactile_warning, hasfocus: tactile_warning.focused"></div>
                                        <div class="col-4"><label for="covered"> Route from parking to accessible entrance is covered: </label><input class="form-control" id="covered" data-bind="value: covered, hasfocus: covered.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="lighting"> Lighting is adequate: </label><input class="form-control" id="lighting" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-4"><label for="lighting_option"> Lighting level day/night: </label><input class="form-control" id="lighting_option" data-bind="value: lighting_option, hasfocus: lighting_option.focused"></div>
                                        <div class="col-4"><label for="lighting_type"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_type" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentRouteFromParking"> Describe the route: </label><input class="form-control" id="commentRouteFromParking" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsRouteFromParking"> Recommendations: </label><input class="form-control" id="recommendationsRouteFromParking" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="route_park_id" data-bind="value: park_id">
                                        <input type="hidden" class="form-control" id="route_from_park_id" data-bind="value: route_park_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_route_from_parking" class="btn btn-success" onclick="updateRouteFromParking()"><i class="fas fa-save"></i>&nbsp; Save Route From Parking</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Passenger Loading Zone -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerFour"  data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                <div>
                                    <a name="passenger-loading-zones"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Passenger Loading Zones
                                </div>
                            </div>
                            <div id="collapseFour" class="collapse form-group" aria-labelledby="headingFour" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: passengerLoadingVM.passengerLoadingList">
                                    <div class="card-row">
                                        <div class="col-4"><label for="designated_zonePassengerLoading"> There is a designated passenger loading zone: </label> <input class="form-control" id="designated_zonePassengerLoading" data-bind="value: designated_zone,hasfocus: designated_zone.focused" ></div>
                                        <div class="col-4"><label for="distancePassengerLoading"> Distance from passenger loading zone (feet): </label> <input class="form-control" id="distancePassengerLoading" data-bind="value: distance,hasfocus: distance.focused" ></div>
                                        <div class="col-4"><label for="min_widthPassengerLoading"> Route is minimum width and free of obstacles: </label><input class="form-control" id="min_widthPassengerLoading" data-bind="value: min_width, hasfocus: min_width.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="passenger_surfacePassengerLoading"> Route surface is level, unbroken, firm, slip-resistant: </label><input class="form-control" id="passenger_surfacePassengerLoading" data-bind="value: passenger_surface, hasfocus: passenger_surface.focused"></div>
                                        <div class="col-4"><label for="tactile_warning_stripsPassengerLoading"> Tactile warning strips are installed:</label><input class="form-control" id="tactile_warning_stripsPassengerLoading" data-bind="value: tactile_warning_strips, hasfocus: tactile_warning_strips.focused"></div>
                                        <div class="col-4"><label for="coveredPassengerLoading"> Route from parking to accessible entrance is covered: </label><input class="form-control" id="coveredPassengerLoading" data-bind="value: covered, hasfocus: covered.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="lightingPassengerLoading"> Lighting is adequate: </label><input class="form-control" id="lightingPassengerLoading" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-4"><label for="lighting_optionPassengerLoading"> Lighting level day/night: </label><input class="form-control" id="lighting_optionPassengerLoading" data-bind="value: lighting_option, hasfocus: lighting_option.focused"></div>
                                        <div class="col-4"><label for="lighting_typePassengerLoading"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typePassengerLoading" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentPassengerLoading"> Describe the route: </label><input class="form-control" id="commentPassengerLoading" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsPassengerLoading"> Recommendations: </label><input class="form-control" id="recommendationsPassengerLoading" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="passenger_park_id" data-bind="value: park_id">
                                        <input type="hidden" class="form-control" id="passenger_id" data-bind="value: passenger_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_passenger_loading" class="btn btn-success" onclick="updatePassengerLoading()"><i class="fas fa-save"></i>&nbsp; Save Passenger Loading Zones</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- STA Bus Information -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerFive"  data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                <div>
                                    <a name="sta-bus-information"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;STA Bus Information
                                </div>
                            </div>
                            <div id="collapseFive" class="collapse form-group" aria-labelledby="headingFive" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: staBusVM.staBusList">
                                    <div class="card-row">
                                        <div class="col-6"><label for="sta_service_area"> Establishment is within the STA Service Area: </label> <input class="form-control" id="sta_service_area" data-bind="value: sta_service_area,hasfocus: sta_service_area.focused" ></div>
                                    </div>
                                    <div id="staBusRouteVM" data-bind="foreach: $parent.staBusRouteVM.staBusRouteList" class="form-group">
                                        <div class="card-row">
                                            <div class="col-2"><label data-bind="attr:{for: 'route_num_'+($index() + 1) }"> Route Number: </label><input class="form-control" data-bind="value: route_num,hasfocus: route_num.focused, attr:{id: 'route_num_'+($index() + 1) }" readonly></div>
                                            <div class="col-2"><label data-bind="attr:{for: 'north_bound_stop_'+($index() + 1) }"> North Bound Stop: </label><input class="form-control" data-bind="value: north_bound_stop,hasfocus: north_bound_stop.focused, attr:{id: 'north_bound_stop_'+($index() + 1) }" readonly></div>
                                            <div class="col-2"><label data-bind="attr:{for: 'south_bound_stop_'+($index() + 1) }"> South Bound Stop: </label><input class="form-control" data-bind="value: south_bound_stop,hasfocus: south_bound_stop.focused, attr:{id: 'south_bound_stop_'+($index() + 1) }" readonly></div>
                                            <div class="col-2"><label data-bind="attr:{for: 'east_bound_stop_'+($index() + 1) }"> East Bound Stop: </label><input class="form-control" data-bind="value: east_bound_stop,hasfocus: east_bound_stop.focused, attr:{id: 'east_bound_stop_'+($index() + 1) }" readonly></div>
                                            <div class="col-2"><label data-bind="attr:{for: 'west_bound_stop_'+($index() + 1) }"> West Bound Stop: </label><input class="form-control" data-bind="value: west_bound_stop,hasfocus: west_bound_stop.focused, attr:{id: 'west_bound_stop_'+($index() + 1) }" readonly></div>
                                            <input type="hidden" class="form-control" data-bind="attr:{id : 'sta_route_id_'+($index() + 1)}, value: sta_route_id">
                                            <input type="hidden" class="form-control" data-bind="attr:{id : 'sta_bus_id_'+($index() + 1)}, value: sta_bus_id">
                                            <div class="col-2">
                                                <?php if($_SESSION['role'] == 'admin') {
                                                    echo
                                                    '<button data-bind="attr:{id: \'edit_route_\'+($index() + 1) }, click: editSTARoute.bind($data, $index() + 1)" class="btn btn-warning edit-text pointer"><i class="fas fa-edit"></i>&nbsp; Edit Route</button>';
                                                } ?>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="distanceStaBus"> Distance from nearest bus stop (feet): </label> <input class="form-control" id="distanceStaBus" data-bind="value: distance,hasfocus: distance.focused" ></div>
                                        <div class="col-6"><label for="min_widthStaBus"> Route is minimum width and free of obstacles: </label><input class="form-control" id="min_widthStaBus" data-bind="value: min_width, hasfocus: min_width.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="route_surfaceStaBus"> Route surface is level, unbroken, firm, slip-resistant: </label><input class="form-control" id="route_surfaceStaBus" data-bind="value: route_surface, hasfocus: route_surface.focused"></div>
                                        <div class="col-4"><label for="tactile_warning_stripsStaBus"> Tactile warning strips are installed: </label><input class="form-control" id="tactile_warning_stripsStaBus" data-bind="value: tactile_warning_strips, hasfocus: tactile_warning_strips.focused"></div>
                                        <div class="col-4"><label for="curb_cutsStaBus"> Route has curb ramps and curb cuts where needed: </label><input class="form-control" id="curb_cutsStaBus" data-bind="value: curb_cuts, hasfocus: covered.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label for="lightingStaBus"> Lighting is adequate: </label><input class="form-control" id="lightingStaBus" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-3"><label for="lighting_optionStaBus"> Lighting level day/night: </label><input class="form-control" id="lighting_optionStaBus" data-bind="value: lighting_option, hasfocus: lighting_option.focused"></div>
                                        <div class="col-3"><label for="lighting_typeStaBus"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeStaBus" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                        <div class="col-3"><label for="shelter_bench"> Shelter or Bench at bust stop: </label><input class="form-control" id="shelter_bench" data-bind="value: shelter_bench, hasfocus: shelter_bench.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentStaBus"> Describe the route: </label><input class="form-control" id="commentStaBus" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsStaBus"> Recommendations: </label><input class="form-control" id="recommendationsStaBus" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="sta_park_id" data-bind="value: park_id">
                                        <input type="hidden" class="form-control" id="sta_id" data-bind="value: sta_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_sta_bus" class="btn btn-success" onclick="updateSTABus()"><i class="fas fa-save"></i>&nbsp; Save STA Bus Information</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Exterior Pathways -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerSix"  data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                <div>
                                    <a name="exterior-pathways"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Exterior Pathways
                                </div>
                            </div>
                            <div id="collapseSix" class="collapse form-group" aria-labelledby="headingSix" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: exteriorPathwayVM.exteriorPathwayList">
                                    <div class="card-row">
                                        <div class="col-4"><label for="service_animal"> There is a service animal relief area on the premises or within 1 block: </label> <input class="form-control" id="service_animal" data-bind="value: service_animal,hasfocus: service_animal.focused" ></div>
                                        <div class="col-8"><label for="service_animal_location"> Location of service animal relief: </label> <input class="form-control" id="service_animal_location" data-bind="value: service_animal_location,hasfocus: service_animal_location.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="has_exterior_path"> The establishment has exterior pathways/walkways: </label> <input class="form-control" id="has_exterior_path" data-bind="value: has_exterior_path,hasfocus: has_exterior_path.focused" ></div>
                                        <div class="col-4"><label for="min_widthExteriorPathway"> Pathway is minimum width and free of obstacles: </label><input class="form-control" id="min_widthExteriorPathway" data-bind="value: min_width, hasfocus: min_width.focused"></div>
                                        <div class="col-4"><label for="pathway_surface"> Pathway surface is level, unbroken, firm, slip-resistant: </label><input class="form-control" id="pathway_surface" data-bind="value: pathway_surface, hasfocus: pathway_surface.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="pathway_curbs"> Route has curb ramps and curb cuts where needed: </label><input class="form-control" id="pathway_curbs" data-bind="value: pathway_curbs, hasfocus: pathway_curbs.focused"></div>
                                        <div class="col-4"><label for="tactile_warningExteriorPathway"> Tactile warning strips are installed: </label><input class="form-control" id="tactile_warningExteriorPathway" data-bind="value: tactile_warning, hasfocus: tactile_warning.focused"></div>
                                        <div class="col-4"><label for="slope"> Slope of the pathway is no steeper than 1:20: </label><input class="form-control" id="slope" data-bind="value: slope, hasfocus: slope.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="lightingExteriorPathway"> Lighting is adequate: </label><input class="form-control" id="lightingExteriorPathway" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-4"><label for="lighting_optionExteriorPathway"> Lighting level day/night: </label><input class="form-control" id="lighting_optionExteriorPathway" data-bind="value: lighting_option, hasfocus: lighting_option.focused"></div>
                                        <div class="col-4"><label for="lighting_typeExteriorPathway"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeExteriorPathway" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentExteriorPathway"> Describe the route: </label><input class="form-control" id="commentExteriorPathway" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsExteriorPathway"> Recommendations: </label><input class="form-control" id="recommendationsExteriorPathway" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="ext_path_id" data-bind="value: ext_path_id">
                                        <input type="hidden" class="form-control" id="est_idExteriorPathway" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_exterior_pathways" class="btn btn-success" onclick="updateExteriorPathways()"><i class="fas fa-save"></i>&nbsp; Save Exterior Pathways</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Exterior Stairs -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerSeven"  data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                <div>
                                    <a name="exterior-stairs"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Exterior Stairs
                                </div>
                            </div>
                            <div id="collapseSeven" class="collapse form-group" aria-labelledby="headingSeven" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: exteriorStairsVM.exteriorStairsList">
                                    <div class="card-row">
                                        <div class="col-4"><label for="stairs_required"> Stairs are required: </label> <input class="form-control" id="stairs_required" data-bind="value: stairs_required,hasfocus: stairs_required.focused" ></div>
                                        <div class="col-4"><label for="stairs_available"> Stairs are available: </label> <input class="form-control" id="stairs_available" data-bind="value: stairs_available,hasfocus: stairs_available.focused" ></div>
                                        <div class="col-4"><label for="num_stairs"> Number of stairs: </label> <input class="form-control" id="num_stairs" data-bind="value: num_stairs,hasfocus: num_stairs.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="handrail_both_sides"> Both sides of stairs have handrails: </label> <input class="form-control" id="handrail_both_sides" data-bind="value: handrail_both_sides,hasfocus: handrail_both_sides.focused" ></div>
                                        <div class="col-6"><label for="handrail_side"> Handrail sides Left/Right/None: </label><input class="form-control" id="handrail_side" data-bind="value: handrail_side, hasfocus: handrail_side.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-8"><label for="handrail_regulation_height"> Top of the handrail gripping surface is between 34” and 38” above the stair surface: </label><input class="form-control" id="handrail_regulation_height" data-bind="value: handrail_regulation_height, hasfocus: handrail_regulation_height.focused"></div>
                                        <div class="col-4"><label for="handrail_height"> Handrail height: </label><input class="form-control" id="handrail_height" data-bind="value: handrail_height, hasfocus: handrail_height.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="obstacles"> Stairs are clear of obstacles or protrusions: </label><input class="form-control" id="obstacles" data-bind="value: obstacles, hasfocus: obstacles.focused"></div>
                                        <div class="col-6"><label for="clearly_marked"> Stairs are clearly marked: </label><input class="form-control" id="clearly_marked" data-bind="value: clearly_marked, hasfocus: clearly_marked.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="lightingExteriorStairs"> Lighting is adequate: </label><input class="form-control" id="lightingExteriorStairs" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-4"><label for="lighting_optionExteriorStairs"> Lighting level day/night: </label><input class="form-control" id="lighting_optionExteriorStairs" data-bind="value: lighting_option, hasfocus: lighting_option.focused"></div>
                                        <div class="col-4"><label for="lighting_typeExteriorStairs"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeExteriorStairs" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentExteriorStairs"> Describe the route: </label><input class="form-control" id="commentExteriorStairs" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsExteriorStairs"> Recommendations: </label><input class="form-control" id="recommendationsExteriorStairs" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="ext_stair_id" data-bind="value: ext_stair_id">
                                        <input type="hidden" class="form-control" id="est_idExteriorStairs" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_exterior_stairs" class="btn btn-success" onclick="updateExteriorStairs()"><i class="fas fa-save"></i>&nbsp; Save Exterior Stairs</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Exterior Ramps -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerEight"  data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                <div>
                                    <a name="exterior-ramps"></a>
                                    <i class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Exterior Ramps
                                </div>
                            </div>
                            <div id="collapseEight" class="collapse form-group" aria-labelledby="headingEight" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: exteriorRampsVM.exteriorRampsList">
                                    <div class="card-row">
                                        <div class="col-3"><label for="ramp_required"> Ramps are required: </label> <input class="form-control" id="ramp_required" data-bind="value: ramp_required,hasfocus: ramp_required.focused" ></div>
                                        <div class="col-3"><label for="ramp_available"> Ramps are available: </label> <input class="form-control" id="ramp_available" data-bind="value: ramp_available,hasfocus: ramp_available.focused" ></div>
                                        <div class="col-3"><label for="min_widthExteriorRamps"> Ramps are at least 36 inches wide: </label> <input class="form-control" id="min_widthExteriorRamps" data-bind="value: min_width,hasfocus: min_width.focused" ></div>
                                        <div class="col-3"><label for="width_between_handrails"> Ramps width: </label> <input class="form-control" id="width_between_handrails" data-bind="value: width_between_handrails,hasfocus: width_between_handrails.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="min_slope"> For each section of ramp, the RUNNING SLOPE is no greater than 1:12: </label> <input class="form-control" id="min_slope" data-bind="value: min_slope,hasfocus: min_slope.focused" ></div>
                                        <div class="col-6"><label for="slopeExteriorRamps"> Alternatively, the slope is less than 2 percent grade (%): </label><input class="form-control" id="slopeExteriorRamps" data-bind="value: slope, hasfocus: slope.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="level_landing_both"> There is a level landing at the top and bottom of the ramp: </label> <input class="form-control" id="level_landing_both" data-bind="value: level_landing_both,hasfocus: level_landing_both.focused" ></div>
                                        <div class="col-4"><label for="level_landing_location"> Landing location Top/Bottom: </label><input class="form-control" id="level_landing_location" data-bind="value: level_landing_location, hasfocus: level_landing_location.focused"></div>
                                        <div class="col-4"><label for="obstaclesExteriorRamps"> Ramps are clear of obstacles or protrusions: </label><input class="form-control" id="obstaclesExteriorRamps" data-bind="value: obstacles, hasfocus: obstacles.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="handrail_both_sides"> Both sides of stairs have handrails: </label> <input class="form-control" id="handrails_both_sides" data-bind="value: handrails_both_sides,hasfocus: handrail_both_sides.focused" ></div>
                                        <div class="col-6"><label for="handrail_sides"> Handrail sides Left/Right/None: </label><input class="form-control" id="handrail_sides" data-bind="value: handrail_sides, hasfocus: handrail_sides.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="handrail_regulation_heightExteriorRamps"> Top of the handrail gripping surface is between 34” and 38” above the stair surface: </label><input class="form-control" id="handrail_regulation_heightExteriorRamps" data-bind="value: handrail_regulation_height, hasfocus: handrail_regulation_height.focused"></div>
                                        <div class="col-4"><label for="handrail_heightExteriorRamps"> Handrail height: </label><input class="form-control" id="handrail_heightExteriorRamps" data-bind="value: handrail_height, hasfocus: handrail_height.focused"></div>
                                        <div class="col-4"><label for="side_guards"> Ramps have adequate side guards: </label><input class="form-control" id="side_guards" data-bind="value: side_guards, hasfocus: side_guards.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="lightingExteriorRamps"> Lighting is adequate: </label><input class="form-control" id="lightingExteriorRamps" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-4"><label for="lighting_optionExteriorRamps"> Lighting level day/night: </label><input class="form-control" id="lighting_optionExteriorRamps" data-bind="value: lighting_option, hasfocus: lighting_option.focused"></div>
                                        <div class="col-4"><label for="lighting_typeExteriorRamps"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeExteriorRamps" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentExteriorRamps"> Describe the route: </label><input class="form-control" id="commentExteriorRamps" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsExteriorRamps"> Recommendations: </label><input class="form-control" id="recommendationsExteriorRamps" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="ext_ramp_id" data-bind="value: ext_ramp_id">
                                        <input type="hidden" class="form-control" id="est_idExteriorRamps" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_exterior_ramps" class="btn btn-success" onclick="updateExteriorRamps()"><i class="fas fa-save"></i>&nbsp; Save Exterior Ramps</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Main Entrance -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerNine"  data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                <div>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Main Entrance
                                </div>
                            </div>
                            <div id="collapseNine" class="collapse form-group" aria-labelledby="headingNine" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: mainEntranceVM.mainEntranceList">
                                    <div class="card-row">
                                        <div class="col-6"><label for="total_num_public_entrances"> Total number of public entrances: </label> <input class="form-control" id="total_num_public_entrances" data-bind="value: total_num_public_entrances,hasfocus: total_num_public_entrances.focused" ></div>
                                        <div class="col-6"><label for="main_ent_accessible"> Main entrance is accessible: </label> <input class="form-control" id="main_ent_accessible" data-bind="value: main_ent_accessible,hasfocus: main_ent_accessible.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="alt_ent_accessible"> Alternative accessible entrance can be used independently during same hours: </label> <input class="form-control" id="alt_ent_accessible" data-bind="value: alt_ent_accessible,hasfocus: alt_ent_accessible.focused" ></div>
                                        <div class="col-6"><label for="accessable_signage"> There is signage to direct patrons to the wheelchair accessible entrance: </label> <input class="form-control" id="accessable_signage" data-bind="value: accessable_signage,hasfocus: accessable_signage.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="ground_level"> The ground or floor is level inside and outside the accessible entrance: </label> <input class="form-control" id="ground_level" data-bind="value: ground_level,hasfocus: ground_level.focused" ></div>
                                        <div class="col-6"><label for="threshold_level"> Threshold of entrance is level: </label><input class="form-control" id="threshold_level" data-bind="value: threshold_level, hasfocus: threshold_level.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="threshold_beveled"> If threshold is beveled, it is no more than 1/2 inch high with the top 1/4 inch beveled: </label> <input class="form-control" id="threshold_beveled" data-bind="value: threshold_beveled,hasfocus: threshold_beveled.focused" ></div>
                                        <div class="col-6"><label for="beveled_height"> Height: </label><input class="form-control" id="beveled_height" data-bind="value: beveled_height, hasfocus: beveled_height.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="door_action"> As you enter the door opens: </label><input class="form-control" id="door_action" data-bind="value: door_action, hasfocus: door_action.focused"></div>
                                        <div class="col-4"><label for="door_open_clearance"> Doors have at least 32” clearance when open at 90 degrees: </label> <input class="form-control" id="door_open_clearance" data-bind="value: door_open_clearance,hasfocus: door_open_clearance.focused" ></div>
                                        <div class="col-4"><label for="opening_measurement"> Opening measurement (inches): </label><input class="form-control" id="opening_measurement" data-bind="value: opening_measurement, hasfocus: opening_measurement.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="door_easy_open"> Doors are easy to open: </label><input class="form-control" id="door_easy_open" data-bind="value: door_easy_open, hasfocus: door_easy_open.focused"></div>
                                        <div class="col-4"><label for="door_open_force"> Actual lbs of force: </label><input class="form-control" id="door_open_force" data-bind="value: door_open_force, hasfocus: door_open_force.focused"></div>
                                        <div class="col-4"><label for="door_use_with_fist"> Door handles can be opened and shut with a closed fist: </label><input class="form-control" id="door_use_with_fist" data-bind="value: door_use_with_fist, hasfocus: door_use_with_fist.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="door_auto_open"> Door(s) open automatically or with a push button: </label><input class="form-control" id="door_auto_open" data-bind="value: door_auto_open, hasfocus: door_auto_open.focused"></div>
                                        <div class="col-4"><label for="second_door_inside"> There is a second door or set of doors inside the accessible entry: </label><input class="form-control" id="second_door_inside" data-bind="value: second_door_inside, hasfocus: second_door_inside.focused"></div>
                                        <div class="col-4"><label for="min_dist_between_doors"> Distance between outer door and inner door is at least 48” plus door clearance(s): </label><input class="form-control" id="min_dist_between_doors" data-bind="value: min_dist_between_doors, hasfocus: min_dist_between_doors.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="lightingMainEntrance"> Lighting is adequate: </label><input class="form-control" id="lightingMainEntrance" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-4"><label for="lighting_optionMainEntrance"> Lighting level day/night: </label><input class="form-control" id="lighting_optionMainEntrance" data-bind="value: lighting_option, hasfocus: lighting_option.focused"></div>
                                        <div class="col-4"><label for="lighting_typeMainEntrance"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeMainEntrance" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentMainEntrance"> Describe accessible entrance: </label><input class="form-control" id="commentMainEntrance" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsMainEntrance"> Recommendations: </label><input class="form-control" id="recommendationsMainEntrance" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="main_ent_id" data-bind="value: main_ent_id">
                                        <input type="hidden" class="form-control" id="est_idMainEntrance" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_main_entrance" class="btn btn-success" onclick="updateMainEntrance()"><i class="fas fa-save"></i>&nbsp; Save Main Entrance</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Interior -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerTen"  data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                <div>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Interior
                                </div>
                            </div>
                            <div id="collapseTen" class="collapse form-group" aria-labelledby="headingTen" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: interiorVM.interiorList">
                                    <div class="card-row">
                                        <div class="col-6"><label for="int_door_open_clearance"> Doors have at least 32” clearance when open at 90 degrees: </label> <input class="form-control" id="int_door_open_clearance" data-bind="value: int_door_open_clearance,hasfocus: int_door_open_clearance.focused" ></div>
                                        <div class="col-6"><label for="int_opening_measurement"> Opening measurement (inches): </label> <input class="form-control" id="int_opening_measurement" data-bind="value: int_opening_measurement,hasfocus: int_opening_measurement.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="int_door_easy_open"> Doors are easy to open: </label> <input class="form-control" id="int_door_easy_open" data-bind="value: int_door_easy_open,hasfocus: int_door_easy_open.focused" ></div>
                                        <div class="col-6"><label for="int_door_open_force"> Actual lbs of force: </label> <input class="form-control" id="int_door_open_force" data-bind="value: int_door_open_force,hasfocus: int_door_open_force.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="int_door_use_with_fist"> Door handles can be opened and shut with a closed fist, open automatically, or push button: </label> <input class="form-control" id="int_door_use_with_fist" data-bind="value: int_door_use_with_fist,hasfocus: int_door_use_with_fist.focused" ></div>
                                        <div class="col-6"><label for="five_second_close"> Doors take 5 seconds or longer to close: </label><input class="form-control" id="five_second_close" data-bind="value: five_second_close, hasfocus: five_second_close.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="hallway_width"> Hallways and ​aisles are min. 36” WIDE, or not less than 28” for 4 foot intervals: </label> <input class="form-control" id="hallway_width" data-bind="value: hallway_width,hasfocus: hallway_width.focused" ></div>
                                        <div class="col-6"><label for="narrowest_width"> Narrowest width (inches): </label><input class="form-control" id="narrowest_width" data-bind="value: narrowest_width, hasfocus: narrowest_width.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="wheelchair_turnaround"> There are locations that allow 60” space for a wheelchair to turn around: </label><input class="form-control" id="wheelchair_turnaround" data-bind="value: wheelchair_turnaround, hasfocus: wheelchair_turnaround.focused"></div>
                                        <div class="col-4"><label for="hallway_obstacles"> Hallways and aisles are clear of obstacles and tripping hazards: </label> <input class="form-control" id="hallway_obstacles" data-bind="value: hallway_obstacles,hasfocus: hallway_obstacles.focused" ></div>
                                        <div class="col-4"><label for="hallway_clear"> Hallways are clear of objects protruding more than 4” or lower than 80”: </label><input class="form-control" id="hallway_clear" data-bind="value: hallway_clear, hasfocus: hallway_clear.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="lightingInterior"> Lighting is adequate: </label><input class="form-control" id="lightingInterior" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-6"><label for="lighting_typeInterior"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeInterior" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="service_counter"> Lowest ​service counter is no higher than 38” ​with a clear view from a sitting position, and a check writing surface is no higher than 34”: </label><input class="form-control" id="service_counter" data-bind="value: service_counter, hasfocus: service_counter.focused"></div>
                                        <div class="col-3"><label for="counter_height"> Service counter height (inches): </label><input class="form-control" id="counter_height" data-bind="value: counter_height, hasfocus: counter_height.focused"></div>
                                        <div class="col-3"><label for="writing_surface_height"> Writing surface height (inches): </label><input class="form-control" id="writing_surface_height" data-bind="value: writing_surface_height, hasfocus: writing_surface_height.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="drinking_fountain"> Accessible drinking fountain with spout no higher than 36”, and easy to operate controls: </label><input class="form-control" id="drinking_fountain" data-bind="value: drinking_fountain, hasfocus: drinking_fountain.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentInterior"> Describe accessible entrance: </label><input class="form-control" id="commentInterior" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsInterior"> Recommendations: </label><input class="form-control" id="recommendationsInterior" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="interior_id" data-bind="value: interior_id">
                                        <input type="hidden" class="form-control" id="est_idInterior" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_interior" class="btn btn-success" onclick="updateInterior()"><i class="fas fa-save"></i>&nbsp; Save Interior</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Elevator -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerEleven"  data-toggle="collapse" data-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                                <div>
                                    <a name="elevator"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Elevator
                                </div>
                            </div>
                            <div id="collapseEleven" class="collapse form-group" aria-labelledby="headingEleven" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: elevatorVM.elevatorList">
                                    <div class="card-row">
                                        <div class="col-3"><label for="is_elevator"> Is there ​at least one elevator ​or lift: </label> <input class="form-control" id="is_elevator" data-bind="value: is_elevator,hasfocus: is_elevator.focused" ></div>
                                        <div class="col-9"><label for="location"> Where is nearest elevator or lift located in relation to the accessible entrance: </label> <input class="form-control" id="location" data-bind="value: location,hasfocus: location.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="works"> The elevator or lift works properly: </label> <input class="form-control" id="works" data-bind="value: works,hasfocus: works.focused" ></div>
                                        <div class="col-6"><label for="no_assist"> Users can operate elevator or lift without having to find someone to assist or provide a key: </label> <input class="form-control" id="no_assist" data-bind="value: no_assist,hasfocus: no_assist.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label for="button_height"> Buttons are no higher than 48” and no lower than 15”: </label> <input class="form-control" id="button_height" data-bind="value: button_height,hasfocus: button_height.focused" ></div>
                                        <div class="col-3"><label for="outside_btn_height"> Outside button height (inches): </label><input class="form-control" id="outside_btn_height" data-bind="value: outside_btn_height, hasfocus: outside_btn_height.focused"></div>
                                        <div class="col-3"><label for="inside_btn_height"> Inside button height (inches): </label> <input class="form-control" id="inside_btn_height" data-bind="value: inside_btn_height,hasfocus: inside_btn_height.focused" ></div>
                                        <div class="col-3"><label for="button_use_fist"> Buttons are easy to press with closed fist: </label><input class="form-control" id="button_use_fist" data-bind="value: button_use_fist, hasfocus: button_use_fist.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="braille"> Buttons ​and signs ​have braille markings ​and raised letters/numbers: </label><input class="form-control" id="braille" data-bind="value: braille, hasfocus: braille.focused"></div>
                                        <div class="col-6"><label for="audible_tones"> Elevator or lift uses ​audible tones as well as visible signals : </label> <input class="form-control" id="audible_tones" data-bind="value: audible_tones,hasfocus: audible_tones.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="lightingElevator"> Lighting is adequate: </label><input class="form-control" id="lightingElevator" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-6"><label for="lighting_typeElevator"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeElevator" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="elevator_depth"> Elevator interior is at least 54” DEEP ​ ​from door to the back : </label><input class="form-control" id="elevator_depth" data-bind="value: elevator_depth, hasfocus: elevator_depth.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentElevator"> Describe accessible entrance: </label><input class="form-control" id="commentElevator" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsElevator"> Recommendations: </label><input class="form-control" id="recommendationsElevator" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="elevator_id" data-bind="value: elevator_id">
                                        <input type="hidden" class="form-control" id="est_idElevator" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_elevator" class="btn btn-success" onclick="updateElevator()"><i class="fas fa-save"></i>&nbsp; Save Elevator</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Signage -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerTwelve"  data-toggle="collapse" data-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                                <div>
                                    <a name="signage"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Signage
                                </div>
                            </div>
                            <div id="collapseTwelve" class="collapse form-group" aria-labelledby="headingTwelve" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: signageVM.signageList">
                                    <div class="card-row">
                                        <div class="col-4"><label for="is_directory"> There is a directory at all accessible entrances to help visitors to find their way: </label> <input class="form-control" id="is_directory" data-bind="value: is_directory,hasfocus: is_directory.focused" ></div>
                                        <div class="col-4"><label for="door_signs"> Door signs are on latch side of door, between 48” and 60” from floor: </label> <input class="form-control" id="door_signs" data-bind="value: door_signs,hasfocus: door_signs.focused" ></div>
                                        <div class="col-4"><label for="sign_height"> Height of signs (inches): </label> <input class="form-control" id="sign_height" data-bind="value: sign_height,hasfocus: sign_height.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="pub_sign_braile"> Public signs have Braille: </label> <input class="form-control" id="pub_sign_braile" data-bind="value: pub_sign_braile,hasfocus: pub_sign_braile.focused" ></div>
                                        <div class="col-4"><label for="sign_high_contrast"> Signs have raised, high contrast lettering, ​low glare background: </label> <input class="form-control" id="sign_high_contrast" data-bind="value: sign_high_contrast,hasfocus: sign_high_contrast.focused" ></div>
                                        <div class="col-4"><label for="sign_images"> Signs include images, illustrations, or icons: </label><input class="form-control" id="sign_images" data-bind="value: sign_images, hasfocus: sign_images.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="written_material_images"> Written material (menus, etc.) includes images or illustrations: </label> <input class="form-control" id="written_material_images" data-bind="value: written_material_images,hasfocus: written_material_images.focused" ></div>
                                        <div class="col-6"><label for="menu_access"> There is a large print menu, Braille menu, and/ or on­line accessible menu: </label><input class="form-control" id="menu_access" data-bind="value: menu_access, hasfocus: menu_access.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="alt_info"> Information is available in alternative formats: </label><input class="form-control" id="alt_info" data-bind="value: alt_info, hasfocus: alt_info.focused"></div>
                                        <div class="col-6"><label for="alt_info_type"> Type of alternative format Braille/Large print/Recorded audio/Video: </label> <input class="form-control" id="alt_info_type" data-bind="value: alt_info_type,hasfocus: alt_info_type.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentSignage"> Comments: </label><input class="form-control" id="commentSignage" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsSignage"> Recommendations: </label><input class="form-control" id="recommendationsSignage" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="sign_id" data-bind="value: sign_id">
                                        <input type="hidden" class="form-control" id="est_idSignage" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_signage" class="btn btn-success" onclick="updateSignage()"><i class="fas fa-save"></i>&nbsp; Save Signage</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Emergency Preparedness -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerThirteen"  data-toggle="collapse" data-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
                                <div>
                                    <a name="emergency_preparedness"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Emergency Preparedness
                                </div>
                            </div>
                            <div id="collapseThirteen" class="collapse form-group" aria-labelledby="headingThirteen" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: emergencyVM.emergencyList">
                                    <div class="card-row">
                                        <div class="col-4"><label for="evac_info"> Evacuation and safety information is available in a visible location: </label> <input class="form-control" id="evac_info" data-bind="value: evac_info,hasfocus: evac_info.focused" ></div>
                                        <div class="col-4"><label for="alt_evac_info"> Evacuation and safety information is available in alternative format: </label> <input class="form-control" id="alt_evac_info" data-bind="value: alt_evac_info,hasfocus: alt_evac_info.focused" ></div>
                                        <div class="col-4"><label for="evac_info_format"> Type of alternative format Braille/Large print/Recorded audio/Video: </label> <input class="form-control" id="evac_info_format" data-bind="value: evac_info_format,hasfocus: evac_info_format.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="alarms"> Emergency alarms both audible and visible: </label> <input class="form-control" id="alarms" data-bind="value: alarms,hasfocus: alarms.focused" ></div>
                                        <div class="col-4"><label for="location_no_flash"> There is an emergency location available where there are no flashing alarms: </label> <input class="form-control" id="location_no_flash" data-bind="value: location_no_flash,hasfocus: sign_high_contrast.focused" ></div>
                                        <div class="col-4"><label for="shelter"> There is an area of refuge, shelter in place during emergencies: </label><input class="form-control" id="shelter" data-bind="value: shelter, hasfocus: shelter.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="signs_to_exit"> Signs direct patrons to exits, safety zone, fire extinguishers and alarm pull boxes: </label> <input class="form-control" id="signs_to_exit" data-bind="value: signs_to_exit,hasfocus: signs_to_exit.focused" ></div>
                                        <div class="col-6"><label for="wheelchair_plan"> There is a plan for evacuating persons using wheelchairs in case elevators are inoperable: </label><input class="form-control" id="wheelchair_plan" data-bind="value: wheelchair_plan, hasfocus: wheelchair_plan.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="floor_plan_routes"> Posted floor plans show emergency routes, and locations of fire extinguishers and alarm pull boxes: </label><input class="form-control" id="floor_plan_routes" data-bind="value: floor_plan_routes, hasfocus: floor_plan_routes.focused"></div>
                                        <div class="col-4"><label for="fire_alarm_height"> Fire alarms pull boxes are no higher than 48”: </label> <input class="form-control" id="fire_alarm_height" data-bind="value: fire_alarm_height,hasfocus: fire_alarm_height.focused" ></div>
                                        <div class="col-4"><label for="fire_extinguisher_height"> Fire extinguishers are mounted with bottom no higher than 48”: </label> <input class="form-control" id="fire_extinguisher_height" data-bind="value: fire_extinguisher_height,hasfocus: fire_extinguisher_height.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentEmergency_Preparedness"> Comments: </label><input class="form-control" id="commentEmergency_Preparedness" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsEmergency_Preparedness"> Recommendations: </label><input class="form-control" id="recommendationsEmergency_Preparedness" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="emergency_id" data-bind="value: emergency_id">
                                        <input type="hidden" class="form-control" id="est_idEmergency_Preparedness" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_emergency_preparedness" class="btn btn-success" onclick="updateEmergencyPreparedness()"><i class="fas fa-save"></i>&nbsp; Save Emergency Preparedness</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Seating -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerFourteen"  data-toggle="collapse" data-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">
                                <div>
                                    <a name="seating"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Seating
                                </div>
                            </div>
                            <div id="collapseFourteen" class="collapse form-group" aria-labelledby="headingFourteen" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: seatingVM.seatingList">
                                    <div class="card-row">
                                        <div class="col-6"><label for="seating_no_step"> One or more seating areas in the common area can be accessed without steps: </label> <input class="form-control" id="seating_no_step" data-bind="value: seating_no_step,hasfocus: seating_no_step.focused" ></div>
                                        <div class="col-6"><label for="table_aisles"> Customers can maneuver between tables without bumping into chairs (36” aisles)​: </label> <input class="form-control" id="table_aisles" data-bind="value: table_aisles,hasfocus: table_aisles.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="legroom"> There are tables with ​legroom for wheelchair users (bottom of table = 27 ​ to 34”): </label> <input class="form-control" id="legroom" data-bind="value: legroom,hasfocus: legroom.focused" ></div>
                                        <div class="col-6"><label for="num_legroom"> Number of tables with legroom #/All: </label> <input class="form-control" id="num_legroom" data-bind="value: num_legroom,hasfocus: num_legroom.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="rearranged"> There are tables and chairs that can be moved or rearranged: </label> <input class="form-control" id="rearranged" data-bind="value: rearranged,hasfocus: rearranged.focused" ></div>
                                        <div class="col-4"><label for="num_table_rearranged"> Number of tables that can be moved #/All: </label><input class="form-control" id="num_table_rearranged" data-bind="value: num_table_rearranged, hasfocus: num_table_rearranged.focused"></div>
                                        <div class="col-4"><label for="num_chair_rearranged"> Number of chairs that can be moved #/All: </label><input class="form-control" id="num_chair_rearranged" data-bind="value: num_chair_rearranged, hasfocus: num_chair_rearranged.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="round_tables"> There are round or oval tables that can seat 5­9 individuals: </label> <input class="form-control" id="round_tables" data-bind="value: round_tables,hasfocus: round_tables.focused" ></div>
                                        <div class="col-6"><label for="num_round_tables"> Number of round/oval tables: </label><input class="form-control" id="num_round_tables" data-bind="value: num_round_tables, hasfocus: num_round_tables.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="lightingSeating"> Lighting is adequate: </label><input class="form-control" id="lightingSeating" data-bind="value: lighting, hasfocus: lighting.focused"></div>
                                        <div class="col-4"><label for="lighting_optionSeating"> Lighting level day/night: </label><input class="form-control" id="lighting_optionSeating" data-bind="value: lighting_option, hasfocus: lighting_option.focused"></div>
                                        <div class="col-4"><label for="lighting_typeSeating"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeSeating" data-bind="value: lighting_type, hasfocus: lighting_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="adjustable_lighting"> There are one or more available spaces with adjustable lighting: </label><input class="form-control" id="adjustable_lighting" data-bind="value: adjustable_lighting, hasfocus: adjustable_lighting.focused"></div>
                                        <div class="col-6"><label for="low_visual_slim"> There are one or more areas with low visual stimulation: </label> <input class="form-control" id="low_visual_slim" data-bind="value: low_visual_slim,hasfocus: low_visual_slim.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="quiet_table"> There is a quiet table, room or area available on request: </label><input class="form-control" id="quiet_table" data-bind="value: quiet_table, hasfocus: quiet_table.focused"></div>
                                        <div class="col-6"><label for="low_sound"> There is an area with low or no background sound, and/or that has sound­absorbing surfaces: </label> <input class="form-control" id="low_sound" data-bind="value: low_sound,hasfocus: low_sound.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="designated_space"> For theater or auditorium, there are spaces designated for wheelchair users that have the same general views as the rest of the audience when the person is seated: </label><input class="form-control" id="designated_space" data-bind="value: designated_space, hasfocus: designated_space.focused"></div>
                                        <div class="col-4"><label for="num_desig_space"> Number of designated spaces: </label> <input class="form-control" id="num_desig_space" data-bind="value: num_desig_space,hasfocus: num_desig_space.focused" ></div>
                                        <div class="col-4"><label for="companion_space"> There are spaces for companions to sit next to the wheelchair users: </label> <input class="form-control" id="companion_space" data-bind="value: companion_space,hasfocus: companion_space.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentSeating"> Comments: </label><input class="form-control" id="commentSeating" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsSeating"> Recommendations: </label><input class="form-control" id="recommendationsSeating" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="seating_id" data-bind="value: seating_id">
                                        <input type="hidden" class="form-control" id="est_idSeating" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_seating" class="btn btn-success" onclick="updateSeating()"><i class="fas fa-save"></i>&nbsp; Save Seating</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Restroom Cover Page -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerFifteen"  data-toggle="collapse" data-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">
                                <div>
                                    <a name="restroom"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Restroom
                                </div>
                            </div>
                            <div id="collapseFifteen" class="collapse form-group" aria-labelledby="headingFifteen" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: restroomVM.restroomList">
                                    <div class="card-row">
                                        <div class="col-6"><label for="public_restroom"> Public restrooms ​are available near or ​at the location: </label> <input class="form-control" id="public_restroom" data-bind="value: public_restroom,hasfocus: public_restroom.focused" ></div>
                                        <div class="col-6"><label for="total_num"> Total number of public restrooms: </label> <input class="form-control" id="total_num" data-bind="value: total_num,hasfocus: total_num.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="designated_number"> Number of accessible restrooms designated “family”, “unisex”, or “assisted use”: </label> <input class="form-control" id="designated_number" data-bind="value: designated_number,hasfocus: designated_number.focused" ></div>
                                        <div class="col-6"><label for="num_wheelchair_sign"> Number of restrooms that have “Wheelchair Accessible” signs: </label> <input class="form-control" id="num_wheelchair_sign" data-bind="value: num_wheelchair_sign,hasfocus: num_wheelchair_sign.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="sign_accessable"> Restrooms signs have high contrast, Braille, raised lettering, low glare background: </label> <input class="form-control" id="sign_accessable" data-bind="value: sign_accessable,hasfocus: sign_accessable.focused" ></div>
                                        <div class="col-4"><label for="sign_location"> Signage is on latch side of door between 48” and 60” above floor: </label><input class="form-control" id="sign_location" data-bind="value: sign_location, hasfocus: sign_location.focused"></div>
                                        <div class="col-4"><label for="key_needed"> Users do not need to ask someone for a KEY to use the restroom: </label><input class="form-control" id="key_needed" data-bind="value: key_needed, hasfocus: key_needed.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentRestroom"> Describe the restroom(s): </label><input class="form-control" id="commentRestroom" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsRestroom"> Recommendations: </label><input class="form-control" id="recommendationsRestroom" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="restroom_id" data-bind="value: restroom_id">
                                        <input type="hidden" class="form-control" id="est_idRestroom" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_restroom" class="btn btn-success" onclick="updateRestroom()"><i class="fas fa-save"></i>&nbsp; Save Seating</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Restroom Information -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerSixteen"  data-toggle="collapse" data-target="#collapseSixteen" aria-expanded="false" aria-controls="collapseSixteen">
                                <div>
                                    <a name="restroom_info"></a>
                                    <i  class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Restroom Information
                                </div>
                            </div>
                            <div id="collapseSixteen" class="collapse form-group" aria-labelledby="headingSixteen" data-parent="#accordion">
                                <div class="card-body card-border card-body-color-add" data-bind="foreach: restroomInfoVM.restroomInfoList">
                                    <div class="card-row">
                                        <input type="hidden" class="form-control" data-bind="attr:{id : 'rest_info_id_'+($index() + 1)}, value: rest_info_id">
                                        <input type="hidden" class="form-control" data-bind="attr:{id : 'rest_id_'+($index() + 1)}, value: rest_id">
                                        <div class="col-2">
                                            <label for="restroom_number"> Restroom Number: </label>
                                            <input class="form-control" id="restroom_number" data-bind="value: ($index() + 1)" readonly>
                                        </div>
                                        <div class="col-10">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button data-bind="attr:{id: \'edit_restroom_\'+($index() + 1) }, click: editRestroomInfo.bind($data, $index() + 1) " class="btn btn-warning edit-text pointer"><i class="fas fa-edit"></i>&nbsp; Edit Restroom</button>';
                                            } ?>
                                        </div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label data-bind="attr:{for: 'restroom_desc_'+($index() + 1) }"> Identify this bathroom rated with location and other information (i.e. 1st floor front women): </label> <input class="form-control" data-bind="attr:{id: 'restroom_desc_'+($index() + 1) }, value: restroom_desc,hasfocus: restroom_desc.focused" readonly ></div>
                                        <div class="col-4"><label data-bind="attr:{for: 'easy_open_'+($index() + 1) }">  Room door is easy to open, requiring 5 lb. or less force: </label> <input class="form-control" data-bind="attr:{id: 'easy_open_'+($index() + 1) }, value: easy_open,hasfocus: easy_open.focused" readonly ></div>
                                        <div class="col-4"><label data-bind="attr:{for: 'lbs_force_'+($index() + 1) }"> Actual force - lbs. or light/ med/ heavy: </label> <input class="form-control" data-bind="attr:{id: 'lbs_force_'+($index() + 1) }, value: lbs_force,hasfocus: lbs_force.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label data-bind="attr:{for: 'clearance_'+($index() + 1) }"> Stall/Room door has at least 32” clearance when the door is open: </label> <input class="form-control" data-bind="attr:{id: 'clearance_'+($index() + 1) }, value: clearance,hasfocus: clearance.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'opening_'+($index() + 1) }"> Opening measurement (inches): </label> <input class="form-control" data-bind="attr:{id: 'opening_'+($index() + 1) }, value: opening,hasfocus: opening.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'opens_out_'+($index() + 1) }"> The stall door opens to the outside: </label><input class="form-control" data-bind="attr:{id: 'opens_out_'+($index() + 1) }, value: opens_out, hasfocus: opens_out.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'use_fist_'+($index() + 1) }"> The stall door can be opened, closed, and latched with a closed fist: </label><input class="form-control" data-bind="attr:{id: 'use_fist_'+($index() + 1) }, value: use_fist, hasfocus: use_fist.focused" readonly></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label data-bind="attr:{for: 'can_turn_around_'+($index() + 1) }"> The stall or room is large enough for a wheelchair or walker to turn around: </label> <input class="form-control" data-bind="attr:{id: 'can_turn_around_'+($index() + 1) }, value: can_turn_around,hasfocus: can_turn_around.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'turn_width_'+($index() + 1) }"> Stall/Room width (inches)​: </label> <input class="form-control" data-bind="attr:{id: 'turn_width_'+($index() + 1) }, value: turn_width,hasfocus: turn_width.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'turn_depth_'+($index() + 1) }"> Stall/Room depth (inches)​: </label> <input class="form-control" data-bind="attr:{id: 'turn_depth_'+($index() + 1) }, value: turn_depth,hasfocus: turn_depth.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'close_chair_inside_'+($index() + 1) }"> The stall/room door can be closed once a wheelchair is inside: </label> <input class="form-control" data-bind="attr:{id: 'close_chair_inside_'+($index() + 1) }, value: close_chair_inside,hasfocus: close_chair_inside.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label data-bind="attr:{for: 'grab_bars_'+($index() + 1) }"> Grab bars are easily reachable behind the toilet and on the side wall ​ nearest the toilet: </label> <input class="form-control" data-bind="attr:{id: 'grab_bars_'+($index() + 1) }, value: grab_bars,hasfocus: grab_bars.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'seat_height_req_'+($index() + 1) }"> The height of the toilet seat is at least 17” from the floor: </label><input class="form-control" data-bind="attr:{id: 'seat_height_req_'+($index() + 1) }, value: seat_height_req, hasfocus: seat_height_req.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'seat_height_'+($index() + 1) }"> Seat height (inches): </label><input class="form-control" data-bind="attr:{id: 'seat_height_'+($index() + 1) }, value: seat_height, hasfocus: seat_height.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'flush_auto_fist_'+($index() + 1) }"> The toilet flushes automatically, or can be operated with a closed fist: </label><input class="form-control" data-bind="attr:{id: 'flush_auto_fist_'+($index() + 1) }, value: flush_auto_fist, hasfocus: flush_auto_fist.focused" readonly></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label data-bind="attr:{for: 'ambulatory_accessible_'+($index() + 1) }"> If there are multiple stalls, at least one is ambulatory accessible with grab bars on either side and toilet height at least 17” from floor: </label> <input class="form-control" data-bind="attr:{id: 'ambulatory_accessible_'+($index() + 1) }, value: ambulatory_accessible,hasfocus: ambulatory_accessible.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'bar_height_'+($index() + 1) }"> Toilet height (inches): </label><input class="form-control" data-bind="attr:{id: 'bar_height_'+($index() + 1) }, value: bar_height, hasfocus: bar_height.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'coat_hook_'+($index() + 1) }"> If there is a coat hook, it is between 35” and 48” from the floor: </label><input class="form-control" data-bind="attr:{id: 'coat_hook_'+($index() + 1) }, value: coat_hook, hasfocus: coat_hook.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'hook_height_'+($index() + 1) }"> Hook height (inches): </label> <input class="form-control" data-bind="attr:{id: 'hook_height_'+($index() + 1) }, value: hook_height,hasfocus: hook_height.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label data-bind="attr:{for: 'sink_'+($index() + 1) }"> The height of the sink/countertop is 34” or less from the floor: </label><input class="form-control" data-bind="attr:{id: 'sink_'+($index() + 1) }, value: sink, hasfocus: sink.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'sink_height_'+($index() + 1) }"> Sink/Countertop height (inches): </label> <input class="form-control" data-bind="attr:{id: 'sink_height_'+($index() + 1) }, value: sink_height,hasfocus: sink_height.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'faucet_'+($index() + 1) }"> The faucet control is 17” or less from the front edge of the sink counter: </label><input class="form-control" data-bind="attr:{id: 'faucet_'+($index() + 1) }, value: faucet, hasfocus: faucet.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'faucet_depth_'+($index() + 1) }"> Faucet depth (inches): </label> <input class="form-control" data-bind="attr:{id: 'faucet_depth_'+($index() + 1) }, value: faucet_depth,hasfocus: faucet_depth.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label data-bind="attr:{for: 'faucet_auto_fist_'+($index() + 1) }"> Faucet​ can ​be operated ​automatically or ​with a closed fist: </label> <input class="form-control" data-bind="attr:{id: 'faucet_auto_fist_'+($index() + 1) }, value: faucet_auto_fist,hasfocus: faucet_auto_fist.focused" readonly ></div>
                                        <div class="col-4"><label data-bind="attr:{for: 'sink_clearance_'+($index() + 1) }"> There is room for a wheelchair to roll under the sink ​: </label><input class="form-control" data-bind="attr:{id: 'sink_clearance_'+($index() + 1) }, value: sink_clearance, hasfocus: sink_clearance.focused" readonly></div>
                                        <div class="col-4"><label data-bind="attr:{for: 'sink_clearance_height_'+($index() + 1) }"> Measurement (inches): </label> <input class="form-control" data-bind="attr:{id: 'sink_clearance_height_'+($index() + 1) }, value: sink_clearance_height,hasfocus: sink_clearance_height.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label data-bind="attr:{for: 'sink_pipes_'+($index() + 1) }"> If there are pipes under the sink, they are covered to prevent injury or burns: </label> <input class="form-control" data-bind="attr:{id: 'sink_pipes_'+($index() + 1) }, value: sink_pipes,hasfocus: sink_pipes.focused" readonly ></div>
                                        <div class="col-4"><label data-bind="attr:{for: 'soap_dispenser_'+($index() + 1) }"> The height of the soap dispenser control is 48” or less from the floor: </label> <input class="form-control" data-bind="attr:{id: 'soap_dispenser_'+($index() + 1) }, value: soap_dispenser,hasfocus: soap_dispenser.focused" readonly ></div>
                                        <div class="col-4"><label data-bind="attr:{for: 'soap_height_'+($index() + 1) }">  Soap dispenser height (inches): </label> <input class="form-control" data-bind="attr:{id: 'soap_height_'+($index() + 1) }, value: soap_height,hasfocus: soap_height.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label data-bind="attr:{for: 'dry_fist_'+($index() + 1) }">  Hand dryer or towel dispenser can be operated automatically or with closed fist: </label> <input class="form-control" data-bind="attr:{id: 'dry_fist_'+($index() + 1) }, value: dry_fist,hasfocus: dry_fist.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'dry_fist_type_'+($index() + 1) }"> Type Hand dryer/Towel dispenser: </label> <input class="form-control" data-bind="attr:{id: 'dry_fist_type_'+($index() + 1) }, value: dry_fist_type,hasfocus: dry_fist_type.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'dry_controls_'+($index() + 1) }"> Operation type - automatic/closed fist: </label> <input class="form-control" data-bind="attr:{id: 'dry_controls_'+($index() + 1) }, value: dry_controls,hasfocus: dry_controls.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'dry_control_height_'+($index() + 1) }"> Controls for hand dryer or towel dispenser are 48” or less from floor: </label> <input class="form-control" data-bind="attr:{id: 'dry_control_height_'+($index() + 1) }, value: dry_control_height,hasfocus: clearance.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label data-bind="attr:{for: 'mirror_'+($index() + 1) }"> If there is a mirror, the bottom edge is 40” or less from the floor: </label> <input class="form-control" data-bind="attr:{id: 'mirror_'+($index() + 1) }, value: mirror,hasfocus: mirror.focused" readonly ></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'mirror_height_'+($index() + 1) }"> Mirror height (inches): </label><input class="form-control" data-bind="attr:{id: 'mirror_height_'+($index() + 1) }, value: mirror_height, hasfocus: mirror_height.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'shelves_'+($index() + 1) }"> If there are shelves to set items, they are 48” or less from the floor: </label><input class="form-control" data-bind="attr:{id: 'shelves_'+($index() + 1) }, value: shelves, hasfocus: shelves.focused" readonly></div>
                                        <div class="col-3"><label data-bind="attr:{for: 'shelf_height_'+($index() + 1) }"> Shelf height (inches): </label> <input class="form-control" data-bind="attr:{id: 'shelf_height_'+($index() + 1) }, value: shelf_height,hasfocus: shelf_height.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label data-bind="attr:{for: 'trash_receptacles_'+($index() + 1) }"> Trash receptacles are positioned so they do not block the route to the door​: </label> <input class="form-control" data-bind="attr:{id: 'trash_receptacles_'+($index() + 1) }, value: trash_receptacles,hasfocus: trash_receptacles.focused" readonly ></div>
                                        <div class="col-4"><label data-bind="attr:{for: 'hygiene_seat_cover_'+($index() + 1) }"> Feminine hygiene product & toilet seat cover dispensers are 48” or less from floor: </label> <input class="form-control" data-bind="attr:{id: 'hygiene_seat_cover_'+($index() + 1) }, value: hygiene_seat_cover,hasfocus: hygiene_seat_cover.focused" readonly ></div>
                                        <div class="col-4"><label data-bind="attr:{for: 'hygiene_cover_height_'+($index() + 1) }"> Height (inches): </label> <input class="form-control" data-bind="attr:{id: 'hygiene_cover_height_'+($index() + 1) }, value: hygiene_cover_height,hasfocus: hygiene_cover_height.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label data-bind="attr:{for: 'lightingRestroomInfo_'+($index() + 1) }"> Lighting is adequate: </label><input class="form-control" data-bind="attr:{id: 'lightingRestroomInfo_'+($index() + 1) }, value: lighting, hasfocus: lighting.focused" readonly ></div>
                                        <div class="col-6"><label data-bind="attr:{for: 'lighting_typeRestroomInfo_'+($index() + 1) }"> Lighting level day/night: </label><input class="form-control" data-bind="attr:{id: 'lighting_typeRestroomInfo_'+($index() + 1) }, value: lighting_type, hasfocus: lighting_type.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label data-bind="attr:{for: 'commentRestroomInfo_'+($index() + 1) }"> Additional notes: </label><input class="form-control" data-bind="attr:{id: 'commentRestroomInfo_'+($index() + 1) }, value: comment, hasfocus: comment.focused" readonly ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label data-bind="attr:{for: 'recommendationsRestroomInfo_'+($index() + 1) }"> Recommendations: </label><input class="form-control" data-bind="attr:{id: 'recommendationsRestroomInfo_'+($index() + 1) }, value: recommendations, hasfocus: recommendations.focused" readonly ></div>
                                    </div>
                                    <div class="card-row-spacer">
                                        &nbsp;
                                    </div>
                                    <div class="card-row" data-bind="if: ($index()+1)%2 != 0">
                                        <div class="hr-restroom col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Communication Tech and Customer Service -->
                        <div class="card">
                            <div class="card-header phead-color pointer  non-link collapsed" id="headerSeventeen"  data-toggle="collapse" data-target="#collapseSeventeen" aria-expanded="false" aria-controls="collapseSeventeen">
                                <div>
                                    <i class="fas fa-plus-square fa-lg hover-green" aria-hidden="true"></i>&emsp;Communication Technologies & Customer Service
                                </div>
                            </div>
                            <div id="collapseSeventeen" class="collapse form-group" aria-labelledby="headingSeventeen" data-parent="#accordion">
                                <div d="communication" class="card-body card-border card-body-color-add" data-bind="foreach: communicationVM.communicationList">
                                    <div class="card-row">
                                        <div class="col-4"><label for="public_phone"> There is one or more public phones available w/adjustable volume control.: </label> <input class="form-control" id="public_phone" data-bind="value: public_phone,hasfocus: public_phone.focused" ></div>
                                        <div class="col-4"><label for="phone_clearance">  There are public phones w/ controls min 48” from floor, protruding < 4” from wall: </label> <input class="form-control" id="phone_clearance" data-bind="value: phone_clearance,hasfocus: phone_clearance.focused" ></div>
                                        <div class="col-4"><label for="num_phone"> Number of phones: </label> <input class="form-control" id="num_phone" data-bind="value: num_phone,hasfocus: num_phone.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label for="tty"> There is a TTY is available: </label> <input class="form-control" id="tty" data-bind="value: tty,hasfocus: tty.focused" ></div>
                                        <div class="col-3"><label for="staff_tty"> Staff are trained in use of TTY, and how to accept relay calls: </label> <input class="form-control" id="staff_tty" data-bind="value: staff_tty,hasfocus: staff_tty.focused" ></div>
                                        <div class="col-3"><label for="assisted_listening"> There are assisted listening devices available: </label><input class="form-control" id="assisted_listening" data-bind="value: assisted_listening, hasfocus: assisted_listening.focused"></div>
                                        <div class="col-3"><label for="assisted_listen_type"> Type of listening device - Infra­red loop/Induction loop/FM/Amplification/Other: </label><input class="form-control" id="assisted_listen_type" data-bind="value: assisted_listen_type, hasfocus: assisted_listen_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="assisted_listen_receiver"> Type of receivers - Earbud/Neckloop/Headphones/Other: </label> <input class="form-control" id="assisted_listen_receiver" data-bind="value: assisted_listen_receiver,hasfocus: assisted_listen_receiver.focused" ></div>
                                        <div class="col-4"><label for="listening_signage"> Signs about listening devices are clearly displayed​: </label> <input class="form-control" id="listening_signage" data-bind="value: listening_signage,hasfocus: listening_signage.focused" ></div>
                                        <div class="col-4"><label for="staff_listening"> Staff are trained to use assisted listening devices​: </label> <input class="form-control" id="staff_listening" data-bind="value: staff_listening,hasfocus: staff_listening.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="acoustics"> The acoustics are comfortable (no echoing, loud music, etc): </label> <input class="form-control" id="acoustics" data-bind="value: acoustics,hasfocus: acoustics.focused" ></div>
                                        <div class="col-4"><label for="acoustics_level"> Noise level - Low/Medium/High: </label> <input class="form-control" id="acoustics_level" data-bind="value: acoustics_level,hasfocus: acoustics_level.focused" ></div>
                                        <div class="col-4"><label for="alt_comm_methods"> If a customer is unable to hear, there are other forms of communication: </label><input class="form-control" id="alt_comm_methods" data-bind="value: alt_comm_methods, hasfocus: alt_comm_methods.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="alt_comm_type"> Type of other form of communication (writing pad, staff know ASL, etc): </label><input class="form-control" id="alt_comm_type" data-bind="value: alt_comm_type, hasfocus: alt_comm_type.focused"></div>
                                        <div class="col-6"><label for="staff_ASL"> Staff have received instructions on how to provide ASL services upon request (in person or remote): </label><input class="form-control" id="staff_ASL" data-bind="value: staff_ASL, hasfocus: staff_ASL.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="captioning_default"> Captioning is turned ‘on’ as default for TVs or projected video: </label> <input class="form-control" id="captioning_default" data-bind="value: captioning_default,hasfocus: captioning_default.focused" ></div>
                                        <div class="col-4"><label for="theater_captioning"> If this is a theater, there is captioning: </label><input class="form-control" id="theater_captioning" data-bind="value: theater_captioning, hasfocus: theater_captioning.focused"></div>
                                        <div class="col-4"><label for="theater_capt_type"> Type of captioning used - Real Time/Open Captions/Rear Window/Other: </label><input class="form-control" id="theater_capt_type" data-bind="value: theater_capt_type, hasfocus: theater_capt_type.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="auditory_info_visual"> Auditory information is presented visually: </label> <input class="form-control" id="auditory_info_visual" data-bind="value: auditory_info_visual,hasfocus: auditory_info_visual.focused" ></div>
                                        <div class="col-4"><label for="visual_info_auditory"> Visual information is presented audibly: </label><input class="form-control" id="visual_info_auditory" data-bind="value: visual_info_auditory, hasfocus: visual_info_auditory.focused"></div>
                                        <div class="col-4"><label for="website_text_reader"> If the establishment has a website, it is accessible to users of screen text readers: </label> <input class="form-control" id="website_text_reader" data-bind="value: website_text_reader,hasfocus: website_text_reader.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="alt_contact"> There are alternate means for patrons to order, contact, or schedule: </label><input class="form-control" id="alt_contact" data-bind="value: alt_contact, hasfocus: alt_contact.focused"></div>
                                        <div class="col-6"><label for="alt_contact_type"> Type of alternate means - Text/On-line/Phone: </label> <input class="form-control" id="alt_contact_type" data-bind="value: alt_contact_type,hasfocus: alt_contact_type.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4"><label for="shopping_assist"> The establishment offers shopping assistance or delivery: </label> <input class="form-control" id="shopping_assist" data-bind="value: shopping_assist,hasfocus: shopping_assist.focused" ></div>
                                        <div class="col-4"><label for="assist_service"> Type of service - Shopping Assistance/Delivery: </label><input class="form-control" id="assist_service" data-bind="value: assist_service, hasfocus: assist_service.focused"></div>
                                        <div class="col-4"><label for="assist_fee"> Is there a fee for the service: </label> <input class="form-control" id="assist_fee" data-bind="value: assist_fee,hasfocus: assist_fee.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label for="store_scooter"> If this is a store, there are wheelchairs or scooters available for customer use: </label> <input class="form-control" id="store_scooter" data-bind="value: store_scooter,hasfocus: store_scooter.focused" ></div>
                                        <div class="col-3"><label for="scooter_fee"> Is there a fee to use wheelchairs or scooters: </label> <input class="form-control" id="scooter_fee" data-bind="value: scooter_fee,hasfocus: scooter_fee.focused" ></div>
                                        <div class="col-6"><label for="scooter_location"> Location of wheelchairs or scooters: </label> <input class="form-control" id="scooter_location" data-bind="value: scooter_location,hasfocus: scooter_location.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="restaurant_allergies"> If this is a restaurant, information is available on food allergies, sensitivities: </label> <input class="form-control" id="restaurant_allergies" data-bind="value: restaurant_allergies,hasfocus: restaurant_allergies.focused" ></div>
                                        <div class="col-6"><label for="staff_disable_trained"> The staff have received training within the past 12 months on how to provide “disability friendly” customer service to people with disabilities of all ages: </label> <input class="form-control" id="staff_disable_trained" data-bind="value: staff_disable_trained,hasfocus: staff_disable_trained.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="staff_disable_trained_desc"> If ‘yes’, describe the type of training, how it was delivered, and how often it is provided: </label> <input class="form-control" id="staff_disable_trained_desc" data-bind="value: staff_disable_trained_desc,hasfocus: staff_disable_trained_desc.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-3"><label for="items_reach"> All items are within reach, or assistance is offered to reach them: </label> <input class="form-control" id="items_reach" data-bind="value: items_reach,hasfocus: items_reach.focused" ></div>
                                        <div class="col-3"><label for="service_alt_manner"> If goods and services are not accessible, they are provided in an alternative manner: </label><input class="form-control" id="service_alt_manner" data-bind="value: service_alt_manner, hasfocus: service_alt_manner.focused"></div>
                                        <div class="col-3"><label for="senior_discount"> The establishment offers a senior discount: </label><input class="form-control" id="senior_discount" data-bind="value: senior_discount, hasfocus: senior_discount.focused"></div>
                                        <div class="col-3"><label for="senior_age"> If ‘yes’, what age is considered ‘senior’: </label> <input class="form-control" id="senior_age" data-bind="value: senior_age,hasfocus: senior_age.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-6"><label for="annual_A4A_review"> Management has agreed to annual A4A reviews​: </label> <input class="form-control" id="annual_A4A_review" data-bind="value: annual_A4A_review,hasfocus: annual_A4A_review.focused" ></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="commentCommunication"> Comments, reasons for “no” answers, additional information: </label><input class="form-control" id="commentCommunication" data-bind="value: comment, hasfocus: comment.focused"></div>
                                    </div>
                                    <div class="card-row">
                                        <div class="col-12"><label for="recommendationsCommunication"> Recommendations: </label><input class="form-control" id="recommendationsCommunication" data-bind="value: recommendations, hasfocus: recommendations.focused"></div>
                                        <input type="hidden" class="form-control" id="communication_id" data-bind="value: communication_id">
                                        <input type="hidden" class="form-control" id="est_idCommunication" data-bind="value: est_id">
                                    </div>
                                    <div class="card-row">
                                        <div class="col-4">
                                            <?php if($_SESSION['role'] == 'admin') {
                                                echo
                                                '<button  type="button" id="save_communication" class="btn btn-success" onclick="updateCommunication()"><i class="fas fa-save"></i>&nbsp; Save Communication Technologies & Customer Service</button>';
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Accordion Section -->
                </div>
                <!-- End Container Section -->
            </div>
        </div>

    <!-- ALERT MODAL -->
        <div class="modal fade bd-example-modal-lg" id="alert" tabindex="-1" role="dialog" aria-labelledby="alert" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-alert-header">
                        <span class="h5 modal-title modal-alert-title" id="alertTitle">Error</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fas fa-times"></i></span>
                        </button>
                    </div>
                    <div id="alert-body" class="modal-body modal-alert-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
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
    <!-- STA MODAL -->
        <div class="modal fade bd-example-modal-lg" id="sta-route-modal" tabindex="-1" role="dialog" aria-labelledby="sta-route-modal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-sta-header">
                        <span class="h5 modal-title modal-sta-title" id="staTitle">Edit STA Route</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fas fa-times"></i></span>
                        </button>
                    </div>
                    <div id="sta-body" class="modal-body modal-sta-body col-12 form-group"></div>
                    <div id="sta-footer" class="modal-footer"> </div>
                </div>
            </div>
        </div>
    <!-- RESTROOM MODAL -->
        <div class="modal fade bd-example-modal-lg" id="restroom-modal" tabindex="-1" role="dialog" aria-labelledby="restroom-modal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-restroom-header">
                        <span class="h5 modal-title modal-restroom-title" id="restroomTitle">Edit Restroom Information</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fas fa-times"></i></span>
                        </button>
                    </div>
                    <div id="restroom-body" class="modal-body card-border form-group"></div>
                    <div id="restroom-footer" class="modal-footer"> </div>
                </div>
            </div>
        </div>
    <!-- GENERAL MODAL -->
        <div class="modal fade" id="gen-modal" tabindex="-1" role="dialog" aria-labelledby="gen-modal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-gen-header">
                        <span class="h5 modal-title modal-gen-title" id="gen-title"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fas fa-times"></i></span>
                        </button>
                    </div>
                    <div id="gen-body" class="modal-body modal-gen-body form-group"></div>
                    <div id="gen-footer" class="modal-footer"> </div>
                </div>
            </div>
        </div>

    </body>
</html>
