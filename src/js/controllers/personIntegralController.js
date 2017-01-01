/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personIntegral',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('personIntegral',{
        url:'/personIntegral',
        templateUrl:'personIntegral.html',
        controller:'personIntegralController'
    })
}]).controller('personIntegralController',['$scope',function ($scope) {

    $scope.goBack = function () {
        window.history.go(-1);
    }
}]);