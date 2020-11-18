(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardText", cardText);
    cardText.$inject = ["$rootScope", "$compile"];

    function cardText($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                data: "=",
                groupInfo: "=group"
            },
            templateUrl: 'app/modules/client/cards/normal/card-text.html',
            controller: "cardTextController",
            controllerAs: "cardTextController",
            replace: true,
        }
    }

})();