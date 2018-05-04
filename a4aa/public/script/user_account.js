var htmlBody = "";

$(document).ready(function () {
    UserAccountCardView();
});

function UserAccountCardView() {

    var userData = "";
    htmlBody = '';
    $('#user_account_view').empty();
    $('#user_tag').empty();

    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/user/'+user_id,
        success: function (data) {
            userData = data;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

    $('#user_tag').html('<i class="fas fa-user-circle"></i>&nbsp;'+userData[0].fname+'&nbsp;'+userData[0].lname+'</span></div>');

    htmlBody += '<div class="box-user col-5">\n' +
        ' <form id="update_user" >\n' +
        '    <div class="box-title-user"><span class="col-10 h4"><i class="far fa-user"></i>&emsp;' + userData[0].lname + ',&nbsp;'+ userData[0].fname + '</span></div> \n' +
        '    <div class="card-row">\n' +
        '       <div class="col-6"><label for="fname"> First Name: </label><input type="name" class="form-control" id="fname" value="' + userData[0].fname + '" required></div>\n' +
        '       <div class="col-6"><label for="lname"> Last Name: </label><input type="name" class="form-control" id="lname" value="' + userData[0].lname + '" required></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '       <div class="col-7"><label for="user_name"> User Name: </label><input type="name" class="form-control" id="user_name" value="' + userData[0].user_name + '" required></div>\n' +
        '       <div class="col-6"><label for="change_password"> Password: </label><br><button type="button" id="change_password" class="btn btn-warning" onclick="ChangePasswordView(\''+userData[0].fname+'\',\''+userData[0].lname+'\')"><i class="fas fa-key"></i>&nbsp;Change&nbsp;</button></div>\n' +
        '    </div>\n' +
        '    <div class="card-row">\n' +
        '       <div class="col-12"><label for="email"> Email: </label><input type="email" class="form-control" id="email" value="' + userData[0].email + '" required></div>\n' +
        '    </div>\n' +
        '    <div class="card-row-button">\n' +
        '       <div class="col-8">\n' +
        '           <button type="submit" id="save_user" class="btn btn-success" ><i class="fas fa-save"></i>&nbsp; Save Changes</button>&emsp;\n' +
        '           <button type="button" class="btn btn-secondary" onclick="location.href=\'home.php\';"> Cancel</button>\n' +
        '       </div>\n' +
        '    </div>\n' +
        ' </form>\n' +
        '</div>\n' +
        '<div class="box-blank col-1"></div>\n';

    $('#user_account_view').html(htmlBody);

    $("#update_user").validate({
        rules: {
            fname: {
                required: true,
                minlength: 2,
                maxlength: 128
            },
            lname: {
                required: true,
                minlength: 2,
                maxlength: 128
            },
            user_name: {
                required: true,
                minlength: 2,
                maxlength: 128,
                remote: {
                    url: "/get/user/name/",
                    type: "get"
                }
            },
            email: {
                email: true,
                required: true,
                maxlength: 128,
                remote: {
                    url: "/get/user/email/",
                    type: "get"
                }
            }
        },
        messages: {
            fname: " Must be between 2 and 128 characters long.",
            lname: " Must be between 2 and 128 characters long.",
            user_name: {
                required: " Must be between 2 and 128 characters long.",
                remote: " User name already in use"
            },
            email: {
                required: " Enter a valid email address no longer than 128 characters.",
                remote: " Email address already in use."
            }
        },
        submitHandler: function(form) {
            SaveUser();
        }
    });

}

function SaveUser() {

    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var user_name = document.getElementById('user_name').value;
    var email = document.getElementById('email').value;

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/user/account/" + user_id,
        data: JSON.stringify({
            "fname" : fname,
            "lname" : lname,
            "user_name" : user_name,
            "email" : email
        }),
        success: function () {

            $("#success-body").html('User Updated');
            $("#success").modal('toggle');
            UserAccountCardView();
        },
        error: function(data) {
            $('#alertTitle').html('User Name or Email Address Taken')
            $("#alert-body").html(
                '<span class="h8">\n ' +
                'The user name and/or email address you entered are already in use.<br>\n ' +
                'Please try a different user name and/or email address and save again.\n ' +
                '</span>');
            $("#alertFooter").html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
            $("#alert").modal('toggle');
            UserAccountCardView();
        }
    });

}

function ChangePasswordView(fname,lname) {

    $('#user_account_view').empty();

    htmlBody = '<div class="container">\n' +
        '    <div class="card card-fx">\n' +
        '        <div class="card-header col-12">\n' +
        '            <div>\n' +
        '                <span class="h2">Change Password for '+fname+' '+lname+'</span>\n' +
        '                <p>Please make a note of the new password before changing it as it will not be displayed.</p>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-body col-12">\n' +
        '            <form id="change_password">\n' +
        '                <div class="register-row">\n' +
        '                    <div class="form-group col-6 ">\n' +
        '                        <label for="password">Password</label>\n' +
        '                        <input type="password" name="password" id="password" class="form-control" required>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="register-row">\n' +
        '                    <div class="form-group col-6 ">\n' +
        '                        <label for="confirm_password">Confirm Password</label>\n' +
        '                        <input type="password" name="confirm_password" id="confirm_password" class="form-control" required>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="register-row ">\n' +
        '                    <div class="form-group col-12">\n' +
        '                       <button type="submit" id="save_password" class="btn btn-success col-4"><i class="fas fa-save"></i>&nbsp; Change Password</button>\n' +
        '                       <button type="button" class="btn btn-secondary col-4" onclick="UserAccountCardView()">Cancel</button>\n' +
        '                   </div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '        <div class="card-footer col-12">\n ' +
        '             <p></p>' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    $('#user_account_view').html(htmlBody);
    $('#password').focus();

    $("#change_password").validate({
        rules: {
            password: {
                required: true,
                minlength: 6,
                maxlength: 128
            },
            confirm_password: {
                minlength: 6,
                maxlength: 128,
                equalTo : "#password"
            }
        },
        messages: {
            password: " Password must be at least 6 characters long and no more than 128 characters long.",
            confirm_password: " Passwords must match."
        },
        submitHandler: function(form) {
            ChangePassword();
        }
    });

}

function ChangePassword() {

    var password = document.getElementById('confirm_password').value;

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/user/password/"+user_id,
        data: JSON.stringify({
            "password" : password
        }),
        success: function () {

            $("#success-body").html('Passord Changed');
            $("#success").modal('toggle');

            setTimeout(UserAccountCardView(),2500);

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
            UserAccountCardView();
        }
    });

}