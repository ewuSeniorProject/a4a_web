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
                <div class="dropdown-item"></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item pointer" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Log Out</div>
            </div>
        </nav>
        <div class="page">
            <!-- LEFT SIDEBAR -->
            <div class="left-sidebar">
                <div class="left-sidebar-header">
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
                        <span class="pad" id="left_sb_name"></span>
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
                                <div class="card-body card-border card-body-color-add" id="establishment_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="parking_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="route_from_parking_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="passenger_loading_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="sta_bus_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="exterior_pathways_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="exterior_stairs_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="exterior_ramps_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="main_entrance_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="interior_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="elevator_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="signage_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="emergency_preparedness_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="seating_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="restroom_card"></div>
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
                                <div class="card-body card-border card-body-color-add" id="restroom_info_card"></div>
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
                        <span class="h5 modal-title modal-sta-title" id="staTitle"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fas fa-times"></i></span>
                        </button>
                    </div>
                    <div id="sta-body" class="modal-body card-border card-body-color-add col-12 form-group"></div>
                    <div id="sta-footer" class="modal-footer "> </div>
                </div>
            </div>
        </div>
    <!-- RESTROOM MODAL -->
        <div class="modal fade bd-example-modal-lg" id="restroom-modal" tabindex="-1" role="dialog" aria-labelledby="restroom-modal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header modal-restroom-header">
                        <span class="h5 modal-title modal-restroom-title" id="restroomTitle">Add Restroom Information</span>
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
