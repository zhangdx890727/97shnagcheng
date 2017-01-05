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
}]).controller('personCollectController',['$scope','$rootScope','$ionicPopup','$ionicLoading','$timeout','HttpFactory',function ($scope,$rootScope,$ionicPopup,$ionicLoading,$timeout,HttpFactory) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
    $scope.coll = {
        collectArray:[],
        showConfirm:showConfirm,
        addShopping:addShopping
    };
    var url = 'http://114.112.94.166/sunny/wap/api/ucollection';
    HttpFactory.getData(url).then(function (result) {
        console.log(result.collectionData);
        $scope.coll.collectArray = result.collectionData;
    });
    $scope.show = function() {
        $ionicLoading.show({
            template: '已加入购物车'
        });
    };
    $scope.hide = function(){
        $ionicLoading.hide();
    };
    function addShopping(index) {
        console.log(index);
        console.log('加入购物车1');
        var myPopup = $ionicPopup.show({
            cssClass: 'myOrder',
            template: '确认要把该商品加入购物车吗?',
            scope: $scope,
            buttons: [
                {
                    text: '取消',
                    type: ''
                },
                {
                    text: '确定',
                    type: '',
                    onTap: function(e) {
                        // $scope.coll.collectArray.splice(index ,1);
                        $scope.show();
                        $timeout(function () {
                            $scope.hide();
                        },1000);

                    }
                }
            ]
        });
    }
    function showConfirm(index) {
        console.log(index);
        var myPopup = $ionicPopup.show({
            cssClass: 'myOrder',
            template: '确认要删除该地址吗?',
            scope: $scope,
            buttons: [
                {
                    text: '取消',
                    type: ''
                },
                {
                    text: '确定',
                    type: '',
                    onTap: function(e) {
                        $scope.coll.collectArray.splice(index ,1);
                    }
                }
            ]
        });
    }

}]);