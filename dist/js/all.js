/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp',['ionic','ngRoute','myApp.tabs','myApp.home']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    //安卓手机的适配问题
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
    //网页跳转
    $stateProvider.state('tabs',{
        url:'/tabs',
        abstract:true,
        templateUrl:'tabs.html',
        controller:'tabsController'
    });
    //意外跳转
    $urlRouterProvider.otherwise('/tabs/home');
}]);
/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp.home',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.home',{
        url:'/home',
        views:{
            'tabs-home':{
                templateUrl:'home.html',
                controller:'homeController'
            }
        }
    });
}]).controller('homeController',['$scope',function ($scope) {

}]);
/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp.tabs',[]).config(['$stateProvider',function ($stateProvider) {

}]).controller('tabsController',['$scope',function ($scope) {

}]);