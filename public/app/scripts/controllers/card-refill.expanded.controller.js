(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardRefillExpandedController", cardRefillExpandedController);
    cardRefillExpandedController.$inject = ["$scope"];

    function cardRefillExpandedController($scope) {
        let ctrl = this;

        ctrl.refill = $scope.cardExpandedController.data.refill;
        ctrl.frequency = $scope.cardExpandedController.data.frequency;
        ctrl.startDate = $scope.cardExpandedController.data.startDate;

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

        
        ctrl.frequencies = ["Once","Daily","Weekly","Monthly"]

        

        ctrl.addToRefiller = function(){
            angular.forEach(ctrl.selectedModel,function(x){
                ctrl.refill.push({
                    item: x.label,
                    quantity: 1
                })
                ctrl.selectedModel = [];
            })
        };

        ctrl.remove = function(refillItem){
            ctrl.refill.splice(ctrl.refill.indexOf(refillItem),1);

        }

        

        
    }

})();