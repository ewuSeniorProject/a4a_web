var EVM = { viewModel: new EstablishmentViewModel()};

$(document).ready(start);

function start() {
    ko.applyBindings(EVM.viewModel, document.getElementById('establishment-list-wrapper'));
    if (getMobileOperatingSystem() === "Android") {
        $("#download").html('' +
            '<a class="dropdown-item" href="./mobile_app/com.companyname.A4AA_Application.apk"><i class="fas fa-download"></i> Download Mobile App</a>\n' +
            '<div class="dropdown-divider"></div>');
    }

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
    self.adminUrl = ("update.php");
    self.userUrl = ("view.php");
    self.reportUrl = ("pdf_report.php");
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

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

