(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardRefillController", cardRefillController);
    cardRefillController.$inject = ["$scope"];

    function cardRefillController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-refill.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
                cardService.editCardById(ctrl.data.id,ctrl.data)
            },
            getShareData: () => {
                let itemDetails = "";
                ctrl.data.refill.forEach(function(x){
                    itemDetails.concat("Item - "+x.item + "Quantity - " + x.quantity + "\n");
                })
                return {
                    title: ctrl.data.name,
                    text: "User has shared the scheduled refill of these items into the inventory: \n"+
                    "Starting from "+ ctrl.data.startDate + "\n"+
                    "With frequency set as: "+ ctrl.data.refillFreq
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();