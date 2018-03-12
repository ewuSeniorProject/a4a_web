var TVM = { viewModel: new TestViewModel()};

$(document).ready(start);

function start() {
    ko.applyBindings(TVM.viewModel, document.getElementById('test-list-wrapper'));
}


function TestModel(data) {

    var self = this;
    self.testID = data.id;
    self.testData = data.data;
}


function TestViewModel() {

    var self = this;
    self.testList = ko.observableArray([]);

    self.getTestList = function (uri) {
        $.getJSON(uri, function(data) {
            var mappedObjects = $.map(data, function (item) {
                return new TestModel(item);
            });
            self.testList(mappedObjects);
        })
    };

    self.onLoad = function () {
        self.getTestList("http://www.mizesolutions.com/a4aa1/a4aa_webTest/public/testget");
    };

    self.onLoad();
}