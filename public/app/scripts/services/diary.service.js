(function() {
    'use strict';

    let App = angular.module("app");

    App.service("diaryService", diaryService);
    diaryService.$inject = ["baseAPIService"];

    function diaryService(baseAPIService) {
        return {
            diaryEntry: function(data){
                return baseAPIService.call('POST','/diary',data);
            },
            getDiaryById: function(id){
                return baseAPIService.call('GET','/diary/'+id,{});
            },
            editDiaryById: function(id,data){
                return baseAPIService.call('PUT','/diary/'+id,data);
            },
            getAllDiaryEntries: function(){
                return baseAPIService.call('GET','/diary/all');
            }
        }
    }

})();