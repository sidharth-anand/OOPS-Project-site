(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardBaseController", cardBaseController);
    cardBaseController.$inject = ["$scope", "$uibModal"];

    function cardBaseController($scope, $uibModal) {
        let ctrl = this;

        ctrl.cardOptions = $scope.cardOptions;
        ctrl.cardData = $scope.cardData;

        ctrl.expand = function() {
            let expanded = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                templateUrl: "app/modules/client/cards/expanded/card-base.expanded.html",
                size: "md modal-dialog-centered",
                controller: "cardExpandedController",
                controllerAs: "cardExpandedController",
                resolve: {
                    options: () => ctrl.cardOptions,
                    data: () => ctrl.cardData
                }
            });

            expanded.result.then(d => {
                if(ctrl.cardOptions.onChange) {
                    ctrl.cardOptions.onChange(d);
                }
            }).catch(d => {

            });
        }

        ctrl.contextMenuOptions = 
        [
            {
                text: "Edit",
                click: function() {
                    ctrl.expand()
                }
            },
            {
                text: "Share",
                click: function() {
                    if(ctrl.cardOptions.getShareData) {
                        let shareData = ctrl.cardOptions.getShareData();
                        if(!shareData.title || !shareData.text) {
                            throw error("Cannot share the given object");
                        }   

                        if(navigator.share) {
                            navigator.share(shareData);
                        } else {
                            console.log("Use email here");
                        }
                    }
                }
            },
            {
                text: "Delete",
                click: function($itemScope, $event) {
                    angular.element($event.delegateTarget).remove();
                }
            }
        ]
    }

})();