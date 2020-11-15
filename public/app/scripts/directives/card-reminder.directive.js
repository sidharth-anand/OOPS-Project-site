(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardReminder", cardReminder);
    cardReminder.$inject = ["$rootScope", "$compile"];

    function cardReminder($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-reminder.html',
            controller: "cardReminderController",
            controllerAs: "cardReminderController",
            replace: true,
        }
    }

})();