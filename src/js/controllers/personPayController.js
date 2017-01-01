/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personPay',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('personPay',{
        url:'/personPay',
        templateUrl:'personPay.html',
        controller:'personPayController'
    })
}]).controller('personPayController',['$scope',function ($scope) {

    $scope.goBack = function () {
        window.history.go(-1);
    }
}]);