
var app=angular.module("app");
app.controller("recruitJob",function ($scope,projectService,$state,commonUtil,jobWantedTypes,searchUtil) {
    var vm = this;
    vm.state=$state.params;
    vm.id = $state.params.id;


    console.log(vm.state);

    var jobWantedOptionsCopy = angular.copy(jobWantedTypes);
    if (sessionStorage.jobWantedOptions === undefined) {
        vm.options = jobWantedOptionsCopy;
    } else {
        vm.options = JSON.parse(sessionStorage.jobWantedOptions);
    }
    //标签多选
    vm.checkboxMulti = function (index, arry) {
        searchUtil.checkboxMulti(index, arry);
        vm.search();
    };
    vm.data = searchUtil.dataConvert(vm.options);
    vm.data.companyId = $state.params.id;
    vm.data.bigCurrentPage = $state.params.page||1;//获取当前页的初始值
    vm.data.bigTotalItems = $state.params.bigTotalItems;//总数
    vm.data.size = 9;
    console.log(vm.params);
    vm.data.page = vm.data.bigCurrentPage;
    vm.search = function () {
        // 将选中的数据存储在本地
        sessionStorage.jobWantedOptions = JSON.stringify(vm.options);
        // 刷新当前界面
        $state.go("companyDescription.recruitJob", {page: vm.data.bigCurrentPage, size: vm.data.size}, {reload: true});
    };
    //获取在招职位数据


    projectService.getJob(vm.data,'').then(function successCallBack(res) {
        if(res.data.code === 0){
            vm.theCompanyJob = res.data;
            vm.data.bigTotalItems = res.data.total;
            //分页功能
            $scope.pageChanged = function() {
                $state.go("companyDescription.recruitJob",{page:vm.data.bigCurrentPage,size:vm.data.size},{reload:true});
            };
            //跳页
            vm.setPage=function (pageNum) {
                if(pageNum>=1){
                    vm.data.bigTotalItems = parseInt(vm.bigTotalItems);
                    vm.data.bigCurrentPage = vm.pageNum;
                }
                $state.go('companyDescription.recruitJob',{page:vm.data.bigCurrentPage,size:vm.data.size},{reload:true});
            }
        }else {
            bootbox.alert({
                buttons: {
                    ok: {
                        label: '关闭',
                        className: 'btn-danger'
                    }
                },
                message: '轮播banner：' + response.data.message,
                title: "提示"
            });
        }
    });
});