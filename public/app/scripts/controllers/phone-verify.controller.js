(function () {
    'use strict';

    let App = angular.module("app");

    App.controller("phoneVerifyController", phoneVerifyController);
    phoneVerifyController.$inject = ["$rootScope", "$timeout"];

    function phoneVerifyController($rootScope, $timeout) {
        let ctrl = this;

        ctrl.otp = "";
        ctrl.verifyFailed = false;
        ctrl.otpsent = false;

        ctrl.otpOptions = {
            size: 6,
            type: "text",
            onDone: (val) => {

            },
            onChange: (val) => {
                ctrl.otp = "" + val;
            }
        }

        //$rootScope.Auth.sendOTP();
        ctrl.confirm - null;
        ctrl.sendOTP = function () {
            firebase.auth().signInWithPhoneNumber($rootScope.Auth.getUserDetails().phone, new firebase.auth.RecaptchaVerifier('send-otp', {
                'size': 'invisible',
            })).then((confirmationResult) => {
                    ctrl.confirm = confirmationResult;
                    $timeout(() => {
                        ctrl.otpsent = true;
                    });
            });
        }

        ctrl.phone = $rootScope.Auth.getUserDetails().phone;

        ctrl.verify = function () {
            ctrl.confirm.confirm(ctrl.otp).then(d => {
                console.log("Success");
            }).catch(d => {
                ctrl.verifyFailed = true;
            })
            // $rootScope.Auth.verifyOTP(ctrl.otp).catch(d => {
            //     ctrl.verifyFailed = true;
            // });
        }
    }

})();