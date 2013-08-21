Node = function (id, data, children) {
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


/**
 * add wraps passed in data inside a Node object
 */
Node.prototype.add = function (child) {
    if (childdata.unique == 'true' || childdata.unique == undefined) {
        if (this._indexOf(child.id) >= 0) {
            return false;
        }
        this._children.push(new Node(child.id, child));
    return true;
}



List = function (data) {
    if (data) {
        this._id = data.id;
        this._data = data;
    }
    this._options = [];
}

List.prototype.length = function () {
    return this._options.length;
}

List.prototype.add = function (option) {
    

    if (option.unique == 'true' || option.unique == undefined) {
        if (this._indexOf(option) >= 0) {
            return false;
        }
    }
    this._options.push(option);
    return true;
}

List.prototype.remove = function obj(option) {
    for (var i = 0; i < this._options.length; i = i+1) {
        if (this._options[i].name == option.name) {
            this._options.splice(i, 1);
        }
    }
}

List.prototype.find = function (option) {
    for (var i = 0; i < this._options.length; i = i+1) {
        if (this._options[i] == option) {
            return true;
        } else if (this._options[i]._id == option) {
            return i;
        }
        
    } 
}

List.prototype.merge = function (data, AsSubLists) {
    for (each in data) {
        if (AsSubLists) {
            this.add (new List(each));
        } else {
            this.add (each);
        }
    }
}

List.prototype.foreach = function (func) {
    for (i in this._options) {
        console.log(i);
    }
}


/**
 * returns json representation of the tree
 */
List.prototype.toJSON = function () {
    
}

List.prototype._indexOf = function (option) {
    for (i in this._options) {
        if (typeof option == 'object') {
            if (option._id == this._options[i]._id && option._id) {
                return i;
            } else if (option == this._options[i]) {
                return i;    
            }
        } else {
            if (option == this._options[i]._id) {
                return i;
            }
        }
    }
}
