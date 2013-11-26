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
    this.root = root ? root : new Node('root');
    this.root.parent = null;
}

/*Tree.prototype.root = function() {
    return this.root;
}*/

Tree.prototype.search = function(targetid) {
    var found,
        callback = function(node) {
        if (node.id == targetid) {
            found = node;
            return true;
        }
    }
    this._bft(callback);
    return found;
}

//adds 'node' as a child to tree-node with target id
Tree.prototype.addChild = function(targetid, child) {
    if(targetid=='root') {
        this.root.add(child);
        return;
    }
    var callback = function(node) {
        if (node.id == targetid) {
            child.parent = node;
            node.add(child);
        }
    }

    if (child.unique) {
       if (this.search(child.id)) {
            return false;
        } 
    }

    this._bft(callback);        
}

//returns delimited string of the ids in this nodes ancestry to the root node
Tree.prototype.address = function(node) {
    var cnode = node.parent,
        addr = node.id;
    while (cnode.parent != null) {
        console.log(cnode);
        addr = (cnode.id) + '.' + addr;
        console.log(addr);
        cnode = cnode.parent();
    }
    return cnode.id + '.' + addr;
}

Tree.prototype.checkaddress = function(addr) {
    var heritage = addr.split('.'),
        cnode = this.root;
    
    if (!heritage.length || cnode.id != heritage[0]) return false;

    for (var i = 1; i < heritage.length; i = i + 1) {
        if (!(cnode = cnode.find(heritage[i]))) {
        }
    }
    return true;
}

// breadth first traversal
Tree.prototype._bft = function(callback) {
    var queue = [this.root];
    // add root node's children
    queue = queue.concat(this.root.children);
    while (queue.length > 0) {
        // always target first node in queue, add its children
        callback(queue[0]);
        queue = queue.concat(queue[0].children);
        queue.shift();
    }    
}
