/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personAddress',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('personAddress',{
        url:'/personAddress',
        templateUrl:'personAddress.html',
        controller:'personAddressController'
    })
}]).controller('personAddressController',['$scope',function ($scope) {

    $scope.goBack = function () {
        window.history.go(-1);
    }
}]);