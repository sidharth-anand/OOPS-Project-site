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
            ctrl.reminderList.push({date: ctrl.date, time: ctrl.time, remove:false});
            ctrl.date = "";
            ctrl.time = "";
        }

        ctrl.removeReminder = function(reminder){
            let oldList = ctrl.reminderList;
            reminder.remove = true;
            ctrl.reminderList = [];
            angular.forEach(oldList,function(x){
                if (!x.remove){
                    ctrl.reminderList.push(x)
                }
            })
        };

        ctrl.removeAll = function() {
            ctrl.reminderList = [];
        };

        ctrl.showRemoveAll = Boolean(ctrl.reminderList.length)
    }

})();