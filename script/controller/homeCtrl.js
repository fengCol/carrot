var app=angular.module("app");
app.controller('homeCtrl',['$state','projectService','$scope','commonUtil',
    function($state,projectService,$scope,commonUtil){
        var vm=this;
        vm.params = $state.params;
        //首页banner
        vm.active=0;
        vm.myInterval=3000;
        carouselConfig(3000);
        projectService.getArticle(0).then(function (res){
            if (res.data.code==0){
              vm.homeArticle=res.data.data.articleList;

        }
    });

        projectService.getJob().then(function(rel){
            if (rel.data.code==0){
                vm.homejob=rel.data.data;

            }
        })
}])
