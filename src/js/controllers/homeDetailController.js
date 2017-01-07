/**
 * Created by lx on 2016/12/29.
 */
angular.module('myApp.homeDetail',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('homeDetail',{
        url:'/homeDetail',
        templateUrl:'homeDetail.html',
        controller:'homeDetailController'
    });
}]).controller('homeDetailController',['$scope',function ($scope) {

}]);