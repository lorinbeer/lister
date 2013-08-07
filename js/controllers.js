function SelectionCtrl($scope, $http) {
    $scope.load = function() {
         
    }

}


function MainMenuCtrl($scope, $http) {
    $http.get('data/mainmenu.json').success(function(data) {
        console.log(data);
        $scope.MenuEntries = data;
        console.log(data);
    });
   
    
 
    $scope.nav = function(entry) {
        if (entry.method="nav" || !entry.method) {
            $http.get('data/'+entry.uri+'.json').success(function(data) {
                data["ret"] = { "name" : "Back" };
                $scope.MenuEntries = data;
            });
        } else if (entry.method="pull") {
            $http.get('data/'+entry.uri+'.json').succuss(function(data) {                 
                data["ret"] = { "name" : "Done", "uri" : "" };
                $scope.MenuEntries = data;
            });
        }
    } 
}
