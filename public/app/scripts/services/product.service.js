(function() {
    'use strict';

    let App = angular.module("app");

    App.service("productService", productService);
    productService.$inject = ["baseAPIService"];

    function productService(baseAPIService) {
        return {
            getStock: function(){
                return baseAPIService.call('GET','/stock', {});
            },
            checkRefill: function(){
                return baseAPIService.call('POST','/refill',{});
            }
        }
    }

})();