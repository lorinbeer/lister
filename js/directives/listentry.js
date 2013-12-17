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


Lister.directive("lsListItem", function ($compile, $http) {
    var widgetToTemplate = {
        "slider" : '<input type="range" min="1" max="10">'
    }

    return {
        // restricts to use as an attribute
        restrict : 'E', 
        replace : true,

        scope : {
            node : '=node',
            data : '=data',
            select : '='
        },
        transclude: 'element',  
        templateUrl : "partials/listentrytemplate.html",
       // repeater priority takes precedence 
       compile : function (telement, tattrs, transclude) {

            return function (scope, iElement, iAttrs, controller) {
                var type;

                if(type=scope.data.type) {
                    if (type=="slider") {
                        sliderelem = document.createElement('input');
                        sliderelem.setAttribute('type','range');
                        sliderelem.setAttribute('min',scope.data.min);
                        sliderelem.setAttribute('max',scope.data.max);
                        sliderelem.setAttribute('value', 0);
                        sliderelem.setAttribute('style', "width:80%;");
                        scope.data._totalcost = scope.data.cost * 0;
                        sliderelem.onchange =  function(e) {
                            //e.stopPropagation();
                            scope.data._totalcost = scope.data.cost * e.srcElement.value;
                        };
                        iElement.bind("click", function(e) {
//                            scope.data.selected = !scope.data.selected;
                            scope.node.selected = !scope.node.selected;
                            e.stopPropagation();
                        });
                        iElement.append(sliderelem);
                    }
                } else if(type=="sublist" || scope.data.options) {
                   // draw as a sublist
                   var parent = iElement.parent();
                   iElement.remove();
               console.log('aseuhsanoeuh'); 
                   $http.get('partials/recursiveentry.html').success(function(data) {
                        scope.node.expand = false;
                        scope.node.selected = false;
 
                        var elem = document.createElement('li');
                        elem.setAttribute('ng-click', 'select(node)');
                        elem.onclick = function(e) {
                            console.log("ELEM ON CLICK", scope.node);
                            if (scope.node.selected && scope.node.expand) {
                                scope.node.expand = false;
                            } else if (!scope.node.selected && !scope.node.expand) {
                                scope.node.selected = true; scope.node.expand = true;
                            } else if (scope.node.selected && !scope.node.expand) {
                                scope.node.selected = false;
                            } else if (!scope.node.selected) {
                                scope.node.selected = true;
                            }
                            scope.$digest();
                            e.stopPropagation();
                        }
                        elem.innerHTML = data;
                        $compile(elem)(scope);
                        parent.append(elem);
                   });



                } else {
                    iElement[0].onclick = function(e) { 
                    console.log("blandoesuhtaeuh");
                    console.log(scope.node.selected);
                    if (scope.node.selected == undefined) scope.node.selected = true;
                    else
                    scope.node.selected = !scope.node.selected;
                        console.log(scope.node.selected);
                    e.stopPropagation(); }
                }
                iElement[0].setAttribute('ng-click', 'select(node)'); 
                $compile(iElement)(scope); 
            };
        }
    }
});
