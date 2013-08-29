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

var Node = function (id, data, children) {
    this._type = 'node';
    this._id = id;
    this._data = data;
    this._children = [];
    if (typeof children == 'array') {
        for (var i in children) {
            this._children.push(children[i]); 
        }
    }
}

// returns length of children array
Node.prototype.length = function () {
    return this._children.length;
}

// add wraps passed in data inside a Node object
Node.prototype.add = function (childdata) {
    var childId,
        isNode = false;
    if (childdata._type == this._type) {
        childId = childdata._id;
        isNode = true;
    } else {
        childId = childdata.id ? childdata.id : childdata.name;
    }

    if (childdata.unique == 'true' || childdata.unique == undefined) {
        if (this._indexOf(childId) >= 0) {
            return false;
        }
    }
    if (isNode) {
        this._children.push(childdata);
    } else {    
        this._children.push(new Node(childId, childdata));
    }
    return true;
}

// removes all instances of the id
Node.prototype.remove = function (id) {
    this._forEachChild(function (node, child, i) {
        if(id == child._id) {
            node._children.splice(i,1);
        }
    });
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
    var jsondata = {'id' : this._id,
                    'data' : this._data,
                    'children' : []
    };
    this._forEachChild(function(n,c,i) {
        jsondata['children'].push(c.toJSON());
    });     
    return JSON.stringify(jsondata); 
}

// pass callback function Node,Child,Index
Node.prototype._forEachChild = function (cb) {
    for (var i = 0; i < this._children.length; i = i + 1) {
        cb(this, this._children[i], i);
    }
}

// searches only searches this node and not this nodes n-children
Node.prototype._indexOf = function (id) {
    var index = -1;
    // using for each turns this into an O(n) time alg in all cases
    this._forEachChild(function (node, child, i) {
        if (id == child._id) {
            index = i
        }
    });
    return index;
}




