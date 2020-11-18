(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardMeetingExpandedController", cardMeetingExpandedController);
    cardMeetingExpandedController.$inject = ["$scope"];

    function cardMeetingExpandedController($scope) {
        let ctrl = this;

        ctrl.meeting = $scope.cardExpandedController.data.meeting;

        ctrl.date = "";
        ctrl.time = "";
        ctrl.document = "";

        ctrl.addMeeting = function() {
            ctrl.meeting.date = ctrl.date;
            ctrl.meeting.time = ctrl.time;
            ctrl.meeting.document = ctrl.document;
            ctrl.date = "";
            ctrl.time = "";
            ctrl.document = "";
        }
    }

})();