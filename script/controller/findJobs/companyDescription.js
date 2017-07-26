/**
 * Created by feng on 2017/6/26.
 */
var app = angular.module("app");
app.controller("companyDescription",function ($scope,projectService,$state,commonUtil) {
    var vm = this;
    commonUtil.scrollTo(0, 0);
    vm.hash=window.document.location.hash;//获取url1中的hash值
    vm.option = vm.hash.substr(21,10);//截取指定url字符串
    vm.params = $state.params;
    vm.recommend = $state.params.recommend||"";//判断职位是推荐职位还是最新职位
    vm.id = $state.params.id;//获取公司id
    $scope.maxSize = 5;
    if(vm.option === 'recruitJob'){
        vm.choose = true;
    }else{
        vm.choose=false;
    }
    //公司详情
    projectService.companyDescription(vm.id).then(function  successCallBack(res) {
        if(res.data.code === 0){
            vm.companyDescriptionRes = res.data.data;
        }else {
            bootbox.alert({
                buttons: {
                    ok: {
                        label: '关闭',
                        className: 'btn-danger'
                    }
                },
                message: '职位详情：' + response.data.message,
                title: "提示"
            });
        }
    });
    //公司详情和在招职位切换
    vm.exchangeJob = function (choose) {
        if(choose == false || choose == undefined){
            vm.choose = !vm.choose;
        }
    };
});