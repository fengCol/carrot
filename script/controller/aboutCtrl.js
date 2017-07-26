
var app=angular.module("app");
app.controller('aboutCtrl',['$state','$scope','commonUtil',function($state,$scope,commonUtil){
    var vm=this;
    vm.toggle = false;
    vm.params = $state.params;
    vm.toggle = $state.params.select;
    commonUtil.scrollTo(0,0);
    vm.option=function (toggle) {
        if(toggle==false || toggle==undefined){
            vm.toggle = !vm.toggle;
        }
    }
}]);