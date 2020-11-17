(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockExpandedController", cardStockExpandedController);
    cardStockExpandedController.$inject = ["$scope"];

    function cardStockExpandedController($scope) {
        let ctrl = this;

        ctrl.inventory = $scope.cardExpandedController.data.inventory;

        ctrl.groceriesList = [{
            id: 1,
            label: "Milk"
        },
        {
            id: 2,
            label: "Eggs"
        },
        {
            id: 3,
            label: "Rice"
        },
        {
            id: 4,
            label: "Water"
        },
        {
            id: 5,
            label: "Curd"
        }]

        ctrl.selectedModel = [];
        ctrl.searchSettings = {enableSearch: true};

        

        ctrl.addToInventory = function(){
            angular.forEach(ctrl.selectedModel,function(x){
                ctrl.inventory.push({
                    item: x.label,
                    quantity: 1
                })
                ctrl.selectedModel = [];
            })
        };

        ctrl.remove = function(inventoryItem){
            ctrl.inventory.splice(ctrl.inventory.indexOf(inventoryItem),1);

        }

        

        
    }

})();