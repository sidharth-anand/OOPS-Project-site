(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardStock", cardStock);
    cardStock.$inject = ["$rootScope", "$compile"];

    function cardStock($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-stock.html',
            controller: "cardStockController",
            controllerAs: "cardStockController",
            replace: true,
        }
    }

})();