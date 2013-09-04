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

function SelectionCtrl($scope, $http, $location, ListerDataService) {
    var entry = ListerDataService.peak(),
        _data,
        _node,
        _mode;
    $http.get('data/'+entry.uri+'.json').success(function(data) {
        var name = data.name;
        if (!data.unique) {
            name = name + Math.floor((Math.random()*1000)+1);
        }
        _node = new Node(name, data);
        _mode = data.mode ? data.mode : 'sel';
        $scope.spec = data;
        $scope.options = data.options;
        $scope.cost = data.cost ? data.cost : 0;
        _data = data;
    }); 

    $scope.select = function(select) {
        if (_mode == 'mex') {
            select.parent = _data.parent;
            _node = new Node(select.id, select);
            // update cost with this entries cost
            $scope.cost = JSON.parse(select.cost);
        } else if (_mode == 'sel') {
            if(_node.add(select)) {
                $scope.cost = JSON.parse($scope.cost) + JSON.parse(select.cost);
            } else if( _node.find(select) ) {
                _list.remove(select);
                $scope.cost = JSON.parse($scope.cost) - JSON.parse(select.cost);
            }
        }
    }

    $scope.add = function() {
        if (!ListerDataService._tree.addChild(_node._data.parent, _node)) {
            console.log(_node, "already added");
        }
        ListerDataService.popToLast('create');
        window.location.href = "#/list";
    }
}

/**
 *
 */
function MenuCtrl($scope, $http, ListerDataService) {
    var entry = ListerDataService.peak();
    if (entry) {
        $http.get('data/'+entry.uri+'.json').success(function(data) {
            $scope.MenuEntries = data;
        });
    } else {
        $http.get('data/mainmenu.json').
            success(function(data) {
                $scope.MenuEntries = data;
            }).
            error(function(data, status, headers, config) {
            });
    }
 
    $scope.nav = function(entry) {
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
            $http.get('data/'+entry.uri+'.json').success(function(data) {
                data["ret"] = { "name" : "Back" };
                $scope.MenuEntries = data;
            });
        } else if (entry.action=="select") {
            ListerDataService.push(entry);
            window.location.href = "#/selection/";
        } else if (entry.action=="create") {
            window.location.href = "#/list"; 
        }
    } 
}

/**
 *
 */
function ListCtrl($scope, $http, $compile, ListerDataService) {
    var entry = ListerDataService.peak();
    $scope.list = ListerDataService._list;
    $scope.tree = ListerDataService._tree;
    if (entry) {
        $http.get('data/'+entry.uri+'.json').success(function(data) {
            // add the key to each element as the id
            for (e in data) {
                data[e].id = e;
                
            }
            for (e in ListerDataService._tree._root._children) {
                ListerDataService._tree._root._children[e].expand = false;
            }
            // parse into a tree
            ListerDataService._tree._root.fromObj(data);
            $scope.tree = ListerDataService._tree;
        });
    }

    $scope.nav = function(entry) {
        // List Navigation descends until it hits a 'select' page
        if (entry._data.action=="nav" || !entry._data.action) {
            $http.get('data/'+entry._data.uri+'.json').success(function(data) {
                $scope.List = data;
                ListerDataService.push(entry._data);
                window.location.href = "#/mainmenu"; 
           });
        } else if (entry.action == "select") {
            ListerDataService.push(entry);
            window.location.href = "#/selection/";
        }
    }

    $scope.widget = function(type, target) {
        target.expand = target.expand ? false: true;
/*
        if (target.expand == "disp") {
            target.expand = "fils";
        } else {
            target.expand = "disp";
        }
*/
    }
}
