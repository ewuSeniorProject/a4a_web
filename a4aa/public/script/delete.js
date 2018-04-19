var EST_ID = "";
var EST_NAME = "";
var PARK_ID = 0;
var STA_ID = 0;
var REST_ID = 0;
var htmlBody = "";

$(document).ready(function () {
    addEstablishmentCardView();
});

// function EstablishmentViewModel() {
//
//     var self = this;
//     self.establishmentList = ko.observableArray([]);
//
//     self.getEstablishmentList = function (uri) {
//         $.getJSON(uri, function(data) {
//             var mappedObjects = $.map(data, function (item) {
//                 return new EstablishmentModel(item);
//             });
//             self.establishmentList(mappedObjects);
//         })
//     };
//
//     self.onLoad = function () {
//         self.getEstablishmentList("establishment/");
//     };
//
//     self.onLoad();
// }

function addEstablishmentCardView() {

    $('#delete-view').html('');
    htmlBody = '';

    $.ajax({
        async: false,
        dataType: 'json',
        url: 'establishment/',
        success: function (data) {
            for (var i = 0; i < data.length; i ++) {
                htmlBody += '<div class="box-delete col-5">\n' +
                    '    <a class="box-title pointer" onclick="deleteEstablishmentId('+data[i].est_id+')" >\n' +
                    '        <h4 class="col-10">'+data[i].name+'</h4>&nbsp;<div class="icon col-2"><i class="fas fa-trash-alt fa-lg"></i></div><br>\n' +
                    '    </a>\n' +
                    '    <div class="box-padding">\n' +
                    '        <a class="red-link" href="'+data[i].website+'" target="_new">'+data[i].website+'</a><br>\n' +
                    '        <span>'+data[i].phone+'</span><br>\n' +
                    '        <span >'+data[i].phone+'</span><br>\n' +
                    '        <span>'+data[i].city+', '+data[i].state+', '+data[i].zip+'</span><br>\n' +
                    '        <span >'+data[i].contact_fname+' '+data[i].contact_lname+'</span><br>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="box-blank col-1"></div>';

                $('#delete-view').html(htmlBody);

            }
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

}

function deleteEstablishmentId(value) {
    EST_ID = value;
    htmlBody = '';

    $.ajax({
        async: false,
        dataType: 'json',
        url: 'get/establishment/name/' + EST_ID,
        success: function (data) {
            EST_NAME = data[0].name;

            $('#delete-view').html('');

            htmlBody = '<div class="container">\n ' +
                '       <div class="card card-border-delete card-shadow-delete">\n' +
                '           <div class="card-header card-header-color-delete card-header-text-delete" id="cardTitle" >\n' +
                '               <span>Confirm Delete</span>' +
                '           </div>\n' +
                '           <div class="card-body card-body-color-delete" id="cardBody">\n' +
                '              <div class="card-row">\n' +
                '                   <span><h5>Are you sure you want to delete the survey for '+EST_NAME+'?<br><br>\n' +
                '                   <span class="alert-text ">\n ' +
                '                       This action can not be undone. <br>\n' +
                '                       All data will be permanently removed from the database.\n ' +
                '                   </span>\n ' +
                '                   </h5>\n' +
                '                   </span>\n' +
                '               </div>\n' +
                '           </div>\n' +
                '           <div class="card-footer card-header-color-delete text-muted" id="cardFooter">\n' +
                '               <button  type="button" id="yes-delete" class="btn btn-danger" onclick="deleteStart()" ><i class="fas fa-minus-square"></i>&nbsp; Yes</button>&nbsp;\n' +
                '               <button  type="button" id="no-delete" class="btn btn-secondary" onclick="addEstablishmentCardView()"><i class="fas fa-times"></i>&nbsp; Cancel</button>\n' +
                '           </div>\n' +
                '       </div>\n ' +
                '     </div>' ;

            $('#delete-view').html(htmlBody);
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });

}

function deleteStart() {

    htmlBody = '';

    $('#delete-view').html('');

    htmlBody = '<div class="container">\n ' +
        '       <div class="card card-border-delete card-shadow-delete">\n' +
        '           <div class="card-header card-header-color-delete card-header-text-delete" id="cardTitle" >\n' +
        '               <span>Deleting&nbsp;'+EST_NAME+'</span>' +
        '           </div>\n' +
        '           <div class="card-body card-body-color-delete" id="cardBody">\n' +
        '              <div class="card-row">\n' +
        '               <span class="h8">The survey for&nbsp;'+EST_NAME+'&nbsp;is being deleted.</span><br>\n' +
        '           </div>\n' +
        '           </div>\n' +
        '           <div class="card-footer card-header-color-delete text-muted" id="cardFooter">\n' +
        '               <p> </p>\n' +
        '           </div>\n' +
        '       </div>\n' +
        '   </div>' ;

    $('#delete-view').html(htmlBody);

    setTimeout(deleteSurvey, 3500)
}

function deleteSurvey() {

    getParkId(EST_ID);
    getStaBusId(PARK_ID);
    getRestroomId(EST_ID);

    deleteCommunication();
}

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

/**
 *  DELETE FUNCTION SECTION
 */
function deleteCommunication() {

    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/communication/est/' + EST_ID,
        success: function () {
            deleteRestroomInfo();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteRestroomInfo() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/restroom_info/rest/' + REST_ID,
        success: function () {
            deleteRestroom();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteRestroom() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/restroom/est/' + EST_ID,
        success: function () {
            deleteSeating();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteSeating() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/seating/est/' + EST_ID,
        success: function () {
            deleteEmergency();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteEmergency() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/emergency/est/' + EST_ID,
        success: function () {
            deleteSignage();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteSignage() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/signage/est/' + EST_ID,
        success: function () {
            deleteElevator();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteElevator() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/elevator/est/' + EST_ID,
        success: function () {
            deleteInterior();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteInterior() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/interior/est/' + EST_ID,
        success: function () {
            deleteMainEntrance();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteMainEntrance() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/main_entrance/est/' + EST_ID,
        success: function () {
            deleteExteriorRamps();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteExteriorRamps() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/exterior_ramps/est/' + EST_ID,
        success: function () {
            deleteExteriorStairs();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteExteriorStairs() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/exterior_stairs/est/' + EST_ID,
        success: function () {
            deleteExteriorPathways();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteExteriorPathways() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/exterior_pathways/est/' + EST_ID,
        success: function () {
            deleteSTARoute();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteSTARoute() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/sta_route/sta_bus/' + STA_ID,
        success: function () {
            deleteSTABus();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteSTABus() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/sta_bus/park/' + PARK_ID,
        success: function () {
            deletePassengerLoading();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deletePassengerLoading() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/passenger_loading/park/' + PARK_ID,
        success: function () {
            deleteRouteFromParking();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteRouteFromParking() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/route_from_parking/park/' + PARK_ID,
        success: function () {
            deleteParking();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteParking() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/parking/est/' + EST_ID,
        success: function () {
            deleteEstablishment();
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function deleteEstablishment() {
    $.ajax({
        async: false,
        method: 'DELETE',
        url: 'delete/establishment/' + EST_ID,
        success: function () {
            htmlBody = '';

            $('#delete-view').html('');

            htmlBody = '<div class="container">\n ' +
                '       <div class="card card-border-delete card-shadow-delete">\n' +
                '           <div class="card-header card-header-color-delete card-header-text-delete" id="cardTitle" >\n' +
                '               <span>Deleted</span>' +
                '           </div>\n' +
                '           <div class="card-body card-body-color-delete" id="cardBody">\n' +
                '              <div class="card-row">\n' +
                '               <span class="h8">'+EST_NAME+'&nbsp;survey has been successfully removed.<br>\n' +
                '                   The delete page will refresh in a few seconds.\n' +
                '               </span>' +
                '           </div>\n' +
                '           </div>\n' +
                '           <div class="card-footer card-header-color-delete text-muted" id="cardFooter">\n' +
                '               <span><a href="delete.php">Click Here </a> if the page fails to refresh.</span>\n' +
                '           </div>\n' +
                '       </div>\n' +
                '   </div>' ;

            $('#delete-view').html(htmlBody);

            setTimeout("location.href = 'delete.php';",3500);
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}