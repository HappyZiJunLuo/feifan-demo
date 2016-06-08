/**
 * Created by qianduan on 2016/6/6.
 */
angular.module("informationApp",['ui.router'])
.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/menu');
    $stateProvider
        .state('information.menu', {
            url:'/menu',
            templateUrl:'../information/menu.html'
        })
});