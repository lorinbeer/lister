var Lister = 
    angular.module('lister', []).
        config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/mainmenu', {templateUrl: 'partials/menu.html', controller: MenuCtrl }).
                when('/selection', {templateUrl: 'partials/selection.html', controller: selectionCtrl}).
                otherwise({redirectTo: '/mainmenu'});
        }]);

Lister.factory('ListerDataService', function () {
    var dataServiceObj = {
        _dat : [],
        _list: {
            "total" : "0",
            "entries" : []
        },
        push : function(obj) {
           return dataServiceObj._dat.push(obj);
        },
        pop : function() {
            return dataServiceObj._dat.pop();
        },
        peak : function () {
            return dataServiceObj._dat[dataServiceObj._dat.length-1];
        },
        clear : function() {
            dataServiceObj._dat = [];
        },
        add : function(selection) {
            dataServiceObj._list.total = dataServiceObj._list.total + selection.cost; 
            dataServiceObj._list.entries.push(selection); 
        }

    };
    return dataServiceObj;
});

