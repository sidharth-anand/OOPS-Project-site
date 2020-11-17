(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockExpandedController", cardStockExpandedController);
    cardStockExpandedController.$inject = ["$scope"];

    function cardStockExpandedController($scope) {
        let ctrl = this;

        ctrl.cart = $scope.cardExpandedController.data.cart;

        ctrl.groceriesList = [{
            id: 1,
            label: "Milk",
            price: 20
        },
        {
            id: 2,
            label: "Eggs",
            price: 20
        },
        {
            id: 3,
            label: "Rice",
            price: 50
        },
        {
            id: 4,
            label: "Water",
            price: 30
        },
        {
            id: 5,
            label: "Curd",
            price: 10
        }]

        ctrl.quantity = [];

        ctrl.selectedModel = [];
        ctrl.searchSettings = {enableSearch: true};

        

        ctrl.addToCart = function(){
            angular.forEach(ctrl.selectedModel,function(x){
                ctrl.cart.push({
                    item: x.label,
                    price: parseInt(x.price),
                    quantity: 1
                })
            })
        };

        ctrl.remove = function(cartItem){
            ctrl.cart.splice(ctrl.cart.indexOf(cartItem),1);

        }

        ctrl.total = function(){
            let total = 0;
            angular.forEach(ctrl.cart,function(x){
                total += x.quantity*x.price;
            })
            return total;
        }

        
    }

})();