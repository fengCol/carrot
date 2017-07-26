app.controller("searchCtrl",["$scope","$state",function ($scope,$state) {
    var vm=this;
    vm.hash=window.document.location.hash;//判断url的hash值
    vm.option = vm.hash.substr(9,13);//截取指定的url字符串
    vm.params = $state.params;
    //判断状态，根据vm.isSelect的状态来保存状态
    if(vm.params.option === true){
        vm.isSelect = true;
    }else if(vm.params.option === false){
        vm.isSelect = false
    }else if(vm.option==='companySearch'){
        vm.isSelect = false;
    }else{
        vm.isSelect = true;
    }
    vm.exchangeJob = function (isSelect) {
        if(isSelect == false || isSelect == undefined){
            vm.isSelect = !vm.isSelect;
        }
    };
}]);
