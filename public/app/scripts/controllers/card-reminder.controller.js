(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardReminderController", cardReminderController);
    cardReminderController.$inject = [];

    function cardReminderController() {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-reminder.expanded.html",
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
            name: "Reminder Card",
            type: "Reminder",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    }

})();