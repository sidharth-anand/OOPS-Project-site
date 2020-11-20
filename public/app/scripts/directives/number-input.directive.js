(function() {
    'use strict';

    let App = angular.module("app");

    App.directive("ngNumberInput", ngNumberInput);
    ngNumberInput.$inject = ["$rootScope", "$compile"];

    function ngNumberInput() {
        return {
            restrict: 'A',
            replace: false,
            link: function(scope, element, attrs) {
                angular.element(element).inputSpinner();
            }
        }
    }

})();