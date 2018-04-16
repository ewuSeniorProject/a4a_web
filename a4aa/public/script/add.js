var EST_ID = "";
var PARK_ID = "";

$(document).ready(function () {

    $('#collapseTitle').hide();

    var entryheight = $('#cardTitle').height();

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > entryheight + 27) {
            $('#collapseTitle').slideDown('fast');
        } else {
            $('#collapseTitle').slideUp('fast');
        }
    });

    addEstablishmentView();

});

function addEstablishmentView() {
    var categoryData = "";
    var configData = "";
    var userData = "";
    var bodyHtml = "";

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
            $("#alert-body").html(JSON.stringify(data));
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
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "user/",
        success: function (data) {
            userData = data;
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });


    $('#collapseTitle').html('New Premises Information');
    $('#cardTitle').html('New Premises Information');

    bodyHtml = '<div class="card-row">\n' +
    '            <div class="col-6"><label for="name"> Establishment Name: </label><input type="name" class="form-control" id="name" required></div>\n' +
    '            <div class="col-6"><label for="website"> Website: </label><input type="url" placeholder="http://www.website.com" class="form-control" id="website" ></div>\n' +
    '        </div>\n' +
    '        <div class="card-row">\n' +
    '           <div class="col-4">\n' +
    '            <label for="cat_id"> Category: </label><select class="form-control" name="cat_id" id="cat_id" required>\n' +
    '               <option value="" disabled selected>Please select one</option>\n';

    for (var i = 0; i < categoryData.length; i ++) {
        bodyHtml += '<option value="'+categoryData[i].cat_id+'">&nbsp;'+ categoryData[i].name +'</option>\n';
    }

    bodyHtml += '</select>\n' +
        '</div>\n' +
        '<div class="col-4"><label for="subtype"> Subtype: </label><input type="text" class="form-control" id="subtype" ></div>\n' +
        '<div class="col-4">\n' +
        '   <label for="config_id"> Configuration: </label><select class="form-control" name="config_id" id="config_id" required>\n' +
        '       <option value="" disabled selected>Please select one</option>\n';

    for (var i = 0; i < configData.length; i ++) {
        bodyHtml += '<option value="'+configData[i].config_id+'">&nbsp;'+ configData[i].name +'</option>\n';
    }

    bodyHtml += '</select>\n' +
        '</div>\n' +
        '</div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="street"> Street: </label><input type="text" class="form-control" id="street"></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="city"> City: </label><input type="text" class="form-control" id="city" ></div>\n' +
        '            <div class="col-2"><label for="state"> State: </label><input type="text" class="form-control" id="state" ></div>\n' +
        '            <div class="col-4"><label for="zip"> Zip: </label><input type="text" class="form-control" id="zip" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="phone"> Main Phone: </label><input type="text" placeholder="509-555-1234" class="form-control" id="phone" ></div>\n' +
        '            <div class="col-6"><label for="phone_tty"> TTY/TTD: </label><input type="text" placeholder="509-555-1234" class="form-control" id="phone_tty" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="contact_fname"> Contact First Name: </label><input type="name" class="form-control" id="contact_fname" ></div>\n' +
        '            <div class="col-4"><label for="contact_lname"> Contact Last Name: </label><input type="name" class="form-control" id="contact_lname" ></div>\n' +
        '            <div class="col-4"><label for="contact_title"> Contact Title: </label><input type="text" class="form-control" id="contact_title" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="contact_email"> Email: </label><input type="email" class="form-control" id="contact_email" ></div>\n' +
        '       <div class="col-4">\n' +
        '           <label for="user_id"> User: </label><select class="form-control" name="user_id" id="user_id" required>\n' +
        '               <option value="" disabled selected>Please select one</option>\n';

    for (var i = 0; i < userData.length; i ++) {
        bodyHtml += '<option value="'+userData[i].user_id+'">&nbsp;'+userData[i].fname+' '+userData[i].lname +'</option>\n';
    }

    bodyHtml += '</select>\n' +
        '</div>\n' +
        '            <div class="col-4"><label for="date"> Survey Date: </label><input type="date" placeholder="yyyy-mm-dd" class="form-control" id="date" required></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentEstablishment"> Comment: </label><input type="text" class="form-control" id="commentEstablishment"></div>\n' +
        '        </div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="button" id="save_establishment" class="btn btn-success" onclick="addEstablishment()"><i class="fas fa-save"></i>&nbsp; Save Premises Information</button>\n' +
        '</div>');
}

function addEstablishment() {
    var name = document.getElementById("name").value;
    var website = document.getElementById("website").value;
    var cat_id = document.getElementById("cat_id").value;
    var subtype = document.getElementById("subtype").value;
    var config_id = document.getElementById("config_id").value;
    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var phone = document.getElementById("phone").value;
    var phone_tty = document.getElementById("phone_tty").value;
    var contact_fname = document.getElementById("contact_fname").value;
    var contact_lname = document.getElementById("contact_lname").value;
    var contact_title = document.getElementById("contact_title").value;
    var contact_email = document.getElementById("contact_email").value;
    var user_id = document.getElementById("user_id").value;
    var date = document.getElementById("date").value;
    var config_comment = document.getElementById("commentEstablishment").value;

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/establishment/",
        data: JSON.stringify({
            "name" : name,
            "website" : website,
            "cat_id" : cat_id,
            "subtype" : subtype,
            "config_id" : config_id,
            "street" : street,
            "city" : city,
            "state" : state,
            "zip" : zip,
            "phone" : phone,
            "phone_tty" : phone_tty,
            "contact_fname" : contact_fname,
            "contact_lname" : contact_lname,
            "contact_title" : contact_title,
            "contact_email" : contact_email,
            "user_id" : user_id,
            "date" : date,
            "config_comment" : config_comment
        }),
        success: function () {

            var estString = user_id+"/"+cat_id+"/"+config_id+"/"+date.split("-")[0]+"/"+date.split("-")[1]+"/"+date.split("-")[2]+"/";

            $.ajax({
                accepts: "application/json",
                method: "GET",
                contentType: "application/json; charset=utf-8",
                url: "get/establishment/" + estString,
                success: function (data) {
                    EST_ID = data[0].est_id;
                    console.log('EST_ID: '+ EST_ID);
                },
                error: function(data) {
                    console.log(JSON.stringify(data));
                }
            });

            $('#collapseTitle').html('Premises Information Added');
            $('#cardTitle').html('New Parking');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Parking Section loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            isParking();

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function isParking() {
    var bodyHtml = "";

    $('#collapseTitle').html('New Parking');
    $('#cardTitle').html('New Parking');

    bodyHtml = '<div class="card-row">\n' +
        '<span class="card-text">Is there parking available near or at the location?</span>\n'+
    '</div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="button" id="is_parking" class="btn btn-success" onclick="addParkingView()"><i class="fas fa-check"></i>&nbsp; Yes</button>\n' +
        '<button  type="button" id="is_not_parking" class="btn btn-default" onclick="addPassengerView()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
        '</div>');
}

function addParkingView() {
    var bodyHtml = "";

    $('#collapseTitle').html('New Parking');
    $('#cardTitle').html('New Parking');

    bodyHtml = '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lot_free"> Lot parking free/paid: </label> <input class="form-control" id="lot_free"></div>\n' +
        '    <div class="col-4"><label for="street_metered"> Street parking metered/not metered: </label><input class="form-control" id="street_metered" ></div>\n' +
        '    <div class="col-4"><label for="parking_type"> Other parking: </label><input class="form-control" id="parking_type" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="total_num_spaces"> Total number of spaces: </label> <input class="form-control" id="total_num_spaces" ></div>\n' +
        '    <div class="col-6"><label for="num_reserved_spaces"> Number of reserved spaces: </label><input class="form-control" id="num_reserved_spaces" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="num_accessable_space"> Number of accessible spaces: </label><input class="form-control" id="num_accessable_space" ></div>\n' +
        '    <div class="col-6"><label for="num_van_accessible"> Number of van accessible spaces: </label><input class="form-control" id="num_van_accessible" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="reserve_space_sign"> Reserved space signage is unobstructed: </label><input class="form-control" id="reserve_space_sign" ></div>\n' +
        '    <div class="col-6"><label for="reserve_space_obstacles"> Reserved parking free of obstacles: </label><input class="form-control" id="reserve_space_obstacles" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="comment"> Describe parking area: </label><input class="form-control" id="comment" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendations"> Recommendations: </label><input class="form-control" id="recommendations" ></div>\n' +
        '</div> ';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="button" id="save_parking" class="btn btn-success" onclick="addParking()"><i class="fas fa-save"></i>&nbsp; Save Parking</button>\n' +
        '</div>');
}

function addParking() {
    var lot_free = document.getElementById("lot_free").value;
    var street_metered = document.getElementById("street_metered").value;
    var parking_type = document.getElementById("parking_type").value;
    var total_num_spaces = document.getElementById("total_num_spaces").value;
    var num_reserved_spaces = document.getElementById("num_reserved_spaces").value;
    var num_accessable_space = document.getElementById("num_accessable_space").value;
    var num_van_accessible = document.getElementById("num_van_accessible").value;
    var reserve_space_sign = document.getElementById("reserve_space_sign").value;
    var reserve_space_obstacles = document.getElementById("reserve_space_obstacles").value;
    var comment = document.getElementById("comment").value;
    var recommendations = document.getElementById("recommendations").value;

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/parking/",
        data: JSON.stringify({
            "lot_free" : lot_free,
            "street_metered" : street_metered,
            "parking_type" : parking_type,
            "total_num_spaces" : total_num_spaces,
            "num_reserved_spaces" : num_reserved_spaces,
            "num_accessable_space" : num_accessable_space,
            "num_van_accessible" : num_van_accessible,
            "reserve_space_sign" : reserve_space_sign,
            "reserve_space_obstacles" : reserve_space_obstacles,
            "comment" : comment,
            "recommendations" : recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            $.ajax({
                async: false,
                dataType: 'json',
                url: 'get/park_id/est/' + EST_ID,
                success: function (data) {
                        PARK_ID = data[0].park_id;
                        console.log()
                },
                error: function(data) {
                    $("#alert-body").html(JSON.stringify(data));
                    $("#alert").modal('toggle');
                }
            });

            $('#collapseTitle').html('Parking Added');
            $('#cardTitle').html('New Parking');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Route From Accessible Parking loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            addRouteFromParkingView();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

}

function addRouteFromParkingView() {
    var bodyHtml = "";

    $('#collapseTitle').html('New Route From Accessible Parking');
    $('#cardTitle').html('New Route From Accessible Parking');

    bodyHtml = '<div class="card-row">\n' +
        '    <div class="col-4"><label for="distance"> Distance from reserved parking to accessible entrance (feet): </label> <input class="form-control" id="distance" ></div>\n' +
        '    <div class="col-4"><label for="min_width"> Route is minimum width and free of obstacles: </label><input class="form-control" id="min_width" ></div>\n' +
        '    <div class="col-4"><label for="route_surface"> Route surface is level, unbroken, firm, slip-resistant: </label><input class="form-control" id="route_surface"></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="route_curbs"> Route has curb ramps and curb cuts where needed: </label> <input class="form-control" id="route_curbs" ></div>\n' +
        '    <div class="col-4"><label for="tactile_warning"> Tactile warning strips are installed: </label><input class="form-control" id="tactile_warning" ></div>\n' +
        '    <div class="col-4"><label for="covered"> Route from parking to accessible entrance is covered: </label><input class="form-control" id="covered" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lighting"> Lighting is adequate: </label><input class="form-control" id="lighting" ></div>\n' +
        '    <div class="col-4"><label for="lighting_option"> Lighting level day/night: </label><input class="form-control" id="lighting_option" ></div>\n' +
        '    <div class="col-4"><label for="lighting_type"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_type" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentRouteFromParking"> Describe the route: </label><input class="form-control" id="commentRouteFromParking" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsRouteFromParking"> Recommendations: </label><input class="form-control" id="recommendationsRouteFromParking" ></div>\n' +
        '</div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="button" id="save_establishment" class="btn btn-success" onclick="addRouteFromParking()"><i class="fas fa-save"></i>&nbsp; Save Premises Information</button>\n' +
        '</div>');

}

function addRouteFromParking() {
    var distance = document.getElementById("distance").value;
    var min_width = document.getElementById("min_width").value;
    var route_surface = document.getElementById("route_surface").value;
    var route_curbs = document.getElementById("route_curbs").value;
    var tactile_warning = document.getElementById("tactile_warning").value;
    var covered = document.getElementById("covered").value;
    var lighting = document.getElementById("lighting").value;
    var lighting_option = document.getElementById("lighting_option").value;
    var lighting_type = document.getElementById("lighting_type").value;
    var comment = document.getElementById("commentRouteFromParking").value;
    var recommendations = document.getElementById("recommendationsRouteFromParking").value;

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "post/route_from_parking/",
        data: JSON.stringify({
            "distance" : distance,
            "min_width" : min_width,
            "route_surface" : route_surface,
            "route_curbs" : route_curbs,
            "tactile_warning" : tactile_warning,
            "covered" : covered,
            "lighting" : lighting,
            "lighting_option" : lighting_option,
            "lighting_type" : lighting_type,
            "comment" : comment,
            "recommendations" : recommendations,
            "park_id" : PARK_ID
        }),
        success: function () {

            $('#collapseTitle').html('Parking Added');
            $('#cardTitle').html('New Parking');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Passenger Loading Zones loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            addPassengerView();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

}

function addPassengerView() {
    var bodyHtml = "";

    $('#collapseTitle').html('New Passenger Loading Zones');
    $('#cardTitle').html('New Passenger Loading Zones');
    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        // '<button  type="button" id="save_establishment" class="btn btn-success" onclick="addEstablishment()"><i class="fas fa-save"></i>&nbsp; Save Premises Information</button>\n' +
        '</div>');

}