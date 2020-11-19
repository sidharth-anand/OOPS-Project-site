(function() {
    'use strict';

    let App = angular.module("app");

    App.service("cardGroupService", cardGroupService);
    cardGroupService.$inject = ["baseAPIService"];

    function cardGroupService(baseAPIService) {
        return {
            getAllGroups: function() {
                return baseAPIService.call('GET', '/cards/all', {});
            }
        }
    }

})();