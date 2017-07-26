/**
 * Created by Administrator on 2017/6/23.
 */
app.directive('notFind', function ($state, projectService) {
    return {
        restrict: 'EA',
        templateUrl: 'view/notfind.html',
        replace: true,
        scope: {
            size: '@',
            showrecommend: '@'
        },
        link: function (scope, element, attrs) {
            var data = {};
           data.size = scope.size;

            //获取推荐数据
            if (scope.showrecommend === "company") {
                projectService.getCompanyMsg(data).then(function (res) {
                    if (res.data.code == 0) {
                        scope.companyList = res.data.data;
                    }
                });
            } else if (scope.showrecommend === "position") {
                projectService.getJob(data,1).then(function (res) {
                    if (res.data.code == 0) {
                        scope.jobList = res.data.data;
                    }
                });
            }

        }
    }
});