(function() {
    'use strict';

    let App = angular.module("app");

    App.service("cardService", cardService);
    cardService.$inject = ["baseAPIService"];

    function cardService(baseAPIService) {
        return {
            getStock: function(){
                return baseAPIService.call('GET','/stock', {})
            }
        }
    }

})();