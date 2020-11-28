(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardTextController", cardTextController);
    cardTextController.$inject = ["$scope", "cardService"];

    function cardTextController($scope, cardService) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-text.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
                console.log(ctrl.data);
                let req = cardService.editCardById(ctrl.data._id.$oid,ctrl.data);
                console.log(req);

                req.then(d => {
                    console.log(d);
                }).catch(d => {
                    console.log(d);
                })
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: "User has shared this text with you: " + ctrl.data.text
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();