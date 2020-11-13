(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardExpandedController", cardExpandedController);
    cardExpandedController.$inject = ["$uibModalInstance", "$timeout", "options", "data"];

    function cardExpandedController($uibModalInstance, $timeout, options, data) {
        let ctrl = this;

        ctrl.options = options;
        ctrl.data = JSON.parse(JSON.stringify(data));

        ctrl.editingTitle = false;

        ctrl.getChanged = function() {
            let changed = {};
            Object.keys(data).forEach(k => {
                if(JSON.stringify(data[k]) !== JSON.stringify(ctrl.data[k])) {
                    changed[k] = ctrl.data[k];
                }
            });
            return changed;
        }

        ctrl.toggleTitleEdit = function() {
            ctrl.editingTitle = !ctrl.editingTitle;
            if(ctrl.editingTitle) {
                $timeout(() => {
                    angular.element("#modal-name-input").trigger("focus");
                })
            }
        }

        ctrl.save = function() {
            $uibModalInstance.close(ctrl.getChanged());
        }

        ctrl.close = function() {
            $uibModalInstance.dismiss();
        }
    }

})();