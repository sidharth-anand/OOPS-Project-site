(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardToDoListExpandedController", cardToDoListExpandedController);
    cardToDoListExpandedController.$inject = ["$scope"];

    function cardToDoListExpandedController($scope) {
        let ctrl = this;

        ctrl.todoList = $scope.cardExpandedController.data.list;
        ctrl.task = "";

        ctrl.todoAdd = function(){
            ctrl.todoList.push({todoText: ctrl.task ,done: false});
            ctrl.task = "";
        };

        ctrl.remove = function(){
            ctrl.todoList = ctrl.todoList.filter(d => !d.done);
        };

        ctrl.removeAll = function(){
            ctrl.todoList = []
        }

        ctrl.completedTasksPresent = function() {
            return ctrl.todoList.filter(d => d.done).length > 0;
        }
    };

})();