(function () {
    'use strict';

    let App = angular.module("app");

    App.controller("cardRefillExpandedController", cardRefillExpandedController);
    cardRefillExpandedController.$inject = ["$scope"];

    function cardRefillExpandedController($scope) {
        let ctrl = this;

        ctrl.data = $scope.cardExpandedController.data;
        ctrl.refill = $scope.cardExpandedController.data.refill;
        ctrl.refillFreq = $scope.cardExpandedController.data.refillFreq;
        ctrl.startDate = $scope.cardExpandedController.data.startDate;

        ctrl.datePopup = {
            addDate: false
        }

        ctrl.groceriesList = [{
            id: 1,
            label: "Milk"
        },
        {
            id: 2,
            label: "Eggs"
        },
        {
            id: 3,
            label: "Rice"
        },
        {
            id: 4,
            label: "Water"
        },
        {
            id: 5,
            label: "Curd"
        }]


        ctrl.selectedModel = [];
        ctrl.searchSettings = {
            enableSearch: true,
            showCheckAll: false,
            showUncheckAll: false,
            dynamicTitle: false,
            styleActive: true,
            buttonClasses: "btn-outline-light btn-transparent btn-transparent-light px-0"
        };
        ctrl.selectTexts = {
            buttonDefaultText: "Add/Remove items to card"
        }

        ctrl.freqSettings = {
            enableSearch: false,
            showCheckAll: false,
            showUncheckAll: false,
            dynamicTitle: true,
            styleActive: true,
            buttonClasses: "btn-outline-light btn-transparent btn-transparent-light px-0",
            selectionLimit: 1,
            smartButtonMaxItems: 1,
        }


        ctrl.frequencies = [
            {
                "id": "1",
                "label": "Once"
            },
            {
                "id": "2",
                "label": "Daily"
            },
            {
                "id": "3",
                "label": "Weekly"
            },
            {
                "id": "4",
                "label": "Monthly"
            }
        ];

        ctrl.stockCards = [
            {
                id: "1",
                label: "Stock 1"
            },
            {
                id: "2",
                label: "Stock 2"
            }
        ]

        ctrl.addToRefiller = function () {
            angular.forEach(ctrl.selectedModel, function (x) {
                ctrl.refill.push({
                    item: x.label,
                    quantity: 1
                })
                ctrl.selectedModel = [];
            })
        };

        ctrl.remove = function (refillItem) {
            ctrl.data.refill.splice(ctrl.data.refill.indexOf(refillItem), 1);
        };

        ctrl.toggleDatePopup = function (popup) {
            ctrl.datePopup[popup] = !ctrl.datePopup[popup];
        }
    }

})();