var EST_ID = localStorage.getItem("establishmentID");
var EST_NAME = "";
var PARK_ID = 0;
var STA_ID = 0;
var REST_ID = 0;
var tempArray =[];
var viewData = "";
var bodyHtml = "";
var establishmentData = "";

$(document).ready(function () {

    getEstablishmentName(EST_ID);
    getEstablishmentList();
    getParkId(EST_ID);
    getStaBusId(PARK_ID);
    getRestroomId(EST_ID);

    ReportDropDown();
    ReportHeaderView();
    ParkingView();
    RouteFromParkingView();
    PassengerLoadingZoneView();
    StaView();
    ExteriorView();

});

// value is EST_ID
function getEstablishmentName(value) {
    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/establishment/name/' + value,
        success: function (data) {
            EST_NAME = data[0].name;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function getEstablishmentList() {
    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/establishment/id/name/',
        success: function (data) {
            establishmentData = data;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

// value is EST_ID
function getParkId(value) {
    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/park_id/est/' + value,
        success: function (data) {
            PARK_ID = data[0].park_id;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

// value is PARK_ID
function getStaBusId(value) {
    if(value != 0) {
        $.ajax({
            async: false,
            dataType: 'json',
            url: 'get/sta_bus_id/park/' + value,
            success: function (data) {
                STA_ID = data[0].sta_id;
            },
            error: function(data) {
                $("#alert-body").html(JSON.stringify(data));
                $("#alert").modal('toggle');
            }
        });
    }
}

// value is EST_ID
function getRestroomId(value) {
    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/restroom/est/' + value,
        success: function (data) {
            if (data[0] !== undefined)
                REST_ID = data[0].restroom_id;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function printReport() {
    window.print();
}

function ReportDropDown() {
    $('#est_name').html(''+EST_NAME+'');
    $('#header_est_name').html(''+EST_NAME+'');

    bodyHtml = "";

    for(var i = 0; i < establishmentData.length; i++ ) {
        if (establishmentData[i].est_id !== EST_ID)
            bodyHtml += '<div class="dropdown-item pointer" onclick="ReloadReport('+establishmentData[i].est_id+')">'+establishmentData[i].name+'</div>'
    }

    $('#reportDropDownDiv').html(bodyHtml);
}

function ReloadReport(est_id) {
    setEstablishmentId(est_id);
    location.reload();
}

function ReportHeaderView() {

    $('#report_header').empty();

    bodyHtml = '<div class="card-row-report">\n ' +
        '   <div class="col-12 subtitle">\n ' +
        '       <span class="card-header-report" >positive findings</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12 report-subtitle">\n ' +
        '       <span >The following items are to be published on our website.</span>\n ' +
        '   </div>\n ' +
        '</div>';

    $('#report_header').html(bodyHtml);
}

function ParkingView() {

    $('#report_parking').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/parking/est/" + EST_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml =
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="card-header-report" >parking:</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12 ">\n ' +
        '       <label class="report-label" > This establishment has the following parking: </label>&nbsp;\n ';

    if (viewData[0].lot_free !== "N/A" || viewData[0].lot_free !== "") {
        if (viewData[0].lot_free === "Free") {
            tempArray.push(" free lot");
        }
        else if (viewData[0].lot_free === "Paid") {
            tempArray.push(" paid lot");
        }
    }

    if (viewData[0].street_metered !== "N/A" || viewData[0].street_metered !== "") {
        if (viewData[0].street_metered === "Metered") {
            tempArray.push(" metered street parking");
        }
        else if (viewData[0].street_metered === "Not Metered") {
            tempArray.push(" free street parking");
        }
    }

    if (viewData[0].parking_type) {
            tempArray.push(" " + viewData[0].parking_type);
    }

    bodyHtml +=
        '       <span class="report">'+tempArray+'.</span>\n' +
        '   </div>\n ' +
        '</div>\n ';

    tempArray = [];

    if (viewData[0].total_num_spaces > 0) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           There is a total of '+viewData[0].total_num_spaces+' spaces on the premises.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].num_reserved_spaces > 0) {
        var num = numberToEnglish(viewData[0].num_reserved_spaces, " ");
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           <span style="text-transform: capitalize">'+num+'</span> is marked "reserved", "handicapped", "disabled", etc.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].num_accessable_space > 0) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           The accessible parking has 5\' access aisle.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].num_van_accessible > 0) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           The \'van accessible\' parking has 8\' access aisle.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].reserve_space_sign === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Accessible parking has signs that are not obstructed when a vehicle is parked there.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].reserve_space_obstacles === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Surface is level, unbroken, firm, slip resistant, and free of obstacles.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].comment) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="card-subheader-report" >parking notes:</span>\n ' +
            '   </div>\n ' +
            '</div>\n ' +
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           '+viewData[0].comment+'.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    bodyHtml +=
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="report-check"></span>\n ' +
        '   </div>\n ' +
        '</div>\n ';


    $('#report_parking').html(bodyHtml);

}

function RouteFromParkingView() {

    $('#report_route_from_parking').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/route_from_parking/park/" + PARK_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    if (viewData[0].distance > 0 && viewData[0].min_width === "Yes") {
        bodyHtml =
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="card-header-report" >route from nearest accessible parking area to accessible entrance:</span>\n ' +
            '   </div>\n ' +
            '</div>\n ';


        if (viewData[0].distance > 0) {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Distance from nearest accessible parking to wheelchair accessible entrance is ' + viewData[0].distance + ' feet.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].min_width === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Route is at least 44 inches wide.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].route_surface === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Surface is level, unbroken, firm, slip resistant, and free of obstacles.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].route_curbs === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Route has curb ramps and curb cuts where needed.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].tactile_warning === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Tactile warning strips are installed at curb ramps, stairwells, building entrances, parking areas and pedestrian crossings.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].covered === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Route is covered.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].lighting === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span>, and is adequate for mobility and reading signs.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].comment) {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="card-subheader-report" >route notes:</span>\n ' +
                '   </div>\n ' +
                '</div>\n ' +
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-label">\n ' +
                '           '+viewData[0].comment+'.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check"></span>\n ' +
            '   </div>\n ' +
            '</div>\n ';

        $('#report_route_from_parking').html(bodyHtml);
    }

}

function PassengerLoadingZoneView() {

    $('#report_passenger_loading').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/passenger_loading/park/" + PARK_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });


    bodyHtml =
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="card-header-report" >passenger loading zone:</span>\n ' +
        '   </div>\n ' +
        '</div>\n ';

    if (viewData[0].designated_zone === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           There is a designated Passenger Loading Zone.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].distance > 0) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Distance from passenger loading zone to wheelchair accessible entrance is ' + viewData[0].distance + ' feet.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].min_width === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Route is at least 44 inches wide.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].passenger_surface === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Surface is level, unbroken, firm, slip resistant, and free of obstacles.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].tactile_warning_strips === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Tactile warning strips are installed at curb ramps, stairwells, building entrances, parking areas and pedestrian crossings.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].passenger_curbs === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Route has curb ramps and curb cuts where needed.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].covered === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Route is covered.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].lighting === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span>, and is adequate for mobility and reading signs.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].comment) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="card-subheader-report" >route notes:</span>\n ' +
            '   </div>\n ' +
            '</div>\n ' +
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           '+viewData[0].comment+'.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    bodyHtml +=
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="report-check"></span>\n ' +
        '   </div>\n ' +
        '</div>\n ';

    $('#report_passenger_loading').html(bodyHtml);

}

function StaView() {

    var staRouteData = "";
    var stopNumbs = [];
    var routeNumbs = [];

    $('#report_sta').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/sta_bus/park/" + PARK_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/sta_route/sta_bus/" + STA_ID,
        success: function (data) {
            staRouteData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml =
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="card-header-report" >STA Information:</span>\n ' +
        '   </div>\n ' +
        '</div>\n ';

    if (viewData[0].sta_service_area === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Establishment is located within the STA Service Area for Paratransit.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (staRouteData.length > 0) {

        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="card-subheader-report" >Access To STA Fixed Bus Route:</span>\n ' +
            '   </div>\n ' +
            '</div>\n ';

        for (var i = 0; i < staRouteData.length; i++) {

            routeNumbs.push(' '+staRouteData[i].route_num);

            if (staRouteData[i].north_bound_stop > 0 && stopNumbs[0] !== staRouteData[i].north_bound_stop + ' Northbound')
                stopNumbs.push(staRouteData[i].north_bound_stop + ' Northbound');
            if (staRouteData[i].south_bound_stop > 0 && stopNumbs[1] !== ' '+ staRouteData[i].south_bound_stop +' Southbound')
                stopNumbs.push(' '+ staRouteData[i].south_bound_stop +' Southbound');
            if (staRouteData[i].east_bound_stop > 0 && stopNumbs[2] !== ' '+ staRouteData[i].east_bound_stop +' Eastbound')
                stopNumbs.push(' '+ staRouteData[i].east_bound_stop +' Eastbound');
            if (staRouteData[i].west_bound_stop > 0 && stopNumbs[3] !== ' '+ staRouteData[i].west_bound_stop +' Westbound')
                stopNumbs.push(' '+ staRouteData[i].west_bound_stop +' Westbound');
        }

        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           Route Number(s): '+routeNumbs+'\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';

        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           Stop Numbers: '+ stopNumbs +'\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].distance > 0) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Distance from nearest bus stop to wheelchair accessible entrance is ' + viewData[0].distance + ' feet.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].min_width === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Route is at least 44 inches wide.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].route_surface === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Surface is level, unbroken, firm, slip resistant, and free of obstacles.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].tactile_warning_strips === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Tactile warning strips are installed at curb ramps, stairwells, building entrances, parking areas and pedestrian crossings.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].curb_cuts === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Route has curb ramps and curb cuts where needed.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].lighting === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span>, and is adequate for mobility and reading signs.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].shelter_bench === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           There is a shelter or bench at this bus stop.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (viewData[0].comment) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="card-subheader-report" >STA notes:</span>\n ' +
            '   </div>\n ' +
            '</div>\n ' +
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           '+viewData[0].comment+'.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    bodyHtml +=
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="report-check"></span>\n ' +
        '   </div>\n ' +
        '</div>\n ';

    $('#report_sta').html(bodyHtml);

}

function ExteriorView() {
    var temp ="";
    var extStairs = "";
    var extRamps = "";

    $('#report_exterior').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/exterior_pathways/est/" + EST_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/exterior_stairs/est/" + EST_ID,
        success: function (data) {
            extStairs = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/exterior_ramps/est/" + EST_ID,
        success: function (data) {
            extRamps = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml =
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="card-header-report" >Exterior:</span>\n ' +
        '   </div>\n ' +
        '</div>\n ';

    /**
     * Exterior Pathways
     */
    if (viewData[0].has_exterior_path === "Yes") {

        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           This establishment has exterior pathways or walkways.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';

        if (viewData[0].min_width === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Route is at least 44 inches wide.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].pathway_surface === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Surface is level, unbroken, firm, slip resistant, and free of obstacles.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].pathway_curbs === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Route has curb ramps and curb cuts where needed.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].tactile_warning === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Tactile warning strips are installed at curb ramps, stairwells, building entrances, parking areas and pedestrian crossings.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].slope === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           The running slope of the pathway is no steeper than 1:20.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (viewData[0].lighting === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span>, and is adequate for mobility and reading signs.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }


        if (viewData[0].comment) {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="card-subheader-report" >exterior pathways notes:</span>\n ' +
                '   </div>\n ' +
                '</div>\n ' +
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-label">\n ' +
                '           '+viewData[0].comment+'.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

    }
    else {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           This establishment does not have exterior pathways or walkways.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    /**
     * Exterior Stairs
     */
    if (extStairs[0].stairs_required === "Yes" ) {

        if (extStairs[0].num_stairs > 0)
            temp = extStairs[0].num_stairs;

        if (extStairs[0].stairs_available === "Yes")
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           This establishment has stairs available, with '+temp+' steps.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';

        if (extStairs[0].handrail_both_sides === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           There are handrails on both sides of the stairs.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }
        else if (extStairs[0].handrail_both_sides === "No" && extStairs[0].handrail_side !== "None" || extStairs[0].handrail_side !== "N/A") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           There is a handrail on the '+extStairs[0].handrail_side+' side of the stairs.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extStairs[0].handrail_regulation_height === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           The top of the handrail gripping surface is between 34 and 38 inches above the stair surface.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extStairs[0].obstacles === "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           Stairs are clear of obstacles or protrusions of 4 inches or more from sides, and have firm slip­resistant surfaces.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
        }



        if (extStairs[0].clearly_marked === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Stairs are clearly marked with contrasting color.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extStairs[0].lighting === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Lighting level is <span class="lowercase">'+extStairs[0].lighting_type+' during the '+extStairs[0].lighting_option+'</span>, and is adequate for mobility and reading signs.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }


        if (extStairs[0].comment) {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="card-subheader-report" >exterior stairs notes:</span>\n ' +
                '   </div>\n ' +
                '</div>\n ' +
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-label">\n ' +
                '           '+extStairs[0].comment+'\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

    }
    else if (extStairs[0].stairs_required !== "Yes" && extRamps[0].ramp_required !== "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           Stairs and ramps are not required to enter building.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }
    else {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           Stairs are not required to enter building.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }


    /**
     * Exterior Ramps
     */
    if (extRamps[0].ramp_required === "Yes" ) {

        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           This establishment has extrior ramps.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';

        if (extRamps[0].min_width === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Ramps are at least 36 inches wide.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extRamps[0].min_slope === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           For each section of ramp, the running slope is no greater than 1:12.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extRamps[0].level_landing_both === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           There is a level landing that is at least 60 inches long and at least as wide as the ramp at the top and bottom of the ramp.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }
        else if (extRamps[0].level_landing_both === "No" && extRamps[0].level_landing_location !== "N/A") {
            temp = extRamps[0].level_landing_location;

            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           There is a level landing that is at least 60 inches long and at least as wide as the ramp at the <span class="lowercase">'+temp+'</span> of the ramp.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extRamps[0].obstacles === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Ramp is clear of obstacles or protrusions of 4 inches or more from sides, and have firm slip­resistant surfaces.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extRamps[0].handrail_both_sides === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           There are handrails on both sides of the ramp.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }
        else if (extRamps[0].handrail_both_sides === "No" && extRamps[0].handrail_side !== "None" || extRamps[0].handrail_side !== "N/A") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           There is a handrails on the '+extRamps[0].handrail_side+' side of the ramp.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extRamps[0].handrail_regulation_height === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           The top of the handrail gripping surface is between 34 and 38 inches above the stair surface.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extRamps[0].side_guards === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Ramps have adequate side guards to prevent wheelchair casters and crutch tips from falling off ramp.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extRamps[0].lighting === "Yes") {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-check">\n ' +
                '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
                '           Lighting level is <span class="lowercase">'+extRamps[0].lighting_type+' during the '+extRamps[0].lighting_option+'</span>, and is adequate for mobility and reading signs.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

        if (extRamps[0].comment) {
            bodyHtml +=
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="card-subheader-report" >Exterior Ramp notes:</span>\n ' +
                '   </div>\n ' +
                '</div>\n ' +
                '<div class="card-row-report">\n ' +
                '   <div class="col-12">\n ' +
                '       <span class="report-label">\n ' +
                '           '+extRamps[0].comment+'.\n ' +
                '       </span>\n ' +
                '   </div>\n ' +
                '</div>\n ';
        }

    }
    else if (extStairs[0].stairs_required === "Yes" && extRamps[0].ramp_required !== "Yes") {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-label">\n ' +
            '           Ramps are not required to enter building.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }


    if (viewData[0].service_animal === "Yes") {
        if(viewData[0].service_animal_location)
            temp = ' ('+viewData[0].service_animal_location+')'

        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           There is a service animal relief area  on premises'+temp+'.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    bodyHtml +=
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="report-check"></span>\n ' +
        '   </div>\n ' +
        '</div>\n ';

    $('#report_exterior').html(bodyHtml);

}