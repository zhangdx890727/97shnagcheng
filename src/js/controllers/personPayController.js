/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personPay',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personPay',{
        url:'/personPay',
        views:{
            'tabs-person':{
                templateUrl:'personPay.html',
                controller:'personPayController'
            }
        }
    })
}]).controller('personPayController',['$scope','$rootScope',function ($scope,$rootScope) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
}]);