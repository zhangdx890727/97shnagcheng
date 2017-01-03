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