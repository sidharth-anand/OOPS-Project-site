(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardWeather", cardWeather);
    cardWeather.$inject = ["$rootScope", "$compile"];

    function cardWeather($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                data: "=",
                groupInfo: "=group"
            },
            templateUrl: 'app/modules/client/cards/normal/card-weather.html',
            controller: "cardWeatherController",
            controllerAs: "cardWeatherController",
            replace: true,
        }
    }

})();