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


Lister.directive('lsToggleWidget', function ($http) {
    return {
        restrict : 'A',
        replace : true,
        template : '<div></div>',
//        templateUrl : 'partials/togglewidget.html',
        compile : function compile(tElement, tAttrs, transclude) {
            $http.get(tAttrs.off).success(function (data) {
                tElement.append(data);
            });
            return function (scope, elem, attr) {
                elem.find('svg').remove();
                $http.get(attr.off).success(function(data) {
                    elem.append(data);
                });
            }
        }
    }
});
