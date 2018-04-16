var EST_ID = "";
var estString = "";

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
    '            <label for="cat_id"> Category: </label><select class="form-control" name="cat_id" id="cat_id">\n' +
    '               <option value="" disabled selected>Please select one</option>\n';

    for (var i = 0; i < categoryData.length; i ++) {
        bodyHtml += '<option value="'+categoryData[i].cat_id+'">&nbsp;'+ categoryData[i].name +'</option>\n';
    }

    bodyHtml += '</select>\n' +
        '</div>\n' +
        '<div class="col-4"><label for="subtype"> Subtype: </label><input type="text" class="form-control" id="subtype" ></div>\n' +
        '<div class="col-4">\n' +
        '   <label for="config_id"> Configuration: </label><select class="form-control" name="config_id" id="config_id">\n' +
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
        '           <label for="user_id"> User: </label><select class="form-control" name="user_id" id="user_id">\n' +
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

            estString = user_id+"/"+cat_id+"/"+config_id+"/"+date.split("-")[0]+"/"+date.split("-")[1]+"/"+date.split("-")[2]+"/";

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

            $("#success-body").html('Premises Information Added<br><br>Parking Section will load next.');
            $("#success").modal('toggle');

            //addParkingView();

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function addParkingView() {
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


    $('#collapseTitle').html('Premises Information');
    $('#cardTitle').html('Premises Information');

    bodyHtml = '<div class="card-row">\n' +
        '            <div class="col-6"><label for="name"> Establishment Name: </label><input type="name" class="form-control" id="name" required></div>\n' +
        '            <div class="col-6"><label for="website"> Website: </label><input type="url" placeholder="http://www.website.com" class="form-control" id="website" ></div>\n' +
        '        </div>\n' +
        '        <div class="card-row">\n' +
        '           <div class="col-4">\n' +
        '            <label for="cat_id"> Category: </label><select class="form-control" name="cat_id" id="cat_id">\n' +
        '               <option value="" disabled selected>Please select one</option>\n';

    for (var i = 0; i < categoryData.length; i ++) {
        bodyHtml += '<option value="'+categoryData[i].cat_id+'">&nbsp;'+ categoryData[i].name +'</option>\n';
    }

    bodyHtml += '</select>\n' +
        '</div>\n' +
        '<div class="col-4"><label for="subtype"> Subtype: </label><input type="text" class="form-control" id="subtype" ></div>\n' +
        '<div class="col-4">\n' +
        '   <label for="config_id"> Configuration: </label><select class="form-control" name="config_id" id="config_id">\n' +
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
        '           <label for="user_id"> User: </label><select class="form-control" name="user_id" id="user_id">\n' +
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

function addParking() {
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
    // var arrdata = [EST_ID, name, website, CAT_ID, subtype, CONFIG_ID, street, city, state, zip, phone, phone_tty, contact_fname, contact_lname, contact_title, contact_email, USER_ID, date, config_comment];

    // console.log("update.js:");

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
            $("#success-body").html('Premises Information Added');
            $("#success").modal('toggle');

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}