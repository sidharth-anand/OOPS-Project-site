(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("verifyingEmailController", verifyingEmailController);
    verifyingEmailController.$inject = ["$rootScope", "$state"];

    function verifyingEmailController($rootScope, $state) {
        let ctrl = this;

        ctrl.verifyFailed = false;

        $rootScope.Auth.verifyEmail($state.params.code).then(d => {

        }).catch(d => {
            ctrl.verifyFailed = true;
        });

    }

})();