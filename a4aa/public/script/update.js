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
var yesNoNAOptions = ["Yes","No","N/A"];
var freePaidNAOptions = ["Free","Paid","N/A"];
var meteredNotOptions = ["Metered","Not Metered","N/A"];
var dayNitghtOptions = ["Day","Night","N/A"];
var lowMedBrightOptions = ["Low","Medium","Bright","N/A"];
var earbudNeckLoopOptions = ["Earbud","Neckloop","Headphones","Other","N/A"];
var infraRedLoopOptions = ["Infra­red Loop","Induction Loop","FM","Amplification","Other","N/A"];

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
    ExteriorRampsViewModel();
    MainEntranceView();
    InteriorViewModel();
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

    bodyHtml = '<form id="establishment_view">\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-6"><label for="name"> Establishment Name: </label><input type="text" class="form-control" id="name" name="name" value="' + estData[0].name + '" required autofocus></div>\n' +
        '               <div class="col-6"><label for="website"> Website: </label><input type="url" class="form-control" id="website" name="website" value="' + estData[0].website + '"></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-4">\n' +
        '                   <label for="cat_id"> Category: </label><select class="form-control" name="cat_id" id="cat_id" required>\n';

    for (var i = 0; i < categoryData.length; i ++) {
        if (categoryData[i].cat_id === estData[0].cat_id ) {
            bodyHtml += '<option value="' + categoryData[i].cat_id + '" selected>&nbsp;' + categoryData[i].name + '</option>\n';
        }
        else {
            bodyHtml += '<option value="' + categoryData[i].cat_id + '">&nbsp;' + categoryData[i].name + '</option>\n';
        }
    }

    bodyHtml += '           </select>\n ' +
        '               </div>\n' +
        '               <div class="col-4">\n' +
        '                   <label for="subtype"> Subtype: </label>\n' +
        '                   <input class="form-control" id="subtype" name="subtype" value="' + estData[0].subtype + '">\n' +
        '               </div>\n' +
        '               <div class="col-4">\n' +
        '                   <label for="cat_id"> Configuration: </label><select class="form-control" id="config_id" name="config_id" required>\n';

    for (var i = 0; i < configData.length; i ++) {
        if (configData[i].config_id === estData[0].config_id ) {
            bodyHtml += '<option value="' + configData[i].config_id + '" selected>&nbsp;' + configData[i].name + '</option>\n';
        }
        else {
            bodyHtml += '<option value="' + configData[i].config_id + '">&nbsp;' + configData[i].name + '</option>\n';
        }
    }

    bodyHtml += '           </select>\n ' +
        '               </div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-12"><label for="street"> Street: </label><input type="text" class="form-control" id="street" name="street" value="' + estData[0].street + '"></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-6"><label for="city"> City: </label><input type="text" class="form-control" id="city" name="city" value="' + estData[0].city + '"></div>\n' +
        '               <div class="col-2"><label for="state"> State: </label><input type="text" class="form-control" id="state" name="state" value="' + estData[0].state + '"></div>\n' +
        '               <div class="col-4"><label for="zip"> Zip: </label><input class="form-control" id="zip" name="zip" value="' + estData[0].zip + '"></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-6"><label for="phone"> Main Phone: </label><input type="tel" class="form-control" id="phone" name="phone" value="' + estData[0].phone + '"></div>\n' +
        '               <div class="col-6"><label for="phone_tty"> TTY/TTD: </label><input type="tel" class="form-control" id="phone_tty" name="phone_tty" value="' + estData[0].tty + '"></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-4"><label for="contact_fname"> Contact First Name: </label><input type="text" class="form-control" id="contact_fname" name="contact_fname" value="' + estData[0].contact_fname + '"></div>\n' +
        '               <div class="col-4"><label for="contact_lname"> Contact Last Name: </label><input type="text" class="form-control" id="contact_lname" name="contact_lname" value="' + estData[0].contact_lname + '"></div>\n' +
        '               <div class="col-4"><label for="contact_title"> Contact Title: </label><input type="text" class="form-control" id="contact_title" name="contact_title" value="' + estData[0].contact_title + '"></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-4"><label for="contact_email"> Email: </label><input type="email" class="form-control" id="contact_email" name="contact_email" value="' + estData[0].contact_email + '"></div>\n' +
        '               <div class="col-4">\n' +
        '                   <label for="user_id"> Surveyor: </label><select class="form-control" id="user_id" name="user_id" required>\n';

                            for (var i = 0; i < userData.length; i ++) {
                                if (userData[i].user_id === estData[0].user_id ) {
                                    bodyHtml += '<option value="'+userData[i].user_id+'" selected>&nbsp;'+userData[i].fname+' '+userData[i].lname+'</option>\n';
                                }
                                else {
                                    bodyHtml += '<option value="'+userData[i].user_id+'">&nbsp;'+userData[i].fname+' '+userData[i].lname+'</option>\n';
                                }
                            }

    bodyHtml += '           </select>\n ' +
        '               </div>\n' +
        '               <div class="col-4"><label for="date"> Survey Date: </label><input type="date" class="form-control" type="date" id="date" name="date" value="' + estData[0].date + '" required></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-12"><label for="commentEstablishment"> Comment: </label><input class="form-control" id="commentEstablishment" name="commentEstablishment" value="' + estData[0].config_comment + '" ></div>\n' +
        '           </div>\n' +
        '           <div class="card-row">\n' +
        '               <div class="col-4">\n' +
        '                   <button type="submit" id="save_establishment" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Premises Information</button>\n' +
        '               </div>\n' +
        '           </div>\n ' +
        '       </form>';

    $('#establishment_card').html(bodyHtml);
    $('#left_sb_name').html(estData[0].name);

    $("#establishment_view").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 255
            },
            website: {
                url: true,
                maxlength: 255
            },
            cat_id: {
                required: true
            },
            subtype: {
                maxlength: 255
            },
            config_id: {
                required: true
            },
            street: {
                maxlength: 255
            },
            city: {
                maxlength: 255
            },
            state: {
                minlength: 2,
                maxlength: 2
            },
            zip: {
                zipcodeUS: true
            },
            phone: {
                phoneUS: true
            },
            phone_tty: {
                phoneUS: true
            },
            contact_fname: {
                maxlength: 255
            },
            contact_lname: {
                maxlength: 255
            },
            contact_title: {
                maxlength: 255
            },
            contact_email: {
                email: true,
                maxlength: 255
            },
            user_id: {
                required: true
            },
            date: {
                required: true,
                dateISO: true
            },
            config_comment: {
                maxlength: 5000
            }
        },
        messages: {
            name: " Must be between 2 and 256 characters long.",
            website: " Include http:// or https://.",
            cat_id: " Must select one from the list.",
            subtype: " Must be less than 256 characters long.",
            config_id: " Must select one from the list.",
            street: " Must be less than 256 characters long.",
            city: " Must be less than 256 characters long.",
            state: " Must use two letter abbreviation.",
            zip: " US Zip Code: 12345 or 12345-1234.",
            phone: " US Phone: 1(509)555-1234, (509)555-1234, 1-509-555-1234, 509-555-1234.",
            phone_tty: " US Phone: 1(509)555-1234, (509)555-1234, 1-509-555-1234, 509-555-1234.",
            contact_fname: " Must be less than 256 characters long.",
            contact_lname: " Must be less than 256 characters long.",
            contact_title: " Must be less than 256 characters long.",
            contact_email: " Must be a valid email address.",
            user_id: " Must select one from the list.",
            date: " Must be a valid date."
        },
        submitHandler: function(form) {
            updateEstablishment();
        }
    });

}

function updateEstablishment() {
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
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/establishment/est/" + EST_ID,
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
            $("#success-body").html('Premises Information Updated');
            $("#success").modal('toggle');
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="parking_view">\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-4"><label for="lot_free"> Lot parking Free/Paid: </label> <select class="form-control" id="lot_free" name="lot_free" >\n';

    bodyHtml += generateThreeSelectOptions(parkingData[0].lot_free, freePaidNAOptions);

    bodyHtml += '   </select>\n ' +
        '       </div>\n' +
        '       <div class="col-4"><label for="street_metered"> Street parking Metered/Not Metered: </label><select class="form-control" id="street_metered" name="street_metered" >\n';

                        if (parkingData[0].street_metered === "Metered") {
                            bodyHtml += '<option value="Metered" selected>&nbsp; Metered</option>\n' +
                                '<option value="Not Metered" >&nbsp; Not Metered</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (parkingData[0].street_metered === "Not Metered"){
                            bodyHtml += '<option value="Metered" >&nbsp; Metered</option>\n' +
                                '<option value="Not Metered" selected>&nbsp; Not Metered</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Metered" >&nbsp; Metered</option>\n' +
                                '<option value="Not Metered" >&nbsp; Not Metered</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '   </select>\n ' +
        '       </div>' +
        '       <div class="col-4"><label for="parking_type"> Other type of parking: </label><input type="text" class="form-control" id="parking_type" name="parking_type" value="'+parkingData[0].parking_type+'"></div>\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-6"><label for="total_num_spaces"> Total number of spaces: </label> <input type="number" class="form-control" id="total_num_spaces" name="total_num_spaces" value="'+parkingData[0].total_num_spaces+'"></div>\n' +
        '        <div class="col-6"><label for="num_reserved_spaces"> Number of reserved spaces: </label><input type="number" class="form-control" id="num_reserved_spaces" name="num_reserved_spaces" value="'+parkingData[0].num_reserved_spaces+'"></div>\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-6"><label for="num_accessable_space"> Number of accessible spaces: </label><input type="number" class="form-control" id="num_accessable_space" name="num_accessable_space" value="'+parkingData[0].num_accessable_space+'"></div>\n' +
        '       <div class="col-6"><label for="num_van_accessible"> Number of van accessible spaces: </label><input type="number" class="form-control" id="num_van_accessible" name="num_van_accessible" value="'+parkingData[0].num_van_accessible+'"></div>\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-6"><label for="reserve_space_sign"> Reserved space signage is unobstructed: </label><select class="form-control" id="reserve_space_sign" name="reserve_space_sign" >\n ';

                        if (parkingData[0].reserve_space_sign === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (parkingData[0].street_metered === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '   </select>\n ' +
        '       </div>\n' +
        '       <div class="col-6"><label for="reserve_space_obstacles"> Reserved parking free of obstacles: </label><select class="form-control" id="reserve_space_obstacles" name="reserve_space_obstacles" >\n';

                        if (parkingData[0].reserve_space_obstacles === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (parkingData[0].reserve_space_obstacles === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '   </select>\n ' +
        '       </div>' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-12"><label for="comment"> Describe parking area: </label><input type="text" class="form-control" id="comment" name="comment" value="'+parkingData[0].comment+'"></div>\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-12"><label for="recommendations"> Recommendations: </label><input type="text" class="form-control" id="recommendations" name="recommendations" value="'+parkingData[0].recommendations+'"></div>\n' +
        '       <input type="hidden" class="form-control" id="park_id" name="park_id" value="'+parkingData[0].park_id+'">\n' +
        '       <input type="hidden" class="form-control" id="park_est_id" name="park_est_id" value="'+parkingData[0].est_id+'">\n' +
        '   </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-4">\n' +
        '           <button  type="submit" id="save_parking" class="btn btn-success"><i class="fas fa-save"></i>&nbsp; Save Parking</button>\n' +
        '       </div>\n' +
        '   </div>\n ' +
        '</form>';

    $('#parking_card').append(bodyHtml);

    $("#parking_view").validate({
        rules: {
            parking_type: {
                maxlength: 24
            },
            total_num_spaces: {
                number: true
            },
            num_reserved_spaces: {
                number: true
            },
            num_accessable_space: {
                number: true
            },
            num_van_accessible: {
                number: true
            },
            comment: {
                maxlength: 5000
            },
            recommendations: {
                maxlength: 5000
            }
        },
        messages: {
            parking_type: " Must be less than 25 characters long."
        },
        submitHandler: function(form) {
            updateParking();
        }
    });

}

function updateParking() {
    var est_id = document.getElementById("park_est_id").value;
    var park_id = document.getElementById("park_id").value;
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
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/parking/est/" + est_id,
        data: JSON.stringify({
            "park_id" : park_id,
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
            "recommendations" : recommendations
        }),
        success: function () {
            $("#success-body").html('Parking Updated');
            $("#success").modal('toggle');
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="route_from_parking_view">\n ' +
        '       <div class="card-row">\n' +
        '            <div class="col-4"><label for="distance"> Distance from reserved parking to accessible entrance (feet): </label> <input type="number" min="0" class="form-control" id="distance" name="distance" value="'+routeFromParkingData[0].distance+'"  ></div>\n' +
        '            <div class="col-4"><label for="min_width"> Route is minimum width and free of obstacles: </label><select class="form-control" id="min_width" name="min_width">\n ';

                        if (routeFromParkingData[0].min_width === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].min_width === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="route_surface"> Route surface is level, unbroken, firm, slip-resistant: </label><select class="form-control" id="route_surface" name="route_surface" >\n';

                        if (routeFromParkingData[0].route_surface === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].route_surface === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="route_curbs"> Route has curb ramps and curb cuts where needed: </label> <select class="form-control" id="route_curbs" name="route_curbs" >\n';

                        if (routeFromParkingData[0].route_curbs === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].route_curbs === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="tactile_warning"> Tactile warning strips are installed: </label><select class="form-control" id="tactile_warning" name="tactile_warning" >\n';

                        if (routeFromParkingData[0].tactile_warning === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].tactile_warning === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="covered"> Route from parking to accessible entrance is covered: </label><select class="form-control" id="covered" name="covered" >\n';

                        if (routeFromParkingData[0].covered === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].covered === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="lighting"> Lighting is adequate: </label><select class="form-control" id="lighting" name="lighting" >\n';

                        if (routeFromParkingData[0].lighting === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].lighting === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_option"> Lighting level day/night: </label><select class="form-control" id="lighting_option" name="lighting_option" >\n';

                        if (routeFromParkingData[0].lighting_option === "Day") {
                            bodyHtml += '<option value="Day" selected>&nbsp; Day</option>\n' +
                                '<option value="Night" >&nbsp; Night</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].lighting_option === "Night") {
                            bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                '<option value="Night" selected>&nbsp; Night</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                '<option value="Night" >&nbsp; Night</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_type"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_type" name="lighting_type" >\n';

                        if (routeFromParkingData[0].lighting_type === "Low") {
                            bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                '<option value="Bright" >Bright</option>\n' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].lighting_type === "Medium") {
                            bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                '<option value="Bright" >&nbsp; Bright</option>\n' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (routeFromParkingData[0].lighting_type === "Bright") {
                            bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                '<option value="Bright" >&nbsp; Bright</option>\n' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentRouteFromParking"> Describe the route: </label><input type="text" class="form-control" id="commentRouteFromParking" name="commentRouteFromParking" value="'+routeFromParkingData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsRouteFromParking"> Recommendations: </label><input type="text" class="form-control" id="recommendationsRouteFromParking" name="recommendationsRouteFromParking" value="'+routeFromParkingData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="route_park_id" value="'+routeFromParkingData[0].park_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="route_from_park_id" value="'+routeFromParkingData[0].route_park_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_route_from_parking" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Route From Parking</button>\n' +
        '            </div>\n' +
        '        </div>\n ' +
        '    </form>';

    $('#route_from_parking_card').append(bodyHtml);

    $("#route_from_parking_view").validate({
        rules: {
            distance: {
                number: true
            },
            commentRouteFromParking: {
                maxlength: 5000
            },
            recommendationsRouteFromParking: {
                maxlength: 5000
            }
        },
        messages: {
            commentRouteFromParking: " Must be less than 5000 characters long.",
            recommendationsRouteFromParking: " Must be less than 5000 characters long."
        },
        submitHandler: function(form) {
            updateRouteFromParking();
        }
    });

}

function updateRouteFromParking() {
    var route_park_id = document.getElementById("route_from_park_id").value;
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
    var park_id = document.getElementById("route_park_id").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/route_from_parking/park/" + park_id,
        data: JSON.stringify({
            "route_park_id" : route_park_id,
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
            "recommendations" : recommendations
        }),
        success: function () {
            $("#success-body").html('Route From Parking Updated');
            $("#success").modal('toggle');
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="passenger_loading_view">\n ' +
        '   <div class="card-row">\n' +
        '        <div class="col-4"><label for="designated_zonePassengerLoading"> There is a designated passenger loading zone: </label> <select class="form-control" id="designated_zonePassengerLoading" name="designated_zonePassengerLoading" >\n';

                            if (passengerLoadingData[0].designated_zone === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].designated_zone === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        <div class="col-4"><label for="distancePassengerLoading"> Distance from passenger loading zone (feet): </label> <input type="number" min="0" class="form-control" id="distancePassengerLoading" name="distancePassengerLoading" value="'+passengerLoadingData[0].distance+'" ></div>\n' +
        '        <div class="col-4"><label for="min_widthPassengerLoading"> Route is minimum width and free of obstacles: </label><select class="form-control" id="min_widthPassengerLoading" name="min_widthPassengerLoading" >\n';

                            if (passengerLoadingData[0].min_width === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].min_width === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-6"><label for="passenger_surfacePassengerLoading"> Route surface is level, unbroken, firm, slip-resistant: </label><select class="form-control" id="passenger_surfacePassengerLoading" name="passenger_surfacePassengerLoading" >\n';

                            if (passengerLoadingData[0].passenger_surface === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].passenger_surface === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        <div class="col-6"><label for="tactile_warning_stripsPassengerLoading"> Tactile warning strips are installed:</label><select class="form-control" id="tactile_warning_stripsPassengerLoading" name="tactile_warning_stripsPassengerLoading" >\n';

                            if (passengerLoadingData[0].tactile_warning_strips === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].tactile_warning_strips === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-6"><label for="passenger_curbs"> Route has curb ramps and curb cuts where needed: </label><select class="form-control" id="passenger_curbs" name="passenger_curbs" >\n';

                            if (passengerLoadingData[0].passenger_curbs === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].passenger_curbs === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        <div class="col-6"><label for="coveredPassengerLoading"> Route from parking to accessible entrance is covered: </label><select class="form-control" id="coveredPassengerLoading" name="coveredPassengerLoading" >\n';

                            if (passengerLoadingData[0].covered === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].covered === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-4"><label for="lightingPassengerLoading"> Lighting is adequate: </label><select class="form-control" id="lightingPassengerLoading" name="lightingPassengerLoading" >\n';

                            if (passengerLoadingData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        <div class="col-4"><label for="lighting_optionPassengerLoading"> Lighting level day/night: </label><select class="form-control" id="lighting_optionPassengerLoading" name="lighting_optionPassengerLoading" >\n';

                            if (passengerLoadingData[0].lighting_option === "Day") {
                                bodyHtml += '<option value="Day" selected>&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].lighting_option === "Night") {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" selected>&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        <div class="col-4"><label for="lighting_typePassengerLoading"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typePassengerLoading" name="lighting_typePassengerLoading" >\n';

                            if (passengerLoadingData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (passengerLoadingData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-12"><label for="commentPassengerLoading"> Describe the route: </label><input type="text" class="form-control" id="commentPassengerLoading" name="commentPassengerLoading" value="'+passengerLoadingData[0].comment+'" ></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-12"><label for="recommendationsPassengerLoading"> Recommendations: </label><input type="text" class="form-control" id="recommendationsPassengerLoading" name="recommendationsPassengerLoading" value="'+passengerLoadingData[0].recommendations+'" ></div>\n' +
        '        <input type="hidden" class="form-control" id="passenger_park_id" value="'+passengerLoadingData[0].park_id+'" >\n' +
        '        <input type="hidden" class="form-control" id="passenger_id" value="'+passengerLoadingData[0].passenger_id+'" >\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '        <div class="col-4">\n' +
        '            <button  type="submit" id="save_passenger_loading" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Passenger Loading Zones</button>\n' +
        '        </div>\n' +
        '    </div>\n ' +
        '</form>';

    $('#passenger_loading_card').html(bodyHtml);
    $('#designated_zonePassengerLoading').focus();

    $("#passenger_loading_view").validate({
        rules: {
            distance: {
                number: true
            },
            commentRouteFromParking: {
                maxlength: 5000
            },
            recommendationsRouteFromParking: {
                maxlength: 5000
            }
        },
        messages: {
            commentRouteFromParking:  " Must be less than 5000 characters.",
            recommendationsRouteFromParking: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updatePassengerLoading();
        }
    });
}

function updatePassengerLoading() {
    var passenger_id = document.getElementById("passenger_id").value;
    var designated_zone = document.getElementById("designated_zonePassengerLoading").value;
    var distance = document.getElementById("distancePassengerLoading").value;
    var min_width = document.getElementById("min_widthPassengerLoading").value;
    var passenger_surface = document.getElementById("passenger_surfacePassengerLoading").value;
    var tactile_warning_strips = document.getElementById("tactile_warning_stripsPassengerLoading").value;
    var passenger_curbs = document.getElementById("passenger_curbs").value;
    var covered = document.getElementById("coveredPassengerLoading").value;
    var lighting = document.getElementById("lightingPassengerLoading").value;
    var lighting_option = document.getElementById("lighting_optionPassengerLoading").value;
    var lighting_type = document.getElementById("lighting_typePassengerLoading").value;
    var comment = document.getElementById("commentPassengerLoading").value;
    var recommendations = document.getElementById("recommendationsPassengerLoading").value;
    var park_id = document.getElementById("passenger_park_id").value;

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/passenger_loading/park/" + park_id,
        data: JSON.stringify({
            "passenger_id" : passenger_id,
            "designated_zone" : designated_zone,
            "distance" : distance,
            "min_width" : min_width,
            "passenger_surface" : passenger_surface,
            "tactile_warning_strips" : tactile_warning_strips,
            "passenger_curbs" : passenger_curbs,
            "covered" : covered,
            "lighting" : lighting,
            "lighting_option" : lighting_option,
            "lighting_type" : lighting_type,
            "comment" : comment,
            "recommendations" : recommendations
        }),
        success: function () {
            $("#success-body").html('Passenger Loading Zones Updated');
            $("#success").modal('toggle');
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="sta_bus_view">\n ' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="sta_service_area"> Establishment is within the STA Service Area: </label> <select class="form-control" id="sta_service_area">\n';

                            if (staBusData[0].sta_service_area === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].sta_service_area === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n ' +
        '            <div class="col-4"><p>&emsp;</p></div>\n' +
        '            <div class="col-2"><label for="add_route"> Add STA Route: </label><br><button  type="button" id="add_route" class="btn btn-warning" onclick="addSTARouteView()"><i class="far fa-plus-square"></i>&nbsp; Add Route</button></div>\n' +
        '        </div>\n';

                    for(var i = 0; i < staRouteData.length; i++ ) {
                        bodyHtml += '<div class="card-row">\n' +
                        '                <div class="col-2"><label for="route_num_'+staRouteData[i].sta_route_id+'"  > Route Number: </label><input type="number" min="0" class="form-control" id="route_num_'+staRouteData[i].sta_route_id+'"  name="route_num_'+staRouteData[i].sta_route_id+'"  value="'+staRouteData[i].route_num+'" ></div>\n' +
                        '                <div class="col-2"><label for="north_bound_stop_'+staRouteData[i].sta_route_id+'" > North Bound Stop: </label><input type="number" min="0" class="form-control" id="north_bound_stop_'+staRouteData[i].sta_route_id+'" name="north_bound_stop_'+staRouteData[i].sta_route_id+'" value="'+staRouteData[i].north_bound_stop+'" ></div>\n' +
                        '                <div class="col-2"><label for="south_bound_stop_'+staRouteData[i].sta_route_id+'" > South Bound Stop: </label><input type="number" min="0" class="form-control" id="south_bound_stop_'+staRouteData[i].sta_route_id+'" name="south_bound_stop_'+staRouteData[i].sta_route_id+'" value="'+staRouteData[i].south_bound_stop+'" ></div>\n' +
                        '                <div class="col-2"><label for="east_bound_stop_'+staRouteData[i].sta_route_id+'" > East Bound Stop: </label><input type="number" min="0" class="form-control" id="east_bound_stop_'+staRouteData[i].sta_route_id+'" name="east_bound_stop_'+staRouteData[i].sta_route_id+'" value="'+staRouteData[i].east_bound_stop+'" ></div>\n' +
                        '                <div class="col-2"><label for="west_bound_stop_'+staRouteData[i].sta_route_id+'" > West Bound Stop: </label><input type="number" min="0" class="form-control" id="west_bound_stop_'+staRouteData[i].sta_route_id+'" name="west_bound_stop_'+staRouteData[i].sta_route_id+'" value="'+staRouteData[i].west_bound_stop+'" ></div>\n' +
                        '                <input type="hidden" class="form-control" id="sta_route_id_'+staRouteData[i].sta_route_id+'" value="'+staRouteData[i].sta_route_id+'" >\n' +
                        '                <input type="hidden" class="form-control" id="sta_bus_id_'+staRouteData[i].sta_route_id+'"  value="'+staRouteData[i].sta_bus_id+'" ">\n' +
                        '                <div class="col-2"><label> Save&emsp;&nbsp;Delete </label><br>\n' +
                        '                    <button type="button" id="add_route_'+staRouteData[i].sta_route_id+'" class="btn btn-success pointer" onclick="updateSTARoute('+staRouteData[i].sta_route_id+')"><i class="fas fa-save"></i></button>&emsp;\n ' +
                        '                    <button type="button" id="delete_route_'+staRouteData[i].sta_route_id+'" class="btn btn-danger pointer" onclick="deleteSTARoute('+staRouteData[i].sta_route_id+')"><i class="fas fa-trash-alt"></i></button>\n ' +
                        '                </div>\n' +
                        '            </div>\n';
                    }

    bodyHtml += '<div class="card-row">\n' +
        '            <div class="col-6"><label for="distanceStaBus"> Distance from nearest bus stop (feet): </label> <input type="number" min="0" class="form-control" id="distanceStaBus" name="distanceStaBus" value="'+staBusData[0].distance+'" ></div>\n' +
        '            <div class="col-6"><label for="min_widthStaBus"> Route is minimum width and free of obstacles: </label><select class="form-control" id="min_widthStaBus" name="min_widthStaBus" >\n';

                            if (staBusData[0].min_width === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].min_width === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="route_surfaceStaBus"> Route surface is level, unbroken, firm, slip-resistant: </label><select class="form-control" id="route_surfaceStaBus" name="route_surfaceStaBus" >\n';

                            if (staBusData[0].route_surface === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].route_surface === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="tactile_warning_stripsStaBus"> Tactile warning strips are installed: </label><select class="form-control" id="tactile_warning_stripsStaBus" name="tactile_warning_stripsStaBus" >\n';

                            if (staBusData[0].tactile_warning_strips === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].tactile_warning_strips === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="curb_cutsStaBus"> Route has curb ramps and curb cuts where needed: </label><select class="form-control" id="curb_cutsStaBus" name="curb_cutsStaBus" >\n';

                            if (staBusData[0].curb_cuts === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].curb_cuts === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-3"><label for="lightingStaBus"> Lighting is adequate: </label><select class="form-control" id="lightingStaBus" name="lightingStaBus" >\n';

                            if (staBusData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="lighting_optionStaBus"> Lighting level day/night: </label><select class="form-control" id="lighting_optionStaBus" name="lighting_optionStaBus" >\n';

                            if (staBusData[0].lighting_option === "Day") {
                                bodyHtml += '<option value="Day" selected>&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].lighting_option === "Night") {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" selected>&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="lighting_typeStaBus"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeStaBus" name="lighting_typeStaBus" >\n';

                            if (staBusData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="shelter_bench"> Shelter or Bench at bust stop: </label><select class="form-control" id="shelter_bench" name="shelter_bench" >\n';

                            if (staBusData[0].shelter_bench === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (staBusData[0].shelter_bench === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentStaBus"> Describe the route: </label><input type="text" class="form-control" id="commentStaBus" name="commentStaBus" value="'+staBusData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsStaBus"> Recommendations: </label><input type="text" class="form-control" id="recommendationsStaBus" name="recommendationsStaBus" value="'+staBusData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="sta_park_id" value="'+staBusData[0].park_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="sta_id" value="'+staBusData[0].sta_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_sta_bus" class="btn btn-success"><i class="fas fa-save"></i>&nbsp; Save STA Bus Information</button>\n' +
        '            </div>\n' +
        '        </div>\n ' +
        '   </form>';

    $('#sta_bus_card').html(bodyHtml);
    $('#sta_service_area').focus();

    $("#sta_bus_view").validate({
        rules: {
            commentStaBus: {
                maxlength: 5000
            },
            recommendationsStaBus: {
                maxlength: 5000
            }
        },
        messages: {
            commentStaBus:  " Must be less than 5000 characters.",
            recommendationsStaBus: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateSTABus();
        }
    });

}

function updateSTABus() {
    var sta_id = document.getElementById("sta_id").value;
    var sta_service_area = document.getElementById("sta_service_area").value;
    var distance = document.getElementById("distanceStaBus").value;
    var min_width = document.getElementById("min_widthStaBus").value;
    var route_surface = document.getElementById("route_surfaceStaBus").value;
    var tactile_warning_strips = document.getElementById("tactile_warning_stripsStaBus").value;
    var curb_cuts = document.getElementById("curb_cutsStaBus").value;
    var lighting = document.getElementById("lightingStaBus").value;
    var lighting_option = document.getElementById("lighting_optionStaBus").value;
    var lighting_type = document.getElementById("lighting_typeStaBus").value;
    var shelter_bench = document.getElementById("shelter_bench").value;
    var comment = document.getElementById("commentStaBus").value;
    var recommendations = document.getElementById("recommendationsStaBus").value;
    var park_id = document.getElementById("sta_park_id").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/sta_bus/park/" + park_id,
        data: JSON.stringify({
            "sta_id" : sta_id,
            "sta_service_area" : sta_service_area,
            "distance" : distance,
            "min_width" : min_width,
            "route_surface" : route_surface,
            "tactile_warning_strips" : tactile_warning_strips,
            "curb_cuts" : curb_cuts,
            "lighting" : lighting,
            "lighting_option" : lighting_option,
            "lighting_type" : lighting_type,
            "shelter_bench" : shelter_bench,
            "comment" : comment,
            "recommendations" : recommendations
        }),
        success: function () {
            $("#success-body").html('STA Bus Information Updated');
            $("#success").modal('toggle');
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function updateSTARoute(sta_route_id) {

    var route_num = document.getElementById("route_num_"+sta_route_id).value;
    var north_bound_stop = document.getElementById("north_bound_stop_"+sta_route_id).value;
    var south_bound_stop = document.getElementById("south_bound_stop_"+sta_route_id).value;
    var east_bound_stop = document.getElementById("east_bound_stop_"+sta_route_id).value;
    var west_bound_stop = document.getElementById("west_bound_stop_"+sta_route_id).value;
    var sta_bus_id = document.getElementById("sta_bus_id_"+sta_route_id).value;

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/sta_route/sta_bus/" + sta_bus_id,
        data: JSON.stringify({
            "sta_route_id" : sta_route_id,
            "route_num" : route_num,
            "north_bound_stop" : north_bound_stop,
            "south_bound_stop" : south_bound_stop,
            "east_bound_stop" : east_bound_stop,
            "west_bound_stop" : west_bound_stop
        }),
        success: function () {
            $("#success-body").html('STA Route '+route_num+' Updated');
            $("#success").modal('toggle');
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function addSTARouteView() {

    $('#staTitle').html('New STA Route');

    $('#sta-body').html( '<form id="add_sta_route">\n' +
        '<div class="card-row">\n' +
        '   <div class="col-3"><label for="route_numAdd"> Route Number: </label><input type="number" min="0" class="form-control" name="route_numAdd" id="route_numAdd" ></div>\n' +
        '</div>\n'+
        '<div class="card-row">\n' +
        '   <div class="col-3"><label for="north_bound_stopAdd"> North Bound Stop: </label><input type="number" min="0" class="form-control" name="north_bound_stopAdd" id="north_bound_stopAdd" ></div>\n' +
        '   <div class="col-3"><label for="south_bound_stopAdd"> South Bound Stop: </label><input type="number" min="0" class="form-control" name="south_bound_stopAdd" id="south_bound_stopAdd" ></div>\n' +
        '   <div class="col-3"><label for="east_bound_stopAdd"> East Bound Stop: </label><input type="number" min="0" class="form-control" name="east_bound_stopAdd" id="east_bound_stopAdd" ></div>\n' +
        '   <div class="col-3"><label for="west_bound_stopAdd"> West Bound Stop: </label><input type="number" min="0" class="form-control" name="west_bound_stopAdd" id="west_bound_stopAdd" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <span>\n ' +
        '       <button type="submit" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save STA Route</button>&nbsp;\n' +
        '       <button type="button" class="btn btn-secondary" onclick="StaBusView()">Cancel</button>\n ' +
        '   </span>\n' +
        '</div>\n ' +
        '</form>'
    );
    $('#route_numAdd').focus();

    $("#sta-route-modal").modal('toggle');

    $("#add_sta_route").validate({
        rules: {
            route_numAdd: {
                number: true
            },
            north_bound_stopAdd: {
                number: true
            },
            south_bound_stopAdd: {
                number: true
            },
            east_bound_stopAdd: {
                number: true
            },
            west_bound_stopAdd: {
                number: true
            }
        },
        submitHandler: function(form) {
            addSTARoute();
        }
    });

}

function addSTARoute() {

    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/sta_bus_id/park/' + PARK_ID,
        success: function (data) {
            STA_ID = data[0].sta_id;
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

    var route_num = document.getElementById("route_numAdd").value;
    var north_bound_stop = document.getElementById("north_bound_stopAdd").value;
    var south_bound_stop = document.getElementById("south_bound_stopAdd").value;
    var east_bound_stop = document.getElementById("east_bound_stopAdd").value;
    var west_bound_stop = document.getElementById("west_bound_stopAdd").value;

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/sta_route/",
        data: JSON.stringify({
            "route_num" : route_num,
            "north_bound_stop" : north_bound_stop,
            "south_bound_stop" : south_bound_stop,
            "east_bound_stop" : east_bound_stop,
            "west_bound_stop" : west_bound_stop,
            "sta_bus_id" : STA_ID
        }),
        success: function () {
            $("#success-body").html('New STA Route '+route_num+' Added');
            $("#success").modal('toggle');
            StaBusView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });
}

function deleteSTARoute(sta_route_id) {
    var route_num = document.getElementById('route_num_'+sta_route_id).value;
    if(confirm('Are you sure you want to delete STA Route '+route_num+'?\nThis action can not be undone.')) {
        $.ajax({
            async: false,
            method: 'DELETE',
            url: 'delete/sta_route/' + sta_route_id,
            success: function () {
                StaBusView();
            },
            error: function (data) {
                $("#alert-body").html(JSON.stringify(data));
                $("#alert").modal('toggle');
            }
        });
    }
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

    bodyHtml = '<form id="exterior_pathways_view">\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="service_animal"> There is a service animal relief area on the premises or within 1 block: </label> <select class="form-control" id="service_animal" name="service_animal" >\n';

                        if (exteriorPathwayData[0].service_animal === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (exteriorPathwayData[0].service_animal === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n ' +
        '            <div class="col-8"><label for="service_animal_location"> Location of service animal relief: </label> <input type="text" class="form-control" id="service_animal_location" name="service_animal_location"  value="'+exteriorPathwayData[0].service_animal_location+'"></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="has_exterior_path"> The establishment has exterior pathways/walkways: </label> <select class="form-control" id="has_exterior_path" name="has_exterior_path" >\n';

                            if (exteriorPathwayData[0].has_exterior_path === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].has_exterior_path === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n ' +
        '            <div class="col-4"><label for="min_widthExteriorPathway"> Pathway is minimum width and free of obstacles: </label><select class="form-control" id="min_widthExteriorPathway" name="min_widthExteriorPathway" >\n';

                            if (exteriorPathwayData[0].min_width === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].min_width === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n ' +
        '            <div class="col-4"><label for="pathway_surface"> Pathway surface is level, unbroken, firm, slip-resistant: </label><select class="form-control" id="pathway_surface" name="pathway_surface" >\n';

                            if (exteriorPathwayData[0].pathway_surface === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].pathway_surface === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n ' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="pathway_curbs"> Route has curb ramps and curb cuts where needed: </label><select class="form-control" id="pathway_curbs" name="pathway_curbs" >\n';

                            if (exteriorPathwayData[0].pathway_curbs === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].pathway_curbs === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n ' +
        '            <div class="col-4"><label for="tactile_warningExteriorPathway"> Tactile warning strips are installed: </label><select class="form-control" id="tactile_warningExteriorPathway" name="tactile_warningExteriorPathway" >\n';

                            if (exteriorPathwayData[0].tactile_warning === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].tactile_warning === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n ' +
        '            <div class="col-4"><label for="slope"> Slope of the pathway is no steeper than 1:20: </label><select class="form-control" id="slope" name="slope" >\n';

                            if (exteriorPathwayData[0].slope === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].slope === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n ' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="lightingExteriorPathway"> Lighting is adequate: </label><select class="form-control" id="lightingExteriorPathway" name="lightingExteriorPathway" >\n';

                            if (exteriorPathwayData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_optionExteriorPathway"> Lighting level day/night: </label><select class="form-control" id="lighting_optionExteriorPathway" name="lighting_optionExteriorPathway" >\n';

                            if (exteriorPathwayData[0].lighting_option === "Day") {
                                bodyHtml += '<option value="Day" selected>&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].lighting_option === "Night") {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" selected>&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_typeExteriorPathway"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeExteriorPathway" name="lighting_typeExteriorPathway" >\n';

                            if (exteriorPathwayData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorPathwayData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentExteriorPathway"> Describe the route: </label><input type="text" class="form-control" id="commentExteriorPathway" name="commentExteriorPathway" value="'+exteriorPathwayData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsExteriorPathway"> Recommendations: </label><input type="text" class="form-control" id="recommendationsExteriorPathway" name="recommendationsExteriorPathway" value="'+exteriorPathwayData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="ext_path_id" value="'+exteriorPathwayData[0].ext_path_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idExteriorPathway" value="'+exteriorPathwayData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_exterior_pathways" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Exterior Pathways</button>\n' +
        '            </div>\n' +
        '        </div>\n ' +
        '   </form>';

    $('#exterior_pathways_card').html(bodyHtml);

    $("#exterior_pathways_view").validate({
        rules: {
            service_animal_location: {
                maxlength: 255
            },
            commentExteriorPathway: {
                maxlength: 5000
            },
            recommendationsExteriorPathway: {
                maxlength: 5000
            }
        },
        messages: {
            service_animal_location: " Must be less than 256 characters.",
            commentExteriorPathway:  " Must be less than 5000 characters.",
            recommendationsExteriorPathway: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateExteriorPathways();
        }
    });
}

function updateExteriorPathways() {
    var ext_path_id = document.getElementById("ext_path_id").value;
    var service_animal = document.getElementById("service_animal").value;
    var service_animal_location = document.getElementById("service_animal_location").value;
    var has_exterior_path = document.getElementById("has_exterior_path").value;
    var min_width = document.getElementById("min_widthExteriorPathway").value;
    var pathway_surface = document.getElementById("pathway_surface").value;
    var pathway_curbs = document.getElementById("pathway_curbs").value;
    var tactile_warning = document.getElementById("tactile_warningExteriorPathway").value;
    var slope = document.getElementById("slope").value;
    var lighting = document.getElementById("lightingExteriorPathway").value;
    var lighting_option = document.getElementById("lighting_optionExteriorPathway").value;
    var lighting_type = document.getElementById("lighting_typeExteriorPathway").value;
    var comment = document.getElementById("commentExteriorPathway").value;
    var recommendations = document.getElementById("recommendationsExteriorPathway").value;
    var est_id = document.getElementById("est_idExteriorPathway").value;

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/exterior_pathways/est/" + est_id,
        data: JSON.stringify({
            "ext_path_id" : ext_path_id,
            "service_animal" : service_animal,
            "service_animal_location" : service_animal_location,
            "has_exterior_path" : has_exterior_path,
            "min_width" : min_width,
            "pathway_surface" : pathway_surface,
            "pathway_curbs" : pathway_curbs,
            "tactile_warning" : tactile_warning,
            "slope" : slope,
            "lighting" : lighting,
            "lighting_option" : lighting_option,
            "lighting_type" : lighting_type,
            "comment" : comment,
            "recommendations" : recommendations
        }),
        success: function () {
            $("#success-body").html('Exterior Pathways Updated');
            $("#success").modal('toggle');
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="exterior_stairs_view"> \n ' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="stairs_required"> Stairs are required: </label> <select class="form-control" id="stairs_required" name="stairs_required" >\n';

                            if (exteriorStairsData[0].stairs_required === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].stairs_required === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="stairs_available"> Stairs are available: </label> <select class="form-control" id="stairs_available" name="stairs_available" >\n';

                            if (exteriorStairsData[0].stairs_available === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].stairs_available === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="num_stairs"> Number of stairs: </label> <input type="number" min="0" class="form-control" id="num_stairs" name="num_stairs" value="'+exteriorStairsData[0].num_stairs+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="handrail_both_sides"> Both sides of stairs have handrails: </label> <select class="form-control" id="handrail_both_sides" name="handrail_both_sides" >\n';

                            if (exteriorStairsData[0].handrail_both_sides === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].handrail_both_sides === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="handrail_side"> Handrail sides Left/Right/None/NA: </label><select class="form-control" id="handrail_side" name="handrail_side" >\n';

                            if (exteriorStairsData[0].handrail_side === "Left") {
                                bodyHtml += '<option value="Left" selected>&nbsp; Left</option>\n' +
                                    '<option value="Right" >&nbsp; Right</option>\n ' +
                                    '<option value="None" >&nbsp; None</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].handrail_side === "Right") {
                                bodyHtml += '<option value="Left" >&nbsp; Left</option>\n' +
                                    '<option value="Right" selected>&nbsp; Right</option>\n ' +
                                    '<option value="None" >&nbsp; None</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].handrail_side === "None") {
                                bodyHtml += '<option value="Left" >&nbsp; Left</option>\n' +
                                    '<option value="Right" >&nbsp; Right</option>\n ' +
                                    '<option value="None" selected>&nbsp; None</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else {
                                bodyHtml += '<option value="Left" >&nbsp; Left</option>\n' +
                                    '<option value="Right" >&nbsp; Right</option>\n ' +
                                    '<option value="None" >&nbsp; None</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-8"><label for="handrail_regulation_height"> Top of the handrail gripping surface is between 34” and 38” above the stair surface: </label><select class="form-control" id="handrail_regulation_height" name="handrail_regulation_height" >\n';

                            if (exteriorStairsData[0].handrail_regulation_height === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].handrail_regulation_height === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="handrail_height"> Handrail height: </label><input type="number" min="0" class="form-control" id="handrail_height" name="handrail_height" value="'+exteriorStairsData[0].handrail_height+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="obstacles"> Stairs are clear of obstacles or protrusions: </label><select class="form-control" id="obstacles" name="obstacles" >\n';

                            if (exteriorStairsData[0].obstacles === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].obstacles === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="clearly_marked"> Stairs are clearly marked: </label><select class="form-control" id="clearly_marked" name="clearly_marked" >\n';

                        if (exteriorStairsData[0].clearly_marked === "Yes") {
                            bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        }
                        else if (exteriorStairsData[0].clearly_marked === "No") {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" selected>&nbsp; No</option>\n ' +
                                '<option value="N/A" >&nbsp; N/A</option>';
                        } else {
                            bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                '<option value="No" >&nbsp; No</option>\n ' +
                                '<option value="N/A" selected>&nbsp; N/A</option>';
                        }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="lightingExteriorStairs"> Lighting is adequate: </label><select class="form-control" id="lightingExteriorStairs" name="lightingExteriorStairs" >\n';

                            if (exteriorStairsData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_optionExteriorStairs"> Lighting level day/night: </label><select class="form-control" id="lighting_optionExteriorStairs" name="lighting_optionExteriorStairs" >\n';

                            if (exteriorStairsData[0].lighting_option === "Day") {
                                bodyHtml += '<option value="Day" selected>&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].lighting_option === "Night") {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" selected>&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_typeExteriorStairs"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeExteriorStairs" name="lighting_typeExteriorStairs" >\n';

                            if (exteriorStairsData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorStairsData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentExteriorStairs"> Describe the route: </label><input class="form-control" id="commentExteriorStairs" name="commentExteriorStairs" value="'+exteriorStairsData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsExteriorStairs"> Recommendations: </label><input class="form-control" id="recommendationsExteriorStairs" name="recommendationsExteriorStairs" value="'+exteriorStairsData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="ext_stair_id"  value="'+exteriorStairsData[0].ext_stair_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idExteriorStairs"  value="'+exteriorStairsData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_exterior_stairs" class="btn btn-success"><i class="fas fa-save"></i>&nbsp; Save Exterior Stairs</button>\n' +
        '            </div>\n' +
        '        </div>\n ' +
        '   </form>';

    $('#exterior_stairs_card').html(bodyHtml);

    $("#exterior_stairs_view").validate({
        rules: {
            commentExteriorStairs: {
                maxlength: 5000
            },
            recommendationsExteriorStairs: {
                maxlength: 5000
            }
        },
        messages: {
            commentExteriorStairs:  " Must be less than 5000 characters.",
            recommendationsExteriorStairs: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateExteriorStairs();
        }
    });

}

function updateExteriorStairs() {
    var ext_stair_id = document.getElementById("ext_stair_id").value;
    var stairs_required = document.getElementById("stairs_required").value;
    var stairs_available = document.getElementById("stairs_available").value;
    var num_stairs = document.getElementById("num_stairs").value;
    var handrail_both_sides = document.getElementById("handrail_both_sides").value;
    var handrail_side = document.getElementById("handrail_side").value;
    var handrail_regulation_height = document.getElementById("handrail_regulation_height").value;
    var handrail_height = document.getElementById("handrail_height").value;
    var obstacles = document.getElementById("obstacles").value;
    var clearly_marked = document.getElementById("clearly_marked").value;
    var lighting = document.getElementById("lightingExteriorStairs").value;
    var lighting_option = document.getElementById("lighting_optionExteriorStairs").value;
    var lighting_type = document.getElementById("lighting_typeExteriorStairs").value;
    var comment = document.getElementById("commentExteriorStairs").value;
    var recommendations = document.getElementById("recommendationsExteriorStairs").value;
    var est_id = document.getElementById("est_idExteriorStairs").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/exterior_stairs/est/" + est_id,
        data: JSON.stringify({
            "ext_stair_id" : ext_stair_id,
            "stairs_required" : stairs_required,
            "stairs_available" : stairs_available,
            "num_stairs" : num_stairs,
            "handrail_both_sides" : handrail_both_sides,
            "handrail_side" : handrail_side,
            "handrail_regulation_height" : handrail_regulation_height,
            "handrail_height" : handrail_height,
            "obstacles" : obstacles,
            "clearly_marked" : clearly_marked,
            "lighting" : lighting,
            "lighting_option" : lighting_option,
            "lighting_type" : lighting_type,
            "comment" : comment,
            "recommendations" : recommendations
        }),
        success: function () {
            $("#success-body").html('Exterior Stairs Updated');
            $("#success").modal('toggle');
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function ExteriorRampsViewModel() {
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

    bodyHtml = '<form id="exterior_ramps_view">\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-3"><label for="ramp_required"> Ramps are required: </label> <select class="form-control" id="ramp_required" name="ramp_required" >\n';

                            if (exteriorRampsData[0].ramp_required === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].ramp_required === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="ramp_available"> Ramps are available: </label> <select class="form-control" id="ramp_available" name="ramp_available" >\n';

                            if (exteriorRampsData[0].ramp_available === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].ramp_available === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="min_widthExteriorRamps"> Ramps are at least 36 inches wide: </label> <select class="form-control" id="min_widthExteriorRamps" name="min_widthExteriorRamps" >\n';

                            if (exteriorRampsData[0].min_width === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].min_width === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="width_between_handrails"> Ramps width: </label> <input type="number" min="0" class="form-control" id="width_between_handrails" name="width_between_handrails" value="'+exteriorRampsData[0].width_between_handrails+'"></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="min_slope"> For each section of ramp, the RUNNING SLOPE is no greater than 1:12: </label> <select class="form-control" id="min_slope" name="min_slope" >\n';

                            if (exteriorRampsData[0].min_slope === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].min_slope === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="slopeExteriorRamps"> Alternatively, the slope is less than 2 percent grade (%): </label><input type="number" min="0" class="form-control" id="slopeExteriorRamps" name="slopeExteriorRamps" value="'+exteriorRampsData[0].slope+'"></div>\n'+
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="level_landing_both"> There is a level landing at the top and bottom of the ramp: </label> <select class="form-control" id="level_landing_both" name="level_landing_both" >\n';

                            if (exteriorRampsData[0].level_landing_both === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].level_landing_both === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="level_landing_location"> Landing location Top/Bottom/NA: </label><select class="form-control" id="level_landing_location" name="level_landing_location" >\n';

                            if (exteriorRampsData[0].level_landing_location === "Top") {
                                bodyHtml += '<option value="Top" selected>&nbsp; Top</option>\n' +
                                    '<option value="Bottom" >&nbsp; Bottom</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].level_landing_location === "Bottom") {
                                bodyHtml += '<option value="Top" >&nbsp; Top</option>\n' +
                                    '<option value="Bottom" selected>&nbsp; Bottom</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Top" >&nbsp; Top</option>\n' +
                                    '<option value="Bottom" >&nbsp; Bottom</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="obstaclesExteriorRamps"> Ramps are clear of obstacles or protrusions: </label><select class="form-control" id="obstaclesExteriorRamps" name="obstaclesExteriorRamps" >\n';

                            if (exteriorRampsData[0].obstacles === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].obstacles === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="handrail_both_sides"> Both sides of stairs have handrails: </label> <select class="form-control" id="handrails_both_sides" name="handrails_both_sides" >\n';

                            if (exteriorRampsData[0].handrail_sides === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].handrail_sides === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="handrail_sides"> Handrail sides Left/Right/None/NA: </label><select class="form-control" id="handrail_sides" name="handrail_sides" >\n';

                            if (exteriorRampsData[0].handrail_sides === "Left") {
                                bodyHtml += '<option value="Left" selected>&nbsp; Left</option>\n' +
                                    '<option value="Right" >&nbsp; Right</option>\n ' +
                                    '<option value="None" >&nbsp; None</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].handrail_sides === "Right") {
                                bodyHtml += '<option value="Left" >&nbsp; Left</option>\n' +
                                    '<option value="Right" selected>&nbsp; Right</option>\n ' +
                                    '<option value="None" >&nbsp; None</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].handrail_sides === "None") {
                                bodyHtml += '<option value="Left" >&nbsp; Left</option>\n' +
                                    '<option value="Right" >&nbsp; Right</option>\n ' +
                                    '<option value="None" selected>&nbsp; None</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Left" >&nbsp; Left</option>\n' +
                                    '<option value="Right" >&nbsp; Right</option>\n ' +
                                    '<option value="None" >&nbsp; None</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="handrail_regulation_heightExteriorRamps"> Top of the handrail gripping surface is between 34” and 38” above the stair surface: </label><select class="form-control" id="handrail_regulation_heightExteriorRamps" name="handrail_regulation_heightExteriorRamps" >\n';

                            if (exteriorRampsData[0].handrail_regulation_height === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].handrail_regulation_height === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="handrail_heightExteriorRamps"> Handrail height: </label><input type="number" min="0" class="form-control" id="handrail_heightExteriorRamps" name="handrail_heightExteriorRamps" value="'+exteriorRampsData[0].handrail_height+'"></div>\n' +
        '            <div class="col-4"><label for="side_guards"> Ramps have adequate side guards: </label><select class="form-control" id="side_guards" name="side_guards" >\n';

                            if (exteriorRampsData[0].side_guards === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].side_guards === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="lightingExteriorRamps"> Lighting is adequate: </label><select class="form-control" id="lightingExteriorRamps" name="lightingExteriorRamps" >\n';

                            if (exteriorRampsData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_optionExteriorRamps"> Lighting level day/night: </label><select class="form-control" id="lighting_optionExteriorRamps" name="lighting_optionExteriorRamps" >\n';

                            if (exteriorRampsData[0].lighting_option === "Day") {
                                bodyHtml += '<option value="Day" selected>&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].lighting_option === "Night") {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" selected>&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_typeExteriorRamps"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeExteriorRamps" name="lighting_typeExteriorRamps" >\n';

                            if (exteriorRampsData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (exteriorRampsData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentExteriorRamps"> Describe the route: </label><input type="text" class="form-control" id="commentExteriorRamps" name="commentExteriorRamps" value="'+exteriorRampsData[0].comment+'"></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsExteriorRamps"> Recommendations: </label><input type="text" class="form-control" id="recommendationsExteriorRamps" name="recommendationsExteriorRamps" value="'+exteriorRampsData[0].recommendations+'"></div>\n' +
        '            <input type="hidden" class="form-control" id="ext_ramp_id" value="'+exteriorRampsData[0].ext_ramp_id+'">\n' +
        '            <input type="hidden" class="form-control" id="est_idExteriorRamps" value="'+exteriorRampsData[0].est_id+'">\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_exterior_ramps" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Exterior Ramps</button>\n' +
        '            </div>\n' +
        '        </div>\n ' +
        '   </form>';

    $('#exterior_ramps_card').html(bodyHtml);

    $("#exterior_ramps_view").validate({
        rules: {
            commentExteriorRamps: {
                maxlength: 5000
            },
            recommendationsExteriorRamps: {
                maxlength: 5000
            }
        },
        messages: {
            commentExteriorRamps:  " Must be less than 5000 characters.",
            recommendationsExteriorRamps: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateExteriorRamps();
        }
    });

}

function updateExteriorRamps() {
    var ext_ramp_id = document.getElementById("ext_ramp_id").value;
    var ramp_required = document.getElementById("ramp_required").value;
    var ramp_available = document.getElementById("ramp_available").value;
    var min_width = document.getElementById("min_widthExteriorRamps").value;
    var width_between_handrails = document.getElementById("width_between_handrails").value;
    var min_slope = document.getElementById("min_slope").value;
    var slope = document.getElementById("slopeExteriorRamps").value;
    var level_landing_both = document.getElementById("level_landing_both").value;
    var level_landing_location = document.getElementById("level_landing_location").value;
    var obstacles = document.getElementById("obstaclesExteriorRamps").value;
    var handrails_both_sides = document.getElementById("handrails_both_sides").value;
    var handrail_sides = document.getElementById("handrail_sides").value;
    var handrail_regulation_height = document.getElementById("handrail_regulation_height").value;
    var handrail_height = document.getElementById("handrail_heightExteriorRamps").value;
    var side_guards = document.getElementById("side_guards").value;
    var lighting = document.getElementById("lightingExteriorRamps").value;
    var lighting_option = document.getElementById("lighting_optionExteriorRamps").value;
    var lighting_type = document.getElementById("lighting_typeExteriorRamps").value;
    var comment = document.getElementById("commentExteriorRamps").value;
    var recommendations = document.getElementById("recommendationsExteriorRamps").value;
    var est_id = document.getElementById("est_idExteriorRamps").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/exterior_ramps/est/" + est_id,
        data: JSON.stringify({
            "ext_ramp_id": ext_ramp_id,
            "ramp_required": ramp_required,
            "ramp_available": ramp_available,
            "min_width": min_width,
            "width_between_handrails": width_between_handrails,
            "min_slope": min_slope,
            "slope": slope,
            "level_landing_both": level_landing_both,
            "level_landing_location": level_landing_location,
            "obstacles": obstacles,
            "handrails_both_sides": handrails_both_sides,
            "handrail_sides": handrail_sides,
            "handrail_regulation_height": handrail_regulation_height,
            "handrail_height": handrail_height,
            "side_guards": side_guards,
            "lighting": lighting,
            "lighting_option": lighting_option,
            "lighting_type": lighting_type,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Exterior Ramps Updated');
            $("#success").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="main_entrance_view">\n ' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="total_num_public_entrances"> Total number of public entrances: </label> <input type="number" min="0" class="form-control" id="total_num_public_entrances" name="total_num_public_entrances" value="'+mainEntranceData[0].total_num_public_entrances+'"></div>\n' +
        '            <div class="col-6"><label for="main_ent_accessible"> Main entrance is accessible: </label> <select class="form-control" id="main_ent_accessible" name="main_ent_accessible" >\n';

                            if (mainEntranceData[0].main_ent_accessible === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].main_ent_accessible === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="alt_ent_accessible"> Alternative accessible entrance can be used independently during same hours: </label> <select class="form-control" id="alt_ent_accessible" name="alt_ent_accessible" >\n';

                            if (mainEntranceData[0].alt_ent_accessible === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].alt_ent_accessible === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="accessable_signage"> There is signage to direct patrons to the wheelchair accessible entrance: </label> <select class="form-control" id="accessable_signage" name="accessable_signage" >\n';

                            if (mainEntranceData[0].accessable_signage === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].accessable_signage === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="ground_level"> The ground or floor is level inside and outside the accessible entrance: </label> <select class="form-control" id="ground_level" name="ground_level" >\n';

                            if (mainEntranceData[0].ground_level === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].ground_level === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="threshold_level"> Threshold of entrance is level: </label><select class="form-control" id="threshold_level" name="threshold_level" >\n';

                            if (mainEntranceData[0].threshold_level === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].threshold_level === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="threshold_beveled"> If threshold is beveled, it is no more than 1/2 inch high with the top 1/4 inch beveled: </label> <select class="form-control" id="threshold_beveled" name="threshold_beveled" >\n';

                            if (mainEntranceData[0].threshold_beveled === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].threshold_beveled === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="beveled_height"> Height: </label><input type="number" min="0" class="form-control" id="beveled_height" name="beveled_height" value="'+mainEntranceData[0].beveled_height+'"></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="door_action"> As you enter the door opens: </label><select class="form-control" id="door_action" name="door_action" >\n';

                            if (mainEntranceData[0].door_action === "Slide To Side") {
                                bodyHtml += '<option value="Slide To Side" selected>&nbsp; Slide To Side</option>\n' +
                                    '<option value="Open Out" >&nbsp; Open Out</option>\n ' +
                                    '<option value="Open In" >&nbsp; Open In</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>';
                            }
                            else if (mainEntranceData[0].door_action === "Open Out") {
                                bodyHtml += '<option value="Slide To Side" >&nbsp; Slide To Side</option>\n' +
                                    '<option value="Open Out" selected>&nbsp; Open Out</option>\n ' +
                                    '<option value="Open In" >&nbsp; Open In</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>';
                            }
                            else if (mainEntranceData[0].door_action === "Open In") {
                                bodyHtml += '<option value="Slide To Side" >&nbsp; Slide To Side</option>\n' +
                                    '<option value="Open Out" >&nbsp; Open Out</option>\n ' +
                                    '<option value="Open In" selected>&nbsp; Open In</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>';
                            }
                            else {
                                bodyHtml += '<option value="Slide To Side" >&nbsp; Slide To Side</option>\n' +
                                    '<option value="Open Out" >&nbsp; Open Out</option>\n ' +
                                    '<option value="Open In" >&nbsp; Open In</option>\n ' +
                                    '<option value="Other" selected>&nbsp; Other</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="door_open_clearance"> Doors have at least 32” clearance when open at 90 degrees: </label> <select class="form-control" id="door_open_clearance" name="door_open_clearance" >\n';

                            if (mainEntranceData[0].door_open_clearance === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].door_open_clearance === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="opening_measurement"> Opening measurement (inches): </label><input type="number" min="0" class="form-control" id="opening_measurement" name="opening_measurement" value="'+mainEntranceData[0].opening_measurement+'"></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="door_easy_open"> Doors are easy to open: </label><select class="form-control" id="door_easy_open" name="door_easy_open" >\n';

                            if (mainEntranceData[0].door_easy_open === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].door_easy_open === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="door_open_force"> Actual lbs of force: </label><input type="number" min="0" class="form-control" id="door_open_force" name="door_open_force" value="'+mainEntranceData[0].door_open_force+'"></div>\n' +
        '            <div class="col-4"><label for="door_use_with_fist"> Door handles can be opened and shut with a closed fist: </label><select class="form-control" id="door_use_with_fist" name="door_use_with_fist" >\n';

                            if (mainEntranceData[0].door_use_with_fist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].door_use_with_fist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="door_auto_open"> Door(s) open automatically or with a push button: </label><select class="form-control" id="door_auto_open" name="door_auto_open" >\n';

                            if (mainEntranceData[0].door_auto_open === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].door_auto_open === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="second_door_inside"> There is a second door or set of doors inside the accessible entry: </label><select class="form-control" id="second_door_inside" name="second_door_inside" >\n';

                            if (mainEntranceData[0].second_door_inside === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].second_door_inside === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="min_dist_between_doors"> Distance between outer door and inner door is at least 48” plus door clearance(s): </label><select class="form-control" id="min_dist_between_doors" name="min_dist_between_doors" >\n';

                            if (mainEntranceData[0].min_dist_between_doors === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].min_dist_between_doors === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="lightingMainEntrance"> Lighting is adequate: </label><select class="form-control" id="lightingMainEntrance" name="lightingMainEntrance" >\n';

                            if (mainEntranceData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_optionMainEntrance"> Lighting level day/night: </label><select class="form-control" id="lighting_optionMainEntrance" name="lighting_optionMainEntrance" >\n';

                            if (mainEntranceData[0].lighting_option === "Day") {
                                bodyHtml += '<option value="Day" selected>&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].lighting_option === "Night") {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" selected>&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_typeMainEntrance"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeMainEntrance" name="lighting_typeMainEntrance" >\n';

                            if (mainEntranceData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (mainEntranceData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentMainEntrance"> Describe accessible entrance: </label><input type="text" class="form-control" id="commentMainEntrance" name="commentMainEntrance" value="'+mainEntranceData[0].comment+'"></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsMainEntrance"> Recommendations: </label><input type="text" class="form-control" id="recommendationsMainEntrance" name="recommendationsMainEntrance" value="'+mainEntranceData[0].recommendations+'"></div>\n' +
        '            <input type="hidden" class="form-control" id="main_ent_id" value="'+mainEntranceData[0].main_ent_id+'">\n' +
        '            <input type="hidden" class="form-control" id="est_idMainEntrance" value="'+mainEntranceData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_main_entrance" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Main Entrance</button>\n' +
        '            </div>\n' +
        '        </div>\n ' +
        '   </form>';

    $('#main_entrance_card').html(bodyHtml);

    $("#main_entrance_view").validate({
        rules: {
            commentMainEntrance: {
                maxlength: 5000
            },
            recommendationsMainEntrance: {
                maxlength: 5000
            }
        },
        messages: {
            commentMainEntrance:  " Must be less than 5000 characters.",
            recommendationsMainEntrance: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateMainEntrance();
        }
    });
}

function updateMainEntrance() {
    var main_ent_id = document.getElementById("main_ent_id").value;
    var total_num_public_entrances = document.getElementById("total_num_public_entrances").value;
    var main_ent_accessible = document.getElementById("main_ent_accessible").value;
    var alt_ent_accessible = document.getElementById("alt_ent_accessible").value;
    var accessable_signage = document.getElementById("accessable_signage").value;
    var ground_level = document.getElementById("ground_level").value;
    var threshold_level = document.getElementById("threshold_level").value;
    var threshold_beveled = document.getElementById("threshold_beveled").value;
    var beveled_height = document.getElementById("beveled_height").value;
    var door_action = document.getElementById("door_action").value;
    var door_open_clearance = document.getElementById("door_open_clearance").value;
    var opening_measurement = document.getElementById("opening_measurement").value;
    var door_easy_open = document.getElementById("door_easy_open").value;
    var door_open_force = document.getElementById("door_open_force").value;
    var door_use_with_fist = document.getElementById("door_use_with_fist").value;
    var door_auto_open = document.getElementById("door_auto_open").value;
    var second_door_inside = document.getElementById("second_door_inside").value;
    var min_dist_between_doors = document.getElementById("min_dist_between_doors").value;
    var lighting = document.getElementById("lightingMainEntrance").value;
    var lighting_option = document.getElementById("lighting_optionMainEntrance").value;
    var lighting_type = document.getElementById("lighting_typeMainEntrance").value;
    var comment = document.getElementById("commentMainEntrance").value;
    var recommendations = document.getElementById("recommendationsMainEntrance").value;
    var est_id = document.getElementById("est_idMainEntrance").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/main_entrance/est/" + est_id,
        data: JSON.stringify({
            "main_ent_id": main_ent_id,
            "total_num_public_entrances": total_num_public_entrances,
            "main_ent_accessible": main_ent_accessible,
            "alt_ent_accessible": alt_ent_accessible,
            "accessable_signage": accessable_signage,
            "ground_level": ground_level,
            "threshold_level": threshold_level,
            "threshold_beveled": threshold_beveled,
            "beveled_height": beveled_height,
            "door_action": door_action,
            "door_open_clearance": door_open_clearance,
            "opening_measurement": opening_measurement,
            "door_easy_open": door_easy_open,
            "door_open_force": door_open_force,
            "door_use_with_fist": door_use_with_fist,
            "door_auto_open": door_auto_open,
            "second_door_inside": second_door_inside,
            "min_dist_between_doors": min_dist_between_doors,
            "lighting": lighting,
            "lighting_option": lighting_option,
            "lighting_type": lighting_type,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Exterior Main Entrance Updated');
            $("#success").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function InteriorViewModel() {
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

    bodyHtml = '<form id="interior_view">\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="int_door_open_clearance"> Doors have at least 32” clearance when open at 90 degrees: </label> <select class="form-control" id="int_door_open_clearance" name="int_door_open_clearance" >\n';

                            if (interiorData[0].int_door_open_clearance === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].int_door_open_clearance === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="int_opening_measurement"> Opening measurement (inches): </label> <input type="number" min="0" class="form-control" id="int_opening_measurement" name="int_opening_measurement" value="'+interiorData[0].int_opening_measurement+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="int_door_easy_open"> Doors are easy to open: </label> <select class="form-control" id="int_door_easy_open" >\n';

                            if (interiorData[0].int_door_easy_open === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].int_door_easy_open === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="int_door_open_force"> Actual lbs of force: </label> <input type="number" min="0" class="form-control" id="int_door_open_force" name="int_door_open_force" value="'+interiorData[0].int_door_open_force+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="int_door_use_with_fist"> Door handles can be opened and shut with a closed fist, open automatically, or push button: </label> <select class="form-control" id="int_door_use_with_fist" name="int_door_use_with_fist" >\n';

                            if (interiorData[0].int_door_use_with_fist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].int_door_use_with_fist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="five_second_close"> Doors take 5 seconds or longer to close: </label><select class="form-control" id="five_second_close" name="five_second_close" >\n';

                            if (interiorData[0].five_second_close === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].five_second_close === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="hallway_width"> Hallways and ​aisles are min. 36” WIDE, or not less than 28” for 4 foot intervals: </label> <select class="form-control" id="hallway_width" name="hallway_width" >\n';

                            if (interiorData[0].hallway_width === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].hallway_width === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="narrowest_width"> Narrowest width (inches): </label><input type="number" min="0" class="form-control" id="narrowest_width" id="narrowest_width" value="'+interiorData[0].narrowest_width+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="wheelchair_turnaround"> There are locations that allow 60” space for a wheelchair to turn around: </label><select class="form-control" id="wheelchair_turnaround" name="wheelchair_turnaround" >\n';

                            if (interiorData[0].wheelchair_turnaround === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].wheelchair_turnaround === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="hallway_obstacles"> Hallways and aisles are clear of obstacles and tripping hazards: </label> <select class="form-control" id="hallway_obstacles"  name="hallway_obstacles"  >\n';

                            if (interiorData[0].hallway_obstacles === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].hallway_obstacles === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="hallway_clear"> Hallways are clear of objects protruding more than 4” or lower than 80”: </label><select class="form-control" id="hallway_clear" name="hallway_clear" >\n';

                            if (interiorData[0].hallway_clear === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].hallway_clear === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="lightingInterior"> Lighting is adequate: </label><select class="form-control" id="lightingInterior" name="lightingInterior" >\n';

                            if (interiorData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="lighting_typeInterior"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeInterior" name="lighting_typeInterior" >\n';

                            if (interiorData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="service_counter"> Lowest ​service counter is no higher than 38” ​with a clear view from a sitting position, and a check writing surface is no higher than 34”: </label><select class="form-control" id="service_counter" name="service_counter" >\n';

                            if (interiorData[0].service_counter === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].service_counter === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="counter_height"> Service counter height (inches): </label><input type="number" min="0" class="form-control" id="counter_height" name="counter_height" value="'+interiorData[0].counter_height+'" ></div>\n' +
        '            <div class="col-3"><label for="writing_surface_height"> Writing surface height (inches): </label><input type="number" min="0" class="form-control" id="writing_surface_height" name="writing_surface_height" value="'+interiorData[0].writing_surface_height_id+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="drinking_fountain"> Accessible drinking fountain with spout no higher than 36”, and easy to operate controls: </label><select class="form-control" id="drinking_fountain" name="drinking_fountain" >\n';

                            if (interiorData[0].drinking_fountain === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (interiorData[0].drinking_fountain === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentInterior"> Describe accessible entrance: </label><input type="text" class="form-control" id="commentInterior" name="commentInterior" value="'+interiorData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsInterior"> Recommendations: </label><input type="text" class="form-control" id="recommendationsInterior" name="recommendationsInterior" value="'+interiorData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="interior_id" value="'+interiorData[0].interior_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idInterior" value="'+interiorData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_interior" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Interior</button>\n' +
        '            </div>\n' +
        '        </div>\n ' +
        '   </form>';

    $('#interior_card').html(bodyHtml);

    $("#interior_view").validate({
        rules: {
            commentInterior: {
                maxlength: 5000
            },
            recommendationsInterior: {
                maxlength: 5000
            }
        },
        messages: {
            commentInterior:  " Must be less than 5000 characters.",
            recommendationsInterior: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateInterior();
        }
    });

}

function updateInterior() {
    var interior_id = document.getElementById("interior_id").value;
    var int_door_open_clearance = document.getElementById("int_door_open_clearance").value;
    var int_opening_measurement = document.getElementById("int_opening_measurement").value;
    var int_door_easy_open = document.getElementById("int_door_easy_open").value;
    var int_door_open_force = document.getElementById("int_door_open_force").value;
    var int_door_use_with_fist = document.getElementById("int_door_use_with_fist").value;
    var five_second_close = document.getElementById("five_second_close").value;
    var hallway_width = document.getElementById("hallway_width").value;
    var narrowest_width = document.getElementById("narrowest_width").value;
    var wheelchair_turnaround = document.getElementById("wheelchair_turnaround").value;
    var hallway_obstacles = document.getElementById("hallway_obstacles").value;
    var hallway_clear = document.getElementById("hallway_clear").value;
    var lighting = document.getElementById("lightingInterior").value;
    var lighting_type = document.getElementById("lighting_typeInterior").value;
    var service_counter = document.getElementById("service_counter").value;
    var counter_height = document.getElementById("counter_height").value;
    var writing_surface_height = document.getElementById("writing_surface_height").value;
    var drinking_fountain = document.getElementById("drinking_fountain").value;
    var comment = document.getElementById("commentInterior").value;
    var recommendations = document.getElementById("recommendationsInterior").value;
    var est_id = document.getElementById("est_idInterior").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/interior/est/" + est_id,
        data: JSON.stringify({
            "interior_id": interior_id,
            "int_door_open_clearance": int_door_open_clearance,
            "int_opening_measurement": int_opening_measurement,
            "int_door_easy_open": int_door_easy_open,
            "int_door_open_force": int_door_open_force,
            "int_door_use_with_fist": int_door_use_with_fist,
            "five_second_close": five_second_close,
            "hallway_width": hallway_width,
            "narrowest_width": narrowest_width,
            "wheelchair_turnaround": wheelchair_turnaround,
            "hallway_obstacles": hallway_obstacles,
            "hallway_clear": hallway_clear,
            "lighting": lighting,
            "lighting_type": lighting_type,
            "service_counter": service_counter,
            "counter_height": counter_height,
            "writing_surface_height": writing_surface_height,
            "drinking_fountain": drinking_fountain,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Interior Updated');
            $("#success").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="elevator_view">\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-3"><label for="is_elevator"> Is there ​at least one elevator ​or lift: </label> <select class="form-control" id="is_elevator" name="is_elevator" >\n';

                            if (elevatorData[0].is_elevator === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].is_elevator === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-9"><label for="location"> Where is nearest elevator or lift located in relation to the accessible entrance: </label> <input type="text" class="form-control" id="location" name="location"  value="'+elevatorData[0].location+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="works"> The elevator or lift works properly: </label> <select class="form-control" id="works" >\n';

                            if (elevatorData[0].works === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].works === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="no_assist"> Users can operate elevator or lift without having to find someone to assist or provide a key: </label> <select class="form-control" id="no_assist" name="no_assist" >\n';

                            if (elevatorData[0].no_assist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].no_assist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-3"><label for="button_height"> Buttons are no higher than 48” and no lower than 15”: </label> <select class="form-control" id="button_height" name="button_height" >\n';

                            if (elevatorData[0].button_height === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].button_height === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="outside_btn_height"> Outside button height (inches): </label><input type="number" min="0" class="form-control" id="outside_btn_height" name="outside_btn_height" value="'+elevatorData[0].outside_btn_height+'" ></div>\n' +
        '            <div class="col-3"><label for="inside_btn_height"> Inside button height (inches): </label> <input type="number" min="0" class="form-control" id="inside_btn_height" name="inside_btn_height"  value="'+elevatorData[0].inside_btn_height+'" ></div>\n' +
        '            <div class="col-3"><label for="button_use_fist"> Buttons are easy to press with closed fist: </label><select class="form-control" id="button_use_fist" name="button_use_fist" >\n';

                            if (elevatorData[0].button_use_fist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].button_use_fist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="braille"> Buttons ​and signs ​have braille markings ​and raised letters/numbers: </label><select class="form-control" id="braille" name="braille" >\n';

                            if (elevatorData[0].braille === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].braille === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="audible_tones"> Elevator or lift uses ​audible tones as well as visible signals : </label> <select class="form-control" id="audible_tones" name="audible_tones" >\n';

                            if (elevatorData[0].audible_tones === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].audible_tones === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="lightingElevator"> Lighting is adequate: </label><select class="form-control" id="lightingElevator" name="lightingElevator" >\n';

                            if (elevatorData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="lighting_typeElevator"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeElevator" name="lighting_typeElevator" >\n';

                            if (elevatorData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="elevator_depth"> Elevator interior is at least 54” DEEP ​ ​from door to the back : </label><select class="form-control" id="elevator_depth" name="elevator_depth" >\n';

                            if (elevatorData[0].elevator_depth === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (elevatorData[0].elevator_depth === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentElevator"> Describe accessible entrance: </label><input type="text" class="form-control" id="commentElevator" name="commentElevator" value="'+elevatorData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsElevator"> Recommendations: </label><input type="text" class="form-control" id="recommendationsElevator" name="recommendationsElevator" value="'+elevatorData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="elevator_id" value="'+elevatorData[0].elevator_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idElevator" value="'+elevatorData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_elevator" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Elevator</button>\n' +
        '            </div>\n' +
        '        </div>\n ' +
        '   </form>';

    $('#elevator_card').html(bodyHtml);

    $("#elevator_view").validate({
        rules: {
            location: {
                maxlength: 500
            },
            commentElevator: {
                maxlength: 5000
            },
            recommendationsElevator: {
                maxlength: 5000
            }
        },
        messages: {
            location:  " Must be less than 500 characters.",
            commentElevator:  " Must be less than 5000 characters.",
            recommendationsElevator: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateElevator();
        }
    });

}

function updateElevator() {
    var elevator_id = document.getElementById("elevator_id").value;
    var is_elevator = document.getElementById("is_elevator").value;
    var location = document.getElementById("location").value;
    var works = document.getElementById("works").value;
    var no_assist = document.getElementById("no_assist").value;
    var button_height = document.getElementById("button_height").value;
    var outside_btn_height = document.getElementById("outside_btn_height").value;
    var inside_btn_height = document.getElementById("inside_btn_height").value;
    var button_use_fist = document.getElementById("button_use_fist").value;
    var braille = document.getElementById("braille").value;
    var audible_tones = document.getElementById("audible_tones").value;
    var lighting = document.getElementById("lightingElevator").value;
    var lighting_type = document.getElementById("lighting_typeElevator").value;
    var elevator_depth = document.getElementById("elevator_depth").value;
    var comment = document.getElementById("commentElevator").value;
    var recommendations = document.getElementById("recommendationsElevator").value;
    var est_id = document.getElementById("est_idElevator").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/elevator/est/" + est_id,
        data: JSON.stringify({
            "elevator_id": elevator_id,
            "is_elevator": is_elevator,
            "location": location,
            "works": works,
            "no_assist": no_assist,
            "button_height": button_height,
            "outside_btn_height": outside_btn_height,
            "inside_btn_height": inside_btn_height,
            "button_use_fist": button_use_fist,
            "braille": braille,
            "audible_tones": audible_tones,
            "lighting": lighting,
            "lighting_type": lighting_type,
            "elevator_depth": elevator_depth,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Elevator Updated');
            $("#success").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="signage_view">\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="is_directory"> There is a directory at all accessible entrances to help visitors to find their way: </label> <select class="form-control" id="is_directory" name="is_directory" >\n';

                            if (signageData[0].is_directory === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].is_directory === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="door_signs"> Door signs are on latch side of door, between 48” and 60” from floor: </label> <select class="form-control" id="door_signs" name="door_signs" >\n';

                            if (signageData[0].door_signs === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].door_signs === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="sign_height"> Height of signs (inches): </label> <input type="number" min="0" class="form-control" id="sign_height" name="sign_height"  value="'+signageData[0].sign_height+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="pub_sign_braile"> Public signs have Braille: </label> <select class="form-control" id="pub_sign_braile" name="pub_sign_braile" >\n';

                            if (signageData[0].pub_sign_braile === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].pub_sign_braile === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="sign_high_contrast"> Signs have raised, high contrast lettering, ​low glare background: </label> <select class="form-control" id="sign_high_contrast" name="sign_high_contrast" >\n';

                            if (signageData[0].sign_high_contrast === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].sign_high_contrast === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="sign_images"> Signs include images, illustrations, or icons: </label><select class="form-control" id="sign_images" name="sign_images" >\n';

                            if (signageData[0].sign_images === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].sign_images === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="written_material_images"> Written material (menus, etc.) includes images or illustrations: </label> <select class="form-control" id="written_material_images" name="written_material_images" >\n';

                            if (signageData[0].written_material_images === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].written_material_images === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="menu_access"> There is a large print menu, Braille menu, and/ or on­line accessible menu: </label><select class="form-control" id="menu_access" name="menu_access" >\n';

                            if (signageData[0].written_material_images === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].written_material_images === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="alt_info"> Information is available in alternative formats: </label><select class="form-control" id="alt_info" name="alt_info" >\n';

                            if (signageData[0].alt_info === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].alt_info === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="alt_info_type"> Type of alternative format Braille/Large Print/Recorded Audio/Video/NA: </label> <select class="form-control" id="alt_info_type" name="alt_info_type" >\n';

                            if (signageData[0].alt_info_type === "Braille") {
                                bodyHtml += '<option value="Braille" selected>&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" >&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" >&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" >&nbsp; Video</option>' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].alt_info_type === "Large Print") {
                                bodyHtml += '<option value="Braille" >&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" selected>&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" >&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" >&nbsp; Video</option>' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].alt_info_type === "Recorded audio") {
                                bodyHtml += '<option value="Braille" >&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" >&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" selected>&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" >&nbsp; Video</option>' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (signageData[0].alt_info_type === "Video") {
                                bodyHtml += '<option value="Braille" >&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" >&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" >&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" selected>&nbsp; Video</option>' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else  {
                                bodyHtml += '<option value="Braille" >&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" >&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" >&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" >&nbsp; Video</option>' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentSignage"> Comments: </label><input type="text" class="form-control" id="commentSignage" name="commentSignage" value="'+signageData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsSignage"> Recommendations: </label><input type="text" class="form-control" id="recommendationsSignage" name="recommendationsSignage" value="'+signageData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="sign_id" value="'+signageData[0].sign_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idSignage" value="'+signageData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_signage" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Signage</button>\n' +
        '            </div>\n' +
        '        </div>'+
        '   </form>';

    $('#signage_card').html(bodyHtml);

    $("#signage_view").validate({
        rules: {
            commentSignage: {
                maxlength: 5000
            },
            recommendationsSignage: {
                maxlength: 5000
            }
        },
        messages: {
            commentSignage:  " Must be less than 5000 characters.",
            recommendationsSignage: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateSignage();
        }
    });

}

function updateSignage() {
    var sign_id = document.getElementById("sign_id").value;
    var is_directory = document.getElementById("is_directory").value;
    var door_signs = document.getElementById("door_signs").value;
    var sign_height = document.getElementById("sign_height").value;
    var pub_sign_braile = document.getElementById("pub_sign_braile").value;
    var sign_high_contrast = document.getElementById("sign_high_contrast").value;
    var sign_images = document.getElementById("sign_images").value;
    var written_material_images = document.getElementById("written_material_images").value;
    var menu_access = document.getElementById("menu_access").value;
    var alt_info = document.getElementById("alt_info").value;
    var alt_info_type = document.getElementById("alt_info_type").value;
    var comment = document.getElementById("commentSignage").value;
    var recommendations = document.getElementById("recommendationsSignage").value;
    var est_id = document.getElementById("est_idSignage").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/signage/est/" + est_id,
        data: JSON.stringify({
            "sign_id": sign_id,
            "is_directory": is_directory,
            "door_signs": door_signs,
            "sign_height": sign_height,
            "pub_sign_braile": pub_sign_braile,
            "sign_high_contrast": sign_high_contrast,
            "sign_images": sign_images,
            "written_material_images": written_material_images,
            "menu_access": menu_access,
            "alt_info": alt_info,
            "alt_info_type": alt_info_type,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Signage Updated');
            $("#success").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="emergency_preparedness_view">\n ' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="evac_info"> Evacuation and safety information is available in a visible location: </label> <select class="form-control" id="evac_info" name="evac_info" >\n';

                            if (emergencyPreparednessData[0].evac_info === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].evac_info === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="alt_evac_info"> Evacuation and safety information is available in alternative format: </label> <select class="form-control" id="alt_evac_info" name="alt_evac_info" >\n';

                            if (emergencyPreparednessData[0].alt_evac_info === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].alt_evac_info === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="evac_info_format"> Type of alternative format Braille/Large print/Recorded audio/Video: </label> <select class="form-control" id="evac_info_format" name="evac_info_format" >\n';

                            if (emergencyPreparednessData[0].evac_info_format === "Braille") {
                                bodyHtml += '<option value="Braille" selected>&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" >&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" >&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" >&nbsp; Video</option>' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].evac_info_format === "Large Print") {
                                bodyHtml += '<option value="Braille" >&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" selected>&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" >&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" >&nbsp; Video</option>' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].evac_info_format === "Recorded audio") {
                                bodyHtml += '<option value="Braille" >&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" >&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" selected>&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" >&nbsp; Video</option>' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].evac_info_format === "Video") {
                                bodyHtml += '<option value="Braille" >&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" >&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" >&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" selected>&nbsp; Video</option>' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else  {
                                bodyHtml += '<option value="Braille" >&nbsp; Braille</option>\n' +
                                    '<option value="Large Print" >&nbsp; Large Print</option>\n ' +
                                    '<option value="Recorded Audio" >&nbsp; Recorded Audio</option>\n ' +
                                    '<option value="Video" >&nbsp; Video</option>' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="alarms"> Emergency alarms both audible and visible: </label> <select class="form-control" id="alarms" name="alarms" >\n';

                            if (emergencyPreparednessData[0].alarms === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].alarms === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="location_no_flash"> There is an emergency location available where there are no flashing alarms: </label> <select class="form-control" id="location_no_flash" name="location_no_flash" >\n';

                            if (emergencyPreparednessData[0].location_no_flash === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].location_no_flash === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="shelter"> There is an area of refuge, shelter in place during emergencies: </label><select class="form-control" id="shelter" name="shelter" >\n';

                            if (emergencyPreparednessData[0].shelter === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].shelter === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="signs_to_exit"> Signs direct patrons to exits, safety zone, fire extinguishers and alarm pull boxes: </label> <select class="form-control" id="signs_to_exit" name="signs_to_exit" >\n';

                            if (emergencyPreparednessData[0].signs_to_exit === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].signs_to_exit === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="wheelchair_plan"> There is a plan for evacuating persons using wheelchairs in case elevators are inoperable: </label><select class="form-control" id="wheelchair_plan" name="wheelchair_plan" >\n';

                            if (emergencyPreparednessData[0].wheelchair_plan === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].wheelchair_plan === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="floor_plan_routes"> Posted floor plans show emergency routes, and locations of fire extinguishers and alarm pull boxes: </label><select class="form-control" id="floor_plan_routes" name="floor_plan_routes" >\n';

                            if (emergencyPreparednessData[0].floor_plan_routes === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].floor_plan_routes === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="fire_alarm_height"> Fire alarms pull boxes are no higher than 48”: </label> <select class="form-control" id="fire_alarm_height" name="fire_alarm_height" >\n';

                            if (emergencyPreparednessData[0].fire_alarm_height === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].fire_alarm_height === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="fire_extinguisher_height"> Fire extinguishers are mounted with bottom no higher than 48”: </label> <select class="form-control" id="fire_extinguisher_height" name="fire_extinguisher_height"  >\n';

                            if (emergencyPreparednessData[0].fire_extinguisher_height === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (emergencyPreparednessData[0].fire_extinguisher_height === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentEmergency_Preparedness"> Comments: </label><input type="text" class="form-control" id="commentEmergency_Preparedness" name="commentEmergency_Preparedness" value="'+emergencyPreparednessData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsEmergency_Preparedness"> Recommendations: </label><input type="text" class="form-control" id="recommendationsEmergency_Preparedness" name="recommendationsEmergency_Preparedness" value="'+emergencyPreparednessData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="emergency_id" value="'+emergencyPreparednessData[0].emergency_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idEmergency_Preparedness" value="'+emergencyPreparednessData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_emergency_preparedness" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Emergency Preparedness</button>\n' +
        '            </div>\n' +
        '        </div>' +
        '   </form>';

    $('#emergency_preparedness_card').html(bodyHtml);

    $("#emergency_preparedness_view").validate({
        rules: {
            commentEmergency_Preparedness: {
                maxlength: 5000
            },
            recommendationsEmergency_Preparedness: {
                maxlength: 5000
            }
        },
        messages: {
            commentEmergency_Preparedness:  " Must be less than 5000 characters.",
            recommendationsEmergency_Preparedness: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateEmergencyPreparedness();
        }
    });
}

function updateEmergencyPreparedness() {
    var emergency_id = document.getElementById("emergency_id").value;
    var evac_info = document.getElementById("evac_info").value;
    var alt_evac_info = document.getElementById("alt_evac_info").value;
    var evac_info_format = document.getElementById("evac_info_format").value;
    var alarms = document.getElementById("alarms").value;
    var location_no_flash = document.getElementById("location_no_flash").value;
    var shelter = document.getElementById("shelter").value;
    var signs_to_exit = document.getElementById("signs_to_exit").value;
    var wheelchair_plan = document.getElementById("wheelchair_plan").value;
    var floor_plan_routes = document.getElementById("floor_plan_routes").value;
    var fire_alarm_height = document.getElementById("fire_alarm_height").value;
    var fire_extinguisher_height = document.getElementById("fire_extinguisher_height").value;
    var comment = document.getElementById("commentEmergency_Preparedness").value;
    var recommendations = document.getElementById("recommendationsEmergency_Preparedness").value;
    var est_id = document.getElementById("est_idEmergency_Preparedness").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/emergency/est/" + est_id,
        data: JSON.stringify({
            "emergency_id": emergency_id,
            "evac_info": evac_info,
            "alt_evac_info": alt_evac_info,
            "evac_info_format": evac_info_format,
            "alarms": alarms,
            "location_no_flash": location_no_flash,
            "shelter": shelter,
            "signs_to_exit": signs_to_exit,
            "wheelchair_plan": wheelchair_plan,
            "floor_plan_routes": floor_plan_routes,
            "fire_alarm_height": fire_alarm_height,
            "fire_extinguisher_height": fire_extinguisher_height,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Emergency Preparedness Updated');
            $("#success").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="seating_view">\n ' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="seating_no_step"> One or more seating areas in the common area can be accessed without steps: </label> <select class="form-control" id="seating_no_step" name="seating_no_step" >\n';

                            if (seatingData[0].seating_no_step === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].seating_no_step === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="table_aisles"> Customers can maneuver between tables without bumping into chairs (36” aisles)​: </label> <select class="form-control" id="table_aisles" name="table_aisles" >\n';

                            if (seatingData[0].table_aisles === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].table_aisles === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="legroom"> There are tables with ​legroom for wheelchair users (bottom of table = 27 ​ to 34”): </label> <select class="form-control" id="legroom" name="legroom" >\n';

                            if (seatingData[0].legroom === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].legroom === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="num_legroom"> Number of tables with legroom #/All: </label> <input type="text" class="form-control" id="num_legroom" value="'+seatingData[0].num_legroom+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="rearranged"> There are tables and chairs that can be moved or rearranged: </label> <select class="form-control" id="rearranged" name="rearranged" >\n';

                            if (seatingData[0].rearranged === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].rearranged === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="num_table_rearranged"> Number of tables that can be moved #/All: </label><input type="text" class="form-control" id="num_table_rearranged" name="num_table_rearranged" value="'+seatingData[0].num_table_rearranged+'" ></div>\n' +
        '            <div class="col-4"><label for="num_chair_rearranged"> Number of chairs that can be moved #/All: </label><input type="text" class="form-control" id="num_chair_rearranged" name="num_chair_rearranged" value="'+seatingData[0].num_chair_rearranged+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="round_tables"> There are round or oval tables that can seat 5­9 individuals: </label> <select class="form-control" id="round_tables" name="round_tables" >\n';

                            if (seatingData[0].round_tables === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].round_tables === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="num_round_tables"> Number of round/oval tables: </label><input type="number" min="0" class="form-control" id="num_round_tables" name="num_round_tables" value="'+seatingData[0].num_round_tables+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="lightingSeating"> Lighting is adequate: </label><select class="form-control" id="lightingSeating" name="lightingSeating" >\n';

                            if (seatingData[0].lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_optionSeating"> Lighting level day/night: </label><select class="form-control" id="lighting_optionSeating" name="lighting_optionSeating" >\n';

                            if (seatingData[0].lighting_option === "Day") {
                                bodyHtml += '<option value="Day" selected>&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].lighting_option === "Night") {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" selected>&nbsp; Night</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Day" >&nbsp; Day</option>\n' +
                                    '<option value="Night" >&nbsp; Night</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="lighting_typeSeating"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeSeating" name="lighting_typeSeating" >\n';

                            if (seatingData[0].lighting_type === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].lighting_type === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].lighting_type === "Bright") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="Bright" >&nbsp; Bright</option>\n' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="adjustable_lighting"> There are one or more available spaces with adjustable lighting: </label><select class="form-control" id="adjustable_lighting" name="adjustable_lighting" >\n';

                            if (seatingData[0].adjustable_lighting === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].adjustable_lighting === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="low_visual_slim"> There are one or more areas with low visual stimulation: </label> <select class="form-control" id="low_visual_slim" name="low_visual_slim" >\n';

                            if (seatingData[0].low_visual_slim === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].low_visual_slim === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="quiet_table"> There is a quiet table, room or area available on request: </label><select class="form-control" id="quiet_table" id="quiet_table" >\n';

                            if (seatingData[0].quiet_table === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].quiet_table === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="low_sound"> There is an area with low or no background sound, and/or that has sound­absorbing surfaces: </label> <select class="form-control" id="low_sound" name="low_sound" >\n';

                            if (seatingData[0].low_sound === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].low_sound === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="designated_space"> For theater or auditorium, there are spaces designated for wheelchair users that have the same general views as the rest of the audience when the person is seated: </label><select class="form-control" id="designated_space" name="designated_space" >\n';

                            if (seatingData[0].designated_space === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].designated_space === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="num_desig_space"> Number of designated spaces: </label> <input type="number" min="0" class="form-control" id="num_desig_space" name="num_desig_space" value="'+seatingData[0].num_desig_space+'" ></div>\n' +
        '            <div class="col-4"><label for="companion_space"> There are spaces for companions to sit next to the wheelchair users: </label> <select class="form-control" id="companion_space" name="companion_space" >\n';

                            if (seatingData[0].companion_space === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (seatingData[0].companion_space === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentSeating"> Comments: </label><input type="text" class="form-control" id="commentSeating" name="commentSeating" value="'+seatingData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsSeating"> Recommendations: </label><input type="text" class="form-control" id="recommendationsSeating" name="recommendationsSeating" value="'+seatingData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="seating_id" value="'+seatingData[0].est_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idSeating" value="'+seatingData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_seating" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Seating</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '   </form>';

    $('#seating_card').html(bodyHtml);

    $("#seating_view").validate({
        rules: {
            commentSeating: {
                maxlength: 5000
            },
            recommendationsSeating: {
                maxlength: 5000
            }
        },
        messages: {
            commentSeating:  " Must be less than 5000 characters.",
            recommendationsSeating: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateSeating();
        }
    });
}

function updateSeating() {
    var seating_id = document.getElementById("seating_id").value;
    var seating_no_step = document.getElementById("seating_no_step").value;
    var table_aisles = document.getElementById("table_aisles").value;
    var legroom = document.getElementById("legroom").value;
    var num_legroom = document.getElementById("num_legroom").value;
    var rearranged = document.getElementById("rearranged").value;
    var num_table_rearranged = document.getElementById("num_table_rearranged").value;
    var num_chair_rearranged = document.getElementById("num_chair_rearranged").value;
    var round_tables = document.getElementById("round_tables").value;
    var num_round_tables = document.getElementById("num_round_tables").value;
    var lighting = document.getElementById("lightingSeating").value;
    var lighting_option = document.getElementById("lighting_optionSeating").value;
    var lighting_type = document.getElementById("lighting_typeSeating").value;
    var adjustable_lighting = document.getElementById("adjustable_lighting").value;
    var low_visual_slim = document.getElementById("low_visual_slim").value;
    var quiet_table = document.getElementById("quiet_table").value;
    var low_sound = document.getElementById("low_sound").value;
    var designated_space = document.getElementById("designated_space").value;
    var num_desig_space = document.getElementById("num_desig_space").value;
    var companion_space = document.getElementById("companion_space").value;
    var comment = document.getElementById("commentSeating").value;
    var recommendations = document.getElementById("recommendationsSeating").value;
    var est_id = document.getElementById("est_idSeating").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/seating/est/" + est_id,
        data: JSON.stringify({
            "seating_id": seating_id,
            "seating_no_step": seating_no_step,
            "table_aisles": table_aisles,
            "legroom": legroom,
            "num_legroom": num_legroom,
            "rearranged": rearranged,
            "num_table_rearranged": num_table_rearranged,
            "num_chair_rearranged": num_chair_rearranged,
            "round_tables": round_tables,
            "num_round_tables": num_round_tables,
            "lighting": lighting,
            "lighting_option": lighting_option,
            "lighting_type": lighting_type,
            "adjustable_lighting": adjustable_lighting,
            "low_visual_slim": low_visual_slim,
            "quiet_table": quiet_table,
            "low_sound": low_sound,
            "designated_space": designated_space,
            "num_desig_space": num_desig_space,
            "companion_space": companion_space,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Seating Updated');
            $("#success").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = '<form id="restroom_view">\n ' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="public_restroom"> Public restrooms ​are available near or ​at the location: </label> <select class="form-control" id="public_restroom" name="public_restroom" >\n';

                            if (restroomData[0].public_restroom === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomData[0].public_restroom === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="total_num"> Total number of public restrooms: </label> <input type="number" min="0" class="form-control" id="total_num" name="total_num"  value="'+restroomData[0].total_num+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="designated_number"> Number of accessible restrooms designated “family”, “unisex”, or “assisted use”: </label> <input type="number" min="0" class="form-control" id="designated_number" name="designated_number" value="'+restroomData[0].designated_number+'" ></div>\n' +
        '            <div class="col-6"><label for="num_wheelchair_sign"> Number of restrooms that have “Wheelchair Accessible” signs: </label> <input type="number" min="0" class="form-control" id="num_wheelchair_sign" name="num_wheelchair_sign" value="'+restroomData[0].num_wheelchair_sign+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="sign_accessable"> Restrooms signs have high contrast, Braille, raised lettering, low glare background: </label> <select class="form-control" id="sign_accessable" name="sign_accessable" >\n';

                            if (restroomData[0].sign_accessable === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomData[0].sign_accessable === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="sign_location"> Signage is on latch side of door between 48” and 60” above floor: </label><select class="form-control" id="sign_location" name="sign_location" >\n';

                            if (restroomData[0].sign_location === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomData[0].sign_location === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="key_needed"> Users do not need to ask someone for a KEY to use the restroom: </label><select class="form-control" id="key_needed" name="key_needed" >\n';

                            if (restroomData[0].key_needed === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomData[0].key_needed === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentRestroom"> Describe the restroom(s): </label><input type="text" class="form-control" id="commentRestroom" name="commentRestroom" value="'+restroomData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsRestroom"> Recommendations: </label><input type="text" class="form-control" id="recommendationsRestroom" name="recommendationsRestroom" value="'+restroomData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="restroom_id" value="'+restroomData[0].restroom_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idRestroom" value="'+restroomData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_restroom" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Restroom</button>\n' +
        '            </div>\n' +
        '        </div>\n'+
        '   </form>';

    $('#restroom_card').html(bodyHtml);

    $("#restroom_view").validate({
        rules: {
            commentRestroom: {
                maxlength: 5000
            },
            recommendationsRestroom: {
                maxlength: 5000
            }
        },
        messages: {
            commentRestroom:  " Must be less than 5000 characters.",
            recommendationsRestroom: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateRestroom();
        }
    });

}

function updateRestroom() {
    var restroom_id = document.getElementById("restroom_id").value;
    var public_restroom = document.getElementById("public_restroom").value;
    var total_num = document.getElementById("total_num").value;
    var designated_number = document.getElementById("designated_number").value;
    var num_wheelchair_sign = document.getElementById("num_wheelchair_sign").value;
    var sign_accessable = document.getElementById("sign_accessable").value;
    var sign_location = document.getElementById("sign_location").value;
    var key_needed = document.getElementById("key_needed").value;
    var comment = document.getElementById("commentRestroom").value;
    var recommendations = document.getElementById("recommendationsRestroom").value;
    var est_id = document.getElementById("est_idSeating").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/restroom/est/" + est_id,
        data: JSON.stringify({
            "restroom_id": restroom_id,
            "public_restroom": public_restroom,
            "total_num": total_num,
            "designated_number": designated_number,
            "num_wheelchair_sign": num_wheelchair_sign,
            "sign_accessable": sign_accessable,
            "sign_location": sign_location,
            "key_needed": key_needed,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Restroom Updated');
            $("#success").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
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

    bodyHtml = ' <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '               <button  type="button" id="add_restroom" class="btn btn-warning" onclick="addRestroomInfoView('+restroomData[0].restroom_id+')"><i class="far fa-plus-square"></i>&nbsp; Add Restroom</button></div>\n' +
        '            </div>\n';

    for (var i = 0; i < restroomInfoData.length; i++) {
        bodyHtml += '<form id="restroom_info_view_'+restroomInfoData[i].rest_info_id+'">\n ' +
        '              <div class="card-row">\n' +
        '                <div class="hr-restroom col-12"></div>\n' +
        '              </div>\n';

        if (restroomInfoData.length > 1) {
            bodyHtml += ' <div class="card-row">\n' +
                '            <div class="col-4 h9">\n' +
                '                <label for="restroom_number"> Restroom Number: ' + (i + 1) + '</label>\n' +
                '        </div>\n';
        }

        bodyHtml += '</div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-4"><label for="restroom_desc_'+restroomInfoData[i].rest_info_id+'" > Identify this bathroom rated with location and other information (i.e. 1st floor front women): </label> <input type="text" class="form-control" id="restroom_desc_'+restroomInfoData[i].rest_info_id+'" name="restroom_desc_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].restroom_desc+'" ></div>\n' +
            '            <div class="col-4"><label for="easy_open_'+restroomInfoData[i].rest_info_id+'" >  Room door is easy to open, requiring 5 lb. or less force: </label> <select class="form-control" id="easy_open_'+restroomInfoData[i].rest_info_id+'"  name="easy_open_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].easy_open === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].easy_open === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-4"><label for="lbs_force_'+restroomInfoData[i].rest_info_id+'" > Actual force - lbs. or light/ med/ heavy: </label> <input type="number" min="0" class="form-control" id="lbs_force_'+restroomInfoData[i].rest_info_id+'" name="lbs_force_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].lbs_force+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-3"><label for="clearance_'+restroomInfoData[i].rest_info_id+'"> Stall/Room door has at least 32” clearance when the door is open: </label> <select class="form-control" id="clearance_'+restroomInfoData[i].rest_info_id+'" name="clearance_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].clearance === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].clearance === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="opening_'+restroomInfoData[i].rest_info_id+'"> Opening measurement (inches): </label> <input type="number" min="0" class="form-control" id="opening_'+restroomInfoData[i].rest_info_id+'" name="opening_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].opening+'" ></div>\n' +
            '            <div class="col-3"><label for="opens_out_'+restroomInfoData[i].rest_info_id+'"> The stall door opens to the outside: </label><select class="form-control" id="opens_out_'+restroomInfoData[i].rest_info_id+'" name="opens_out_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].opens_out === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].opens_out === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="use_fist_'+restroomInfoData[i].rest_info_id+'"> The stall door can be opened, closed, and latched with a closed fist: </label><select class="form-control" id="use_fist_'+restroomInfoData[i].rest_info_id+'" name="use_fist_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].use_fist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].use_fist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-3"><label for="can_turn_around_'+restroomInfoData[i].rest_info_id+'"> The stall or room is large enough for a wheelchair or walker to turn around: </label> <select class="form-control" id="can_turn_around_'+restroomInfoData[i].rest_info_id+'" name="can_turn_around_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].can_turn_around === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].can_turn_around === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="turn_width_'+restroomInfoData[i].rest_info_id+'"> Stall/Room width (inches)​: </label> <input type="number" min="0" class="form-control" id="turn_width_'+restroomInfoData[i].rest_info_id+'" name="turn_width_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].turn_width+'" ></div>\n' +
            '            <div class="col-3"><label for="turn_depth_'+restroomInfoData[i].rest_info_id+'"> Stall/Room depth (inches)​: </label> <input type="number" min="0" class="form-control" id="turn_depth_'+restroomInfoData[i].rest_info_id+'" name="turn_depth_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].turn_depth+'" ></div>\n' +
            '            <div class="col-3"><label for="close_chair_inside_'+restroomInfoData[i].rest_info_id+'"> The stall/room door can be closed once a wheelchair is inside: </label> <select class="form-control" id="close_chair_inside_'+restroomInfoData[i].rest_info_id+'" name="close_chair_inside_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].close_chair_inside === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].close_chair_inside === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-3"><label for="grab_bars_'+restroomInfoData[i].rest_info_id+'"> Grab bars are easily reachable behind the toilet and on the side wall ​ nearest the toilet: </label> <select class="form-control" id="grab_bars_'+restroomInfoData[i].rest_info_id+'" name="grab_bars_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].grab_bars === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].grab_bars === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="seat_height_req_'+restroomInfoData[i].rest_info_id+'"> The height of the toilet seat is at least 17” from the floor: </label><select class="form-control" id="seat_height_req_'+restroomInfoData[i].rest_info_id+'" name="seat_height_req_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].seat_height_req === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].seat_height_req === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="seat_height_'+restroomInfoData[i].rest_info_id+'"> Seat height (inches): </label><input type="number" min="0" class="form-control" id="seat_height_'+restroomInfoData[i].rest_info_id+'" name="seat_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].seat_height+'" ></div>\n' +
            '            <div class="col-3"><label for="flush_auto_fist_'+restroomInfoData[i].rest_info_id+'"> The toilet flushes automatically, or can be operated with a closed fist: </label><select class="form-control" id="flush_auto_fist_'+restroomInfoData[i].rest_info_id+'" name="flush_auto_fist_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].flush_auto_fist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].flush_auto_fist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-3"><label for="ambulatory_accessible_'+restroomInfoData[i].rest_info_id+'"> If there are multiple stalls, at least one is ambulatory accessible with grab bars on either side and toilet height at least 17” from floor: </label> <select class="form-control" id="ambulatory_accessible_'+restroomInfoData[i].rest_info_id+'" name="ambulatory_accessible_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].ambulatory_accessible === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].ambulatory_accessible === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="bar_height_'+restroomInfoData[i].rest_info_id+'"> Toilet height (inches): </label><input type="number" min="0" class="form-control" id="bar_height_'+restroomInfoData[i].rest_info_id+'" name="bar_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].bar_height+'" ></div>\n' +
            '            <div class="col-3"><label for="coat_hook_'+restroomInfoData[i].rest_info_id+'"> If there is a coat hook, it is between 35” and 48” from the floor: </label><select class="form-control" id="coat_hook_'+restroomInfoData[i].rest_info_id+'" name="coat_hook_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].coat_hook === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].coat_hook === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="hook_height_'+restroomInfoData[i].rest_info_id+'"> Hook height (inches): </label> <input type="number" min="0" class="form-control" id="hook_height_'+restroomInfoData[i].rest_info_id+'" name="hook_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].hook_height+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-3"><label for="sink_'+restroomInfoData[i].rest_info_id+'"> The height of the sink/countertop is 34” or less from the floor: </label><select class="form-control" id="sink_'+restroomInfoData[i].rest_info_id+'" name="sink_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].sink === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].sink === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="sink_height_'+restroomInfoData[i].rest_info_id+'"> Sink/Countertop height (inches): </label> <input type="number" min="0" class="form-control" id="sink_height_'+restroomInfoData[i].rest_info_id+'" name="sink_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].sink_height+'" ></div>\n' +
            '            <div class="col-3"><label for="faucet_'+restroomInfoData[i].rest_info_id+'"> The faucet control is 17” or less from the front edge of the sink counter: </label><select class="form-control" id="faucet_'+restroomInfoData[i].rest_info_id+'" name="faucet_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].faucet === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].faucet === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="faucet_depth_'+restroomInfoData[i].rest_info_id+'"> Faucet depth (inches): </label> <input type="number" min="0" class="form-control" id="faucet_depth_'+restroomInfoData[i].rest_info_id+'" name="faucet_depth_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].faucet_depth+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-4"><label for="faucet_auto_fist_'+restroomInfoData[i].rest_info_id+'"> Faucet​ can ​be operated ​automatically or ​with a closed fist: </label> <select class="form-control" id="faucet_auto_fist_'+restroomInfoData[i].rest_info_id+'" name="faucet_auto_fist_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].faucet_auto_fist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].faucet_auto_fist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-4"><label for="sink_clearance_'+restroomInfoData[i].rest_info_id+'"> There is room for a wheelchair to roll under the sink ​: </label><select class="form-control" id="sink_clearance_'+restroomInfoData[i].rest_info_id+'" name="sink_clearance_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].sink_clearance === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].sink_clearance === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-4"><label for="sink_clearance_height_'+restroomInfoData[i].rest_info_id+'"> Measurement (inches): </label> <input type="number" min="0" class="form-control" id="sink_clearance_height_'+restroomInfoData[i].rest_info_id+'" name="sink_clearance_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].sink_clearance_height+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-4"><label for="sink_pipes_'+restroomInfoData[i].rest_info_id+'"> If there are pipes under the sink, they are covered to prevent injury or burns: </label> <select class="form-control" id="sink_pipes_'+restroomInfoData[i].rest_info_id+'" name="sink_pipes_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].sink_pipes === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].sink_pipes === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-4"><label for="soap_dispenser_'+restroomInfoData[i].rest_info_id+'"> The height of the soap dispenser control is 48” or less from the floor: </label> <select class="form-control" id="soap_dispenser_'+restroomInfoData[i].rest_info_id+'" name="soap_dispenser_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].soap_dispenser === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].soap_dispenser === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-4"><label for="soap_height_'+restroomInfoData[i].rest_info_id+'">  Soap dispenser height (inches): </label> <input type="number" min="0" class="form-control" id="soap_height_'+restroomInfoData[i].rest_info_id+'" name="soap_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].soap_height+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-6"><label for="dry_fist_'+restroomInfoData[i].rest_info_id+'">  Hand dryer or towel dispenser can be operated automatically or with closed fist: </label> <select class="form-control" id="dry_fist_'+restroomInfoData[i].rest_info_id+'" name="dry_fist_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].dry_fist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].dry_fist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-6"><label for="dry_control_height_'+restroomInfoData[i].rest_info_id+'"> Controls for hand dryer or towel dispenser are 48” or less from floor: </label> <select class="form-control" id="dry_control_height_'+restroomInfoData[i].rest_info_id+'" name="dry_control_height_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].dry_control_height === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].dry_control_height === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-3"><label for="mirror_'+restroomInfoData[i].rest_info_id+'"> If there is a mirror, the bottom edge is 40” or less from the floor: </label> <select class="form-control" id="mirror_'+restroomInfoData[i].rest_info_id+'" name="mirror_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].mirror === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].mirror === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="mirror_height_'+restroomInfoData[i].rest_info_id+'"> Mirror height (inches): </label><input type="number" min="0" class="form-control" id="mirror_height_'+restroomInfoData[i].rest_info_id+'" name="mirror_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].mirror_height+'" ></div>\n' +
            '            <div class="col-3"><label for="shelves_'+restroomInfoData[i].rest_info_id+'"> If there are shelves to set items, they are 48” or less from the floor: </label><select class="form-control" id="shelves_'+restroomInfoData[i].rest_info_id+'" name="shelves_'+restroomInfoData[i].rest_info_id+'"  >\n';

                            if (restroomInfoData[0].shelves === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].shelves === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-3"><label for="shelf_height_'+restroomInfoData[i].rest_info_id+'"> Shelf height (inches): </label> <input type="number" min="0" class="form-control" id="shelf_height_'+restroomInfoData[i].rest_info_id+'" name="shelf_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].shelf_height+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-4"><label for="trash_receptacles_'+restroomInfoData[i].rest_info_id+'"> Trash receptacles are positioned so they do not block the route to the door​: </label> <select class="form-control" id="trash_receptacles_'+restroomInfoData[i].rest_info_id+'" name="trash_receptacles_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].trash_receptacles === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].trash_receptacles === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-4"><label for="hygiene_seat_cover_'+restroomInfoData[i].rest_info_id+'"> Feminine hygiene product & toilet seat cover dispensers are 48” or less from floor: </label> <select class="form-control" id="hygiene_seat_cover_'+restroomInfoData[i].rest_info_id+'" name="hygiene_seat_cover_'+restroomInfoData[i].rest_info_id+'" >\n';

                            if (restroomInfoData[0].hygiene_seat_cover === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (restroomInfoData[0].hygiene_seat_cover === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
            '            <div class="col-4"><label for="hygiene_cover_height_'+restroomInfoData[i].rest_info_id+'"> Height (inches): </label> <input type="number" min="0" class="form-control" id="hygiene_cover_height_'+restroomInfoData[i].rest_info_id+'" name="hygiene_cover_height_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].hygiene_cover_height+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="lightingRestroomInfo_'+restroomInfoData[i].rest_info_id+'"> Lighting is adequate: </label><select class="form-control" id="lightingRestroomInfo_'+restroomInfoData[i].rest_info_id+'" name="lightingRestroomInfo_'+restroomInfoData[i].rest_info_id+'" >\n';

                                if (restroomInfoData[0].lighting === "Yes") {
                                    bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                        '<option value="No" >&nbsp; No</option>\n ' +
                                        '<option value="N/A" >&nbsp; N/A</option>';
                                }
                                else if (restroomInfoData[0].lighting === "No") {
                                    bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                        '<option value="No" selected>&nbsp; No</option>\n ' +
                                        '<option value="N/A" >&nbsp; N/A</option>';
                                } else {
                                    bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                        '<option value="No" >&nbsp; No</option>\n ' +
                                        '<option value="N/A" selected>&nbsp; N/A</option>';
                                }

        bodyHtml += '       </select>\n' +
            '           </div>\n' +
            '            <div class="col-6"><label for="lighting_typeRestroomInfo_'+restroomInfoData[i].rest_info_id+'"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeRestroomInfo_'+restroomInfoData[i].rest_info_id+'" name="lighting_typeRestroomInfo_'+restroomInfoData[i].rest_info_id+'" >\n';

                                if (restroomInfoData[0].lighting_type === "Low") {
                                    bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                        '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                        '<option value="Bright" >&nbsp; Bright</option>\n' +
                                        '<option value="N/A" >&nbsp; N/A</option>';
                                }
                                else if (restroomInfoData[0].lighting_type === "Medium") {
                                    bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                        '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                        '<option value="Bright" >&nbsp; Bright</option>\n' +
                                        '<option value="N/A" >&nbsp; N/A</option>';
                                }
                                else if (restroomInfoData[0].lighting_type === "Bright") {
                                    bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                        '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                        '<option value="Bright" selected>&nbsp; Bright</option>\n' +
                                        '<option value="N/A" >&nbsp; N/A</option>';
                                } else {
                                    bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                        '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                        '<option value="Bright" >&nbsp; Bright</option>\n' +
                                        '<option value="N/A" selected>&nbsp; N/A</option>';
                                }

        bodyHtml += '       </select>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-12"><label for="commentRestroomInfo_'+restroomInfoData[i].rest_info_id+'"> Additional notes: </label><input type="text" class="form-control" id="commentRestroomInfo_'+restroomInfoData[i].rest_info_id+'" name="commentRestroomInfo_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].comment+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <div class="col-12"><label for="recommendationsRestroomInfo_'+restroomInfoData[i].rest_info_id+'"> Recommendations: </label><input type="text" class="form-control" id="recommendationsRestroomInfo_'+restroomInfoData[i].rest_info_id+'" name="recommendationsRestroomInfo_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].recommendations+'" ></div>\n' +
            '        </div>\n' +
            '        <div class="card-row">\n' +
            '            <input type="hidden" class="form-control" id="rest_info_id_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].rest_info_id+'" >\n' +
            '            <input type="hidden" class="form-control" id="rest_id_'+restroomInfoData[i].rest_info_id+'" value="'+restroomInfoData[i].rest_id+'" >\n' +
            '            <input type="hidden" class="form-control" id="restroom_num_'+restroomInfoData[i].rest_info_id+'" value="'+(i+1)+'" >\n' +
            '            <div class="col-10">\n' +
            '                <button type="button" id="update_restroom_'+restroomInfoData[i].rest_info_id+'" class="btn btn-success" onclick="updateRestroomInfo('+restroomInfoData[i].rest_info_id+')"><i class="fas fa-save"></i>&nbsp; Save Restroom Information</button>&nbsp;\n' +
            '                <button type="button" id="delete_restroom_'+restroomInfoData[i].rest_info_id+'" class="btn btn-danger" onclick="deleteRestroomInfo('+restroomInfoData[i].rest_info_id+')"><i class="fas fa-trash-alt"></i>&nbsp; Delete Restroom Information</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="card-row-spacer">\n' +
            '            &nbsp;\n' +
            '        </div>\n';

        bodyHtml += '</div>\n' +
            '   </form>';
    }

    $('#restroom_info_card').html(bodyHtml);

}

function updateRestroomInfo(curr_rest_info_id) {

    var restroom_desc = document.getElementById("restroom_desc_"+curr_rest_info_id).value;
    var easy_open = document.getElementById("easy_open_"+curr_rest_info_id).value;
    var lbs_force = document.getElementById("lbs_force_"+curr_rest_info_id).value;
    var clearance = document.getElementById("clearance_"+curr_rest_info_id).value;
    var opening = document.getElementById("opening_"+curr_rest_info_id).value;
    var opens_out = document.getElementById("opens_out_"+curr_rest_info_id).value;
    var use_fist = document.getElementById("use_fist_"+curr_rest_info_id).value;
    var can_turn_around = document.getElementById("can_turn_around_"+curr_rest_info_id).value;
    var turn_width = document.getElementById("turn_width_"+curr_rest_info_id).value;
    var turn_depth = document.getElementById("turn_depth_"+curr_rest_info_id).value;
    var close_chair_inside = document.getElementById("close_chair_inside_"+curr_rest_info_id).value;
    var grab_bars = document.getElementById("grab_bars_"+curr_rest_info_id).value;
    var seat_height_req = document.getElementById("seat_height_req_"+curr_rest_info_id).value;
    var seat_height = document.getElementById("seat_height_"+curr_rest_info_id).value;
    var flush_auto_fist = document.getElementById("flush_auto_fist_"+curr_rest_info_id).value;
    var ambulatory_accessible = document.getElementById("ambulatory_accessible_"+curr_rest_info_id).value;
    var bar_height = document.getElementById("bar_height_"+curr_rest_info_id).value;
    var coat_hook = document.getElementById("coat_hook_"+curr_rest_info_id).value;
    var hook_height = document.getElementById("hook_height_"+curr_rest_info_id).value;
    var sink = document.getElementById("sink_"+curr_rest_info_id).value;
    var sink_height = document.getElementById("sink_height_"+curr_rest_info_id).value;
    var faucet = document.getElementById("faucet_"+curr_rest_info_id).value;
    var faucet_depth = document.getElementById("faucet_depth_"+curr_rest_info_id).value;
    var faucet_auto_fist = document.getElementById("faucet_auto_fist_"+curr_rest_info_id).value;
    var sink_clearance = document.getElementById("sink_clearance_"+curr_rest_info_id).value;
    var sink_clearance_height = document.getElementById("sink_clearance_height_"+curr_rest_info_id).value;
    var sink_pipes = document.getElementById("sink_pipes_"+curr_rest_info_id).value;
    var soap_dispenser = document.getElementById("soap_dispenser_"+curr_rest_info_id).value;
    var dry_fist = document.getElementById("dry_fist_"+curr_rest_info_id).value;
    var dry_control_height = document.getElementById("dry_control_height_"+curr_rest_info_id).value;
    var mirror = document.getElementById("mirror_"+curr_rest_info_id).value;
    var mirror_height = document.getElementById("mirror_height_"+curr_rest_info_id).value;
    var shelves = document.getElementById("shelves_"+curr_rest_info_id).value;
    var shelf_height = document.getElementById("shelf_height_"+curr_rest_info_id).value;
    var trash_receptacles = document.getElementById("trash_receptacles_"+curr_rest_info_id).value;
    var hygiene_seat_cover = document.getElementById("hygiene_seat_cover_"+curr_rest_info_id).value;
    var hygiene_cover_height = document.getElementById("hygiene_cover_height_"+curr_rest_info_id).value;
    var lighting = document.getElementById("lightingRestroomInfo_"+curr_rest_info_id).value;
    var lighting_type = document.getElementById("lighting_typeRestroomInfo_"+curr_rest_info_id).value;
    var comment = document.getElementById("commentRestroomInfo_"+curr_rest_info_id).value;
    var recommendations = document.getElementById("recommendationsRestroomInfo_"+curr_rest_info_id).value;
    var rest_id = document.getElementById("rest_id_"+curr_rest_info_id).value;

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/restroom_info/rest/" + rest_id,
        data: JSON.stringify({
            "rest_info_id" : curr_rest_info_id,
            "restroom_desc" : restroom_desc,
            "easy_open" : easy_open,
            "lbs_force" : lbs_force,
            "clearance" : clearance,
            "opening" : opening,
            "opens_out" : opens_out,
            "use_fist" : use_fist,
            "can_turn_around" : can_turn_around,
            "turn_width" : turn_width,
            "turn_depth" : turn_depth,
            "close_chair_inside" : close_chair_inside,
            "grab_bars" : grab_bars,
            "seat_height_req" : seat_height_req,
            "seat_height" : seat_height,
            "flush_auto_fist" : flush_auto_fist,
            "ambulatory_accessible" : ambulatory_accessible,
            "bar_height" : bar_height,
            "coat_hook" : coat_hook,
            "hook_height" : hook_height,
            "sink" : sink,
            "sink_height" : sink_height,
            "faucet" : faucet,
            "faucet_depth" : faucet_depth,
            "faucet_auto_fist" : faucet_auto_fist,
            "sink_clearance" : sink_clearance,
            "sink_clearance_height" : sink_clearance_height,
            "sink_pipes" : sink_pipes,
            "soap_dispenser" : soap_dispenser,
            "dry_fist" : dry_fist,
            "dry_control_height" : dry_control_height,
            "mirror" : mirror,
            "mirror_height" : mirror_height,
            "shelves" : shelves,
            "shelf_height" : shelf_height,
            "trash_receptacles" : trash_receptacles,
            "hygiene_seat_cover" : hygiene_seat_cover,
            "hygiene_cover_height" : hygiene_cover_height,
            "lighting" : lighting,
            "lighting_type" : lighting_type,
            "comment" : comment,
            "recommendations" : recommendations
        }),
        success: function () {
            $("#success-body").html('Restroom Information Updated');
            $("#success").modal('toggle');

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function addRestroomInfoView(rest_id) {

    $("#restroom-body").html(
        '<form id="add_restroom_information"> \n' +
        '<div class="card-row">\n' +
        '   <div class="col-12"><label for="restroom_desc"> Identify this bathroom rated with location and other information (i.e. 1st floor front women): </label> <input type="text" class="form-control" name="restroom_desc" id="restroom_desc" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="easy_open">  Room door is easy to open, requiring 5 lb. or less force: </label> <select class="form-control" name="easy_open" id="easy_open" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="lbs_force"> Actual force - lbs. or light/ med/ heavy: </label> <input type="number" min="0" class="form-control" name="lbs_force" id="lbs_force"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="clearance"> Stall/Room door has at least 32” clearance when the door is open: </label> <select class="form-control" name="clearance" id="clearance" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="opening"> Opening measurement (inches): </label> <input type="number" min="0" class="form-control" name="opening" id="opening"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="opens_out"> The stall door opens to the outside: </label><select class="form-control" name="opens_out" id="opens_out" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="use_fist"> The stall door can be opened, closed, and latched with a closed fist: </label><select class="form-control" name="use_fist" id="use_fist" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="can_turn_around"> The stall or room is large enough for a wheelchair or walker to turn around: </label> <select class="form-control" name="can_turn_around" id="can_turn_around" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="turn_width"> Stall/Room width (inches)​: </label> <input type="number" min="0" class="form-control" name="turn_width" id="turn_width"  ></div>\n' +
        '   <div class="col-4"><label for="turn_depth"> Stall/Room depth (inches)​: </label> <input type="number" min="0" class="form-control" name="turn_depth" id="turn_depth"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="close_chair_inside"> The stall/room door can be closed once a wheelchair is inside: </label> <select class="form-control" name="close_chair_inside" id="close_chair_inside" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="grab_bars"> Grab bars are easily reachable behind the toilet and on the side wall ​ nearest the toilet: </label> <select class="form-control" name="grab_bars" id="grab_bars" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="seat_height_req"> The height of the toilet seat is at least 17” from the floor: </label><select class="form-control" name="seat_height_req" id="seat_height_req" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="seat_height"> Seat height (inches): </label><input type="number" min="0" class="form-control" name="seat_height" id="seat_height" ></div>\n' +
        '   <div class="col-4"><label for="flush_auto_fist"> The toilet flushes automatically, or can be operated with a closed fist: </label><select class="form-control" name="flush_auto_fist" id="flush_auto_fist" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="ambulatory_accessible"> If there are multiple stalls, at least one is ambulatory accessible with grab bars on either side and toilet height at least 17” from floor: </label> <select class="form-control" name="ambulatory_accessible" id="ambulatory_accessible" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="bar_height"> Toilet height (inches): </label><input type="number" min="0" class="form-control" name="bar_height" id="bar_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="coat_hook"> If there is a coat hook, it is between 35” and 48” from the floor: </label><select class="form-control" name="coat_hook" id="coat_hook" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="hook_height"> Hook height (inches): </label> <input type="num" min="0" class="form-control" name="hook_height" id="hook_height"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="sink"> The height of the sink/countertop is 34” or less from the floor: </label><select class="form-control" name="sink" id="sink" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="sink_height"> Sink/Countertop height (inches): </label> <input type="number" min="0" class="form-control" name="sink_height" id="sink_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="faucet"> The faucet control is 17” or less from the front edge of the sink counter: </label><select class="form-control" name="faucet" id="faucet" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="faucet_depth"> Faucet depth (inches): </label> <input type="number" min="0" class="form-control" name="faucet_depth" id="faucet_depth"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="faucet_auto_fist"> Faucet​ can ​be operated ​automatically or ​with a closed fist: </label> <select class="form-control" name="faucet_auto_fist" id="faucet_auto_fist" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="sink_clearance"> There is room for a wheelchair to roll under the sink ​: </label><select class="form-control" name="sink_clearance" id="sink_clearance" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="sink_clearance_height"> Measurement (inches): </label> <input type="number" min="0" class="form-control" name="sink_clearance_height" id="sink_clearance_height"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="sink_pipes"> If there are pipes under the sink, they are covered to prevent injury or burns: </label> <select class="form-control" name="sink_pipes" id="sink_pipes" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="soap_dispenser"> The height of the soap dispenser control is 48” or less from the floor: </label> <select class="form-control" name="soap_dispenser" id="soap_dispenser" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="soap_height"> Soap dispenser height (inches): </label> <input type="number" min="0" class="form-control" name="soap_height" id="soap_height"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="dry_fist">  Hand dryer or towel dispenser can be operated automatically or with closed fist: </label> <select class="form-control" name="dry_fist" id="dry_fist" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="dry_control_height"> Controls for hand dryer or towel dispenser are 48” or less from floor: </label> <select class="form-control" name="dry_control_height" id="dry_control_height" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="mirror"> If there is a mirror, the bottom edge is 40” or less from the floor: </label> <select class="form-control" name="mirror" id="mirror" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="mirror_height"> Mirror height (inches): </label><input type="number" min="0" class="form-control" name="mirror_height" id="mirror_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="shelves"> If there are shelves to set items, they are 48” or less from the floor: </label><select class="form-control" name="shelves" id="shelves" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="shelf_height"> Shelf height (inches): </label> <input type="number" min="0" class="form-control" name="shelf_height" id="shelf_height"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="trash_receptacles"> Trash receptacles are positioned so they do not block the route to the door​: </label> <select class="form-control" name="trash_receptacles" id="trash_receptacles" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="hygiene_seat_cover"> Feminine hygiene product & toilet seat cover dispensers are 48” or less from floor: </label> <select class="form-control" name="hygiene_seat_cover" id="hygiene_seat_cover" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="hygiene_cover_height"> Height (inches): </label> <input type="number" min="0" class="form-control" name="hygiene_cover_height" id="hygiene_cover_height"  ></div>\n' +
        '    <div class="col-4"><label for="lightingRestroomInfo"> Lighting is adequate: </label><select class="form-control" name="lightingRestroomInfo" id="lightingRestroomInfo" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Yes" >Yes</option>\n' +
        '       <option value="No" >No</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_typeRestroomInfo"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeRestroomInfo" id="lighting_typeRestroomInfo" >\n' +
        '       <option value="" disabled selected>Please select one</option>\n' +
        '       <option value="Low" >Low</option>\n' +
        '       <option value="Medium" >Medium</option>\n' +
        '       <option value="Bright" >Bright</option>\n' +
        '       <option value="N/A" >N/A</option>\n' +
        '    </select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentRestroomInfo"> Additional notes: </label><input type="text" class="form-control" name="commentRestroomInfo" id="commentRestroomInfo"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsRestroomInfo"> Recommendations: </label><input type="text" class="form-control" name="recommendationsRestroomInfo" id="recommendationsRestroomInfo"  ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n' +
        '   <div class="col-12">\n' +
        '       <span>\n ' +
        '           <button  type="button" id="save_restroom_information" class="btn btn-success" onclick="addRestroomInfo('+rest_id+')"><i class="fas fa-save"></i>&nbsp; Save Restroom Information</button>&nbsp;' +
        '           <button  type="button" id="cancel_restroom_information" class="btn btn-secondary" data-dismiss="modal"><i class="fas fa-times"></i>&nbsp; Cancel </button>\n ' +
        '       </span>\n' +
        '   </div>\n ' +
        '</div>\n ' +
        '</form>'
    );

    $("#restroom-footer").html('');

    $("#restroom-modal").modal('toggle');

}

function addRestroomInfo(rest_id) {

    $("#restroom-modal").modal('toggle');

    var restroom_desc = document.getElementById("restroom_desc").value;
    var easy_open = document.getElementById("easy_open").value;
    var lbs_force = document.getElementById("lbs_force").value;
    var clearance = document.getElementById("clearance").value;
    var opening = document.getElementById("opening").value;
    var opens_out = document.getElementById("opens_out").value;
    var use_fist = document.getElementById("use_fist").value;
    var can_turn_around = document.getElementById("can_turn_around").value;
    var turn_width = document.getElementById("turn_width").value;
    var turn_depth = document.getElementById("turn_depth").value;
    var close_chair_inside = document.getElementById("close_chair_inside").value;
    var grab_bars = document.getElementById("grab_bars").value;
    var seat_height_req = document.getElementById("seat_height_req").value;
    var seat_height = document.getElementById("seat_height").value;
    var flush_auto_fist = document.getElementById("flush_auto_fist").value;
    var ambulatory_accessible = document.getElementById("ambulatory_accessible").value;
    var bar_height = document.getElementById("bar_height").value;
    var coat_hook = document.getElementById("coat_hook").value;
    var hook_height = document.getElementById("hook_height").value;
    var sink = document.getElementById("sink").value;
    var sink_height = document.getElementById("sink_height").value;
    var faucet = document.getElementById("faucet").value;
    var faucet_depth = document.getElementById("faucet_depth").value;
    var faucet_auto_fist = document.getElementById("faucet_auto_fist").value;
    var sink_clearance = document.getElementById("sink_clearance").value;
    var sink_clearance_height = document.getElementById("sink_clearance_height").value;
    var sink_pipes = document.getElementById("sink_pipes").value;
    var soap_dispenser = document.getElementById("soap_dispenser").value;
    var soap_height = document.getElementById("soap_height").value;
    var dry_fist = document.getElementById("dry_fist").value;
    var dry_control_height = document.getElementById("dry_control_height").value;
    var mirror = document.getElementById("mirror").value;
    var mirror_height = document.getElementById("mirror_height").value;
    var shelves = document.getElementById("shelves").value;
    var shelf_height = document.getElementById("shelf_height").value;
    var trash_receptacles = document.getElementById("trash_receptacles").value;
    var hygiene_seat_cover = document.getElementById("hygiene_seat_cover").value;
    var hygiene_cover_height = document.getElementById("hygiene_cover_height").value;
    var lighting = document.getElementById("lightingRestroomInfo").value;
    var lighting_type = document.getElementById("lighting_typeRestroomInfo").value;
    var comment = document.getElementById("commentRestroomInfo").value;
    var recommendations = document.getElementById("recommendationsRestroomInfo").value;

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/restroom_info/",
        data: JSON.stringify({
            "restroom_desc" : restroom_desc,
            "easy_open" : easy_open,
            "lbs_force" : lbs_force,
            "clearance" : clearance,
            "opening" : opening,
            "opens_out" : opens_out,
            "use_fist" : use_fist,
            "can_turn_around" : can_turn_around,
            "turn_width" : turn_width,
            "turn_depth" : turn_depth,
            "close_chair_inside" : close_chair_inside,
            "grab_bars" : grab_bars,
            "seat_height_req" : seat_height_req,
            "seat_height" : seat_height,
            "flush_auto_fist" : flush_auto_fist,
            "ambulatory_accessible" : ambulatory_accessible,
            "bar_height" : bar_height,
            "coat_hook" : coat_hook,
            "hook_height" : hook_height,
            "sink" : sink,
            "sink_height" : sink_height,
            "faucet" : faucet,
            "faucet_depth" : faucet_depth,
            "faucet_auto_fist" : faucet_auto_fist,
            "sink_clearance" : sink_clearance,
            "sink_clearance_height" : sink_clearance_height,
            "sink_pipes" : sink_pipes,
            "soap_dispenser" : soap_dispenser,
            "soap_height" : soap_height,
            "dry_fist" : dry_fist,
            "dry_control_height" : dry_control_height,
            "mirror" : mirror,
            "mirror_height" : mirror_height,
            "shelves" : shelves,
            "shelf_height" : shelf_height,
            "trash_receptacles" : trash_receptacles,
            "hygiene_seat_cover" : hygiene_seat_cover,
            "hygiene_cover_height" : hygiene_cover_height,
            "lighting" : lighting,
            "lighting_type" : lighting_type,
            "comment" : comment,
            "recommendations" : recommendations,
            "rest_id" : rest_id
        }),
        success: function () {
            $("#success-body").html('Restroom Information Added');
            $("#success").modal('toggle');
            RestroomInfoView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function deleteRestroomInfo(rest_info_id) {
    var restroom_num = document.getElementById('restroom_num_'+rest_info_id).value;
    if(confirm('Are you sure you want to delete Restroom '+restroom_num+' Information?\nThis action can not be undone.')) {
        $.ajax({
            async: false,
            method: 'DELETE',
            url: 'delete/restroom_info/' + rest_info_id,
            success: function () {
                RestroomInfoView();
            },
            error: function (data) {
                $("#alert-body").html(JSON.stringify(data));
                $("#alert").modal('toggle');
            }
        });
    }
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

    bodyHtml = '<form id="communication_view">\n ' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="public_phone"> There is one or more public phones available w/adjustable volume control.: </label> <select class="form-control" name="public_phone" id="public_phone" >\n';

                            if (communicationData[0].public_phone === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].public_phone === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="phone_clearance">  There are public phones w/ controls min 48” from floor, protruding < 4” from wall: </label> <select class="form-control" name="phone_clearance" id="phone_clearance" >\n';

                            if (communicationData[0].phone_clearance === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].phone_clearance === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="num_phone"> Number of phones: </label> <input type="number" min="0" class="form-control" name="num_phone" id="num_phone" value="'+communicationData[0].num_phone+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-3"><label for="tty"> There is a TTY is available: </label> <select class="form-control" name="tty" id="tty" >\n';

                            if (communicationData[0].tty === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].tty === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="staff_tty"> Staff are trained in use of TTY, and how to accept relay calls: </label> <select class="form-control" name="staff_tty" id="staff_tty" >\n';

                            if (communicationData[0].staff_tty === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].staff_tty === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="assisted_listening"> There are assisted listening devices available: </label><select class="form-control" name="assisted_listening" id="assisted_listening" >\n';

                            if (communicationData[0].assisted_listening === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assisted_listening === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="assisted_listen_type"> Type of listening device - Infra­red Loop/Induction Loop/FM/Amplification/Other: </label><select class="form-control" name="assisted_listen_type" id="assisted_listen_type" >\n';

                            if (communicationData[0].assisted_listen_type === "Infra­red Loop") {
                                bodyHtml += '<option value="Infra­red Loop" selected>&nbsp; Infra­red Loop</option>\n' +
                                    '<option value="Induction Loop" >&nbsp; Induction Loop</option>\n ' +
                                    '<option value="FM" >&nbsp; FM</option>\n ' +
                                    '<option value="Amplification" >&nbsp; Amplification</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assisted_listen_type === "Induction Loop") {
                                bodyHtml += '<option value="Infra­red Loop" >&nbsp; Infra­red Loop</option>\n' +
                                    '<option value="Induction Loop" selected>&nbsp; Induction Loop</option>\n ' +
                                    '<option value="FM" >&nbsp; FM</option>\n ' +
                                    '<option value="Amplification" >&nbsp; Amplification</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assisted_listen_type === "FM") {
                                bodyHtml += '<option value="Infra­red Loop" >&nbsp; Infra­red Loop</option>\n' +
                                    '<option value="Induction Loop" >&nbsp; Induction Loop</option>\n ' +
                                    '<option value="FM" selected>&nbsp; FM</option>\n ' +
                                    '<option value="Amplification" >&nbsp; Amplification</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assisted_listen_type === "Amplification") {
                                bodyHtml += '<option value="Infra­red Loop" >&nbsp; Infra­red Loop</option>\n' +
                                    '<option value="Induction Loop" selected>&nbsp; Induction Loop</option>\n ' +
                                    '<option value="FM" >&nbsp; FM</option>\n ' +
                                    '<option value="Amplification" selected>&nbsp; Amplification</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assisted_listen_type === "Other") {
                                bodyHtml += '<option value="Infra­red Loop" >&nbsp; Infra­red Loop</option>\n' +
                                    '<option value="Induction Loop" selected>&nbsp; Induction Loop</option>\n ' +
                                    '<option value="FM" >&nbsp; FM</option>\n ' +
                                    '<option value="Amplification" >&nbsp; Amplification</option>\n ' +
                                    '<option value="Other" selected>&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else {
                                bodyHtml += '<option value="Infra­red Loop" >&nbsp; Infra­red Loop</option>\n' +
                                    '<option value="Induction Loop" >&nbsp; Induction Loop</option>\n ' +
                                    '<option value="FM" >&nbsp; FM</option>\n ' +
                                    '<option value="Amplification" >&nbsp; Amplification</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="assisted_listen_receiver"> Type of receivers - Earbud/Neckloop/Headphones/Other: </label> <select class="form-control" name="assisted_listen_receiver" id="assisted_listen_receiver" >\n';

                            if (communicationData[0].assisted_listen_receiver === "Earbud") {
                                bodyHtml += '<option value="Earbud" selected>&nbsp; Earbud</option>\n' +
                                    '<option value="Neckloop" >&nbsp; Neckloop</option>\n ' +
                                    '<option value="Headphones" >&nbsp; Headphones</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assisted_listen_receiver === "Neckloop") {
                                bodyHtml += '<option value="Earbud" >&nbsp; Earbud</option>\n' +
                                    '<option value="Neckloop" selected>&nbsp; Neckloop</option>\n ' +
                                    '<option value="Headphones" >&nbsp; Headphones</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assisted_listen_receiver === "Headphones") {
                                bodyHtml += '<option value="Earbud" >&nbsp; Earbud</option>\n' +
                                    '<option value="Neckloop" >&nbsp; Neckloop</option>\n ' +
                                    '<option value="Headphones" selected>&nbsp; Headphones</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assisted_listen_receiver === "Other") {
                                bodyHtml += '<option value="Earbud" >&nbsp; Earbud</option>\n' +
                                    '<option value="Neckloop" selected>&nbsp; Neckloop</option>\n ' +
                                    '<option value="Headphones" >&nbsp; Headphones</option>\n ' +
                                    '<option value="Other" selected>&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else {
                                bodyHtml += '<option value="Earbud" >&nbsp; Earbud</option>\n' +
                                    '<option value="Neckloop" >&nbsp; Neckloop</option>\n ' +
                                    '<option value="Headphones" >&nbsp; Headphones</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="listening_signage"> Signs about listening devices are clearly displayed​: </label> <select class="form-control" name="listening_signage" id="listening_signage" >\n';

                            if (communicationData[0].listening_signage === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].listening_signage === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="staff_listening"> Staff are trained to use assisted listening devices​: </label> <select class="form-control" name="staff_listening" id="staff_listening" >\n';

                            if (communicationData[0].staff_listening === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].staff_listening === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="acoustics"> The acoustics are comfortable (no echoing, loud music, etc): </label> <select class="form-control" name="acoustics" id="acoustics" >\n';

                            if (communicationData[0].acoustics === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].acoustics === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="acoustics_level"> Noise level - Low/Medium/High: </label> <select class="form-control" name="acoustics_level" id="acoustics_level" >\n';

                            if (communicationData[0].acoustics_level === "Low") {
                                bodyHtml += '<option value="Low" selected>&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="High" >&nbsp; High</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].acoustics_level === "Medium") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" selected>&nbsp; Medium</option>\n ' +
                                    '<option value="High" >&nbsp; High</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].acoustics_level === "High") {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="High" selected>&nbsp; High</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else {
                                bodyHtml += '<option value="Low" >&nbsp; Low</option>\n' +
                                    '<option value="Medium" >&nbsp; Medium</option>\n ' +
                                    '<option value="High" >&nbsp; High</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="alt_comm_methods"> If a customer is unable to hear, there are other forms of communication: </label><select class="form-control" name="alt_comm_methods" id="alt_comm_methods" >\n';

                            if (communicationData[0].alt_comm_methods === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].alt_comm_methods === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="alt_comm_type"> Type of other form of communication (writing pad, staff know ASL, etc): </label><input type="text" class="form-control" name="alt_comm_type" id="alt_comm_type" value="'+communicationData[0].alt_comm_type+'"></div>\n'+
        '            <div class="col-6"><label for="staff_ASL"> Staff have received instructions on how to provide ASL services upon request (in person or remote): </label><select class="form-control" name="staff_ASL" id="staff_ASL" >\n';

                            if (communicationData[0].staff_ASL === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].staff_ASL === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="captioning_default"> Captioning is turned ‘on’ as default for TVs or projected video: </label> <select class="form-control" name="captioning_default" id="captioning_default" >\n';

                            if (communicationData[0].captioning_default === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].captioning_default === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="theater_captioning"> If this is a theater, there is captioning: </label><select class="form-control" name="theater_captioning" id="theater_captioning" >\n';

                            if (communicationData[0].theater_captioning === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].theater_captioning === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="theater_capt_type"> Type of captioning used - Real Time/Open Captions/Rear Window/Other: </label><select class="form-control" name="theater_capt_type" id="theater_capt_type" >\n';

                            if (communicationData[0].theater_capt_type === "Real Time") {
                                bodyHtml += '<option value="Real Time" selected>&nbsp; Real Time</option>\n' +
                                    '<option value="Open Captions" >&nbsp; Open Captions</option>\n ' +
                                    '<option value="Rear Window" >&nbsp; Rear Window</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].theater_capt_type === "Open Captions") {
                                bodyHtml += '<option value="Real Time" >&nbsp; Real Time</option>\n' +
                                    '<option value="Open Captions" selected>&nbsp; Open Captions</option>\n ' +
                                    '<option value="Rear Window" >&nbsp; Rear Window</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].theater_capt_type === "Rear Window") {
                                bodyHtml += '<option value="Real Time" >&nbsp; Real Time</option>\n' +
                                    '<option value="Open Captions" >&nbsp; Open Captions</option>\n ' +
                                    '<option value="Rear Window" selected>&nbsp; Rear Window</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].theater_capt_type === "Other") {
                                bodyHtml += '<option value="Real Time" >&nbsp; Real Time</option>\n' +
                                    '<option value="Open Captions" selected>&nbsp; Open Captions</option>\n ' +
                                    '<option value="Rear Window" >&nbsp; Rear Window</option>\n ' +
                                    '<option value="Other" selected>&nbsp; Other</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else {
                                bodyHtml += '<option value="Real Time" >&nbsp; Real Time</option>\n' +
                                    '<option value="Open Captions" >&nbsp; Open Captions</option>\n ' +
                                    '<option value="Rear Window" >&nbsp; Rear Window</option>\n ' +
                                    '<option value="Other" >&nbsp; Other</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="auditory_info_visual"> Auditory information is presented visually: </label> <select class="form-control" name="auditory_info_visual" id="auditory_info_visual" >\n';

                            if (communicationData[0].auditory_info_visual === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].auditory_info_visual === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="visual_info_auditory"> Visual information is presented audibly: </label><select class="form-control" name="visual_info_auditory" id="visual_info_auditory" >\n';

                            if (communicationData[0].visual_info_auditory === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].visual_info_auditory === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="website_text_reader"> If the establishment has a website, it is accessible to users of screen text readers: </label> <select class="form-control" name="website_text_reader" id="website_text_reader" >\n';

                            if (communicationData[0].website_text_reader === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].website_text_reader === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="alt_contact"> There are alternate means for patrons to order, contact, or schedule: </label><select class="form-control" name="alt_contact" id="alt_contact" >\n';

                            if (communicationData[0].alt_contact === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].alt_contact === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="alt_contact_type"> Type of alternate means - Text/On-line/Phone: </label> <select class="form-control" name="alt_contact_type" id="alt_contact_type" >\n';

                            if (communicationData[0].alt_contact_type === "Text") {
                                bodyHtml += '<option value="Text" selected>&nbsp; Text</option>\n' +
                                    '<option value="On-line" >&nbsp; On-line</option>\n ' +
                                    '<option value="Phone" >&nbsp; Phone</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].alt_contact_type === "On-line") {
                                bodyHtml += '<option value="Text" >&nbsp; Text</option>\n' +
                                    '<option value="On-line" selected>&nbsp; On-line</option>\n ' +
                                    '<option value="Phone" >&nbsp; Phone</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].alt_contact_type === "Phone") {
                                bodyHtml += '<option value="Text" >&nbsp; Text</option>\n' +
                                    '<option value="On-line" >&nbsp; On-line</option>\n ' +
                                    '<option value="Phone" selected>&nbsp; Phone</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else {
                                bodyHtml += '<option value="Text" >&nbsp; Text</option>\n' +
                                    '<option value="On-line" >&nbsp; On-line</option>\n ' +
                                    '<option value="Phone" >&nbsp; Phone</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="shopping_assist"> The establishment offers shopping assistance or delivery: </label> <select class="form-control" name="shopping_assist" id="shopping_assist" >\n';

                            if (communicationData[0].shopping_assist === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].shopping_assist === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="assist_service"> Type of service - Shopping Assistance/Delivery: </label><select class="form-control" name="assist_service" id="assist_service" >\n';

                            if (communicationData[0].assist_service === "Shopping Assistance") {
                                bodyHtml += '<option value="Shopping Assistance" selected>&nbsp; Shopping Assistance</option>\n' +
                                    '<option value="Delivery" >&nbsp; Delivery</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assist_service === "Delivery") {
                                bodyHtml += '<option value="Shopping Assistance" >&nbsp; Shopping Assistance</option>\n' +
                                    '<option value="Delivery" selected>&nbsp; Delivery</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Shopping Assistance" >&nbsp; Shopping Assistance</option>\n' +
                                    '<option value="Delivery" >&nbsp; Delivery</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-4"><label for="assist_fee"> Is there a fee for the service: </label> <select class="form-control" name="assist_fee" id="assist_fee" >\n';

                            if (communicationData[0].assist_fee === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].assist_fee === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-3"><label for="store_scooter"> If this is a store, there are wheelchairs or scooters available for customer use: </label> <select class="form-control" name="store_scooter" id="store_scooter" >\n';

                            if (communicationData[0].store_scooter === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].store_scooter === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="scooter_fee"> Is there a fee to use wheelchairs or scooters: </label> <select class="form-control" name="scooter_fee" id="scooter_fee" >\n';

                            if (communicationData[0].scooter_fee === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].scooter_fee === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="scooter_location"> Location of wheelchairs or scooters: </label> <input type="text" class="form-control" name="scooter_location" id="scooter_location" value="'+communicationData[0].scooter_location+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="restaurant_allergies"> If this is a restaurant, information is available on food allergies, sensitivities: </label> <select class="form-control" name="restaurant_allergies" id="restaurant_allergies" >\n';

                            if (communicationData[0].restaurant_allergies === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].restaurant_allergies === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-6"><label for="staff_disable_trained"> The staff have received training within the past 12 months on how to provide “disability friendly” customer service to people with disabilities of all ages: </label> <select class="form-control" name="staff_disable_trained" id="staff_disable_trained" >\n';

                            if (communicationData[0].staff_disable_trained === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].staff_disable_trained === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="staff_disable_trained_desc"> If ‘yes’, describe the type of training, how it was delivered, and how often it is provided: </label> <input type="text" class="form-control" name="staff_disable_trained_desc" id="staff_disable_trained_desc" value="'+communicationData[0].staff_disable_trained_desc+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-3"><label for="items_reach"> All items are within reach, or assistance is offered to reach them: </label> <select class="form-control" name="items_reach" id="items_reach" >\n';

                            if (communicationData[0].items_reach === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].items_reach === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="service_alt_manner"> If goods and services are not accessible, they are provided in an alternative manner: </label><select class="form-control" name="service_alt_manner" id="service_alt_manner" >\n';

                            if (communicationData[0].service_alt_manner === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].service_alt_manner === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="senior_discount"> The establishment offers a senior discount: </label><select class="form-control" name="senior_discount" id="senior_discount" >\n';

                            if (communicationData[0].senior_discount === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].senior_discount === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '            <div class="col-3"><label for="senior_age"> If ‘yes’, what age is considered ‘senior’: </label> <input type="number" min="0" class="form-control" name="senior_age" id="senior_age" value="'+communicationData[0].senior_age+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="annual_A4A_review"> Management has agreed to annual A4A reviews​: </label> <select class="form-control" name="annual_A4A_review" id="annual_A4A_review" >\n';

                            if (communicationData[0].annual_A4A_review === "Yes") {
                                bodyHtml += '<option value="Yes" selected>&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            }
                            else if (communicationData[0].annual_A4A_review === "No") {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" selected>&nbsp; No</option>\n ' +
                                    '<option value="N/A" >&nbsp; N/A</option>';
                            } else {
                                bodyHtml += '<option value="Yes" >&nbsp; Yes</option>\n' +
                                    '<option value="No" >&nbsp; No</option>\n ' +
                                    '<option value="N/A" selected>&nbsp; N/A</option>';
                            }

    bodyHtml += '       </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentCommunication"> Comments, reasons for “no” answers, additional information: </label><input type="text" class="form-control" name="commentCommunication" id="commentCommunication" value="'+communicationData[0].comment+'" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="recommendationsCommunication"> Recommendations: </label><input type="text" class="form-control" name="recommendationsCommunication" id="recommendationsCommunication" value="'+communicationData[0].recommendations+'" ></div>\n' +
        '            <input type="hidden" class="form-control" id="communication_id" value="'+communicationData[0].communication_id+'" >\n' +
        '            <input type="hidden" class="form-control" id="est_idCommunication" value="'+communicationData[0].est_id+'" >\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4">\n' +
        '                <button  type="submit" id="save_communication" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Communication Technologies & Customer Service</button>\n' +
        '            </div>\n' +
        '        </div>' +
        '   </form>';

    $('#communication_card').html(bodyHtml);

    $("#communication_view").validate({
        rules: {
            scooter_location: {
                maxlength: 5000
            },
            commentCommunication: {
                maxlength: 5000
            },
            recommendationsCommunication: {
                maxlength: 5000
            }
        },
        messages: {
            scooter_location:  " Must be less than 5000 characters.",
            commentCommunication:  " Must be less than 5000 characters.",
            recommendationsCommunication: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            updateCommunication();
        }
    });

}

function updateCommunication() {
    var communication_id = document.getElementById("communication_id").value;
    var public_phone = document.getElementById("public_phone").value;
    var phone_clearance = document.getElementById("phone_clearance").value;
    var num_phone = document.getElementById("num_phone").value;
    var tty = document.getElementById("tty").value;
    var staff_tty = document.getElementById("staff_tty").value;
    var assisted_listening = document.getElementById("assisted_listening").value;
    var assisted_listen_type = document.getElementById("assisted_listen_type").value;
    var assisted_listen_receiver = document.getElementById("assisted_listen_receiver").value;
    var listening_signage = document.getElementById("listening_signage").value;
    var staff_listening = document.getElementById("staff_listening").value;
    var acoustics = document.getElementById("acoustics").value;
    var acoustics_level = document.getElementById("acoustics_level").value;
    var alt_comm_methods = document.getElementById("alt_comm_methods").value;
    var alt_comm_type = document.getElementById("alt_comm_type").value;
    var staff_ASL = document.getElementById("staff_ASL").value;
    var captioning_default = document.getElementById("captioning_default").value;
    var theater_captioning = document.getElementById("theater_captioning").value;
    var theater_capt_type = document.getElementById("theater_capt_type").value;
    var auditory_info_visual = document.getElementById("auditory_info_visual").value;
    var visual_info_auditory = document.getElementById("visual_info_auditory").value;
    var website_text_reader = document.getElementById("website_text_reader").value;
    var alt_contact = document.getElementById("alt_contact").value;
    var alt_contact_type = document.getElementById("alt_contact_type").value;
    var shopping_assist = document.getElementById("shopping_assist").value;
    var assist_service = document.getElementById("assist_service").value;
    var assist_fee = document.getElementById("assist_fee").value;
    var store_scooter = document.getElementById("store_scooter").value;
    var scooter_fee = document.getElementById("scooter_fee").value;
    var scooter_location = document.getElementById("scooter_location").value;
    var restaurant_allergies = document.getElementById("restaurant_allergies").value;
    var staff_disable_trained = document.getElementById("staff_disable_trained").value;
    var staff_disable_trained_desc = document.getElementById("staff_disable_trained_desc").value;
    var items_reach = document.getElementById("items_reach").value;
    var service_alt_manner = document.getElementById("service_alt_manner").value;
    var senior_discount = document.getElementById("senior_discount").value;
    var senior_age = document.getElementById("senior_age").value;
    var annual_A4A_review = document.getElementById("annual_A4A_review").value;
    var comment = document.getElementById("commentCommunication").value;
    var recommendations = document.getElementById("recommendationsCommunication").value;
    var est_id = document.getElementById("est_idCommunication").value;

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/communication/est/" + est_id,
        data: JSON.stringify({
            "communication_id": communication_id,
            "public_phone": public_phone,
            "phone_clearance": phone_clearance,
            "num_phone": num_phone,
            "tty": tty,
            "staff_tty": staff_tty,
            "assisted_listening": assisted_listening,
            "assisted_listen_type": assisted_listen_type,
            "assisted_listen_receiver": assisted_listen_receiver,
            "listening_signage": listening_signage,
            "staff_listening": staff_listening,
            "acoustics": acoustics,
            "acoustics_level": acoustics_level,
            "alt_comm_methods": alt_comm_methods,
            "alt_comm_type": alt_comm_type,
            "staff_ASL": staff_ASL,
            "captioning_default": captioning_default,
            "theater_captioning": theater_captioning,
            "theater_capt_type": theater_capt_type,
            "auditory_info_visual": auditory_info_visual,
            "visual_info_auditory": visual_info_auditory,
            "website_text_reader": website_text_reader,
            "alt_contact": alt_contact,
            "alt_contact_type": alt_contact_type,
            "shopping_assist": shopping_assist,
            "assist_service": assist_service,
            "assist_fee": assist_fee,
            "store_scooter": store_scooter,
            "scooter_fee": scooter_fee,
            "scooter_location": scooter_location,
            "restaurant_allergies": restaurant_allergies,
            "staff_disable_trained": staff_disable_trained,
            "staff_disable_trained_desc": staff_disable_trained_desc,
            "items_reach": items_reach,
            "service_alt_manner": service_alt_manner,
            "senior_discount": senior_discount,
            "senior_age": senior_age,
            "annual_A4A_review": annual_A4A_review,
            "comment": comment,
            "recommendations": recommendations
        }),
        success: function () {
            $("#success-body").html('Communication Technologies & Customer Service Updated');
            $("#success").modal('toggle');
            CommunicationView();
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}


