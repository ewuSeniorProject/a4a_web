const API_ROOT = 'http://www.mizesolutions.com/a4a_web/a4aa/public/';
const EST_ID = localStorage.getItem("establishmentID");
var PARK_ID;
var CAT_ID;
var CONFIG_ID;
var USER_ID;

$(document).ready(function () {

    getParkId(EST_ID);
    getIds(EST_ID);

    function EstablishmentModel(parm) {
        //console.log("EstablishmentModel(parm) : " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.est_id = ko.observable(parm.data.est_id);
        this.name = ko.observable(parm.data.name);
        this.name.focused = ko.observable(false);
        this.website = ko.observable(parm.data.website);
        this.website.focused = ko.observable(false);
        this.cat_id = ko.observable(parm.data.cat_id);
        this.cat_id.focused = ko.observable(false);
        this.subtype = ko.observable(parm.data.subtype);
        this.subtype.focused = ko.observable(false);
        this.config_id = ko.observable(parm.data.config_id);
        this.config_id.focused = ko.observable(false);
        this.street = ko.observable(parm.data.street);
        this.street.focused = ko.observable(false);
        this.city = ko.observable(parm.data.city);
        this.city.focused = ko.observable(false);
        this.state = ko.observable(parm.data.state);
        this.state.focused = ko.observable(false);
        this.zip = ko.observable(parm.data.zip);
        this.zip.focused = ko.observable(false);
        this.phone = ko.observable(parm.data.phone);
        this.phone.focused = ko.observable(false);
        this.phone_tty = ko.observable(parm.data.tty);
        this.phone_tty.focused = ko.observable(false);
        this.contact_fname = ko.observable(parm.data.contact_fname);
        this.contact_fname.focused = ko.observable(false);
        this.contact_lname = ko.observable(parm.data.contact_lname);
        this.contact_lname.focused = ko.observable(false);
        this.contact_title = ko.observable(parm.data.contact_title);
        this.contact_title.focused = ko.observable(false);
        this.contact_email = ko.observable(parm.data.contact_email);
        this.contact_email.focused = ko.observable(false);
        this.date = ko.observable(parm.data.date);
        this.date.focused = ko.observable(false);
        this.user_id = ko.observable(parm.data.user_id);
        this.user_id.focused = ko.observable(false);
    }

    function EstablishmentViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.establishmentList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.establishmentList($.map(data, function (item) {
                    return new EstablishmentModel({data:item, postUri:postUri, putUri:putUri});
                }));
            }
        });

        // $.getJSON(getUri, function (data) {
        //     self.establishmentList($.map(data, function (item) {
        //         return new EstablishmentModel({data:item, postUri:postUri, putUri:putUri});
        //     }));
        // });

        // self.removeItem = function (item) {
        //     var con = confirm("Delete this record?");
        //     if (con){
        //         self.establishmentList.remove(item);
        //         removeRequest(deleteUri, item.est_id());
        //     }
        // };
        //
        // self.addItem = function () {
        //     self.establishmentList.push(new EstablishmentModel({name: "", postUri:postUri, putUri:putUri}));
        // };
    }

    function CategoryModel(data) {
        // console.log("CategoryModel(data): " + JSON.stringify(data));
        this.category_id = ko.observable(data.cat_id);
        this.category_id.focused = ko.observable(false);
        this.category_name = ko.observable(data.name);
        this.category_name.focused = ko.observable(false);
    }

    function CategoryViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.categoryList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.categoryList($.map(data, function (item) {
                    return new CategoryModel(item);
                }));
            }
        });

        // $.getJSON(getUri, function (data) {
        //     self.categoryList($.map(data, function (item) {
        //         return new CategoryModel(item);
        //     }));
        // });

        // self.removeItem = function (item) {
        //     var con = confirm("Delete this record?");
        //     if (con){
        //         self.obsList.remove(item);
        //         removeRequest(deleteUri, item.name());
        //     }
        // };
        //
        // self.addItem = function () {
        //     self.obsList.push(new Model({name: "", postUri:postUri, putUri:putUri}));
        // };
    }

    function ParkingModel(parm) {
        // console.log("ParkingModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.park_id = ko.observable(parm.data.park_id);
        this.lot_free = ko.observable(parm.data.lot_free);
        this.lot_free.focused = ko.observable(false);
        this.street_metered = ko.observable(parm.data.street_metered);
        this.street_metered.focused = ko.observable(false);
        this.parking_type = ko.observable(parm.data.parking_type);
        this.parking_type.focused = ko.observable(false);
        this.total_num_spaces = ko.observable(parm.data.total_num_spaces);
        this.total_num_spaces.focused = ko.observable(false);
        this.num_reserved_spaces = ko.observable(parm.data.num_reserved_spaces);
        this.num_reserved_spaces.focused = ko.observable(false);
        this.num_accessable_space = ko.observable(parm.data.num_accessable_space);
        this.num_accessable_space.focused = ko.observable(false);
        this.num_van_accessible = ko.observable(parm.data.num_van_accessible);
        this.num_van_accessible.focused = ko.observable(false);
        this.reserve_space_sign = ko.observable(parm.data.reserve_space_sign);
        this.reserve_space_sign.focused = ko.observable(false);
        this.reserve_space_obstacles = ko.observable(parm.data.reserve_space_obstacles);
        this.reserve_space_obstacles.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function ParkingViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.parkingList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.parkingList($.map(data, function (item) {
                    return new ParkingModel({data:item, postUri:postUri, putUri:putUri});
                }));
            }
        });

        // $.getJSON(getUri, function (data) {
        //     self.parkingList($.map(data, function (item) {
        //         return new ParkingModel({data:item, postUri:postUri, putUri:putUri});
        //     }));
        // });

        // self.removeItem = function (item) {
        //     var con = confirm("Delete this record?");
        //     if (con){
        //         self.parkingList.remove(item);
        //         removeRequest(deleteUri, item.est_id());
        //     }
        // };
        //
        // self.addItem = function () {
        //     self.parkingList.push(new ParkingModel({name: "", postUri:postUri, putUri:putUri}));
        // };
    }

    function RouteFromParkingModel(parm) {
        // console.log("ParkingModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.route_park_id = ko.observable(parm.data.route_park_id);
        this.distance = ko.observable(parm.data.distance);
        this.distance.focused = ko.observable(false);
        this.min_width = ko.observable(parm.data.min_width);
        this.min_width.focused = ko.observable(false);
        this.route_surface = ko.observable(parm.data.route_surface);
        this.route_surface.focused = ko.observable(false);
        this.route_curbs = ko.observable(parm.data.route_curbs);
        this.route_curbs.focused = ko.observable(false);
        this.tactile_warning = ko.observable(parm.data.tactile_warning);
        this.tactile_warning.focused = ko.observable(false);
        this.covered = ko.observable(parm.data.covered);
        this.covered.focused = ko.observable(false);
        this.lighting = ko.observable(parm.data.lighting);
        this.lighting.focused = ko.observable(false);
        this.lighting_option = ko.observable(parm.data.lighting_option);
        this.lighting_option.focused = ko.observable(false);
        this.lighting_type = ko.observable(parm.data.lighting_type);
        this.lighting_type.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.park_id = ko.observable(parm.data.park_id);
        this.park_id.focused = ko.observable(false);
    }

    function RouteFromParkingViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.routeFromParkingList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.routeFromParkingList($.map(data, function (item) {
                    return new RouteFromParkingModel({data:item, postUri:postUri, putUri:putUri});
                }));
            }
        });

        // $.getJSON(getUri, function (data) {
        //         self.routeFromParkingList($.map(data, function (item) {
        //         return new RouteFromParkingModel({data:item, postUri:postUri, putUri:putUri});
        //     }));
        // });

        // self.removeItem = function (item) {
        //     var con = confirm("Delete this record?");
        //     if (con){
        //         self.parkingList.remove(item);
        //         removeRequest(deleteUri, item.est_id());
        //     }
        // };
        //
        // self.addItem = function () {
        //     self.parkingList.push(new ParkingModel({name: "", postUri:postUri, putUri:putUri}));
        // };
    }

    function UserModel(parm) {
        // console.log("UserModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.user_id = ko.observable(parm.data.user_id);
        this.name = ko.observable(parm.data.fname + " " + parm.data.lname);
        this.name.focused = ko.observable(false);
    }

    function UserViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.userList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.userList($.map(data, function (item) {
                    return new UserModel({data:item, postUri:postUri, putUri:putUri});
                }));
            }
        });

        // $.getJSON(getUri, function (data) {
        //     self.userList($.map(data, function (item) {
        //         return new UserModel({data:item, postUri:postUri, putUri:putUri});
        //     }));
        // });

        // self.removeItem = function (item) {
        //     var con = confirm("Delete this record?");
        //     if (con){
        //         self.parkingList.remove(item);
        //         removeRequest(deleteUri, item.est_id());
        //     }
        // };
        //
        // self.addItem = function () {
        //     self.parkingList.push(new ParkingModel({name: "", postUri:postUri, putUri:putUri}));
        // };
    }

    var myParentVM = {
           establishmentVM : new EstablishmentViewModel('get/establishment/' + EST_ID, 'delete/establishment/' + EST_ID, 'post/establishment/' + EST_ID, 'put/establishment/' + EST_ID),
                categoryVM : new CategoryViewModel('category/', 'delete/category/', 'post/category/', 'put/category/'),
                    userVM : new UserViewModel('user/', 'delete/user/', 'post/user/', 'put/user/'),
                 parkingVM : new ParkingViewModel('get/parking/est/' + EST_ID, 'delete/parking/est/' + EST_ID, 'post/parking/', 'put/parking/est/' + EST_ID),
        routeFromParkingVM : new RouteFromParkingViewModel('get/route_from_parking/park/' + PARK_ID, 'delete/route_from_parking/park/' + PARK_ID, 'post/route_from_parking/', 'put/route_from_parking/park/' + PARK_ID),
    };

    ko.applyBindings(myParentVM);

    // ko.applyBindings(new EstablishmentViewModel('get/establishment/' + ESTABLISHMENTID, 'delete/establishment/' + ESTABLISHMENTID, 'post/establishment/' + ESTABLISHMENTID, 'put/establishment/' + ESTABLISHMENTID), document.getElementById('collapseOne'));
    // ko.applyBindings(new CategoryViewModel('category/', 'delete/category/', 'post/category/', 'put/category/'), document.getElementById('categoryVM'));
    // ko.applyBindings(new ParkingViewModel('/get/parking/est/' + ESTABLISHMENTID, 'delete/parking/est/' + ESTABLISHMENTID, 'post/parking/', 'put/parking/est/' + ESTABLISHMENTID), document.getElementById('collapseTwo'));
    // ko.applyBindings(new ViewModel('get/durations', 'delete/duration', 'post/duration', 'put/duration'), document.getElementById('durations-view'));
    // ko.applyBindings(new ViewModel('get/ranges', 'delete/range', 'post/range', 'put/range'), document.getElementById('ranges-view'));
    // ko.applyBindings(new ViewModel('get/schools', 'delete/school', 'post/school' , 'put/school'), document.getElementById('schools-view'));
    // ko.applyBindings(new ViewModel('get/tags', 'delete/tag', 'post/tag', 'put/tag'), document.getElementById('tags-view'));
    // ko.applyBindings(new ViewModel('get/tiers', 'delete/tier', 'post/tier', 'put/tier'), document.getElementById('tiers-view'));

    console.log("EST_ID: " + EST_ID);
    console.log("PARK_ID: " + PARK_ID);
    console.log("CAT_ID: " + CAT_ID);
    console.log("CONFIG_ID: " + CONFIG_ID);
    console.log("USER_ID: " + USER_ID);
});

function getParkId(value) {
    $.ajax ({
        async: false,
        dataType: 'json',
        url: 'get/park_id/est/' + value,
        success: function (data) {
            // console.log("getParkId data: " + JSON.stringify(data));
            // console.log("data[0].park_id : " + data[0].park_id);
            PARK_ID = data[0].park_id;
        }
    });
}

function getIds(value) {
    $.ajax ({
        async: false,
        dataType: 'json',
        url: 'get/establishment/' + value,
        success: function (data) {
            CAT_ID = data[0].cat_id;
            CONFIG_ID = data[0].config_id;
            USER_ID = data[0].user_id;
        }
    });
}

function removeRequest(uri, record) {
    $.ajax({
        method:"DELETE",
        url:uri,
        data:{data:record}
    }).done(function (data) {
        //console.log(data);
    }).fail(function (data) {
        console.error(data);
    });
}

function editRequest(uri, oldRecord, newRecord) {
    var json = {
        oldRecord:oldRecord,
        newRecord:newRecord
    };

    var data = JSON.stringify(json);
    $.ajax({
        method:"PUT",
        url:uri,
        data:{data:data}
    }).done(function (data) {
        //console.log(data);
    }).fail(function (data) {
        console.error(data);
    });
}

function newRecordRequest(uri, record){
    $.ajax({
        method:"POST",
        url:uri,
        data:{data:record}
    }).done(function (data) {
        console.log(data);
    }).fail(function (data) {
        console.error(data);
    });
}

