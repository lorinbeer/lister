
Lister.directive("lsListView", function () {
    return {
        // restricts to use as an attribute
        restrict : 'A', 
        scope : '=',
        template : '<div id="listview" class="entry" ng-repeat="child in tree._root._children">' +
                     '<span class="label" ng-click="nav(child)">{{child._id}}</span>' +
                     '<div id="{{child._id+\'_exp\'}}" ng-click="widget(\'expand\',child)" class="widget exp"></div>' +
                   '</div>',
        link : function (scope, elem, attr) {
            console.log("lsListView directive 'link' function");
            console.log(scope, elem, attr);


            scope.$watch('expand', function (oldval, newval) {

            });
        },
        // specifies that we expect an object form the directive

        //
    }
});
