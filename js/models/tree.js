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
