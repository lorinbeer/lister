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

Lister.directive("lsSelectView", function () {
    return {
        // restricts to use as an attribute
        restrict : 'A',
        scope : '=',
        trasclude: 'element',
        replace : false,
        templateUrl : "partials/selectionviewtemplate.html",
        compile : function (tElement, tattrs, transclude) {
            return function (scope, iElement, iAttrs, controller) {
            };
        },
    }
});
