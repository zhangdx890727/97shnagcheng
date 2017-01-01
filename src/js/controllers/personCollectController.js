/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personCollect',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('personCollect',{
        url:'/personCollect',
        templateUrl:'personCollect.html',
        controller:'personCollectController'
    })
}]).controller('personCollectController',['$scope',function ($scope) {
    $scope.goBack = function () {
        window.history.go(-1);
    }
}]);