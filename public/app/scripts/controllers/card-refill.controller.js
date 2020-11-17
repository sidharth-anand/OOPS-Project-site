(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardRefillController", cardRefillController);
    cardRefillController.$inject = [];

    function cardRefillController() {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-refill.expanded.html",
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
            name: "Grocery refill Card",
            type: "Grocery refill",
            refill: [],
            refillFreq: {}
        }
    }

})();