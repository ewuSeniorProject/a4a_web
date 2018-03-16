const API_ROOT = 'http://www.mizesolutions.com/a4a_web/a4aa/public/';
const SESSIONID = getSessionID();
console.log("est_id: " + SESSIONID);

$(document).ready(function () {
    function Model(parm) {
        console.log(JSON.stringify(parm));
        this.postUri = parm.postUri;
        this.putUri = parm.putUri;
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
        this.website.focused = ko.observable(false);
        this.phone = ko.observable(parm.data.cat_id);
        this.phone.focused = ko.observable(false);
        this.phone_type = ko.observable(parm.data.phone_type);
        this.phone_type.focused = ko.observable(false);
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

    function ViewModel(getUri, deleteUri, postUri, putUri) {
        var self = this;
        self.obsList = ko.observableArray([]);

        $.getJSON(getUri, function (data) {
            self.obsList($.map(data, function (item) {
                return new Model({data:item, postUri:postUri, putUri:putUri});
            }));
        });

        self.removeItem = function (item) {
            var con = confirm("Delete this record?");
            if (con){
                self.obsList.remove(item);
                removeRequest(deleteUri, item.name());
            }
        };

        self.addItem = function () {
            self.obsList.push(new Model({name: "", postUri:postUri, putUri:putUri}));
        };
    }

    ko.applyBindings(new ViewModel(API_ROOT + 'get/establishment/' + SESSIONID, API_ROOT + 'delete/establishment/' + SESSIONID, API_ROOT + 'post/establishment/' + SESSIONID, API_ROOT + 'put/establishment/' + SESSIONID), document.getElementById('establishment-view'));
    // ko.applyBindings(new ViewModel(API_ROOT + 'get/classes', API_ROOT + 'delete/class', API_ROOT + 'post/class', API_ROOT + 'put/class'), document.getElementById('classes-view'));
    // ko.applyBindings(new ViewModel(API_ROOT + 'get/components', API_ROOT + 'delete/component', API_ROOT + 'post/component', API_ROOT + 'put/component'), document.getElementById('components-view'));
    // ko.applyBindings(new ViewModel(API_ROOT + 'get/durations', API_ROOT + 'delete/duration', API_ROOT + 'post/duration', API_ROOT + 'put/duration'), document.getElementById('durations-view'));
    // ko.applyBindings(new ViewModel(API_ROOT + 'get/ranges', API_ROOT + 'delete/range', API_ROOT + 'post/range', API_ROOT + 'put/range'), document.getElementById('ranges-view'));
    // ko.applyBindings(new ViewModel(API_ROOT + 'get/schools', API_ROOT + 'delete/school', API_ROOT + 'post/school' , API_ROOT + 'put/school'), document.getElementById('schools-view'));
    // ko.applyBindings(new ViewModel(API_ROOT + 'get/tags', API_ROOT + 'delete/tag', API_ROOT + 'post/tag', API_ROOT + 'put/tag'), document.getElementById('tags-view'));
    // ko.applyBindings(new ViewModel(API_ROOT + 'get/tiers', API_ROOT + 'delete/tier', API_ROOT + 'post/tier', API_ROOT + 'put/tier'), document.getElementById('tiers-view'));

});

function getSessionID() {
     return localStorage.getItem("id");
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