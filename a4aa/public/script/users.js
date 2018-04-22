var EST_ID = "";
var EST_NAME = "";
var PARK_ID = 0;
var STA_ID = 0;
var REST_ID = 0;
var htmlBody = "";

$(document).ready(function () {
    addUserCardView();
});

function addUserCardView() {

    $('#edit-user-view').html('');
    htmlBody = '';

    $.ajax({
        async: false,
        dataType: 'json',
        url: 'user/',
        success: function (data) {
            for (var i = 0; i < data.length; i ++) {

                htmlBody += '<div class="box-user col-5">\n' +
                    ' <form name="save_user_'+data[i].user_id+'" >\n' +
                    '    <div class="box-title-user"><span class="col-10 h4"><i class="far fa-user"></i>&emsp;' + data[i].lname + ',&nbsp;'+ data[i].fname + '</span></div> \n' +
                    '    <div class="card-row">\n' +
                    '       <div class="col-6"><label for="fname_'+data[i].user_id+'"> First Name: </label><input type="name" class="form-control" id="fname_'+data[i].user_id+'" value="' + data[i].fname + '" required></div>\n' +
                    '       <div class="col-6"><label for="lname_'+data[i].user_id+'"> Last Name: </label><input type="name" class="form-control" id="lname_'+data[i].user_id+'" value="' + data[i].lname + '" required></div>\n' +
                    '    </div>\n' +
                    '    <div class="card-row">\n' +
                    '       <div class="col-7"><label for="user_name_'+data[i].user_id+'"> User Name: </label><input type="name" class="form-control" id="user_name_'+data[i].user_id+'" value="' + data[i].user_name + '" required></div>\n' +
                    '       <div class="col-5"><label for="change_password_'+data[i].user_id+'"> Password: </label><button type="button" id="change_password_'+data[i].user_id+'" class="btn btn-warning" onclick="addUserCardView()"><i class="fas fa-key"></i>&nbsp;Change</button></div>\n' +
                    '    </div>\n' +
                    '    <div class="card-row">\n' +
                    '       <div class="col-12"><label for="email_'+data[i].user_id+'"> Email: </label><input type="email" class="form-control" id="email_'+data[i].user_id+'" value="' + data[i].email + '" required></div>\n' +
                    '    </div>\n' +
                    '    <div class="card-row">\n' +
                    '       <div class="col-6"><label for="role_'+data[i].user_id+'"> User Role: </label><select class="form-control" id="role_'+data[i].user_id+'" value="' + data[i].email + '" required>\n';

                if (data[i].role === "admin") {
                    htmlBody += '<option value="' + data[i].role + '" selected>&nbsp;' + data[i].role + '</option>\n' +
                        '<option value="user">&nbsp; user</option>\n';
                }
                else {
                    htmlBody += '<option value="admin" selected>&nbsp; admin</option>\n' +
                        '<option value="'+data[i].role+'" selected>&nbsp;'+data[i].role+'</option>\n';
                }

                htmlBody += '</select>\n' +
                    '    </div>\n' +
                    '       <div class="col-6"><label for="active_'+data[i].user_id+'"> Active: </label><select class="form-control" id="active_'+data[i].user_id+'" value="' + data[i].active + '" required></div>\n';

                if (data[i].active === "yes") {
                    htmlBody += '<option value="' + data[i].active + '" selected>&nbsp;' + data[i].active + '</option>\n' +
                        '<option value="no">&nbsp; no</option>\n';
                }
                else {
                    htmlBody += '<option value="yes" selected>&nbsp; yes</option>\n' +
                        '<option value="'+data[i].active+'" selected>&nbsp;'+data[i].active+'</option>\n';
                }

                htmlBody += '   </select>\n' +
                    '       </div>\n' +
                    '   </div>\n' +
                    '    <div class="card-row">\n' +
                    '       <div class="col-4">\n' +
                    '           <button  type="button" id="save_user_'+data[i].user_id+'" class="btn btn-success" onclick="saveUser('+data[i].user_id+')"><i class="fas fa-save"></i>&nbsp; Save Changes</button>\n' +
                    '       </div>\n' +
                    '   </div>\n' +
                    '</form>\n' +
                    ' </div>\n' +
                    '<div class="box-blank col-1"></div>\n';

                $('#edit-user-view').html(htmlBody);
            }

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

}

function saveUser(user_id) {

    console.log("user_id: " + user_id);
    var fname = document.getElementById('fname_'+user_id+'').value;
    var lname = document.getElementById('lname_'+user_id+'').value;
    var user_name = document.getElementById('user_name_'+user_id+'').value;
    var email = document.getElementById('email_'+user_id+'').value;
    var role = document.getElementById('role_'+user_id+'').value;
    var active = document.getElementById('active_'+user_id+'').value;
    console.log("fname: " + fname);
    console.log("lname: " + lname);
    console.log("user_name: " + user_name);
    console.log("email: " + email);
    console.log("role: " + role);
    console.log("active: " + active);

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/user/" + user_id,
        data: JSON.stringify({
            "fname" : fname,
            "lname" : lname,
            "user_name" : user_name,
            "email" : email,
            "role" : role,
            "active" : active
        }),
        success: function () {

            $("#success-body").html('User Updated');
            $("#success").modal('toggle');

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });


}

function logout() {
    localStorage.clear();
    location.href = "logout.php";
}