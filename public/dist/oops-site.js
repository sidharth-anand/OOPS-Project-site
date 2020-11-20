/*! oops-site 2020-11-21 */

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
        'ui.bootstrap.contextMenu',
        'angular-jwt',
        'otpInputDirective',
        'angularjs-dropdown-multiselect',
        'dndLists'
    ]);

    // // Router configuration
    App.config(configuration);
    configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide', '$localStorageProvider'];

    function configuration($stateProvider, $urlRouterProvider, $locationProvider, $provide, $localStorageProvider) {
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/modules/client/home.html',
                controller: "homeController",
                controllerAs: "homeController"
            })
            .state('verify-phone', {
                url: '/verify-phone',
                templateUrl: 'app/modules/client/verify-phone.html',
                controller: "phoneVerifyController",
                controllerAs: "phoneVerifyController",
                data: {
                    unAuth: true
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/modules/client/login.html',
                controller: "loginController",
                controllerAs: "loginController",
                data: {
                    unAuth: true
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/modules/client/register.html',
                controller: "registerController",
                controllerAs: "registerController",
                data: {
                    unAuth: true
                }
            })
            .state('verify-email', {
                url: '/verify-email',
                templateUrl: 'app/modules/client/verify-email.html',
                controller: "verifyEmailController",
                controllerAs: "verifyEmailController",
                data: {
                    unAuth: true
                }
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

    angular.module("app").constant("AuthEvents",{
        loginSuccess: "event:auth-login-success",
        loginFailed: "event:auth-login-falied",
        loginRequired: "event:auth-login-required",
        tokenExpired: "event:auth-token-expired"
    });

})();

(function(){
    'use strict';

    angular.module("app").factory("Auth", Auth);
    Auth.$inject = ["$rootScope", "$http", "AuthEvents", "$localStorage", "jwtHelper"];

    function Auth($rootScope, $http, AuthEvents, $localStorage, jwtHelper) {
        let userDetails = {};
        let userLoggedIn = false;

        return {
            login: function(creds) {
                let req = $http.post("/login", creds);
                req.then(d => {
                    $localStorage.authToken = d.data.authToken;
                    $localStorage.refreshToken = d.data.refreshToken;

                    userDetails = jwtHelper.decodeToken(d.data.authToken);
                    userLoggedIn = true;

                    $rootScope.$broadcast(AuthEvents.loginSuccess);
                }).catch(d => {
                    $rootScope.$broadcast(AuthEvents.loginFailed);
                });
                return req;
            },
            checkPreviousLogin: function() {
                let logged =  $localStorage.authToken && $localStorage.refreshToken && !this.isTokenExpired();
                
                if(logged) {
                    userDetails = jwtHelper.decodeToken($localStorage.authToken);

                    userDetails.phoneVerified = userDetails.phoneVerified === "true";
                    userDetails.emailVerified = userDetails.emailVerified === "true";
                    
                    userLoggedIn = true;
                }

                return logged;
            },
            isLoggedIn: function() {
                return userLoggedIn;
            },
            getUserDetails: function() {
                return userDetails;
            },
            isTokenExpired: function() {
                if(!$localStorage.authToken) {
                    return true;
                }

                let expiration = jwtHelper.getTokenExpirationDate($localStorage.authToken);
                return !(!expiration || (expiration < Date.now()));
            },
            isUserVerified: function() {
                return userLoggedIn && !!userDetails.phoneVerified && !!userDetails.emailVerified;
            },
            getRedirectStage: function() {
                if(!userLoggedIn) {
                    return 'login';
                } else if(!userDetails.phoneVerified) {
                    return 'verify-phone';
                } else if(!userDetails.emailVerified) {
                    return 'verify-email';
                }
            }
        }
    }

})();

(function(){
    'use strict';

    angular.element(document).ready(() => {
        
        angular.module("app").run(runApp);
        runApp.$inject = ["$rootScope", "Auth", "$transitions"];

        function runApp($rootScope, Auth, $transitions) {
            Auth.checkPreviousLogin();
            $rootScope.Auth = Auth;

            $transitions.onBefore({}, transition => {
                if(Auth.isUserVerified() && transition.to().data && transition.to().data.unAuth) {
                    return transition.router.stateService.target('home');
                }

                if(!Auth.isUserVerified() && !(transition.to().data && transition.to().data.unAuth)) {
                    return transition.router.stateService.target(Auth.getRedirectStage());
                }

                if(!Auth.isLoggedIn() && !(transition.to().name == 'login' || transition.to().name =='register')) {
                    return transition.router.stateService.target('login');
                }

                if(transition.to().name == 'verify-phone' && Auth.getUserDetails().phoneVerified) {
                    return transition.router.stateService.target('verify-email');
                }

                if(transition.to().name == 'verify-email' && Auth.getUserDetails().emailVerified) {
                    return transition.router.stateService.target('home');
                }
            });

        }

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
    cardExpandedController.$inject = ["$uibModalInstance", "$timeout", "options", "data", "group"];

    function cardExpandedController($uibModalInstance, $timeout, options, data, group) {
        let ctrl = this;

        ctrl.options = options;
        ctrl.data = JSON.parse(JSON.stringify(data));
        ctrl.group = group;

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

    App.controller("cardGroupController", cardGroupController);
    cardGroupController.$inject = ["$rootScope", "$scope"];

    function cardGroupController($rootScope, $scope) {
        let ctrl = this;

        ctrl.data = $scope.groupData;
        ctrl.groupInfo = {name: ctrl.data.name};

        $scope.$watch(function() {
            return ctrl.data.name;
        }, function(newName) {
            ctrl.groupInfo.name = newName;
        })
    }
})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardMeetingController", cardMeetingController);
    cardMeetingController.$inject = ["$scope"];

    function cardMeetingController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-meeting.expanded.html",
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

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardMeetingExpandedController", cardMeetingExpandedController);
    cardMeetingExpandedController.$inject = ["$scope"];

    function cardMeetingExpandedController($scope) {
        let ctrl = this;

        ctrl.meeting = $scope.cardExpandedController.data.meeting;

        ctrl.datePopup = {
            addDate: false
        }

        ctrl.toggleDatePopup = function(popup) {
            ctrl.datePopup[popup] = !ctrl.datePopup[popup];
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardRefillController", cardRefillController);
    cardRefillController.$inject = ["$scope"];

    function cardRefillController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-refill.expanded.html",
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

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardRefillExpandedController", cardRefillExpandedController);
    cardRefillExpandedController.$inject = ["$scope"];

    function cardRefillExpandedController($scope) {
        let ctrl = this;

        ctrl.refill = $scope.cardExpandedController.data.refill;
        ctrl.refillFreq = $scope.cardExpandedController.data.refillFreq;
        

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
        ctrl.searchSettings = {enableSearch: true};

        
        ctrl.frequencies = ["Once","Daily","Weekly","Monthly"]

        

        ctrl.addToRefiller = function(){
            angular.forEach(ctrl.selectedModel,function(x){
                ctrl.refill.push({
                    item: x.label,
                    quantity: 1
                })
                ctrl.selectedModel = [];
            })
        };

        ctrl.remove = function(refillItem){
            ctrl.refill.splice(ctrl.refill.indexOf(refillItem),1);

        };

        ctrl.frequency = "";
        ctrl.startDate = "";

        ctrl.addFreq = function(){
            ctrl.refillFreq = {
                frequency: ctrl.frequency,
                startDate: ctrl.startDate
            }
            ctrl.frequency = "";
            ctrl.startDate = "";
        }

        
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardReminderController", cardReminderController);
    cardReminderController.$inject = ["$scope"];

    function cardReminderController($scope) {
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

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
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
        ctrl.date = Date.now();
        ctrl.time = Date.now();
        ctrl.datePopup = {
            addDate: false
        };

        ctrl.addReminder = function(){
            ctrl.reminderList.push({date: ctrl.date, time: ctrl.time, remove:false});
            ctrl.date = Date.now();
            ctrl.time = Date.now();
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

        ctrl.toggleDatePopup = function(popup) {
            ctrl.datePopup[popup] = !ctrl.datePopup[popup];
        }

    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockController", cardStockController);
    cardStockController.$inject = ["$scope"];

    function cardStockController($scope) {
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

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardStockExpandedController", cardStockExpandedController);
    cardStockExpandedController.$inject = ["$scope"];

    function cardStockExpandedController($scope) {
        let ctrl = this;

        ctrl.inventory = $scope.cardExpandedController.data.inventory;

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

        

        ctrl.addToInventory = function(){
            angular.forEach(ctrl.selectedModel,function(x){
                ctrl.inventory.push({
                    item: x.label,
                    quantity: 1
                })
                ctrl.selectedModel = [];
            })
        };

        ctrl.remove = function(inventoryItem){
            ctrl.inventory.splice(ctrl.inventory.indexOf(inventoryItem),1);

        }

        

        
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardTextController", cardTextController);
    cardTextController.$inject = ["$scope"];

    function cardTextController($scope) {
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

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
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
            ctrl.todoList = ctrl.todoList.filter(d => !d.done);
        };

        ctrl.removeAll = function(){
            ctrl.todoList = []
        }

        ctrl.completedTasksPresent = function() {
            return ctrl.todoList.filter(d => d.done).length > 0;
        }
    };

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardToDoListController", cardToDoListController);
    cardToDoListController.$inject = ["$scope"];

    function cardToDoListController($scope) {
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

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("headerController", headerController);
    headerController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$transitions'];

    function headerController($scope, $rootScope, $state, $stateParams, $transitions) {
        $scope.$on('$includeContentLoaded', function () {
            $rootScope.helpers.uiHandleHeader();
        });

        let ctrl = this;

        ctrl.toggleSidebar = function() {
            $rootScope.helpers.uiHandleSidebar();
        }

        ctrl.hideExtra = true;

        $transitions.onBefore({}, transition => {
            if(transition.to().data && transition.to().data.unAuth) {
                ctrl.hideExtra = true;
            } else {
                ctrl.hideExtra = false;
            }
        });

        $transitions.onSuccess({}, transition => {
            if(transition.to().data && transition.to().data.unAuth) {
                ctrl.hideExtra = true;
            } else {
                ctrl.hideExtra = false;
            }
        });
    }

})();;
(function() {
    'use strict';

    let App = angular.module("app");

    App.controller("homeController", homeController);
    homeController.$inject = ["$rootScope"];

    function homeController($rootScope) {
        let ctrl = this;

        ctrl.cardGroups = [
            {
                name: "Cards 1",
                cards: [
                    {
                        name: "Text Card",
                        type: "Text",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    },
                    {
                        name: "Text Card 2",
                        type: "Text",
                        text: "asdvbnq 123 sadkf aerj nmsd fwkreh zd "
                    },
                    {
                        name: "Reminder Card",
                        type: "Reminder",
                        reminderList: []
                    },
                    {
                        name: "To do List card",
                        type: "To-do list",
                        list:  [],
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    },
                    {
                        name: "Meeting Card",
                        type: "Meeting",
                        meeting: {
                            date: Date.now(),
                            time: Date.now(),
                            link: "https://asd.com/qwe-123-asd",
                            documents:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        }
                    },
                    {
                        name: "Grocery stock Card",
                        type: "Grocery stock",
                        inventory: []
                    },
                    {
                        name: "Grocery refill Card",
                        type: "Grocery refill",
                        refill: [],
                        refillFreq: {}
                    }
                ]
            },
            {
                name: "Cards 2",
                cards: [
                    {
                        name: "Text Card",
                        type: "Text",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    },
                ]
            }
        ];
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("loginController", loginController);
    loginController.$inject = [];

    function loginController() {

    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("phoneVerifyController", phoneVerifyController);
    phoneVerifyController.$inject = ["$rootScope"];

    function phoneVerifyController($rootScope) {
        let ctrl = this;

        ctrl.otpOptions = {
            size: 6,
            type: "text",
            onDone: (val) => {

            },
            onChange: (val) => {

            }
        }

        ctrl.phone = $rootScope.Auth.getUserDetails().phone;
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("registerController", registerController);
    registerController.$inject = [];    

    function registerController() {

    }
})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("verifyEmailController", verifyEmailController);
    verifyEmailController.$inject = ['$rootScope'];

    function verifyEmailController($rootScope) {
        let ctrl = this;

        ctrl.email = $rootScope.Auth.getUserDetails().email;
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
    appHeader.$inject = ["$rootScope", "$compile", "$transitions"];

    function appHeader($rootScope, $compile, $transitions) {
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
                cardData: "=data",
                groupData: "=group"
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

    App.directive("cardGroup", cardGroup);
    cardGroup.$inject = ["$rootScope", "$compile"];

    function cardGroup($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                groupData: "=data"
            },
            templateUrl: 'app/modules/client/cards/card-group.html',
            controller: "cardGroupController",
            controllerAs: "cardGroupController",
            replace:true
        }
    }
})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardMeeting", cardMeeting);
    cardMeeting.$inject = ["$rootScope", "$compile"];

    function cardMeeting($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                data: "=",
                groupInfo: "=group"
            },
            templateUrl: 'app/modules/client/cards/normal/card-meeting.html',
            controller: "cardMeetingController",
            controllerAs: "cardMeetingController",
            replace: true,
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.directive("cardRefill", cardRefill);
    cardRefill.$inject = ["$rootScope", "$compile"];

    function cardRefill($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                data: "=",
                groupInfo: "=group"
            },
            templateUrl: 'app/modules/client/cards/normal/card-refill.html',
            controller: "cardRefillController",
            controllerAs: "cardRefillController",
            replace: true,
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
            scope: {
                data: "=",
                groupInfo: "=group"
            },
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
            scope: {
                data: "=",
                groupInfo: "=group"
            },
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
            scope: {
                data: "=",
                groupInfo: "=group"
            },
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
            scope: {
                data: "=",
                groupInfo: "=group"
            },
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
                    let html = element.text();
                    if(attrs.stripBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        }
    }

})();;
(function() {
    'use strict';

    let App = angular.module("app");

    App.directive("ngNumberInput", ngNumberInput);
    ngNumberInput.$inject = ["$rootScope", "$compile"];

    function ngNumberInput() {
        return {
            restrict: 'A',
            replace: false,
            link: function(scope, element, attrs) {
                angular.element(element).inputSpinner();
            }
        }
    }

})();