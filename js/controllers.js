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

function SelectionCtrl($scope, $http, $location, ListerDataService) {
    var entry = ListerDataService.peak();
    console.log(entry);
    var _data;
    var selection = {};
    selection.options = [];
    $http.get('data/'+entry.uri+'.json').success(function(data) {
        $scope.spec = data;
        $scope.options = data.options;
        $scope.cost = data.cost;
        _data = data;
    }); 

    $scope.select = function(select) {
        if (select.cost && !present(selection, select) ) {
            selection.options.push(select);
            $scope.cost = JSON.parse($scope.cost) + JSON.parse(select.cost);
        } else {
           remove(selection,select);
           $scope.cost = JSON.parse($scope.cost) - JSON.parse(select.cost);
        }        
    }

    $scope.add = function() {
        ListerDataService.add(selection);
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
        } else if (entry.action=="pull") {
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
    if (entry) {
        $http.get('data/'+entry.uri+'.json').success(function(data) {
            console.log(data);
            ListerDataService._list.merge(data);
            $scope.ListEntries = data;
        });
    }

    $scope.nav = function(entry) {
        // List Navigation descends until it hits a 'select' page
        console.log(entry);
        if (entry.action=="nav" || !entry.action) {
            $http.get('data/'+entry.uri+'.json').success(function(data) {
                $scope.ListEntries = data;
                ListerDataService.push(entry); 
           });
        } else if (entry.action == "select") {
            console.log(entry);
            ListerDataService.push(entry);
            window.location.href = "#/selection/";
        }
    }
}
