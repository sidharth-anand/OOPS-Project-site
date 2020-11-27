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
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    refill: ctrl.data.refill,
                    refillFreq: ctrl.data.refillFreq,
                    startDate: ctrl.data.startDate
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();