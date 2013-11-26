describe("Tree", function() {
        var tree,
        n = 20,
        fb;

    beforeEach(function() {
        node = new Node('fib_root', null);
        tree = new Tree(node);
        fb = [0,1];
        for (var i = 0; i < n; i = i + 1) {
            fb.push(fb[fb.length-1] + fb[fb.length-2]);
            var child = new Node('child' + i, fb[fb.length-1]);
            child.parent = node;
            node.children.push(child);
        }
    });

    it("constructor should create new tree with root node", function () {
        var t = new Tree();
        expect(t.root).toBeDefined();
    });
    
    it("constructor should create new tree with passed node as root", function () {
        expect(tree.root.id).toEqual('fib_root');
    });

    it("should have an address function", function () {
        expect(tree.address).toBeDefined();
    });

    it("should return the address of a node when called", function () {
        var node = tree.root.children[0];
        expect(tree.address(node)).toEqual('fib_root.child0');    
    });

    it("should have a check address function", function () {
        expect(tree.checkaddress).toBeDefined();
    });

    it("should return true for an existing address", function () {
        expect(tree.checkaddress('fib_root.child0')).toEqual(true);
    });

    it("should return false for a nonexisting address", function () {
      expect(tree.checkaddress('foo.bar')).toEqual(false);  
    });

    it("should have a _bft breadth first traversal function", function () {
        expect(tree._bft).toBeDefined();
    });

    it("should visit each node with _bft", function () {
        var children = [],
            cb = function(child) {
            children.push(child);
        }
        tree._bft(cb);
    });

    it("should add a node as a child of some descendant of root with addChild()", function () {
        var child = new Node("badass", {"funky":"dory", "happy":"ohsohappy"});
            target = tree.root.children[4]; // target the 5th child arbitrarily
        tree.addChild(target.id, child);
        expect(target.children[0].id).toEqual(child.id);
    });

});
