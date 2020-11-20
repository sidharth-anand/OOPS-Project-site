(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardMeetingExpandedController", cardMeetingExpandedController);
    cardMeetingExpandedController.$inject = ["$scope"];

    function cardMeetingExpandedController($scope) {
        let ctrl = this;

        ctrl.meeting = $scope.cardExpandedController.data.meeting;

        ctrl.datePopup = {
            addDate: false
        }

        ctrl.toggleDatePopup = function(popup) {
            ctrl.datePopup[popup] = !ctrl.datePopup[popup];
        }
    }

})();