(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("loginController", loginController);
    loginController.$inject = ["$rootScope", "$state"];

    function loginController($rootScope, $state) {
        let ctrl = this;

        ctrl.loginForm = {};
        ctrl.loginFailed = false;

        ctrl.submit = function(valid) {
            if(valid) {
                $rootScope.Auth.login(ctrl.loginForm).then(d => {
                    $state.go("home");
                }).catch(d => {
                    ctrl.loginFailed = true;
                });
            }
        }
    }   

})();