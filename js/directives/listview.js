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


Lister.directive("lsListView", function () {
    return {
        // restricts to use as an attribute
        restrict : 'A', 
        replace : false,
        templateUrl : 'js/directives/listviewtemplate.html',
 /*       template : '<div class="list" ng-repeat="child in tree._root._children">' +
                     '<div class="spacer"></div>' +
                     // the entry button
                     '<span class="label" ng-click="nav(child)">{{child._id}}</span>' +
                    // the entry widget(s)
                       '<div id="{{child._id+\'_exp\'}}" ng-click="widget(\'expand\',child)" class="widget exp"></div>' +
                    // subentry
                        '<div ng-switch="child.expand">' +
                            '<div ng-switch-when="true">'+
                                '<div id="{{child._id+\'_sublist\'}}" ng-repeat="subchild in child._children">'+
                                    '<div>{{subchild._data.name}}</div>' +
                                '</div>'+
                            '</div>'+  
                        '</div>' +
                   '</div>',*/
        link : function (scope, elem, attr) {
            console.log("saheusaeu");
            scope.$watch('expand', function (oldval, newval) {

            });
        },
        // specifies that we expect an object form the directive

        //
    }
});
