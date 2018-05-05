var EST_ID = localStorage.getItem("establishmentID");
var PARK_ID = 0;
var STA_ID = 0;
var REST_ID = 0;
var tempArray =[];

$(document).ready(function () {

    getParkId(EST_ID);
    getStaBusId(PARK_ID);
    getRestroomId(EST_ID);

    reportHeaderView();
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

function reportHeaderView() {

    $('#report_header').empty();

    bodyHtml = '<div class="card-row-report">\n ' +
        '   <div class="col-12 subtitle">\n ' +
        '       <span class="h8 card-header-text" >positive findings</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12 subtitle">\n ' +
        '       <span >The following items are to be published on our website.</span>\n ' +
        '   </div>\n ' +
        '</div>';

    $('#report_header').html(bodyHtml);
}

function ParkingView() {
    var parkingData = "";

    $('#report_parking').empty();

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

    bodyHtml =
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <span class="h8 card-header-text" >parking:</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12 ">\n ' +
        '       <label class="report-label" > This establishment has the following types of parking: </label>&nbsp;\n ';

    if (parkingData[0].lot_free !== "N/A" || parkingData[0].lot_free !== "") {
        if (parkingData[0].lot_free === "Free") {
            tempArray.push(" free lot");
        }
        else {
            tempArray.push(" paid lot");
        }
    }

    if (parkingData[0].street_metered !== "N/A" || parkingData[0].street_metered !== "") {
        if (parkingData[0].street_metered === "Metered") {
            tempArray.push(" metered street");
        }
        else {
            tempArray.push(" free street");
        }
    }

    if (parkingData[0].parking_type) {
            tempArray.push(" " + parkingData[0].parking_type);
    }

    bodyHtml +=
        '       <span class="report">'+tempArray+'</span>\n' +
        '   </div>\n ' +
        '</div>\n ';

    tempArray = [];

    if (parkingData[0].total_num_spaces) {
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           There is a total of '+parkingData[0].total_num_spaces+' spaces on the premises.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    if (parkingData[0].num_reserved_spaces) {
        var num = numberToEnglish(parkingData[0].num_reserved_spaces, " ");
        bodyHtml +=
            '<div class="card-row-report">\n ' +
            '   <div class="col-12">\n ' +
            '       <span class="report-check">\n ' +
            '           <i class="fas fa-check fa-xs"></i>&emsp;\n' +
            '           <span style="text-transform: capitalize">'+num+'</span>is marked "reserved", "handicapped", "disabled", etc.\n ' +
            '       </span>\n ' +
            '   </div>\n ' +
            '</div>\n ';
    }

    bodyHtml += '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="report-label" for="num_reserved_spaces"> Number of reserved spaces: </label>&emsp;<span class="report" id="num_reserved_spaces" >'+parkingData[0].num_reserved_spaces+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="report-label" for="num_accessable_space"> Number of accessible spaces: </label>&emsp;<span class="report" id="num_accessable_space" >'+parkingData[0].num_accessable_space+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="report-label" for="num_van_accessible"> Number of van accessible spaces: </label>&emsp;<span class="report" id="num_van_accessible" >'+parkingData[0].num_van_accessible+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="report-label" for="reserve_space_sign"> Reserved space signage is unobstructed: </label>&emsp;<span class="report" id="reserve_space_sign" >'+parkingData[0].reserve_space_sign+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="report-label" for="reserve_space_obstacles"> Reserved parking free of obstacles: </label>&emsp;<span class="report" id="reserve_space_obstacles" >'+parkingData[0].reserve_space_obstacles+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="report-label" for="comment"> Describe parking area: </label>&emsp;<span class="report" id="comment" >'+parkingData[0].comment+'</span>\n ' +
        '   </div>\n ' +
        '</div>\n ' +
        '<div class="card-row-report">\n ' +
        '   <div class="col-12">\n ' +
        '       <label class="report-label" for="recommendations"> Recommendations: </label>&emsp;<span class="report" id="recommendations" >'+parkingData[0].recommendations+'</span>\n ' +
        '   </div>\n ' +
        '</div>';

    $('#report_parking').html(bodyHtml);

}