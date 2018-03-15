var EVM = { viewModel: new UpdateViewModel()};

$(document).ready(start);

function start() {
    ko.applyBindings(EVM.viewModel, document.getElementById('update-list-wrapper'));
}


function UpdateModel(data) {

    var self = this;
    self.id = data.id;
    self.name = data.name;
    self.website = data.website;
    self.street = data.street;
    self.city = data.city;
    self.state = data.state;
    self.zip = data.zip;
    self.phone = data.phone;
    self.contact_fname = data.contact_fname;
}


function UpdateViewModel() {

    var self = this;
    self.updateList = ko.observableArray([]);

    self.getUpdateList = function (uri) {
        $.getJSON(uri, function(data) {
            var mappedObjects = $.map(data, function (item) {
                return new UpdateModel(item);
            });
            self.updateList(mappedObjects);
        })
    };

    self.onLoad = function () {
        self.getUpdateList("http://www.mizesolutions.com/a4a_web/a4aa/public/update/");
    };

    self.onLoad();
}