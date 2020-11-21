
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
        let userRegistrationDetails = null;
        const serverPath = "http://localhost:5000";

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
            register: function(details) {
                let req = $http.post(serverPath + "/register", details);
                req.then(d => {
                    if(d.data && d.data.msg && d.data.msg.indexOf("error") == -1) {
                        userRegistrationDetails = {
                            name: details.name,
                            email: details.email,
                            phone: details.phone,
                            emailVerified: false,
                            phoneVerified: false
                        };
                    }
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
            checkUniqueUsername: function(name) {
                //return $http.get(serverPath + 'username', {name: name});
                return true;
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
})();