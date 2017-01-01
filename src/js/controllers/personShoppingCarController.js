/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personShoppingCar',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('personShoppingCar',{
        url:'/personShoppingCar',
        templateUrl:'personShoppingCar.html',
        controller:'personShoppingCarController'
    })
}]).controller('personShoppingCarController',['$scope',function ($scope) {
    $scope.goBack = function () {
        window.history.go(-1);
    }
}]);