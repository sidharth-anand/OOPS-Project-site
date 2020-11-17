(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardRefill", cardRefill);
    cardRefill.$inject = ["$rootScope", "$compile"];

    function cardRefill($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-refill.html',
            controller: "cardRefillController",
            controllerAs: "cardRefillController",
            replace: true,
        }
    }

})();