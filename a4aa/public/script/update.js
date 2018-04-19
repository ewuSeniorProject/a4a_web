const EST_ID = localStorage.getItem("establishmentID");
var PARK_ID = 0;
var CAT_ID = 0;
var CAT_NAME = "";
var CONFIG_ID = 0;
var CONFIG_NAME = "";
var USER_ID = 0;
var USER_NAME = "";
var STA_ID = 0;
var REST_ID = 0;
var INDEX = 0;

$(document).ready(function () {

    getParkId(EST_ID);
    getIds(EST_ID);
    getStaBusId(PARK_ID);
    getRestroomId(EST_ID);
    getCategoryName(CAT_ID);
    getConfigName(CONFIG_ID);
    getUserName(USER_ID);

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
        this.cat_name = ko.observable(CAT_NAME);
        this.cat_name.focused = ko.observable(false);
        this.subtype = ko.observable(parm.data.subtype);
        this.subtype.focused = ko.observable(false);
        this.config_id = ko.observable(parm.data.config_id);
        this.config_id.focused = ko.observable(false);
        this.config_name = ko.observable(CONFIG_NAME);
        this.config_name.focused = ko.observable(false);
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
        this.user_name = ko.observable(USER_NAME);
        this.user_name.focused = ko.observable(false);
        this.config_comment = ko.observable(parm.data.config_comment);
        this.config_comment.focused = ko.observable(false);
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

        // $("#collapseOne").validate({
        //     // Specify validation rules
        //     rules: {
        //         name: {
        //             required: true,
        //             max: 255
        //         },
        //         website: {
        //             required: true,
        //             max: 255
        //         },
        //         category: {
        //             required: true
        //         },
        //         street: {
        //             required: true,
        //             max: 255
        //         },
        //         date: {
        //             required: true,
        //             dateISO: true
        //         },
        //         overview: {
        //             required: true,
        //             minlength: 2
        //         },
        //         studio: {
        //             required: true,
        //             minlength: 2,
        //             maxlength: 100
        //         },
        //         price: {
        //             required: true,
        //             number: true,
        //             minlength: 1,
        //             maxlength: 20
        //         }
        //     },
        //     // Specify validation error messages
        //     messages: {
        //         name: " Establishment name must be less than 256 characters long.",
        //         website: " Website must be less than 256 characters long.",
        //         date: " Date (yyyy-mm-dd)",
        //         overview: " Overview at least 2 characters",
        //         studio: " Studio at least 2 characters",
        //         price: " Price at least 0"
        //     },
        //     submitHandler: function(form) {
        //         updateEstablishment();
        //     },
        // });

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
        this.handrail_regulation_height = ko.observable(parm.data.handrail_regulation_height);
        this.handrail_regulation_height.focused = ko.observable(false);
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
        this.handrail_regulation_height = ko.observable(parm.data.handrail_regulation_height);
        this.handrail_regulation_height.focused = ko.observable(false);
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
        this.soap_height = ko.observable(parm.data.soap_height);
        this.soap_height.focused = ko.observable(false);
        this.dry_fist = ko.observable(parm.data.dry_fist);
        this.dry_fist.focused = ko.observable(false);
        this.dry_fist_type = ko.observable(parm.data.dry_fist_type);
        this.dry_fist_type.focused = ko.observable(false);
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
    }

    function CommunicationModel(parm) {
        //console.log("CommunicationModel(parm): " + JSON.stringify(parm));
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


function updateEstablishment() {
    var est_id = document.getElementById("est_id").value;
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
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/establishment/est/" + est_id,
        data: JSON.stringify({
                "est_id": est_id,
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

function editCategory() {
    var cat_id = document.getElementById("cat_id").value;

    // console.log("cat_id: " + cat_id);

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "category/",
        success: function (data) {
            // console.log(JSON.stringify(data));
            var category_select = "";

            category_select += '<div class="card-row">\n' +
                               '   <select name="category" id="category">\n';

            for (var i = 0; i < data.length; i ++) {
                if (data[i].cat_id === cat_id ){
                    category_select += '<option value="'+data[i].cat_id+'_'+data[i].name+'" selected="selected">&nbsp;'+ data[i].name +'</option>';
                }
                else {
                    category_select += '<option value="'+data[i].cat_id+'_'+data[i].name+'">&nbsp;'+ data[i].name +'</option>';
                }
            }

            category_select += '</select>\n' +
                                '</div>';

            $("#gen-title").html("Edit Category");

            $("#gen-body").html(category_select);

            $("#gen-footer").html(
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>\n' +
                '&nbsp;\n' +
                '<button type="button" class="btn btn-success" onclick="updateCategory()"><i class="fas fa-save"></i>&nbsp; Save</button>'
            );

            $("#gen-modal").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function updateCategory() {
    $("#gen-modal").modal('toggle');

    var temp = document.getElementById("category").value;
    var cat_id = temp.split("_")[0];
    var cat_name = temp.split("_")[1];

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/establishment/category/est/" + EST_ID,
        data: JSON.stringify({
            "cat_id" : cat_id
        }),
        success: function () {
            $("#success-body").html('Category Updated');
            $("#success").modal('toggle');

            document.getElementById("cat_id").value = cat_id;
            document.getElementById("cat_name").value = cat_name;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function editConfig() {
    var config_id = document.getElementById("config_id").value;

    // console.log("config_id: " + config_id);

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "configuration/",
        success: function (data) {
            // console.log(JSON.stringify(data));
            var config_select = "";

            config_select += '<div class="card-row">\n' +
                '   <select name="config" id="config">\n';

            for (var i = 0; i < data.length; i ++) {
                if (data[i].config_id === config_id ){
                    config_select += '<option value="'+data[i].config_id+'_'+data[i].name+'" selected="selected">&nbsp;'+ data[i].name +'</option>';
                }
                else {
                    config_select += '<option value="'+data[i].config_id+'_'+data[i].name+'">&nbsp;'+ data[i].name +'</option>';
                }

            }

            config_select += '</select>\n' +
                '</div>';

            $("#gen-title").html("Edit Configuration");

            $("#gen-body").html(config_select);

            $("#gen-footer").html(
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>\n' +
                '&nbsp;\n' +
                '<button type="button" class="btn btn-success" onclick="updateConfig()"><i class="fas fa-save"></i>&nbsp; Save</button>'
            );

            $("#gen-modal").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function updateConfig() {
    $("#gen-modal").modal('toggle');

    var temp = document.getElementById("config").value;
    var config_id = temp.split("_")[0];
    var config_name = temp.split("_")[1];

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/establishment/config/est/" + EST_ID,
        data: JSON.stringify({
            "config_id" : config_id
        }),
        success: function () {
            $("#success-body").html('Configuration Updated');
            $("#success").modal('toggle');

            document.getElementById("config_id").value = config_id;
            document.getElementById("config_name").value = config_name;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function editUser() {
    var user_id = document.getElementById("user_id").value;

    // console.log("user_id: " + user_id);

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "user/",
        success: function (data) {
            // console.log(JSON.stringify(data));
            var user_select = "";

            user_select += '<div class="card-row">\n' +
                '   <select name="user" id="user">\n';

            for (var i = 0; i < data.length; i ++) {
                if (data[i].user_id === user_id ){
                    user_select += '<option value="'+data[i].user_id+'_'+data[i].fname+' '+data[i].lname +'" selected="selected">&nbsp;'+data[i].fname+' '+data[i].lname +'</option>';
                }
                else {
                    user_select += '<option value="'+data[i].user_id+'_'+data[i].fname+' '+data[i].lname +'">&nbsp;'+data[i].fname+' '+data[i].lname +'</option>';
                }
            }

            user_select += '</select>\n' +
                '</div>';

            $("#gen-title").html("Edit Surveyor");

            $("#gen-body").html(user_select);

            $("#gen-footer").html(
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>\n' +
                '&nbsp;\n' +
                '<button type="button" class="btn btn-success" onclick="updateUser()"><i class="fas fa-save"></i>&nbsp; Save</button>'
            );

            $("#gen-modal").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function updateUser() {
    $("#gen-modal").modal('toggle');

    var temp = document.getElementById("user").value;
    var user_id = temp.split("_")[0];
    var user_name = temp.split("_")[1];

    // console.log("update.js:");

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/establishment/user/est/" + EST_ID,
        data: JSON.stringify({
            "user_id" : user_id
        }),
        success: function () {
            $("#success-body").html('Surveyor Updated');
            $("#success").modal('toggle');

            document.getElementById("user_id").value = user_id;
            document.getElementById("user_name").value = user_name;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
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

    // console.log("update.js:");

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

function updatePassengerLoading() {
    var passenger_id = document.getElementById("passenger_id").value;
    var designated_zone = document.getElementById("designated_zonePassengerLoading").value;
    var distance = document.getElementById("distancePassengerLoading").value;
    var min_width = document.getElementById("min_widthPassengerLoading").value;
    var passenger_surface = document.getElementById("passenger_surfacePassengerLoading").value;
    var tactile_warning_strips = document.getElementById("tactile_warning_stripsPassengerLoading").value;
    var covered = document.getElementById("coveredPassengerLoading").value;
    var lighting = document.getElementById("lightingPassengerLoading").value;
    var lighting_option = document.getElementById("lighting_optionPassengerLoading").value;
    var lighting_type = document.getElementById("lighting_typePassengerLoading").value;
    var comment = document.getElementById("commentPassengerLoading").value;
    var recommendations = document.getElementById("recommendationsPassengerLoading").value;
    var park_id = document.getElementById("passenger_park_id").value;

    //console.log("update.js:");

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

function editSTARoute(index) {
    // console.log("index: " + index);
    INDEX = index;
    var route_id = document.getElementById("sta_route_id_"+index).value;

    // console.log("route_id: " + route_id);
    // console.log("INDEX: " + INDEX);

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/sta_route/" + route_id,
        success: function (data) {
            // console.log(JSON.stringify(data));
            var sta_route_id = data[0].sta_route_id;
            var route_num = data[0].route_num;
            var north_bound_stop = data[0].north_bound_stop;
            var south_bound_stop = data[0].south_bound_stop;
            var east_bound_stop = data[0].east_bound_stop;
            var west_bound_stop = data[0].west_bound_stop;
            var sta_bus_id = data[0].sta_bus_id;


            $("#sta-body").html(
                '<div class="card-row">\n' +
                '   <div class="col-3"><label for="route_numEdit"> Route Number: </label><input class="form-control" id="route_numEdit" value="'+route_num+'"></div>\n' +
                '</div>\n'+
                '<div class="card-row">\n' +
                '   <div class="col-3"><label for="north_bound_stopEdit"> North Bound Stop: </label><input class="form-control" id="north_bound_stopEdit" value="'+north_bound_stop+'"></div>\n' +
                '   <div class="col-3"><label for="south_bound_stopEdit"> South Bound Stop: </label><input class="form-control" id="south_bound_stopEdit" value="'+south_bound_stop+'"></div>\n' +
                '   <div class="col-3"><label for="east_bound_stopEdit"> East Bound Stop: </label><input class="form-control" id="east_bound_stopEdit" value="'+east_bound_stop+'"></div>\n' +
                '   <div class="col-3"><label for="west_bound_stopEdit"> West Bound Stop: </label><input class="form-control" id="west_bound_stopEdit" value="'+west_bound_stop+'"></div>\n' +
                '   <input type="hidden" class="form-control" id="sta_route_idEdit" value="'+sta_route_id+'">\n'+
                '   <input type="hidden" class="form-control" id="sta_bus_idEdit" value="'+sta_bus_id+'">\n'+
                '</div>'
            );

            $("#sta-footer").html(
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>\n' +
                '&nbsp;\n' +
                '<button type="button" class="btn btn-success" onclick="updateSTARoute()"><i class="fas fa-save"></i>&nbsp; Save</button>'
            );

            $("#sta-route-modal").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function updateSTARoute() {
    $("#sta-route-modal").modal('toggle');

    var sta_route_id = document.getElementById("sta_route_idEdit").value;
    var route_num = document.getElementById("route_numEdit").value;
    var north_bound_stop = document.getElementById("north_bound_stopEdit").value;
    var south_bound_stop = document.getElementById("south_bound_stopEdit").value;
    var east_bound_stop = document.getElementById("east_bound_stopEdit").value;
    var west_bound_stop = document.getElementById("west_bound_stopEdit").value;
    var sta_bus_id = document.getElementById("sta_bus_idEdit").value;

    // console.log("update.js:");

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
            $("#success-body").html('STA Route Updated');
            $("#success").modal('toggle');

            document.getElementById("route_num_" + INDEX).value = route_num;
            document.getElementById("north_bound_stop_" + INDEX).value = north_bound_stop;
            document.getElementById("south_bound_stop_" + INDEX).value = south_bound_stop;
            document.getElementById("east_bound_stop_" + INDEX).value = east_bound_stop;
            document.getElementById("west_bound_stop_" + INDEX).value = west_bound_stop;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
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

    // console.log("update.js:");

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

function editRestroomInfo(index) {
    // console.log("index: " + index);
    INDEX = index;
    var rest_info_id = document.getElementById("rest_info_id_"+index).value;

    // console.log("rest_info_id: " + rest_info_id);
    // console.log("INDEX: " + INDEX);

    $.ajax({
        async: false,
        accepts: "application/json",
        method: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "get/restroom_info/" + rest_info_id,
        success: function (data) {
            // console.log(JSON.stringify(data));
            var rest_info_id = data[0].rest_info_id;
            var restroom_desc = data[0].restroom_desc;
            var easy_open = data[0].easy_open;
            var lbs_force = data[0].lbs_force;
            var clearance = data[0].clearance;
            var opening = data[0].opening;
            var opens_out = data[0].opens_out;
            var use_fist = data[0].use_fist;
            var can_turn_around = data[0].can_turn_around;
            var turn_width = data[0].turn_width;
            var turn_depth = data[0].turn_depth;
            var close_chair_inside = data[0].close_chair_inside;
            var grab_bars = data[0].grab_bars;
            var seat_height_req = data[0].seat_height_req;
            var seat_height = data[0].seat_height;
            var flush_auto_fist = data[0].flush_auto_fist;
            var ambulatory_accessible = data[0].ambulatory_accessible;
            var bar_height = data[0].bar_height;
            var coat_hook = data[0].coat_hook;
            var hook_height = data[0].hook_height;
            var sink = data[0].sink;
            var sink_height = data[0].sink_height;
            var faucet = data[0].faucet;
            var faucet_depth = data[0].faucet_depth;
            var faucet_auto_fist = data[0].faucet_auto_fist;
            var sink_clearance = data[0].sink_clearance;
            var sink_clearance_height = data[0].sink_clearance_height;
            var sink_pipes = data[0].sink_pipes;
            var soap_dispenser = data[0].soap_dispenser;
            var soap_height = data[0].soap_height;
            var dry_fist = data[0].dry_fist;
            var dry_fist_type = data[0].dry_fist_type;
            var dry_controls = data[0].dry_controls;
            var dry_control_height = data[0].dry_control_height;
            var mirror = data[0].mirror;
            var mirror_height = data[0].mirror_height;
            var shelves = data[0].shelves;
            var shelf_height = data[0].shelf_height;
            var trash_receptacles = data[0].trash_receptacles;
            var hygiene_seat_cover = data[0].hygiene_seat_cover;
            var hygiene_cover_height = data[0].hygiene_cover_height;
            var lighting = data[0].lighting;
            var lighting_type = data[0].lighting_type;
            var comment = data[0].comment;
            var recommendations = data[0].recommendations;
            var rest_id = data[0].rest_id;

            $("#restroom-body").html(
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="restroom_descEdit"> Identify this bathroom rated with location and other information (i.e. 1st floor front women): </label> <input class="form-control" id="restroom_descEdit" value="'+restroom_desc+'" ></div>\n' +
                '   <div class="col-6"><label for="easy_openEdit">  Room door is easy to open, requiring 5 lb. or less force: </label> <input class="form-control" id="easy_openEdit" value="'+easy_open+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="lbs_forceEdit"> Actual force - lbs. or light/ med/ heavy: </label> <input class="form-control" id="lbs_forceEdit" value="'+lbs_force+'" ></div>\n' +
                '   <div class="col-6"><label for="clearanceEdit"> Stall/Room door has at least 32” clearance when the door is open: </label> <input class="form-control" id="clearanceEdit" value="'+clearance+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="openingEdit"> Opening measurement (inches): </label> <input class="form-control" id="openingEdit" value="'+opening+'" ></div>\n' +
                '   <div class="col-6"><label for="opens_outEdit"> The stall door opens to the outside: </label><input class="form-control" id="opens_outEdit" value="'+opens_out+'"></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="use_fistEdit"> The stall door can be opened, closed, and latched with a closed fist: </label><input class="form-control" id="use_fistEdit" value="'+use_fist+'"></div>\n' +
                '   <div class="col-6"><label for="can_turn_aroundEdit"> The stall or room is large enough for a wheelchair or walker to turn around: </label> <input class="form-control" id="can_turn_aroundEdit" value="'+can_turn_around+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="turn_widthEdit"> Stall/Room width (inches)​: </label> <input class="form-control" id="turn_widthEdit" value="'+turn_width+'" ></div>\n' +
                '   <div class="col-6"><label for="turn_depthEdit"> Stall/Room depth (inches)​: </label> <input class="form-control" id="turn_depthEdit" value="'+turn_depth+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="close_chair_insideEdit"> The stall/room door can be closed once a wheelchair is inside: </label> <input class="form-control" id="close_chair_insideEdit" value="'+close_chair_inside+'" ></div>\n' +
                '   <div class="col-6"><label for="grab_barsEdit"> Grab bars are easily reachable behind the toilet and on the side wall ​ nearest the toilet: </label> <input class="form-control" id="grab_barsEdit" value="'+grab_bars+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="seat_height_reqEdit"> The height of the toilet seat is at least 17” from the floor: </label><input class="form-control" id="seat_height_reqEdit" value="'+seat_height_req+'"></div>\n' +
                '   <div class="col-6"><label for="seat_heightEdit"> Seat height (inches): </label><input class="form-control" id="seat_heightEdit" value="'+seat_height+'"></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="flush_auto_fistEdit"> The toilet flushes automatically, or can be operated with a closed fist: </label><input class="form-control" id="flush_auto_fistEdit" value="'+flush_auto_fist+'"></div>\n' +
                '   <div class="col-6"><label for="ambulatory_accessibleEdit"> If there are multiple stalls, at least one is ambulatory accessible with grab bars on either side and toilet height at least 17” from floor: </label> <input class="form-control" id="ambulatory_accessibleEdit" value="'+ambulatory_accessible+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="bar_heightEdit"> Toilet height (inches): </label><input class="form-control" id="bar_heightEdit" value="'+bar_height+'"></div>\n' +
                '   <div class="col-6"><label for="coat_hookEdit"> If there is a coat hook, it is between 35” and 48” from the floor: </label><input class="form-control" id="coat_hookEdit" value="'+coat_hook+'"></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="hook_heightEdit"> Hook height (inches): </label> <input class="form-control" id="hook_heightEdit" value="'+hook_height+'" ></div>\n' +
                '   <div class="col-6"><label for="sinkEdit"> The height of the sink/countertop is 34” or less from the floor: </label><input class="form-control" id="sinkEdit" value="'+sink+'"></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="sink_heightEdit"> Sink/Countertop height (inches): </label> <input class="form-control" id="sink_heightEdit" value="'+sink_height+'" ></div>\n' +
                '   <div class="col-6"><label for="faucetEdit"> The faucet control is 17” or less from the front edge of the sink counter: </label><input class="form-control" id="faucetEdit" value="'+faucet+'"></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="faucet_depthEdit"> Faucet depth (inches): </label> <input class="form-control" id="faucet_depthEdit" value="'+faucet_depth+'" ></div>\n' +
                '   <div class="col-6"><label for="faucet_auto_fistEdit"> Faucet​ can ​be operated ​automatically or ​with a closed fist: </label> <input class="form-control" id="faucet_auto_fistEdit" value="'+faucet_auto_fist+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="sink_clearanceEdit"> There is room for a wheelchair to roll under the sink ​: </label><input class="form-control" id="sink_clearanceEdit" value="'+sink_clearance+'"></div>\n' +
                '   <div class="col-6"><label for="sink_clearance_heightEdit"> Measurement (inches): </label> <input class="form-control" id="sink_clearance_heightEdit" value="'+sink_clearance_height+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-4"><label for="sink_pipesEdit"> If there are pipes under the sink, they are covered to prevent injury or burns: </label> <input class="form-control" id="sink_pipesEdit" value="'+sink_pipes+'" ></div>\n' +
                '   <div class="col-4"><label for="soap_dispenserEdit"> The height of the soap dispenser control is 48” or less from the floor: </label> <input class="form-control" id="soap_dispenserEdit" value="'+soap_dispenser+'" ></div>\n' +
                '   <div class="col-4"><label for="soap_heightEdit">  Soap dispenser height (inches): </label> <input class="form-control" id="soap_heightEdit" value="'+soap_height+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="dry_fistEdit">  Hand dryer or towel dispenser can be operated automatically or with closed fist: </label> <input class="form-control" id="dry_fistEdit" value="'+dry_fist+'" ></div>\n' +
                '   <div class="col-6"><label for="dry_fist_typeEdit"> Type Hand dryer/Towel dispenser: </label> <input class="form-control" id="dry_fist_typeEdit" value="'+dry_fist_type+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="dry_controlsEdit"> Operation type - automatic/closed fist: </label> <input class="form-control" id="dry_controlsEdit" value="'+dry_controls+'" ></div>\n' +
                '   <div class="col-6"><label for="dry_control_heightEdit"> Controls for hand dryer or towel dispenser are 48” or less from floor: </label> <input class="form-control" id="dry_control_heightEdit" value="'+dry_control_height+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="mirrorEdit"> If there is a mirror, the bottom edge is 40” or less from the floor: </label> <input class="form-control" id="mirrorEdit" value="'+mirror+'" ></div>\n' +
                '   <div class="col-6"><label for="mirror_heightEdit"> Mirror height (inches): </label><input class="form-control" id="mirror_heightEdit" value="'+mirror_height+'"></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="shelvesEdit"> If there are shelves to set items, they are 48” or less from the floor: </label><input class="form-control" id="shelvesEdit" value="'+shelves+'"></div>\n' +
                '   <div class="col-6"><label for="shelf_heightEdit"> Shelf height (inches): </label> <input class="form-control" id="shelf_heightEdit" value="'+shelf_height+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-6"><label for="trash_receptaclesEdit"> Trash receptacles are positioned so they do not block the route to the door​: </label> <input class="form-control" id="trash_receptaclesEdit" value="'+trash_receptacles+'" ></div>\n' +
                '   <div class="col-6"><label for="hygiene_seat_coverEdit"> Feminine hygiene product & toilet seat cover dispensers are 48” or less from floor: </label> <input class="form-control" id="hygiene_seat_coverEdit" value="'+hygiene_seat_cover+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '   <div class="col-4"><label for="hygiene_cover_heightEdit"> Height (inches): </label> <input class="form-control" id="hygiene_cover_heightEdit" value="'+hygiene_cover_height+'" ></div>\n' +
                '   <div class="col-4"><label for="lightingRestroomInfoEdit"> Lighting is adequate: </label><input class="form-control" id="lightingRestroomInfoEdit" value="'+lighting+'" ></div>\n' +
                '   <div class="col-4"><label for="lighting_typeRestroomInfoEdit"> Lighting level low/medium/bright: </label><input class="form-control" id="lighting_typeRestroomInfoEdit" value="'+lighting_type+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '    <div class="col-12"><label for="commentRestroomInfoEdit"> Additional notes: </label><input class="form-control" id="commentRestroomInfoEdit" value="'+comment+'" ></div>\n' +
                '</div>\n' +
                '<div class="card-row">\n' +
                '    <div class="col-12"><label for="recommendationsRestroomInfoEdit"> Recommendations: </label><input class="form-control" id="recommendationsRestroomInfoEdit" value="'+recommendations+'" ></div>\n' +
                '   <input type="hidden" class="form-control" id="rest_info_idEdit" value="'+rest_info_id+'">\n'+
                '   <input type="hidden" class="form-control" id="rest_idEdit" value="'+rest_id+'">\n'+
                '</div>'
            );

            $("#restroom-footer").html(
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>\n' +
                '&nbsp;\n' +
                '<button type="button" class="btn btn-success" onclick="updateRestroomInfo()"><i class="fas fa-save"></i>&nbsp; Save</button>'
            );

            $("#restroom-modal").modal('toggle');
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}

function updateRestroomInfo() {
    $("#restroom-modal").modal('toggle');

    var rest_info_id = document.getElementById("rest_info_idEdit").value;
    var restroom_desc = document.getElementById("restroom_descEdit").value;
    var easy_open = document.getElementById("easy_openEdit").value;
    var lbs_force = document.getElementById("lbs_forceEdit").value;
    var clearance = document.getElementById("clearanceEdit").value;
    var opening = document.getElementById("openingEdit").value;
    var opens_out = document.getElementById("opens_outEdit").value;
    var use_fist = document.getElementById("use_fistEdit").value;
    var can_turn_around = document.getElementById("can_turn_aroundEdit").value;
    var turn_width = document.getElementById("turn_widthEdit").value;
    var turn_depth = document.getElementById("turn_depthEdit").value;
    var close_chair_inside = document.getElementById("close_chair_insideEdit").value;
    var grab_bars = document.getElementById("grab_barsEdit").value;
    var seat_height_req = document.getElementById("seat_height_reqEdit").value;
    var seat_height = document.getElementById("seat_heightEdit").value;
    var flush_auto_fist = document.getElementById("flush_auto_fistEdit").value;
    var ambulatory_accessible = document.getElementById("ambulatory_accessibleEdit").value;
    var bar_height = document.getElementById("bar_heightEdit").value;
    var coat_hook = document.getElementById("coat_hookEdit").value;
    var hook_height = document.getElementById("hook_heightEdit").value;
    var sink = document.getElementById("sinkEdit").value;
    var sink_height = document.getElementById("sink_heightEdit").value;
    var faucet = document.getElementById("faucetEdit").value;
    var faucet_depth = document.getElementById("faucet_depthEdit").value;
    var faucet_auto_fist = document.getElementById("faucet_auto_fistEdit").value;
    var sink_clearance = document.getElementById("sink_clearanceEdit").value;
    var sink_clearance_height = document.getElementById("sink_clearance_heightEdit").value;
    var sink_pipes = document.getElementById("sink_pipesEdit").value;
    var soap_dispenser = document.getElementById("soap_dispenserEdit").value;
    var dry_fist = document.getElementById("dry_fistEdit").value;
    var dry_fist_type = document.getElementById("dry_fist_typeEdit").value;
    var dry_controls = document.getElementById("dry_controlsEdit").value;
    var dry_control_height = document.getElementById("dry_control_heightEdit").value;
    var mirror = document.getElementById("mirrorEdit").value;
    var mirror_height = document.getElementById("mirror_heightEdit").value;
    var shelves = document.getElementById("shelvesEdit").value;
    var shelf_height = document.getElementById("shelf_heightEdit").value;
    var trash_receptacles = document.getElementById("trash_receptaclesEdit").value;
    var hygiene_seat_cover = document.getElementById("hygiene_seat_coverEdit").value;
    var hygiene_cover_height = document.getElementById("hygiene_cover_heightEdit").value;
    var lighting = document.getElementById("lightingRestroomInfoEdit").value;
    var lighting_type = document.getElementById("lighting_typeRestroomInfoEdit").value;
    var comment = document.getElementById("commentRestroomInfoEdit").value;
    var recommendations = document.getElementById("recommendationsRestroomInfoEdit").value;
    var rest_id = document.getElementById("rest_idEdit").value;

    $.ajax({
        accepts: "application/json",
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "put/restroom_info/rest/" + rest_id,
        data: JSON.stringify({
            "rest_info_id" : rest_info_id,
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
            "dry_fist_type" : dry_fist_type,
            "dry_controls" : dry_controls,
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

            document.getElementById("restroom_desc_" + INDEX).value = restroom_desc;
            document.getElementById("easy_open_" + INDEX).value = easy_open;
            document.getElementById("lbs_force_" + INDEX).value = lbs_force;
            document.getElementById("clearance_" + INDEX).value = clearance;
            document.getElementById("opening_" + INDEX).value = opening;
            document.getElementById("opens_out_" + INDEX).value = opens_out;
            document.getElementById("use_fist_" + INDEX).value = use_fist;
            document.getElementById("can_turn_around_" + INDEX).value = can_turn_around;
            document.getElementById("turn_width_" + INDEX).value = turn_width;
            document.getElementById("turn_depth_" + INDEX).value = turn_depth;
            document.getElementById("close_chair_inside_" + INDEX).value = close_chair_inside;
            document.getElementById("grab_bars_" + INDEX).value = grab_bars;
            document.getElementById("seat_height_req_" + INDEX).value = seat_height_req;
            document.getElementById("seat_height_" + INDEX).value = seat_height;
            document.getElementById("flush_auto_fist_" + INDEX).value = flush_auto_fist;
            document.getElementById("ambulatory_accessible_" + INDEX).value = ambulatory_accessible;
            document.getElementById("bar_height_" + INDEX).value = bar_height;
            document.getElementById("coat_hook_" + INDEX).value = coat_hook;
            document.getElementById("hook_height_" + INDEX).value = hook_height;
            document.getElementById("sink_" + INDEX).value = sink;
            document.getElementById("sink_height_" + INDEX).value = sink_height;
            document.getElementById("faucet_" + INDEX).value = faucet;
            document.getElementById("faucet_depth_" + INDEX).value = faucet_depth;
            document.getElementById("faucet_auto_fist_" + INDEX).value = faucet_auto_fist;
            document.getElementById("sink_clearance_" + INDEX).value = sink_clearance;
            document.getElementById("sink_clearance_height_" + INDEX).value = sink_clearance_height;
            document.getElementById("sink_pipes_" + INDEX).value = sink_pipes;
            document.getElementById("soap_dispenser_" + INDEX).value = soap_dispenser;
            document.getElementById("dry_fist_" + INDEX).value = dry_fist;
            document.getElementById("dry_fist_type_" + INDEX).value = dry_fist_type;
            document.getElementById("dry_controls_" + INDEX).value = dry_controls;
            document.getElementById("dry_control_height_" + INDEX).value = dry_control_height;
            document.getElementById("mirror_" + INDEX).value = mirror;
            document.getElementById("mirror_height_" + INDEX).value = mirror_height;
            document.getElementById("shelves_" + INDEX).value = shelves;
            document.getElementById("shelf_height_" + INDEX).value = shelf_height;
            document.getElementById("trash_receptacles_" + INDEX).value = trash_receptacles;
            document.getElementById("hygiene_seat_cover_" + INDEX).value = hygiene_seat_cover;
            document.getElementById("hygiene_cover_height_" + INDEX).value = hygiene_cover_height;
            document.getElementById("lightingRestroomInfo_" + INDEX).value = lighting;
            document.getElementById("lighting_typeRestroomInfo_" + INDEX).value = lighting_type;
            document.getElementById("commentRestroomInfo_" + INDEX).value = comment;
            document.getElementById("recommendationsRestroomInfo_" + INDEX).value = recommendations;
        },
        error: function(data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
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
    var est_id = document.getElementById("est_idSeating").value;

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
        },
        error: function (data) {
            $("#alert-body").html(JSON.stringify(data));
            $("#alert").modal('toggle');
        }
    });
}


