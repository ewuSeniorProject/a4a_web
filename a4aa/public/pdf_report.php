<?php
include_once('user.cfg.php');
include_once('admin.cfg.php');


?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title id="est_name">A4ASpokane</title>

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
        <script src="script/common.js"></script>
        <script src="script/pdf_report.js"></script>
    </head>
    <body class="report-body">
        <div id="page-preloader">
            <span class="spinner"></span>
        </div>
        <nav class="navbar navbar-light bg-header">
            <span class="navbar-brand mb-0 pointer">
                <a href="home.php" class="h1">
                    Access 4 All Spokane
                </a>
            </span>
            <div class="btn-group nav-right">
                <div class="pointer" role="button"  href="#" id="reportDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="reportMenu">
                    <div class="h10" id="header_est_name"></div>
                    <div class="dropdown-menu dropdown-margin-report" id="reportDropDownDiv" aria-labelledby="reportDropdown"></div>
                </div>
            </div>
            <div class="btn-group">
                <div class="nav-link white-link pointer" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="userMenu">
                    <i class="fas fa-bars fa-lg"></i>
                </div>
                <div class="dropdown-menu dropdown-menu-right dropdown-margin" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="home.php"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                    <div class="dropdown-item pointer" onclick="printReport()"><i class="fas fa-file-pdf"></i> Print Report</div>
                    <div class="dropdown-item"></div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item pointer" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Log Out</div>
                </div>
            </div>
        </nav>
        <div class="report-page" id="reportPage">
            <div class="section-report" id="sectionReport">
                <div class="container-fluid" id="report_container">
                    <div class="print-report" id="report_header"></div>
                    <div class="print-report" id="report_parking"></div>
                    <div class="print-report" id="report_route_from_parking"></div>
                    <div class="print-report" id="report_passenger_loading"></div>
                    <div class="print-report" id="report_sta"></div>
                    <div class="print-report" id="report_sta"></div>
                    <div class="print-report" id="report_exterior"></div>
                    <div class="print-report" id="report_main_entrance"></div>
                    <div class="print-report" id="report_interior"></div>
                    <div class="print-report" id="report_elevator"></div>
                    <div class="print-report" id="report_signage"></div>
                    <div class="print-report" id="report_emergency_preparedness"></div>
                    <div class="print-report" id="report_seating"></div>
                    <div class="print-report" id="report_restroom"></div>
                    <div class="print-report" id="report_communication"></div>
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