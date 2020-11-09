(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("appSidebar", appSidebar);
    appSidebar.$inject = ["$rootScope", "$compile"];

    function appSidebar($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: "app/modules/sidebar/app-sidebar.html",
            replace: true
        }
    }

})();