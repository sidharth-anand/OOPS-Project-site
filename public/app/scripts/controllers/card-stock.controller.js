(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockController", cardStockController);
    cardStockController.$inject = ["$scope"];

    function cardStockController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-stock.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
                cardService.editCardById(ctrl.data.id,ctrl.data)
            },
            getShareData: () => {
                let inventoryDetails = "";
                ctrl.data.inventory.forEach(function(x){
                    let items = "Item - "+ x.item + " Quantity - " + x.quantity + "\n"
                })
                return {
                    title: ctrl.data.name,
                    text: "User has shared the following inventory details: \n" + inventoryDetails
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();