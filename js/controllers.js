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
        _tree,
        _mode;

    /**
     * update the cost property of a node by counting the cost of all children
     * calls update on all child nodes
    */
    var updateCost = function (node) {
        var cost = node.data.cost; // set base cost from the nodes data
        node._forEachChild(function (node,child,index) {
            // totalcost indicates preprocessing of data, rather than raw cost
            updateCost(child);
            // we want the totalcost variable to only
            cost = parseInt(cost) + parseInt("_totalcost" in child.data ? child.data._totalcost : child.data.cost);
        });

        node.cost = cost; // set total cost on node
        $scope.cost = cost; // update display
    }

    var update = function(node, data) {
        // attempt to add the node
        data.selected = !data.selected;
        if (node.add(data)) {
            updateCost(node); // data was not in node, so just update the cost
        } else if ((i = node._indexOf(data.id ? data.id : data.name)) >= 0) {
            // data was in node, so check if an update is necsseary. This allows data to mutate between events
            node.remove(data.id ? data.id : data.name);
            updateCost(node, data);
        }
    }

    $http.get('data/'+entry.uri+'.json').success(function(data) {
        var name = data.name;
        if (!data.unique) {
            name = name + Math.floor((Math.random()*1000)+1);
        }
        _tree = new Tree(new Node(name,data));
        _data = data; 
        _mode = data.mode ? data.mode : 'sel';
        $scope.spec = data;
        $scope.options = data.options;
        // set the base cost
        var cost = data.cost ? data.cost : 0;
        _tree.root.cost = cost;
        // bind the node cost to the scope, node cost in our running total, data cost is the baseline
        $scope.cost = cost;
    });

    $scope.select = function(data) {
        if (_mode == 'mex') {
            data.selected = false;
            data.parent = _data.parent;
            // throw out the previous tree
            _tree.root = new Node(data.id, data);
            // update cost with this entries cost
            _tree.root().cost = parseInt(data.cost);
        } else if (_mode == 'sel') {
            update(_tree.root,data);
        }
    }

    var findparent = function(id,data) {
        var curopt = data;
        var queue = [data];
        while(queue) {
        if(queue[0].options) {
            for(each in queue[0].options) {
                console.log(each, queue[0].options[each]);
                if (queue[0].options[each].id == id || queue[0].options[each].name == id) {
                    return curopt;
                }
            }
        }
            queue = queue.concat(queue[0].options);
            queue.shift();
        }
    }

    
/*
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
*/
/*
    $scope.selectRange = function(data) {
        console.log("select range", data);
        var rep = _node.find(data.name);
        if(rep) {
            _node.cost = JSON.parse(_node.cost) - (JSON.parse(rep._data.volume) * JSON.parse(rep._data.cost));
            _node.remove(data.name);
            console.log(_node);
        }
        if(data.volume==0) {
            return;
        }
        var node = new Node(data.name, JSON.parse(JSON.stringify(data)));
        _node.add(node);
        _node.cost = JSON.parse(_node.cost) + (JSON.parse(data.cost) * JSON.parse(data.volume));
        $scope.cost = _node.cost;
    };
*/
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
        if (entry.data.action=="nav" || !entry.data.action) {
            $http.get('data/'+entry.data.uri+'.json').success(function(data) {
                console.log(data);
                $scope.List = data;
                ListerDataService.push(entry.data);
                window.location.href = "#/mainmenu"; 
            });
        } else if (entry.action == "select") {
            ListerDataService.push(entry);
            window.location.href = "#/selection/";
        }
    }
}
