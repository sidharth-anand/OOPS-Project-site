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
                    console.log(d.data);
                    let groups = [...new Set(d.data.map(card => card.group))];
                    groups = groups.map(groupname => {
                        return {
                            name: groupname,
                            cards: d.data.filter(card => card.group == groupname)
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
                        name: "Weather card",
                        type: "Weather",
                        weather: {}
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