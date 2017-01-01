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
}]).controller('personController',['$scope','$state','$ionicViewSwitcher',function ($scope,$state,$ionicViewSwitcher) {
    $scope.person = {
        userName:'你有梦想吗?',
        creditNum:'3800'
    };
    $scope.showOrder = function () {
        $state.go('personOrder');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的订单')
    };
    $scope.showCollect = function () {
        $state.go('personCollect');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的收藏')
    };
    $scope.showShoppingCar = function () {
        $state.go('personShoppingCar');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的购物车')
    };
    $scope.showIntegral = function () {
        $state.go('personIntegral');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的积分')
    };
    $scope.showAddress = function () {
        $state.go('personAddress');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的收货地址')
    };
    $scope.showPay = function () {
        $state.go('personPay');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的支付记录')
    };
    $scope.showConcern = function () {
        $state.go('personConcern');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的推荐')
    };
}]);
