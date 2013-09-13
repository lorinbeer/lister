describe("Menu Controller Spec", function() {
    var ctrl,
        req= "data/index.json",
        res= {"entry1": {"name":"Entry 1","blurb":"this is the first entry"},
              "entry2": {"name":"Entry 2","blurb":"this is the second entry"},
              "entry3": {"name":"Entry 3","blurb":"this is the third entry"}}, 
        scope,
        controller,
        LDS_MOCK,
        $httpBackend;

    beforeEach(function() {
        inject(function ($injector, $rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller;
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.whenGET('data/index.json').respond(JSON.stringify(res));
            LDS_MOCK = { peak:function() {}};
            ctrl = $controller(MenuCtrl, {$scope:scope, ListerDataService:LDS_MOCK});
        });
    });

    it("should peak into the stack and check for an entry", function() {
        var peaked,
            ctrl,
            mockdata = {"mock1":{"name":"Mock 1"}};
        LDS_MOCK.peak = function() {
            peaked = true;
            return {uri:"mock_entry"};
        };
        $httpBackend.whenGET('data/mock_entry.json').respond(JSON.stringify(mockdata));
        ctrl = controller(MenuCtrl, {$scope:scope, ListerDataService:LDS_MOCK});
        $httpBackend.flush();        
        expect(peaked).toBe(true);
        expect(JSON.stringify(scope.MenuEntries)).toBe(JSON.stringify(mockdata));
    });

    it("should set scope variable 'MenuEntries' data on the scope", function() {
        $httpBackend.flush();
        expect(scope.MenuEntries).toBeDefined();
    });

    it("should request default menu page if none present in queue", function() {
        $httpBackend.flush();
        expect(JSON.stringify(scope.MenuEntries)).toBe(JSON.stringify(res));
    });

    it("should set a nav function on the scope", function() {
        expect(scope.nav).toBeDefined();
    });

});
