describe("Tree", function() {
    var tree,
        n = 20,
        fb;
    beforeEach(function() {
        node = new Node('fib_root', null);
        fb = [0,1];
        for (var i = 0; i < n; i = i + 1) {
            fb.push(fb[fb.length-1] + fb[fb.length-2]);
            node._children.push(new Node('child' + i, fb[fb.length-1]));
        }
        tree = new Tree(node);
    });

    it("constructor should create new tree with root node", function () {
        var t = new Tree();
        expect(t._root).toBeDefined();
    });
    
    it("constructor should create new tree with passed node as root", function () {
        expect(tree._root._id).toEqual('fib_root');
    });
});
