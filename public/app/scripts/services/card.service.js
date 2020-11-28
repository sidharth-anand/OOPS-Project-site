(function() {
    'use strict';

    let App = angular.module("app");

    App.service("cardService", cardService);
    cardService.$inject = ["baseAPIService"];

    function cardService(baseAPIService) {
        return {
            getCardById: function(id) {
                return baseAPIService.call('GET', '/cards/'+ id, {});
            },
            deleteCardById: function(id) {
                return baseAPIService.call('DELETE', '/cards/'+ id, {})
            },
            editCardById: function(id,data) {
                let sendData = JSON.parse(JSON.stringify(data));
                delete sendData._id;
                delete sendData.type;
                return baseAPIService.call('PUT', '/cards/'+ id, sendData);
            },
            inputCard: function(cardData){
                return baseAPIService.call('POST', '/cards', cardData)
            }
        }
    }

})();