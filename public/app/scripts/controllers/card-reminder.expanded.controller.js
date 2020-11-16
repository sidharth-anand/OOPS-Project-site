(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardReminderExpandedController", cardReminderExpandedController);
    cardReminderExpandedController.$inject = ["$scope"];

    function cardReminderExpandedController($scope) {
        let ctrl = this;

        ctrl.reminderList = $scope.cardExpandedController.data.reminderList;
        ctrl.date = "";
        ctrl.time = "";

        ctrl.addReminder = function(){
            ctrl.reminderList.push({date: ctrl.date, time: ctrl.time});
            ctrl.date = "";
            ctrl.time = "";
        }
    }

})();