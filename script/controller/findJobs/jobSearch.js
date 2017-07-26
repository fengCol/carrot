
var app=angular.module("app");
app.controller('jobSearch',['$state','projectService','$scope', 'searchOptions','$location','$stateParams','searchUtil','commonUtil',
    function($state,projectService,$scope,searchOptions,$location,$stateParams,searchUtil,commonUtil){
        var vm=this;
        vm.params=$state.params;
        vm.name=vm.params.name;
        if(vm.params.data===null) {
            vm.option=searchOptions;
            vm.data = searchUtil.dataDelete(vm.option);
        }
        else {
            vm.option=JSON.parse(vm.params.data);
        }
        vm.data = searchUtil.dataConvert(vm.option);
        commonUtil.scrollTo(0, 0);

        vm.name = vm.data.name;
        vm.option=searchOptions;
        //分页
        $scope.paginationConf = {
            currentPage:  1,
            itemsPerPage:10,
            onChange: function(){
                $state.go('search.jobSearch', {
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
        vm.data.returnTags= 1;
        // 搜索
        vm.search=function(){
            $state.go('search.jobSearch', {page:1, size:10, name:vm.name,data:JSON.stringify(vm.option)}, {reload: true});
        };
        //清除
        vm.clear=function(){
            vm.data = searchUtil.dataDelete(vm.option);
            $state.go('search.jobSearch', {page: 1, size: 10, name:null}, {reload: true});
        };
        projectService.getJob(vm.data).then(function(res){
            if (res.data.code==0){
                $scope.paginationConf.totalItems = res.data.total;
                $scope.jobList=res.data.data;
                $scope.paginationConf.showFlag = !$scope.paginationConf.totalItems;
                // 判断找不到页面或找不到内容
                vm.isNotFind = commonUtil.judgeNotFind(res.data);
                console.log(vm.isNotFind);
                // 找不到内容时，是否推荐
                vm.isShowRecommend = "position"
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
    }]);