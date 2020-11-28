(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardToDoListController", cardToDoListController);
    cardToDoListController.$inject = ["$scope"];

    function cardToDoListController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-to-do-list.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
            },
            getShareData: () => {
                let tasks = "";
                tasks = ctrl.data.list.map(d => d.todoText).join("\n");
                console.log(tasks);
                return {
                    title: ctrl.data.name,
                    text: "User wants to share the following tasks: \n" + tasks
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();