
var app=angular.module("app");
app.controller('jobListCtrl',['$state','projectService','$scope', 'searchOptions','$location','$stateParams','searchUtil','commonUtil',
    function($state,projectService,$scope,searchOptions,$location,$stateParams,searchUtil,commonUtil){
        var vm=this;
        vm.params=$state.params;
        vm.recommend = vm.params.recommend;
        vm.name=vm.params.name;

        if(vm.params.data===null) {
            vm.option=searchOptions;
            vm.data = searchUtil.dataDelete(vm.option);
        }
        else {
            vm.option=JSON.parse(vm.params.data);
        }
        vm.data = searchUtil.dataConvert(vm.option);
        // 判断是最新职位列表还是推荐职位列表，请求不同的数据
        commonUtil.scrollTo(0, 0);
        if (vm.params.judge ==="true") {
            vm.title="最新职位";
            vm.type=0;
            vm.recommend=0
        }
        else if (vm.params.judge==="false") {
            vm.title="推荐职位";
            vm.type=1;
            vm.recommend=1;
        }

        //分页
        $scope.paginationConf = {
            currentPage:  1,
            itemsPerPage:10,
            onChange: function(){
                $state.go('jobList', {
                    page:  $scope.paginationConf.currentPage ,
                    size: $scope.paginationConf.itemsPerPage
                }, {reload: true});
            }
        };
        $scope.paginationConf.currentPage = $stateParams.page;
        $scope.paginationConf.itemsPerPage = $stateParams.size ;
        //分页结束

        vm.checkboxMulti=searchUtil.checkboxMulti;
        vm.radioType=searchUtil.radioType;
        vm.data.page= $scope.paginationConf.currentPage;
        vm.data.size=$scope.paginationConf.itemsPerPage;
        vm.data.name=vm.params.name;
        vm.data.returnTags= 1;
        // 搜索
        vm.search=function(){
            $state.go('jobList', {page:1, size:10, name:vm.name, data:JSON.stringify(vm.option)}, {reload: true});
        };
        //清除
        vm.clear=function(){
            vm.data = searchUtil.dataDelete(vm.option);
            $state.go('jobList', {page: 1, size: 10, name:"",data:null}, {reload: true});
        };
        projectService.getJob(vm.data,vm.recommend).then(function(res){
            if (res.data.code==0){
                $scope.paginationConf.totalItems = res.data.total;
                $scope.jobList=res.data.data;
                $scope.paginationConf.showFlag = !$scope.paginationConf.totalItems;
                // 判断找不到页面或找不到内容
                vm.isNotFind = commonUtil.judgeNotFind(res.data);
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
        });
    }
]);