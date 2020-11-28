/*! oops-site 2020-11-28 */

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
        'dndLists',
        'mwl.calendar',
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
            })
            .state('verifying-email', {
                url: '/verifying-email/{code}',
                templateUrl: 'app/modules/client/verifying-email.html',
                controller: "verifyingEmailController",
                controllerAs: "verifyingEmailController",
                data: {
                    unAuth: true
                }
            })
            .state("diary", {
                url: '/diary',
                templateUrl: 'app/modules/client/diary.html',
                controller: "diaryController",
                controllerAs: "diaryController",
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
        tokenExpired: "event:auth-token-expired",
        loginUnverified: "event:auth-unverified"
    });

})();

(function(){
    'use strict';

    angular.module("app").factory("Auth", Auth);
    Auth.$inject = ["$rootScope", "$http", "AuthEvents", "$localStorage", "jwtHelper", "$state"];

    function Auth($rootScope, $http, AuthEvents, $localStorage, jwtHelper, $state) {
        let userDetails = {
            emailVerified: false,
            phoneVerified: false
        };

        let userLoggedIn = false;
        let enteredPassword = "";
        let githubCode = "";
        const serverPath = "http://localhost:5000";

        return {
            login: function(creds) {
                let req = $http.post(serverPath + "/login", creds);
                req.then(d => {

                    userLoggedIn = true;

                    $localStorage.access_token = d.data.access_token;
                    $localStorage.refresh_token = d.data.refresh_token;
                    
                    $rootScope.$broadcast(AuthEvents.loginSuccess);

                    userDetails.phoneVerified = true;
                    userDetails.emailVerified = true;
                }).catch(d => {
                    userDetails.username = creds.username;
                    enteredPassword = creds.password;

                    if(d.data.msg) {
                        if(d.data.msg.indexOf("Phone") != -1) {
                            userDetails.emailVerified = true;
                            userDetails.email = d.data.email;
                            userDetails.phone = d.data.phone;

                            userLoggedIn = true;
                            
                            $state.go("verify-phone");
                        } else if(d.data.msg.indexOf("Email") != -1) {
                            userDetails.email = d.data.email;
                            userDetails.phone = d.data.phone;

                            userLoggedIn = true;

                            $state.go("verify-email");
                        }

                        $rootScope.$broadcast(AuthEvents.loginUnverified);
                    } 

                    $rootScope.$broadcast(AuthEvents.loginFailed);
                });

                return req;
            },
            getGithubCode: function() {
                window.open("https://github.com/login/oauth/authorize?client_id=f59b28f894d50689eea0&amp;redirect_uri=http://localhost:8000/#!/login&amp;state=asdfgh&amp;allow_signup=false")
            },
            loginWithGithub: function(code) {
                githubCode = code;

                let req = $http.post(serverPath + "whatever shit", {
                    code: code
                });
                
                req.then(d => {
                    userLoggedIn = true;

                    $localStorage.access_token = d.data.access_token;
                    $localStorage.refresh_token = d.data.refresh_token;
                    
                    $rootScope.$broadcast(AuthEvents.loginSuccess);

                    userDetails.phoneVerified = true;
                    userDetails.emailVerified = true;
                }).catch(d => {

                });

                return req;
            },
            register: function(details) {
                let req = $http.post(serverPath + "/register", details);
                req.then(d => {
                    if(d.data && d.data.msg && d.data.msg.indexOf("error") == -1) {
                        this.login({
                            username: details.username,
                            password: details.password
                        }).then(d => {
                            $state.go("home");
                        })
                    }
                });
                return req;
            },
            sendVerificationEmail: function() {
                let req = $http.get(serverPath + "/send_email/" + userDetails.email);
                return req;
            },
            verifyEmail: function(code) {
                let req = $http.get(serverPath + "/email_confirm/" + code);

                req.then(d => {
                    userDetails.emailVerified = true;
                    $state.go("verify-phone");
                });

                return req;
            },
            verifyPhone: function() {
                let req = $http.get(serverPath + "/phone_confirm/" + userDetails.phone);
                
                req.then(d => {
                    this.login({
                        username: userDetails.username,
                        password: enteredPassword
                    }).then(d => {
                        $state.go("home");
                    });
                });

                return req;
            },
            checkPreviousLogin: function() {
                let logged =  $localStorage.access_token && $localStorage.refresh_token && !this.isTokenExpired();
                
                userLoggedIn = logged;
                if (logged) {
                    userDetails.emailVerified = true;
                    userDetails.phoneVerified = true;
                }
                
                return logged;
            },
            checkUniqueUsername: function(name) {
                return $http.get(serverPath + '/check_username/' + name);
            },
            isLoggedIn: function() {
                return userLoggedIn;
            },
            getUserDetails: function() {
                return JSON.parse(JSON.stringify(userDetails));
            },
            isTokenExpired: function() {
                if(!$localStorage.access_token) {
                    return true;
                }

                return !jwtHelper.decodeToken($localStorage.access_token).fresh;
            },
            isUserVerified: function() {
                return userLoggedIn && !!userDetails.phoneVerified && !!userDetails.emailVerified;
            },
            getRedirectStage: function() {
                if(!userLoggedIn) {
                    return 'login';
                } else if(!userDetails.emailVerified) {
                    return 'verify-email';
                } else if(!userDetails.emailVerified) {
                    return 'verify-phone';
                }
            },
            getAccessToken: function() {
                return $localStorage.access_token;
            },
            logout: function() {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + this.getAccessToken();
                let req = $http.post(serverPath + "/logout");
                req.then(d => {
                    $localStorage.$reset();

                    userLoggedIn = false;
                    userDetails.emailVerified = false;
                    userDetails.phoneVerified = false;
                    userDetails.username = "";
                    userDetails.email = "";
                    userDetails.phone = "";
                    userDetails.password = "";

                    $state.go("login");
                })

                return req;
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

                if(transition.to().name == 'verify-email' && Auth.getUserDetails().emailVerified) {
                    return transition.router.stateService.target('verify-phone');
                }

                if(transition.to().name == 'verify-phone' && Auth.getUserDetails().phoneVerified) {
                    return transition.router.stateService.target('home');
                }
            });

            $transitions.onSuccess({to:"login"}, transition => {
                let matches = /(?<=code=)[\w]+/g.exec(window.location)
                if(matches.length) {
                    console.log(matches[0]);
                    //Auth.loginWithGithub(matches[0]);
                    window.location = (window.location + "").split("?")[0] + "#!/login";
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

    App.service("baseAPIService", baseAPIService);
    baseAPIService.$inject = ["$http", "$rootScope"];

    function baseAPIService($http, $rootScope) {
        const serverPath = "http://localhost:5000";
        return {
            call: function(method, url, params) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.Auth.getAccessToken();
                $http.defaults.headers.common['Content-type'] = 'application/json';
            
                return $http({
                    method: method,
                    url: serverPath + url,
                    params: method == 'GET' ? params : {},
                    data: method != 'GET' ? params : {},
                });
            }
        }
    }

})();;
(function() {
    'use strict';

    let App = angular.module("app");

    App.service("cardGroupService", cardGroupService);
    cardGroupService.$inject = ["baseAPIService"];

    function cardGroupService(baseAPIService) {
        return {
            getAllGroups: function() {
                return baseAPIService.call('GET', '/cards/all', {});
            },
            deleteGroup: function(id) {
                return baseAPIService.call('DELETE', '/groups/'+id,{});
            }
        }
    }

})();;
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
                return baseAPIService.call('PUT', '/cards/'+ id, data)
            },
            inputCard: function(cardData){
                return baseAPIService.call('POST', '/cards', cardData)
            }
        }
    }

})();;
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

})();;
(function() {
    'use strict';

    let App = angular.module("app");

    App.service("productService", productService);
    productService.$inject = ["baseAPIService"];

    function productService(baseAPIService) {
        return {
            getStock: function(){
                return baseAPIService.call('GET','/stock', {});
            },
            checkRefill: function(){
                return baseAPIService.call('POST','/refill',{});
            }
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("cardBaseController", cardBaseController);
    cardBaseController.$inject = ["$scope", "$uibModal", "cardService"];

    function cardBaseController($scope, $uibModal, cardService) {
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
                            window.open(`mailto:john@doe,com?subject=${shareData.title}&amp;body=${shareData.text}`)
                        }
                    }
                }
            },
            {
                text: "Delete",
                click: function($itemScope, $event) {
                    angular.element($event.delegateTarget).remove();
                    cardService.deleteCardById(ctrl.cardData._id.$oid)
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
    cardGroupController.$inject = ["$rootScope", "$scope", "cardService"];

    function cardGroupController($rootScope, $scope, cardService) {
        let ctrl = this;

        ctrl.data = $scope.groupData;
        ctrl.groupInfo = {name: ctrl.data.name};

        ctrl.contextMenuOptions = [
            {
                text: "Delete",
                click: function($itemScope, $event) {
                    cardGroupsService.deleteGroup(ctrl.data.name);
                    angular.element($event.delegateTarget).remove();
                }
            }
        ];

        ctrl.addCard = function(type) {
            let newcard = {
                name: "Card " + (ctrl.data.cards.length + 1),
                type: type,
                category:type,
                group: ctrl.data.name
            };

            switch (type) {
                case "Text": 
                    newcard.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    break;
                case "Reminder":
                    newcard.reminderList = [];
                    break;
                case "To-do list":
                    newcard.list = [];
                    break;
                case "Meeting":
                    newcard.meeting = {
                        date: Date.now(),
                        time: Date.now(),
                        link: "https://asd.com/qwe-123-asd",
                        documents:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    };
                    break;
                case "Grocery stock":
                    newcard.inventory = [];
                    break;
                case "Grocery refill":
                    newcard.refill = [];
                    newcard.refillFreq = [];
                    newcard.startDate = new Date();
                    newcard.cardid = [];
                    break;
            }

            ctrl.data.cards.push(newcard);

            cardService.inputCard(newcard);
        }

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
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: "User has decided to share meeting on "+ ctrl.data.meeting.date +" at "+ctrl.data.meeting.time+
                    ".\n The url for the meeting is " + ctrl.data.meeting.link +".\n Additional details: "+ ctrl.data.meeting.documents
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
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
            },
            getShareData: () => {
                let itemDetails = "";
                ctrl.data.refill.forEach(function(x){
                    itemDetails.concat("Item - "+x.item + "Quantity - " + x.quantity + "\n");
                })
                return {
                    title: ctrl.data.name,
                    text: "User has shared the scheduled refill of these items into the inventory: \n"+
                    "Starting from "+ ctrl.data.startDate + "\n"+
                    "With frequency set as: "+ ctrl.data.refillFreq
                }
            }
        }

        ctrl.data = $scope.data;
        ctrl.groupInfo = $scope.groupInfo;
    }

})();;
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
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
            },
            getShareData: () => {
                let reminderDetails = "";
                ctrl.data.reminderList.forEach(function(x){
                    reminderDetails.concat("Date - " + x.date + " Time - " + x.time +"\n");
                })
                return {
                    title: ctrl.data.name,
                    text: "User has shared these reminder details with you: \n" + reminderDetails
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
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
            },
            getShareData: () => {
                let inventoryDetails = "";
                ctrl.data.inventory.forEach(function(x){
                    let items = "Item - "+ x.item + " Quantity - " + x.quantity + "\n"
                })
                return {
                    title: ctrl.data.name,
                    text: "User has shared the following inventory details: \n" + inventoryDetails
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
    cardStockExpandedController.$inject = ["$scope","productService"];

    function cardStockExpandedController($scope,productService) {
        let ctrl = this;

        ctrl.inventory = $scope.cardExpandedController.data.inventory;

        ctrl.groceriesList = productService.getStock()
        /*ctrl.groceriesList = [{
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
        }]*/

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
                console.log(ctrl.data);
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
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
                cardService.editCardById(ctrl.data._id.$oid,ctrl.data)
            },
            getShareData: () => {
                let tasks = "";
                tasks = ctrl.data.list.map(d => d.todoText).join("\n");
                console.log(tasks);
                return {
                    title: ctrl.data.name,
                    text: "User wants to share the following tasks: \n" + tasks
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

    App.controller("cardWeatherController", cardWeatherController);
    cardWeatherController.$inject = ["$scope"];

    function cardWeatherController($scope) {
        let ctrl = this;

        ctrl.options = {
            expandedSrc: "app/modules/client/cards/expanded/card-weather.expanded.html",
            onChange: (newData) => {
                Object.keys(newData).forEach(d => {
                    ctrl.data[d] = newData[d];
                });
            },
            getShareData: () => {
                return {
                    title: ctrl.data.name,
                    text: "User has shared this text with you: "+ctrl.data.text
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

    App.controller("cardWeatherExpandedController", cardWeatherExpandedController);
    cardWeatherExpandedController.$inject = ["$scope","$http"];

    function cardWeatherExpandedController($scope,$http) {
        let ctrl = this;

        ctrl.weather = $scope.cardExpandedController.data.weather;

        ctrl.city = "";
        ctrl.requestWeatherByCity = function(town){
            var URL = 'http://api.openweathermap.org/data/2.5/weather?';
      
            var request = {
                method: 'GET',
                url: URL,
                params: {
                    q: town,
                    mode: 'json',
                    units: 'metric',
                    cnt: '7',
                    appid: '0473360f7aa183422a005a2374480706'
                }
            };
            return $http(request);
        }

        ctrl.getWeather = function(city){
            ctrl.requestWeatherByCity(city).then(function(response){
                ctrl.weather = response;
                ctrl.weather.city = response.data.name;
                ctrl.weather.temp = "Temperature: "+response.data.main.temp+" °C";
                ctrl.weather.feelsLike ="Feels Like: "+ response.data.main.feels_like+" °C";
                ctrl.weather.maxAndMin = "Max: "+response.data.main.temp_max+" °C | Min: "+response.data.main.temp_min+" °C";
                ctrl.weather.description = response.data.weather[0].description;
                ctrl.weather.icon = `https://openweathermap.org/img/wn/${response.data.weather[0]["icon"]}@2x.png`;
                console.log(response.data)
        });
        ctrl.city = "";
    }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("diaryController", diaryController);
    diaryController.$inject = ["$transitions"];

    function diaryController($transitions) {
        let ctrl = this;

        ctrl.calendarOptions = {
            calendarView: "month",
            viewDate: moment(),
            viewTitle: "Your Diary",
            events: [],
            selectedDate: new Date()
        }

        ctrl.dummy = "Your diary entry";

        ctrl.original = [
            {
                date: new Date(moment().hour(0).minutes(0).seconds(0).milliseconds(0)),
                heading: "Lorem",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                date: new Date(moment().hour(0).minutes(0).seconds(0).milliseconds(0).subtract(1, "day")),
                heading: "Ipsum dolor",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
        ];

        ctrl.data = JSON.parse(JSON.stringify(ctrl.original));

        ctrl.getCurrentDate = function() {
            return new Date(ctrl.calendarOptions.viewDate);
        }

        ctrl.changeDate = function(calendarDate) {
            ctrl.calendarOptions.selectedDate = calendarDate;
        }

        ctrl.findDateIndex = function(dateArray, target) {
            for(let i= 0; i < dateArray.length; i++) {
                if(moment.duration(moment(dateArray[i]).diff(moment(target))).days() == 0) {
                    return i;
                }
            }

            return -1;
        }

        ctrl.getDiaryInfo = function() {
            let index = ctrl.findDateIndex(ctrl.data.map(d => d.date), ctrl.calendarOptions.selectedDate);
            if(index != -1)
                return index;

            ctrl.data.push({
                date: new Date(ctrl.calendarOptions.selectedDate),
                heading: moment(ctrl.calendarOptions.selectedDate).format("MMMM Do"),
                text: "Your diary entry"
            });
            return ctrl.data.length - 1;
        }

        $transitions.onBefore({from: "diary"}, transition => {
            for(let i = 0; i < ctrl.data.length; i++) {
                let index = ctrl.findDateIndex(ctrl.original.map(d => d.date), ctrl.data[i].date)
                if(index == -1) {
                    console.log(`Data added for ${ctrl.data[i].date}`);
                } else if(JSON.stringify(ctrl.data[i]) != JSON.stringify(ctrl.original[i])) {
                    console.log(`Data changed for ${ctrl.data[i].date}`);
                }
            }
        });
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

        ctrl.logout = function() {
            $rootScope.Auth.logout();
        }

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
    homeController.$inject = ["$rootScope","cardGroupService"];

    function homeController($rootScope,cardGroupService) {
        let ctrl = this;

        ctrl.cardGroups = {};
        cardGroupService.getAllGroups().then(d => {
            if(Object.keys(d.data) != 0)
                {
                    console.log(d.data);
                    let groups = [...new Set(d.data.map(card => card.group))];
                    groups = groups.map(groupname => {
                        return {
                            name: groupname,
                            cards: d.data.filter(card => card.group == groupname)
                        }
                    });
                    ctrl.cardGroups = groups;
                }
            else
                ctrl.cardGroups = new Array();
        });

        ctrl.addGroup = function() {
            ctrl.cardGroups.push({
                name: `Cards ${ctrl.cardGroups.length + 1}`,
                cards: []
            });
        }
 
        /*ctrl.cardGroups = [
            {
                name: "Cards 1",
                cards: [
                    {
                        name: "Text Card",
                        type: "Text",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    },
                    {
                        name: "Weather card",
                        type: "Weather",
                        weather: {}
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
                        startDate: new Date(),
                        refill: [],
                        refillFreq: [],
                        cardid: []
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
        ];*/
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("loginController", loginController);
    loginController.$inject = ["$rootScope", "$state"];

    function loginController($rootScope, $state) {
        let ctrl = this;

        ctrl.loginForm = {};
        ctrl.loginFailed = false;

        ctrl.submit = function(valid) {
            if(valid) {
                $rootScope.Auth.login(ctrl.loginForm).then(d => {
                    $state.go("home");
                }).catch(d => {
                    ctrl.loginFailed = true;
                });
            }
        }

        ctrl.loginGithub = function() {
            $rootScope.Auth.getGithubCode();
        }
    }   

})();;
(function () {
    'use strict';

    let App = angular.module("app");

    App.controller("phoneVerifyController", phoneVerifyController);
    phoneVerifyController.$inject = ["$rootScope", "$timeout"];

    function phoneVerifyController($rootScope, $timeout) {
        let ctrl = this;

        ctrl.otp = "";
        ctrl.verifyFailed = false;
        ctrl.otpsent = false;

        ctrl.otpOptions = {
            size: 6,
            type: "text",
            onDone: (val) => {

            },
            onChange: (val) => {
                ctrl.otp = "" + val;
            }
        }

        //$rootScope.Auth.sendOTP();
        ctrl.confirm - null;
        ctrl.sendOTP = function () {
            firebase.auth().signInWithPhoneNumber($rootScope.Auth.getUserDetails().phone, new firebase.auth.RecaptchaVerifier('send-otp', {
                'size': 'invisible',
            })).then((confirmationResult) => {
                    ctrl.confirm = confirmationResult;
                    $timeout(() => {
                        ctrl.otpsent = true;
                    });
            });
        }

        ctrl.phone = $rootScope.Auth.getUserDetails().phone;

        ctrl.verify = function () {
            ctrl.confirm.confirm(ctrl.otp).then(d => {
                $rootScope.Auth.verifyPhone();
            }).catch(d => {
                ctrl.verifyFailed = true;
            });
        }
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("registerController", registerController);
    registerController.$inject = ["$rootScope", "$scope"];    

    function registerController($rootScope, $scope) {
        let ctrl = this;

        ctrl.registerForm = {
            username: "",
            occupation: "Student"
        };
        ctrl.dropdownstatus = {
            isopen:false
        }

        ctrl.occupations = ["Student", "Job-Seeker", "Employed", "Home-Maker"]

        ctrl.checkPasswordMatch = function(form) {
            if(ctrl.registerForm.password == ctrl.registerForm.passwordrepeat) {
                form.passwordrepeat.$setValidity('mismatch', true);
            } else {
                form.passwordrepeat.$setValidity('mismatch', false);
            }
        }

        ctrl.checkUniqueUsername = function(form) {
            $rootScope.Auth.checkUniqueUsername(ctrl.registerForm.username).then(d => {
                form.username.$setValidity("unique", false);
                console.log(d);
            }).catch(d => {
                form.username.$setValidity("unique", true);
            })
        }

        ctrl.toggleDropdown = function() {
            ctrl.dropdownstatus.isopen = !ctrl.dropdownstatus.isopen;
        }

        ctrl.removeUniqueValidation = function(form, field) {
            form[field].$setValidity("unique", true);
        }

        ctrl.submit = function(form, valid) {
            if(valid) {
                $rootScope.Auth.register({
                    username: ctrl.registerForm.username,
                    password: ctrl.registerForm.password,
                    email: ctrl.registerForm.email,
                    phone: ctrl.registerForm.phone.split(" ").join(""),
                    profession: ctrl.registerForm.occupation
                }).then(d => {
                    if(d.data.msg.indexOf("error") != -1) {
                        if(d.data.msg.indexOf("E1100") != -1) {
                            form[d.data.msg.match("keyValue': {'([a-z]*)'")[1]].$setValidity("unique", false);
                        }
                    }
                }).catch(d => {
                    console.log("regerr", d);
                })
            }
        }
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

        $rootScope.Auth.sendVerificationEmail();
    }

})();;
(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("verifyingEmailController", verifyingEmailController);
    verifyingEmailController.$inject = ["$rootScope", "$state"];

    function verifyingEmailController($rootScope, $state) {
        let ctrl = this;

        ctrl.verifyFailed = false;

        $rootScope.Auth.verifyEmail($state.params.code).then(d => {

        }).catch(d => {
            ctrl.verifyFailed = true;
        });

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

    App.directive("cardWeather", cardWeather);
    cardWeather.$inject = ["$rootScope", "$compile"];

    function cardWeather($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                data: "=",
                groupInfo: "=group"
            },
            templateUrl: 'app/modules/client/cards/normal/card-weather.html',
            controller: "cardWeatherController",
            controllerAs: "cardWeatherController",
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