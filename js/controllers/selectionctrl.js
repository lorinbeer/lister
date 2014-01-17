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

function SelectionCtrl($scope, $http, $location, ListerDataService, ListerNavService, ListerRuler) {
    var _rawdata,
        _datatree,
        _tree;

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
                cost = parseInt(cost) + parseInt(c.totalcost ? c.totalcost : c.cost);
            });
        }
        recdate(root);
        
        root.cost = cost; // set total cost on node
        $scope.cost = cost; // update display
    }

    var update = function(targettree, datatree, node) {
        var addr = datatree.address(node.id);
        
        if (targettree.checkaddress(addr) && !node.selected) {
            targettree.prune(addr);
        } else {
            targettree.splice(datatree, node.id);
        }
        updateCost(targettree.root);
    }

    var treeify = function(root, data, i) {
        for (each in data.options) {
            var newnode = root.add(data.options[each]);
            newnode.parent = root;
            treeify(newnode, data.options[each]);
        }
    }

/*    $http.get('data/'+entry.uri+'.json').success(function(data) {
    
    var data = ListerNavService.current();
    console.log("selection:", data); 
            var name = data.name;

/*        if (!data.unique) {
            name = name + Math.floor((Math.random()*1000)+1);
            }
*/
        var data = ListerNavService.current();
        var name = data.name;

        console.log(data);

        _tree = new Tree(new Node(name,data));
        _rawdata = data;
 
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

    $scope.select = function(node) {
        if (!node.cost) node.cost = node.data.cost ? node.data.cost : 0;

        if (node.parent) {
            if (node.parent.data.rule) {
                ListerRuler.apply( { 'rule': node.parent.data.rule, 
                                     'node': node,
                                     'targettree' : _tree, 
                                     'datatree' : _datatree} );
                updateCost(_tree.root);
            } else { 
                update(_tree,_datatree,node);}
        // TODO move update to ruler
        } else {
        update(_tree,_datatree,node); } 
    }
    
    /**
     * add button handler
     */
    $scope.add = function() { 
        ListerDataService.add(ListerNavService.getCurrentUri(), _tree);
        
//        ListerDataService._tree.addChild(_node._rawdata.parent, _node);
//        var parent = ListerDataService._tree.search(_node._rawdata.parent)
//        parent._rawdata.total = JSON.parse(parent._rawdata.total) + JSON.parse(_node.cost);
//        window.location.href = "#/list";
    }
    /**
     * cancel button handler
     */
    $scope.cancel = function() { 
    }
}
