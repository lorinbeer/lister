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
        'nav' : function (entry) {
            $http.get('data/' + entry.uri + '.json').success(function(data) {
                var controller = 'menu',
                    uri;

                // determine controller
                if (entry.action == 'create') {
                    // create mode
//                   controller = 'selection';
                }
                
                if (data.options) {
                    controller = 'selection';
                }

                // format uri to angular friendly (no routing wild cards, ffffffuuuuuuuuuuuuu)
                uri = entry.uri.split('/');
                uri = uri.join('.');
                // update state
                history.push(uri);
                currentdata = data;
                window.location.href = '#/' + controller  +'/' + uri;
            }).
            error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });

        },
        'current' : function () {
            // return the most current entry in the history
            return currentdata;
        }         
    };
    return navServiceObject
});
