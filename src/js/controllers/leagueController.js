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
}]).controller('leagueController',['$scope',function ($scope) {

}]);