/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personConcern',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('personConcern',{
        url:'/personConcern',
        templateUrl:'personConcern.html',
        controller:'personConcernController'
    })
}]).controller('personConcernController',['$scope',function ($scope) {

    $scope.goBack = function () {
        window.history.go(-1);
    }
}]);