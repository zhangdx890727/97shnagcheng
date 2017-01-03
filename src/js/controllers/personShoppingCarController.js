/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personShoppingCar',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personShoppingCar',{
        url:'/personShoppingCar',
        views:{
            'tabs-person':{
                templateUrl:'personShoppingCar.html',
                controller:'personShoppingCarController'
            }
        }
    })
}]).controller('personShoppingCarController',['$scope','$rootScope',function ($scope,$rootScope) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.showTabs = false;
        $rootScope.hideTabs = true;
        console.log('11111111')
    });

}]);