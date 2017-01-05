/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personIntegral',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personIntegral',{
        url:'/personIntegral',
        views:{
            'tabs-person':{
                templateUrl:'personIntegral.html',
                controller:'personIntegralController'
            }
        }
    })
}]).controller('personIntegralController',['$scope','$state','$rootScope','HttpFactory',function ($scope,$state,$rootScope,HttpFactory) {
    $scope.goExchange = function () {
        $state.go('tabs.integral');
    };
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
    $scope.person = {
        integralNum:'',
        integralArray:[]
    };
    var url = 'http://114.112.94.166/sunny/wap/api/uintegral';
    HttpFactory.getData(url).then(function (result) {
        $scope.person.integralArray = result.integralData;
        console.log($scope.person.integralArray);
        if(!$scope.person.integralArray.length){
          $scope.person.integralNum  = 0;
        }else{
            for(var i = 0;i < $scope.person.integralArray.length;i++){
                $scope.person.integralNum += $scope.person.integralArray[i].integral;
                console.log($scope.person.integralNum);
            }
        }
    })
}]);