(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockController", cardStockController);
    cardStockController.$inject = [];

    function cardStockController() {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-stock.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: ctrl.data.text
                }
            }
        }

        ctrl.data = {
            name: "Grocery stock Card",
            type: "Grocery stock",
            inventory: []
        }
    }

})();