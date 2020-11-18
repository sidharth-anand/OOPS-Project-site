(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardMeetingController", cardMeetingController);
    cardMeetingController.$inject = [];

    function cardMeetingController() {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-meeting.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: ctrl.data.text
                }
            }
        }

        ctrl.data = {
            name: "Meeting Card",
            type: "Meeting",
            meeting: {}
        }
    }

})();