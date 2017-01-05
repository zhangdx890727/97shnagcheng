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