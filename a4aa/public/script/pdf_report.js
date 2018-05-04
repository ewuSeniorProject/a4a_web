var EST_ID = localStorage.getItem("establishmentID");
var EST_NAME = "";
var PARK_ID = 0;
var CAT_ID = 0;
var CAT_NAME = "";
var CONFIG_ID = 0;
var CONFIG_NAME = "";
var USER_ID = 0;
var USER_NAME = "";
var STA_ID = 0;
var REST_ID = 0;

$(document).ready(function () {

    getParkId(EST_ID);
    getIds(EST_ID);
    getStaBusId(PARK_ID);
    getRestroomId(EST_ID);
    getCategoryName(CAT_ID);
    getConfigName(CONFIG_ID);
    getUserName(USER_ID);

    ParkingView();

});

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

function printReport() {
    window.print();
}

function ParkingView() {
    var parkingData = "";

    $('#report_container').empty();

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

    bodyHtml = '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="lot_free"> Lot parking Free/Paid: </label>&emsp;<span class="view" id="lot_free" >'+parkingData[0].lot_free+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="street_metered"> Street parking Metered/Not Metered: </label>&emsp;<span class="view" id="street_metered" >'+parkingData[0].street_metered+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="parking_type"> Other type of parking: </label>&emsp;<span class="view" id="parking_type" >'+parkingData[0].parking_type+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="total_num_spaces"> Total number of spaces: </label>&emsp;<span class="view" id="total_num_spaces" >'+parkingData[0].total_num_spaces+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="num_reserved_spaces"> Number of reserved spaces: </label>&emsp;<span class="view" id="num_reserved_spaces" >'+parkingData[0].num_reserved_spaces+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="num_accessable_space"> Number of accessible spaces: </label>&emsp;<span class="view" id="num_accessable_space" >'+parkingData[0].num_accessable_space+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="num_van_accessible"> Number of van accessible spaces: </label>&emsp;<span class="view" id="num_van_accessible" >'+parkingData[0].num_van_accessible+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="reserve_space_sign"> Reserved space signage is unobstructed: </label>&emsp;<span class="view" id="reserve_space_sign" >'+parkingData[0].reserve_space_sign+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="reserve_space_obstacles"> Reserved parking free of obstacles: </label>&emsp;<span class="view" id="reserve_space_obstacles" >'+parkingData[0].reserve_space_obstacles+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="comment"> Describe parking area: </label>&emsp;<span class="view" id="comment" >'+parkingData[0].comment+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="view-label" for="recommendations"> Recommendations: </label>&emsp;<span class="view" id="recommendations" >'+parkingData[0].recommendations+'</span>\n ' +
        '   </div>\n ' +
        '</div>';


    // $.ajax({
    //     async: false,
    //     accepts: "application/json",
    //     method: "POST",
    //     dataType: 'json',
    //     contentType: "application/json; charset=utf-8",
    //     url: "post/report",
    //     data: JSON.stringify({
    //         "html" : htmlString
    //     }),
    //     error: function (data) {
    //         $("#alert-body").empty();
    //         $("#alert-body").append(data);
    //         $("#alert").modal('toggle');
    //     }
    // });

    $('#report_container').html(bodyHtml);

}