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
    MainEntranceView();
    InteriorView();
    ElevatorView();
    SignageView();
    EmergencyPreparednessView();
    SeatingView();
    RestroomView();
    CommunicationView();

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

function buildHeader(value) {
    return '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="card-header-report" >'+value+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ';
}

function buildSubHeader(value) {
    return '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="card-subheader-report" >'+value+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ';
}

function buildDescriptionRow(value) {
    return '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="report-label">\n ' +
        '           '+value+'.\n ' +
        '       </span>\n ' +
        '   </div>\n ' +
        '</div>\n ';
}

function buildCheckRow(value) {
    return '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="report-check">\n ' +
        '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
        '           '+value+'\n ' +
        '       </span>\n ' +
        '   </div>\n ' +
        '</div>\n ';
}

function buildNoCheckRow(value) {
    return '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="report-check">\n ' +
        '           '+value+'\n ' +
        '       </span>\n ' +
        '   </div>\n ' +
        '</div>\n ';
}

function buildSpacerRow() {
    return '<div class="card-row-report">\n ' +
        '   <div class="col-12"><p></p>\n ' +
        '   </div>\n ' +
        '</div>\n ';
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

    bodyHtml = buildHeader('parking');

    bodyHtml +=
        '<div class="card-row-report">\n ' +
        '   <div class="col-12 ">\n ' +
        '       <label class="report-label" > This establishment has the following parking:&nbsp;\n ';

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
        '       '+tempArray+'.</label>\n' +
        '   </div>\n ' +
        '</div>\n ';

    tempArray = [];

    if (viewData[0].total_num_spaces > 0) {
        bodyHtml += buildCheckRow('There is a total of '+viewData[0].total_num_spaces+' spaces on the premises.');
    }

    if (viewData[0].num_reserved_spaces > 0) {
        var num = numberToEnglish(viewData[0].num_reserved_spaces, " ");
        bodyHtml += buildCheckRow('<span style="text-transform: capitalize">'+num+'</span> is marked "reserved", "handicapped", "disabled", etc.');
    }

    if (viewData[0].num_accessable_space > 0) {
        bodyHtml += buildCheckRow('The accessible parking has 5\' access aisle.');
    }

    if (viewData[0].num_van_accessible > 0) {
        bodyHtml += buildCheckRow('The \'van accessible\' parking has 8\' access aisle.');
    }

    if (viewData[0].reserve_space_sign === "Yes") {
        bodyHtml += buildCheckRow('Accessible parking has signs that are not obstructed when a vehicle is parked there.');
    }

    if (viewData[0].reserve_space_obstacles === "Yes") {
        bodyHtml += buildCheckRow('Surface is level, unbroken, firm, slip resistant, and free of obstacles.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('parking notes');
        bodyHtml += buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();


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
        bodyHtml = buildHeader('route from nearest accessible parking area to accessible entrance');


        if (viewData[0].distance > 0) {
            bodyHtml += buildCheckRow('Distance from nearest accessible parking to wheelchair accessible entrance is ' + viewData[0].distance + ' feet.');
        }

        if (viewData[0].min_width === "Yes") {
            bodyHtml += buildCheckRow('Route is at least 44 inches wide.');
        }

        if (viewData[0].route_surface === "Yes") {
            bodyHtml += buildCheckRow('Surface is level, unbroken, firm, slip resistant, and free of obstacles.');
        }

        if (viewData[0].route_curbs === "Yes") {
            bodyHtml += buildCheckRow('Route has curb ramps and curb cuts where needed.');
        }

        if (viewData[0].tactile_warning === "Yes") {
            bodyHtml += buildCheckRow('Tactile warning strips are installed at curb ramps, stairwells, building entrances, parking areas and pedestrian crossings.');
        }

        if (viewData[0].covered === "Yes") {
            bodyHtml += buildCheckRow('Route is covered.');
        }

        if (viewData[0].lighting === "Yes" && viewData[0].lighting_type !== "N/A" && viewData[0].lighting_option !== "N/A") {
            bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span> and is adequate for mobility and reading signs.');
        }

        if (viewData[0].comment) {
            bodyHtml += buildSubHeader('route notes:');
            bodyHtml += buildDescriptionRow(viewData[0].comment);
        }

        bodyHtml += buildSpacerRow();

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


    bodyHtml = buildHeader('passenger loading zone');

    if (viewData[0].designated_zone === "Yes") {
        bodyHtml += buildCheckRow('There is a designated Passenger Loading Zone.');
    }

    if (viewData[0].distance > 0) {
        bodyHtml += buildCheckRow('Distance from passenger loading zone to wheelchair accessible entrance is ' + viewData[0].distance + ' feet.');
    }

    if (viewData[0].min_width === "Yes") {
        bodyHtml += buildCheckRow('Route is at least 44 inches wide.');
    }

    if (viewData[0].passenger_surface === "Yes") {
        bodyHtml += buildCheckRow('Surface is level, unbroken, firm, slip resistant, and free of obstacles.');
    }

    if (viewData[0].tactile_warning_strips === "Yes") {
        bodyHtml += buildCheckRow('Tactile warning strips are installed at curb ramps, stairwells, building entrances, parking areas and pedestrian crossings.');
    }

    if (viewData[0].passenger_curbs === "Yes") {
        bodyHtml += buildCheckRow('Route has curb ramps and curb cuts where needed.');
    }

    if (viewData[0].covered === "Yes") {
        bodyHtml += buildCheckRow('Route is covered.');
    }

    if (viewData[0].lighting === "Yes" && viewData[0].lighting_type !== "N/A" && viewData[0].lighting_option !== "N/A") {
        bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span> and is adequate for mobility and reading signs.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('passenger loading zone notes:');
        bodyHtml += buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();

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

    bodyHtml = buildHeader('STA Information');

    if (viewData[0].sta_service_area === "Yes") {
        bodyHtml += buildCheckRow('Establishment is located within the STA Service Area for Paratransit.');
    }

    if (staRouteData.length > 0) {

        bodyHtml += buildSubHeader('Access To STA Fixed Bus Route:');

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

        bodyHtml += buildNoCheckRow('Route Number(s): '+routeNumbs);

        bodyHtml += buildNoCheckRow('Stop Numbers: '+ stopNumbs);
    }

    if (viewData[0].distance > 0) {
        bodyHtml += buildCheckRow('Distance from nearest bus stop to wheelchair accessible entrance is ' + viewData[0].distance + ' feet.');
    }

    if (viewData[0].min_width === "Yes") {
        bodyHtml += buildCheckRow('Route is at least 44 inches wide.');
    }

    if (viewData[0].route_surface === "Yes") {
        bodyHtml += buildCheckRow('Surface is level, unbroken, firm, slip resistant, and free of obstacles.');
    }

    if (viewData[0].tactile_warning_strips === "Yes") {
        bodyHtml += buildCheckRow('Tactile warning strips are installed at curb ramps, stairwells, building entrances, parking areas and pedestrian crossings.');
    }

    if (viewData[0].curb_cuts === "Yes") {
        bodyHtml += buildCheckRow('Route has curb ramps and curb cuts where needed.');
    }

    if (viewData[0].lighting === "Yes"  && viewData[0].lighting_type !== "N/A" && viewData[0].lighting_option !== "N/A") {
        bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span> and is adequate for mobility and reading signs.');
    }

    if (viewData[0].shelter_bench === "Yes") {
        bodyHtml += buildCheckRow('There is a shelter or bench at this bus stop.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('STA notes:');
        bodyHtml += buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();

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

        bodyHtml += buildDescriptionRow('This establishment has exterior pathways or walkways.');

        if (viewData[0].min_width === "Yes") {
            bodyHtml += buildCheckRow('Route is at least 44 inches wide.');
        }

        if (viewData[0].pathway_surface === "Yes") {
            bodyHtml += buildCheckRow('Surface is level, unbroken, firm, slip resistant, and free of obstacles.');
        }

        if (viewData[0].pathway_curbs === "Yes") {
            bodyHtml += buildCheckRow('Route has curb ramps and curb cuts where needed.');
        }

        if (viewData[0].tactile_warning === "Yes") {
            bodyHtml += buildCheckRow('Tactile warning strips are installed at curb ramps, stairwells, building entrances, parking areas and pedestrian crossings.');
        }

        if (viewData[0].slope === "Yes") {
            bodyHtml += buildCheckRow('The running slope of the pathway is no steeper than 1:20.');
        }

        if (viewData[0].lighting === "Yes"  && viewData[0].lighting_type !== "N/A" && viewData[0].lighting_option !== "N/A") {
            bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span> and is adequate for mobility and reading signs.');
        }


        if (viewData[0].comment) {
            bodyHtml += buildSubHeader('exterior pathways notes:');
            bodyHtml += buildDescriptionRow(viewData[0].comment);
        }

    }
    else {
        bodyHtml += buildDescriptionRow('This establishment does not have exterior pathways or walkways.');
    }

    /**
     * Exterior Stairs
     */
    if (extStairs[0].stairs_required === "Yes" ) {

        if (extStairs[0].num_stairs > 0)
            temp = extStairs[0].num_stairs;

        if (extStairs[0].stairs_available === "Yes")
        bodyHtml += buildDescriptionRow('This establishment has stairs available, with '+temp+' steps.');

        if (extStairs[0].handrail_both_sides === "Yes") {
            bodyHtml += buildCheckRow('There are handrails on both sides of the stairs.');
        }
        else if (extStairs[0].handrail_both_sides === "No" && extStairs[0].handrail_side !== "None" || extStairs[0].handrail_side !== "N/A") {
            bodyHtml += buildCheckRow('There is a handrail on the '+extStairs[0].handrail_side+' side of the stairs.');
        }

        if (extStairs[0].handrail_regulation_height === "Yes") {
            bodyHtml += buildCheckRow('The top of the handrail gripping surface is between 34 and 38 inches above the stair surface.');
        }

        if (extStairs[0].obstacles === "Yes") {
        bodyHtml += buildCheckRow('Stairs are clear of obstacles or protrusions of 4 inches or more from sides, and have firm slip­resistant surfaces.');
        }

        if (extStairs[0].clearly_marked === "Yes") {
            bodyHtml += buildCheckRow('Stairs are clearly marked with contrasting color.');
        }

        if (extStairs[0].lighting === "Yes" && viewData[0].lighting_type !== "N/A" && viewData[0].lighting_option !== "N/A") {
            bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+extStairs[0].lighting_type+' during the '+extStairs[0].lighting_option+'</span> and is adequate for mobility and reading signs.');
        }

        if (extStairs[0].comment) {
            bodyHtml += buildSubHeader('exterior stairs notes');
            bodyHtml += buildDescriptionRow(extStairs[0].comment);
        }

    }
    else if (extStairs[0].stairs_required !== "Yes" && extRamps[0].ramp_required !== "Yes") {
        bodyHtml += buildDescriptionRow('Stairs and ramps are not required to enter building.');
    }
    else {
        bodyHtml += buildDescriptionRow('Stairs are not required to enter building.');
    }


    /**
     * Exterior Ramps
     */
    if (extRamps[0].ramp_required === "Yes" ) {

        bodyHtml += buildDescriptionRow('This establishment has extrior ramps.');

        if (extRamps[0].min_width === "Yes") {
            bodyHtml += buildCheckRow('Ramps are at least 36 inches wide.');
        }

        if (extRamps[0].min_slope === "Yes") {
            bodyHtml += buildCheckRow('For each section of ramp, the running slope is no greater than 1:12.');
        }

        if (extRamps[0].level_landing_both === "Yes") {
            bodyHtml += buildCheckRow('There is a level landing that is at least 60 inches long and at least as wide as the ramp at the top and bottom of the ramp.');
        }
        else if (extRamps[0].level_landing_both === "No" && extRamps[0].level_landing_location !== "N/A") {
            temp = extRamps[0].level_landing_location;

            bodyHtml += buildCheckRow('There is a level landing that is at least 60 inches long and at least as wide as the ramp at the <span class="lowercase">'+temp+'</span> of the ramp.');
        }

        if (extRamps[0].obstacles === "Yes") {
            bodyHtml += buildCheckRow('Ramp is clear of obstacles or protrusions of 4 inches or more from sides, and have firm slip­resistant surfaces.');
        }

        if (extRamps[0].handrail_both_sides === "Yes") {
            bodyHtml += buildCheckRow('There are handrails on both sides of the ramp.');
        }
        else if (extRamps[0].handrail_both_sides === "No" && extRamps[0].handrail_side !== "None" || extRamps[0].handrail_side !== "N/A") {
            bodyHtml += buildCheckRow('There is a handrails on the '+extRamps[0].handrail_side+' side of the ramp.');
        }

        if (extRamps[0].handrail_regulation_height === "Yes") {
            bodyHtml += buildCheckRow('The top of the handrail gripping surface is between 34 and 38 inches above the stair surface.');
        }

        if (extRamps[0].side_guards === "Yes") {
            bodyHtml += buildCheckRow('Ramps have adequate side guards to prevent wheelchair casters and crutch tips from falling off ramp.');
        }

        if (extRamps[0].lighting === "Yes" && viewData[0].lighting_type !== "N/A" && viewData[0].lighting_option !== "N/A") {
            bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+extRamps[0].lighting_type+' during the '+extRamps[0].lighting_option+'</span> and is adequate for mobility and reading signs.');
        }

        if (extRamps[0].comment) {
            bodyHtml += buildSubHeader('exterior ramp notes:');
            bodyHtml += buildDescriptionRow(extRamps[0].comment);
        }

    }
    else if (extStairs[0].stairs_required === "Yes" && extRamps[0].ramp_required !== "Yes") {
        bodyHtml += buildDescriptionRow('Ramps are not required to enter building.');
    }

    if (viewData[0].service_animal === "Yes") {
        if(viewData[0].service_animal_location)
            temp = ' ('+viewData[0].service_animal_location+')'

        bodyHtml += buildCheckRow('There is a service animal relief area  on premises'+temp+'.');
    }

    bodyHtml += buildSpacerRow();

    $('#report_exterior').html(bodyHtml);

}

function MainEntranceView() {

    var temp = "";
    var force = "";
    var num = "";

    $('#report_main_entrance').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/main_entrance/est/" + EST_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });


    bodyHtml = buildHeader('main entrance');

    if (viewData[0].total_num_public_entrances > 0) {
        if (viewData[0].total_num_public_entrances > 1)
            temp = 'entrances';
        else
            temp = 'entrance'
        num = numberToEnglish(viewData[0].total_num_public_entrances, " ");
        bodyHtml += buildDescriptionRow('The establishment has '+num+' public '+temp+'.');
    }

    if (viewData[0].main_ent_accessible === "Yes") {
        bodyHtml += buildCheckRow('The main entrance is wheelchair accessible.');
    }

    if (viewData[0].alt_ent_accessible === "Yes") {
        bodyHtml += buildCheckRow('There is an alternative accessible entrance which can be used independently.');
    }

    if (viewData[0].accessable_signage === "Yes") {
        bodyHtml += buildCheckRow('There is signage to direct patrons to the wheelchair accessible entrance.');
    }

    if (viewData[0].ground_level === "Yes") {
        bodyHtml += buildCheckRow('The ground or floor is level inside and outside the entrance door.');
    }

    if (viewData[0].threshold_level === "Yes") {
        bodyHtml += buildCheckRow('Threshold of the door is level.');
    }

    if (viewData[0].threshold_beveled === "Yes") {
        bodyHtml += buildCheckRow('Door threshold is no more than 1/2\" high.');
    }

    if (viewData[0].door_action !== "N/A") {
        bodyHtml += buildCheckRow('As you enter, door opens <span class="lowercase">'+viewData[0].door_action+'</span>.');
    }

    if (viewData[0].door_open_clearance === "Yes") {
        bodyHtml += buildCheckRow('Door has at least 32" clearance when door is open 90 degrees.');
    }

    if (viewData[0].door_easy_open === "Yes") {
        if (viewData[0].door_open_force > 0)
            force = ' (actual '+viewData[0].door_open_force+' lbs)';
        bodyHtml += buildCheckRow('Door is easy to open, requiring 10 lbs or less of force'+force+'.');
    }

    if (viewData[0].door_use_with_fist === "Yes") {
        bodyHtml += buildCheckRow('Door handles can be operated with closed fist.');
    }

    if (viewData[0].door_auto_open === "Yes") {
        bodyHtml += buildCheckRow('Door(s) open automatically or with a push button.');
    }

    if (viewData[0].second_door_inside === "Yes") {
        bodyHtml += buildCheckRow('There is a second door or set of doors inside the accessible entry.');

        if (viewData[0].min_dist_between_doors === "Yes") {
            bodyHtml += buildCheckRow('The distance between outer door and inner door is at least 48” plus door clearance(s).');
        }
    }

    if (viewData[0].lighting === "Yes" && viewData[0].lighting_type !== "N/A" && viewData[0].lighting_option !== "N/A") {
        bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span> and is adequate for mobility and reading signs.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('main entrance notes:');
        bodyHtml += buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();

    $('#report_main_entrance').html(bodyHtml);

}

function InteriorView() {
    var counter = "";
    var writing = "";
    var temp = "";
    var force = "";
    var tempData = "";

    $('#report_interior').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/interior/est/" + EST_ID,
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
        url: "get/restroom/est/public/" + EST_ID,
        success: function (data) {
            tempData = data[0].public_restroom;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });


    bodyHtml = buildHeader('interior');

    if (viewData[0].int_door_open_clearance === "Yes") {
        if (tempData === "Yes")
            temp = ' (restroom doors are covered in restroom section)';
        bodyHtml += buildDescriptionRow('This establishment has interior doors'+temp+'.');

        bodyHtml += buildCheckRow('Interior doors have at least 32" clearance when doors are open 90 degrees.');

        if (viewData[0].int_door_easy_open === "Yes") {
            if (viewData[0].int_door_open_force > 0)
                force = ' (actual '+viewData[0].int_door_open_force+' lbs)';
            bodyHtml += buildCheckRow('Door is easy to open, requiring 5 lbs or less of force'+force+'.');
        }

        if (viewData[0].int_door_use_with_fist === "Yes") {
            bodyHtml += buildCheckRow('Door handles can be operated with closed fist.');
        }

        if (viewData[0].five_second_close === "Yes") {
            bodyHtml += buildCheckRow('Doors take 5 seconds or longer to close.');
        }

    }
    else {
        if (tempData === "Yes")
            temp = ', except for the restroom(s)';
        bodyHtml += buildCheckRow('There are no interior doors'+temp+'.');
    }

    if (viewData[0].hallway_width === "Yes") {
        bodyHtml += buildCheckRow('Hallways and ​aisles are min. 36\” wide, ​or not less than 28\” for 4 foot intervals.');
    }

    if (viewData[0].wheelchair_turnaround === "Yes") {
        bodyHtml += buildCheckRow('There are locations that allow 60” space for a wheelchair to turn around.');
    }

    if (viewData[0].hallway_obstacles === "Yes") {
        bodyHtml += buildCheckRow('Hallways and aisles are clear of obstacles and tripping hazards.');
    }

    if (viewData[0].hallway_clear === "Yes") {
        bodyHtml += buildCheckRow('Hallways are clear of objects protruding more than 4\” or lower than 80\”.');
    }

    if (viewData[0].lighting === "Yes" && viewData[0].lighting_type !== "N/A") {
        bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+viewData[0].lighting_type+'</span> and is adequate for mobility and reading signs.');
    }

    if (viewData[0].service_counter === "Yes") {
        bodyHtml += buildCheckRow('Lowest service counter is no higher than 38\" with a clear view from a sitting position and a check writing surface is no higher than 34\".');

        if(viewData[0].counter_height > 0 || viewData[0].writing_surface_height > 0) {
            if (viewData[0].counter_height > 0)
                counter = 'Actual service counter height: ' + viewData[0].counter_height + '\"&emsp;';
            if (viewData[0].writing_surface_height > 0)
                writing += 'Actual writing surface height: ' + viewData[0].writing_surface_height + '\"';
            bodyHtml += buildCheckRow(counter+''+writing+'.');
        }
    }

    if (viewData[0].drinking_fountain === "Yes") {
        bodyHtml += buildCheckRow('There is an accessible drinking fountain with spout no higher than 36\”, and easy to operate controls.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('interior notes:');
        bodyHtml+= buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();

    $('#report_interior').html(bodyHtml);

}

function ElevatorView() {
    var outside = "";
    var inside = "";

    $('#report_elevator').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/elevator/est/" + EST_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });


    if (viewData[0].is_elevator === "Yes") {

        bodyHtml = buildHeader('elevator');

        bodyHtml += buildDescriptionRow('This establishment has an elevator or lift.');

        if (viewData[0].location) {
            bodyHtml += buildCheckRow('Elevator or lift located <span class="lowercase">'+viewData[0].location+'</span>.');
        }

        if (viewData[0].works === "Yes") {
            bodyHtml += buildCheckRow('Elevator or lift works properly.');
        }

        if (viewData[0].no_assist === "Yes") {
            bodyHtml += buildCheckRow('Users can operate elevator or lift without having to find someone to assist or provide a key.');
        }

        if (viewData[0].button_height === "Yes") {
            bodyHtml += buildCheckRow('Buttons are no higher than 48\” ​and no lower than 15\”.');

            if(viewData[0].outside_btn_height > 0 || viewData[0].inside_btn_height > 0) {
                if (viewData[0].outside_btn_height > 0)
                    outside = 'Actual outside button height: ' + viewData[0].outside_btn_height + '\"&emsp;';
                if (viewData[0].inside_btn_height > 0)
                    inside += 'Actual inside button height: ' + viewData[0].inside_btn_height + '\"';
                bodyHtml += buildCheckRow(outside+''+inside+'.');
            }
        }

        if (viewData[0].button_use_fist === "Yes") {
            bodyHtml += buildCheckRow('Buttons are easy to press with closed fist.');
        }

        if (viewData[0].braille === "Yes") {
            bodyHtml += buildCheckRow('Buttons ​and signs ​have Braille markings​ and raised letters/numbers.');
        }

        if (viewData[0].audible_tones === "Yes") {
            bodyHtml += buildCheckRow('Elevator or lift uses ​audible tones as well as visible signals.');
        }

        if (viewData[0].lighting === "Yes" && viewData[0].lighting_type !== "N/A") {
            bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">'+viewData[0].lighting_type+'</span> and is adequate for mobility and reading signs.');
        }

        if (viewData[0].elevator_depth === "Yes") {
            bodyHtml += buildCheckRow('Elevator interior is at least 54\” deep from door to the back.');
        }

        if (viewData[0].comment) {
            bodyHtml += buildSubHeader('elevator notes:');
            bodyHtml += buildDescriptionRow(viewData[0].comment);
        }

        bodyHtml += buildSpacerRow();

        $('#report_elevator').html(bodyHtml);
    }
}

function SignageView() {
    var temp = "";

    $('#report_signage').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/signage/est/" + EST_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = buildHeader('signage');

    if (viewData[0].is_directory === "Yes") {
        bodyHtml += buildDescriptionRow('There is a directory at all accessible entrances to help visitors to find their way.');
    }

    if (viewData[0].door_signs === "Yes") {
        if (viewData[0].sign_height > 0)
            temp = ' (actual height'+viewData[0].sign_height+')';
        bodyHtml += buildCheckRow('Door signs are on latch side of door, between 48\” and 60\” from floor'+temp+'.');
    }

    if (viewData[0].pub_sign_braile === "Yes") {
        bodyHtml += buildCheckRow('Public signs have Braille.');
    }

    if (viewData[0].sign_high_contrast === "Yes") {
        bodyHtml += buildCheckRow('Signs have raised, high contrast lettering, ​low glare background.');
    }

    if (viewData[0].sign_images === "Yes") {
        bodyHtml += buildCheckRow('Signs include images, illustrations, or icons.');
    }

    if (viewData[0].written_material_images === "Yes") {
        bodyHtml += buildCheckRow('Written material (menus, etc.) includes images or illustrations.');
    }

    if (viewData[0].menu_access === "Yes") {
        bodyHtml += buildCheckRow('There is a large print menu, Braille menu, and/or on­line accessible menu.');
    }

    if (viewData[0].alt_info === "Yes") {
        if (viewData[0].alt_info_type !== "N/A")
            temp = ': '+viewData[0].alt_info_type;
        bodyHtml += buildCheckRow('Information is available in an alternative format<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('signage notes:');
        bodyHtml += buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();

    $('#report_signage').html(bodyHtml);

}

function EmergencyPreparednessView() {
    var temp = "";

    $('#report_emergency_preparedness').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/emergency/est/" + EST_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = buildHeader('emergency preparedness');

    if (viewData[0].evac_info === "Yes") {
        bodyHtml += buildDescriptionRow('Evacuation and safety information is available in a visible location.');
    }

    if (viewData[0].alt_evac_info === "Yes") {
        if (viewData[0].evac_info_format !== "N/A")
            temp = ': '+viewData[0].evac_info_format;
        bodyHtml += buildCheckRow('Evacuation and safety information is available in an alternative format<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].alarms === "Yes") {
        bodyHtml += buildCheckRow('Emergency alarms both audible and visible (flashing or strobe).');
    }

    if (viewData[0].location_no_flash === "Yes") {
        bodyHtml += buildCheckRow('There is an emergency location available where there are no flashing alarms.');
    }

    if (viewData[0].shelter === "Yes") {
        bodyHtml += buildCheckRow('There is an area of refuge, shelter in place during emergencies.');
    }

    if (viewData[0].signs_to_exit === "Yes") {
        bodyHtml += buildCheckRow('Signs direct patrons to exits, safety zone, fire extinguishers and alarm pull boxes.');
    }

    if (viewData[0].wheelchair_plan === "Yes") {
        bodyHtml += buildCheckRow('There is a plan for evacuating persons using wheelchairs in case elevators are inoperable.');
    }

    if (viewData[0].floor_plan_routes === "Yes") {
        bodyHtml += buildCheckRow('Posted floor plans show emergency routes, and locations of fire extinguishers and alarm pull boxes.');
    }

    if (viewData[0].fire_alarm_height === "Yes") {
        bodyHtml += buildCheckRow('Fire alarms pull boxes are no higher than 48\”.');
    }

    if (viewData[0].fire_extinguisher_height === "Yes") {
        bodyHtml += buildCheckRow('Fire extinguishers are mounted with bottom no higher than 48\”.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('emergency preparedness notes:');
        bodyHtml += buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();

    $('#report_emergency_preparedness').html(bodyHtml);

}

function SeatingView() {
    var temp = "";
    var num = "";
    var num_tables = "";
    var num_chairs = "";

    $('#report_seating').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/seating/est/" + EST_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = buildHeader('seating');

    if (viewData[0].seating_no_step === "Yes") {
        bodyHtml += buildCheckRow('One or more seating areas in the common area can be accessed without steps.');
    }

    if (viewData[0].table_aisles === "Yes") {
        bodyHtml += buildCheckRow('Customers can maneuver between tables without bumping into chairs (36” aisles).');
    }

    if (viewData[0].legroom === "Yes") {
        if (viewData[0].num_legroom === "All")
            temp = 'All tables have ​legroom for wheelchair users (bottom of table = 27 ​ to 34”)';
        else {
            num = numberToEnglish(viewData[0].num_legroom, " ");
            temp = 'There are '+num+' tables with ​legroom for wheelchair users (bottom of table = 27 ​ to 34”)';
        }
        bodyHtml += buildCheckRow(temp+'.');
    }

    if (viewData[0].rearranged === "Yes") {
        if (viewData[0].num_table_rearranged === "All" && viewData[0].num_chair_rearranged === "All")
            temp = 'All tables and chairs that can be moved or rearranged';
        else {
            num_tables = numberToEnglish(viewData[0].num_table_rearranged, " ");
            num_chairs = numberToEnglish(viewData[0].num_chair_rearranged, " ");
            temp = 'There are '+num_tables+' tables and '+num_chairs+' ​chairs that can be moved or rearranged';
        }
        bodyHtml += buildCheckRow(temp+'.');
    }

    if (viewData[0].round_tables === "Yes") {
        if (viewData[0].num_round_tables > 0) {
            num = numberToEnglish(viewData[0].num_table_rearranged, " ");
            temp = 'There are '+num+' round tables ​that can be moved or rearranged';
        }
        bodyHtml += buildCheckRow(temp+'.');
    }

    if (viewData[0].lighting === "Yes" && viewData[0].lighting_type !== "N/A" && viewData[0].lighting_option !== "N/A") {
        bodyHtml += buildCheckRow('Lighting level in the main seating area is <span class="lowercase">'+viewData[0].lighting_type+' during the '+viewData[0].lighting_option+'</span> and is adequate to read the menu/ program.');
    }

    if (viewData[0].adjustable_lighting === "Yes") {
        bodyHtml += buildCheckRow('There are one or more available spaces with adjustable lighting, lower or brighter lighting.');
    }

    if (viewData[0].low_visual_slim === "Yes") {
        bodyHtml += buildCheckRow('There are one or more areas with low visual stimulation (windows covered, non­distracting wallpaper).');
    }

    if (viewData[0].quiet_table === "Yes") {
        bodyHtml += buildCheckRow('There is a quiet table, room or area available on request.');
    }

    if (viewData[0].low_sound === "Yes") {
        bodyHtml += buildCheckRow('There is an area with low or no background sound, and/ or that has sound­absorbing surfaces.');
    }

    if (viewData[0].designated_space === "Yes") {
        if (viewData[0].num_desig_space > 0) {
            num = numberToEnglish(viewData[0].num_desig_space, " ");
            temp = 'There are '+num+' spaces designated for wheelchair users that have the same general views as the rest of the audience when the person is seated';
        }
        bodyHtml += buildCheckRow(temp+'.');
    }

    if (viewData[0].companion_space === "Yes") {
        bodyHtml += buildCheckRow('There are spaces for companions to sit next to the wheelchair users.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('seating notes:');
        bodyHtml += buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();

    $('#report_seating').html(bodyHtml);

}

function RestroomView() {
    var temp = "";
    var restroomInfoData = "";

    $('#report_restroom').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/restroom/est/" + EST_ID,
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
        url: "get/restroom_info/rest/" + REST_ID,
        success: function (data) {
            restroomInfoData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = buildHeader('restroom');

    if (viewData[0].public_restroom === "Yes") {

        if (viewData[0].total_num > 0 && viewData[0].total_num < 2)
            temp = 'There is '+numberToEnglish(viewData[0].total_num, " ")+' public restroom available near or ​at the location.';
        else if (viewData[0].total_num > 1)
            temp = 'There are '+numberToEnglish(viewData[0].total_num, " ")+' public restrooms available near or ​at the location.';
        bodyHtml += buildDescriptionRow(temp+'.');


        if (viewData[0].designated_number > 0) {
            if (viewData[0].designated_number > 0 && viewData[0].designated_number < 2)
                temp = 'There is '+numberToEnglish(viewData[0].designated_number, " ")+' accessible restroom designated “family”, “unisex”, or “assisted use”.';
            else if (viewData[0].designated_number > 1)
                temp = 'There are '+numberToEnglish(viewData[0].designated_number, " ")+' accessible restrooms designated “family”, “unisex”, or “assisted use”.';
            bodyHtml += buildCheckRow(temp+'.');
        }

        if (viewData[0].num_wheelchair_sign > 0) {
            if (viewData[0].num_wheelchair_sign > 0 && viewData[0].num_wheelchair_sign < 2)
                temp = 'There is '+numberToEnglish(viewData[0].num_wheelchair_sign, " ")+' restroom that has a “wheelchair accessible” sign.';
            else if (viewData[0].num_wheelchair_sign > 1)
                temp = 'There are '+numberToEnglish(viewData[0].num_wheelchair_sign, " ")+' restrooms that have a “wheelchair accessible” sign.';
            bodyHtml += buildCheckRow(temp+'.');
        }

        if (viewData[0].sign_accessable === "Yes") {
            bodyHtml += buildCheckRow('Restrooms signs have high contrast, Braille, raised lettering, low glare background.');
        }

        if (viewData[0].sign_location === "Yes") {
            bodyHtml += buildCheckRow('Signage is on latch side of door between 48” and 60” above floor.');
        }

        if (viewData[0].key_needed === "Yes") {
            bodyHtml += buildCheckRow('Users do not need to ask someone for a KEY to use the restroom.');
        }

        if (viewData[0].comment) {
            bodyHtml += buildSubHeader('general restroom notes:');
            bodyHtml += buildDescriptionRow(viewData[0].comment);
        }

        bodyHtml += buildSpacerRow();

        for (var i = 0; i < restroomInfoData.length; i++) {

            if (viewData[0].total_num > 0 && viewData[0].total_num < 2)
                temp = 'Restroom ';
            else
                temp = 'Restroom '+(i+1);

            bodyHtml += buildSubHeader(temp);

            if (restroomInfoData[i].restroom_desc) {
                bodyHtml += buildDescriptionRow(restroomInfoData[i].restroom_desc);
            }

            if (restroomInfoData[i].easy_open === "Yes") {
                if (restroomInfoData[i].lbs_force > 0)
                    temp = ' (actual '+restroomInfoData[i].lbs_force+' lbs)';
                bodyHtml += buildCheckRow('Room door is easy to open, requiring 5 lb. or less force'+temp+'.');
            }

            if (restroomInfoData[i].clearance === "Yes") {
                bodyHtml += buildCheckRow('Stall/room door has at least 32” clearance when the door is open.');
            }

            if (restroomInfoData[i].opens_out === "Yes") {
                bodyHtml += buildCheckRow('The stall door opens to the outside.');
            }

            if (restroomInfoData[i].use_fist === "Yes") {
                bodyHtml += buildCheckRow('The stall door can be opened, closed, and latched with a closed fist.');
            }

            if (restroomInfoData[i].can_turn_around === "Yes") {
                bodyHtml += buildCheckRow('The stall or room is large enough for a wheelchair or walker to turn around [at least 60” wide, at least 56” deep].');
            }

            if (restroomInfoData[i].close_chair_inside === "Yes") {
                bodyHtml += buildCheckRow('The stall or room door can be closed once a wheelchair is inside.');
            }

            if (restroomInfoData[i].grab_bars === "Yes") {
                bodyHtml += buildCheckRow('Grab bars are easily reachable behind the toilet and on the side wall ​nearest the toilet.');
            }

            if (restroomInfoData[i].seat_height_req === "Yes") {
                bodyHtml += buildCheckRow('The height of the toilet seat is at least 17” from the floor.');
            }

            if (restroomInfoData[i].flush_auto_fist === "Yes") {
                bodyHtml += buildCheckRow('The toilet flushes automatically, or can be operated with a closed fist.');
            }

            if (restroomInfoData[i].ambulatory_accessible === "Yes") {
                bodyHtml += buildCheckRow('There is at least one is ambulatory accessible with grab bars on either side and toilet height at least 17\” from floor.');
            }

            if (restroomInfoData[i].coat_hook === "Yes") {
                bodyHtml += buildCheckRow('There is a coat hook that is between 35\” and 48\” from the floor.');
            }

            if (restroomInfoData[i].sink === "Yes") {
                bodyHtml += buildCheckRow('The height of the sink/countertop is 34\” or less from the floor.');
            }

            if (restroomInfoData[i].faucet === "Yes") {
                bodyHtml += buildCheckRow('The faucet control is 17” or less from the front edge of the sink counter.');
            }

            if (restroomInfoData[i].faucet_auto_fist === "Yes") {
                bodyHtml += buildCheckRow('Faucet​ can ​be operated ​automatically or ​with a closed fist.');
            }

            if (restroomInfoData[i].sink_clearance === "Yes") {
                bodyHtml += buildCheckRow('There is room for a wheelchair to roll under the sink.');
            }

            if (restroomInfoData[i].sink_pipes === "Yes") {
                bodyHtml += buildCheckRow('Pipes under the sink are covered to prevent injury or burns.');
            }

            if (restroomInfoData[i].soap_dispenser === "Yes") {
                bodyHtml += buildCheckRow('The height of the soap dispenser control is 48” or less from the floor.');
            }

            if (restroomInfoData[i].dry_fist === "Yes") {
                bodyHtml += buildCheckRow('Hand dryer or towel dispenser can be operated automatically or with closed fist.');
            }

            if (restroomInfoData[i].dry_control_height === "Yes") {
                bodyHtml += buildCheckRow('Controls for hand dryer or towel dispenser are 48” or less from floor.');
            }

            if (restroomInfoData[i].mirror === "Yes") {
                bodyHtml += buildCheckRow('The bottom edge of the lowest mirror is no more than 40" from the floor.');
            }

            if (restroomInfoData[i].shelves === "Yes") {
                bodyHtml += buildCheckRow('Shelves to set items on are no more than 48" from the floor.');
            }

            if (restroomInfoData[i].trash_receptacles === "Yes") {
                bodyHtml += buildCheckRow('Trash receptacles are positioned so they do not block the route to the door.');
            }

            if (restroomInfoData[i].hygiene_seat_cover === "Yes") {
                bodyHtml += buildCheckRow('Feminine hygiene product & toilet seat cover dispensers are 48” or less from floor.');
            }

            if (restroomInfoData[i].lighting === "Yes" && restroomInfoData[i].lighting_type !== "N/A") {
                bodyHtml += buildCheckRow('Lighting level is <span class="lowercase">' + restroomInfoData[i].lighting_type + '</span> and is adequate for mobility and reading signs.');
            }

            if (restroomInfoData[i].comment) {
                bodyHtml += buildSubHeader('restroom notes:');
                bodyHtml += buildDescriptionRow(restroomInfoData[i].comment);
            }

        }

    }
    else {
        bodyHtml += buildDescriptionRow('There are no public Restrooms ​are available near or ​at the location.');
    }

    bodyHtml += buildSpacerRow();

    $('#report_restroom').html(bodyHtml);

}

function CommunicationView() {
    var temp = "";
    var device = "";
    var receiver = "";
    var fee = "";

    $('#report_communication').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/communication/est/" + EST_ID,
        success: function (data) {
            viewData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = buildHeader('communication technologies & customer service');

    if (viewData[0].public_phone === "Yes") {
        bodyHtml += buildCheckRow('One or more public phones are available w/adjustable volume control.');
    }

    if (viewData[0].phone_clearance === "Yes") {
        if (viewData[0].num_phone < 1)
            temp = 'There is at least one public phone w/ controls min 48” from floor, protruding < 4” from wall';
        else if (viewData[0].num_phone < 2)
            temp = 'There is '+numberToEnglish(viewData[0].num_phone,"")+' public phone w/ controls min 48” from floor, protruding < 4” from wall';
        else if (viewData[0].num_phone > 1)
            temp = 'There are '+numberToEnglish(viewData[0].num_phone,"")+' public phones w/ controls min 48” from floor, protruding < 4” from wall';

        bodyHtml += buildCheckRow(temp+'.');
    }

    if (viewData[0].tty === "Yes") {
        bodyHtml += buildCheckRow('There is a TTY is available.');
    }

    if (viewData[0].staff_tty === "Yes") {
        bodyHtml += buildCheckRow('Staff are trained in use of TTY, and how to accept relay calls.');
    }

    if (viewData[0].assisted_listening === "Yes") {
        if (viewData[0].assisted_listen_type !== "N/A")
            device = ' '+viewData[0].assisted_listen_type;
        if (viewData[0].assisted_listen_receiver !== "N/A")
            receiver = ' '+viewData[0].assisted_listen_receiver;

        bodyHtml += buildCheckRow('The following assisted listening devices are available:'+device+receiver+'.');
    }

    if (viewData[0].listening_signage === "Yes") {
        bodyHtml += buildCheckRow('Signs about listening devices are clearly displayed.');
    }

    if (viewData[0].staff_listening === "Yes") {
        bodyHtml += buildCheckRow('Staff are trained to use assisted listening devices.');
    }

    if (viewData[0].acoustics === "Yes") {
        if (viewData[0].acoustics !== "N/A")
            temp = viewData[0].acoustics_level;
        bodyHtml += buildCheckRow('The acoustics are comfortable (no echoing, loud music, etc) Noise level: '+temp+'.');
    }

    if (viewData[0].alt_comm_methods === "Yes") {
        if (viewData[0].alt_comm_type)
            temp = ' include: '+viewData[0].alt_comm_type;
        bodyHtml += buildCheckRow('If a customer is unable to hear, there are other forms of communication<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].staff_ASL === "Yes") {
        bodyHtml += buildCheckRow('Staff have received instructions on how to provide ASL services upon request (in person or remote).');
    }

    if (viewData[0].captioning_default === "Yes") {
        bodyHtml += buildCheckRow('Captioning is turned ‘on’ as default for TVs or projected video.');
    }

    if (viewData[0].theater_captioning === "Yes") {
        if (viewData[0].theater_captioning !== "N/A")
            temp = ' includes: '+viewData[0].theater_captioning;
        bodyHtml += buildCheckRow('There is captioning in this theater<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].auditory_info_visual === "Yes") {
        bodyHtml += buildCheckRow('Auditory information is presented visually.');
    }

    if (viewData[0].visual_info_auditory === "Yes") {
        bodyHtml += buildCheckRow('Visual information is presented audibly.');
    }

    if (viewData[0].website_text_reader === "Yes") {
        bodyHtml += buildCheckRow('The establishment\'s website is accessible to users of screen text readers.');
    }

    if (viewData[0].alt_contact === "Yes") {
        if (viewData[0].alt_contact !== "N/A")
            temp = ' includes: '+viewData[0].alt_contact_type;
        bodyHtml += buildCheckRow('There are alternate means for patrons to order, contact, or schedule<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].shopping_assist === "Yes") {
        if (viewData[0].assist_service !== "N/A") {
            temp = ' ' + viewData[0].assist_service;
            if (viewData[0].assist_service === "Yes")
                temp += ' for a fee';
            else if (viewData[0].assist_service === "No")
                temp += ' for free';
        }
        bodyHtml += buildCheckRow('he establishment offers<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].captioning_default === "Yes") {
        bodyHtml += buildCheckRow('Captioning is turned ‘on’ as default for TVs or projected video.');
    }

    if (viewData[0].theater_captioning === "Yes") {
        if (viewData[0].theater_captioning !== "N/A")
            temp = ' includes: '+viewData[0].theater_captioning;
        bodyHtml += buildCheckRow('There is captioning in this theater<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].auditory_info_visual === "Yes") {
        bodyHtml += buildCheckRow('Auditory information is presented visually.');
    }

    if (viewData[0].visual_info_auditory === "Yes") {
        bodyHtml += buildCheckRow('Visual information is presented audibly.');
    }

    if (viewData[0].website_text_reader === "Yes") {
        bodyHtml += buildCheckRow('The establishment\'s website is accessible to users of screen text readers.');
    }

    if (viewData[0].alt_contact === "Yes") {
        if (viewData[0].alt_contact !== "N/A")
            temp = ' includes: '+viewData[0].alt_contact_type;
        bodyHtml += buildCheckRow('There are alternate means for patrons to order, contact, or schedule<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].shopping_assist === "Yes") {
        if (viewData[0].assist_service !== "N/A") {
            temp = ' ' + viewData[0].assist_service;
            if (viewData[0].assist_service === "Yes")
                temp += ' for a fee';
            else if (viewData[0].assist_service === "No")
                temp += ' for free';
        }
        bodyHtml += buildCheckRow('Scooters are available<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].store_scooter === "Yes") {
        if (viewData[0].scooter_location) {
            temp = ' and located ' + viewData[0].scooter_location;
            if (viewData[0].scooter_fee === "Yes")
                temp += ' for a fee';
            else if (viewData[0].scooter_fee === "No")
                temp += ' for free';
        }
        bodyHtml += buildCheckRow('Captioning is turned ‘on’ as default for TVs or projected video.');
    }

    if (viewData[0].restaurant_allergies === "Yes") {
        bodyHtml += buildCheckRow('Information is available on food allergies, sensitivities.');
    }

    if (viewData[0].staff_disable_trained === "Yes") {
        bodyHtml += buildCheckRow('In the last 12 months the staff have received training  on how to provide “disability friendly” customer service.');

        if (viewData[0].staff_disable_trained_desc) {
            bodyHtml += buildCheckRow('This training includes: <span class="lowercase">'+viewData[0].staff_disable_trained_desc+'</span>.');
        }
    }

    if (viewData[0].visual_info_auditory === "Yes") {
        bodyHtml += buildCheckRow('Visual information is presented audibly.');
    }

    if (viewData[0].items_reach === "Yes") {
        bodyHtml += buildCheckRow('All items are within reach, or assistance is offered to reach them.');
    }

    if (viewData[0].service_alt_manner === "Yes") {
        bodyHtml += buildCheckRow('If goods and services are not accessible, they are provided in an alternative manner.');
    }

    if (viewData[0].senior_discount === "Yes") {
        if (viewData[0].senior_age > 0)
            temp = viewData[0].senior_age+' years of age and older';
        bodyHtml += buildCheckRow('A senior discount is offered to patrons<span class="lowercase">'+temp+'</span>.');
    }

    if (viewData[0].annual_A4A_review === "Yes") {
        bodyHtml += buildCheckRow('Management has agreed to annual A4A reviews.');
    }

    if (viewData[0].comment) {
        bodyHtml += buildSubHeader('communication technologies & customer service notes:');
        bodyHtml += buildDescriptionRow(viewData[0].comment);
    }

    bodyHtml += buildSpacerRow();

    $('#report_communication').html(bodyHtml);

}