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


var TreeIterator = function(tree) {
    this.node = tree.root;
}

TreeIterator.prototype.go = function(id) {
    for (var i = 0; i < this.node.children.length; i = i + 1) {
        if (this.node.children[i].id == id) {
            this.node = this.node.children[i];
            break;
        }
    }
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
Tree.prototype.addchild = function(targetid, child) {
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
/*
    if (child.unique) {
       if (this.search(child.id)) {
            return false;
        } 
    }
*/
    this._bft(callback);        
}

//returns delimited string of the ids in this nodes ancestry to the root node
Tree.prototype.address = function(id) {
    var chain = [],
        recgen = function (targetid, n, chain) {
        if (targetid == n.id) {
            chain.push(n.id);
            return true;
        }
        if (n.children) {
            for (child in n.children) {
                if (recgen(targetid, n.children[child], chain)) {
                    chain.push(n.id);
                    return true; 
                }
            }
        }
    }
    recgen(id,this.root,chain);
    return chain.reverse().join('.');
}

Tree.prototype.checkaddress = function(addr) {
    var heritage = addr.split('.'),
        cnode = this.root;
    
    if (!heritage.length || cnode.id != heritage[0]) return false;

    for (var i = 1; i < heritage.length; i = i + 1) {
        if (!(cnode = cnode.find(heritage[i]))) {
            return false;
        }
    }
    return true;
}
/*
Tree.prototype.lookup(addr) {
    var ids = addr.split('.'),
        currentnode = this.root;
    for (var i = 0; i < ids.length; i = i+1) {
        for (var j = 0; j < currentnode.children.length; j = j+1) {
            if (currentnode.children[j].id == ids[i]) {
                currentnode = currentnode.children[j];
                break;
            }
        }
    }   
}
*/
Tree.prototype.splice = function(sourcetree, id) {
    var ids = sourcetree.address(id),
        source = new TreeIterator(sourcetree),
        self = new TreeIterator(this);
    
    ids = ids.split('.');
     
    for (var i = 1; i  < ids.length; i = i+1) {
        source.go(ids[i]);
        if (self.node._indexOf(source.node.id) < 0) {
            var added = self.node.add(source.node);
            for (child in source.node.children) {
                if (source.node.children[child].selected) {
                    added.add(source.node.children[child]);
                } 
            }
        }
        self.go(ids[i]); 
    }
}

Tree.prototype.prune = function(addr) {
    var ids = addr.split('.'),
        it = new TreeIterator(this);
    for (var i = 1; i < ids.length; i = i + 1) {
        if (i == ids.length -1) {
            it.node.remove(ids[i]);
        }
        it.go(ids[i]);
    }
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
