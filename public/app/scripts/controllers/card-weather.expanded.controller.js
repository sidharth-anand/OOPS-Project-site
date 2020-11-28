(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardWeatherExpandedController", cardWeatherExpandedController);
    cardWeatherExpandedController.$inject = ["$scope","$http"];

    function cardWeatherExpandedController($scope,$http) {
        let ctrl = this;

        ctrl.weather = $scope.cardExpandedController.data.weather;

        ctrl.requestWeatherByCity = function(town){
            var URL = 'http://api.openweathermap.org/data/2.5/weather?';
      
            var request = {
                method: 'GET',
                url: URL,
                params: {
                    q: town,
                    mode: 'json',
                    units: 'metric',
                    cnt: '7',
                    appid: '0473360f7aa183422a005a2374480706h'
                }
            };
            return $http(request);
        }

        ctrl.requestWeatherByCity('hyderabad').then(function(response){
            ctrl.city = response.data.name;
            ctrl.temp = response.data.temp;
        }).error(function(err){
            console.log(err);
        })
    }

})();