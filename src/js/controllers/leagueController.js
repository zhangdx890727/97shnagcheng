/**
 * Created by lx on 2016/12/27.
 */
angular.module('myApp.league',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.league',{
        url:'/league',
        views:{
            'tabs-league':{
                templateUrl:'league.html',
                controller:'leagueController'
            }
        }
    });
}]).controller('leagueController',['$scope','$rootScope','$timeout','HttpFactory',function ($scope,$rootScope,$timeout,HttpFactory) {
    var url = "http://114.112.94.166/sunny/wap/api/franchise";
    HttpFactory.getData(url).then(function (result) {
        $scope. leagueArray= result.data;
        console.log($scope. leagueArray);
    });




}]);