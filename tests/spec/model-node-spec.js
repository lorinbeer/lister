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

    it("should have an _indexOf function", function () {
        expect(node._indexOf).toBeDefined();
    });

    it("should return index of child by id", function () {
        var index = 5,
            target = node._children[index];
        expect(node._indexOf(target._id)).toEqual(index);
    });

    it("should return it's length", function () {
        expect(node.length).toBeDefined();
        expect(node.length()).toEqual(node._children.length);
    });

    it("should have an add function", function () {
        expect(node.add).toBeDefined();
    });

    it("should add a child", function () {
        var child = {'id' : 'newchild', 'data' : 'foobar'};
        node.add(child);
        expect(node._children[node._children.length-1]._id).toEqual(child.id);
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
});
