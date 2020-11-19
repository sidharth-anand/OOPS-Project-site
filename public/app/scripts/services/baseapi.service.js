(function(){
    'use strict';

    let App = angular.module("app");

    App.service("baseAPIService", baseAPIService);
    baseAPIService.$inject = ["$http", "$rootScope"];

    function baseAPIService($http, $rootScope) {
        return {
            call: function(method, url, params) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.Auth.getAuthToken();
            
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