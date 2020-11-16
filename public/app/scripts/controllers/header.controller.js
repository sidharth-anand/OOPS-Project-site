(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("headerController", headerController);
    headerController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$transitions'];

    function headerController($scope, $rootScope, $state, $stateParams, $transitions) {
        $scope.$on('$includeContentLoaded', function () {
            $rootScope.helpers.uiHandleHeader();
        });

        let ctrl = this;

        ctrl.toggleSidebar = function() {
            $rootScope.helpers.uiHandleSidebar();
        }

        ctrl.hideExtra = true;

        $transitions.onBefore({}, transition => {
            if(transition.to().data && transition.to().data.unAuth) {
                ctrl.hideExtra = true;
            } else {
                ctrl.hideExtra = false;
            }
        });

        $transitions.onSuccess({}, transition => {
            if(transition.to().data && transition.to().data.unAuth) {
                ctrl.hideExtra = true;
            } else {
                ctrl.hideExtra = false;
            }
        });
    }

})();