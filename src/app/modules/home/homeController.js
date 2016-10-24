angular
    .module('webApp')
    .controller('homeController', ['ngOidcClient', '$http', homeController]);

function homeController(ngOidcClient, $http) {
    var vm = this;

    ngOidcClient.manager.getUser()
        .then(function(user) {
            vm.user = user;
        });

    vm.logIn = function () {
        ngOidcClient.manager.signinRedirect();
    }

    vm.saludar = function() {
        $http.get('api/demo/' + vm.nombre,
            {
                headers: {
                    'authorization': 'Bearer ' + vm.user.access_token
                }
            })
            .then(function(response) {
                vm.saludo = response.data;
            });
    }
}