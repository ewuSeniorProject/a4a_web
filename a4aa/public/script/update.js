const API_ROOT = 'http://www.mizesolutions.com/a4a_web/a4aa/public/';
const EST_ID = localStorage.getItem("establishmentID");
var PARK_ID;
var CAT_ID;
var CONFIG_ID;
var USER_ID;
var STA_ID;
var REST_ID;

$(document).ready(function () {

    getParkId(EST_ID);
    getIds(EST_ID);
    getStaBusId(PARK_ID);
    getRestroomId(EST_ID);

    // Scrolls selected accordion card to the top of the page
    $('.collapse').on('shown.bs.collapse', function(e) {
        var $card = $(this).closest('.card');
        $('html,body').animate({
            scrollTop: $card.offset().top - 112
        }, 500);
    });

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

    function PassengerLoadingModel(parm) {
        //console.log("PassengerLoadingModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.passenger_id = ko.observable(parm.data.passenger_id);
        this.designated_zone = ko.observable(parm.data.designated_zone);
        this.designated_zone.focused = ko.observable(false);
        this.distance = ko.observable(parm.data.distance);
        this.distance.focused = ko.observable(false);
        this.min_width = ko.observable(parm.data.min_width);
        this.min_width.focused = ko.observable(false);
        this.passenger_surface = ko.observable(parm.data.passenger_surface);
        this.passenger_surface.focused = ko.observable(false);
        this.tactile_warning_strips = ko.observable(parm.data.tactile_warning_strips);
        this.tactile_warning_strips.focused = ko.observable(false);
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

    function PassengerLoadingViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.passengerLoadingList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.passengerLoadingList($.map(data, function (item) {
                    return new PassengerLoadingModel({data:item, postUri:postUri, putUri:putUri});
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

    function StaBusModel(parm) {
        // console.log("StaBusModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.sta_id = ko.observable(parm.data.sta_id);
        this.sta_service_area = ko.observable(parm.data.sta_service_area);
        this.sta_service_area.focused = ko.observable(false);
        this.distance = ko.observable(parm.data.distance);
        this.distance.focused = ko.observable(false);
        this.min_width = ko.observable(parm.data.min_width);
        this.min_width.focused = ko.observable(false);
        this.route_surface = ko.observable(parm.data.route_surface);
        this.route_surface.focused = ko.observable(false);
        this.tactile_warning_strips = ko.observable(parm.data.tactile_warning_strips);
        this.tactile_warning_strips.focused = ko.observable(false);
        this.curb_cuts = ko.observable(parm.data.curb_cuts);
        this.curb_cuts.focused = ko.observable(false);
        this.lighting = ko.observable(parm.data.lighting);
        this.lighting.focused = ko.observable(false);
        this.lighting_option = ko.observable(parm.data.lighting_option);
        this.lighting_option.focused = ko.observable(false);
        this.lighting_type = ko.observable(parm.data.lighting_type);
        this.lighting_type.focused = ko.observable(false);
        this.shelter_bench = ko.observable(parm.data.shelter_bench);
        this.shelter_bench.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.park_id = ko.observable(parm.data.park_id);
        this.park_id.focused = ko.observable(false);
    }

    function StaBusViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.staBusList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.staBusList($.map(data, function (item) {
                    return new StaBusModel({data:item, postUri:postUri, putUri:putUri});
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

    function StaBusRouteModel(parm) {
        //console.log("StaBusRouteModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.sta_route_id = ko.observable(parm.data.sta_route_id);
        this.route_num = ko.observable(parm.data.route_num);
        this.route_num.focused = ko.observable(false);
        this.north_bound_stop = ko.observable(parm.data.north_bound_stop);
        this.north_bound_stop.focused = ko.observable(false);
        this.south_bound_stop = ko.observable(parm.data.south_bound_stop);
        this.south_bound_stop.focused = ko.observable(false);
        this.east_bound_stop = ko.observable(parm.data.east_bound_stop);
        this.east_bound_stop.focused = ko.observable(false);
        this.west_bound_stop = ko.observable(parm.data.west_bound_stop);
        this.west_bound_stop.focused = ko.observable(false);
        this.sta_bus_id = ko.observable(parm.data.sta_bus_id);
        this.sta_bus_id.focused = ko.observable(false);
    }

    function StaBusRouteViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.staBusRouteList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.staBusRouteList($.map(data, function (item) {
                    return new StaBusRouteModel({data:item, postUri:postUri, putUri:putUri});
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

    function StaBusModel(parm) {
        //console.log("StaBusModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.sta_id = ko.observable(parm.data.sta_id);
        this.sta_service_area = ko.observable(parm.data.sta_service_area);
        this.sta_service_area.focused = ko.observable(false);
        this.distance = ko.observable(parm.data.distance);
        this.distance.focused = ko.observable(false);
        this.min_width = ko.observable(parm.data.min_width);
        this.min_width.focused = ko.observable(false);
        this.route_surface = ko.observable(parm.data.route_surface);
        this.route_surface.focused = ko.observable(false);
        this.tactile_warning_strips = ko.observable(parm.data.tactile_warning_strips);
        this.tactile_warning_strips.focused = ko.observable(false);
        this.curb_cuts = ko.observable(parm.data.curb_cuts);
        this.curb_cuts.focused = ko.observable(false);
        this.lighting = ko.observable(parm.data.lighting);
        this.lighting.focused = ko.observable(false);
        this.lighting_option = ko.observable(parm.data.lighting_option);
        this.lighting_option.focused = ko.observable(false);
        this.lighting_type = ko.observable(parm.data.lighting_type);
        this.lighting_type.focused = ko.observable(false);
        this.shelter_bench = ko.observable(parm.data.shelter_bench);
        this.shelter_bench.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.park_id = ko.observable(parm.data.park_id);
        this.park_id.focused = ko.observable(false);
    }

    function StaBusViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.staBusList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.staBusList($.map(data, function (item) {
                    return new StaBusModel({data:item, postUri:postUri, putUri:putUri});
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

    function ExteriorPathwayModel(parm) {
        //console.log("ExteriorPathwayModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.ext_path_id = ko.observable(parm.data.ext_path_id);
        this.service_animal = ko.observable(parm.data.service_animal);
        this.service_animal.focused = ko.observable(false);
        this.service_animal_location = ko.observable(parm.data.service_animal_location);
        this.service_animal_location.focused = ko.observable(false);
        this.has_exterior_path = ko.observable(parm.data.has_exterior_path);
        this.has_exterior_path.focused = ko.observable(false);
        this.min_width = ko.observable(parm.data.min_width);
        this.min_width.focused = ko.observable(false);
        this.pathway_surface = ko.observable(parm.data.pathway_surface);
        this.pathway_surface.focused = ko.observable(false);
        this.pathway_curbs = ko.observable(parm.data.pathway_curbs);
        this.pathway_curbs.focused = ko.observable(false);
        this.tactile_warning = ko.observable(parm.data.tactile_warning);
        this.tactile_warning.focused = ko.observable(false);
        this.slope = ko.observable(parm.data.slope);
        this.slope.focused = ko.observable(false);
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
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function ExteriorPathwayViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.exteriorPathwayList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.exteriorPathwayList($.map(data, function (item) {
                    return new ExteriorPathwayModel({data:item, postUri:postUri, putUri:putUri});
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

    function ExteriorStairsModel(parm) {
        //console.log("ExteriorStairsModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.ext_stair_id = ko.observable(parm.data.ext_stair_id);
        this.stairs_required = ko.observable(parm.data.stairs_required);
        this.stairs_required.focused = ko.observable(false);
        this.stairs_available = ko.observable(parm.data.stairs_available);
        this.stairs_available.focused = ko.observable(false);
        this.num_stairs = ko.observable(parm.data.num_stairs);
        this.num_stairs.focused = ko.observable(false);
        this.handrail_both_sides = ko.observable(parm.data.handrail_both_sides);
        this.handrail_both_sides.focused = ko.observable(false);
        this.handrail_side = ko.observable(parm.data.handrail_side);
        this.handrail_side.focused = ko.observable(false);
        this.handrail_requlations_height = ko.observable(parm.data.handrail_requlations_height);
        this.handrail_requlations_height.focused = ko.observable(false);
        this.handrail_height = ko.observable(parm.data.handrail_height);
        this.handrail_height.focused = ko.observable(false);
        this.obstacles = ko.observable(parm.data.obstacles);
        this.obstacles.focused = ko.observable(false);
        this.clearly_marked = ko.observable(parm.data.clearly_marked);
        this.clearly_marked.focused = ko.observable(false);
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
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function ExteriorStairsViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.exteriorStairsList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.exteriorStairsList($.map(data, function (item) {
                    return new ExteriorStairsModel({data:item, postUri:postUri, putUri:putUri});
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

    function ExteriorRampsModel(parm) {
        //console.log("ExteriorRampsModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.ext_ramp_id = ko.observable(parm.data.ext_ramp_id);
        this.ramp_required = ko.observable(parm.data.ramp_required);
        this.ramp_required.focused = ko.observable(false);
        this.ramp_available = ko.observable(parm.data.ramp_available);
        this.ramp_available.focused = ko.observable(false);
        this.min_width = ko.observable(parm.data.min_width);
        this.min_width.focused = ko.observable(false);
        this.width_between_handrails = ko.observable(parm.data.width_between_handrails);
        this.width_between_handrails.focused = ko.observable(false);
        this.min_slope = ko.observable(parm.data.min_slope);
        this.min_slope.focused = ko.observable(false);
        this.slope = ko.observable(parm.data.slope);
        this.slope.focused = ko.observable(false);
        this.level_landing_both = ko.observable(parm.data.level_landing_both);
        this.level_landing_both.focused = ko.observable(false);
        this.level_landing_location = ko.observable(parm.data.level_landing_location);
        this.level_landing_location.focused = ko.observable(false);
        this.obstacles = ko.observable(parm.data.obstacles);
        this.obstacles.focused = ko.observable(false);
        this.handrails_both_sides = ko.observable(parm.data.handrails_both_sides);
        this.handrails_both_sides.focused = ko.observable(false);
        this.handrail_sides = ko.observable(parm.data.handrail_sides);
        this.handrail_sides.focused = ko.observable(false);
        this.handrail_requlations_height = ko.observable(parm.data.handrail_requlations_height);
        this.handrail_requlations_height.focused = ko.observable(false);
        this.handrail_height = ko.observable(parm.data.handrail_height);
        this.handrail_height.focused = ko.observable(false);
        this.side_guards = ko.observable(parm.data.side_guards);
        this.side_guards.focused = ko.observable(false);
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
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function ExteriorRampsViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.exteriorRampsList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.exteriorRampsList($.map(data, function (item) {
                    return new ExteriorRampsModel({data:item, postUri:postUri, putUri:putUri});
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

    function MainEntranceModel(parm) {
        //console.log("MainEntranceModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.main_ent_id = ko.observable(parm.data.main_ent_id);
        this.total_num_public_entrances = ko.observable(parm.data.total_num_public_entrances);
        this.total_num_public_entrances.focused = ko.observable(false);
        this.main_ent_accessible = ko.observable(parm.data.main_ent_accessible);
        this.main_ent_accessible.focused = ko.observable(false);
        this.alt_ent_accessible = ko.observable(parm.data.alt_ent_accessible);
        this.alt_ent_accessible.focused = ko.observable(false);
        this.accessable_signage = ko.observable(parm.data.accessable_signage);
        this.accessable_signage.focused = ko.observable(false);
        this.ground_level = ko.observable(parm.data.ground_level);
        this.ground_level.focused = ko.observable(false);
        this.threshold_level = ko.observable(parm.data.threshold_level);
        this.threshold_level.focused = ko.observable(false);
        this.threshold_beveled = ko.observable(parm.data.threshold_beveled);
        this.threshold_beveled.focused = ko.observable(false);
        this.beveled_height = ko.observable(parm.data.beveled_height);
        this.beveled_height.focused = ko.observable(false);
        this.door_action = ko.observable(parm.data.door_action);
        this.door_action.focused = ko.observable(false);
        this.door_open_clearance = ko.observable(parm.data.door_open_clearance);
        this.door_open_clearance.focused = ko.observable(false);
        this.opening_measurement = ko.observable(parm.data.opening_measurement);
        this.opening_measurement.focused = ko.observable(false);
        this.door_easy_open = ko.observable(parm.data.door_easy_open);
        this.door_easy_open.focused = ko.observable(false);
        this.door_open_force = ko.observable(parm.data.door_open_force);
        this.door_open_force.focused = ko.observable(false);
        this.door_use_with_fist = ko.observable(parm.data.door_use_with_fist);
        this.door_use_with_fist.focused = ko.observable(false);
        this.door_auto_open = ko.observable(parm.data.door_auto_open);
        this.door_auto_open.focused = ko.observable(false);
        this.second_door_inside = ko.observable(parm.data.second_door_inside);
        this.second_door_inside.focused = ko.observable(false);
        this.min_dist_between_doors = ko.observable(parm.data.min_dist_between_doors);
        this.min_dist_between_doors.focused = ko.observable(false);
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
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function MainEntranceViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.mainEntranceList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.mainEntranceList($.map(data, function (item) {
                    return new MainEntranceModel({data:item, postUri:postUri, putUri:putUri});
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

    function InteriorModel(parm) {
        //console.log("InteriorModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.interior_id = ko.observable(parm.data.interior_id);
        this.int_door_open_clearance = ko.observable(parm.data.int_door_open_clearance);
        this.int_door_open_clearance.focused = ko.observable(false);
        this.int_opening_measurement = ko.observable(parm.data.int_opening_measurement);
        this.int_opening_measurement.focused = ko.observable(false);
        this.int_door_easy_open = ko.observable(parm.data.int_door_easy_open);
        this.int_door_easy_open.focused = ko.observable(false);
        this.int_door_open_force = ko.observable(parm.data.int_door_open_force);
        this.int_door_open_force.focused = ko.observable(false);
        this.int_door_use_with_fist = ko.observable(parm.data.int_door_use_with_fist);
        this.int_door_use_with_fist.focused = ko.observable(false);
        this.five_second_close = ko.observable(parm.data.five_second_close);
        this.five_second_close.focused = ko.observable(false);
        this.hallway_width = ko.observable(parm.data.hallway_width);
        this.hallway_width.focused = ko.observable(false);
        this.narrowest_width = ko.observable(parm.data.narrowest_width);
        this.narrowest_width.focused = ko.observable(false);
        this.wheelchair_turnaround = ko.observable(parm.data.wheelchair_turnaround);
        this.wheelchair_turnaround.focused = ko.observable(false);
        this.hallway_obstacles = ko.observable(parm.data.hallway_obstacles);
        this.hallway_obstacles.focused = ko.observable(false);
        this.hallway_clear = ko.observable(parm.data.hallway_clear);
        this.hallway_clear.focused = ko.observable(false);
        this.lighting = ko.observable(parm.data.lighting);
        this.lighting.focused = ko.observable(false);
        this.lighting_type = ko.observable(parm.data.lighting_type);
        this.lighting_type.focused = ko.observable(false);
        this.service_counter = ko.observable(parm.data.service_counter);
        this.service_counter.focused = ko.observable(false);
        this.counter_height = ko.observable(parm.data.counter_height);
        this.counter_height.focused = ko.observable(false);
        this.writing_surface_height = ko.observable(parm.data.writing_surface_height);
        this.writing_surface_height.focused = ko.observable(false);
        this.drinking_fountain = ko.observable(parm.data.drinking_fountain);
        this.drinking_fountain.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function InteriorViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.interiorList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.interiorList($.map(data, function (item) {
                    return new InteriorModel({data:item, postUri:postUri, putUri:putUri});
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

    function ElevatorModel(parm) {
        //console.log("ElevatorModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.elevator_id = ko.observable(parm.data.elevator_id);
        this.is_elevator = ko.observable(parm.data.is_elevator);
        this.is_elevator.focused = ko.observable(false);
        this.location = ko.observable(parm.data.location);
        this.location.focused = ko.observable(false);
        this.works = ko.observable(parm.data.works);
        this.works.focused = ko.observable(false);
        this.no_assist = ko.observable(parm.data.no_assist);
        this.no_assist.focused = ko.observable(false);
        this.button_height = ko.observable(parm.data.button_height);
        this.button_height.focused = ko.observable(false);
        this.outside_btn_height = ko.observable(parm.data.outside_btn_height);
        this.outside_btn_height.focused = ko.observable(false);
        this.inside_btn_height = ko.observable(parm.data.inside_btn_height);
        this.inside_btn_height.focused = ko.observable(false);
        this.button_use_fist = ko.observable(parm.data.button_use_fist);
        this.button_use_fist.focused = ko.observable(false);
        this.braille = ko.observable(parm.data.braille);
        this.braille.focused = ko.observable(false);
        this.audible_tones = ko.observable(parm.data.audible_tones);
        this.audible_tones.focused = ko.observable(false);
        this.lighting = ko.observable(parm.data.lighting);
        this.lighting.focused = ko.observable(false);
        this.lighting_type = ko.observable(parm.data.lighting_type);
        this.lighting_type.focused = ko.observable(false);
        this.elevator_depth = ko.observable(parm.data.elevator_depth);
        this.elevator_depth.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function ElevatorViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.elevatorList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.elevatorList($.map(data, function (item) {
                    return new ElevatorModel({data:item, postUri:postUri, putUri:putUri});
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

    function SignageModel(parm) {
        //console.log("SignageModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.sign_id = ko.observable(parm.data.sign_id);
        this.is_directory = ko.observable(parm.data.is_directory);
        this.is_directory.focused = ko.observable(false);
        this.door_signs = ko.observable(parm.data.door_signs);
        this.door_signs.focused = ko.observable(false);
        this.sign_height = ko.observable(parm.data.sign_height);
        this.sign_height.focused = ko.observable(false);
        this.pub_sign_braile = ko.observable(parm.data.pub_sign_braile);
        this.pub_sign_braile.focused = ko.observable(false);
        this.sign_high_contrast = ko.observable(parm.data.sign_high_contrast);
        this.sign_high_contrast.focused = ko.observable(false);
        this.sign_images = ko.observable(parm.data.sign_images);
        this.sign_images.focused = ko.observable(false);
        this.written_material_images = ko.observable(parm.data.written_material_images);
        this.written_material_images.focused = ko.observable(false);
        this.menu_access = ko.observable(parm.data.menu_access);
        this.menu_access.focused = ko.observable(false);
        this.alt_info = ko.observable(parm.data.alt_info);
        this.alt_info.focused = ko.observable(false);
        this.alt_info_type = ko.observable(parm.data.alt_info_type);
        this.alt_info_type.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function SignageViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.signageList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.signageList($.map(data, function (item) {
                    return new SignageModel({data:item, postUri:postUri, putUri:putUri});
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

    function EmergencyModel(parm) {
        //console.log("EmergencyModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.emergency_id = ko.observable(parm.data.emergency_id);
        this.evac_info = ko.observable(parm.data.evac_info);
        this.evac_info.focused = ko.observable(false);
        this.alt_evac_info = ko.observable(parm.data.alt_evac_info);
        this.alt_evac_info.focused = ko.observable(false);
        this.evac_info_format = ko.observable(parm.data.evac_info_format);
        this.evac_info_format.focused = ko.observable(false);
        this.alarms = ko.observable(parm.data.alarms);
        this.alarms.focused = ko.observable(false);
        this.location_no_flash = ko.observable(parm.data.location_no_flash);
        this.location_no_flash.focused = ko.observable(false);
        this.shelter = ko.observable(parm.data.shelter);
        this.shelter.focused = ko.observable(false);
        this.signs_to_exit = ko.observable(parm.data.signs_to_exit);
        this.signs_to_exit.focused = ko.observable(false);
        this.wheelchair_plan = ko.observable(parm.data.wheelchair_plan);
        this.wheelchair_plan.focused = ko.observable(false);
        this.floor_plan_routes = ko.observable(parm.data.floor_plan_routes);
        this.floor_plan_routes.focused = ko.observable(false);
        this.fire_alarm_height = ko.observable(parm.data.fire_alarm_height);
        this.fire_alarm_height.focused = ko.observable(false);
        this.fire_extinguisher_height = ko.observable(parm.data.fire_extinguisher_height);
        this.fire_extinguisher_height.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function EmergencyViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.emergencyList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.emergencyList($.map(data, function (item) {
                    return new EmergencyModel({data:item, postUri:postUri, putUri:putUri});
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

    function SeatingModel(parm) {
        //console.log("SeatingModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.seating_id = ko.observable(parm.data.seating_id);
        this.seating_no_step = ko.observable(parm.data.seating_no_step);
        this.seating_no_step.focused = ko.observable(false);
        this.table_aisles = ko.observable(parm.data.table_aisles);
        this.table_aisles.focused = ko.observable(false);
        this.legroom = ko.observable(parm.data.legroom);
        this.legroom.focused = ko.observable(false);
        this.num_legroom = ko.observable(parm.data.num_legroom);
        this.num_legroom.focused = ko.observable(false);
        this.rearranged = ko.observable(parm.data.rearranged);
        this.rearranged.focused = ko.observable(false);
        this.num_table_rearranged = ko.observable(parm.data.num_table_rearranged);
        this.num_table_rearranged.focused = ko.observable(false);
        this.num_chair_rearranged = ko.observable(parm.data.num_chair_rearranged);
        this.num_chair_rearranged.focused = ko.observable(false);
        this.round_tables = ko.observable(parm.data.round_tables);
        this.round_tables.focused = ko.observable(false);
        this.num_round_tables = ko.observable(parm.data.num_round_tables);
        this.num_round_tables.focused = ko.observable(false);
        this.lighting = ko.observable(parm.data.lighting);
        this.lighting.focused = ko.observable(false);
        this.lighting_option = ko.observable(parm.data.lighting_option);
        this.lighting_option.focused = ko.observable(false);
        this.lighting_type = ko.observable(parm.data.lighting_type);
        this.lighting_type.focused = ko.observable(false);
        this.adjustable_lighting = ko.observable(parm.data.adjustable_lighting);
        this.adjustable_lighting.focused = ko.observable(false);
        this.low_visual_slim = ko.observable(parm.data.low_visual_slim);
        this.low_visual_slim.focused = ko.observable(false);
        this.quiet_table = ko.observable(parm.data.quiet_table);
        this.quiet_table.focused = ko.observable(false);
        this.low_sound = ko.observable(parm.data.low_sound);
        this.low_sound.focused = ko.observable(false);
        this.designated_space = ko.observable(parm.data.designated_space);
        this.designated_space.focused = ko.observable(false);
        this.num_desig_space = ko.observable(parm.data.num_desig_space);
        this.num_desig_space.focused = ko.observable(false);
        this.companion_space = ko.observable(parm.data.companion_space);
        this.companion_space.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function SeatingViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.seatingList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.seatingList($.map(data, function (item) {
                    return new SeatingModel({data:item, postUri:postUri, putUri:putUri});
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

    function RestroomModel(parm) {
        //console.log("RestroomModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.restroom_id = ko.observable(parm.data.restroom_id);
        this.public_restroom = ko.observable(parm.data.public_restroom);
        this.public_restroom.focused = ko.observable(false);
        this.total_num = ko.observable(parm.data.total_num);
        this.total_num.focused = ko.observable(false);
        this.designated_number = ko.observable(parm.data.designated_number);
        this.designated_number.focused = ko.observable(false);
        this.num_wheelchair_sign = ko.observable(parm.data.num_wheelchair_sign);
        this.num_wheelchair_sign.focused = ko.observable(false);
        this.sign_accessable = ko.observable(parm.data.sign_accessable);
        this.sign_accessable.focused = ko.observable(false);
        this.sign_location = ko.observable(parm.data.sign_location);
        this.sign_location.focused = ko.observable(false);
        this.key_needed = ko.observable(parm.data.key_needed);
        this.key_needed.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.est_id = ko.observable(parm.data.est_id);
        this.est_id.focused = ko.observable(false);
    }

    function RestroomViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.restroomList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.restroomList($.map(data, function (item) {
                    return new RestroomModel({data:item, postUri:postUri, putUri:putUri});
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

    function RestroomInfoModel(parm) {
        //console.log("RestroomInfoModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.rest_info_id = ko.observable(parm.data.rest_info_id);
        this.restroom_desc = ko.observable(parm.data.restroom_desc);
        this.restroom_desc.focused = ko.observable(false);
        this.easy_open = ko.observable(parm.data.easy_open);
        this.easy_open.focused = ko.observable(false);
        this.lbs_force = ko.observable(parm.data.lbs_force);
        this.lbs_force.focused = ko.observable(false);
        this.clearance = ko.observable(parm.data.clearance);
        this.clearance.focused = ko.observable(false);
        this.opening = ko.observable(parm.data.opening);
        this.opening.focused = ko.observable(false);
        this.opens_out = ko.observable(parm.data.opens_out);
        this.opens_out.focused = ko.observable(false);
        this.use_fist = ko.observable(parm.data.use_fist);
        this.use_fist.focused = ko.observable(false);
        this.can_turn_around = ko.observable(parm.data.can_turn_around);
        this.can_turn_around.focused = ko.observable(false);
        this.turn_width = ko.observable(parm.data.turn_width);
        this.turn_width.focused = ko.observable(false);
        this.turn_depth = ko.observable(parm.data.turn_depth);
        this.turn_depth.focused = ko.observable(false);
        this.close_chair_inside = ko.observable(parm.data.close_chair_inside);
        this.close_chair_inside.focused = ko.observable(false);
        this.grab_bars = ko.observable(parm.data.grab_bars);
        this.grab_bars.focused = ko.observable(false);
        this.seat_height_req = ko.observable(parm.data.seat_height_req);
        this.seat_height_req.focused = ko.observable(false);
        this.seat_height = ko.observable(parm.data.seat_height);
        this.seat_height.focused = ko.observable(false);
        this.flush_auto_fist = ko.observable(parm.data.flush_auto_fist);
        this.flush_auto_fist.focused = ko.observable(false);
        this.ambulatory_accessible = ko.observable(parm.data.ambulatory_accessible);
        this.ambulatory_accessible.focused = ko.observable(false);
        this.bar_height = ko.observable(parm.data.bar_height);
        this.bar_height.focused = ko.observable(false);
        this.coat_hook = ko.observable(parm.data.coat_hook);
        this.coat_hook.focused = ko.observable(false);
        this.hook_height = ko.observable(parm.data.hook_height);
        this.hook_height.focused = ko.observable(false);
        this.sink = ko.observable(parm.data.sink);
        this.sink.focused = ko.observable(false);
        this.sink_height = ko.observable(parm.data.sink_height);
        this.sink_height.focused = ko.observable(false);
        this.faucet = ko.observable(parm.data.faucet);
        this.faucet.focused = ko.observable(false);
        this.faucet_depth = ko.observable(parm.data.faucet_depth);
        this.faucet_depth.focused = ko.observable(false);
        this.faucet_auto_fist = ko.observable(parm.data.faucet_auto_fist);
        this.faucet_auto_fist.focused = ko.observable(false);
        this.sink_clearance = ko.observable(parm.data.sink_clearance);
        this.sink_clearance.focused = ko.observable(false);
        this.sink_clearance_height = ko.observable(parm.data.sink_clearance_height);
        this.sink_clearance_height.focused = ko.observable(false);
        this.sink_pipes = ko.observable(parm.data.sink_pipes);
        this.sink_pipes.focused = ko.observable(false);
        this.soap_dispenser = ko.observable(parm.data.soap_dispenser);
        this.soap_dispenser.focused = ko.observable(false);
        this.dry_first = ko.observable(parm.data.dry_first);
        this.dry_first.focused = ko.observable(false);
        this.dry_first_type = ko.observable(parm.data.dry_first_type);
        this.dry_first_type.focused = ko.observable(false);
        this.dry_controls = ko.observable(parm.data.dry_controls);
        this.dry_controls.focused = ko.observable(false);
        this.dry_control_height = ko.observable(parm.data.dry_control_height);
        this.dry_control_height.focused = ko.observable(false);
        this.mirror = ko.observable(parm.data.mirror);
        this.mirror.focused = ko.observable(false);
        this.mirror_height = ko.observable(parm.data.mirror_height);
        this.mirror_height.focused = ko.observable(false);
        this.shelves = ko.observable(parm.data.shelves);
        this.shelves.focused = ko.observable(false);
        this.shelf_height = ko.observable(parm.data.shelf_height);
        this.shelf_height.focused = ko.observable(false);
        this.trash_receptacles = ko.observable(parm.data.trash_receptacles);
        this.trash_receptacles.focused = ko.observable(false);
        this.hygiene_seat_cover = ko.observable(parm.data.hygiene_seat_cover);
        this.hygiene_seat_cover.focused = ko.observable(false);
        this.hygiene_cover_height = ko.observable(parm.data.hygiene_cover_height);
        this.hygiene_cover_height.focused = ko.observable(false);
        this.lighting = ko.observable(parm.data.lighting);
        this.lighting.focused = ko.observable(false);
        this.lighting_type = ko.observable(parm.data.lighting_type);
        this.lighting_type.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.rest_id = ko.observable(parm.data.est_id);
        this.rest_id.focused = ko.observable(false);
    }

    function RestroomInfoViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.restroomInfoList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.restroomInfoList($.map(data, function (item) {
                    return new RestroomInfoModel({data:item, postUri:postUri, putUri:putUri});
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

    function CommunicationModel(parm) {
        console.log("CommunicationModel(parm): " + JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
        this.communication_id = ko.observable(parm.data.communication_id);
        this.public_phone = ko.observable(parm.data.public_phone);
        this.public_phone.focused = ko.observable(false);
        this.phone_clearance = ko.observable(parm.data.phone_clearance);
        this.phone_clearance.focused = ko.observable(false);
        this.num_phone = ko.observable(parm.data.num_phone);
        this.num_phone.focused = ko.observable(false);
        this.tty = ko.observable(parm.data.tty);
        this.tty.focused = ko.observable(false);
        this.staff_tty = ko.observable(parm.data.staff_tty);
        this.staff_tty.focused = ko.observable(false);
        this.assisted_listening = ko.observable(parm.data.assisted_listening);
        this.assisted_listening.focused = ko.observable(false);
        this.assisted_listen_type = ko.observable(parm.data.assisted_listen_type);
        this.assisted_listen_type.focused = ko.observable(false);
        this.assisted_listen_receiver = ko.observable(parm.data.assisted_listen_receiver);
        this.assisted_listen_receiver.focused = ko.observable(false);
        this.listening_signage = ko.observable(parm.data.listening_signage);
        this.listening_signage.focused = ko.observable(false);
        this.staff_listening = ko.observable(parm.data.staff_listening);
        this.staff_listening.focused = ko.observable(false);
        this.acoustics = ko.observable(parm.data.acoustics);
        this.acoustics.focused = ko.observable(false);
        this.acoustics_level = ko.observable(parm.data.acoustics_level);
        this.acoustics_level.focused = ko.observable(false);
        this.alt_comm_methods = ko.observable(parm.data.alt_comm_methods);
        this.alt_comm_methods.focused = ko.observable(false);
        this.alt_comm_type = ko.observable(parm.data.alt_comm_type);
        this.alt_comm_type.focused = ko.observable(false);
        this.staff_ASL = ko.observable(parm.data.staff_ASL);
        this.staff_ASL.focused = ko.observable(false);
        this.captioning_default = ko.observable(parm.data.captioning_default);
        this.captioning_default.focused = ko.observable(false);
        this.theater_captioning = ko.observable(parm.data.theater_captioning);
        this.theater_captioning.focused = ko.observable(false);
        this.theater_capt_type = ko.observable(parm.data.theater_capt_type);
        this.theater_capt_type.focused = ko.observable(false);
        this.auditory_info_visual = ko.observable(parm.data.auditory_info_visual);
        this.auditory_info_visual.focused = ko.observable(false);
        this.visual_info_auditory = ko.observable(parm.data.visual_info_auditory);
        this.visual_info_auditory.focused = ko.observable(false);
        this.website_text_reader = ko.observable(parm.data.website_text_reader);
        this.website_text_reader.focused = ko.observable(false);
        this.alt_contact = ko.observable(parm.data.alt_contact);
        this.alt_contact.focused = ko.observable(false);
        this.alt_contact_type = ko.observable(parm.data.alt_contact_type);
        this.alt_contact_type.focused = ko.observable(false);
        this.shopping_assist = ko.observable(parm.data.shopping_assist);
        this.shopping_assist.focused = ko.observable(false);
        this.assist_service = ko.observable(parm.data.assist_service);
        this.assist_service.focused = ko.observable(false);
        this.assist_fee = ko.observable(parm.data.assist_fee);
        this.assist_fee.focused = ko.observable(false);
        this.store_scooter = ko.observable(parm.data.store_scooter);
        this.store_scooter.focused = ko.observable(false);
        this.scooter_fee = ko.observable(parm.data.scooter_fee);
        this.scooter_fee.focused = ko.observable(false);
        this.scooter_location = ko.observable(parm.data.scooter_location);
        this.scooter_location.focused = ko.observable(false);
        this.restaurant_allergies = ko.observable(parm.data.restaurant_allergies);
        this.restaurant_allergies.focused = ko.observable(false);
        this.staff_disable_trained = ko.observable(parm.data.staff_disable_trained);
        this.staff_disable_trained.focused = ko.observable(false);
        this.staff_disable_trained_desc = ko.observable(parm.data.staff_disable_trained_desc);
        this.staff_disable_trained_desc.focused = ko.observable(false);
        this.items_reach = ko.observable(parm.data.items_reach);
        this.items_reach.focused = ko.observable(false);
        this.service_alt_manner = ko.observable(parm.data.service_alt_manner);
        this.service_alt_manner.focused = ko.observable(false);
        this.senior_discount = ko.observable(parm.data.senior_discount);
        this.senior_discount.focused = ko.observable(false);
        this.senior_age = ko.observable(parm.data.senior_age);
        this.senior_age.focused = ko.observable(false);
        this.annual_A4A_review = ko.observable(parm.data.annual_A4A_review);
        this.annual_A4A_review.focused = ko.observable(false);
        this.comment = ko.observable(parm.data.comment);
        this.comment.focused = ko.observable(false);
        this.recommendations = ko.observable(parm.data.recommendations);
        this.recommendations.focused = ko.observable(false);
        this.rest_id = ko.observable(parm.data.est_id);
        this.rest_id.focused = ko.observable(false);
    }

    function CommunicationViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.communicationList = ko.observableArray([]);

        $.ajax ({
            async: false,
            dataType: 'json',
            url: getUri,
            success: function (data) {
                self.communicationList($.map(data, function (item) {
                    return new CommunicationModel({data:item, postUri:postUri, putUri:putUri});
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
        passengerLoadingVM : new PassengerLoadingViewModel('get/passenger_loading/park/' + PARK_ID, 'delete/passenger_loading/park/' + PARK_ID, 'post/passenger_loading/', 'put/passenger_loading/park/' + PARK_ID),
                  staBusVM : new StaBusViewModel('get/sta_bus/park/' + PARK_ID, 'delete/sta_bus/park/' + PARK_ID, 'post/sta_bus/', 'put/sta_bus/park/' + PARK_ID),
             staBusRouteVM : new StaBusRouteViewModel('get/sta_route/sta_bus/' + STA_ID, 'delete/sta_route/sta_bus/' + STA_ID, 'post/sta_route/', 'put/sta_route/sta_bus/' + STA_ID),
         exteriorPathwayVM : new ExteriorPathwayViewModel('get/exterior_pathways/est/' + EST_ID, 'delete/exterior_pathways/est/' + EST_ID, 'post/exterior_pathways/', 'put/exterior_pathways/est/' + EST_ID),
          exteriorStairsVM : new ExteriorStairsViewModel('get/exterior_stairs/est/' + EST_ID, 'delete/exterior_stairs/est/' + EST_ID, 'post/exterior_stairs/', 'put/exterior_stairs/est/' + EST_ID),
           exteriorRampsVM : new ExteriorRampsViewModel('get/exterior_ramps/est/' + EST_ID, 'delete/exterior_ramps/est/' + EST_ID, 'post/exterior_ramps/', 'put/exterior_ramps/est/' + EST_ID),
            mainEntranceVM : new MainEntranceViewModel('get/main_entrance/est/' + EST_ID, 'delete/main_entrance/est/' + EST_ID, 'post/main_entrance/', 'put/main_entrance/est/' + EST_ID),
                interiorVM : new InteriorViewModel('get/interior/est/' + EST_ID, 'delete/interior/est/' + EST_ID, 'post/interior/', 'put/interior/est/' + EST_ID),
                elevatorVM : new ElevatorViewModel('get/elevator/est/' + EST_ID, 'delete/elevator/est/' + EST_ID, 'post/elevator/', 'put/elevator/est/' + EST_ID),
                 signageVM : new SignageViewModel('get/signage/est/' + EST_ID, 'delete/signage/est/' + EST_ID, 'post/signage/', 'put/signage/est/' + EST_ID),
               emergencyVM : new EmergencyViewModel('get/emergency/est/' + EST_ID, 'delete/emergency/est/' + EST_ID, 'post/emergency/', 'put/emergency/est/' + EST_ID),
                 seatingVM : new SeatingViewModel('get/seating/est/' + EST_ID, 'delete/seating/est/' + EST_ID, 'post/seating/', 'put/seating/est/' + EST_ID),
                restroomVM : new RestroomViewModel('get/restroom/est/' + EST_ID, 'delete/restroom/est/' + EST_ID, 'post/restroom/', 'put/restroom/est/' + EST_ID),
            restroomInfoVM : new RestroomInfoViewModel('get/restroom_info/rest/' + REST_ID, 'delete/restroom_info/rest/' + REST_ID, 'post/restroom_info/', 'put/restroom_info/rest/' + REST_ID),
           communicationVM : new CommunicationViewModel('get/communication/est/' + EST_ID, 'delete/communication/est/' + EST_ID, 'post/communication/', 'put/communication/est/' + EST_ID),
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
    console.log("STA_ID: " + STA_ID);
    console.log("REST_ID: " + REST_ID);
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

function getStaBusId(value) {
    $.ajax ({
        async: false,
        dataType: 'json',
        url: 'get/sta_bus_id/park/' + value,
        success: function (data) {
            STA_ID = data[0].sta_id;
        }
    });
}

function getRestroomId(value) {
    $.ajax ({
        async: false,
        dataType: 'json',
        url: 'get/restroom/est/' + value,
        success: function (data) {
            REST_ID = data[0].restroom_id;
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

