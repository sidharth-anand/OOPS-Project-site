(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardTextExpandedController", cardTextExpandedController);
    cardTextExpandedController.$inject = ["$scope"];

    function cardTextExpandedController($scope) {
        let ctrl = this;

        ctrl.data = $scope.cardExpandedController.data;
    }

})();