var EST_ID = localStorage.getItem("establishmentID");
var PARK_ID = 0;
var CAT_ID = 0;
var CAT_NAME = "";
var CONFIG_ID = 0;
var CONFIG_NAME = "";
var USER_ID = 0;
var USER_NAME = "";
var STA_ID = 0;
var REST_ID = 0;
var bodyHtml = "";

$(document).ready(function () {

    getParkId(EST_ID);
    getIds(EST_ID);
    getStaBusId(PARK_ID);
    getRestroomId(EST_ID);
    getCategoryName(CAT_ID);
    getConfigName(CONFIG_ID);
    getUserName(USER_ID);

    EstablishmentView();
    ParkingView();
    RouteFromParkingView();
    PassengerLoadingView();
    StaBusView();
    ExteriorPathwayView();
    ExteriorStairsView();
    ExteriorRampsView();
    MainEntranceView();
    InteriorView();
    ElevatorView();
    SignageView();
    EmergencyView();
    SeatingView();
    RestroomView();
    RestroomInfoView();
    CommunicationView();

    // Scrolls selected accordion card to the top of the page
    $('.collapse').on('shown.bs.collapse', function(e) {
        var $card = $(this).closest('.card');
        $('html,body').animate({
            scrollTop: $card.offset().top - 112
        }, 500);
    });


});

function logout() {
    localStorage.clear();
    location.href = "logout.php";
}

// value is EST_ID
function getParkId(value) {
    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/park_id/est/' + value,
        success: function (data) {
            if (data[0] !== undefined)
                PARK_ID = data[0].park_id;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

// value is EST_ID
function getIds(value) {
    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/establishment/' + value,
        success: function (data) {
            CAT_ID = data[0].cat_id;
            CONFIG_ID = data[0].config_id;
            USER_ID = data[0].user_id;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

// value is CAT_ID
function getCategoryName(value) {
    if(value != 0) {
        $.ajax({
            async: false,
            dataType: 'json',
            url: 'get/category/' + value,
            success: function (data) {
                CAT_NAME = data[0].name;
            },
            error: function(data) {
                $("#alert-body").html(JSON.stringify(data));
                $("#alert").modal('toggle');
            }
        });
    }
}

// value is CONFIG_ID
function getConfigName(value) {
    if(value != 0) {
        $.ajax({
            async: false,
            dataType: 'json',
            url: 'get/configuration/' + value,
            success: function (data) {
                CONFIG_NAME = data[0].name;
            },
            error: function(data) {
                $("#alert-body").html(JSON.stringify(data));
                $("#alert").modal('toggle');
            }
        });
    }
}

// value is USER_ID
function getUserName(value) {
    if(value != 0) {
        $.ajax({
            async: false,
            dataType: 'json',
            url: 'get/user/' + value,
            success: function (data) {
                USER_NAME = data[0].fname + " " + data[0].lname;
            },
            error: function(data) {
                $("#alert-body").html(JSON.stringify(data));
                $("#alert").modal('toggle');
            }
        });
    }
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

function EstablishmentView() {
    var categoryData = "";
    var configData = "";
    var userData = "";
    var estData = "";

    $('#establishment_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "category/",
        success: function (data) {
            categoryData = data;
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
        url: "configuration/",
        success: function (data) {
            configData = data;
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
        url: "user/active/",
        success: function (data) {
            userData = data;
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
        url: "get/establishment/" + EST_ID,
        success: function (data) {
            estData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = '<div class="card-row">\n' +
        '               <div class="col-6"><label class="view-label" for="name"> Establishment Name: </label><br><span class="view" id="name" >' + estData[0].name + '</span></div>\n' +
        '               <div class="col-6"><label class="view-label" for="website"> Website: </label><br><span class="view" id="website" >' + estData[0].website + '</span></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-4">\n' +
        '                   <label class="view-label" for="cat_id"> Category: </label><br><span class="view" id="cat_id" >' + categoryData[0].name + ' </span></div>\n' +
        '               <div class="col-4">\n' +
        '                   <label class="view-label" for="subtype"> Subtype: </label><br><span class="view" id="subtype" >' + estData[0].subtype + '</span>\n' +
        '               </div>\n' +
        '               <div class="col-4">\n' +
        '                   <label class="view-label" for="cat_id"> Configuration: </label><br><span class="view" id="config_id">' + configData[0].name + '</span></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-12"><label class="view-label" for="street"> Street: </label><br><span class="view" id="street" >' + estData[0].street + '</span></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-6"><label class="view-label" for="city"> City: </label><br><span class="view" id="city" >' + estData[0].city + '</span></div>\n' +
        '               <div class="col-2"><label class="view-label" for="state"> State: </label><br><span class="view" id="state" >' + estData[0].state + '</span></div>\n' +
        '               <div class="col-4"><label class="view-label" for="zip"> Zip: </label><br><span class="view" id="zip" >' + estData[0].zip + '</span></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-6"><label class="view-label" for="phone"> Main Phone: </label><br><span class="view" id="phone" >' + estData[0].phone + '</span></div>\n' +
        '               <div class="col-6"><label class="view-label" for="phone_tty"> TTY/TTD: </label><br><span class="view" id="phone_tty" >' + estData[0].tty + '</span></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-4"><label class="view-label" for="contact_fname"> Contact First Name: </label><br><span class="view" id="contact_fname" >' + estData[0].contact_fname + '</span></div>\n' +
        '               <div class="col-4"><label class="view-label" for="contact_lname"> Contact Last Name: </label><br><span class="view" id="contact_lname" >' + estData[0].contact_lname + '</span></div>\n' +
        '               <div class="col-4"><label class="view-label" for="contact_title"> Contact Title: </label><br><span class="view" id="contact_title" >' + estData[0].contact_title + '</span></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-4"><label class="view-label" for="contact_email"> Email: </label><br><span class="view" id="contact_email" >' + estData[0].contact_email + '</span></div>\n' +
        '               <div class="col-4">\n' +
        '                   <label class="view-label" for="user_id"> Surveyor: </label><br><span class="view" >' + userData[0].fname + ' ' + userData[0].lname + '</span></div>\n' +
        '               <div class="col-4"><label class="view-label" for="date"> Survey Date: </label><br><span class="view" id="date" >' + estData[0].date + '</span></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-12"><label class="view-label" for="commentEstablishment"> Comment: </label><br><span class="view" id="commentEstablishment" >' + estData[0].config_comment + '</span></div>\n' +
        '           </div>';

    $('#establishment_card').html(bodyHtml);
    $('#left_sb_name').html(estData[0].name);

}

function ParkingView() {
    var parkingData = "";

    $('#parking_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/parking/est/" + EST_ID,
        success: function (data) {
            parkingData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = '<div class="card-row">\n' +
        '       <div class="col-6"><label class="view-label" for="lot_free"> Lot parking Free/Paid: </label> <br><span class="view" id="lot_free" >'+parkingData[0].lot_free+'</span></div>\n' +
        '       <div class="col-6"><label class="view-label" for="street_metered"> Street parking Metered/Not Metered: </label><br><span class="view" id="street_metered" >'+parkingData[0].street_metered+'</span></div>' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-6"><label class="view-label" for="parking_type"> Other type of parking: </label><br><span class="view" id="parking_type" >'+parkingData[0].parking_type+'</span></div>\n' +
        '       <div class="col-6"><label class="view-label" for="total_num_spaces"> Total number of spaces: </label> <br><span class="view" id="total_num_spaces" >'+parkingData[0].total_num_spaces+'</span></div>\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '        <div class="col-6"><label class="view-label" for="num_reserved_spaces"> Number of reserved spaces: </label><br><span class="view" id="num_reserved_spaces" >'+parkingData[0].num_reserved_spaces+'</span></div>\n' +
        '       <div class="col-6"><label class="view-label" for="num_accessable_space"> Number of accessible spaces: </label><br><span class="view" id="num_accessable_space" >'+parkingData[0].num_accessable_space+'</span></div>\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-6"><label class="view-label" for="num_van_accessible"> Number of van accessible spaces: </label><br><span class="view" id="num_van_accessible" >'+parkingData[0].num_van_accessible+'</span></div>\n' +
        '       <div class="col-6"><label class="view-label" for="reserve_space_sign"> Reserved space signage is unobstructed: </label><br><span class="view" id="reserve_space_sign" >'+parkingData[0].reserve_space_sign+'</span></div>\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-6"><label class="view-label" for="reserve_space_obstacles"> Reserved parking free of obstacles: </label><br><span class="view" id="reserve_space_obstacles" >'+parkingData[0].reserve_space_obstacles+'</span></div>' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-12"><label class="view-label" for="comment"> Describe parking area: </label><br><span class="view" id="comment" >'+parkingData[0].comment+'</span></div>\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-12"><label class="view-label" for="recommendations"> Recommendations: </label><br><span class="view" id="recommendations" >'+parkingData[0].recommendations+'</span></div>\n' +
        '   </div>';

    $('#parking_card').append(bodyHtml);

}

function RouteFromParkingView() {
    var routeFromParkingData = "";

    $('#route_from_parking_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/route_from_parking/park/" + PARK_ID,
        success: function (data) {
            routeFromParkingData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = '<div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="distance"> Distance from reserved parking to accessible entrance (feet): </label> <br><span class="view" id="distance" >' + routeFromParkingData[0].distance + '</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="min_width"> Route is minimum width and free of obstacles: </label><br><span class="view" id="min_width" >' + routeFromParkingData[0].min_width + '</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="route_surface"> Route surface is level, unbroken, firm, slip-resistant: </label><br><span class="view" id="route_surface" >' + routeFromParkingData[0].route_surface + '</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="route_curbs"> Route has curb ramps and curb cuts where needed: </label> <br><span class="view" id="route_curbs" >' + routeFromParkingData[0].route_curbs + '</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="tactile_warning"> Tactile warning strips are installed: </label><br><span class="view" id="tactile_warning" >' + routeFromParkingData[0].tactile_warning + '</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="covered"> Route from parking to accessible entrance is covered: </label><br><span class="view" id="covered" >' + routeFromParkingData[0].covered + '</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="lighting"> Lighting is adequate: </label><br><span class="view" id="lighting" >' + routeFromParkingData[0].lighting + '</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_option"> Lighting level day/night: </label><br><span class="view" id="lighting_option" >' + routeFromParkingData[0].lighting_option + '</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_type"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_type" >' + routeFromParkingData[0].lighting_type + '</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentRouteFromParking"> Describe the route: </label><br><span class="view" id="commentRouteFromParking" >' + routeFromParkingData[0].comment + '</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsRouteFromParking"> Recommendations: </label><br><span class="view" id="recommendationsRouteFromParking" >' + routeFromParkingData[0].recommendations + '</span></div>\n' +
        '        </div>';

    $('#route_from_parking_card').append(bodyHtml);

}

function PassengerLoadingView() {
    var passengerLoadingData = "";

    $('#passenger_loading_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/passenger_loading/park/" + PARK_ID,
        success: function (data) {
            passengerLoadingData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = 
        '   <div class="card-row">\n' +
        '        <div class="col-6"><label class="view-label" for="designated_zonePassengerLoading"> There is a designated passenger loading zone: </label> <br><span class="view" id="designated_zonePassengerLoading" >'+passengerLoadingData[0].designated_zone+'</span></div>\n' +
        '        <div class="col-6"><label class="view-label" for="distancePassengerLoading"> Distance from passenger loading zone (feet): </label> <br><span class="view" id="distancePassengerLoading" >'+passengerLoadingData[0].distance+'</span></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-6"><label class="view-label" for="min_widthPassengerLoading"> Route is minimum width and free of obstacles: </label><br><span class="view" id="min_widthPassengerLoading" >'+passengerLoadingData[0].min_width+'</span></div>\n' +
        '        <div class="col-6"><label class="view-label" for="passenger_surfacePassengerLoading"> Route surface is level, unbroken, firm, slip-resistant: </label><br><span class="view" id="passenger_surfacePassengerLoading" >'+passengerLoadingData[0].passenger_surface+'</span></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-4"><label class="view-label" for="tactile_warning_stripsPassengerLoading"> Tactile warning strips are installed:</label><br><span class="view" id="tactile_warning_stripsPassengerLoading" >'+passengerLoadingData[0].tactile_warning_strips+'</span></div>\n' +
        '        <div class="col-4"><label class="view-label" for="passenger_curbs"> Route has curb ramps and curb cuts where needed: </label><br><span class="view" id="passenger_curbs" >'+passengerLoadingData[0].passenger_curbs+'</span></div>\n' +
        '        <div class="col-4"><label class="view-label" for="coveredPassengerLoading"> Route from parking to accessible entrance is covered: </label><br><span class="view" id="coveredPassengerLoading" >'+passengerLoadingData[0].covered+'</span></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-4"><label class="view-label" for="lightingPassengerLoading"> Lighting is adequate: </label><br><span class="view" id="lightingPassengerLoading" >'+passengerLoadingData[0].lighting+'</span></div>\n' +
        '        <div class="col-4"><label class="view-label" for="lighting_optionPassengerLoading"> Lighting level day/night: </label><br><span class="view" id="lighting_optionPassengerLoading" >'+passengerLoadingData[0].lighting_option+'</span></div>\n' +
        '        <div class="col-4"><label class="view-label" for="lighting_typePassengerLoading"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typePassengerLoading" >'+passengerLoadingData[0].lighting_type+'</span></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-12"><label class="view-label" for="commentPassengerLoading"> Describe the route: </label><br><span class="view" id="commentPassengerLoading" >'+passengerLoadingData[0].comment+'</span></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-12"><label class="view-label" for="recommendationsPassengerLoading"> Recommendations: </label><br><span class="view" id="recommendationsPassengerLoading" >'+passengerLoadingData[0].recommendations+'</span></div>\n' +
        '    </div>';

    $('#passenger_loading_card').html(bodyHtml);
    
}

function StaBusView() {
    var staBusData = "";
    var staRouteData = "";

    $("#sta-route-modal").modal('hide');

    $('#sta_bus_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/sta_bus/park/" + PARK_ID,
        success: function (data) {
            staBusData = data;

            $.ajax({
                async: false,
                accepts: "application/json",
                method: "GET",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                url: "/get/sta_route/sta_bus/" + staBusData[0].sta_id,
                success: function (data) {
                    staRouteData = data;
                },
                error: function (data) {
                    $("#alert-body").empty();
                    $("#alert-body").append(data);
                    $("#alert").modal('toggle');
                }
            });
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = 
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="sta_service_area"> Establishment is within the STA Service Area: </label> <br><span class="view" id="sta_service_area">'+staBusData[0].sta_service_area+'</span></div>\n ' +
        '        </div>\n';

    for(var i = 0; i < staRouteData.length; i++ ) {
        bodyHtml += '<div class="card-row">\n' +
            '           <div class="col-2"><label class="view-label" for="route_num_'+staRouteData[i].sta_route_id+'"  > Route Number: </label><br><span class="view" id="route_num_'+staRouteData[i].sta_route_id+'" >'+staRouteData[i].route_num+'</span></div>\n' +
            '           <div class="col-2"><label class="view-label" for="north_bound_stop_'+staRouteData[i].sta_route_id+'" > North Bound Stop: </label><br><span class="view" id="north_bound_stop_'+staRouteData[i].sta_route_id+'" >'+staRouteData[i].north_bound_stop+'</span></div>\n' +
            '           <div class="col-2"><label class="view-label" for="south_bound_stop_'+staRouteData[i].sta_route_id+'" > South Bound Stop: </label><br><span class="view" id="south_bound_stop_'+staRouteData[i].sta_route_id+'" >'+staRouteData[i].south_bound_stop+'</span></div>\n' +
            '           <div class="col-2"><label class="view-label" for="east_bound_stop_'+staRouteData[i].sta_route_id+'" > East Bound Stop: </label><br><span class="view" id="east_bound_stop_'+staRouteData[i].sta_route_id+'" >'+staRouteData[i].east_bound_stop+'</span></div>\n' +
            '           <div class="col-2"><label class="view-label" for="west_bound_stop_'+staRouteData[i].sta_route_id+'" > West Bound Stop: </label><br><span class="view" id="west_bound_stop_'+staRouteData[i].sta_route_id+'" >'+staRouteData[i].west_bound_stop+'</span></div>\n' +
            '       </div>\n';
    }

    bodyHtml += '<div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="distanceStaBus"> Distance from nearest bus stop (feet): </label> <br><span class="view" id="distanceStaBus" >'+staBusData[0].distance+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="min_widthStaBus"> Route is minimum width and free of obstacles: </label><br><span class="view" id="min_widthStaBus" >'+staBusData[0].min_width +'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="route_surfaceStaBus"> Route surface is level, unbroken, firm, slip-resistant: </label><br><span class="view" id="route_surfaceStaBus" >'+staBusData[0].route_surface +'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="tactile_warning_stripsStaBus"> Tactile warning strips are installed: </label><br><span class="view" id="tactile_warning_stripsStaBus" >'+staBusData[0].tactile_warning_strips +'</span></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="curb_cutsStaBus"> Route has curb ramps and curb cuts where needed: </label><br><span class="view" id="curb_cutsStaBus" >'+staBusData[0].curb_cuts +'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="lightingStaBus"> Lighting is adequate: </label><br><span class="view" id="lightingStaBus" >'+staBusData[0].lighting +'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_optionStaBus"> Lighting level day/night: </label><br><span class="view" id="lighting_optionStaBus" >'+staBusData[0].lighting_option +'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_typeStaBus"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeStaBus" >'+staBusData[0].lighting_type +'</span></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="shelter_bench"> Shelter or Bench at bust stop: </label><br><span class="view" id="shelter_bench" >'+staBusData[0].shelter_bench +'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentStaBus"> Describe the route: </label><br><span class="view" id="commentStaBus" >'+staBusData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsStaBus"> Recommendations: </label><br><span class="view" id="recommendationsStaBus" >'+staBusData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#sta_bus_card').html(bodyHtml);

}

function ExteriorPathwayView() {
    var exteriorPathwayData = "";

    $('#exterior_pathways_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/exterior_pathways/est/" + EST_ID,
        success: function (data) {
            exteriorPathwayData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = '<div class="card-row">\n' +
        '   <div class="col-4"><label class="view-label" for="service_animal"> There is a service animal relief area on the premises or within 1 block: </label> <br><span class="view" id="service_animal" >'+exteriorPathwayData[0].service_animal+'</span></div>\n ' +
    '            <div class="col-8"><label class="view-label" for="service_animal_location"> Location of service animal relief: </label> <br><span class="view" id="service_animal_location"  >' + exteriorPathwayData[0].service_animal_location + '</span></span></div>\n' +
    '        </div>\n' +
    '        <div class="card-row">\n' +
    '            <div class="col-6"><label class="view-label" for="has_exterior_path"> The establishment has exterior pathways/walkways: </label> <br><span class="view" id="has_exterior_path" >'+exteriorPathwayData[0].has_exterior_path+'</span></div>\n ' +
    '            <div class="col-6"><label class="view-label" for="min_widthExteriorPathway"> Pathway is minimum width and free of obstacles: </label><br><span class="view" id="min_widthExteriorPathway" >'+exteriorPathwayData[0].min_width+'</span></div>\n ' +
    '        </div>\n' +
    '        <div class="card-row">\n' +
    '            <div class="col-6"><label class="view-label" for="pathway_surface"> Pathway surface is level, unbroken, firm, slip-resistant: </label><br><span class="view" id="pathway_surface" >'+exteriorPathwayData[0].pathway_surface+'</span></div>\n ' +
    '            <div class="col-6"><label class="view-label" for="pathway_curbs"> Route has curb ramps and curb cuts where needed: </label><br><span class="view" id="pathway_curbs" >'+exteriorPathwayData[0].pathway_curbs+'</span></div>\n ' +
    '        </div>\n' +
    '        <div class="card-row">\n' +
    '            <div class="col-6"><label class="view-label" for="tactile_warningExteriorPathway"> Tactile warning strips are installed: </label><br><span class="view" id="tactile_warningExteriorPathway" >'+exteriorPathwayData[0].tactile_warning+'</span></div>\n ' +
    '            <div class="col-6"><label class="view-label" for="slope"> Slope of the pathway is no steeper than 1:20: </label><br><span class="view" id="slope" >'+exteriorPathwayData[0].slope+'</span></div>\n ' +
    '        </div>\n' +
    '        <div class="card-row">\n' +
    '            <div class="col-4"><label class="view-label" for="lightingExteriorPathway"> Lighting is adequate: </label><br><span class="view" id="lightingExteriorPathway" >'+exteriorPathwayData[0].lighting+'</span></div>\n' +
    '            <div class="col-4"><label class="view-label" for="lighting_optionExteriorPathway"> Lighting level day/night: </label><br><span class="view" id="lighting_optionExteriorPathway" >'+exteriorPathwayData[0].lighting_option+'</span></div>\n' +
    '            <div class="col-4"><label class="view-label" for="lighting_typeExteriorPathway"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeExteriorPathway" >'+exteriorPathwayData[0].lighting_type+'</span></div>\n' +
    '        </div>\n' +
    '        <div class="card-row">\n' +
    '            <div class="col-12"><label class="view-label" for="commentExteriorPathway"> Describe the route: </label><br><span class="view" id="commentExteriorPathway" >' + exteriorPathwayData[0].comment + '</span></div>\n' +
    '        </div>\n' +
    '        <div class="card-row">\n' +
    '            <div class="col-12"><label class="view-label" for="recommendationsExteriorPathway"> Recommendations: </label><br><span class="view" id="recommendationsExteriorPathway" >' + exteriorPathwayData[0].recommendations + '</span></div>\n' +
    '        </div>';

    $('#exterior_pathways_card').html(bodyHtml);

}

function ExteriorStairsView() {
    var exteriorStairsData = "";

    $('#exterior_stairs_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/exterior_stairs/est/" + EST_ID,
        success: function (data) {
            exteriorStairsData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = ' <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="stairs_required"> Stairs are required: </label> <br><span class="view" id="stairs_required" >'+exteriorStairsData[0].stairs_required+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="stairs_available"> Stairs are available: </label> <br><span class="view" id="stairs_available" >'+exteriorStairsData[0].stairs_available+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="num_stairs"> Number of stairs: </label> <br><span class="view" id="num_stairs" >'+exteriorStairsData[0].num_stairs+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="handrail_both_sides"> Both sides of stairs have handrails: </label> <br><span class="view" id="handrail_both_sides" >'+exteriorStairsData[0].handrail_both_sides+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="handrail_side"> Handrail sides Left/Right/None/NA: </label><br><span class="view" id="handrail_side" >'+exteriorStairsData[0].handrail_side+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="handrail_regulation_height"> Top of the handrail gripping surface is between 34” and 38” above the stair surface: </label><br><span class="view" id="handrail_regulation_height" >'+exteriorStairsData[0].handrail_regulation_height+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="handrail_height"> Handrail height: </label><br><span class="view" id="handrail_height" >'+exteriorStairsData[0].handrail_height+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="obstacles"> Stairs are clear of obstacles or protrusions: </label><br><span class="view" id="obstacles" >'+exteriorStairsData[0].obstacles+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="clearly_marked"> Stairs are clearly marked: </label><br><span class="view" id="clearly_marked" >'+exteriorStairsData[0].clearly_marked+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="lightingExteriorStairs"> Lighting is adequate: </label><br><span class="view" id="lightingExteriorStairs" >'+exteriorStairsData[0].lighting+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_optionExteriorStairs"> Lighting level day/night: </label><br><span class="view" id="lighting_optionExteriorStairs" >'+exteriorStairsData[0].lighting_option+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_typeExteriorStairs"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeExteriorStairs" >'+exteriorStairsData[0].lighting_type+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentExteriorStairs"> Describe the route: </label><br><span class="view" id="commentExteriorStairs" >'+exteriorStairsData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsExteriorStairs"> Recommendations: </label><br><span class="view" id="recommendationsExteriorStairs" >'+exteriorStairsData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#exterior_stairs_card').html(bodyHtml);

}

function ExteriorRampsView() {
    var exteriorRampsData = "";

    $('#exterior_ramps_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/exterior_ramps/est/" + EST_ID,
        success: function (data) {
            exteriorRampsData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = 
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="ramp_required"> Ramps are required: </label> <br><span class="view" id="ramp_required" >'+exteriorRampsData[0].ramp_required+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="ramp_available"> Ramps are available: </label> <br><span class="view" id="ramp_available" >'+exteriorRampsData[0].ramp_available+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="min_widthExteriorRamps"> Ramps are at least 36 inches wide: </label> <br><span class="view" id="min_widthExteriorRamps" >'+exteriorRampsData[0].min_width+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="width_between_handrails"> Ramps width: </label> <br><span class="view" id="width_between_handrails" >'+exteriorRampsData[0].width_between_handrails+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="min_slope"> For each section of ramp, the RUNNING SLOPE is no greater than 1:12: </label> <br><span class="view" id="min_slope" >'+exteriorRampsData[0].min_slope+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="slopeExteriorRamps"> Alternatively, the slope is less than 2 percent grade (%): </label><br><span class="view" id="slopeExteriorRamps" >'+exteriorRampsData[0].slope+'</span></div>\n'+
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="level_landing_both"> There is a level landing at the top and bottom of the ramp: </label> <br><span class="view" id="level_landing_both" >'+exteriorRampsData[0].level_landing_both+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="level_landing_location"> Landing location Top/Bottom/NA: </label><br><span class="view" id="level_landing_location" >'+exteriorRampsData[0].level_landing_location+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="obstaclesExteriorRamps"> Ramps are clear of obstacles or protrusions: </label><br><span class="view" id="obstaclesExteriorRamps" >'+exteriorRampsData[0].obstacles+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="handrail_both_sides"> Both sides of stairs have handrails: </label> <br><span class="view" id="handrails_both_sides" >'+exteriorRampsData[0].handrail_sides+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="handrail_sides"> Handrail sides Left/Right/None/NA: </label><br><span class="view" id="handrail_sides" >'+exteriorRampsData[0].handrail_sides+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="handrail_regulation_heightExteriorRamps"> Top of the handrail gripping surface is between 34” and 38” above the stair surface: </label><br><span class="view" id="handrail_regulation_heightExteriorRamps" >'+exteriorRampsData[0].handrail_regulation_height+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="handrail_heightExteriorRamps"> Handrail height: </label><br><span class="view" id="handrail_heightExteriorRamps" >'+exteriorRampsData[0].handrail_height+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="side_guards"> Ramps have adequate side guards: </label><br><span class="view" id="side_guards" >'+exteriorRampsData[0].side_guards+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="lightingExteriorRamps"> Lighting is adequate: </label><br><span class="view" id="lightingExteriorRamps" >'+exteriorRampsData[0].lighting+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_optionExteriorRamps"> Lighting level day/night: </label><br><span class="view" id="lighting_optionExteriorRamps" >'+exteriorRampsData[0].lighting_option+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_typeExteriorRamps"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeExteriorRamps" >'+exteriorRampsData[0].lighting_type+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentExteriorRamps"> Describe the route: </label><br><span class="view" id="commentExteriorRamps" >'+exteriorRampsData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsExteriorRamps"> Recommendations: </label><br><span class="view" id="recommendationsExteriorRamps" >'+exteriorRampsData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#exterior_ramps_card').html(bodyHtml);

}

function MainEntranceView() {
    var mainEntranceData = "";

    $('#main_entrance_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/main_entrance/est/" + EST_ID,
        success: function (data) {
            mainEntranceData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = 
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="total_num_public_entrances"> Total number of public entrances: </label> <br><span class="view" id="total_num_public_entrances" >'+mainEntranceData[0].total_num_public_entrances+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="main_ent_accessible"> Main entrance is accessible: </label> <br><span class="view" id="main_ent_accessible" >'+mainEntranceData[0].main_ent_accessible+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="alt_ent_accessible"> Alternative accessible entrance can be used independently during same hours: </label> <br><span class="view" id="alt_ent_accessible" >'+mainEntranceData[0].alt_ent_accessible+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="accessable_signage"> There is signage to direct patrons to the wheelchair accessible entrance: </label> <br><span class="view" id="accessable_signage" >'+mainEntranceData[0].accessable_signage+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="ground_level"> The ground or floor is level inside and outside the accessible entrance: </label> <br><span class="view" id="ground_level" >'+mainEntranceData[0].ground_level+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="threshold_level"> Threshold of entrance is level: </label><br><span class="view" id="threshold_level" >'+mainEntranceData[0].threshold_level+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="threshold_beveled"> If threshold is beveled, it is no more than 1/2 inch high with the top 1/4 inch beveled: </label> <br><span class="view" id="threshold_beveled" >'+mainEntranceData[0].threshold_beveled+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="beveled_height"> Height: </label><br><span class="view" id="beveled_height" >'+mainEntranceData[0].beveled_height+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="door_action"> As you enter the door opens: </label><br><span class="view" id="door_action" >'+mainEntranceData[0].door_action+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="door_open_clearance"> Doors have at least 32” clearance when open at 90 degrees: </label> <br><span class="view" id="door_open_clearance" >'+mainEntranceData[0].door_open_clearance+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="opening_measurement"> Opening measurement (inches): </label><br><span class="view" id="opening_measurement" >'+mainEntranceData[0].opening_measurement+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="door_easy_open"> Doors are easy to open: </label><br><span class="view" id="door_easy_open" >'+mainEntranceData[0].door_easy_open+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="door_open_force"> Actual lbs of force: </label><br><span class="view" id="door_open_force" >'+mainEntranceData[0].door_open_force+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="door_use_with_fist"> Door handles can be opened and shut with a closed fist: </label><br><span class="view" id="door_use_with_fist" >'+mainEntranceData[0].door_use_with_fist+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="door_auto_open"> Door(s) open automatically or with a push button: </label><br><span class="view" id="door_auto_open" >'+mainEntranceData[0].door_auto_open+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="second_door_inside"> There is a second door or set of doors inside the accessible entry: </label><br><span class="view" id="second_door_inside" >'+mainEntranceData[0].second_door_inside+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="min_dist_between_doors"> Distance between outer door and inner door is at least 48” plus door clearance(s): </label><br><span class="view" id="min_dist_between_doors" >'+mainEntranceData[0].min_dist_between_doors+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="lightingMainEntrance"> Lighting is adequate: </label><br><span class="view" id="lightingMainEntrance" >'+mainEntranceData[0].lighting+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_optionMainEntrance"> Lighting level day/night: </label><br><span class="view" id="lighting_optionMainEntrance" >'+mainEntranceData[0].lighting_option+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_typeMainEntrance"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeMainEntrance" >'+mainEntranceData[0].lighting_type+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentMainEntrance"> Describe accessible entrance: </label><br><span class="view" id="commentMainEntrance" >'+mainEntranceData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsMainEntrance"> Recommendations: </label><br><span class="view" id="recommendationsMainEntrance" >'+mainEntranceData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#main_entrance_card').html(bodyHtml);

}

function InteriorView() {
    var interiorData = "";

    $('#interior_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/interior/est/" + EST_ID,
        success: function (data) {
            interiorData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = 
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="int_door_open_clearance"> Doors have at least 32” clearance when open at 90 degrees: </label> <br><span class="view" id="int_door_open_clearance" >'+interiorData[0].int_door_open_clearance+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="int_opening_measurement"> Opening measurement (inches): </label> <br><span class="view" id="int_opening_measurement" >'+interiorData[0].int_opening_measurement+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="int_door_easy_open"> Doors are easy to open: </label> <br><span class="view" id="int_door_easy_open" >'+interiorData[0].int_door_easy_open+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="int_door_open_force"> Actual lbs of force: </label> <br><span class="view" id="int_door_open_force" >'+interiorData[0].int_door_open_force+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="int_door_use_with_fist"> Door handles can be opened and shut with a closed fist, open automatically, or push button: </label> <br><span class="view" id="int_door_use_with_fist" >'+interiorData[0].int_door_use_with_fist+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="five_second_close"> Doors take 5 seconds or longer to close: </label><br><span class="view" id="five_second_close" >'+interiorData[0].five_second_close+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="hallway_width"> Hallways and ​aisles are min. 36” WIDE, or not less than 28” for 4 foot intervals: </label> <br><span class="view" id="hallway_width" >'+interiorData[0].hallway_width+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="narrowest_width"> Narrowest width (inches): </label><br><span class="view" id="narrowest_width" id="narrowest_width" >'+interiorData[0].narrowest_width+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="wheelchair_turnaround"> There are locations that allow 60” space for a wheelchair to turn around: </label><br><span class="view" id="wheelchair_turnaround" >'+interiorData[0].wheelchair_turnaround+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="hallway_obstacles"> Hallways and aisles are clear of obstacles and tripping hazards: </label> <br><span class="view" id="hallway_obstacles"   >'+interiorData[0].hallway_obstacles+'</span></div>\n' +
                '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="hallway_clear"> Hallways are clear of objects protruding more than 4” or lower than 80”: </label><br><span class="view" id="hallway_clear" >'+interiorData[0].hallway_clear+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="lightingInterior"> Lighting is adequate: </label><br><span class="view" id="lightingInterior" >'+interiorData[0].lighting+'</span></div>\n' +
                '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="lighting_typeInterior"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeInterior" >'+interiorData[0].lighting_type+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="service_counter"> Lowest ​service counter is no higher than 38” ​with a clear view from a sitting position, and a check writing surface is no higher than 34”: </label><br><span class="view" id="service_counter" >'+interiorData[0].service_counter+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="counter_height"> Service counter height (inches): </label><br><span class="view" id="counter_height" >'+interiorData[0].counter_height+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="writing_surface_height"> Writing surface height (inches): </label><br><span class="view" id="writing_surface_height" >'+interiorData[0].writing_surface_height_id+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="drinking_fountain"> Accessible drinking fountain with spout no higher than 36”, and easy to operate controls: </label><br><span class="view" id="drinking_fountain" >'+interiorData[0].drinking_fountain+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentInterior"> Describe accessible entrance: </label><br><span class="view" id="commentInterior" >'+interiorData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsInterior"> Recommendations: </label><br><span class="view" id="recommendationsInterior" >'+interiorData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#interior_card').html(bodyHtml);

}

function ElevatorView() {
    var elevatorData = "";

    $('#elevator_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/elevator/est/" + EST_ID,
        success: function (data) {
            elevatorData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = 
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="is_elevator"> Is there ​at least one elevator ​or lift: </label> <br><span class="view" id="is_elevator" >'+elevatorData[0].is_elevator+'</span></div>\n' +
        '            <div class="col-8"><label class="view-label" for="location"> Where is nearest elevator or lift located in relation to the accessible entrance: </label> <br><span class="view" id="location"  >'+elevatorData[0].location+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="works"> The elevator or lift works properly: </label> <br><span class="view" id="works" >'+elevatorData[0].works+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="no_assist"> Users can operate elevator or lift without having to find someone to assist or provide a key: </label> <br><span class="view" id="no_assist" >'+elevatorData[0].no_assist+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="button_height"> Buttons are no higher than 48” and no lower than 15”: </label> <br><span class="view" id="button_height" >'+elevatorData[0].button_height+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="outside_btn_height"> Outside button height (inches): </label><br><span class="view" id="outside_btn_height" >'+elevatorData[0].outside_btn_height+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="inside_btn_height"> Inside button height (inches): </label> <br><span class="view" id="inside_btn_height"  >'+elevatorData[0].inside_btn_height+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="button_use_fist"> Buttons are easy to press with closed fist: </label><br><span class="view" id="button_use_fist" >'+elevatorData[0].button_use_fist+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="braille"> Buttons ​and signs ​have braille markings ​and raised letters/numbers: </label><br><span class="view" id="braille" >'+elevatorData[0].braille+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="audible_tones"> Elevator or lift uses ​audible tones as well as visible signals : </label> <br><span class="view" id="audible_tones" >'+elevatorData[0].audible_tones+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="lightingElevator"> Lighting is adequate: </label><br><span class="view" id="lightingElevator" >'+elevatorData[0].lighting+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="lighting_typeElevator"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeElevator" >'+elevatorData[0].lighting_type+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="elevator_depth"> Elevator interior is at least 54” DEEP ​ ​from door to the back : </label><br><span class="view" id="elevator_depth" >'+elevatorData[0].elevator_depth+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentElevator"> Describe accessible entrance: </label><br><span class="view" id="commentElevator" >'+elevatorData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsElevator"> Recommendations: </label><br><span class="view" id="recommendationsElevator" >'+elevatorData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#elevator_card').html(bodyHtml);

}

function SignageView() {
    var signageData = "";

    $('#signage_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/signage/est/" + EST_ID,
        success: function (data) {
            signageData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = '<div class="card-row">\n' +
        '           <div class="col-12"><label class="view-label" for="is_directory"> There is a directory at all accessible entrances to help visitors to find their way: </label> <br><span class="view" id="is_directory" >'+signageData[0].is_directory+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-8"><label class="view-label" for="door_signs"> Door signs are on latch side of door, between 48” and 60” from floor: </label> <br><span class="view" id="door_signs" >'+signageData[0].door_signs+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="sign_height"> Height of signs (inches): </label> <br><span class="view" id="sign_height"  >'+signageData[0].sign_height+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="pub_sign_braile"> Public signs have Braille: </label> <br><span class="view" id="pub_sign_braile" >'+signageData[0].pub_sign_braile+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="sign_high_contrast"> Signs have raised, high contrast lettering, ​low glare background: </label> <br><span class="view" id="sign_high_contrast" >'+signageData[0].sign_high_contrast+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="sign_images"> Signs include images, illustrations, or icons: </label><br><span class="view" id="sign_images" >'+signageData[0].sign_images+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="written_material_images"> Written material (menus, etc.) includes images or illustrations: </label> <br><span class="view" id="written_material_images" >'+signageData[0].written_material_images+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="menu_access"> There is a large print menu, Braille menu, and/ or on­line accessible menu: </label><br><span class="view" id="menu_access" >'+signageData[0].written_material_images+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="alt_info"> Information is available in alternative formats: </label><br><span class="view" id="alt_info" >'+signageData[0].alt_info+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="alt_info_type"> Type of alternative format Braille/Large Print/Recorded Audio/Video/NA: </label> <br><span class="view" id="alt_info_type" >'+signageData[0].alt_info_type+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentSignage"> Comments: </label><br><span class="view" id="commentSignage" >'+signageData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsSignage"> Recommendations: </label><br><span class="view" id="recommendationsSignage" >'+signageData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#signage_card').html(bodyHtml);

}

function EmergencyView() {
    var emergencyPreparednessData = "";

    $('#emergency_preparedness_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/emergency/est/" + EST_ID,
        success: function (data) {
            emergencyPreparednessData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml =' <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="evac_info"> Evacuation and safety information is available in a visible location: </label> <br><span class="view" id="evac_info" >'+emergencyPreparednessData[0].evac_info+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="alt_evac_info"> Evacuation and safety information is available in alternative format: </label> <br><span class="view" id="alt_evac_info" >'+emergencyPreparednessData[0].alt_evac_info+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="evac_info_format"> Type of alternative format Braille/Large print/Recorded audio/Video: </label> <br><span class="view" id="evac_info_format" >'+emergencyPreparednessData[0].evac_info_format+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="alarms"> Emergency alarms both audible and visible: </label> <br><span class="view" id="alarms" >'+emergencyPreparednessData[0].alarms+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="location_no_flash"> There is an emergency location available where there are no flashing alarms: </label> <br><span class="view" id="location_no_flash" >'+emergencyPreparednessData[0].location_no_flash+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="shelter"> There is an area of refuge, shelter in place during emergencies: </label><br><span class="view" id="shelter" >'+emergencyPreparednessData[0].shelter+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="signs_to_exit"> Signs direct patrons to exits, safety zone, fire extinguishers and alarm pull boxes: </label> <br><span class="view" id="signs_to_exit" >'+emergencyPreparednessData[0].signs_to_exit+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="wheelchair_plan"> There is a plan for evacuating persons using wheelchairs in case elevators are inoperable: </label><br><span class="view" id="wheelchair_plan" >'+emergencyPreparednessData[0].wheelchair_plan+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="floor_plan_routes"> Posted floor plans show emergency routes, and locations of fire extinguishers and alarm pull boxes: </label><br><span class="view" id="floor_plan_routes" >'+emergencyPreparednessData[0].floor_plan_routes+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="fire_alarm_height"> Fire alarms pull boxes are no higher than 48”: </label> <br><span class="view" id="fire_alarm_height" >'+emergencyPreparednessData[0].fire_alarm_height+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="fire_extinguisher_height"> Fire extinguishers are mounted with bottom no higher than 48”: </label> <br><span class="view" id="fire_extinguisher_height"  >'+emergencyPreparednessData[0].fire_extinguisher_height+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentEmergency_Preparedness"> Comments: </label><br><span class="view" id="commentEmergency_Preparedness" >'+emergencyPreparednessData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsEmergency_Preparedness"> Recommendations: </label><br><span class="view" id="recommendationsEmergency_Preparedness" >'+emergencyPreparednessData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#emergency_preparedness_card').html(bodyHtml);

}

function SeatingView() {
    var seatingData = "";

    $('#seating_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/seating/est/" + EST_ID,
        success: function (data) {
            seatingData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = ' <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="seating_no_step"> One or more seating areas in the common area can be accessed without steps: </label> <br><span class="view" id="seating_no_step" >'+seatingData[0].seating_no_step+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="table_aisles"> Customers can maneuver between tables without bumping into chairs (36” aisles)​: </label> <br><span class="view" id="table_aisles" >'+seatingData[0].table_aisles+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-8"><label class="view-label" for="legroom"> There are tables with ​legroom for wheelchair users (bottom of table = 27 ​ to 34”): </label> <br><span class="view" id="legroom" >'+seatingData[0].legroom+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="num_legroom"> Number of tables with legroom #/All: </label> <br><span class="view" id="num_legroom" >'+seatingData[0].num_legroom+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="rearranged"> There are tables and chairs that can be moved or rearranged: </label> <br><span class="view" id="rearranged" >'+seatingData[0].rearranged+'</span></div>\n' +
        '            <div class="col-3"><label class="view-label" for="num_table_rearranged"> Number of tables that can be moved #/All: </label><br><span class="view" id="num_table_rearranged" >'+seatingData[0].num_table_rearranged+'</span></div>\n' +
        '            <div class="col-3"><label class="view-label" for="num_chair_rearranged"> Number of chairs that can be moved #/All: </label><br><span class="view" id="num_chair_rearranged" >'+seatingData[0].num_chair_rearranged+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="round_tables"> There are round or oval tables that can seat 5­9 individuals: </label> <br><span class="view" id="round_tables" >'+seatingData[0].round_tables+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="num_round_tables"> Number of round/oval tables: </label><br><span class="view" id="num_round_tables" >'+seatingData[0].num_round_tables+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="lightingSeating"> Lighting is adequate: </label><br><span class="view" id="lightingSeating" >'+seatingData[0].lighting+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_optionSeating"> Lighting level day/night: </label><br><span class="view" id="lighting_optionSeating" >'+seatingData[0].lighting_option+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="lighting_typeSeating"> Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeSeating" >'+seatingData[0].lighting_type+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="adjustable_lighting"> There are one or more available spaces with adjustable lighting: </label><br><span class="view" id="adjustable_lighting" >'+seatingData[0].adjustable_lighting+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="low_visual_slim"> There are one or more areas with low visual stimulation: </label> <br><span class="view" id="low_visual_slim" >'+seatingData[0].low_visual_slim+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="quiet_table"> There is a quiet table, room or area available on request: </label><br><span class="view" id="quiet_table" id="quiet_table" >'+seatingData[0].quiet_table+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="low_sound"> There is an area with low or no background sound, and/or that has sound­absorbing surfaces: </label> <br><span class="view" id="low_sound" >'+seatingData[0].low_sound+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="designated_space"> For theater or auditorium, there are spaces designated for wheelchair users that have the same general views as the rest of the audience when the person is seated: </label><br><span class="view" id="designated_space" >'+seatingData[0].designated_space+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="num_desig_space"> Number of designated spaces: </label> <br><span class="view" id="num_desig_space" >'+seatingData[0].num_desig_space+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="companion_space"> There are spaces for companions to sit next to the wheelchair users: </label> <br><span class="view" id="companion_space" >'+seatingData[0].companion_space+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentSeating"> Comments: </label><br><span class="view" id="commentSeating" >'+seatingData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsSeating"> Recommendations: </label><br><span class="view" id="recommendationsSeating" >'+seatingData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#seating_card').html(bodyHtml);

}

function RestroomView() {
    var restroomData = "";

    $('#restroom_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/restroom/est/" + EST_ID,
        success: function (data) {
            restroomData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = '<div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="public_restroom"> Public restrooms ​are available near or ​at the location: </label> <br><span class="view" id="public_restroom" >'+restroomData[0].public_restroom+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="total_num"> Total number of public restrooms: </label> <br><span class="view" id="total_num"  >'+restroomData[0].total_num+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="designated_number"> Number of accessible restrooms designated “family”, “unisex”, or “assisted use”: </label> <br><span class="view" id="designated_number" >'+restroomData[0].designated_number+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="num_wheelchair_sign"> Number of restrooms that have “Wheelchair Accessible” signs: </label> <br><span class="view" id="num_wheelchair_sign" >'+restroomData[0].num_wheelchair_sign+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="sign_accessable"> Restrooms signs have high contrast, Braille, raised lettering, low glare background: </label> <br><span class="view" id="sign_accessable" >'+restroomData[0].sign_accessable+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="sign_location"> Signage is on latch side of door between 48” and 60” above floor: </label><br><span class="view" id="sign_location" >'+restroomData[0].sign_location +'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="key_needed"> Users do not need to ask someone for a KEY to use the restroom: </label><br><span class="view" id="key_needed" >'+restroomData[0].key_needed+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentRestroom"> Describe the restroom(s): </label><br><span class="view" id="commentRestroom" >'+restroomData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsRestroom"> Recommendations: </label><br><span class="view" id="recommendationsRestroom" >'+restroomData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#restroom_card').html(bodyHtml);

}

function RestroomInfoView() {
    var restroomInfoData = "";
    var restroomData = "";

    $('#restroom_info_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/restroom/est/" + EST_ID,
        success: function (data) {
            restroomData = data;
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
        url: "/get/restroom_info/rest/" + restroomData[0].restroom_id,
        success: function (data) {
            restroomInfoData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = "";

    for (var i = 0; i < restroomInfoData.length; i++) {

        if (i > 0) {
            bodyHtml +=
                '        <div class="card-row">\n' +
                '          <div class="hr-restroom col-12"></div>\n' +
                '        </div>\n';
        }

        if (restroomInfoData.length > 1) {
            bodyHtml += ' <div class="card-row">\n' +
                '            <div class="col-4 h9">\n' +
                '                <label class="view-label" for="restroom_number"> Restroom Number: ' + (i + 1) + '</label>\n' +
                '           </div>\n';
        }

        bodyHtml += '</div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-4"><label class="view-label" for="restroom_desc_'+restroomInfoData[i].rest_info_id+'" > Identify this bathroom rated with location and other information (i.e. 1st floor front women): </label> <br><span class="view" id="restroom_desc_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].restroom_desc+'</span></div>\n' +
            '            <div class="col-4"><label class="view-label" for="easy_open_'+restroomInfoData[i].rest_info_id+'" >  Room door is easy to open, requiring 5 lb. or less force: </label> <br><span class="view" id="easy_open_'+restroomInfoData[i].rest_info_id+'"  >'+restroomInfoData[0].easy_open+'</span></div>\n' +
            '            <div class="col-4"><label class="view-label" for="lbs_force_'+restroomInfoData[i].rest_info_id+'" > Actual force - lbs. or light/ med/ heavy: </label> <br><span class="view" id="lbs_force_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].lbs_force+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="clearance_'+restroomInfoData[i].rest_info_id+'" > Stall/Room door has at least 32” clearance when the door is open: </label> <br><span class="view" id="clearance_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].clearance+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="opening_'+restroomInfoData[i].rest_info_id+'" > Opening measurement (inches): </label> <br><span class="view" id="opening_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].opening+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="opens_out_'+restroomInfoData[i].rest_info_id+'" > The stall door opens to the outside: </label><br><span class="view" id="opens_out_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].opens_out+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="use_fist_'+restroomInfoData[i].rest_info_id+'" > The stall door can be opened, closed, and latched with a closed fist: </label><br><span class="view" id="use_fist_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].use_fist+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="can_turn_around_'+restroomInfoData[i].rest_info_id+'" > The stall or room is large enough for a wheelchair or walker to turn around: </label> <br><span class="view" id="can_turn_around_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].can_turn_around+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="turn_width_'+restroomInfoData[i].rest_info_id+'" > Stall/Room width (inches)​: </label> <br><span class="view" id="turn_width_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].turn_width+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="turn_depth_'+restroomInfoData[i].rest_info_id+'" > Stall/Room depth (inches)​: </label> <br><span class="view" id="turn_depth_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].turn_depth+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="close_chair_inside_'+restroomInfoData[i].rest_info_id+'" > The stall/room door can be closed once a wheelchair is inside: </label> <br><span class="view" id="close_chair_inside_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].close_chair_inside+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="grab_bars_'+restroomInfoData[i].rest_info_id+'" > Grab bars are easily reachable behind the toilet and on the side wall ​ nearest the toilet: </label> <br><span class="view" id="grab_bars_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].grab_bars+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="seat_height_req_'+restroomInfoData[i].rest_info_id+'" > The height of the toilet seat is at least 17” from the floor: </label><br><span class="view" id="seat_height_req_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].seat_height_req+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="seat_height_'+restroomInfoData[i].rest_info_id+'" > Seat height (inches): </label><br><span class="view" id="seat_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].seat_height+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="flush_auto_fist_'+restroomInfoData[i].rest_info_id+'" > The toilet flushes automatically, or can be operated with a closed fist: </label><br><span class="view" id="flush_auto_fist_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].flush_auto_fist+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="ambulatory_accessible_'+restroomInfoData[i].rest_info_id+'" > If there are multiple stalls, at least one is ambulatory accessible with grab bars on either side and toilet height at least 17” from floor: </label> <br><span class="view" id="ambulatory_accessible_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].ambulatory_accessible+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="bar_height_'+restroomInfoData[i].rest_info_id+'" > Toilet height (inches): </label><br><span class="view" id="bar_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].bar_height+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="coat_hook_'+restroomInfoData[i].rest_info_id+'" > If there is a coat hook, it is between 35” and 48” from the floor: </label><br><span class="view" id="coat_hook_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].coat_hook+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="hook_height_'+restroomInfoData[i].rest_info_id+'" > Hook height (inches): </label> <br><span class="view" id="hook_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].hook_height+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="sink_'+restroomInfoData[i].rest_info_id+'" > The height of the sink/countertop is 34” or less from the floor: </label><br><span class="view" id="sink_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].sink+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="sink_height_'+restroomInfoData[i].rest_info_id+'" > Sink/Countertop height (inches): </label> <br><span class="view" id="sink_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].sink_height+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="faucet_'+restroomInfoData[i].rest_info_id+'" > The faucet control is 17” or less from the front edge of the sink counter: </label><br><span class="view" id="faucet_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].faucet+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="faucet_depth_'+restroomInfoData[i].rest_info_id+'" > Faucet depth (inches): </label> <br><span class="view" id="faucet_depth_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].faucet_depth+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-4"><label class="view-label" for="faucet_auto_fist_'+restroomInfoData[i].rest_info_id+'" > Faucet​ can ​be operated ​automatically or ​with a closed fist: </label> <br><span class="view" id="faucet_auto_fist_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].faucet_auto_fist+'</span></div>\n' +
            '            <div class="col-4"><label class="view-label" for="sink_clearance_'+restroomInfoData[i].rest_info_id+'" > There is room for a wheelchair to roll under the sink ​: </label><br><span class="view" id="sink_clearance_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].sink_clearance+'</span></div>\n' +
            '            <div class="col-4"><label class="view-label" for="sink_clearance_height_'+restroomInfoData[i].rest_info_id+'" > Measurement (inches): </label> <br><span class="view" id="sink_clearance_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].sink_clearance_height+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-4"><label class="view-label" for="sink_pipes_'+restroomInfoData[i].rest_info_id+'" > If there are pipes under the sink, they are covered to prevent injury or burns: </label> <br><span class="view" id="sink_pipes_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].sink_pipes+'</span></div>\n' +
            '            <div class="col-4"><label class="view-label" for="soap_dispenser_'+restroomInfoData[i].rest_info_id+'" > The height of the soap dispenser control is 48” or less from the floor: </label> <br><span class="view" id="soap_dispenser_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].soap_dispenser+'</span></div>\n' +
            '            <div class="col-4"><label class="view-label" for="soap_height_'+restroomInfoData[i].rest_info_id+'" >  Soap dispenser height (inches): </label> <br><span class="view" id="soap_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].soap_height+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="dry_fist_'+restroomInfoData[i].rest_info_id+'" > Hand dryer or towel dispenser can be operated automatically or with closed fist: </label> <br><span class="view" id="dry_fist_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].dry_fist+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="dry_control_height_'+restroomInfoData[i].rest_info_id+'" > Controls for hand dryer or towel dispenser are 48” or less from floor: </label> <br><span class="view" id="dry_control_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].dry_control_height+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="mirror_'+restroomInfoData[i].rest_info_id+'" > If there is a mirror, the bottom edge is 40” or less from the floor: </label> <br><span class="view" id="mirror_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].mirror+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="mirror_height_'+restroomInfoData[i].rest_info_id+'" > Mirror height (inches): </label><br><span class="view" id="mirror_height_'+restroomInfoData[i].rest_info_id+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="shelves_'+restroomInfoData[i].rest_info_id+'" > If there are shelves to set items, they are 48” or less from the floor: </label><br><span class="view" id="shelves_'+restroomInfoData[i].rest_info_id+'"  >'+restroomInfoData[0].shelves+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="shelf_height_'+restroomInfoData[i].rest_info_id+'" > Shelf height (inches): </label> <br><span class="view" id="shelf_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].shelf_height+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-4"><label class="view-label" for="trash_receptacles_'+restroomInfoData[i].rest_info_id+'" > Trash receptacles are positioned so they do not block the route to the door​: </label> <br><span class="view" id="trash_receptacles_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].trash_receptacles+'</span></div>\n' +
            '            <div class="col-4"><label class="view-label" for="hygiene_seat_cover_'+restroomInfoData[i].rest_info_id+'" > Feminine hygiene product & toilet seat cover dispensers are 48” or less from floor: </label> <br><span class="view" id="hygiene_seat_cover_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].hygiene_seat_cover+'</span></div>\n' +
            '            <div class="col-4"><label class="view-label" for="hygiene_cover_height_'+restroomInfoData[i].rest_info_id+'" > Height (inches): </label> <br><span class="view" id="hygiene_cover_height_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].hygiene_cover_height+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label class="view-label" for="lightingRestroomInfo_'+restroomInfoData[i].rest_info_id+'" > Lighting is adequate: </label><br><span class="view" id="lightingRestroomInfo_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].lighting+'</span></div>\n' +
            '            <div class="col-6"><label class="view-label" for="lighting_typeRestroomInfo_'+restroomInfoData[i].rest_info_id+'" > Lighting level low/medium/bright: </label><br><span class="view" id="lighting_typeRestroomInfo_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[0].lighting_type+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-12"><label class="view-label" for="commentRestroomInfo_'+restroomInfoData[i].rest_info_id+'" > Additional notes: </label><br><span class="view" id="commentRestroomInfo_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].comment+'</span></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-12"><label class="view-label" for="recommendationsRestroomInfo_'+restroomInfoData[i].rest_info_id+'" > Recommendations: </label><br><span class="view" id="recommendationsRestroomInfo_'+restroomInfoData[i].rest_info_id+'" >'+restroomInfoData[i].recommendations+'</span></div>\n' +
            '        </div>';
    }

    $('#restroom_info_card').html(bodyHtml);

}

function CommunicationView() {
    var communicationData = "";

    $('#communication_card').empty();

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/get/communication/est/" + EST_ID,
        success: function (data) {
            communicationData = data;
        },
        error: function (data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    bodyHtml = ' <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="public_phone"> There is one or more public phones available w/adjustable volume control.: </label> <br><span class="view" id="public_phone" >'+communicationData[0].public_phone+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="phone_clearance">  There are public phones w/ controls min 48” from floor, protruding < 4” from wall: </label> <br><span class="view" id="phone_clearance" >'+communicationData[0].phone_clearance+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="num_phone"> Number of phones: </label> <br><span class="view" id="num_phone" >'+communicationData[0].num_phone+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="tty"> There is a TTY is available: </label> <br><span class="view" id="tty" >'+communicationData[0].tty+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="staff_tty"> Staff are trained in use of TTY, and how to accept relay calls: </label> <br><span class="view" id="staff_tty" >'+communicationData[0].staff_tty+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="assisted_listening"> There are assisted listening devices available: </label><br><span class="view" id="assisted_listening" >'+communicationData[0].assisted_listening+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="assisted_listen_type"> Type of listening device - Infra­red Loop/Induction Loop/FM/Amplification/Other: </label><br><span class="view" id="assisted_listen_type" >'+communicationData[0].assisted_listen_type+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="assisted_listen_receiver"> Type of receivers - Earbud/Neckloop/Headphones/Other: </label> <br><span class="view" id="assisted_listen_receiver" >'+communicationData[0].assisted_listen_receiver+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="listening_signage"> Signs about listening devices are clearly displayed​: </label> <br><span class="view" id="listening_signage" >'+communicationData[0].listening_signage+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="staff_listening"> Staff are trained to use assisted listening devices​: </label> <br><span class="view" id="staff_listening" >'+communicationData[0].staff_listening+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="acoustics"> The acoustics are comfortable (no echoing, loud music, etc): </label> <br><span class="view" id="acoustics" >'+communicationData[0].acoustics+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="acoustics_level"> Noise level - Low/Medium/High: </label> <br><span class="view" id="acoustics_level" >'+communicationData[0].acoustics_level+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="alt_comm_methods"> If a customer is unable to hear, there are other forms of communication: </label><br><span class="view" id="alt_comm_methods" >'+communicationData[0].alt_comm_methods+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="alt_comm_type"> Type of other form of communication (writing pad, staff know ASL, etc): </label><br><span class="view" id="alt_comm_type" >'+communicationData[0].alt_comm_type+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="staff_ASL"> Staff have received instructions on how to provide ASL services upon request (in person or remote): </label><br><span class="view" id="staff_ASL" >'+communicationData[0].staff_ASL+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="captioning_default"> Captioning is turned ‘on’ as default for TVs or projected video: </label> <br><span class="view" id="captioning_default" >'+communicationData[0].captioning_default+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="theater_captioning"> If this is a theater, there is captioning: </label><br><span class="view" id="theater_captioning" >'+communicationData[0].theater_captioning+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="theater_capt_type"> Type of captioning used - Real Time/Open Captions/Rear Window/Other: </label><br><span class="view" id="theater_capt_type" >'+communicationData[0].theater_capt_type+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="auditory_info_visual"> Auditory information is presented visually: </label> <br><span class="view" id="auditory_info_visual" >'+communicationData[0].auditory_info_visual+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="visual_info_auditory"> Visual information is presented audibly: </label><br><span class="view" id="visual_info_auditory" >'+communicationData[0].visual_info_auditory+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="website_text_reader"> If the establishment has a website, it is accessible to users of screen text readers: </label> <br><span class="view" id="website_text_reader" >'+communicationData[0].website_text_reader+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="alt_contact"> There are alternate means for patrons to order, contact, or schedule: </label><br><span class="view" id="alt_contact" >'+communicationData[0].alt_contact+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="alt_contact_type"> Type of alternate means - Text/On-line/Phone: </label> <br><span class="view" id="alt_contact_type" >'+communicationData[0].alt_contact_type+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label class="view-label" for="shopping_assist"> The establishment offers shopping assistance or delivery: </label> <br><span class="view" id="shopping_assist" >'+communicationData[0].shopping_assist+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="assist_service"> Type of service - Shopping Assistance/Delivery: </label><br><span class="view" id="assist_service" >'+communicationData[0].assist_service+'</span></div>\n' +
        '            <div class="col-4"><label class="view-label" for="assist_fee"> Is there a fee for the service: </label> <br><span class="view" id="assist_fee" >'+communicationData[0].assist_fee+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-3"><label class="view-label" for="store_scooter"> If this is a store, there are wheelchairs or scooters available for customer use: </label> <br><span class="view" id="store_scooter" >'+communicationData[0].store_scooter+'</span></div>\n' +
        '            <div class="col-3"><label class="view-label" for="scooter_fee"> Is there a fee to use wheelchairs or scooters: </label> <br><span class="view" id="scooter_fee" >'+communicationData[0].scooter_fee+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="scooter_location"> Location of wheelchairs or scooters: </label> <br><span class="view" id="scooter_location" >'+communicationData[0].scooter_location+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="restaurant_allergies"> If this is a restaurant, information is available on food allergies, sensitivities: </label> <br><span class="view" id="restaurant_allergies" >'+communicationData[0].restaurant_allergies+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="staff_disable_trained"> The staff have received training within the past 12 months on how to provide “disability friendly” customer service to people with disabilities of all ages: </label> <br><span class="view" id="staff_disable_trained" >'+communicationData[0].staff_disable_trained+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="staff_disable_trained_desc"> If ‘yes’, describe the type of training, how it was delivered, and how often it is provided: </label> <br><span class="view" id="staff_disable_trained_desc" >'+communicationData[0].staff_disable_trained_desc+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="items_reach"> All items are within reach, or assistance is offered to reach them: </label> <br><span class="view" id="items_reach" >'+communicationData[0].items_reach+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="service_alt_manner"> If goods and services are not accessible, they are provided in an alternative manner: </label><br><span class="view" id="service_alt_manner" >'+communicationData[0].service_alt_manner+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="senior_discount"> The establishment offers a senior discount: </label><br><span class="view" id="senior_discount" >'+communicationData[0].senior_discount+'</span></div>\n' +
        '            <div class="col-6"><label class="view-label" for="senior_age"> If ‘yes’, what age is considered ‘senior’: </label> <br><span class="view" id="senior_age" >'+communicationData[0].senior_age+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label class="view-label" for="annual_A4A_review"> Management has agreed to annual A4A reviews​: </label> <br><span class="view" id="annual_A4A_review" >'+communicationData[0].annual_A4A_review+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="commentCommunication"> Comments, reasons for “no” answers, additional information: </label><br><span class="view" id="commentCommunication" >'+communicationData[0].comment+'</span></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label class="view-label" for="recommendationsCommunication"> Recommendations: </label><br><span class="view" id="recommendationsCommunication" >'+communicationData[0].recommendations+'</span></div>\n' +
        '        </div>';

    $('#communication_card').html(bodyHtml);

}



