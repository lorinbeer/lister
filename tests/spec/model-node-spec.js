describe("Node", function() {
    var node,
        n = 20,
        fb;
    beforeEach(function() {
        node = new Node('root', null);
        fb = [0,1];
        for (var i = 0; i < n; i = i + 1) {
            fb.push(fb[fb.length-1] + fb[fb.length-2]);
            node._children.push(new Node('child' + i, fb[fb.length-1]));
        }
    });

    it("should result in node with " + n + " children after setup", function () {
        expect(node._children).toBeDefined();
        expect(node._children.length).toEqual(n);
    });

    // 'private' functions

    it("should have an _indexOf function", function () {
        expect(node._indexOf).toBeDefined();
    });

    it("should exist and return index of child by id passed to _indexOf", function () {
        var index = 5,
            target = node._children[index];
        expect(node._indexOf(target._id)).toEqual(index);
    });

    it("should have a _forEachChild function", function() {
        expect(node._forEachChild).toBeDefined();
    });

    it("should execute callback passed to _forEachChild function on each child", function () {
        var i = 0;
            cb = function() {i=i+1;};
        node._forEachChild(cb);
        expect(i).toEqual(n);
    });

    it("forEachChild should pass Node, Child, Index to callback", function () {
        var index = 0;
            cb = function(n, c, i) { expect(n).toEqual(node); expect(c).toEqual(node._children[index]); expect(index).toEqual(i); index = index + 1; };
            node._forEachChild(cb);
    });

    // 

    it("should return it's length", function () {
        expect(node.length).toBeDefined();
        expect(node.length()).toEqual(node._children.length);
    });

    it("should find a node by id present as a child ", function () {
        var index = 4,
            id  = node._children[index];
        expect(node.find(id)).toEqual(node._children[index].id);
    });

    it("should fail to find a nonexistant node by id", function () {
        expect(node.find("foobar")).toBe(undefined);
    });

    it("should have an add function", function () {
        expect(node.add).toBeDefined();
    });

    it("should add a child from childdata", function () {
        var child = {'id' : 'newchild', 'data' : 'foobar'};
        node.add(child);
        expect(node.length()).toEqual(n+1);
        expect(node._children[node._children.length-1]._id).toEqual(child.id);
    });

    it("should add a node as a child", function () {
        var nodechild = new Node('foobar', {'foo':'bar'});
        node.add(nodechild);
        expect(node.length()).toEqual(n+1);
        expect(node._children[node._children.length-1]._id).toEqual(nodechild._id);
    });
 
    it("should increment length on add", function () {
        var count = node.length();
        node.add({'id' : 'newchild', 'data' : '100'});
        expect(node.length()).toEqual(count+1);
    });

    it("should return false and not add an element with a duplicate id", function () {
        var child = {'id' : node._children[0]._id, 'data' : 'foobar'};
        expect(node.add(child)).toBe(false);
        expect(node.length()).toEqual(n);
    });

    it("should return false and not add an element with a duplicate id when unique is specified to be true", function () {
        var child = {'id' : node._children[0]._id, 'data' : 'foobar', 'unique' : 'true'};
        expect(node.add(child)).toBe(false);
        expect(node.length()).toEqual(n);
    });

    it("should return true and add an element with a duplicate id when unique is specified to be false", function () {
        var child = {'id' : node._children[0]._id, 'data' : 'foobar', 'unique' : 'false'};
        expect(node.add(child)).toBe(true);
        expect(node.length()).toEqual(n+1);
    });

    it("should have a remove function", function () {
        expect(node.remove).toBeDefined();
    });

    it("should remove specified child", function () {
        var index = 5,
            target = node._children[index]._id;
        node.remove(target);
        expect(node.length()).toEqual(n-1);
        expect(node._children[index]).not.toBe(target);
    });

    it("should have a clear function", function () {
        expect(node.clear).toBeDefined();
    });

    it("should have delete all children with call to clear", function () {
        node.clear();
        expect(node.length()).toEqual(0);
        expect(node._children).toEqual([]);
    });

    it("should have a toJSON function", function () {
        expect(node.toJSON).toBeDefined;
    });

    it("should have a fromObj function", function () {
        expect(node.fromObj).toBeDefined;
    });

    it("should load from a javascript object", function() {
        var obj = {};
        for (var i = 0; i < 10; i++) {
                obj['test-child'+i] = {'id' : 'test-child'+i, 'data' : 'my data is unique to child'+i}
        }
        node.fromObj(obj);
        expect(node.length()).toEqual(n+10);
    });

});
