angular.module('lister', []).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/mainmenu', {templateUrl: 'partials/menu.html', controller: MainMenuCtrl}).
            otherwise({redirectTo: '/mainmenu'});
    }]);
