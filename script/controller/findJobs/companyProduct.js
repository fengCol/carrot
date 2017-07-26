/**
 * Created by feng on 2017/7/3.
 */
var app=angular.module("app");
app.controller('companyProduct',function ($scope,projectService,$state,commonUtil) {
    var vm=this;
    commonUtil.scrollTo(0, 0);
    vm.state=$state.params;
    vm.id = $state.params.id;//获取公司id
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
});

