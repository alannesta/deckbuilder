angular
    .module('deckbuilder', ['ngMaterial', 'firebase', 'ngRoute'])
    .config(function ($mdThemingProvider, $mdIconProvider, $routeProvider) {

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512);

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('brown')
            .accentPalette('red');

        $routeProvider
            .when('/playground', {
                templateUrl: 'views/playground.html',
                controller: 'PlaygroundController as ctrl'
            })
            .when('/upload', {
                templateUrl: 'views/upload.html',
                controller: 'UploadController as ctrl'
            });

    }).constant('FIREBASE', {
        BASE_URL: 'https://radiant-fire-6566.firebaseio.com/cards'
    });