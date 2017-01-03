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
}]).controller('personAddressController',['$scope','$ionicModal','$rootScope','$ionicPopup',function ($scope,$ionicModal,$rootScope,$ionicPopup) {
//    新增收货地址模态
    $ionicModal.fromTemplateUrl('addressModal.html',{
        scope:$scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.address = {
        //收货地址的数据数组
        listArray:[{name:'马竹亭',telephone:'18738695633',address:'北京市朝阳区九乡桥东路青麦时代创新园A110',default:true},{name:'马竹亭',telephone:'18738695633',address:'北京市朝阳区九乡桥东路青麦时代创新园A110',default:false},{name:'马竹亭',telephone:'18738695633',address:'北京市朝阳区九乡桥东路青麦时代创新园A110',default:false}],
        openModal:openModal,
        closeModal:closeModal,
        changeDefault:changeDefault,
        showConfirm:showConfirm
    };

    //打开模态
    function openModal() {
        $scope.modal.show();
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

        for (var i =0;i<$scope.address.listArray.length;i++){
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