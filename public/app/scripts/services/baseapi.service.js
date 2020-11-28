(function(){
    'use strict';

    let App = angular.module("app");

    App.service("baseAPIService", baseAPIService);
    baseAPIService.$inject = ["$http", "$rootScope"];

    function baseAPIService($http, $rootScope) {
        const serverPath = "http://localhost:5000";
        return {
            call: function(method, url, params) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.Auth.getAccessToken();
                $http.defaults.headers.common['Content-type'] = 'application/json';
            
                return $http({
                    method: method,
                    url: serverPath + url,
                    params: method == 'GET' ? params : {},
                    data: method != 'GET' ? params : {},
                });
            }
        }
    }

})();