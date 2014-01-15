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

/**
 *
 */
function MenuCtrl($scope, $http, ListerNavService, ListerDataService) {
    if (!ListerNavService.current()) {
        ListerNavService.nav({'uri':'index'});
    }

    var data = ListerNavService.current();
    
    // if data still isn't valid, then we have no index or default page to load, and we should error out gracefully
    if (data) {
        $scope.MenuEntries = data;
    } else {

    }
    /*
    else {
        $http.get('data/index.json').
            success(function(data) {
                $scope.MenuEntries = data;
            }).
            error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });
    }*/

    /**
     * on nav event
     */
    $scope.nav = function(entry) {
        ListerNavService.nav(entry);
        
/*
        $http.get('data/'+entry.uri+'.json').success(function(data) {
            if (data.type=="nav" || !data.type) {
                data["ret"] = { "name" : "Back" };
                ListerDataService.push(entry);
                $scope.MenuEntries = data;
            } else if (data.type=="select") {
                ListerDataService.push(entry);
                window.location.href = "#/selection/";
            }
        });

        if (entry.action=="nav" || !entry.action) {
            console.log("shoeaush");
            $http.get('data/'+entry.uri+'.json').success(function(data) {
                $scope.MenuEntries = data;
            });
        } else if (entry.action=="select") {
            ListerDataService.push(entry);
            window.location.href = "#/selection/";
        }
*/
    }
}
