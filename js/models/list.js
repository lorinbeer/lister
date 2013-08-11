List = function () {
    this._name = "";
    this._options = [];
}

List.prototype.length = function () {
    return this._options.length;
}

List.prototype.add = function (option) {
    if (option.unique == 'true' || option.unique == undefined) {
        if (this._options.indexOf(option) > 0) {
            return;
        }
    }
    this._options.push(option);
}

List.prototype.remove = function () {

}

List.prototype.find = function (option) {
    
}

List.prototype.merge = function (data) {
    for (each in data) {
        this.add (each);
    }
}

List.prototype.foreach = function (func) {
    for (i in this._options) {
        console.log(i);
    }
}

List.prototype._indexOf = function (option) {
    for (i in this._options) {
        if (option === this._options[i]) {
            return i;
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
