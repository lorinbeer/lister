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

var Tree = function(root) {
    this._root = root ? root : new Node('root');
}

Tree.prototype.search = function(targetid) {
    var found,
        callback = function(node) {
        if (node._id == targetid) {
            found = node;
            return true;
        }
    }
    this._bft(callback);
    return found;
}

//adds 'node' as a child to tree-node with target id
Tree.prototype.addChild = function(targetid, child) {
    var callback = function(node) {
        if (node._id == targetid) {
            node.add(child);
        }
    }
    this._bft(callback);        
}

// breadth first traversal
Tree.prototype._bft = function(callback) {
    var queue = [];
    // add root node's children
    queue = queue.concat(this._root._children);
    while (queue.length > 0) {
        // always target first node in queue, add its children
        callback(queue[0]);
        queue = queue.concat(queue[0]._children);
        queue.shift();
    }    
}
