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

function Node(id, data, children) {
    this._type = 'node';
    this.id = id;
    this.data = data;
    this.children = [];
    if (typeof children == 'array') {
        for (var i in children) {
            this.children.push(children[i]); 
        }
    }
}

// returns length of children array
Node.prototype.length = function () {
    return this.children.length;
}

Node.prototype.clear = function () {
    this.children = [];
}

// returns first node with id
Node.prototype.find = function (id) {
    var i = this._indexOf(id);
    if (i >= 0) {
        return this.children[i];
    }
}

// add - wraps passed in data inside a Node object and adds it as a child
Node.prototype.add = function (childdata) {

    console.log("blahblahblah", childdata);

    var childId,
        isNode = false;
    if (childdata._type == this._type) {
        childId = childdata.id;
        isNode = true;
    } else {
        childId = childdata.id ? childdata.id : childdata.name;
    }

    if (childdata.unique == 'true' || childdata.unique == undefined) {
        if (this._indexOf(childId) >= 0) {
            return false;
        }
    }
    var nnode;
    if (isNode) {
        nnode = new Node(childdata.id, JSON.parse(JSON.stringify(childdata.data)));
        /*todo*/
        nnode.cost = childdata.cost;
        this.children.push(nnode);
    } else {
        nnode = new Node(childId, childdata);  
        this.children.push(nnode);
    }
    return nnode;
}

// removes all instances of the id
Node.prototype.remove = function (id) {
    this._forEachChild(function (node, child, i) {
        if(id == child.id) {
            node.children.splice(i,1);
        }
    });
}

// remove all children
Node.prototype.clear = function() {
    this.children = [];
}
//
Node.prototype.fromJSON = function(jsonstr) {
    
}

// parses a javascript object
Node.prototype.fromObj = function(data) {
    for(var i in data) {
        this.add(data[i]);
    }
}

// toJSON implemented to control data representation
Node.prototype.toJSON = function() {
    var jsondata = {'id' : this.id,
                    'data' : this._data,
                    'children' : []
    };
    this._forEachChild(function(n,c,i) {
        jsondata['children'].push(c.toJSON());
    });     
    return JSON.stringify(jsondata); 
}

Node.prototype.foreachchild = function (cb) {
    for (var i = 0; i < this.children.length; i = i + 1) {
        cb(this, this.children[i], i);
    }
}

// pass callback function Node,Child,Index
Node.prototype._forEachChild = function (cb) {
    for (var i = 0; i < this.children.length; i = i + 1) {
        cb(this, this.children[i], i);
    }
}

// searches only searches this node and not this nodes n-children
Node.prototype._indexOf = function (id) {
    var index = -1;
    // using for each turns this into an O(n) time alg in all cases
    this._forEachChild(function (node, child, i) {
        if (id == child.id) {
            index = i;
        }
    });
    return index;
}
