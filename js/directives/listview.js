
Lister.directive("lsListView", function () {
    return {
        // restricts to use as an attribute
        restrict : 'A', 
        scope : '=',
        replace : false,
        template : '<div class="list" ng-repeat="child in tree._root._children">' +
                     '<div class="spacer"></div>' +
                     // the entry button
                     '<span class="label" ng-click="nav(child)">{{child._id}}</span>' +
                    // the entry widget(s)
                     '<div id="{{child._id+\'_exp\'}}" ng-click="widget(\'expand\',child)" class="widget exp"></div>' +
                    // subentry
                        '<div id="{{child._id+\'_sublist\'}}" ng-repeat="descendant in child._children">' +
                        '{{descendant._id}}' +
                     '</div>' +
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
