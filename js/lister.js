var Lister = 
    angular.module('lister', []).
        config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/mainmenu', {templateUrl: 'partials/menu.html', controller: MenuCtrl }).
                when('/selection', {templateUrl: 'partials/selection.html', controller: SelectionCtrl}).
                when('/list', {templateUrl: 'partials/list.html', controller: ListCtrl}).
                otherwise({redirectTo: '/mainmenu'});
        }]);

Lister.factory('ListerDataService', function () {
    var dataServiceObj = {
        _dat : [],
        _list: new List(),

        getLast : function(action) {
            for (var i = dataServiceObj._dat.length-1; i >= 0; i = i -1) {
                if (dataServiceObj._dat[i].action == action) {
                    return dataServiceObj._dat[i];
                }
            }  
        },

        popToLast : function(action) {
            for (var i = dataServiceObj._dat.length-1; i >= 0; i = i -1) {
                if (dataServiceObj._dat[i].action == action) {
                    return;
                }
                dataServiceObj._dat.pop();
            }
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
            dataServiceObj._list.add(selection);
        }

    };
    return dataServiceObj;
});

