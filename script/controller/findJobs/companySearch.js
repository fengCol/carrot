
var app=angular.module("app");
app.controller('companySearch',['$state','projectService','$scope', 'searchOptions','$location','$stateParams','searchUtil','commonUtil',
    function($state,projectService,$scope,searchOptions,$location,$stateParams,searchUtil,commonUtil){
        var vm=this;
        commonUtil.scrollTo(0, 0);
        vm.params=$state.params;
        vm.name=vm.params.name;
        vm.option=searchOptions;
        //当vm.params.data===null,即从外面刚进入公司搜索页时，searchOption回到最初状态
        if(vm.params.data===null) {
            vm.option=searchOptions;
            vm.data = searchUtil.dataDelete(vm.option);
        }
        //不是的话就转换为json格式
        else {
            vm.option=JSON.parse(vm.params.data);
        }
        vm.data = searchUtil.dataConvert(vm.option);
        //分页
        $scope.paginationConf = {
            currentPage:  1,
            itemsPerPage:9,
            onChange: function(){
                $state.go('search.companySearch', {
                    page:  $scope.paginationConf.currentPage ,
                    size: $scope.paginationConf.itemsPerPage
                }, {reload: true});
            }
        };
        $scope.paginationConf.currentPage = $stateParams.page;
        $scope.paginationConf.itemsPerPage = $stateParams.size ;
        //分页
        vm.checkboxMulti=searchUtil.checkboxMulti;
        vm.radioType=searchUtil.radioType;
        vm.data.page= $scope.paginationConf.currentPage;
        vm.data.size=$scope.paginationConf.itemsPerPage;
        vm.data.name=vm.name;
        // 搜索
        vm.search=function(){
            sessionStorage.company=JSON.stringify(vm.option);//存储数据
            $state.go('search.companySearch', {page:1, size:9, name:vm.name,data:JSON.stringify(vm.option)}, {reload: true});
        };
        //清除
        vm.clear=function(){
            sessionStorage.removeItem("company");
            vm.data = searchUtil.dataDelete(vm.option);
            $state.go('search.companySearch', {page: 1, size: 9, name:null}, {reload: true});
        };

        projectService.getCompanyMsg(vm.data).then(function(res){
            if (res.data.code==0){
                $scope.paginationConf.totalItems = res.data.total;
                vm.company=res.data.data;
                $scope.paginationConf.showFlag = !$scope.paginationConf.totalItems;
                // 判断找不到页面或找不到内容
                vm.isNotFind = commonUtil.judgeNotFind(res.data);
                // 找不到内容时，是否推荐
                vm.isShowRecommend = "company"
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
        })
    }
]);

