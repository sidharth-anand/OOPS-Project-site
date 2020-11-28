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
                    appid: '0473360f7aa183422a005a2374480706'
                }
            };
            return $http(request);
        }
        ctrl.weather.status = "";
        ctrl.requestWeatherByCity('hyderabad').then(function(response){
            ctrl.weather = response;
            ctrl.weather.city = response.data.name;
            ctrl.weather.temp = response.data.main.temp;
            ctrl.weather.feelsLike = response.data.main.feels_like;
            ctrl.weather.max = response.data.main.temp_max;
            ctrl.weather.min = response.data.main.temp_min;
            ctrl.weather.description = response.data.weather[0].description;
            ctrl.weather.icon = `https://openweathermap.org/img/wn/${response.data.weather[0]["icon"]}@2x.png`;
            console.log(response.data)
            console.log(response.data.main.temp)
        });
    }

})();