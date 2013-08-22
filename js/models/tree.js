var Node = function (id, data, children) {
    this._id = id;
    this._data = data;
    this._children = [];
    if (typeof children == 'array') {
        for (var i in children) {
            this._children.push(children[i]); 
        }
    }
}

Node.prototype.length = function () {
    return this._children.length;
}

// add wraps passed in data inside a Node object
Node.prototype.add = function (childdata) {
    if (childdata.unique == 'true' || childdata.unique == undefined) {
        if (this._indexOf(childdata.id) >= 0) {
            return false;
        }
        this._children.push(new Node(childdata.id, childdata));
    }
    return true;
}

// searches only searches this node and not this nodes n-children
Node.prototype._indexOf = function (id) {
    for (i in this._children) {
        if (id == this._children[i].id) {
            return i;
        }
    }
}
