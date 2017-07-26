app.config(projectRouteConfig);
function projectRouteConfig($stateProvider,$urlRouterProvider){
    //懒加载
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };
    $urlRouterProvider.when("","/home");
    $stateProvider
        /*首页*/
        .state("home",{
            url:"/home",
            templateUrl:"view/home.html",
            controller:"homeCtrl",
            controllerAs:"vm",
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载登录的js和css文件
                    [
                        'style/my/home.css',
                        'script/controller/homeCtrl.js'
                    ]
                )
            }
        })
        //找职位公司搜索和职位搜索的顶部
        .state("search",{
            url:"/search",
            params:{judge:''},
            templateUrl:"view/search.html",
            controller:"searchCtrl",
            controllerAs:"vm",
            cache:false,
            resolve:{
                loadMyFile:_lazyLoad(
                    [
                        'style/my/findJob/search.css',
                        'script/controller/search.js'
                    ]
                )
            }
        })
        //最新职位和推荐职位
        .state("jobList",{
            url:"/jobList?judge&name&page&size&data&recommend",
            params:{name:'',page:'1',size:'9',recommend:'',data:null},
            templateUrl:"view/jobList.html",
            controller:"jobListCtrl",
            controllerAs:"vm",
            cache:false,
            resolve:{
                loadMyFile:_lazyLoad(
                    [
                        'style/my/jobList.css',
                        'script/controller/jobListCtrl.js'
                    ]
                )
            }
        })
        /*搜索职位页*/
        .state("search.jobSearch",{
            url:"/jobSearch&name&page&size",
            params:{name:'',page:'1',size:'10',option:'',data:null},
            templateUrl:"view/jobList.html",
            controller:"jobSearch",
            controllerAs:"vm",
            cache:false,
            resolve:{
                loadMyFile:_lazyLoad(
                    [
                        'style/my/findJob/search.css',
                        'script/controller/search.js',
                        'style/my/jobList.css',
                        'script/controller/findJobs/jobSearch.js'
                    ]
                )
            }
        })
        /*找职位公司搜索页*/
        .state("search.companySearch",{
            url:"/companySearch?name&page&size",
            params:{name:'',option:'',page:'1',size:'9',data:null},
            templateUrl:"view/companySearch.html",
            controller:"companySearch",
            controllerAs:"vm",
            cache:false,
            resolve:{
                loadMyFile:_lazyLoad(
                    [
                        'style/my/findJob/companySearch.css',
                        'script/controller/findJobs/companySearch.js'
                    ]
                )
            }
        })
        /*找精英更多合作公司页*/
        .state("companylist",{
            url:"/companylist?name&page&size",
            params:{name:'',page:'1',size:'9',data:null},
            templateUrl:"view/companylist.html",
            controller:"companyCtrl",
            controllerAs:"vm",
            cache:false,
            resolve:{
                loadMyFile:_lazyLoad(
                    [
                        'style/my/companyList.css',
                        'script/controller/companyCtrl.js'
                    ]
                )
            }
        })
        /*找职位*/
        .state("findJobs", {
            url: "/findJobs",
            templateUrl: "view/findJobs.html",
            controller:"findJobs",
            controllerAs:"vm",
            resolve: {
                loadMyFile: _lazyLoad(
                //懒加载home的js和css文件
                    [
                        'style/my/findJob/findJobs.css',
                        'script/controller/findJobs/findJobs.js'
                    ]
                )
            }
        })
        /*找精英*/
        .state("findElite", {
            url:"/findElite",
            templateUrl: "view/findElite.html",
            controller:"findEliteCtrl",
            controllerAs:"vm",
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载article的js和css文件
                    [
                        'style/my/findElite.css',
                        'script/controller/findElite.js'
                    ]
                )
            }
        })
        /*关于我们*/
        .state("about", {
            url:"/about",
            templateUrl: "view/about.html",
            params:{select:''},
            controller:"aboutCtrl",
            controllerAs:"vm",
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载article的js和css文件
                    [
                        'style/my/about.css',
                        'script/controller/aboutCtrl.js'
                    ]
                )
            }
        })
        /*职位详情页*/
        .state("jobDescription",{
            url:"/jobDescription?page&size&id",
            templateUrl:"view/jobDescription.html",
            controller:"jobDescription",
            controllerAs:"vm",
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载home的js和css文件
                    [
                        "style/my/findJob/jobDescription.css",
                        "script/controller/findJobs/jobDescription.js"
                    ]
                )
            }
        })
        /*公司详情页*/
        .state("companyDescription",{
            url:"/companyDescription?page&size&id&companyId",
            templateUrl:"view/companyDescription.html",
            controller:"companyDescription",
            controllerAs:"vm",
            resolve:{
                loadMyFile:_lazyLoad(
                    [
                        'style/my/findJob/companyDescription.css',
                        'script/controller/findJobs/companyDescription.js'
                    ]
                )
            }
        })
        //公司详情页中的公司详情
        .state("companyDescription.companyProduct",{
            url:"/companyProduct",
            templateUrl:"view/companyProduct.html",
            controller:"companyProduct",
            controllerAs:"vm",
            resolve:{
                loadMyFile:_lazyLoad(
                    [
                        'style/my/findJob/companyDescription.css',
                        'script/controller/findJobs/companyProduct.js'
                    ]
                )
            }
        })
        //公司详情页在招职位
        .state("companyDescription.recruitJob",{
            url:"/recruitJob",
            templateUrl:"view/recruitJob.html",
            controller:"recruitJob",
            controllerAs:"vm",
            resolve:{
                loadMyFile:_lazyLoad(
                    [
                        'style/my/findJob/companyDescription.css',
                        'script/controller/findJobs/recruitJob.js'
                    ]
                )
            }
        })

}


