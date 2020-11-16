(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardGroup", cardGroup);
    cardGroup.$inject = ["$rootScope", "$compile"];

    function cardGroup($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                groupData: "=data"
            },
            templateUrl: 'app/modules/client/cards/card-group.html',
            controller: "cardGroupController",
            controllerAs: "cardGroupController",
            replace:true
        }
    }
})();