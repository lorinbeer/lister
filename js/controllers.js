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

function SelectionCtrl($scope, $http, $location, ListerDataService, ListerRuler) {
    var entry = ListerDataService.peak(),
        _data,
        _node,
        _mode;

    var toggle = function(s) {
        _node.remove(s.name);
        _node.cost = JSON.parse(_node.cost) - JSON.parse(s.cost);
    } 

    $http.get('data/'+entry.uri+'.json').success(function(data) {
        var name = data.name;
        if (!data.unique) {
            name = name + Math.floor((Math.random()*1000)+1);
        }
        _node = new Node(name, data);
        _mode = data.mode ? data.mode : 'sel';
        $scope.spec = data;
        $scope.options = data.options;
        // set the base cost
        _node.cost = data.cost ? data.cost : 0;
        // bind the node cost to the scope, node cost in our running total, data cost is the baseline
        $scope.cost = _node.cost;
        _data = data;
    });

    $scope.select = function(select) {
        if (_mode == 'mex') {
            select.parent = _data.parent;
            _node = new Node(select.id, select);
            // update cost with this entries cost
            _node.cost = JSON.parse(select.cost);
        } else if (_mode == 'sel') {
            if(_node.add(select)) {
                _node.cost = JSON.parse(_node.cost) + JSON.parse(select.cost);
            } else if( _node._indexOf(select.name)>=0) {
                toggle(select);
            }
        }
        $scope.cost = _node.cost;
    }

    $scope.subselect = function(select, subselect) {
        if ( _node._indexOf(subselect.name)>=0) {
            console.log(select, subselect);
            toggle(subselect);
        } else {
            ListerRuler.interpret(select.rule,_node,{'selection':subselect,'entry':select});
            _node.cost = _data.cost;
            for (child in _node._children) {
                _node.cost = JSON.parse(_node.cost) + JSON.parse(_node._children[child]._data.cost);
            }
        }
        $scope.cost = _node.cost;
    }
    /**
     * add button handler
     */
    $scope.add = function() {
        ListerDataService._tree.addChild(_node._data.parent, _node);
        console.log(_node.cost);
        var parent = ListerDataService._tree.search(_node._data.parent)
        parent._data.total = JSON.parse(parent._data.total) + JSON.parse(_node.cost);
        ListerDataService.popToLast('create');
        window.location.href = "#/list";
    }
}

/**
 *
 */
function ListCtrl($scope, $http, $compile, ListerDataService) {
    $scope.tree = ListerDataService._tree;    

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
}
