/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personOrder',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personOrder',{
        url:'/personOrder',
        views:{
            'tabs-person':{
                templateUrl:'personOrder.html',
                controller:'personOrderController'
            }
        }
    })
}]).controller('personOrderController',['$scope','$rootScope',function ($scope,$rootScope) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
}]);