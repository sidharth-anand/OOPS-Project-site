(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardToDoList", cardToDoList);
    cardToDoList.$inject = ["$rootScope", "$compile"];

    function cardToDoList($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-to-do-list.html',
            controller: "cardToDoListController",
            controllerAs: "cardToDoListController",
            replace: true,
        }
    }

})();