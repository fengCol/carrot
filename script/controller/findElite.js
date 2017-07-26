
var app=angular.module("app");
app.controller('findEliteCtrl',['$state','projectService','$scope',
    function($state,projectService,$scope){
        var vm=this;
        vm.active=0;
        vm.myInterval=3000;
        projectService.getArticle(2).then(function(rel){
                   console.log(rel);
                if (rel.data.code==0){
                    $scope.homeArticle=rel.data.data.articleList;
                }
        });
        projectService.getCompanyMsg().then(function(res){
            if (res.data.code==0){
                $scope.company=res.data.data.slice(0,8);
            }
        })
    }
]);