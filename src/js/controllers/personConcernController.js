/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personConcern',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personConcern',{
        url:'/personConcern',
        views:{
            'tabs-person':{
                templateUrl:'personConcern.html',
                controller:'personConcernController'
            }
        }
    })
}]).controller('personConcernController',['$scope','$rootScope',function ($scope,$rootScope) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
}]);