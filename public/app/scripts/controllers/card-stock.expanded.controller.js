(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockExpandedController", cardStockExpandedController);
    cardStockExpandedController.$inject = ["$scope"];

    function cardStockExpandedController($scope) {
        let ctrl = this;

        ctrl.cart = $scope.cardExpandedController.data.cart;

        ctrl.groceriesList = [{
            item: "Milk",
            price: "20"
        },
        {
            item: "Eggs",
            price: "40"
        },
        {
            item: "Rice",
            price: "30" 
        },
        {
            item: "Water",
            price: "25" 
        },
        {
            item: "Curd",
            price: "90"
        }]

        ctrl.quantity = []

        ctrl.addToCart = function(item,price,index) {
            
         ctrl.cart.push({
                item: item,
                price: price,
                quantity: ctrl.quantity[index]
         })   
        }
    }

})();