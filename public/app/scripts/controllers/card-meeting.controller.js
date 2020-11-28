(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardMeetingController", cardMeetingController);
    cardMeetingController.$inject = ["$scope", "cardService"];

    function cardMeetingController($scope, cardService) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-meeting.expanded.html",
            onChange: (newData) => {

                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                
                });
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: "User has decided to share meeting on "+ ctrl.data.meeting.date +" at "+ctrl.data.meeting.time+
                    ".\n The url for the meeting is " + ctrl.data.meeting.link +".\n Additional details: "+ ctrl.data.meeting.documents
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();