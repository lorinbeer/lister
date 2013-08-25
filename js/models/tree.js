var Tree = function(root) {
    this._root = root ? root : new Node('root');
}

//adds 'node' as a child to tree-node with target id
Tree.prototype.addChild = function(targetid, node) {
    
}

// breadth first traversal
Tree.prototype._bft = function(callback) {
    var queue = [];
    console.log(this);
    // add root node's children
    queue = queue.concat(this._root._children);
    while (queue.length > 0) {
        // always target first node in queue, add its children
        queue = queue.concat(queue[0]._children);
    }
    
}
