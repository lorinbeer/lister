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
        _rawdata,
        _datatree,
        _tree,
        _mode;

    /**
     * update the cost property of a node by counting the cost of all children
     * calls update on all child nodes
    */
    var updateCost = function (root) {
        var cost = root.data.cost; // set base cost from the nodes data
        var recdate = function(node) {
            node._forEachChild( function(n,c,i) {
                // recurse on child
                recdate(c);
                cost = parseInt(cost) + parseInt(c.data.cost);
            });
        }
        recdate(root);
/*
        node._forEachChild(function (node,child,index) {
            // totalcost indicates preprocessing of data, rather than raw cost
            updateCost(child);
            console.log("returned from child update");
            // we want the totalcost variable to only
            console.log(node.id,node.cost,node);
                console.log(node.cost);
            cost = parseInt(cost) + parseInt(child.data.cost);//parseInt("_totalcost" in child.data ? child.data._totalcost : child.data.cost);
        });
*/
        root.cost = cost; // set total cost on node
        $scope.cost = cost; // update display
    }

    var update = function(targettree, datatree, data) {
        var addr = datatree.address(data.id);
        // determine data address
        // check address in tree
        // if present, remove
        // if not present, add
        if (targettree.checkaddress(addr)) {
            targettree.prune(addr);
        } else {
            targettree.splice(datatree, data.id);
        }
        console.log(_tree);


       updateCost(targettree.root);
       // attempt to add the node
/*        if (node.add(data)) {
            updateCost(node); // data was not in node, so just update the cost
        } else if ((i = node._indexOf(data.id ? data.id : data.name)) >= 0) {
            // data was in node, so check if an update is necsseary. This allows data to mutate between events
            node.remove(data.id ? data.id : data.name);
            updateCost(node, data);
        }
*/
    }

    var treeify = function(root, data, i) {
        for (each in data.options) {
            var newnode = root.add(data.options[each]);
            treeify(newnode, data.options[each]);
        }
    }

    $http.get('data/'+entry.uri+'.json').success(function(data) {
            var name = data.name;
    /*        if (!data.unique) {
            name = name + Math.floor((Math.random()*1000)+1);
            }
*/
        _tree = new Tree(new Node(name,data));
        _rawdata = data;
        _mode = data.mode ? data.mode : 'sel';
 
        _datatree = new Tree(new Node(data.name,data));
        treeify(_datatree.root, data); 
        $scope.datatree = _datatree; 
        $scope.node = _datatree.root;
        $scope.spec = data;
        $scope.options = data.options;
        // set the base cost
        var cost = data.cost ? data.cost : 0;
        _tree.root.cost = cost;
        // bind the node cost to the scope, node cost in our running total, data cost is the baseline
        $scope.cost = cost;
    });

    $scope.select = function(data) {
        if (!data.cost) data.cost = 0;
        if (_mode == 'mex') {
            data.selected = false;
            data.parent = _rawdata.parent;
            // throw out the previous tree
            _tree.root = new Node(data.id, data);
            // update cost with this entries cost
            _tree.root().cost = parseInt(data.cost);
        } else if (_mode == 'sel') {
            update(_tree,_datatree,data);
        }
    }

    var path = function(id,st,data,done) {
        if (id == data.name || id == data.id) {
            return [data];
        } 
        if  (data.options) {
            for (i in data.options) {
                sp = path(id,st,data.options[i]);
                if (sp) {
                    sp.push(data);
                    return sp;
                }
            }
        }
        return;
    }

    var findparent = function(id,data) {
        var curopt = data;
        var queue = [data];

        while(queue) {
        if(queue[0].options) {
            for(each in queue[0].options) {
                if (queue[0].options[each].id == id || queue[0].options[each].name == id) {
                    return queue[0];
                }
            }
        }
        if (queue[0].options)
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
            _node.cost = _rawdata.cost;
            for (child in _node._children) {
                _node.cost = JSON.parse(_node.cost) + JSON.parse(_node._children[child]._rawdata.cost);
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
            _node.cost = JSON.parse(_node.cost) - (JSON.parse(rep._rawdata.volume) * JSON.parse(rep._rawdata.cost));
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
        ListerDataService._tree.addChild(_node._rawdata.parent, _node);
        var parent = ListerDataService._tree.search(_node._rawdata.parent)
        parent._rawdata.total = JSON.parse(parent._rawdata.total) + JSON.parse(_node.cost);
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
