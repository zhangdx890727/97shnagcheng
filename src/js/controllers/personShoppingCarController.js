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
}]).controller('personShoppingCarController',['$scope','$rootScope','$ionicPopup','HttpFactory',function ($scope,$rootScope,$ionicPopup,HttpFactory) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
    $scope.shop = {
        shoppingCartArray:[]
    };
    var url = 'http://114.112.94.166/sunny/wap/api/ushoppingCart';
    HttpFactory.getData(url).then(function (result) {
        console.log(result.shoppingCart[0]);
        $scope.shop.shoppingCartArray = result.shoppingCart;
    });

    $scope.SelectAll = false;
    $scope.ifSelectAll = function () {
        $scope.SelectAll = !$scope.SelectAll;
        for(var i = 0;i < $scope.shop.shoppingCartArray.length;i++ ){
            if($scope.SelectAll == true){
                $scope.shop.shoppingCartArray[i].Selected = true;
            }else {
                $scope.shop.shoppingCartArray[i].Selected = false;
            }
        }
    };
    $scope.ifSelected = function (index) {
        $scope.shop.shoppingCartArray[index].Selected = !$scope.shop.shoppingCartArray[index].Selected;
        var shoppingSelect = false;
        for(var k = 0;k < $scope.shop.shoppingCartArray.length;k++){
            shoppingSelect = shoppingSelect || $scope.shop.shoppingCartArray[k].Selected;
        }
        if(shoppingSelect == true){
            $scope.SelectAll = true;
        }else{
            $scope.SelectAll = false;
        }
    };
    $scope.goToDetailView = function () {
        console.log('跳转商品详情页')
    };
    $scope.deleteShopping = function (index) {
        console.log(index);
        var myPopup = $ionicPopup.show({
            cssClass:'myOrder',
            template:'确定要从购物车中删除该商品吗?',
            scope: $scope,
            buttons: [
                { text: '取消',
                    type: ''
                },
                {
                    text: '确定',
                    type: '',
                    onTap: function(e) {
                        $scope.shop.shoppingCartArray.splice(index ,1);
                    }
                }
            ]
        });
    };







}]);