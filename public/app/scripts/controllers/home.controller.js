(function() {
    'use strict';

    let App = angular.module("app");

    App.controller("homeController", homeController);
    homeController.$inject = ["$rootScope"];

    function homeController($rootScope) {
        let ctrl = this;

        ctrl.cardGroups = [
            {
                name: "Cards 1",
                cards: [
                    {
                        name: "Text Card",
                        type: "Text",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    },
                    {
                        name: "Text Card 2",
                        type: "Text",
                        text: "asdvbnq 123 sadkf aerj nmsd fwkreh zd "
                    },
                    {
                        name: "Reminder Card",
                        type: "Reminder",
                        reminderList: []
                    },
                    {
                        name: "To do List card",
                        type: "To-do list",
                        list:  [],
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    },
                    {
                        name: "Meeting Card",
                        type: "Meeting",
                        meeting: {}
                    },
                    {
                        name: "Grocery stock Card",
                        type: "Grocery stock",
                        inventory: []
                    },
                    {
                        name: "Grocery refill Card",
                        type: "Grocery refill",
                        refill: [],
                        refillFreq: {}
                    }
                ]
            },
            {
                name: "Cards 2",
                cards: [
                    {
                        name: "Text Card",
                        type: "Text",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    },
                ]
            }
        ];
    }

})();