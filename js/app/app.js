/**
 * Created by kemal 17.02.2015
 * Main an application module
 */
angular.module('editor', ['ngRoute', 'ui.bootstrap'])

    .config(function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider

            .when('/', {
                templateUrl: 'views/editor.html',
                controller: 'EditorCtrl',
                controllerAs: 'editor',
                resolve: EditorCtrl.resolve
            })

            .otherwise({redirectTo: '/'});
    })

    .run(function($rootScope, Utils) {
        $rootScope.Utils = Utils;
    })

    .controller('AppCtrl', function() {})

;