/**
 * name: tm.pagination
 * Version: 1.0.0 beta
 */

angular.module('tm.pagination', []).directive('tmPagination',[function(){
    return {
        restrict: 'EA',
        template:
            '<div class="page-list">' +
                '<ul class="pagination" ng-show="conf.totalItems > 0">' +
                '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="firstPage()"><span>首页</span></li>' +
                '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()" ng-show="conf.currentPage !== 1"><span>&lsaquo;</span></li>' +
                '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
                    'ng-click="changeCurrentPage(item)">' +
                        '<span>{{ item }}</span>' +
                     '</li>' +
                    '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()" ng-show="conf.currentPage !== conf.numberOfPages"><span>&rsaquo;</span></li>' +
                    '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="lastPage()"><span>末页</span></li>' +
                '</ul>' +
                '<div class="page-total" ng-show="conf.totalItems > 0">' +
                     // '/共<strong>{{ conf.totalItems }}</strong>条 ' +
                    '去第<input type="text" ng-model="jumpPageNum"/>'+'页' +
                    '<span>'+
                          '<a ng-click="jumpPage()">确定</a>'+
                    '</span>' +
                '</div>' +
            '</div>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {

            var conf = scope.conf;

            // 默认分页长度
            var defaultPagesLength = 5;

            // 默认每页的个数
            var defaultPerPage = 10;//没用，已在list.js中定义

            // 获取分页长度
            if(conf.pagesLength) {//为空、数值0、null、NaN、undefined的话是false，为非零数值或者字符串的话true
                // 判断一下分页长度
                conf.pagesLength = parseInt(conf.pagesLength, 10);


                if(!conf.pagesLength) {//为空、数值0、null、NaN、undefined的话就执行下列语句
                    conf.pagesLength = defaultPagesLength;
                }

                // 分页长度必须为奇数，如果传偶数时，自动处理
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }

            } else {
                conf.pagesLength = defaultPagesLength
            }

            // // // 分页选项可调整每页显示的条数,没用到这，把select框改为了文本框
            // if(!conf.perPageOptions){//为空、数值0、null、NaN、undefined的话就执行下列语句
            //     conf.perPageOptions = defaultPerPageOptions;
            // }

            // pageList数组
            function getPagination(newValue, oldValue) {
                // conf.currentPage
                if(conf.currentPage) {//为非零数值或者字符串的话ture
                    conf.currentPage = parseInt(scope.conf.currentPage, 10);
                }

                if(!conf.currentPage) {//为空、数值0、null、NaN、undefined的话就执行下列语句
                    conf.currentPage = 1;
                }

                // conf.totalItems
                if(conf.totalItems) {//为非零数值或者字符串的话ture
                    conf.totalItems = parseInt(conf.totalItems, 10);
                }

                // conf.totalItems

                if(!conf.totalItems) {//为空、数值0、null、NaN、undefined的话就执行下列语句
                    conf.totalItems = 0;
                    return;
                }
                
                // conf.itemsPerPage ，//没用，已在list.js中定义
                if(conf.itemsPerPage) {//为非零数值或者字符串的话ture
                    conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                }
                if(!conf.itemsPerPage) {//为空、数值0、null、NaN、undefined的话就执行下列语句
                    conf.itemsPerPage = defaultPerPage;
                }

                // numberOfPages，得出要分几页，并将结果向上取整
                conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);

                // 如果分页总数>0，并且当前页大于分页总数
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }

                // // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                // var perPageOptionsLength = scope.conf.perPageOptions.length;//没有用了

                // // 定义状态
                // var perPageOptionsStatus;
                // for(var i = 0; i < perPageOptionsLength; i++){
                //     if(conf.perPageOptions[i] == conf.itemsPerPage){
                //         perPageOptionsStatus = true;
                //     }
                // }
                // // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                // if(!perPageOptionsStatus){//为空、数值0、null、NaN、undefined的话就执行下列语句
                //     conf.perPageOptions.push(conf.itemsPerPage);
                // }

                // // 对选项进行sort
                // conf.perPageOptions.sort(function(a, b) {return a - b});
                

                // 页码相关，
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    for(var i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // 左边没有...
                        for(i = 1; i <= offset + 1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                    }else if(conf.currentPage > conf.numberOfPages - offset){
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(conf.numberOfPages - i);
                        }
                        scope.pageList.push(conf.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        // scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
                            scope.pageList.push(conf.currentPage - i);
                        }
                        scope.pageList.push(conf.currentPage);
                        for(i = 1; i <= offset / 2; i++){
                            scope.pageList.push(conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                    }
                }
                scope.$parent.conf = conf;
            }

            // prevPage
            scope.prevPage = function() {
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                }
                getPagination();
                conf.onChange();

            };
            //firstPage
            scope.firstPage = function() {
                if (conf.currentPage == 1) {
                    return
                }
                else {
                    conf.currentPage = 1;
                    getPagination();
                    conf.onChange();
                }
            };
            //lastPage
            scope.lastPage = function() {
                if (conf.currentPage == conf.numberOfPages) {
                    return
                }
                else {
                    conf.currentPage = conf.numberOfPages;
                    getPagination();
                    conf.onChange();

                }
            };
            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                }
                getPagination();
                conf.onChange();

            };

            // 变更当前页
            scope.changeCurrentPage = function(item) {
                if(item === '...'||conf.currentPage == item){
                    return;
                }else{
                    conf.currentPage = item;
                    getPagination();
                    conf.onChange();
                }
            };

            // 跳转页
            scope.jumpPage = function() {
                var num = scope.jumpPageNum;
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);

                    if(num && num != conf.currentPage) {
                        if(num > conf.numberOfPages) {
                            num = conf.numberOfPages;
                        }
                    }
                }
                else if(num=="") {//当未输入值时，跳转回第一页
                    num = 1;
                }
                // 跳转
                conf.currentPage = num;
                conf.itemsPerPage= scope.conf.itemsPerPage;
                getPagination();
                conf.onChange();

                scope.jumpPageNum = '';
            };
            scope.$watch('conf.totalItems', function(value, oldValue) {
                getPagination();
            })
        }
    };
}]);
