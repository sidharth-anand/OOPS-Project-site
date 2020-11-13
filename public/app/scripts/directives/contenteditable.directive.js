(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("ngContenteditable", ngContenteditable);
    ngContenteditable.$inject = ["$sce"];

    function ngContenteditable($sce) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                if(!ngModel || !attrs.contenteditable)
                    return;

                ngModel.$render = function() {
                    element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                };

                element.on('keyup change', function(){
                    scope.$evalAsync(read);
                });

                element.on('click', function(){
                    element.attr("contenteditable", "true");
                });

                element.on('blur', function() {
                    element.attr("contenteditable", "false");
                });

                function read() {
                    let html = element.html();
                    if(attrs.stripBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        }
    }

})();