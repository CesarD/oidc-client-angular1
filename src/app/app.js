angular
    .module('webApp', ['ngRoute', 'angular-storage', 'ngSanitize', 'ng.oidcclient']);

angular
    .module('webApp')
    .controller('appController', ['$rootScope', '$scope', '$route', '$location', 'ngOidcClient', appController]);

angular
	.module('webApp')
	.config(['$httpProvider', function ($httpProvider) {
	    //initialize get if not there
	    if (!$httpProvider.defaults.headers.get) {
	        $httpProvider.defaults.headers.get = {};
	    }
	    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
	}])
    .config(['ngOidcClientProvider', function (ngOidcClientProvider) {
        ngOidcClientProvider.setSettings({
            authority: "https://localhost:44355",
            client_id: "angular",
            redirect_uri: "http://localhost:8723/redirect.html",
            silent_redirect_uri: "http://localhost:8723/silent-renew.html",
            post_logout_redirect_uri: "http://localhost:8723/logoutRedirect.html",

            response_type: "id_token token",
            scope: "openid profile roles api",

            automaticSilentRenew: true,

            filterProtocolClaims: true,
            //userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
        });
    }]);

function appController($rootScope, $scope, $route, $location, ngOidcClient) {
    var vm = this;
	
    ngOidcClient.manager.getUser().then(function(user) {
        vm.user = user;
    });

    vm.logout = function () {
        ngOidcClient.manager.signoutRedirect();
    };

}

