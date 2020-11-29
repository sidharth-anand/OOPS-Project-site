(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardWeatherExpandedController", cardWeatherExpandedController);
    cardWeatherExpandedController.$inject = ["$scope","$http"];

    function cardWeatherExpandedController($scope,$http) {
        let ctrl = this;

        ctrl.weather = $scope.cardExpandedController.data.weather;

        ctrl.city = "";

        ctrl.cityWeatherData = {
            chennai: {
                name: "Chennai",
                current: "21",
                min: "29",
                max: "32",
                description: "Cloudy",
                icon: "fas fa-cloud"
            },
            hyderabad: {
                name: "Hyderabad",
                current: "24.14",
                min:"22",
                max: "25",
                description: "Mist",
                icon: "fas fa-smog"
            },
            mumbai: {
                name: "Mumbai",
                current: "29.01",
                min: "30",
                max: "28",
                description: "smoke",
                icon: "fas fa-smog"
            }

        }

    }

})();