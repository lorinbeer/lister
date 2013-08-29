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


function present(selection, option) {
    for (var i = 0; i < selection.options.length; i = i+1) {
        if (selection.options[i].name == option.name) {
            return true;
        }
    }
    return false;
}


function remove(selection, option) {
    for (var i = 0; i < selection.options.length; i = i+1) {
        if (selection.options[i].name == option.name) {
            selection.options.splice(i, 1);
        }
    }
}
