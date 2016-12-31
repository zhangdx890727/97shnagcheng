/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp',['ionic','myApp.slideBox','myApp.httpFactory','myApp.tabs','myApp.home','myApp.integral','myApp.league','myApp.person','myApp.homeDetail']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    //安卓手机的适配问题
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
    //网页跳转
    $stateProvider.state('tabs',{
        url:'/tabs',
        abstract:true,
        templateUrl:'tabs.html',
        controller:'tabsController'
    });
    //意外跳转
    $urlRouterProvider.otherwise('/tabs/home');
}]);
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
/**
 * Created by lx on 2016/12/29.
 */
angular.module('myApp.homeDetail',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('homeDetail',{
        url:'/homeDetail',
        templateUrl:'homeDetail.html',
        controller:'homeDetailController'
    });
}]).controller('homeDetailController',['$scope',function ($scope) {
    $scope.goBack  =function () {
        window.history.go(-1);
    };
}]);
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
}]).controller('integralController',['$scope','$ionicModal','$ionicViewSwitcher','$location','$timeout','HttpFactory',function ($scope,$ionicModal,$ionicViewSwitcher,$location,$timeout,HttpFactory) {
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
/**
 * Created by lx on 2016/12/27.
 */
angular.module('myApp.person',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.person',{
        url:'/person',
        views:{
            'tabs-person':{
                templateUrl:'person.html',
                controller:'personController'
            }
        }
    });
}]).controller('personController',['$scope',function ($scope) {

}]);
/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp.tabs',['RongWebIMWidget']).config(['$stateProvider',function ($stateProvider) {

}]).controller('tabsController',['$scope','$rootScope','$state','RongCustomerService',function ($scope,$rootScope,$state,RongCustomerService) {
        var dWidth = document.body.offsetWidth;
        var dHeight = document.body.offsetHeight;
        RongCustomerService.init({
            appkey:"n19jmcy5n1aw9",
            token:"5wPyilUqfiVCKuenjsJMSRqsXqSVwrXS3ow63aC1R0gP1PRKFnyhlYCqB/LQOY1KaZWOXMFfVTN6evEm15oPpg==",
            customerServiceId:"KEFU148301012322381",
            style:{
                width:dWidth,
                height:dHeight
            },
            position:RongCustomerService.Position.right,
            reminder:" ",
            onSuccess:function(){
                //初始化完成
                //设置客服按钮位置
                var kf = angular.element(document.getElementById('rong-widget-minbtn'));
                kf.css('bottom','80px');
                kf.css('right','30px');
                var rongSendBtn = angular.element(document.getElementById('rong-sendBtn'));
                rongSendBtn.css('backgroundColor','deepskyblue');
                var rongcloudKefuChat = angular.element(document.querySelector('.rongcloud-kefuChat'));
                rongcloudKefuChat.css({'background':'url("../images/icon.png")','backgroundPosition':'-75px'});
                kf.on('click',function () {
                    $rootScope.hideTabs = true;
                    // $state.reload();
                    // $scope.openModal();
                    // $state.go('rykf');
                    // console.log(indexRY);
                    // indexRY.style.position = 'absolute';
                    // indexRY.style.height = '800px';
                    // indexRY.style.width = '300px';
                    // indexRY.style.backgroundColor = 'red';
                    // document.body.removeChild(mm);
                    // rongConversation.removeClass('ng-hide');
                });
                // var minBtn = angular.element(document.getElementById('header').childNodes[1].childNodes[1]);
                // minBtn.on('click',function () {
                //     // $rootScope.hideTabs = false;
                //     // $state.reload();
                // });
                RongWebIMWidget.onClose = function() {
                    $rootScope.hideTabs = false;
                    $state.reload();
                };
            }
        });
    $scope.$on('$stateChangeSuccess',function (evt,current) {
        var BTN = angular.element(document.querySelector('#rong-widget-minbtn '));
        switch (current.url){
            case'/home':
                BTN.css('display','block');
                break;
            case'/integral':
                BTN.css('display','block');
                break;
            case'/homeDetail':
                BTN.css('display','block');
                break;
            case'/league':
                BTN.css('display','none');
                break;
            case'/person':
                BTN.css('display','none');
                break;
            default:
                BTN.css('display','none');
                break;
        }
    })
}]);
/**
 * Created by lx on 2016/12/5.
 */
angular.module('myApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,type) {
            if (url){
                var promise = $q.defer();
                // url = "http://localhost:3000/?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    timeout:20000
                }).then(function (result) {
                    result = result.data;
                    promise.resolve(result);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    };
}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        templateUrl:'slideBox.html',
        controller:['$scope','$ionicSlideBoxDelegate','$element',function ($scope,$ionicSlideBoxDelegate,$element) {
            $scope.goToDetailView = function (index) {
                console.log('进入详情页' + index);
            };
            // var lastSpan = $element[0].lastElementChild;

            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    $scope.isShowSlideBox = true;
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                    // lastSpan.innerText = ($scope.sourceArray[0]).title;
                    // $scope.slideHasChanged = function (index) {
                    //     lastSpan.innerText = $scope.sourceArray[index].title;
                    // }
                }
            });
            // $scope.slideHasChanged = function (index) {
            //     lastSpan.innerText = $scope.sourceArray[index].title;
            // };
            // 页面刚加载出来的时候禁止滑动
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            //拖拽轮播图的时候也要禁止底层的slideBox滑动
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);
