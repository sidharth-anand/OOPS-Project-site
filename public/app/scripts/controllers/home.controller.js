(function() {
    'use strict';

    let App = angular.module("app");

    App.controller("homeController", homeController);
    homeController.$inject = ["$rootScope"];

    function homeController($rootScope) {
        let ctrl = this;

        ctrl.cardGroups = [
            {
                name: "Cards",
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
                    }
                ]
            }
        ];
    }

})();