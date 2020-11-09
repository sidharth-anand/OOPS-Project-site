(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("appHeader", appHeader);
    appHeader.$inject = ["$rootScope", "$compile"];

    function appHeader($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: "app/modules/header/app-header.html",
            controller: 'headerController',
            controllerAs: 'headerController',
            replace: true
        }
    }

})();