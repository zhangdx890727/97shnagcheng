/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp.home',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.home',{
        url:'/home',
        views:{
            'tabs-home':{
                templateUrl:'home.html',
                controller:'homeController'
            }
        }
    });
}]).controller('homeController',['$scope','$location','$ionicViewSwitcher','$ionicModal','$timeout','HttpFactory',function ($scope,$location,$ionicViewSwitcher,$ionicModal,$timeout,HttpFactory) {
    $scope.home = {
        bannumArray:[],
        goodsArray:[]

    };

    $scope.slidBox = true;
    var loading = function () {
        $scope.slidBox = false;
        var url = "http://114.112.94.166/sunny/wap/api/getGoods";
        HttpFactory.getData(url).then(function (result) {
            console.log(result);
            $scope.slidBox = true;
            $scope.home.bannumArray = [{imgsrc:'images/mine.png',title:'111111111'},{imgsrc:'images/mine.png',title:'111111111'},{imgsrc:'images/mine.png',title:'111111111'},{imgsrc:'images/mine.png',title:'111111111'},{imgsrc:'images/mine.png',title:'111111111'}];
            console.log($scope.home.bannumArray);
            $scope.home.goodsArray = result.goodsData;
            console.log($scope.home.goodsArray);
        })
    };
    loading();

    //下拉刷新
    $scope.doRefresh = function () {
        loading();
        $scope.$broadcast('scroll.refreshComplete');
    };

    //上拉加载
    $scope.isShowInfinite = true;
    $scope.loadMore = function () {
            url = "http://114.112.94.166/sunny/wap/api/getGoods";
            HttpFactory.getData(url).then(function (result) {
                $scope.home.goodsArray = $scope.home.goodsArray.concat(result.goodsData)
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    
    //跳转详情页
    $scope.goToHomeDetail = function () {
        //跳转详情页
        $location.path('/homeDetail');
        $ionicViewSwitcher.nextDirection("forward");
    };
    //模态框
    $ionicModal.fromTemplateUrl('modalCart.html',{
        scope:$scope,
        animation: 'slide-in-down'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    var rongWidgetMinbtn = angular.element(document.getElementById('rong-widget-minbtn'));
    $scope.openModal = function(goods) {
        $scope.modal.show();
        $scope.goods = goods;
        rongWidgetMinbtn.css('display','none');
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
        $timeout(function () {
            rongWidgetMinbtn.css('display','block');
        },300);
    };
    $scope.$on('$destroy',function () {
        $scope.modal.remove();
    });

}]);