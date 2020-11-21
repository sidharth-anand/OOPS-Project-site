(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("registerController", registerController);
    registerController.$inject = ["$rootScope"];    

    function registerController($rootScope) {
        let ctrl = this;

        ctrl.registerForm = {
            occupation: "Student"
        };
        ctrl.dropdownstatus = {
            isopen:false
        }

        ctrl.occupations = ["Student", "Job-Seeker", "Employed", "Home-Maker"]

        ctrl.checkPasswordMatch = function(form) {
            if(ctrl.registerForm.password == ctrl.registerForm.passwordrepeat) {
                form.passwordrepeat.$setValidity('mismatch', true);
            } else {
                form.passwordrepeat.$setValidity('mismatch', false);
            }
        }

        ctrl.checkUniqueUsername = function(form) {
            form.username.$setValidity("unique", $rootScope.Auth.checkUniqueUsername(ctrl.registerForm.username));
        }

        ctrl.toggleDropdown = function() {
            ctrl.dropdownstatus.isopen = !ctrl.dropdownstatus.isopen;
        }

        ctrl.removeUniqueValidation = function(form, field) {
            form[field].$setValidity("unique", true);
        }

        ctrl.submit = function(form, valid) {
            if(valid) {
                $rootScope.Auth.register({
                    username: ctrl.registerForm.username,
                    password: ctrl.registerForm.password,
                    email: ctrl.registerForm.email,
                    phone: ctrl.registerForm.phone.split(" ").join(""),
                    profession: ctrl.registerForm.occupation
                }).then(d => {
                    if(d.data.msg.indexOf("error") != -1) {
                        if(d.data.msg.indexOf("E1100") != -1) {
                            form[d.data.msg.match("keyValue': {'([a-z]*)'")[1]].$setValidity("unique", false);
                        }
                    }
                }).catch(d => {
                    console.log("regerr", d);
                })
            }
        }
    }
})();