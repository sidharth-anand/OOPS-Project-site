/*! oops-site 2020-11-17 */

(function () {
    'use strict';

    // Create our angular module
    var App = angular.module('app', [
        'ngStorage',
        'ui.router',
        'ngResource',
        'ui.bootstrap',
        'oc.lazyLoad',
        'ngSanitize',
        'ngAnimate',
        'ngMessages',
        'ngFileUpload',
        'ui.bootstrap.contextMenu'
    ]);

    // // Router configuration
    App.config(configuration);
    configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide'];

    function configuration($stateProvider, $urlRouterProvider, $locationProvider, $provide) {
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/modules/client/home.html'
            });
    }

    App.factory('uiHelpers', function () {
        return {
           
            // Handles #main-container height resize to push footer to the bottom of the page
            uiHandleMain: function () {
                var lMain       = jQuery('#content-container');
                var hWindow     = jQuery(window).height();
                var hHeader     = jQuery('#header-navbar').outerHeight();
                var hFooter     = jQuery('#page-footer').outerHeight();

                if (jQuery('#page-container').hasClass('header-navbar-fixed')) {
                    lMain.css('min-height', hWindow - hFooter);
                } else {
                    lMain.css('min-height', hWindow - (hHeader + hFooter));
                }
            },
            // Handles transparent header functionality 
            uiHandleHeader: function () {
                var lPage = jQuery('#page-container');
    
                if (lPage.hasClass('header-navbar-fixed') && lPage.hasClass('header-navbar-transparent')) {
                    jQuery(window).on('scroll', function(){
                        if (jQuery(this).scrollTop() > 20) {
                            lPage.addClass('header-navbar-scroll');
                        } else {
                            lPage.removeClass('header-navbar-scroll');
                        }
                    });
                }
            },
            //Handles Slide in/out of sidebar
            uiHandleSidebar: function() {
                var lBar = jQuery("#nav-sidebar");
                if(lBar.attr("show") == "true") {
                    lBar.attr("show", "false");
                } else {
                    lBar.attr("show", "true");
                }

            },
            // Handles page loader functionality
            uiLoader: function (mode) {
                var lBody       = jQuery('body');
                var lpageLoader = jQuery('#page-loader');
    
                if (mode === 'show') {
                    if (lpageLoader.length) {
                        lpageLoader.fadeIn(250);
                    } else {
                        lBody.prepend('<div id="page-loader"></div>');
                    }
                } else if (mode === 'hide') {
                    if (lpageLoader.length) {
                        lpageLoader.fadeOut(250);
                    }
                }
            },
            // Handles blocks API functionality
            uiBlocks: function (block, mode, button) {
                // Set default icons for fullscreen and content toggle buttons
                var iconFullscreen         = 'si si-size-fullscreen';
                var iconFullscreenActive   = 'si si-size-actual';
                var iconContent            = 'icon-arrow-up32';
                var iconContentActive      = 'icon-arrow-down32';
    
                if (mode === 'init') {
                    // Auto add the default toggle icons
                    switch(button.data('action')) {
                        case 'fullscreen_toggle':
                            button.html('<i class="' + (button.closest('.block').hasClass('block-opt-fullscreen') ? iconFullscreenActive : iconFullscreen) + '"></i>');
                            break;
                        case 'content_toggle':
                            button.html('<i class="' + (button.closest('.block').hasClass('block-opt-hidden') ? iconContentActive : iconContent) + '"></i>');
                            break;
                        default:
                            return false;
                    }
                } else {
                    // Get block element
                    var elBlock = (block instanceof jQuery) ? block : jQuery(block);
    
                    // If element exists, procceed with blocks functionality
                    if (elBlock.length) {
                        // Get block option buttons if exist (need them to update their icons)
                        var btnFullscreen  = jQuery('[data-js-block-option][data-action="fullscreen_toggle"]', elBlock);
                        var btnToggle      = jQuery('[data-js-block-option][data-action="content_toggle"]', elBlock);
    
                        // Mode selection
                        switch(mode) {
                            case 'fullscreen_toggle':
                                elBlock.toggleClass('block-opt-fullscreen');
    
                                // Enable/disable scroll lock to block
                                if (elBlock.hasClass('block-opt-fullscreen')) {
                                    jQuery(elBlock).scrollLock('enable');
                                } else {
                                    jQuery(elBlock).scrollLock('disable');
                                }
    
                                // Update block option icon
                                if (btnFullscreen.length) {
                                    if (elBlock.hasClass('block-opt-fullscreen')) {
                                        jQuery('i', btnFullscreen)
                                            .removeClass(iconFullscreen)
                                            .addClass(iconFullscreenActive);
                                    } else {
                                        jQuery('i', btnFullscreen)
                                            .removeClass(iconFullscreenActive)
                                            .addClass(iconFullscreen);
                                    }
                                }
                                break;
                            case 'fullscreen_on':
                                elBlock.addClass('block-opt-fullscreen');
    
                                // Enable scroll lock to block
                                jQuery(elBlock).scrollLock('enable');
    
                                // Update block option icon
                                if (btnFullscreen.length) {
                                    jQuery('i', btnFullscreen)
                                        .removeClass(iconFullscreen)
                                        .addClass(iconFullscreenActive);
                                }
                                break;
                            case 'fullscreen_off':
                                elBlock.removeClass('block-opt-fullscreen');
    
                                // Disable scroll lock to block
                                jQuery(elBlock).scrollLock('disable');
    
                                // Update block option icon
                                if (btnFullscreen.length) {
                                    jQuery('i', btnFullscreen)
                                        .removeClass(iconFullscreenActive)
                                        .addClass(iconFullscreen);
                                }
                                break;
                            case 'content_toggle':
                                elBlock.toggleClass('block-opt-hidden');
    
                                // Update block option icon
                                if (btnToggle.length) {
                                    if (elBlock.hasClass('block-opt-hidden')) {
                                        jQuery('i', btnToggle)
                                            .removeClass(iconContent)
                                            .addClass(iconContentActive);
                                    } else {
                                        jQuery('i', btnToggle)
                                            .removeClass(iconContentActive)
                                            .addClass(iconContent);
                                    }
                                }
                                break;
                            case 'content_hide':
                                elBlock.addClass('block-opt-hidden');
    
                                // Update block option icon
                                if (btnToggle.length) {
                                    jQuery('i', btnToggle)
                                        .removeClass(iconContent)
                                        .addClass(iconContentActive);
                                }
                                break;
                            case 'content_show':
                                elBlock.removeClass('block-opt-hidden');
    
                                // Update block option icon
                                if (btnToggle.length) {
                                    jQuery('i', btnToggle)
                                        .removeClass(iconContentActive)
                                        .addClass(iconContent);
                                }
                                break;
                            case 'refresh_toggle':
                                elBlock.toggleClass('block-opt-refresh');
    
                                // Return block to normal state if the demostration mode is on in the refresh option button - data-action-mode="demo"
                                if (jQuery('[data-js-block-option][data-action="refresh_toggle"][data-action-mode="demo"]', elBlock).length) {
                                    setTimeout(function(){
                                        elBlock.removeClass('block-opt-refresh');
                                    }, 2000);
                                }
                                break;
                            case 'state_loading':
                                elBlock.addClass('block-opt-refresh');
                                break;
                            case 'state_normal':
                                elBlock.removeClass('block-opt-refresh');
                                break;
                            case 'close':
                                elBlock.hide();
                                break;
                            case 'open':
                                elBlock.show();
                                break;
                            default:
                                return false;
                        }
                    }
                }
            }
        };
    });

    // Application Main Controller
    App.controller('AppCtrl', ['$scope', '$localStorage', '$rootScope', '$stateParams', '$window', "$transitions",
        function ($scope, $localStorage, $rootScope, $stateParams, $window, $transitions) {
            $scope.isNavCollapsed = true;
            $scope.isCollapsed = false;
            $scope.isCollapsedHorizontal = false;

            $transitions.onSuccess({}, () => {
                document.documentElement.scrollTop = 0;
                window.setTimeout(function () {
                    document.documentElement.scrollTop = 0;
                }, 10);
            })

            // Settings
            $scope.webapp = {
                version: '3.1', // Version
                localStorage: false, // Enable/Disable local storage
                settings: {

                    headerFixed: true // Enables fixed header
                }
            };

            // If local storage setting is enabled
            if ($scope.webapp.localStorage) {
                // Save/Restore local storage settings
                if ($scope.webapp.localStorage) {
                    if (angular.isDefined($localStorage.webappSettings)) {
                        $scope.webapp.settings = $localStorage.webappSettings;
                    } else {
                        $localStorage.webappSettings = $scope.webapp.settings;
                    }
                }

                // Watch for settings changes
                $scope.$watch('webapp.settings', function () {
                    // If settings are changed then save them to localstorage
                    $localStorage.webappSettings = $scope.webapp.settings;
                }, true);
            }


            // When view content is loaded
            $scope.$on('$viewContentLoaded', function () {
                // Hide page loader
                $scope.helpers.uiLoader('hide');

                // Resize #main-container
                $scope.helpers.uiHandleMain();
            });
        }
    ]);

    App.run(function($rootScope, uiHelpers) {
        // Access uiHelpers easily from all controllers
        $rootScope.helpers = uiHelpers;
    
        // On window resize or orientation change resize #main-container & Handle scrolling
        var resizeTimeout;
            
        jQuery(window).on('resize orientationchange', function () {
            clearTimeout(resizeTimeout);
    
            resizeTimeout = setTimeout(function(){          
                $rootScope.helpers.uiHandleMain();
            }, 150);
        });
    });
})();

(function(){
    'use strict';

    angular.element(document).ready(() =>{
        angular.bootstrap(document, ['app']);
        document.documentElement.scrollTop = 0;
    });
})();;
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

})();;
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

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardReminderController", cardReminderController);
    cardReminderController.$inject = [];

    function cardReminderController() {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-reminder.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: ctrl.data.text
                }
            }
        }

        ctrl.data = {
            name: "Reminder Card",
            type: "Reminder",
            reminderList: []
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardReminderExpandedController", cardReminderExpandedController);
    cardReminderExpandedController.$inject = ["$scope"];

    function cardReminderExpandedController($scope) {
        let ctrl = this;

        ctrl.reminderList = $scope.cardExpandedController.data.reminderList;
        ctrl.date = "";
        ctrl.time = "";

        ctrl.addReminder = function(){
            ctrl.reminderList.push({date: ctrl.date, time: ctrl.time, remove:false});
            ctrl.date = "";
            ctrl.time = "";
        }

        ctrl.removeReminder = function(reminder){
            let oldList = ctrl.reminderList;
            reminder.remove = true;
            ctrl.reminderList = [];
            angular.forEach(oldList,function(x){
                if (!x.remove){
                    ctrl.reminderList.push(x)
                }
            })
        };

        ctrl.removeAll = function() {
            ctrl.reminderList = [];
        };

    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockController", cardStockController);
    cardStockController.$inject = [];

    function cardStockController() {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-stock.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: ctrl.data.text
                }
            }
        }

        ctrl.data = {
            name: "Grocery stock Card",
            type: "Grocery stock",
            cart: []
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockExpandedController", cardStockExpandedController);
    cardStockExpandedController.$inject = ["$scope"];

    function cardStockExpandedController($scope) {
        let ctrl = this;

        ctrl.cart = $scope.cardExpandedController.data.cart;

        ctrl.groceriesList = [{
            item: "Milk",
            price: "20"
        },
        {
            item: "Eggs",
            price: "40"
        },
        {
            item: "Rice",
            price: "30" 
        },
        {
            item: "Water",
            price: "25" 
        },
        {
            item: "Curd",
            price: "90"
        }]

        ctrl.quantity = [];

        ctrl.addToCart = function(item,price,index) {
            
         ctrl.cart.push({
                item: item,
                price: parseInt(price),
                quantity: parseInt(ctrl.quantity[index])
         })   
        };

        ctrl.total = function() {
            let total = 0;
            angular.forEach(ctrl.cart,function(x){
                total += x.price*x.quantity;
            })

            return total;
        };
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardTextController", cardTextController);
    cardTextController.$inject = [];

    function cardTextController() {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-text.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: ctrl.data.text
                }
            }
        }

        ctrl.data = {
            name: "Text Card",
            type: "Text",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardTextExpandedController", cardTextExpandedController);
    cardTextExpandedController.$inject = ["$scope"];

    function cardTextExpandedController($scope) {
        let ctrl = this;

        ctrl.data = $scope.cardExpandedController.data;
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardToDoListExpandedController", cardToDoListExpandedController);
    cardToDoListExpandedController.$inject = ["$scope"];

    function cardToDoListExpandedController($scope) {
        let ctrl = this;

        ctrl.todoList = $scope.cardExpandedController.data.list;
        ctrl.task = "";

        ctrl.todoAdd = function(){
            ctrl.todoList.push({todoText: ctrl.task ,done: false});
            ctrl.task = "";
        };

        ctrl.remove = function(){
            let oldList = ctrl.todoList;
            ctrl.todoList = [];
            angular.forEach(oldList,function(x){
                if(!x.done){
                    ctrl.todoList.push(x);
                }
            }) 
            
        };

        ctrl.removeAll = function(){
            ctrl.todoList = []
        }
    };

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardToDoListController", cardToDoListController);
    cardToDoListController.$inject = [];

    function cardToDoListController() {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-to-do-list.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: ctrl.data.text
                }
            }
        }

        ctrl.data = {
            name: "To do List card",
            type: "To-do list",
            list:  [],
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("headerController", headerController);
    headerController.$inject = ['$scope', '$rootScope', '$state', '$stateParams'];

    function headerController($scope, $rootScope, $state, $stateParams) {
        $scope.$on('$includeContentLoaded', function () {
            console.log("asd");
            $rootScope.helpers.uiHandleHeader();
        });

        let ctrl = this;

        ctrl.toggleSidebar = function() {
            $rootScope.helpers.uiHandleSidebar();
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("appFooter", appFooter);
    appFooter.$inject = ["$rootScope", "$compile"];

    function appFooter($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/footer/app-footer.html',
            replace: true
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("appHeader", appHeader);
    appHeader.$inject = ["$rootScope", "$compile"];

    function appHeader($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: "app/modules/header/app-header.html",
            controller: 'headerController',
            controllerAs: 'headerController',
            replace: true
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("appSidebar", appSidebar);
    appSidebar.$inject = ["$rootScope", "$compile"];

    function appSidebar($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: "app/modules/sidebar/app-sidebar.html",
            replace: true
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardBase", cardBase);
    cardBase.$inject = ["$rootScope", "$compile"];

    function cardBase($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                cardOptions: "=options",
                cardData: "=data"
            },
            templateUrl: "app/modules/client/cards/normal/card-base.html",
            controller: "cardBaseController",
            controllerAs: "cardBaseController",
            replace: true
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardReminder", cardReminder);
    cardReminder.$inject = ["$rootScope", "$compile"];

    function cardReminder($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-reminder.html',
            controller: "cardReminderController",
            controllerAs: "cardReminderController",
            replace: true,
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardStock", cardStock);
    cardStock.$inject = ["$rootScope", "$compile"];

    function cardStock($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-stock.html',
            controller: "cardStockController",
            controllerAs: "cardStockController",
            replace: true,
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardText", cardText);
    cardText.$inject = ["$rootScope", "$compile"];

    function cardText($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-text.html',
            controller: "cardTextController",
            controllerAs: "cardTextController",
            replace: true,
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardToDoList", cardToDoList);
    cardToDoList.$inject = ["$rootScope", "$compile"];

    function cardToDoList($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/client/cards/normal/card-to-do-list.html',
            controller: "cardToDoListController",
            controllerAs: "cardToDoListController",
            replace: true,
        }
    }

})();;
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