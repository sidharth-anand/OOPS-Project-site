(function() {
    'use strict';

    let App = angular.module("app");

    App.controller("homeController", homeController);
    homeController.$inject = ["$rootScope","cardGroupService"];

    function homeController($rootScope,cardGroupService) {
        let ctrl = this;

        ctrl.cardGroups = {};
        cardGroupService.getAllGroups().then(d => {
            if(Object.keys(d.data) != 0)
                {
                    let groups = [...new Set(d.data.map(d => d.group))];
                    groups.map(d => {
                        return {
                            name: d,
                            cards: d.data.filter(card => card.group == d)
                        }
                    });
                    ctrl.cardGroups = groups;
                }
            else
                ctrl.cardGroups = new Array();
        });

        ctrl.addGroup = function() {
            ctrl.cardGroups.push({
                name: `Cards ${ctrl.cardGroups.length + 1}`,
                cards: []
            });
        }
 
        /*ctrl.cardGroups = [
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
                        meeting: {
                            date: Date.now(),
                            time: Date.now(),
                            link: "https://asd.com/qwe-123-asd",
                            documents:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        }
                    },
                    {
                        name: "Grocery stock Card",
                        type: "Grocery stock",
                        inventory: []
                    },
                    {
                        name: "Grocery refill Card",
                        type: "Grocery refill",
                        startDate: new Date(),
                        refill: [],
                        refillFreq: []
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
        ];*/
    }

})();