
var app=angular.module("app");
app.controller('companyCtrl',['$state','projectService','$scope', 'searchOptions','$location','$stateParams','searchUtil','commonUtil',
    function($state,projectService,$scope,searchOptions,$location,$stateParams,searchUtil,commonUtil){
        var vm=this;
        vm.params=$state.params;

        if(vm.params.data===null) {
            vm.option=searchOptions;
            vm.data = searchUtil.dataDelete(vm.option);
        }
        else {
            vm.option=JSON.parse(vm.params.data);
        }
        vm.data = searchUtil.dataConvert(vm.option);
        commonUtil.scrollTo(0, 0);
        //分页
        $scope.paginationConf = {
            currentPage:  1,
            itemsPerPage:9,
            onChange: function(){
                $state.go('companylist', {
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
        // 搜索
        vm.search=function(){
            $state.go('companylist', {page:1, size:9, data:JSON.stringify(vm.option)}, {reload: true});
        }
        //清除
        vm.clear=function(){
            vm.data = searchUtil.dataDelete(vm.option);
            $state.go('companylist', {page: 1, size: 9, data:null,}, {reload: true});
        }
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