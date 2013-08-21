describe("List", function() {
    var list,
        n = 20,
        fb; 
    beforeEach(function() {
        list = new List();
        fb = [0,1];
        for (var i = 0; i < n; i = i + 1) {
            fb.push(fb[fb.length-1] + fb[fb.length-2]);
            list._options.push({'name':'selection '+i,'cost' : fb[fb.length-1]});
        }
    });

    it("setup should result in list which contains " + n + " items", function () {
        expect(list.length).toBeDefined();
        expect(list._options.length).toEqual(n);
    });

    it("should return it's length", function () {
        expect(list.length()).toEqual(list._options.length);
    });

    it("should have an add symbol", function () {
        expect(list.add).toBeDefined();
    });

    it("should add an option", function () {
        var option = {'name':'selection'+n+1, 'cost' : fb[fb.length-1] + fb[fb.length-2]},
            length = list._options.length; 
        list.add(option);
        expect(list.length()).toEqual(length + 1);
        expect(list._options).toContain(option);
    });

    it("should not add an option twice by default", function () {
        var option = {'name':'newselection', 'cost' : 20},
            length = list.length();
        list.add(option);
        list.add(option);
        expect(list.length()).toEqual(length + 1);
    });

    it("should not add an option twice marked as unique", function () {
        var option = {'name':'newselection', 'cost' : 20, 'unique' : 'true'},
            length = list.length();
        list.add(option);
        list.add(option);
        expect(list.length()).toEqual(length + 1);
    });

    it("should add an option twice marked as not unique", function () {
        var option = {'name':'newselection', 'cost' : 20, 'unique' : 'false'},
            length = list.length();
        list.add(option);
        list.add(option);
        expect(list.length()).toEqual(length + 2);
    }); 
 
});
