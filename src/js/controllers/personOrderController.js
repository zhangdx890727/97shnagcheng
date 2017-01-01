/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personOrder',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('personOrder',{
        url:'/personOrder',
        templateUrl:'personOrder.html',
        controller:'personOrderController'
    })
}]).controller('personOrderController',['$scope',function ($scope) {

    $scope.goBack = function () {
        window.history.go(-1);
    }
}]);