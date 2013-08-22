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
        $http.get('data/mainmenu.json').success(function(data) {
            $scope.MenuEntries = data;
        });
    }
 
    $scope.nav = function(entry) {
        console.log("wutwut", entry);
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
    console.log(ListerDataService._list);
    $scope.list = ListerDataService._list;

    if (entry) {
        $http.get('data/'+entry.uri+'.json').success(function(data) {
            for (e in data) {
                data[e]._id = e;
                ListerDataService._list.add(new List({"id":e, "name":data[e].name, "uri":data[e].uri}));
            }
            $scope.list = ListerDataService._list;
        });
    }

    $scope.nav = function(entry) {
        console.log(entry);
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
        console.log(type);
        var i = ListerDataService._list.find(type);
        console.log(ListerDataService._list._options[i]);
    }
}
