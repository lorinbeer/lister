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

Lister.factory('ListerNavService', function ($http, ListerDataService) {
    function navSelect() {};
    function navCreate() {};
    function navListView(){}
    var history = [];
    var currentdata = null;
    var navServiceObject = {
        'nav' : function (uri) {
            $http.get('data/' + uri + '.json').success(function(data) {
                history.push(uri);
                currentdata = data;
                window.location.href = "#/data/" + uri;
                /*
                    if (entry.action=="nav" || !entry.action) {
                    $http.get('data/'+entry.uri+'.json').success(function(data) {
                    data["ret"] = { "name" : "Back" };
                    $scope.MenuEntries = data;
                    });
                    } else if (entry.action=="select") {
                    ListerDataService.push(entry);
                    window.location.href = "#/selection/";
                    } else if (entry.action=="create") {
                    ListerDataService.create(entry);
                    window.location.href = "#/list";
                }
*/
            });
        },
        'current' : function (uri) {
            // return the most current entry in the history
            return history[history.length - 1];
        }         
    };
    return navServiceObject
});
