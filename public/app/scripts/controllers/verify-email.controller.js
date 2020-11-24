(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("verifyEmailController", verifyEmailController);
    verifyEmailController.$inject = ['$rootScope'];

    function verifyEmailController($rootScope) {
        let ctrl = this;

        ctrl.email = $rootScope.Auth.getUserDetails().email;

        $rootScope.Auth.sendVerificationEmail();
    }

})();