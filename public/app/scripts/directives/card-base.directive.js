(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardBase", cardBase);
    cardBase.$inject = ["$rootScope", "$compile"];

    function cardBase($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                cardOptions: "=options",
                cardData: "=data",
                groupData: "=group"
            },
            templateUrl: "app/modules/client/cards/normal/card-base.html",
            controller: "cardBaseController",
            controllerAs: "cardBaseController",
            replace: true
        }
    }

})();