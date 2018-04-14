var EVM = { viewModel: new EstablishmentViewModel()};

$(document).ready(start);

function start() {
    ko.applyBindings(EVM.viewModel, document.getElementById('establishment-list-wrapper'));
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
    self.contact_lname = data.contact_lname;
    self.baseUrl = ("update.php");
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
        self.getEstablishmentList("establishment/");
    };

    self.onLoad();
}

function setEstablishmentId(value) {
    localStorage.setItem('establishmentID', value);
}

function logout() {
    localStorage.clear();
    location.href = "logout.php";
}