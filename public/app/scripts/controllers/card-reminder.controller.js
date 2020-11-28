(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardReminderController", cardReminderController);
    cardReminderController.$inject = ["$scope"];

    function cardReminderController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-reminder.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
            },
            getShareData: () => {
                let reminderDetails = "";
                ctrl.data.reminderList.forEach(function(x){
                    reminderDetails.concat("Date - " + x.date + " Time - " + x.time +"\n");
                })
                return {
                    title: ctrl.data.name,
                    text: "User has shared these reminder details with you: \n" + reminderDetails
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();