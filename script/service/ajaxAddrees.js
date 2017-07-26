/**
 * Created by Administrator on 2017/6/10.
 */
app.factory('path',function($http,$state){
    return{
        //轮播article
        article_url:function(type){
            return "/carrots-ajax/a/article/search?type="+type;
        },
        //职位分类
        jobList_url:function () {
            return "script/service/findJobs.json";
        },
        //搜索职业
        getJob_url:function (type) {
            return "/carrots-ajax/a/profession/search?recommend="+type;
        },
        //获取公司信息
        getCompanyMsg_url:function (type) {
            return "/carrots-ajax/a/company/search?approve="+type;
        },
        //职位详情
        jobDescription_url: function (id) {
            return "/carrots-ajax/a/profession/"+id
        },
        //公司详情
        companyDescription_url:function (id) {
            return "/carrots-ajax/a/company/"+id
        }
    };
});