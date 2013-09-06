describe("ToggleWidget", function() {
    var modulename = "lister",
        scope,
        html,
        element,
        compiled;

    beforeEach(function () {
        var mockmodule = angular.module('mocklister',['lister', 'ngMockE2E']);
        mockmodule.run(function($httpBackend) {
            $httpBackend.whenGET('icons/svg/down_arrow.svg').passThrough();
        });
        module('mocklister');
        html = '<div ls-toggle-widget off="icons/svg/down_arrow.svg" on="up_arrow.svg"></div>';
   
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            element = angular.element(html);
            $compile(element)(scope);
            scope.$digest();
        });
    });

    it("", function () {
        
    });

    it("", function () {
    });

    it("", function () {
    });
});
