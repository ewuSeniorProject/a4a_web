var EVM = { viewModel: new EstablishmentViewModel()};

$(document).ready(start);

function start() {
    ko.applyBindings(EVM.viewModel, document.getElementById('establishment-list-wrapper'));
    sessionStorage.setItem('id', EVM.data.est_id);
}


function EstablishmentModel(data) {

    var self = this;
    self.est_id = data.est_id;
    self.name = data.name;
    self.website = data.website;
    self.street = data.street;
    self.city = data.city;
    self.state = data.state;
    self.zip = data.zip;
    self.phone = data.phone;
    self.contact_fname = data.contact_fname;
    self.baseUrl = ("http://www.mizesolutions.com/a4a_web/a4aa/public/update.html");
}


function EstablishmentViewModel() {

    var self = this;
    self.establishmentList = ko.observableArray([]);

    self.getEstablishmentList = function (uri) {
        $.getJSON(uri, function(data) {
            var mappedObjects = $.map(data, function (item) {
                return new EstablishmentModel(item);
            });
            self.establishmentList(mappedObjects);
        })
    };

    self.onLoad = function () {
        self.getEstablishmentList("http://www.mizesolutions.com/a4a_web/a4aa/public/estab");
    };

    self.onLoad();
}