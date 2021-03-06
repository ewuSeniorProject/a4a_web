var htmlBody = "";

$(document).ready(function () {
    ActiveUserCardView();
});

function ActiveUserCardView() {

    $('#edit-user-view').html('');
    htmlBody = '';

    $.ajax({
        async: false,
        dataType: 'json',
        url: 'user/active/',
        success: function (data) {

            $('#pageTitle').html('<i class="fas fa-users"></i>&nbsp; Edit Users');
            $('#add_view').html('<div class="nav-link pointer left-sidebar-row left-sidebar-non-link" onclick="AddUserView()" ><i class="fas fa-user-plus"></i> Add User</div>');
            $('#users').html('<div class="nav-link pointer left-sidebar-row left-sidebar-non-link" onclick="InactiveUserCardView()" ><i class="fas fa-user-times"></i> Inactive Users</div>');

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
                    '       <div class="col-5"><label for="change_password_'+data[i].user_id+'"> Password: </label><button type="button" id="change_password_'+data[i].user_id+'" class="btn btn-warning" onclick="ChangePasswordView('+data[i].user_id+',\''+data[i].fname+'\',\''+data[i].lname+'\')"><i class="fas fa-key"></i>&nbsp;Change</button></div>\n' +
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
                    '           <button  type="button" id="save_user_'+data[i].user_id+'" class="btn btn-success" onclick="SaveUser('+data[i].user_id+',0)"><i class="fas fa-save"></i>&nbsp; Save Changes</button>\n' +
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

function InactiveUserCardView() {

    $('#edit-user-view').html('');
    htmlBody = '';

    $.ajax({
        async: false,
        dataType: 'json',
        url: 'user/inactive/',
        success: function (data) {

            $('#pageTitle').html('<i class="fas fa-users"></i>&nbsp; Edit Users');
            $('#add_view').html('<div class="nav-link pointer left-sidebar-row left-sidebar-non-link" onclick="AddUserView()" ><i class="fas fa-user-plus"></i> Add User</div>');
            $('#users').html('<div class="nav-link pointer left-sidebar-row left-sidebar-non-link" onclick="ActiveUserCardView()" ><i class="fas fa-user"></i> Active Users</div>');

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
                    '       <div class="col-5"><label for="change_password_'+data[i].user_id+'"> Password: </label><button type="button" id="change_password_'+data[i].user_id+'" class="btn btn-warning" onclick="ChangePasswordView('+data[i].user_id+',\''+data[i].fname+'\',\''+data[i].lname+'\')"><i class="fas fa-key"></i>&nbsp;Change</button></div>\n' +
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
                    '           <button  type="button" id="save_user_'+data[i].user_id+'" class="btn btn-success" onclick="SaveUser('+data[i].user_id+',1)"><i class="fas fa-save"></i>&nbsp; Save Changes</button>\n' +
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

function SaveUser(user_id, view) {

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
            if(view === 0){
                ActiveUserCardView();
            }
            else {
                InactiveUserCardView();
            }

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
            if(view === 0){
                ActiveUserCardView();
            }
            else {
                InactiveUserCardView();
            }
        }
    });

}

function AddUserView() {

    $('#pageTitle').html('<i class="fas fa-user-plus"></i>&nbsp;Add User');
    $('#add_view').html('<div class="nav-link pointer left-sidebar-row left-sidebar-non-link" onclick="ActiveUserCardView()" ><i class="fas fa-users"></i> Edit Users</div>');
    $('#edit-user-view').empty();

    htmlBody = '<div class="container">\n' +
        '    <div class="card card-fx">\n' +
        '        <div class="card-header col-12">\n' +
        '            <div>\n' +
        '                <span class="h2">Create New User</span>\n' +
        '                <p>Please fill this form to create a new user account.</p>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="card-body">\n' +
        '            <form id="add_user">\n' +
        '                <div class="register-row">\n' +
        '                    <div class="form-group col-6">\n' +
        '                        <label for="fname">First Name</label>\n' +
        '                        <input type="text" name="fname" id="fname" class="form-control" required autofocus>\n' +
        '                    </div>\n' +
        '                    <div class="form-group col-6">\n' +
        '                        <label for="lname">Last Name</label>\n' +
        '                        <input type="text" name="lname" id="lname" class="form-control" required>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="register-row">\n' +
        '                    <div class="form-group col-4">\n' +
        '                        <label for="uname">Username</label>\n' +
        '                        <input type="text" name="uname" id="uname" class="form-control" required>\n' +
        '                    </div>\n' +
        '                    <div class="form-group col-8 ">\n' +
        '                        <label for="email">Email Address</label>\n' +
        '                        <input type="email"  name="email" id="email" class="form-control">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="register-row">\n' +
        '                    <div class="form-group col-6 ">\n' +
        '                        <label for="password">Password</label>\n' +
        '                        <input type="password" name="password" id="password" class="form-control" required>\n' +
        '                    </div>\n' +
        '                    <div class="form-group col-6 ">\n' +
        '                        <label for="confirm_password">Confirm Password</label>\n' +
        '                        <input type="password" name="confirm_password" id="confirm_password" class="form-control" required>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="register-row">\n' +
        '                    <div class="form-group col-6 ">\n' +
        '                        <label for="role">User Role</label>\n' +
        '                        <select name="role" id="role" class="form-control" required>' +
        '                            <option value="user" selected>user</option>\n' +
        '                            <option value="admin">admin</option>' +
        '                       </select>\n' +
        '                    </div>\n' +
        '                    <div class="form-group col-6 ">\n' +
        '                        <label for="active">User Active</label>\n' +
        '                        <select name="active" id="active" class="form-control" required>' +
        '                            <option value="yes" selected>yes</option>\n' +
        '                            <option value="no">no</option>' +
        '                       </select>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="form-group col-12">\n' +
        '                    <button  type="submit" id="save_user" class="btn btn-success col-3"><i class="fas fa-save"></i>&nbsp; Save </button>\n' +
        '                    <input type="reset" class="btn btn-secondary col-3" value="Cancel" onclick="ActiveUserCardView()">\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '        <div class="card-footer">\n ' +
        '             <p></p>' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    $('#edit-user-view').html(htmlBody);
    $('#fname').focus();

    $("#add_user").validate({
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
            uname: {
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
            },
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
            fname: " Must be between 2 and 128 characters long.",
            lname: " Must be between 2 and 128 characters long.",
            user_name: {
                required: " Must be between 2 and 128 characters long.",
                remote: " User name already in use"
            },
            email: {
                required: " Enter a valid email address no longer than 128 characters.",
                remote: " Email address already in use."
            },
            password: " Password must be at least 6 characters long and no more than 128 characters long.",
            confirm_password: " Passwords must match."
        },
        submitHandler: function(form) {
            AddUser();
        }
    });

}

function AddUser() {

    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var user_name = document.getElementById('uname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('confirm_password').value;
    var role = document.getElementById('role').value;
    var active = document.getElementById('active').value;

    $.ajax({
        accepts: "application/json",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: "post/user/",
        data: JSON.stringify({
            "fname" : fname,
            "lname" : lname,
            "user_name" : user_name,
            "email" : email,
            "password" : password,
            "role" : role,
            "active" : active
        }),
        success: function () {

            sendMessage();

            $("#success-body").html('User Created');
            $("#success").modal('toggle');

            setTimeout(ActiveUserCardView(),2500);

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

}

function ChangePasswordView(user_id,fname,lname) {

    $('#edit-user-view').empty();

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
        '                       <button type="submit" id="save_user" class="btn btn-success col-4"><i class="fas fa-save"></i>&nbsp; Save Password</button>\n' +
        '                       <button type="button" class="btn btn-secondary col-4" onclick="ActiveUserCardView()">Cancel</button>\n' +
        '                   </div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '        <div class="card-footer col-12">\n ' +
        '             <p></p>' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    $('#edit-user-view').html(htmlBody);
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
            ChangePassword(user_id);
        }
    });

}

function ChangePassword(user_id) {

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

            $("#success-body").html('Password Changed');
            $("#success").modal('toggle');

            setTimeout(ActiveUserCardView(),2500);

        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

}

function sendMessage() {

    $.ajax({
        accepts: "application/json",
        method: "GET",
        url: "email",
        success: function () {
            console.log("Message sent");
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}