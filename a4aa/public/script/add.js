var EST_ID = 0;
var PARK_ID = 0;
var STA_ID = 0;
var RESTROOM_ID = 0;
var SECTION = "";
var NEXT_FUNCTION = "";
var bodyHtml = "";

$(document).ready(function () {
    CheckPriorSurvey();
});

function CheckPriorSurvey() {

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: 'get/auto_save/user/' + user_id,
        success: function (data) {
            if(!($.isEmptyObject(data))) {
                EST_ID = data[0].est_id;
                PARK_ID = data[0].park_id;
                STA_ID = data[0].sta_id;
                RESTROOM_ID = data[0].restroom_id;
                SECTION = data[0].section_name;
                NEXT_FUNCTION = data[0].next_function;

                if (EST_ID) {
                    var est_name = "";

                    $.ajax({
                        async: false,
                        accepts: "application/json",
                        method: "GET",
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        url: "get/establishment/" + EST_ID,
                        success: function (data) {
                            if(!($.isEmptyObject(data))) {
                                est_name = data[0].name;
                            }
                        },
                        error: function (data) {
                            $("#alert-body").empty();
                            $("#alert-body").append(data);
                            $("#alert").modal('toggle');
                        }
                    });

                    if (est_name) {

                        $('#gen-title').html('Continue Survey');

                        bodyHtml = '<div class="card-row-report">\n' +
                            '<span class="card-text col-12">A partially completed survey for \"' + est_name + '\" has been detected.</span>\n' +
                            '</div>\n ' +
                            '<div class="card-row-report">\n' +
                            '<span class="card-text col-12">Do you wish to resume this survey?</span>\n' +
                            '</div>\n ';

                        $('#gen-body').html(bodyHtml);

                        $('#gen-footer').html('<div class="col-12">\n' +
                            '<button  type="button" id="restore_survey" class="btn btn-success" data-dismiss="modal" onclick="' + NEXT_FUNCTION + '"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
                            '<button  type="button" class="btn btn-secondary" data-dismiss="modal" onclick="DeleteAutoSave(1)" aria-label="No"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
                            '</div>');
                        $('#restore_survey').focus();
                        $("#gen-modal").modal('toggle');
                    }
                    else
                        addEstablishmentView();
                }
            }
            else
                addEstablishmentView();
        }
    });

}

function AutoSave(section_name, next_function, type) {

    console.log("user_id: " + user_id);
    console.log("EST_ID: " + EST_ID);
    console.log("PARK_ID: " + PARK_ID);
    console.log("STA_ID: " + STA_ID);
    console.log("RESTROOM_ID: " + RESTROOM_ID);
    console.log("section_name: " + section_name);
    console.log("next_function: " + next_function);

    $.ajax({
        accepts: "application/json",
        method: type,
        contentType: "application/json; charset=utf-8",
        url: type + "/auto_save/",
        data: JSON.stringify({
            "user_id" : user_id,
            "est_id" : EST_ID,
            "park_id" : PARK_ID,
            "sta_id" : STA_ID,
            "restroom_id" : RESTROOM_ID,
            "section_name" : section_name,
            "next_function" : next_function
        }),
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}


function DeleteAutoSave(value) {
    $.ajax({
        async: false,
        accepts: "application/json",
        method: "DELETE",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: 'delete/auto_save/user/'+user_id+'/est/'+EST_ID
    });

    if(value === 1)
        addEstablishmentView();
}

function addEstablishmentView() {
    var categoryData = "";
    var configData = "";
    var userData = "";

    $('#cardBody').empty();

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

    $('#collapseTitle').html('New Premises Information');
    $('#cardTitle').html('New Premises Information');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_establishment">\n ' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="name"> Establishment Name: </label><input type="text" class="form-control" name="name" id="name" ></div>\n' +
        '            <div class="col-6"><label for="website"> Website: </label><input type="url" placeholder="http://www.website.com" class="form-control" name="website" id="website" ></div>\n' +
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
        '<div class="col-4"><label for="subtype"> Subtype: </label><input type="text" class="form-control" name="subtype" id="subtype" ></div>\n' +
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
        '            <div class="col-12"><label for="street"> Street: </label><input type="text" class="form-control" name="street" id="street"></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="city"> City: </label><input type="text" class="form-control" name="city" id="city" ></div>\n' +
        '            <div class="col-2"><label for="state"> State: </label><select class="form-control" name="state" id="state">\n' +
        '               <option value="" disabled >Please select one</option>\n' +
        '               <option value="AL">AL</option>\n' +
        '               <option value="AK">AK</option>\n' +
        '               <option value="AZ">AZ</option>\n' +
        '               <option value="AR">AR</option>\n' +
        '               <option value="CA">CA</option>\n' +
        '               <option value="CO">CO</option>\n' +
        '               <option value="CT">CT</option>\n' +
        '               <option value="DE">DE</option>\n' +
        '               <option value="DC">DC</option>\n' +
        '               <option value="FL">FL</option>\n' +
        '               <option value="GA">GA</option>\n' +
        '               <option value="HI">HI</option>\n' +
        '               <option value="ID">ID</option>\n' +
        '               <option value="IL">IL</option>\n' +
        '               <option value="IN">IN</option>\n' +
        '               <option value="IA">IA</option>\n' +
        '               <option value="KS">KS</option>\n' +
        '               <option value="KY">KY</option>\n' +
        '               <option value="LA">LA</option>\n' +
        '               <option value="ME">ME</option>\n' +
        '               <option value="MD">MD</option>\n' +
        '               <option value="MA">MA</option>\n' +
        '               <option value="MI">MI</option>\n' +
        '               <option value="MN">MN</option>\n' +
        '               <option value="MS">MS</option>\n' +
        '               <option value="MO">MO</option>\n' +
        '               <option value="MT">MT</option>\n' +
        '               <option value="NE">NE</option>\n' +
        '               <option value="NV">NV</option>\n' +
        '               <option value="NH">NH</option>\n' +
        '               <option value="NJ">NJ</option>\n' +
        '               <option value="NM">NM</option>\n' +
        '               <option value="NY">NY</option>\n' +
        '               <option value="NC">NC</option>\n' +
        '               <option value="ND">ND</option>\n' +
        '               <option value="OH">OH</option>\n' +
        '               <option value="OK">OK</option>\n' +
        '               <option value="OR">OR</option>\n' +
        '               <option value="PA">PA</option>\n' +
        '               <option value="RI">RI</option>\n' +
        '               <option value="SC">SC</option>\n' +
        '               <option value="SD">SD</option>\n' +
        '               <option value="TN">TN</option>\n' +
        '               <option value="TX">TX</option>\n' +
        '               <option value="UT">UT</option>\n' +
        '               <option value="VT">VT</option>\n' +
        '               <option value="VA">VA</option>\n' +
        '               <option value="WA" selected>WA</option>\n' +
        '               <option value="WV">WV</option>\n' +
        '               <option value="WI">WI</option>\n' +
        '               <option value="WY">WY</option>\n ' +
        '               </select>\n ' +
        '               </div>' +
        '            <div class="col-4"><label for="zip"> Zip: </label><input class="form-control" name="zip" id="zip" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-6"><label for="phone"> Main Phone: </label><input type="tel" placeholder="509-555-1234" class="form-control" name="phone" id="phone" ></div>\n' +
        '            <div class="col-6"><label for="phone_tty"> TTY/TTD: </label><input type="tel" placeholder="509-555-1234" class="form-control" name="phone_tty" id="phone_tty" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="contact_fname"> Contact First Name: </label><input type="text" class="form-control" name="contact_fname" id="contact_fname" ></div>\n' +
        '            <div class="col-4"><label for="contact_lname"> Contact Last Name: </label><input type="text" class="form-control" name="contact_lname" id="contact_lname" ></div>\n' +
        '            <div class="col-4"><label for="contact_title"> Contact Title: </label><input type="text" class="form-control" name="contact_title" id="contact_title" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-4"><label for="contact_email"> Email: </label><input type="email" class="form-control" name="contact_email" id="contact_email" ></div>\n' +
        '       <div class="col-4">\n' +
        '           <label for="user_id"> Surveyor: </label><select class="form-control" name="user_id" name="user_id" id="user_id" required>\n' +
        '               <option value="" disabled selected>Please select one</option>\n';

    for (var i = 0; i < userData.length; i ++) {
        bodyHtml += '<option value="'+userData[i].user_id+'">&nbsp;'+userData[i].fname+' '+userData[i].lname +'</option>\n';
    }

    bodyHtml += '</select>\n' +
        '</div>\n' +
        '            <div class="col-4"><label for="date"> Survey Date: </label><input type="date" min="2010-01-01" class="form-control"  name="date"  id="date" required></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '            <div class="col-12"><label for="commentEstablishment"> Comment: </label><input type="text" class="form-control"  name="commentEstablishment" id="commentEstablishment"></div>\n' +
        '        </div>\n' +
        '   <div class="card-row">\n' +
        '       <div class="col-4">\n' +
        '           <button  type="submit" id="save_establishment" class="btn btn-success"><i class="fas fa-save"></i>&nbsp; Save Premises Information</button>\n' +
        '       </div>\n'+
        '   </div>\n'+
        '</form>';

    $('#cardBody').append(bodyHtml);
    $('#name').focus();

    $("#add_establishment").validate({
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
            state: " Must select one from the list.",
            zip: " US Zip Code: 12345 or 12345-1234.",
            phone: " US Phone: 1(509)555-1234, (509)555-1234, 1-509-555-1234, 509-555-1234.",
            phone_tty: " US Phone: 1(509)555-1234, (509)555-1234, 1-509-555-1234, 509-555-1234.",
            contact_fname: " Must be less than 256 characters long.",
            contact_lname: " Must be less than 256 characters long.",
            contact_title: " Must be less than 256 characters long.",
            contact_email: " Must be a valid email address.",
            user_id: " Must select one from the list.",
            date: " Must be a valid date.",
            config_comment: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            addEstablishment();
        }
    });

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
                    AutoSave('establishment', 'isParking()', 'post');
                },
                error: function(data) {
                    console.log(JSON.stringify(data));
                }
            });

            $('#cardTitle').html('Premises Information Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Parking Section loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            isParking();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });
}


function isParking() {


    $('#collapseTitle').html('New Parking');
    $('#cardTitle').html('New Parking');
    window.scrollTo(0,0);

    bodyHtml = '<div class="card-row">\n' +
        '<span class="card-text">Is there parking available near or at the location?</span>\n'+
        '</div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="button" id="is_parking" class="btn btn-success" onclick="addParkingView()"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
        '<button  type="button" id="is_not_parking" class="btn btn-secondary" onclick="addNoParking()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
        '</div>');
    $('#is_parking').focus();
}

function addNoParking() {

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/parking/est/" + EST_ID,
        success: function () {

            $.ajax({
                async: false,
                dataType: 'json',
                url: 'get/park_id/est/' + EST_ID,
                success: function (data) {
                    PARK_ID = data[0].park_id;
                    AutoSave('no_parking', 'addPassengerLoadingView()', 'put');
                },
                error: function(data) {
                    $("#alert-body").empty();
                    $("#alert-body").append(data);
                    $("#alert").modal('toggle');
                }
            });

            $('#cardTitle').html('No Parking Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Passenger Loading Zones loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            addPassengerLoadingView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addParkingView() {

    $('#cardFooter').html('');
    $('#collapseTitle').html('New Parking');
    $('#cardTitle').html('New Parking');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_parking">\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lot_free"> Lot parking Free/Paid: </label><select class="form-control" name="lot_free" id="lot_free">\n';
    bodyHtml += addGenSelectOptions(freePaidNAOptions);
    bodyHtml += '</select>\n' +
        '    </div>\n' +
        '    <div class="col-4"><label for="street_metered"> Street parking Metered/Not Metered: </label><select class="form-control" name="street_metered" id="street_metered" >\n';
    bodyHtml += addGenSelectOptions(meteredNotOptions);
    bodyHtml += '</select>\n' +
        '</div>\n' +
        '    <div class="col-4"><label for="parking_type"> Other type of parking: </label><input type="text" class="form-control" name="parking_type" id="parking_type" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="total_num_spaces"> Total number of spaces: </label> <input type="number" min="0" class="form-control" name="total_num_spaces" id="total_num_spaces" ></div>\n' +
        '    <div class="col-6"><label for="num_reserved_spaces"> Number of reserved spaces: </label><input type="number" min="0" class="form-control" name="num_reserved_spaces" id="num_reserved_spaces" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="num_accessable_space"> Number of accessible spaces: </label><input type="number" min="0"  class="form-control" id="num_accessable_space" id="num_accessable_space" ></div>\n' +
        '    <div class="col-6"><label for="num_van_accessible"> Number of van accessible spaces: </label><input type="number" min="0"  class="form-control" id="num_van_accessible" id="num_van_accessible" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="reserve_space_sign"> Reserved space signage is unobstructed: </label><select class="form-control" name="reserve_space_sign" id="reserve_space_sign" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '</div>\n' +
        '    <div class="col-6"><label for="reserve_space_obstacles"> Reserved parking free of obstacles: </label><select class="form-control" name="reserve_space_obstacles" id="reserve_space_obstacles" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="comment"> Describe parking area: </label><input class="form-control" name="comment" id="comment" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendations"> Recommendations: </label><input class="form-control" name="recommendations" id="recommendations" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_parking" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Parking</button>\n' +
        '   </div>\n' +
        '</div>\n' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#lot_free').focus();

    $("#add_parking").validate({
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
            parking_type: " Must be less than 25 characters long.",
            total_num_spaces: " Must be a number.",
            num_reserved_spaces: " Must be a number.",
            num_accessable_space: " Must be a number.",
            num_van_accessible: " Must be a number.",
            comment:  " Must be less than 5000 characters.",
            recommendations: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            addParking();
        }
    });
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
                    AutoSave('parking', 'addRouteFromParkingView()', 'put');
                },
                error: function(data) {
                    $("#alert-body").empty();
                    $("#alert-body").append(data);
                    $("#alert").modal('toggle');
                }
            });

            $('#cardTitle').html('Parking Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Route From Accessible Parking loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            addRouteFromParkingView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addRouteFromParkingView() {


    $('#collapseTitle').html('New Route From Accessible Parking');
    $('#cardTitle').html('New Route From Accessible Parking');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_route_from_parking">\n ' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="distance"> Distance from reserved parking to accessible entrance (feet): </label> <input type="number" min="0" class="form-control" name="distance" id="distance" ></div>\n' +
        '    <div class="col-4"><label for="min_width"> Route is minimum width and free of obstacles: </label><select class="form-control" name="min_width" id="min_width" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="route_surface"> Route surface is level, unbroken, firm, slip-resistant: </label><select class="form-control" name="route_surface" id="route_surface">\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="route_curbs"> Route has curb ramps and curb cuts where needed: </label> <select class="form-control" name="route_curbs" id="route_curbs" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="tactile_warning"> Tactile warning strips are installed: </label><select class="form-control" name="tactile_warning" id="tactile_warning" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="covered"> Route from parking to accessible entrance is covered: </label><select class="form-control" name="covered" id="covered" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lighting"> Lighting is adequate: </label><select class="form-control" name="lighting" id="lighting" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_option"> Lighting level day/night: </label><select class="form-control" name="lighting_option" id="lighting_option" >\n';
    bodyHtml += addGenSelectOptions(dayNightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_type"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_type" id="lighting_type" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentRouteFromParking"> Describe the route: </label><input type="text" class="form-control" name="commentRouteFromParking" id="commentRouteFromParking" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsRouteFromParking"> Recommendations: </label><input type="text" class="form-control" name="recommendationsRouteFromParking" id="recommendationsRouteFromParking" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n' +
        '<div class="col-4">\n' +
        '<button  type="submit" id="save_establishment" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Route From Accessible Parking</button>\n' +
        '</div>\n ' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#distance').focus();

    $('#cardFooter').html('');
    $("#add_route_from_parking").validate({
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
            addRouteFromParking();
        }
    });

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
        method: "POST",
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

            AutoSave('route_from_parking', 'addPassengerLoadingView()', 'put');

            $('#cardTitle').html('Route From Accessible Parking Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Passenger Loading Zones loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            addPassengerLoadingView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addPassengerLoadingView() {


    $('#collapseTitle').html('New Passenger Loading Zones');
    $('#cardTitle').html('New Passenger Loading Zones');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_passenger_loading">\n ' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="designated_zonePassengerLoading"> There is a designated passenger loading zone: </label> <select class="form-control" name="designated_zonePassengerLoading" id="designated_zonePassengerLoading" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="distancePassengerLoading"> Distance from passenger loading zone (feet): </label> <input type="number" min="0" class="form-control" name="distancePassengerLoading" id="distancePassengerLoading"></div>\n' +
        '    <div class="col-4"><label for="min_widthPassengerLoading"> Route is minimum width and free of obstacles: </label><select class="form-control" name="min_widthPassengerLoading" id="min_widthPassengerLoading" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="passenger_surfacePassengerLoading"> Route surface is level, unbroken, firm, slip-resistant: </label><select class="form-control" name="passenger_surfacePassengerLoading" id="passenger_surfacePassengerLoading" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="tactile_warning_stripsPassengerLoading"> Tactile warning strips are installed:</label><select class="form-control" name="tactile_warning_stripsPassengerLoading" id="tactile_warning_stripsPassengerLoading" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="passenger_curbs"> Route has curb ramps and curb cuts where needed: </label><select class="form-control" name="passenger_curbs" id="passenger_curbs" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="coveredPassengerLoading"> Route from parking to accessible entrance is covered: </label><select class="form-control" name="coveredPassengerLoading" id="coveredPassengerLoading" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lightingPassengerLoading"> Lighting is adequate: </label><select class="form-control" name="lightingPassengerLoading" id="lightingPassengerLoading" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_optionPassengerLoading"> Lighting level day/night: </label><select class="form-control" name="lighting_optionPassengerLoading" id="lighting_optionPassengerLoading" >\n' ;
    bodyHtml += addGenSelectOptions(dayNightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_typePassengerLoading"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typePassengerLoading" id="lighting_typePassengerLoading" >\n';
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentPassengerLoading"> Describe the route: </label><input type="text" class="form-control" name="commentPassengerLoading" id="commentPassengerLoading" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsPassengerLoading"> Recommendations: </label><input type="text" class="form-control" name="recommendationsPassengerLoading" id="recommendationsPassengerLoading" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_establishment" class="btn btn-success"><i class="fas fa-save"></i>&nbsp; Save Passenger Loading Zones</button>\n' +
        '   </div>\n ' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#designated_zonePassengerLoading').focus();

    $('#cardFooter').html('');
    $("#add_passenger_loading").validate({
        rules: {
            distancePassengerLoading: {
                number: true
            },
            commentPassengerLoading: {
                maxlength: 5000
            },
            recommendationsPassengerLoading: {
                maxlength: 5000
            }
        },
        messages: {
            commentPassengerLoading:  " Must be less than 5000 characters.",
            recommendationsPassengerLoading: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            addPassengerLoading();
        }
    });

}

function addPassengerLoading() {
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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/passenger_loading/",
        data: JSON.stringify({
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
            "recommendations" : recommendations,
            "park_id" : PARK_ID
        }),
        success: function () {

            AutoSave('passenger_loading', 'addSTABusView()', 'put');

            $('#cardTitle').html('Passenger Loading Zones Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>STA Bus Information loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            addSTABusView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addSTABusView() {


    $('#collapseTitle').html('New STA Bus Information');
    $('#cardTitle').html('New STA Bus Information');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_sta">\n ' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="sta_service_area"> Establishment is within the STA Service Area: </label> <select class="form-control" name="sta_service_area" id="sta_service_area" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="fixed_stop"> Access to Spokane Transit Area Fixed BUS STOP: </label><br>\n' +
        '       <span class="alert-text">You will be prompted to add STA Routes after saving this section</span>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="distanceStaBus"> Distance from nearest bus stop (feet): </label> <input type="number" min="0" class="form-control" name="distanceStaBus" id="distanceStaBus" ></div>\n' +
        '    <div class="col-6"><label for="min_widthStaBus"> Route is minimum width and free of obstacles: </label><select class="form-control" name="min_widthStaBus" id="min_widthStaBus" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="route_surfaceStaBus"> Route surface is level, unbroken, firm, slip-resistant: </label><select class="form-control" name="route_surfaceStaBus" id="route_surfaceStaBus" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="tactile_warning_stripsStaBus"> Tactile warning strips are installed: </label><select class="form-control" name="tactile_warning_stripsStaBus" id="tactile_warning_stripsStaBus" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="curb_cutsStaBus"> Route has curb ramps and curb cuts where needed: </label><select class="form-control" name="curb_cutsStaBus" id="curb_cutsStaBus" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-3"><label for="lightingStaBus"> Lighting is adequate: </label><select class="form-control" name="lightingStaBus" id="lightingStaBus" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="lighting_optionStaBus"> Lighting level day/night: </label><select class="form-control" name="lighting_optionStaBus" id="lighting_optionStaBus" >\n' ;
    bodyHtml += addGenSelectOptions(dayNightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="lighting_typeStaBus"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeStaBus" id="lighting_typeStaBus" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="shelter_bench"> Shelter or Bench at bust stop: </label><select class="form-control" name="shelter_bench" id="shelter_bench" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentStaBus"> Describe the route: </label><input type="text" class="form-control" name="commentStaBus" id="commentStaBus" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsStaBus"> Recommendations: </label><input type="text" class="form-control" name="recommendationsStaBus" id="recommendationsStaBus" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n' +
        '<div class="col-4">\n' +
        '<button  type="submit" id="save_establishment" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save STA Bus Information</button>\n' +
        '</div>\n ' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#sta_service_area').focus();

    $('#cardFooter').html('');
    $("#add_sta").validate({
        rules: {
            distanceStaBus: {
                number: true
            },
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
            addSTABus();
        }
    });

}

function addSTABus() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/sta_bus/",
        data: JSON.stringify({
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
            "recommendations" : recommendations,
            "park_id" : PARK_ID
        }),
        success: function () {

            AutoSave('sta_bus_info', 'isSTARoute()', 'put');

            $('#cardTitle').html('STA Bus Information');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Exterior Pathways loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            isSTARoute();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function isSTARoute() {

    $('#collapseTitle').html('New STA Route');
    $('#cardTitle').html('New STA Route');
    window.scrollTo(0,0);

    bodyHtml = '<div class="card-row">\n' +
        '<span class="card-text">Add new STA Route(s)?</span>\n'+
        '</div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="submit" id="is_sta_route" class="btn btn-success" onclick="addSTARouteView()"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
        '<button  type="submit" id="is_not_sta_route" class="btn btn-secondary" onclick="addExteriorPathwaysView()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
        '</div>');
    $('#is_sta_route').focus();
}

function addSTARouteView() {

    $('#collapseTitle').html('New STA Route');
    $('#cardTitle').html('New STA Route');
    window.scrollTo(0,0);

    $('#cardBody').html( '<form id="add_sta_route">\n' +
        '<div class="card-row">\n' +
        '   <div class="col-3"><label for="route_numEdit"> Route Number: </label><input type="number" min="0" class="form-control" name="route_numEdit" id="route_numEdit" ></div>\n' +
        '</div>\n'+
        '<div class="card-row">\n' +
        '   <div class="col-3"><label for="north_bound_stopEdit"> North Bound Stop: </label><input type="number" min="0" class="form-control" name="north_bound_stopEdit" id="north_bound_stopEdit" ></div>\n' +
        '   <div class="col-3"><label for="south_bound_stopEdit"> South Bound Stop: </label><input type="number" min="0" class="form-control" name="south_bound_stopEdit" id="south_bound_stopEdit" ></div>\n' +
        '   <div class="col-3"><label for="east_bound_stopEdit"> East Bound Stop: </label><input type="number" min="0" class="form-control" name="east_bound_stopEdit" id="east_bound_stopEdit" ></div>\n' +
        '   <div class="col-3"><label for="west_bound_stopEdit"> West Bound Stop: </label><input type="number" min="0" class="form-control" name="west_bound_stopEdit" id="west_bound_stopEdit" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n ' +
        '   <span>\n ' +
        '       <button type="submit" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save STA Route</button>&nbsp;\n' +
        '       <button type="submit" class="btn btn-secondary" onclick="addExteriorPathwaysView()">Cancel</button>\n ' +
        '   </span>\n' +
        '</div>\n ' +
        '</form>'
    );
    $('#route_numEdit').focus();

    $('#cardFooter').html('');
    $("#add_sta_route").validate({
        rules: {
            route_numEdit: {
                number: true
            },
            north_bound_stopEdit: {
                number: true
            },
            south_bound_stopEdit: {
                number: true
            },
            east_bound_stopEdit: {
                number: true
            },
            west_bound_stopEdit: {
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

    var route_num = document.getElementById("route_numEdit").value;
    var north_bound_stop = document.getElementById("north_bound_stopEdit").value;
    var south_bound_stop = document.getElementById("south_bound_stopEdit").value;
    var east_bound_stop = document.getElementById("east_bound_stopEdit").value;
    var west_bound_stop = document.getElementById("west_bound_stopEdit").value;

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

            AutoSave('sta_route', 'addExteriorPathwaysView()', 'put');

            $('#collapseTitle').html('STA Route Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span class="card-text">Add another STA Route?</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<div class="col-4">\n' +
                '<button  type="submit" id="is_another_sta" class="btn btn-success" onclick="addSTARouteView()"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
                '<button  type="submit" id="is_not_another_sta" class="btn btn-secondary" onclick="addExteriorPathwaysView()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
                '</div>');
            $('#is_another_sta').focus();

        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });
}

function addExteriorPathwaysView() {

    $('#collapseTitle').html('New Exterior Pathways');
    $('#cardTitle').html('New Exterior Pathways');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_exterior_pathways">\n ' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="service_animal"> There is a service animal relief area on the premises or within 1 block: </label> <select class="form-control" name="service_animal" id="service_animal" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-8"><label for="service_animal_location"> Location of service animal relief: </label> <input type="text" class="form-control" name="service_animal_location" id="service_animal_location" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="has_exterior_path"> The establishment has exterior pathways/walkways: </label> <select class="form-control" name="has_exterior_path" id="has_exterior_path" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="min_widthExteriorPathway"> Pathway is minimum width and free of obstacles: </label><select class="form-control" name="min_widthExteriorPathway" id="min_widthExteriorPathway" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="pathway_surface"> Pathway surface is level, unbroken, firm, slip-resistant: </label><select class="form-control" name="pathway_surface" id="pathway_surface" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="pathway_curbs"> Route has curb ramps and curb cuts where needed: </label><select class="form-control" name="pathway_curbs" id="pathway_curbs" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="tactile_warningExteriorPathway"> Tactile warning strips are installed: </label><select class="form-control" name="tactile_warningExteriorPathway" id="tactile_warningExteriorPathway" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="slope"> Slope of the pathway is no steeper than 1:20: </label><select class="form-control" name="slope" id="slope" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lightingExteriorPathway"> Lighting is adequate: </label><select class="form-control" name="lightingExteriorPathway" id="lightingExteriorPathway" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_optionExteriorPathway"> Lighting level day/night: </label><select class="form-control" name="lighting_optionExteriorPathway" id="lighting_optionExteriorPathway" >\n' ;
    bodyHtml += addGenSelectOptions(dayNightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_typeExteriorPathway"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeExteriorPathway" id="lighting_typeExteriorPathway" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentExteriorPathway"> Describe the route: </label><input type="text" class="form-control" name="commentExteriorPathway" id="commentExteriorPathway" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsExteriorPathway"> Recommendations: </label><input type="text" class="form-control" name="recommendationsExteriorPathway" id="recommendationsExteriorPathway" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_establishment" class="btn btn-success" onclick="addExteriorPathways()"><i class="fas fa-save"></i>&nbsp; Save Exterior Pathways</button>\n' +
        '   </div>\n ' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#service_animal').focus();

    $('#cardFooter').html('');
    $("#add_exterior_pathways").validate({
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
            commentExteriorPathway:  " Must be less than 5000 characters.",
            recommendationsExteriorPathway: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            addExteriorPathways();
        }
    });
}

function addExteriorPathways() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/exterior_pathways/",
        data: JSON.stringify({
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
            "recommendations" : recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('exterior_pathways', 'isExteriorStairs()', 'put');

            $('#cardTitle').html('Exterior Pathways Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Exterior Stairs loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            isExteriorStairs();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function isExteriorStairs() {


    $('#collapseTitle').html('New Exterior Stairs');
    $('#cardTitle').html('New Exterior Stairs');
    window.scrollTo(0,0);

    bodyHtml = '<div class="card-row">\n' +
        '<span class="card-text">​Stairs are required OR are available to enter the establishment?</span>\n'+
        '</div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="submit" id="is_stairs" class="btn btn-success" onclick="addExteriorStairsView()"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
        '<button  type="submit" id="is__not_stairs" class="btn btn-secondary" onclick="addNoExteriorStairs()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
        '</div>');
    $('#is_stairs').focus();
}

function addNoExteriorStairs() {

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/exterior_stairs/" + EST_ID,
        success: function () {

            AutoSave('exterior_stairs', 'put');

            $('#cardTitle').html('No Exterior Stairs Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Exterior Ramps loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            isExteriorRamps();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addExteriorStairsView() {

    $('#collapseTitle').html('New Exterior Stairs');
    $('#cardTitle').html('New Exterior Stairs');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_exterior_stairs">\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="stairs_required"> Stairs are required: </label> <select class="form-control" name="stairs_required" id="stairs_required" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="stairs_available"> Stairs are available: </label> <select class="form-control" name="stairs_available" id="stairs_available" >\n';
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="num_stairs"> Number of stairs: </label> <input type="number" min="0" class="form-control" name="num_stairs" id="num_stairs" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="handrail_both_sides"> Both sides of stairs have handrails: </label> <select class="form-control" name="handrail_both_sides" id="handrail_both_sides" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="handrail_side"> Handrail sides Left/Right/None: </label><select class="form-control" name="handrail_side" id="handrail_side" >\n';
    bodyHtml += addGenSelectOptions(leftRightNoneOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-8"><label for="handrail_regulation_height"> Top of the handrail gripping surface is between 34” and 38” above the stair surface: </label><select class="form-control" name="handrail_regulation_height" id="handrail_regulation_height" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="handrail_height"> Handrail height: </label><input type="number" min="0" class="form-control" name="handrail_height" id="handrail_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="obstacles"> Stairs are clear of obstacles or protrusions: </label><select class="form-control" name="obstacles" id="obstacles" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="clearly_marked"> Stairs are clearly marked: </label><select class="form-control" name="clearly_marked" id="clearly_marked" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lightingExteriorStairs"> Lighting is adequate: </label><select class="form-control" name="lightingExteriorStairs" id="lightingExteriorStairs" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_optionExteriorStairs"> Lighting level day/night: </label><select class="form-control" name="lighting_optionExteriorStairs" id="lighting_optionExteriorStairs" >\n' ;
    bodyHtml += addGenSelectOptions(dayNightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_typeExteriorStairs"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeExteriorStairs" id="lighting_typeExteriorStairs" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentExteriorStairs"> Describe the route: </label><input type="text" class="form-control" name="commentExteriorStairs" id="commentExteriorStairs" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsExteriorStairs"> Recommendations: </label><input type="text" class="form-control" name="recommendationsExteriorStairs" id="recommendationsExteriorStairs" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_establishment" class="btn btn-success"><i class="fas fa-save"></i>&nbsp; Save Exterior Stairs</button>\n' +
        '   </div>\n' +
        '</div> \n' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#stairs_required').focus();

    $('#cardFooter').html('');
    $("#add_exterior_stairs").validate({
        rules: {
            num_stairs: {
                number: true
            },
            handrail_height: {
                number: true
            },
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
            addExteriorStairs();
        }
    });

}

function addExteriorStairs() {

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

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/exterior_stairs/",
        data: JSON.stringify({
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
            "recommendations" : recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('exterior_stairs', 'isExteriorRamps()', 'put');

            $('#cardTitle').html('Exterior Stairs Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Exterior Ramps loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            isExteriorRamps();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function isExteriorRamps() {


    $('#collapseTitle').html('New Exterior Ramps');
    $('#cardTitle').html('New Exterior Ramps');
    window.scrollTo(0,0);

    bodyHtml = '<div class="card-row">\n' +
        '<span class="card-text">One or more ramps is required or available to enter the establishment?</span>\n'+
        '</div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="button" id="is_ramps" class="btn btn-success" onclick="addExteriorRampsView()"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
        '<button  type="button" id="is_not_ramps" class="btn btn-secondary" onclick="addNoExteriorRamps()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
        '</div>');
    $('#is_ramps').focus();
}

function addNoExteriorRamps() {

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/exterior_ramps/" + EST_ID,
        success: function () {

            AutoSave('exterior_ramps', 'addMainEntranceView()', 'put');

            $('#cardTitle').html('No Exterior Ramps Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Main Entrance loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            addMainEntranceView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addExteriorRampsView() {

    $('#collapseTitle').html('New Exterior Ramps');
    $('#cardTitle').html('New Exterior Ramps');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_exterior_ramps">\n' +
        '<div class="card-row">\n' +
        '    <div class="col-3"><label for="ramp_required"> Ramps are required: </label> <select class="form-control" name="ramp_required" id="ramp_required" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="ramp_available"> Ramps are available: </label> <select class="form-control" name="ramp_available" id="ramp_available" >\n';
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="min_widthExteriorRamps"> Ramps are at least 36 inches wide: </label> <select class="form-control" name="min_widthExteriorRamps" id="min_widthExteriorRamps" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="width_between_handrails"> Ramps width: </label> <input type="number" min="0" class="form-control" name="width_between_handrails" id="width_between_handrails" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="min_slope"> For each section of ramp, the RUNNING SLOPE is no greater than 1:12: </label> <select class="form-control" name="min_slope" id="min_slope" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="slopeExteriorRamps"> Alternatively, the slope is less than 2 percent grade (%): </label><input type="number" min="0"  class="form-control" name="slopeExteriorRamps" id="slopeExteriorRamps" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="level_landing_both"> There is a level landing at the top and bottom of the ramp: </label> <select class="form-control" name="level_landing_both" id="level_landing_both" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="level_landing_location"> Landing location Top/Bottom: </label><select class="form-control" name="level_landing_location" id="level_landing_location" >\n';
    bodyHtml += addGenSelectOptions(topBottomOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="obstaclesExteriorRamps"> Ramps are clear of obstacles or protrusions: </label><select class="form-control" name="obstaclesExteriorRamps" id="obstaclesExteriorRamps" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="handrail_both_sides"> Both sides of stairs have handrails: </label> <select class="form-control" name="handrails_both_sides" id="handrails_both_sides" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="handrail_sides"> Handrail sides Left/Right/None: </label><select class="form-control" name="handrail_sides" id="handrail_sides" >\n';
    bodyHtml += addGenSelectOptions(leftRightNoneOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="handrail_regulation_heightExteriorRamps"> Top of the handrail gripping surface is between 34” and 38” above the stair surface: </label><select class="form-control" name="handrail_regulation_heightExteriorRamps" id="handrail_regulation_heightExteriorRamps" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="handrail_heightExteriorRamps"> Handrail height: </label><input type="number" min="0" class="form-control" name="handrail_heightExteriorRamps" id="handrail_heightExteriorRamps" ></div>\n' +
        '    <div class="col-4"><label for="side_guards"> Ramps have adequate side guards: </label><select class="form-control" name="side_guards" id="side_guards" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lightingExteriorRamps"> Lighting is adequate: </label><select class="form-control" name="lightingExteriorRamps" id="lightingExteriorRamps" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_optionExteriorRamps"> Lighting level day/night: </label><select class="form-control" name="lighting_optionExteriorRamps" id="lighting_optionExteriorRamps" >\n' ;
    bodyHtml += addGenSelectOptions(dayNightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_typeExteriorRamps"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeExteriorRamps" id="lighting_typeExteriorRamps" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentExteriorRamps"> Describe the route: </label><input type="text" class="form-control" name="commentExteriorRamps" id="commentExteriorRamps" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsExteriorRamps"> Recommendations: </label><input type="text" class="form-control" name="recommendationsExteriorRamps" id="recommendationsExteriorRamps" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_exterior_ramps" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Exterior Ramps</button>\n' +
        '   </div>\n ' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#ramp_required').focus();

    $('#cardFooter').html('');
    $("#add_exterior_ramps").validate({
        rules: {
            width_between_handrails: {
                number: true
            },
            slopeExteriorRamps: {
                number: true
            },
            handrail_heightExteriorRamps: {
                number: true
            },
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
            addExteriorRamps();
        }
    });

}

function addExteriorRamps() {

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
    var handrail_regulation_height = document.getElementById("handrail_regulation_heightExteriorRamps").value;
    var handrail_height = document.getElementById("handrail_heightExteriorRamps").value;
    var side_guards = document.getElementById("side_guards").value;
    var lighting = document.getElementById("lightingExteriorRamps").value;
    var lighting_option = document.getElementById("lighting_optionExteriorRamps").value;
    var lighting_type = document.getElementById("lighting_typeExteriorRamps").value;
    var comment = document.getElementById("commentExteriorRamps").value;
    var recommendations = document.getElementById("recommendationsExteriorRamps").value;

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/exterior_ramps/",
        data: JSON.stringify({
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
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('exterior_ramps', 'addMainEntranceView()', 'put');

            $('#cardTitle').html('Exterior Ramps Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Main Entrance loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            addMainEntranceView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addMainEntranceView() {

    $('#collapseTitle').html('New Main Entrance');
    $('#cardTitle').html('New Main Entrance');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_main_entrance">\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="total_num_public_entrances"> Total number of public entrances: </label> <input type="number" min="0" class="form-control" name="total_num_public_entrances" id="total_num_public_entrances" ></div>\n' +
        '    <div class="col-6"><label for="main_ent_accessible"> Main entrance is accessible: </label> <select class="form-control" name="main_ent_accessible" id="main_ent_accessible" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="alt_ent_accessible"> Alternative accessible entrance can be used independently during same hours: </label> <select class="form-control" name="alt_ent_accessible" id="alt_ent_accessible" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="accessable_signage"> There is signage to direct patrons to the wheelchair accessible entrance: </label> <select class="form-control" name="accessable_signage" id="accessable_signage" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="ground_level"> The ground or floor is level inside and outside the accessible entrance: </label> <select class="form-control" name="ground_level" id="ground_level" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="threshold_level"> Threshold of entrance is level: </label><select class="form-control" name="threshold_level" id="threshold_level" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="threshold_beveled"> If threshold is beveled, it is no more than 1/2 inch high with the top 1/4 inch beveled: </label> <select class="form-control" name="threshold_beveled" id="threshold_beveled" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="beveled_height"> Height: </label><input type="number" min="0.00" step=".01" placeholder="0.5" class="form-control" name="beveled_height" id="beveled_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="door_action"> As you enter the door opens: </label><select class="form-control" name="door_action" id="door_action" >\n';
    bodyHtml += addGenSelectOptions(slideOpenOtherOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="door_open_clearance"> Doors have at least 32” clearance when open at 90 degrees: </label> <select class="form-control" name="door_open_clearance" id="door_open_clearance" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="opening_measurement"> Opening measurement (inches): </label><input type="number" min="0" class="form-control" name="opening_measurement" id="opening_measurement" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="door_easy_open"> Doors are easy to open: </label><select class="form-control" name="door_easy_open" id="door_easy_open" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="door_open_force"> Actual lbs of force: </label><input type="number" min="0" class="form-control" name="door_open_force" id="door_open_force" ></div>\n' +
        '    <div class="col-4"><label for="door_use_with_fist"> Door handles can be opened and shut with a closed fist: </label><select class="form-control" name="door_use_with_fist" id="door_use_with_fist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="door_auto_open"> Door(s) open automatically or with a push button: </label><select class="form-control" name="door_auto_open" id="door_auto_open" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="second_door_inside"> There is a second door or set of doors inside the accessible entry: </label><select class="form-control" name="second_door_inside" id="second_door_inside" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="min_dist_between_doors"> Distance between outer door and inner door is at least 48” plus door clearance(s): </label><select class="form-control" name="min_dist_between_doors" id="min_dist_between_doors" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lightingMainEntrance"> Lighting is adequate: </label><select class="form-control" name="lightingMainEntrance" id="lightingMainEntrance" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_optionMainEntrance"> Lighting level day/night: </label><select class="form-control" name="lighting_optionMainEntrance" id="lighting_optionMainEntrance" >\n' ;
    bodyHtml += addGenSelectOptions(dayNightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_typeMainEntrance"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeMainEntrance" id="lighting_typeMainEntrance" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentMainEntrance"> Describe accessible entrance: </label><input class="form-control" name="commentMainEntrance" id="commentMainEntrance" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsMainEntrance"> Recommendations: </label><input class="form-control" name="recommendationsMainEntrance" id="recommendationsMainEntrance" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_establishment" class="btn btn-success" onclick="addMainEntrance()"><i class="fas fa-save"></i>&nbsp; Save Main Entrance</button>\n' +
        '   </div>\n' +
        '</div>\n' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#total_num_public_entrances').focus();

    $('#cardFooter').html('');
    $("#add_main_entrance").validate({
        rules: {
            total_num_public_entrances: {
                number: true
            },
            beveled_height: {
                number: true
            },
            opening_measurement: {
                number: true
            },
            door_open_force: {
                number: true
            },
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
            addMainEntrance();
        }
    });
}

function addMainEntrance() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/main_entrance/",
        data: JSON.stringify({
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
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('main_entrance', 'addInteriorView()', 'put');

            $('#cardTitle').html('Main Entrance Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Interior loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            addInteriorView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addInteriorView() {

    $('#collapseTitle').html('New Interior');
    $('#cardTitle').html('New Interior');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_interior">\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="int_door_open_clearance"> Doors have at least 32” clearance when open at 90 degrees: </label> <select class="form-control" name="int_door_open_clearance" id="int_door_open_clearance" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="int_opening_measurement"> Opening measurement (inches): </label> <input type="number" min="0" class="form-control" name="int_opening_measurement" id="int_opening_measurement" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="int_door_easy_open"> Doors are easy to open: </label> <select class="form-control" name="int_door_easy_open" id="int_door_easy_open" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="int_door_open_force"> Actual lbs of force: </label> <input type="number" min="0" class="form-control" name="int_door_open_force" id="int_door_open_force" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="int_door_use_with_fist"> Door handles can be opened and shut with a closed fist, open automatically, or push button: </label> <select class="form-control" name="int_door_use_with_fist" id="int_door_use_with_fist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="five_second_close"> Doors take 5 seconds or longer to close: </label><select class="form-control" name="five_second_close" id="five_second_close" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="hallway_width"> Hallways and ​aisles are min. 36” WIDE, or not less than 28” for 4 foot intervals: </label> <select class="form-control" name="hallway_width" id="hallway_width" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="narrowest_width"> Narrowest width (inches): </label><input type="number" min="0" class="form-control" name="narrowest_width" id="narrowest_width" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="wheelchair_turnaround"> There are locations that allow 60” space for a wheelchair to turn around: </label><select class="form-control" name="wheelchair_turnaround" id="wheelchair_turnaround" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="hallway_obstacles"> Hallways and aisles are clear of obstacles and tripping hazards: </label> <select class="form-control" name="hallway_obstacles" id="hallway_obstacles" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="hallway_clear"> Hallways are clear of objects protruding more than 4” or lower than 80”: </label><select class="form-control" name="hallway_clear" id="hallway_clear" ></div>\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="lightingInterior"> Lighting is adequate: </label><select class="form-control" name="lightingInterior" id="lightingInterior" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="lighting_typeInterior"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeInterior" id="lighting_typeInterior" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="service_counter"> Lowest ​service counter is no higher than 38” ​with a clear view from a sitting position, and a check writing surface is no higher than 34”: </label><select class="form-control" name="service_counter" id="service_counter" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="counter_height"> Service counter height (inches): </label><input type="number" min="0" class="form-control" name="counter_height" id="counter_height" ></div>\n' +
        '    <div class="col-3"><label for="writing_surface_height"> Writing surface height (inches): </label><input type="number" min="0" class="form-control" name="writing_surface_height" id="writing_surface_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="drinking_fountain"> Accessible drinking fountain with spout no higher than 36”, and easy to operate controls: </label><select class="form-control" name="drinking_fountain" id="drinking_fountain" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentInterior"> Describe accessible entrance: </label><input type="text" class="form-control" name="commentInterior" id="commentInterior" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsInterior"> Recommendations: </label><input type="text" class="form-control" name="recommendationsInterior" id="recommendationsInterior" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_interior" class="btn btn-success"><i class="fas fa-save"></i>&nbsp; Save Interior</button>\n' +
        '   </div>\n' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#int_door_open_clearance').focus();

    $('#cardFooter').html('');
    $("#add_interior").validate({
        rules: {
            int_opening_measurement: {
                number: true
            },
            int_door_open_force: {
                number: true
            },
            narrowest_width: {
                number: true
            },
            counter_height: {
                number: true
            },
            writing_surface_height: {
                number: true
            },
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
            addInterior();
        }
    });
}

function addInterior() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/interior/",
        data: JSON.stringify({
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
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('interior', 'isElevator()', 'put');

            $('#cardTitle').html('Interior Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Elevators loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            isElevator();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function isElevator() {


    $('#collapseTitle').html('New Elevator');
    $('#cardTitle').html('New Elevator');
    window.scrollTo(0,0);

    bodyHtml = '<div class="card-row">\n' +
        '<span class="card-text">Is there ​at least one elevator ​or lift?</span>\n'+
        '</div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="button" id="is_elevator" class="btn btn-success" onclick="addElevatorView()"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
        '<button  type="button" id="is_not_elevator" class="btn btn-secondary" onclick="addNoElevator()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
        '</div>');
    $('#is_elevator').focus();
}

function addNoElevator() {

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/elevator/est/" + EST_ID,
        success: function () {

            AutoSave('elevator', 'addSignageView()', 'put');

            $('#cardTitle').html('No Elevator Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Signage loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            addSignageView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addElevatorView() {

    $('#collapseTitle').html('New Elevator');
    $('#cardTitle').html('New Elevator');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_elevator" >\n' +
        '<div class="card-row">\n' +
        '    <div class="col-3"><label for="is_elevator"> Is there ​at least one elevator ​or lift: </label> <select class="form-control" name="is_elevator" id="is_elevator" >\n';
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-9"><label for="location"> Where is nearest elevator or lift located in relation to the accessible entrance: </label> <input type="text" class="form-control" name="location" id="location" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="works"> The elevator or lift works properly: </label> <select class="form-control" name="works" id="works" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="no_assist"> Users can operate elevator or lift without having to find someone to assist or provide a key: </label> <select class="form-control" name="no_assist" id="no_assist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-3"><label for="button_height"> Buttons are no higher than 48” and no lower than 15”: </label> <select class="form-control" name="button_height" id="button_height" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="outside_btn_height"> Outside button height (inches): </label><input type="number" min="0" class="form-control" name="outside_btn_height" id="outside_btn_height" ></div>\n' +
        '    <div class="col-3"><label for="inside_btn_height"> Inside button height (inches): </label> <input type="number" min="0" class="form-control" name="inside_btn_height" id="inside_btn_height" ></div>\n' +
        '    <div class="col-3"><label for="button_use_fist"> Buttons are easy to press with closed fist: </label><select class="form-control" name="button_use_fist" id="button_use_fist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="braille"> Buttons ​and signs ​have braille markings ​and raised letters/numbers: </label><select class="form-control" id="braille" name="braille" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="audible_tones"> Elevator or lift uses ​audible tones as well as visible signals : </label> <select class="form-control" id="audible_tones" name="audible_tones" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="lightingElevator"> Lighting is adequate: </label><select class="form-control" id="lightingElevator" name="lightingElevator" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="lighting_typeElevator"> Lighting level low/medium/bright: </label><select class="form-control" id="lighting_typeElevator" name="lighting_typeElevator" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="elevator_depth"> Elevator interior is at least 54” DEEP ​​from door to the back : </label><select class="form-control" id="elevator_depth"  name="elevator_depth" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentElevator"> Comments: </label><input type="text" class="form-control" id="commentElevator" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsElevator"> Recommendations: </label><input type="text" class="form-control" name="recommendationsElevator" id="recommendationsElevator" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_interior" class="btn btn-success" onclick="addElevator()"><i class="fas fa-save"></i>&nbsp; Save Elevator</button>\n' +
        '   </div>\n' +
        '</div>\n' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#is_elevator').focus();

    $('#cardFooter').html('');
    $("#add_elevator").validate({
        rules: {
            location: {
                maxlength: 255
            },
            outside_btn_height: {
                number: true
            },
            inside_btn_height: {
                number: true
            },
            commentElevator: {
                maxlength: 5000
            },
            recommendationsElevator: {
                maxlength: 5000
            }
        },
        messages: {
            location: " Must be less than 256 characters long.",
            commentElevator:  " Must be less than 5000 characters.",
            recommendationsElevator: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            addElevator();
        }
    });
}

function addElevator() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/elevator/",
        data: JSON.stringify({
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
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('elevator', 'addSignageView()', 'put');

            $('#cardTitle').html('Elevator Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Signage loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            addSignageView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addSignageView() {

    $('#collapseTitle').html('New Signage');
    $('#cardTitle').html('New Signage');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_signage">\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="is_directory"> There is a directory at all accessible entrances to help visitors to find their way: </label> <select class="form-control" name="is_directory" id="is_directory" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="door_signs"> Door signs are on latch side of door, between 48” and 60” from floor: </label> <select class="form-control" name="door_signs" id="door_signs" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="sign_height"> Height of signs (inches): </label> <input type="number" min="0" class="form-control" name="sign_height" id="sign_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="pub_sign_braile"> Public signs have Braille: </label> <select class="form-control" name="pub_sign_braile" id="pub_sign_braile" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="sign_high_contrast"> Signs have raised, high contrast lettering, ​low glare background: </label> <select class="form-control" name="sign_high_contrast" id="sign_high_contrast" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="sign_images"> Signs include images, illustrations, or icons: </label><select class="form-control" name="sign_images" id="sign_images" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="written_material_images"> Written material (menus, etc.) includes images or illustrations: </label> <select class="form-control" name="written_material_images" id="written_material_images" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="menu_access"> There is a large print menu, Braille menu, and/ or on­line accessible menu: </label><select class="form-control" name="menu_access" id="menu_access" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="alt_info"> Information is available in alternative formats: </label><select class="form-control" name="alt_info" id="alt_info" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="alt_info_type"> Type of alternative format Braille/Large print/Recorded audio/Video: </label> <select class="form-control" name="alt_info_type" id="alt_info_type" >\n';
    bodyHtml += addGenSelectOptions(brailleLargePrintOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentSignage"> Comments: </label><input type="text" class="form-control" name="commentSignage" id="commentSignage" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsSignage"> Recommendations: </label><input type="text" class="form-control" name="recommendationsSignage" id="recommendationsSignage" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '<div class="col-4">\n' +
        '<button  type="submit" id="save_signage" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Signage</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#is_directory').focus();

    $('#cardFooter').html('');
    $("#add_signage").validate({
        rules: {
            sign_height: {
                number: true
            },
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
            addSignage();
        }
    });
}

function addSignage() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/signage/",
        data: JSON.stringify({
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
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('signage', 'addEmergencyPreparednessView()', 'put');

            $('#cardTitle').html('Signage Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Emergency Preparedness loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            addEmergencyPreparednessView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addEmergencyPreparednessView() {

    $('#collapseTitle').html('New Emergency Preparedness');
    $('#cardTitle').html('New Emergency Preparedness');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_emergency_preparedness"> \n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="evac_info"> Evacuation and safety information is available in a visible location: </label> <select class="form-control" name="evac_info" id="evac_info" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="alt_evac_info"> Evacuation and safety information is available in alternative format: </label> <select class="form-control" name="alt_evac_info" id="alt_evac_info" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="evac_info_format"> Type of alternative format Braille/Large print/Recorded audio/Video: </label> <select class="form-control" name="evac_info_format" id="evac_info_format" >\n';
    bodyHtml += addGenSelectOptions(brailleLargePrintOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="alarms"> Emergency alarms both audible and visible: </label> <select class="form-control" name="alarms" id="alarms" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="location_no_flash"> There is an emergency location available where there are no flashing alarms: </label> <select class="form-control" name="location_no_flash" id="location_no_flash" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="shelter"> There is an area of refuge, shelter in place during emergencies: </label><select class="form-control" name="shelter" id="shelter" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="signs_to_exit"> Signs direct patrons to exits, safety zone, fire extinguishers and alarm pull boxes: </label> <select class="form-control" name="signs_to_exit" id="signs_to_exit" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="wheelchair_plan"> There is a plan for evacuating persons using wheelchairs in case elevators are inoperable: </label><select class="form-control" name="wheelchair_plan" id="wheelchair_plan" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="floor_plan_routes"> Posted floor plans show emergency routes, and locations of fire extinguishers and alarm pull boxes: </label><select class="form-control" name="floor_plan_routes" id="floor_plan_routes" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="fire_alarm_height"> Fire alarms pull boxes are no higher than 48”: </label> <select class="form-control" name="fire_alarm_height" id="fire_alarm_height" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="fire_extinguisher_height"> Fire extinguishers are mounted with bottom no higher than 48”: </label> <select class="form-control" name="fire_extinguisher_height" id="fire_extinguisher_height" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentEmergency_Preparedness"> Comments: </label><input type="text" class="form-control" name="commentEmergency_Preparedness" id="commentEmergency_Preparedness" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsEmergency_Preparedness"> Recommendations: </label><input type="text" class="form-control" name="recommendationsEmergency_Preparedness" id="recommendationsEmergency_Preparedness" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '<div class="col-4">\n' +
        '<button  type="submit" id="save_emergency" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Emergency Preparedness</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#evac_info').focus();

    $('#cardFooter').html('');
    $("#add_emergency_preparedness").validate({
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
            addEmergencyPreparedness();
        }
    });
}

function addEmergencyPreparedness() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/emergency/",
        data: JSON.stringify({
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
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('emergency', 'addSeatingView()', 'put');

            $('#cardTitle').html('Emergency Preparedness Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Seating loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            addSeatingView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addSeatingView() {

    $('#collapseTitle').html('New Seating');
    $('#cardTitle').html('New Seating');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_seating"> \n ' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="seating_no_step"> One or more seating areas in the common area can be accessed without steps: </label> <select class="form-control" name="seating_no_step" id="seating_no_step" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="table_aisles"> Customers can maneuver between tables without bumping into chairs (36” aisles)​: </label> <select class="form-control" name="table_aisles" id="table_aisles" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="legroom"> There are tables with ​legroom for wheelchair users (bottom of table = 27 ​ to 34”): </label> <select class="form-control" name="legroom" id="legroom" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="num_legroom"> Number of tables with legroom #/All: </label> <input type="text" class="form-control" name="num_legroom" id="num_legroom" placeholder="ex: 10 or All"></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="rearranged"> There are tables and chairs that can be moved or rearranged: </label> <select class="form-control" name="rearranged" id="rearranged" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="num_table_rearranged"> Number of tables that can be moved #/All: </label><input type="text" class="form-control" name="num_table_rearranged" id="num_table_rearranged" ></div>\n' +
        '    <div class="col-4"><label for="num_chair_rearranged"> Number of chairs that can be moved #/All: </label><input type="text" class="form-control" name="num_chair_rearranged" id="num_chair_rearranged" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="round_tables"> There are round or oval tables that can seat 5 to 9 individuals: </label> <select class="form-control" name="round_tables" id="round_tables" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="num_round_tables"> Number of round/oval tables: </label><input type="number" min="0" class="form-control" name="num_round_tables" id="num_round_tables" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="lightingSeating"> Lighting is adequate: </label><select class="form-control" name="lightingSeating" id="lightingSeating" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_optionSeating"> Lighting level day/night: </label><select class="form-control" name="lighting_optionSeating" id="lighting_optionSeating" >\n' ;
    bodyHtml += addGenSelectOptions(dayNightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_typeSeating"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeSeating" id="lighting_typeSeating" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="adjustable_lighting"> There are one or more available spaces with adjustable lighting: </label><select class="form-control" name="adjustable_lighting" id="adjustable_lighting" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="low_visual_slim"> There are one or more areas with low visual stimulation: </label> <select class="form-control" name="low_visual_slim" id="low_visual_slim" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="quiet_table"> There is a quiet table, room or area available on request: </label><select class="form-control" name="quiet_table" id="quiet_table" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="low_sound"> There is an area with low or no background sound, and/or that has sound­absorbing surfaces: </label> <select class="form-control" name="low_sound" id="low_sound" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="designated_space"> For theater or auditorium, there are spaces designated for wheelchair users that have the same general views as the rest of the audience when the person is seated: </label><select class="form-control" name="designated_space" id="designated_space" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="num_desig_space"> Number of designated spaces: </label> <input type="number" min="0" class="form-control" name="num_desig_space" id="num_desig_space" ></div>\n' +
        '    <div class="col-4"><label for="companion_space"> There are spaces for companions to sit next to the wheelchair users: </label> <select class="form-control" name="companion_space" id="companion_space" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentSeating"> Comments: </label><input type="text" class="form-control" name="commentSeating" id="commentSeating" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsSeating"> Recommendations: </label><input type="text" class="form-control" name="recommendationsSeating" id="recommendationsSeating" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '<div class="col-4">\n' +
        '<button  type="submit" id="save_seating" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Seating</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#seating_no_step').focus();

    $('#cardFooter').html();

    $('#cardFooter').html('');
    $("#add_seating").validate({
        rules: {
            num_legroom: {
                maxlength: 4
            },
            num_table_rearranged: {
                maxlength: 32
            },
            num_chair_rearranged: {
                maxlength: 32
            },
            num_round_tables: {
                number: true
            },
            num_desig_space: {
                number: true
            },
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
            addSeating();
        }
    });
}

function addSeating() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/seating/",
        data: JSON.stringify({
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
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('seating', 'isRestroom()', 'put');

            $('#cardTitle').html('Seating Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Restroom loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            isRestroom();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function isRestroom() {

    $('#collapseTitle').html('New Restroom');
    $('#cardTitle').html('New Restroom');
    window.scrollTo(0,0);

    bodyHtml = '<div class="card-row">\n' +
        '<span class="card-text">Public Restrooms ​are available near or ​at the location?</span>\n'+
        '</div>';

    $('#cardBody').html(bodyHtml);

    $('#cardFooter').html('<div class="col-4">\n' +
        '<button  type="button" id="is_restroom" class="btn btn-success" onclick="addRestroomView()"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
        '<button  type="button" id="is_not_restroom" class="btn btn-secondary" onclick="addNoRestroom()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
        '</div>');
    $('#is_restroom').focus();
}

function addNoRestroom() {

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/restroom/est/" + EST_ID,
        success: function () {

            AutoSave('no_restroom', 'addCommunicationView()', 'put');

            $('#cardTitle').html('No Restroom Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Communication Technologies loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('');

            addCommunicationView();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addRestroomView() {

    $('#collapseTitle').html('New Restroom');
    $('#cardTitle').html('New Restroom');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_restroom"> \n ' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="public_restroom"> Public restrooms ​are available near or ​at the location: </label> <select class="form-control" name="public_restroom" id="public_restroom" >\n';
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="total_num"> Total number of public restrooms: </label> <input type="number" min="0" class="form-control" name="total_num" id="total_num" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="designated_number"> Number of accessible restrooms designated “family”, “unisex”, or “assisted use”: </label> <input type="number" min="0" class="form-control" name="designated_number" id="designated_number" ></div>\n' +
        '    <div class="col-6"><label for="num_wheelchair_sign"> Number of restrooms that have “Wheelchair Accessible” signs: </label> <input type="number" min="0" class="form-control" name="num_wheelchair_sign" id="num_wheelchair_sign" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="sign_accessable"> Restrooms signs have high contrast, Braille, raised lettering, low glare background: </label> <select class="form-control" name="sign_accessable" id="sign_accessable" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="sign_location"> Signage is on latch side of door between 48” and 60” above floor: </label><select class="form-control" name="sign_location" id="sign_location" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="key_needed"> Users do not need to ask someone for a KEY to use the restroom: </label><select class="form-control" name="key_needed" id="key_needed" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentRestroom"> Describe the restroom(s): </label><input type="text" class="form-control" name="commentRestroom" id="commentRestroom" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsRestroom"> Recommendations: </label><input type="text" class="form-control" name="recommendationsRestroom" id="recommendationsRestroom" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '       <button  type="submit" id="save_restroom" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Restroom</button>\n' +
        '   </div>\n ' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#public_restroom').focus();

    $('#cardFooter').html('');
    $("#add_restroom").validate({
        rules: {
            total_num: {
                number: true
            },
            designated_number: {
                number: true
            },
            num_wheelchair_sign: {
                number: true
            },
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
            addRestroom();
        }
    });
}

function addRestroom() {

    var public_restroom = document.getElementById("public_restroom").value;
    var total_num = document.getElementById("total_num").value;
    var designated_number = document.getElementById("designated_number").value;
    var num_wheelchair_sign = document.getElementById("num_wheelchair_sign").value;
    var sign_accessable = document.getElementById("sign_accessable").value;
    var sign_location = document.getElementById("sign_location").value;
    var key_needed = document.getElementById("key_needed").value;
    var comment = document.getElementById("commentRestroom").value;
    var recommendations = document.getElementById("recommendationsRestroom").value;

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/restroom/",
        data: JSON.stringify({
            "public_restroom": public_restroom,
            "total_num": total_num,
            "designated_number": designated_number,
            "num_wheelchair_sign": num_wheelchair_sign,
            "sign_accessable": sign_accessable,
            "sign_location": sign_location,
            "key_needed": key_needed,
            "comment": comment,
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            AutoSave('restroom', 'getRestroomId()', 'put');

            $('#cardTitle').html('Restroom Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span>Restroom Information loading.</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<p> </p>');

            getRestroomId();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function getRestroomId() {
    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/restroom/est/' + EST_ID,
        success: function (data) {
            if (data[0] !== undefined)
                RESTROOM_ID = data[0].restroom_id;

            addRestroomInformationView()
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });
}

function addRestroomInformationView() {

    $('#collapseTitle').html('New Restroom Information');
    $('#cardTitle').html('New Restroom Information');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_restroom_information"> \n' +
        '<div class="card-row">\n' +
        '   <div class="col-12"><label for="restroom_desc"> Identify this bathroom rated with location and other information (i.e. 1st floor front women): </label> <input type="text" class="form-control" name="restroom_desc" id="restroom_desc" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="easy_open">  Room door is easy to open, requiring 5 lb. or less force: </label> <select class="form-control" name="easy_open" id="easy_open" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="lbs_force"> Actual force (lbs): </label> <input type="number" min="0" class="form-control" name="lbs_force" id="lbs_force"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="clearance"> Stall/Room door has at least 32” clearance when the door is open: </label> <select class="form-control" name="clearance" id="clearance" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="opening"> Opening measurement (inches): </label> <input type="number" min="0" class="form-control" name="opening" id="opening"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="opens_out"> The stall door opens to the outside: </label><select class="form-control" name="opens_out" id="opens_out" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="use_fist"> The stall door can be opened, closed, and latched with a closed fist: </label><select class="form-control" name="use_fist" id="use_fist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="can_turn_around"> The stall or room is large enough for a wheelchair or walker to turn around: </label> <select class="form-control" name="can_turn_around" id="can_turn_around" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="turn_width"> Stall/Room width (inches)​: </label> <input type="number" min="0" class="form-control" name="turn_width" id="turn_width"  ></div>\n' +
        '   <div class="col-4"><label for="turn_depth"> Stall/Room depth (inches)​: </label> <input type="number" min="0" class="form-control" name="turn_depth" id="turn_depth"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="close_chair_inside"> The stall/room door can be closed once a wheelchair is inside: </label> <select class="form-control" name="close_chair_inside" id="close_chair_inside" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="grab_bars"> Grab bars are easily reachable behind the toilet and on the side wall ​ nearest the toilet: </label> <select class="form-control" name="grab_bars" id="grab_bars" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="seat_height_req"> The height of the toilet seat is at least 17” from the floor: </label><select class="form-control" name="seat_height_req" id="seat_height_req" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="seat_height"> Seat height (inches): </label><input type="number" min="0" class="form-control" name="seat_height" id="seat_height" ></div>\n' +
        '   <div class="col-4"><label for="flush_auto_fist"> The toilet flushes automatically, or can be operated with a closed fist: </label><select class="form-control" name="flush_auto_fist" id="flush_auto_fist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="ambulatory_accessible"> If there are multiple stalls, at least one is ambulatory accessible with grab bars on either side and toilet height at least 17” from floor: </label> <select class="form-control" name="ambulatory_accessible" id="ambulatory_accessible" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="bar_height"> Toilet height (inches): </label><input type="number" min="0" class="form-control" name="bar_height" id="bar_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="coat_hook"> If there is a coat hook, it is between 35” and 48” from the floor: </label><select class="form-control" name="coat_hook" id="coat_hook" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="hook_height"> Hook height (inches): </label> <input type="number" min="0" class="form-control" name="hook_height" id="hook_height"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="sink"> The height of the sink/countertop is 34” or less from the floor: </label><select class="form-control" name="sink" id="sink" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="sink_height"> Sink/Countertop height (inches): </label> <input type="number" min="0" class="form-control" name="sink_height" id="sink_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="faucet"> The faucet control is 17” or less from the front edge of the sink counter: </label><select class="form-control" name="faucet" id="faucet" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="faucet_depth"> Faucet depth (inches): </label> <input type="number" min="0" class="form-control" name="faucet_depth" id="faucet_depth"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="faucet_auto_fist"> Faucet​ can ​be operated ​automatically or ​with a closed fist: </label> <select class="form-control" name="faucet_auto_fist" id="faucet_auto_fist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="sink_clearance"> There is room for a wheelchair to roll under the sink ​: </label><select class="form-control" name="sink_clearance" id="sink_clearance" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="sink_clearance_height"> Measurement (inches): </label> <input type="number" min="0" class="form-control" name="sink_clearance_height" id="sink_clearance_height"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="sink_pipes"> If there are pipes under the sink, they are covered to prevent injury or burns: </label> <select class="form-control" name="sink_pipes" id="sink_pipes" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="soap_dispenser"> The height of the soap dispenser control is 48” or less from the floor: </label> <select class="form-control" name="soap_dispenser" id="soap_dispenser" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-4"><label for="soap_height">  Soap dispenser height (inches): </label> <input type="number" min="0" class="form-control" name="soap_height" id="soap_height"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="dry_fist">  Hand dryer or towel dispenser can be operated automatically or with closed fist: </label> <select class="form-control" name="dry_fist" id="dry_fist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="dry_control_height"> Controls for hand dryer or towel dispenser are 48” or less from floor: </label> <select class="form-control" name="dry_control_height" id="dry_control_height" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="mirror"> If there is a mirror, the bottom edge is 40” or less from the floor: </label> <select class="form-control" name="mirror" id="mirror" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="mirror_height"> Mirror height (inches): </label><input type="number" min="0" class="form-control" name="mirror_height" id="mirror_height" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="shelves"> If there are shelves to set items, they are 48” or less from the floor: </label><select class="form-control" name="shelves" id="shelves" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="shelf_height"> Shelf height (inches): </label> <input type="number" min="0" class="form-control" name="shelf_height" id="shelf_height"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-6"><label for="trash_receptacles"> Trash receptacles are positioned so they do not block the route to the door​: </label> <select class="form-control" name="trash_receptacles" id="trash_receptacles" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '   <div class="col-6"><label for="hygiene_seat_cover"> Feminine hygiene product & toilet seat cover dispensers are 48” or less from floor: </label> <select class="form-control" name="hygiene_seat_cover" id="hygiene_seat_cover" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '   <div class="col-4"><label for="hygiene_cover_height"> Height (inches): </label> <input type="number" min="0" class="form-control" name="hygiene_cover_height" id="hygiene_cover_height"  ></div>\n' +
        '    <div class="col-4"><label for="lightingRestroomInfo"> Lighting is adequate: </label><select class="form-control" name="lightingRestroomInfo" id="lightingRestroomInfo" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="lighting_typeRestroomInfo"> Lighting level low/medium/bright: </label><select class="form-control" name="lighting_typeRestroomInfo" id="lighting_typeRestroomInfo" >\n' ;
    bodyHtml += addGenSelectOptions(lowMedBrightOptions);
    bodyHtml += '</select>\n' +
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
        '           <button  type="submit" id="save_restroom_information" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Restroom Information</button>&nbsp;' +
        '           <button  type="button" id="cancel_restroom_information" class="btn btn-secondary" onclick="addCommunicationView()"><i class="fas fa-times"></i>&nbsp; Cancel </button>\n ' +
        '       </span>\n' +
        '   </div>\n ' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#restroom_desc').focus();

    $('#cardFooter').html();

    $('#cardFooter').html('');
    $("#add_restroom_information").validate({
        rules: {
            restroom_desc: {
                maxlength: 32
            },
            lbs_force: {
                number: true
            },
            opening: {
                number: true
            },
            turn_width: {
                number: true
            },
            turn_depth: {
                number: true
            },
            seat_height: {
                number: true
            },
            bar_height: {
                number: true
            },
            hook_height: {
                number: true
            },
            sink_height: {
                number: true
            },
            sink_clearance_height: {
                number: true
            },
            soap_height: {
                number: true
            },
            mirror_height: {
                number: true
            },
            shelf_height: {
                number: true
            },
            hygiene_cover_height: {
                number: true
            },
            commentRestroomInfo: {
                maxlength: 5000
            },
            recommendationsRestroomInfo: {
                maxlength: 5000
            }
        },
        messages: {
            commentRestroomInfo:  " Must be less than 5000 characters.",
            recommendationsRestroomInfo: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            addRestroomInformation();
        }
    });
}

function addRestroomInformation() {

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
            "rest_id" : RESTROOM_ID
        }),
        success: function () {

            AutoSave('restroom_info', 'addCommunicationView()', 'put');

            $('#cardTitle').html('Restroom Information Added');

            bodyHtml = '<div class="card-row">\n' +
                '<span class="card-text">Add another restroom?</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<div class="col-4">\n' +
                '<button  type="button" id="add_another_restroom" class="btn btn-success" onclick="addRestroomInformationView()"><i class="fas fa-check"></i>&nbsp; Yes</button>&nbsp;\n' +
                '<button  type="button" id="no_more_restrooms" class="btn btn-secondary" onclick="addCommunicationView()"><i class="fas fa-times"></i>&nbsp; No</button>\n' +
                '</div>');
            $('#add_another_restroom').focus();
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function addCommunicationView() {

    $('#collapseTitle').html('New Communication Technologies');
    $('#cardTitle').html('New Communication Technologies');
    window.scrollTo(0,0);

    bodyHtml = '<form id="add_communication"> \n ' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="public_phone"> There is one or more public phones available w/adjustable volume control.: </label> <select class="form-control" name="public_phone" id="public_phone" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="phone_clearance">  There are public phones w/ controls min 48” from floor, protruding < 4” from wall: </label> <select class="form-control" name="phone_clearance" id="phone_clearance" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="num_phone"> Number of phones: </label> <input type="number" min="0" class="form-control" name="num_phone" id="num_phone"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-3"><label for="tty"> There is a TTY is available: </label> <select class="form-control" name="tty" id="tty" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="staff_tty"> Staff are trained in use of TTY, and how to accept relay calls: </label> <select class="form-control" name="staff_tty" id="staff_tty" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="assisted_listening"> There are assisted listening devices available: </label><select class="form-control" name="assisted_listening" id="assisted_listening" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="assisted_listen_type"> Type of listening device - Infra­red loop/Induction loop/FM/Amplification/Other: </label><select class="form-control" name="assisted_listen_type" id="assisted_listen_type" >\n';
    bodyHtml += addGenSelectOptions(infraRedLoopOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="assisted_listen_receiver"> Type of receivers - Earbud/Neckloop/Headphones/Other: </label> <select class="form-control" name="assisted_listen_receiver" id="assisted_listen_receiver" >\n';
    bodyHtml += addGenSelectOptions(earbudNeckLoopOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="listening_signage"> Signs about listening devices are clearly displayed​: </label> <select class="form-control" name="listening_signage" id="listening_signage" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="staff_listening"> Staff are trained to use assisted listening devices​: </label> <select class="form-control" name="staff_listening" id="staff_listening" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="acoustics"> The acoustics are comfortable (no echoing, loud music, etc): </label> <select class="form-control" name="acoustics" id="acoustics" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="acoustics_level"> Noise level - Low/Medium/High: </label> <select class="form-control" name="acoustics_level" id="acoustics_level" >\n';
    bodyHtml += addGenSelectOptions(lowMedHighOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="alt_comm_methods"> If a customer is unable to hear, there are other forms of communication: </label><select class="form-control" name="alt_comm_methods" id="alt_comm_methods" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="alt_comm_type"> Type of other form of communication (writing pad, staff know ASL, etc): </label><input type="text" class="form-control" name="alt_comm_type" id="alt_comm_type" ></div>\n' +
        '    <div class="col-6"><label for="staff_ASL"> Staff have received instructions on how to provide ASL services upon request (in person or remote): </label><select class="form-control" name="staff_ASl" id="staff_ASL" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="captioning_default"> Captioning is turned ‘on’ as default for TVs or projected video: </label> <select class="form-control" name="captioning_default" id="captioning_default" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="theater_captioning"> If this is a theater, there is captioning: </label><select class="form-control" name="theater_captioning" id="theater_captioning" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="theater_capt_type"> Type of captioning used - Real Time/Open Captions/Rear Window/Other: </label><select class="form-control" name="theater_capt_type" id="theater_capt_type" >\n';
    bodyHtml += addGenSelectOptions(realTiemOpenOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="auditory_info_visual"> Auditory information is presented visually: </label> <select class="form-control" name="auditory_info_visual" id="auditory_info_visual" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="visual_info_auditory"> Visual information is presented audibly: </label><select class="form-control" name="visual_info_auditory" id="visual_info_auditory" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="website_text_reader"> If the establishment has a website, it is accessible to users of screen text readers: </label> <select class="form-control" name="website_text_reader" id="website_text_reader" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="alt_contact"> There are alternate means for patrons to order, contact, or schedule: </label><select class="form-control" name="alt_contact" id="alt_contact" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="alt_contact_type"> Type of alternate means - Text/On-line/Phone: </label> <select class="form-control" name="alt_contact_type" id="alt_contact_type" >\n';
    bodyHtml += addGenSelectOptions(textOnLineOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-4"><label for="shopping_assist"> The establishment offers shopping assistance or delivery: </label> <select class="form-control" name="shopping_assist" id="shopping_assist" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="assist_service"> Type of service - Shopping Assistance/Delivery: </label><select class="form-control" name="assist_service" id="assist_service" >\n';
    bodyHtml += addGenSelectOptions(shoppingAssistOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-4"><label for="assist_fee"> Is there a fee for the service: </label> <select class="form-control" name="assist_fee" id="assist_fee" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-3"><label for="store_scooter"> If this is a store, there are wheelchairs or scooters available for customer use: </label> <select class="form-control" name="store_scooter" id="store_scooter" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-3"><label for="scooter_fee"> Is there a fee to use wheelchairs or scooters: </label> <select class="form-control" name="scooter_fee" id="scooter_fee" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="scooter_location"> Location of wheelchairs or scooters: </label> <input type="text" class="form-control" name="scooter_location" id="scooter_location"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="restaurant_allergies"> If this is a restaurant, information is available on food allergies, sensitivities: </label> <select class="form-control" name="restaurant_allergies" id="restaurant_allergies" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="staff_disable_trained"> The staff have received training within the past 12 months on how to provide “disability friendly” customer service to people with disabilities of all ages: </label> <select class="form-control" name="staff_disable_trained" id="staff_disable_trained" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="staff_disable_trained_desc"> If ‘yes’, describe the type of training, how it was delivered, and how often it is provided: </label> <input type="text" class="form-control" name="staff_disable_trained_desc" id="staff_disable_trained_desc"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="items_reach"> All items are within reach, or assistance is offered to reach them: </label> <select class="form-control" name="items_reach" id="items_reach" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="service_alt_manner"> If goods and services are not accessible, they are provided in an alternative manner: </label><select class="form-control" name="service_alt_manner" id="service_alt_manner" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="senior_discount"> The establishment offers a senior discount: </label><select class="form-control" name="senior_discount" id="senior_discount" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '    <div class="col-6"><label for="senior_age"> If ‘yes’, what age is considered ‘senior’: </label> <input type="number" min="0" class="form-control" name="senior_age" id="senior_age"  ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-6"><label for="annual_A4A_review"> Management has agreed to annual A4A reviews​: </label> <select class="form-control" name="annual_A4A_review" id="annual_A4A_review" >\n' ;
    bodyHtml += addGenSelectOptions(yesNoNAOptions);
    bodyHtml += '</select>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="commentCommunication"> Comments, reasons for “no” answers, additional information: </label><input type="text" class="form-control" name="commentCommunication" id="commentCommunication" ></div>\n' +
        '</div>\n' +
        '<div class="card-row">\n' +
        '    <div class="col-12"><label for="recommendationsCommunication"> Recommendations: </label><input type="text" class="form-control" name="recommendationsCommunication" id="recommendationsCommunication" ></div>\n' +
        '</div>\n ' +
        '<div class="card-row">\n' +
        '   <div class="col-4">\n' +
        '        <button  type="submit" id="save_restroom" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Communication Technologies</button>\n' +
        '   </div>\n ' +
        '</div>\n ' +
        '</form>';

    $('#cardBody').html(bodyHtml);
    $('#public_phone').focus();

    $('#cardFooter').html();

    $('#cardFooter').html('');
    $("#add_communication").validate({
        rules: {
            num_phone: {
                number: true
            },
            alt_comm_type: {
                maxlength: 50
            },
            scooter_location: {
                maxlength: 5000
            },
            staff_disable_trained_desc: {
                maxlength: 5000
            },
            senior_age: {
                number: true
            },
            commentCommunication: {
                maxlength: 5000
            },
            recommendationsCommunication: {
                maxlength: 5000
            }
        },
        messages: {
            commentCommunication:  " Must be less than 5000 characters.",
            recommendationsCommunication: " Must be less than 5000 characters."
        },
        submitHandler: function(form) {
            addCommunication();
        }
    });
}

function addCommunication() {

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

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/communication/",
        data: JSON.stringify({
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
            "recommendations": recommendations,
            "est_id" : EST_ID
        }),
        success: function () {

            DeleteAutoSave();

            $('#cardTitle').html('Survey Entry Completed');

            bodyHtml = '<div class="card-row">\n' +
                '<span class="h8">New survey has been successfully entered.<br>\n' +
                '       You will be returned to the home page.\n' +
                '</span>\n'+
                '</div>';

            $('#cardBody').html(bodyHtml);

            $('#cardFooter').html('<span><a href="home.php">Click Here </a> if you are not automatically redirected.</span>');

            setTimeout("location.href = 'home.php';",3500);
        },
        error: function(data) {
            $("#alert-body").empty();
            $("#alert-body").append(data);
            $("#alert").modal('toggle');
        }
    });

}

function logout() {
    localStorage.clear();
    location.href = "logout.php";
}