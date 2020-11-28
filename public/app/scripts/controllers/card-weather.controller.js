(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardWeatherController", cardWeatherController);
    cardWeatherController.$inject = ["$scope"];

    function cardWeatherController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-text.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: "User has shared this text with you: "+ctrl.data.text
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();