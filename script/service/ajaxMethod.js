/**
 * Created by Administrator on 2017/6/10.
 */
app.factory('projectService',function($http,path){
    return{
        //轮播Article
        getArticle:function(type){
            return $http.get(path.article_url(type));
        },
        //职位分类
        getJobList:function () {
            return $http.get(path.jobList_url());
        },
        //获取职业
        getJob:function (data,type) {
            return $http.get(path.getJob_url(type||0),{params:data});
        },
        //获取公司信息
        getCompanyMsg:function (data,type) {
            return $http.get(path.getCompanyMsg_url(type||''),{params:data});
        },
        //职位详情
        jobDescription:function (id) {
            return $http.get(path.jobDescription_url(id));
        },
        //公司详情
        companyDescription:function (id) {
            return $http.get(path.companyDescription_url(id));
        }

    }

});