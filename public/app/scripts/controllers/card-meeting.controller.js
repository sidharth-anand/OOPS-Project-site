(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardMeetingController", cardMeetingController);
    cardMeetingController.$inject = ["$scope"];

    function cardMeetingController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-meeting.expanded.html",
            onChange: (newData) => {

                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                
                });
                cardService.editCardById(ctrl.data.id,ctrl.data)
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: ctrl.data.text
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();