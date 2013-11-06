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


Lister.directive("lsListItem", function ($compile) {
    var widgetToTemplate = {
        "slider" : '<input type="range" min="1" max="10">'
    }

    return {
        // restricts to use as an attribute
        restrict : 'E', 
        replace : true,

//        scope : true,
        scope : {
            data : '=data',
            select : '='
        },
        transclude: 'element',  
        templateUrl : "partials/listentrytemplate.html",
       // repeater priority takes precedence 
       compile : function (telement, tattrs, transclude) {
            telement[0].setAttribute('ng-click', 'selectRange()');
            return function (scope, iElement, iAttrs, controller) {
                var type;
                console.log("FIRST",scope, scope.data);
                if(type=scope.data.type) {
                    console.log(scope.data);
                    if (type=="slider") {
                        sliderelem = document.createElement('input');
                        sliderelem.setAttribute('type','range');
                        sliderelem.setAttribute('min',scope.data.min);
                        sliderelem.setAttribute('max',scope.data.max);
                        sliderelem.setAttribute('value', 0);
//                        sliderelem.setAttribute('style', "width:100%;");
                        sliderelem.onmouseup = function(e) {
                            //e.stopPropagation();
                            e.srcElement.value;
                        };
                        iElement[0].setAttribute('ng-click', 'selectRange()');
                        $compile(iElement)(scope);                        
                        iElement.append(sliderelem);
                    }
               }
                        iElement[0].setAttribute('ng-click', 'select(data)'); 
$compile(iElement)(scope); 
            };
        }
    }
});
