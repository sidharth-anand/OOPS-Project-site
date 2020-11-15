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
            let oldList = ctrl.todoList;
            ctrl.todoList = [];
            angular.forEach(oldList,function(x){
                if(!x.done){
                    ctrl.todoList.push(x);
                }
            }) 
            
        };
    };

})();