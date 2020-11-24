(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("phoneVerifyController", phoneVerifyController);
    phoneVerifyController.$inject = ["$rootScope"];

    function phoneVerifyController($rootScope) {
        let ctrl = this;

        ctrl.otp = "";
        ctrl.verifyFailed = false;

        ctrl.otpOptions = {
            size: 6,
            type: "text",
            onDone: (val) => {

            },
            onChange: (val) => {
                ctrl.otp = "" + val;
            }
        }

        $rootScope.Auth.sendOTP();

        ctrl.phone = $rootScope.Auth.getUserDetails().phone;

        ctrl.verify = function() {
            $rootScope.Auth.verifyOTP(ctrl.otp).catch(d => {
                ctrl.verifyFailed = true;
            });
        }
    }

})();