(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("appFooter", appFooter);
    appFooter.$inject = ["$rootScope", "$compile"];

    function appFooter($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/footer/app-footer.html',
            replace: true
        }
    }

})();