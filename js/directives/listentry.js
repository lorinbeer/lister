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


Lister.directive("lsListItem", function () {
    var widgetToTemplate = {
        "slider" : '<input type="range" name="points" min="1" max="10">'
    };
    return {
        // restricts to use as an attribute
        restrict : 'E', 
        replace : true,
        scope : true,
        transclude: 'element',  
        templateUrl : "partials/listentrytemplate.html",
       // repeater priority takes precedence 
       compile : function (tElement, tattrs, transclude) {
            return function (scope, iElement, iAttrs, controller) {
                var type;
                if(type=scope.opt.type) {
                    if (type=="slider") {
                        tElement.append(widgetToTemplate['slider']);                        
                    } 
                }
            };
        }
    }
});
