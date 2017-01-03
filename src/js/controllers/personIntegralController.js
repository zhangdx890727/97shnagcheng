/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personIntegral',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personIntegral',{
        url:'/personIntegral',
        views:{
            'tabs-person':{
                templateUrl:'personIntegral.html',
                controller:'personIntegralController'
            }
        }
    })
}]).controller('personIntegralController',['$scope','$state','$rootScope',function ($scope,$state,$rootScope) {
    $scope.goExchange = function () {
        $state.go('tabs.integral');
    };
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
}]);