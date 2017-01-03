/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personCollect',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personCollect',{
        url:'/personCollect',
        views:{
            'tabs-person':{
                templateUrl:'personCollect.html',
                controller:'personCollectController'
            }
        }
    })
}]).controller('personCollectController',['$scope','$rootScope',function ($scope,$rootScope) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
}]);