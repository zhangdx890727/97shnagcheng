/**
 * Created by lx on 2016/12/27.
 */
angular.module('myApp.integral',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.integral',{
        url:'/integral',
        views:{
            'tabs-integral':{
                templateUrl:'integral.html',
                controller:'integralController'
            }
        }
    });
}]).controller('integralController',['$scope','$ionicModal','$ionicViewSwitcher','$location','$timeout','$rootScope','HttpFactory',function ($scope,$ionicModal,$ionicViewSwitcher,$location,$timeout,$rootScope,HttpFactory) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $timeout(function(){
            $rootScope.hideTabs = false;
        },300);
    });
    $scope.integral = {
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
            $scope.integral.bannumArray = result.bannerData;
            console.log($scope.integral.bannumArray);
            $scope.integral.goodsArray = result.goodsData;
            console.log($scope.integral.goodsArray);
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
            $scope.integral.goodsArray = $scope.integral.goodsArray.concat(result.goodsData)
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
        if($scope.number >= $scope.goods.goods_number){
            $scope.number = $scope.goods.goods_number;
        }
    };
    $scope.reduceBtn = function () {
        $scope.number--;
        if($scope.number <= 1){
            $scope.number = 1;
        }
    };
    $ionicModal.fromTemplateUrl('modalCart.html',{
        scope:$scope,
        animation: 'slide-in-down'
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