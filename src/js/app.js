/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp',['ionic','myApp.slideBox','myApp.httpFactory','myApp.tabs','myApp.home','myApp.integral','myApp.league','myApp.person','myApp.homeDetail','myApp.personOrder','myApp.personCollect','myApp.personShoppingCar','myApp.personIntegral','myApp.personAddress','myApp.personPay','myApp.personConcern']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
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
}])
    .directive('showTabs', ['$rootScope',function ($rootScope) {
    return {
        restrict: 'EAC',
        link: function ($scope, $el) {
            console.log("hello");
            $rootScope.hideTabs = false;
        }
    };
}])
    .directive('hideTabs', ['$rootScope',function ($rootScope) {
        return {
            restrict: 'EAC',
            link: function ($scope, $el) {
                $rootScope.hideTabs = true;

            }
        };
    }]);