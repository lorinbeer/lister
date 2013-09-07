describe("ToggleWidget", function() {
    var modulename = "lister",
        officonurl = 'icons/svg/down_arrow.svg',
        oniconurl = 'icons/svg/up_arrow.svg',
        offsvg = '<svg><circle cx="0" cy="0" r="50" fill="red"/></svg>',
        onsvg = '<svg><rect width="50" height="50" style="fill:rgb(0,0,255)"/></svg>',
        $httpBackend,
        $rootscope,
        html,
        element,
        compiled;

    beforeEach(function() {
        module(modulename);
        inject(function($injector, $compile, $rootScope) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.whenGET(officonurl).respond(offsvg);
            $httpBackend.whenGET(oniconurl).respond(onsvg);

            html = '<div ls-toggle-widget off="icons/svg/down_arrow.svg" on="up_arrow.svg"></div>';
            scope = $rootScope.$new();
            element = angular.element(html);
            compiled = $compile(element)(scope);
            scope.$digest();
        });
     });

    it("should compile the html with the 'on' icon svg injected into the svg element", function () {
        $httpBackend.flush();
        console.log(compiled.children().children());
    });

    it("should swap the svg contents on click", function () {

    });

    it("should toggle svg contents", function () {

    });
});
