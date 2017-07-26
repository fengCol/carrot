var app=angular.module("app");
app.controller("findJobs",function ($scope,projectService,$state,$http) {
    var vm = this;
    vm.params = $state.params;
    vm.active = 0;//水平轮播
    vm.active1 = 0;//垂直轮播
    vm.isChoose = false;
    vm.params.size=100;
    //选择菜单
    projectService.getJobList().then(function successCallback(res) {
        vm.list = res.data.data;
    });
    //轮播图
    projectService.getArticle(1).then(function successCallback(res) {
        if(res.data.code===0){
            vm.bannerImage = res.data.data.articleList;
        }
        //bootbox的模态框
        else {
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
    vm.exchangeJob = function (isChoose) {
        if(isChoose == false || isChoose == undefined){
            vm.isChoose = !vm.isChoose;
        }
    };
    /*推荐职位*/
    projectService.getJob(vm.params,1).then(function successCallback(res) {
        if(res.data.code===0){
            vm.properJobTotal =res.data.data;
            vm.properJob = vm.properJobTotal.slice(0,8);
        }
        //bootbox的模态框
        else {
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
    //最新职位
    projectService.getJob(vm.params,0).then(function successCallback(res) {
        if(res.data.code===0) {
            vm.newJobTotal = res.data.data;
            vm.newJob = vm.newJobTotal.slice(0, 8);
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


//请求最新认证公司信息
    projectService.getCompanyMsg("","").then(function successCallback(response) {
        if (response.data.code === 0) {
            vm.findJobRecommendCompany = response.data.data[0];
        }
        else {
            bootbox.alert({
                buttons: {
                    ok: {
                        label: '关闭',
                        className: 'btn-danger'
                    }
                },
                message: '最新认证公司：' + response.data.message,
                title: "提示"
            });
        }
    });

    //请求最新发布过职位公司信息，先请求最新职位
    // 先定义数组
    var companyId =[];
    var norepeat = [];//去重之后的数组
    var normolCompany = [];
    var approvedCompany = [];
    var hirringJob = [];
    var approvedCompanyId=[];//存认证公司id用来获取热招职位

    // 先请求最新职位
    projectService.getJob({size:100},0).then(function successCallback(response) {
        if (response.data.code === 0) {
            //将职位的companyID取出来，放在一个数组。
            for (var i=0;i<response.data.data.length;i++) {
                companyId.push(response.data.data[i].companyId);
            }
            // 将数组去重
            for (var n=0;n<companyId.length;n++) {
                if(norepeat.indexOf(companyId[n])===-1) {
                    norepeat.push(companyId[n])
                }
            }
        }
        else {
            bootbox.alert({
                buttons: {
                    ok: {
                        label: '关闭',
                        className: 'btn-danger'
                    }
                },
                message: '最新职位：' + response.data.message,
                title: "提示"
            });
        }
    })
        .then(function () {
            // 请求每个公司信息，区分认证与非认证
            // 中间变量，主要为了使得异步请求之后的数据能相对应上
            var m=0;
            var k=0;
            var l=0;
            function getcompany() {
                if (m>=norepeat.length) {
                    return
                }
                projectService.companyDescription(norepeat[m]).then(function successCallBack(response) {
                    if (response.data.code===0) {
                        if (response.data.data.company.approved === 0) {
                            // 普通公司
                            normolCompany.push(response.data.data);
                            vm.findJobNormalCompany = normolCompany.slice(0,8);
                            m++;
                            getcompany();
                        }
                        else if (response.data.data.company.approved === 1) {
                            // 认证公司
                            approvedCompany.push(response.data.data);
                            approvedCompanyId.push(response.data.data.company.id);
                            m++;
                            vm.findJobApprovedCompany = approvedCompany.slice(0,4);
                            k++;
                            // 请求热招职位
                            projectService.getJob({companyId:approvedCompanyId[k-1]},"").then(function successCallBack(response) {
                                if (response.data.code===0&&l < 4) {
                                    hirringJob.push(response.data.data);
                                    vm.findJobApprovedCompany[l].hirring = response.data.data;
                                    l++;
                                }
                            });
                            getcompany();
                        }
                    }
                    else {
                        bootbox.alert({
                            buttons: {
                                ok: {
                                    label: '关闭',
                                    className: 'btn-danger'
                                }
                            },
                            message: '推荐公司：' + response.data.message,
                            title: "提示"
                        });
                    }
                })
            }
            getcompany();
        });
});
