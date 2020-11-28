(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardBaseController", cardBaseController);
    cardBaseController.$inject = ["$scope", "$uibModal"];

    function cardBaseController($scope, $uibModal) {
        let ctrl = this;

        ctrl.cardOptions = $scope.cardOptions;
        ctrl.cardData = $scope.cardData;
        ctrl.groupInfo = $scope.groupData;

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
                    data: () => ctrl.cardData,
                    group: () => ctrl.groupInfo
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
                            let maillink = angular.element(`<a href="mailto:x@x.com?subject=${shareData.title}&amp;body=${shareData.text}">Link</a>`);
                            maillink.appendTo("body");
                            maillink.trigger("click");
                            console.log(maillink);
                        }
                    }
                }
            },
            {
                text: "Delete",
                click: function($itemScope, $event) {
                    angular.element($event.delegateTarget).remove();
                    cardService.deleteCardById(cardExpandedController.data.id)
                }
            }
        ]
    }

})();