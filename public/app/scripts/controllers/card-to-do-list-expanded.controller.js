(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardToDoListExpandedController", cardToDoListExpandedController);
    cardToDoListExpandedController.$inject = ["$scope"];

    function cardToDoListExpandedController($scope) {
        let ctrl = this;

        ctrl.todoList = [];
        ctrl.task = $scope.cardToDoListExpandedController.data;

        ctrl.todoAdd = function(){
            ctrl.todoList.push({todoText: ctrl.task ,done: false});
            ctrl.task = "";
        }
    }

})();