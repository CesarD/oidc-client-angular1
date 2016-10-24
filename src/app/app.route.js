angular.module('webApp')
    .config(['$routeProvider', ConfigRouteProvider]);

function ConfigRouteProvider($routeProvider) {
    var modules = 'app/modules/';
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider
    .when('/', {
        templateUrl: modules + 'home/home.html',
        controller: 'homeController',
        controllerAs: 'homeCtrl',
        titulo: 'Home page',
        access: {}
    })

    .otherwise({ redirectTo: '/' });

    //Usar HTML5 History API
    //$locationProvider.html5Mode(true);
}