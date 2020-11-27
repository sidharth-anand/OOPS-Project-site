(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardGroupController", cardGroupController);
    cardGroupController.$inject = ["$rootScope", "$scope"];

    function cardGroupController($rootScope, $scope) {
        let ctrl = this;

        ctrl.data = $scope.groupData;
        ctrl.groupInfo = {name: ctrl.data.name};

        ctrl.contextMenuOptions = [
            {
                text: "Delete",
                click: function($itemScope, $event) {
                    angular.element($event.delegateTarget).remove();
                }
            }
        ];

        ctrl.addCard = function(type) {
            let newcard = {
                name: "Card " + (ctrl.data.cards.length + 1),
                type: type
            };

            switch (type) {
                case "Text": 
                    newcard.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    break;
                case "Reminder":
                    newcard.reminderList = [];
                    break;
                case "To-do list":
                    newcard.list = [];
                    break;
                case "Meeting":
                    newcard.meeting = {
                        date: Date.now(),
                        time: Date.now(),
                        link: "https://asd.com/qwe-123-asd",
                        documents:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    };
                    break;
                case "Grocery stock":
                    newcard.inventory = [];
                    break;
                case "Grocery refill":
                    newcard.refill = [];
                    newcard.refillFreq = [];
                    newcard.startDate = new Date();
                    break;
            }

            ctrl.data.cards.push(newcard);
        }

        $scope.$watch(function() {
            return ctrl.data.name;
        }, function(newName) {
            ctrl.groupInfo.name = newName;
        })
    }
})();