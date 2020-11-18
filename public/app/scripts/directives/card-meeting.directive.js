(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardMeeting", cardMeeting);
    cardMeeting.$inject = ["$rootScope", "$compile"];

    function cardMeeting($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-meeting.html',
            controller: "cardMeetingController",
            controllerAs: "cardMeetingController",
            replace: true,
        }
    }

})();