(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("phoneVerifyController", phoneVerifyController);
    phoneVerifyController.$inject = ["$rootScope"];

    function phoneVerifyController($rootScope) {
        let ctrl = this;

        ctrl.otpOptions = {
            size: 6,
            type: "text",
            onDone: (val) => {

            },
            onChange: (val) => {

            }
        }

        ctrl.phone = $rootScope.Auth.getUserDetails().phone;
    }

})();