/**
 * Created by lx on 2016/12/26.
 */
angular.module('myApp',['ionic','myApp.slideBox','myApp.httpFactory','myApp.tabs','myApp.home','myApp.integral','myApp.league','myApp.person','myApp.homeDetail','myApp.personOrder','myApp.personCollect','myApp.personShoppingCar','myApp.personIntegral','myApp.personAddress','myApp.personPay','myApp.personConcern']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
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
}])
    .directive('showTabs', ['$rootScope',function ($rootScope) {
    return {
        restrict: 'EAC',
        link: function ($scope, $el) {
            console.log("hello");
            $rootScope.hideTabs = false;
        }
    };
}])
    .directive('hideTabs', ['$rootScope',function ($rootScope) {
        return {
            restrict: 'EAC',
            link: function ($scope, $el) {
                $rootScope.hideTabs = true;

            }
        };
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
}]).controller('leagueController',['$scope','$rootScope','$timeout','HttpFactory',function ($scope,$rootScope,$timeout,HttpFactory) {
    var url = "http://114.112.94.166/sunny/wap/api/franchise";
    HttpFactory.getData(url).then(function (result) {
        $scope. leagueArray= result.data;
        console.log($scope. leagueArray);
    });




}]);
/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personAddress',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personAddress',{
        url:'/personAddress',
        views:{
            'tabs-person':{
                templateUrl:'personAddress.html',
                controller:'personAddressController'
            }
        }
    })
}]).controller('personAddressController',['$scope','$ionicModal','$rootScope','$ionicPopup','HttpFactory',function ($scope,$ionicModal,$rootScope,$ionicPopup,HttpFactory) {
//    新增收货地址模态
    $ionicModal.fromTemplateUrl('addressModal.html',{
        scope:$scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.address = {
        //收货地址的数据数组
        listArray:[],
        openModal:openModal,
        closeModal:closeModal,
        changeDefault:changeDefault,
        showConfirm:showConfirm
    };
    var url = 'http://114.112.94.166/sunny/wap/api/uAddress';
    HttpFactory.getData(url).then(function (result) {
       console.log(result.addressData);
        $scope.address.listArray = result.addressData;
        $scope.address.listArray[0].default = true;
    });
    //打开模态
    function openModal(event) {
        $scope.modal.show();
        // console.log(event.target.innerText);
        var addressModal = angular.element(document.querySelector('#address_modal'));
        var modalTitle = angular.element(document.querySelector('#modalTitle'));
        addressModal.on('click',function () {
            $scope.modal.hide();
        });
        // console.log(modalTitle[0]);
        if(event.target.innerText == '新增地址'){
            modalTitle[0].innerText = '新增收货地址';
        }else{
            modalTitle[0].innerText = '编辑收货地址';
        }
    }
    //关闭模态
    function closeModal() {
        $scope.modal.hide();
    }
    //当销毁controller时会清除模态modal
    $scope.$on('$destroy',function () {
        $scope.modal.remove();
    });
    //跳转时隐藏tab-bar
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });

    //实现单选的选择
    function changeDefault(index) {

        for (var i = 0;i < $scope.address.listArray.length;i++){
            $scope.address.listArray[i].default = false;
        }
        $scope.address.listArray[index].default = true;
        console.log(index);
    }

    //删除地址的确认弹窗
    function showConfirm(index) {
        var myPopup = $ionicPopup.show({
            cssClass:'myOrder',
            template:'确认要删除该地址吗?',
            scope: $scope,
            buttons: [
                { text: '取消',
                    type: ''
                },
                {
                    text: '确定',
                    type: '',
                    onTap: function(e) {
                        $scope.address.listArray.splice(index ,1);
                        if($scope.address.listArray.length >= 1){
                            $scope.address.listArray[0].default=true;
                        }
                    }
                }
            ]
        });
    }
}]);
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
}]).controller('personController',['$scope','$state','$ionicViewSwitcher','$rootScope','$timeout',function ($scope,$state,$ionicViewSwitcher,$rootScope,$timeout) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $timeout(function(){
            $rootScope.hideTabs = false;
        },300);
    });
    $scope.person = {
        userName:'你有梦想吗?',
        creditNum:'3800'
    };
    $scope.showOrder = function () {
        $state.go('tabs.personOrder');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的订单')
    };
    $scope.showCollect = function () {
        $state.go('tabs.personCollect');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的收藏')
    };
    $scope.showShoppingCar = function () {
        $state.go('tabs.personShoppingCar');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的购物车')
    };
    $scope.showIntegral = function () {
        $state.go('tabs.personIntegral');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的积分')
    };
    $scope.showAddress = function () {
        $state.go('tabs.personAddress');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的收货地址')
    };
    $scope.showPay = function () {
        $state.go('tabs.personPay');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的支付记录')
    };
    $scope.showConcern = function () {
        $state.go('tabs.personConcern');
        $ionicViewSwitcher.nextDirection("forward");
        console.log('我的推荐')
    };
}]);

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
    $scope.orderSelect = function (event) {
        var list = angular.element(document.querySelector('.orderTop')).children();
        var item = angular.element(event.target);
        list.removeClass('active');
        item.addClass('active');
    }



}]);
/**
 * Created by lx on 2017/1/1.
 */
angular.module('myApp.personPay',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personPay',{
        url:'/personPay',
        views:{
            'tabs-person':{
                templateUrl:'personPay.html',
                controller:'personPayController'
            }
        }
    })
}]).controller('personPayController',['$scope','$rootScope',function ($scope,$rootScope) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
}]);
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
                // kf.on('click',function () {
                //     $rootScope.hideTabs = true;
                //     $state.reload();
                    // $scope.openModal();
                    // $state.go('rykf');
                    // console.log(indexRY);
                    // indexRY.style.position = 'absolute';
                    // indexRY.style.height = '800px';
                    // indexRY.style.width = '300px';
                    // indexRY.style.backgroundColor = 'red';
                    // document.body.removeChild(mm);
                    // rongConversation.removeClass('ng-hide');
                // });
                // var minBtn = angular.element(document.getElementById('header').childNodes[1].childNodes[1]);
                // minBtn.on('click',function () {
                //     $rootScope.hideTabs = false;
                //     $state.reload();
                //     console.log('12345');
                // });
                // RongWebIMWidget.onClose = function() {
                //     $rootScope.hideTabs = false;
                //     console.log('12345');
                //     $state.reload();
                // };
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
