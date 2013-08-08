function selectionCtrl($scope, $http, ListerDataService) {
    var entry = ListerDataService.pop();
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
        selection.options.push(select);
        if (select.cost) {
            $scope.cost = JSON.parse($scope.cost) + JSON.parse(select.cost);
        }
    }
}

function MainMenuCtrl($scope, $http, ListerDataService) {
    $http.get('data/mainmenu.json').success(function(data) {
        $scope.MenuEntries = data;
    });
 
    $scope.nav = function(entry) {
        $http.get('data/'+entry.uri+'.json').success(function(data) {
                if (data.type=="nav" || !data.type) {
                    data["ret"] = { "name" : "Back" };
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
            console.log(entry);
            ListerDataService.push(entry);
            window.location.href = "#/selection/";
        }
    } 
}
