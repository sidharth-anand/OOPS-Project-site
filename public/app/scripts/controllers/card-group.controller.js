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
        ]

        $scope.$watch(function() {
            return ctrl.data.name;
        }, function(newName) {
            ctrl.groupInfo.name = newName;
        })
    }
})();