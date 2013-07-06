
function MainMenuCtrl($scope, $http) {
        $http.get('data/mainmenu.json').success(function(data) {
            console.log(data);
            $scope.MenuEntries = data;
            console.log(data);
        });
    
    $scope.nav = function(key) {
        $http.get('data/'+key+'.json').success(function(data) {
            $scope.MenuEntries = data;
        });
    } 
}
