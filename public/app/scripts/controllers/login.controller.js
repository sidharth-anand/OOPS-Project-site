(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("loginController", loginController);
    loginController.$inject = ["$rootScope"];

    function loginController($rootScope) {
        let ctrl = this;

        ctrl.loginForm = {};

        ctrl.submit = function(valid) {
            if(valid) {
                $rootScope.Auth.login(ctrl.loginForm);
            }
        }
    }   

})();