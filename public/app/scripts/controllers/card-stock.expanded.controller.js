(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockExpandedController", cardStockExpandedController);
    cardStockExpandedController.$inject = ["$scope"];

    function cardStockExpandedController($scope) {
        let ctrl = this;

        ctrl.data = $scope.cardExpandedController.data;

        ctrl.groceriesList = [{
            item: "Milk",
            price: "20",
        },
        {
            item: "Eggs",
            price: "40",
        },
        {
            item: "Rice",
            price: "30",
        },
        {
            item: "Water",
            price: "25",
        },
        {
            item: "Curd",
            price: "90",
        },
        ]
    }

})();