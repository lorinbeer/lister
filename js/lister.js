/**
 *  Lister UI Framework, create complex menu systems through a JSON metadata syntax
 *  Copyright (C) 2013 Lorin Beer lorin.beer.dev@gmail.com
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.

 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.

 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var Lister = 
    angular.module('lister',  ['ngRoute']).
        config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/index', {templateUrl: 'partials/menu.html', controller: MenuCtrl }).
                when('/selection', {templateUrl: 'partials/selection.html', controller: SelectionCtrl}).
                otherwise({redirectTo: '/index'});
        }]);

Lister.factory('ListerDataService', function ($http) {
    var dataServiceObj = {
        _dat : [],
        _list: new List(),
        _tree: new Tree(),

        update : function() {
           
        },

        create : function(entry) {
            // retrieve the template to create from
            $http.get('data/'+entry.uri+'.json').success(function(data) {
                // add the id to each data object
                for (e in data) {
                    data[e].id = e;
                    data[e].total = 0;
                }
                data.total = 0;
                // build a new tree from data
                dataServiceObj._tree = new Tree();
                dataServiceObj._tree.root.fromObj(data);
            });
        },

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
            // add selection to sublist based on type
            if (selection.type) {
                for (each in dataServiceObj._list._options) {
                    if (dataServiceObj._list._options[each]._id == selection.type) {
                        dataServiceObj._list._options[each].add(selection);    
                    }
                }
            } else {
                dataServiceObj._list.add(selection);
            }
        }

    };
    return dataServiceObj;
});

