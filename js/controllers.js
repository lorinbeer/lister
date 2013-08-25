function SelectionCtrl($scope, $http, $location, ListerDataService) {
    var entry = ListerDataService.peak(),
        _data,
        _list = new List(entry);
 
    $http.get('data/'+entry.uri+'.json').success(function(data) {
        $scope.spec = data;
        $scope.options = data.options;
        $scope.cost = data.cost;
        _data = data;
        _list.type = data.type;
    }); 

    $scope.select = function(select) {
        if(_list.add(select)) {
            $scope.cost = JSON.parse($scope.cost) + JSON.parse(select.cost);
        } else if( _list.find(select) ) {
            _list.remove(select);
            $scope.cost = JSON.parse($scope.cost) - JSON.parse(select.cost);
        }
    }

    $scope.add = function() {
        ListerDataService.add(_list);
        ListerDataService.popToLast('create');
        window.location.href = "#/list";
    }
}

/**
 *
 */
function MenuCtrl($scope, $http, ListerDataService) {
    var entry = ListerDataService.peak();
    if (entry) {
        $http.get('data/'+entry.uri+'.json').success(function(data) {
            $scope.MenuEntries = data;
        });
    } else {
        $http.get('data/mainmenu.json').
            success(function(data) {
                $scope.MenuEntries = data;
            }).
            error(function(data, status, headers, config) {
            });
    }
 
    $scope.nav = function(entry) {
        $http.get('data/'+entry.uri+'.json').success(function(data) {
                if (data.type=="nav" || !data.type) {
                    data["ret"] = { "name" : "Back" };
                    ListerDataService.push(entry);
                    $scope.MenuEntries = data;
                } else if (data.type=="select") {
                    ListerDataService.push(entry);
                    window.location.href = "#/selection/";
                }
            });

        if (entry.action=="nav" || !entry.action) {
            $http.get('data/'+entry.uri+'.json').success(function(data) {
                data["ret"] = { "name" : "Back" };
                $scope.MenuEntries = data;
            });
        } else if (entry.action=="select") {
            ListerDataService.push(entry);
            window.location.href = "#/selection/";
        } else if (entry.action=="create") {
            window.location.href = "#/list"; 
        }
    } 
}

/**
 *
 */
function ListCtrl($scope, $http, ListerDataService) {
    var entry = ListerDataService.peak();
    $scope.list = ListerDataService._list;
    $scope.tree = ListerDataService._tree;

    if (entry) {
        $http.get('data/'+entry.uri+'.json').success(function(data) {
            // add the key to each element as the id
            for (e in data) {
                data[e].id = e;
            }
            // parse into a tree
            ListerDataService._tree._root.fromObj(data);
            $scope.tree = ListerDataService._tree;
        });
    }

    $scope.nav = function(entry) {
        // List Navigation descends until it hits a 'select' page
        if (entry._data.action=="nav" || !entry._data.action) {
            $http.get('data/'+entry._data.uri+'.json').success(function(data) {
                $scope.List = data;
                ListerDataService.push(entry._data);
                window.location.href = "#/mainmenu"; 
           });
        } else if (entry.action == "select") {
            ListerDataService.push(entry);
            window.location.href = "#/selection/";
        }
    }

    $scope.widget = function(type) {
        var i = ListerDataService._list.find(type);
        console.log(i);;
    }
}
