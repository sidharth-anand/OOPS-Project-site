(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("headerController", headerController);
    headerController.$inject = ['$scope', '$rootScope', '$state', '$stateParams'];

    function headerController($scope, $rootScope, $state, $stateParams) {
        $scope.$on('$includeContentLoaded', function () {
            console.log("asd");
            $rootScope.helpers.uiHandleHeader();
        });

        let ctrl = this;

        ctrl.toggleSidebar = function() {
            $rootScope.helpers.uiHandleSidebar();
        }
    }

})();