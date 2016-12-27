/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp',['ionic','ngRoute','myApp.tabs','myApp.home','myApp.integral','myApp.league','myApp.person']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
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
 * Created by lx on 2016/12/27.
 */
angular.module('myApp.integral',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.integral',{
        url:'/integral',
        views:{
            'tabs-integral':{
                templateUrl:'integral.html',
                controller:'integralController'
            }
        }
    });
}]).controller('integralController',['$scope',function ($scope) {

}]);
/**
 * Created by lx on 2016/12/27.
 */
angular.module('myApp.league',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.league',{
        url:'/league',
        views:{
            'tabs-league':{
                templateUrl:'league.html',
                controller:'leagueController'
            }
        }
    });
}]).controller('leagueController',['$scope',function ($scope) {

}]);
/**
 * Created by lx on 2016/12/27.
 */
angular.module('myApp.person',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.person',{
        url:'/person',
        views:{
            'tabs-person':{
                templateUrl:'person.html',
                controller:'personController'
            }
        }
    });
}]).controller('personController',['$scope',function ($scope) {

}]);
/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp.tabs',[]).config(['$stateProvider',function ($stateProvider) {

}]).controller('tabsController',['$scope',function ($scope) {

}]);