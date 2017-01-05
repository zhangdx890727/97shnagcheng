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
}]).controller('homeController',['$scope','$location','$ionicViewSwitcher','$ionicModal','$timeout','$rootScope','HttpFactory',function ($scope,$location,$ionicViewSwitcher,$ionicModal,$timeout,$rootScope,HttpFactory) {
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
            $scope.home.bannumArray = result.bannerData;
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
    var rongWidgetMinbtn = angular.element(document.getElementById('rong-widget-minbtn'));
    $scope.number = 1;
    $scope.addBtn = function () {
        $scope.number++;
    };
    $scope.reduceBtn = function () {
        $scope.number--;
        if($scope.number <= 1){
            $scope.number = 1;
        }
    };
    $ionicModal.fromTemplateUrl('modalCart.html',{
        scope:$scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
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
    $scope.doSearch = function (searchValue) {
        if (searchValue){
            console.log("搜索关键字为："+searchValue);
        }else {
            console.log("搜索值为空")
        }
    };
    $scope.addToShopCart = function () {
        console.log('加入购物车')
    };
    $scope.purchaseNow = function () {
        console.log('立即购买')
    }


}]);