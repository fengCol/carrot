/**
 * Created by Administrator on 2017/6/16.
 */
// 搜索面板;
app.constant('searchOptions', {
    province: [
        {name: '不限', choose: true},
        {type: 1, name: '北京', choose: false}
    ],
    industry: [
        {name: '不限', choose: true},
        {type: 0, name: '移动互联网', choose: false},
        {type: 1, name: '电子商务', choose: false},
        {type: 2, name: '企业服务', choose: false},
        {type: 3, name: 'O2O', choose: false},
        {type: 4, name: '教育', choose: false},
        {type: 5, name: '金融', choose: false},
        {type: 6, name: '游戏', choose: false}
    ],
    compensation: [
        {name: '不限', choose: true},
        {type: 0, name: '8K以下', choose: false},
        {type: 1, name: '8-10K', choose: false},
        {type: 2, name: '10-15K', choose: false},
        {type: 3, name: '15-20K', choose: false},
        {type: 4, name: '20K以上', choose: false}
    ], education: [
        {name: '不限', choose: true},
        {type: 0, name: '高中', choose: false},
        {type: 1, name: '大专', choose: false},
        {type: 2, name: '本科', choose: false},
        {type: 3, name: '硕士', choose: false},
        {type: 4, name: '博士及以上', choose: false}

    ], experience: [
        {name: '不限', choose: true},
        {type: 0, name: '无', choose: false},
        {type: 1, name: '应届', choose: false},
        {type: 2, name: '0-1年', choose: false},
        {type: 3, name: '1-2年', choose: false},
        {type: 4, name: '3-5年', choose: false},
        {type: 5, name: '6-9年', choose: false},
        {type:6,name:'10年以上',choose: false}

    ], updateAt: [
        {name: '不限', choose: true},
        {type: 0, name: '24h内', choose: false},
        {type: 1, name: '三天内', choose: false},
        {type: 2, name: '七天内', choose: false}
    ],
    financing: [
        {name: '不限', choose: true},
        {type: 0, name: '无需融资', choose: false},
        {type: 1, name: '天使轮', choose: false},
        {type: 2, name: 'A轮', choose: false},
        {type: 3, name: 'B轮', choose: false},
        {type: 4, name: 'C轮', choose: false},
        {type: 5, name: 'D轮及以上', choose: false},
        {type: 6, name: '上市公司', choose: false}
    ]
});
app.constant('jobWantedTypes',{
    category:[
        {name: '不限', choose: true},
        {type: 0, name: '产品', choose: false},
        {type: 1, name: '运营', choose: false},
        {type: 2, name: '技术', choose: false},
        {type: 3, name: '设计', choose: false},
        {type: 4, name: '测试', choose: false}
    ]
});

// begin 找职位面板的分类列表
// 一级分类
app.constant('jobType', [
    {type: 1, name: "用户体验"},
    {type: 2, name: "研发"},
    {type: 3, name: "大数据"}
]);
//二级分类
app.constant('secondType', [
    {type: 1, name: "产品"},
    {type: 2, name: "UI"},
    {type: 3, name: "QA"},
    {type: 4, name: "Android"},
    {type: 5, name: "IOS"},
    {type: 6, name: "WEB"},
    {type: 7, name: "OP"},
    {type: 8, name: "JAVA"},
    {type: 9, name: "NLP"},
    {type: 10, name: "DM"},
    {type: 11, name: "DL"}
]);
// end 找职位面板的分类列表


//  begin 独立过滤器所需
//薪资水平
app.constant('compensationtype', [
    {type: 0, name: '8K以下', choose: false},
    {type: 1, name: '8-10K', choose: false},
    {type: 2, name: '10-15K', choose: false},
    {type: 3, name: '15-20K', choose: false},
    {type: 4, name: '20K以上', choose: false}
]);
//公司行业
app.constant('industrytype', [
    {type: 0, name: '移动互联网'},
    {type: 1, name: '电子商务'},
    {type: 2, name: '企业服务'},
    {type: 3, name: 'O2O'},
    {type: 4, name: '教育'},
    {type: 5, name: '金融'},
    {type: 6, name: '游戏'}
]);
//    融资规模 financing
app.constant('financingtype', [
    {type: 0, name: '无需融资'},
    {type: 1, name: '天使轮'},
    {type: 2, name: 'A轮'},
    {type: 3, name: 'B轮'},
    {type: 4, name: 'C轮'},
    {type: 5, name: 'D轮及以上'},
    {type: 6, name: '上市公司'}
]);
//  工作经验 experience
app.constant('experiencetype', [
    {type: 0, name: '无'},
    {type: 1, name: '应届'},
    {type: 2, name: '0-1年'},
    {type: 3, name: '1-2年'},
    {type: 4, name: '3-5年'},
    {type: 5, name: '6-9年'},
    {type: 6, name: '10年以上'}

]);
//     学历要求 education
app.constant('educationtype', [
    {type: 0, name: '高中'},
    {type: 1, name: '大专'},
    {type: 2, name: '本科'},
    {type: 3, name: '硕士'},
    {type: 4, name: '博士及以上'}

]);
//发布时间 updateAt
app.constant('updateAttype', [
    {type: 0, name: '今天'},
    {type: 1, name: '昨天'}
]);
//三期新增，用于过滤人才报告
app.constant('positionConstent', {
    //职业分类
    positionList: [
        {type: 0, name: 'ui设计师'},
        {type: 1, name: '运维工程师'},
        {type: 2, name: '产品经理'},
        {type: 3, name: 'Java工程师'},
        {type: 4, name: 'IOS工程师'},
        {type: 5, name: 'Android工程师'},
        {type: 6, name: 'Web前端工程师'}
    ],
    //经验
    experience: [
        {type: 0, name: '无'},
        {type: 1, name: '应届'},
        {type: 2, name: '0-1年'},
        {type: 3, name: '1-2年'},
        {type: 4, name: '3-5年'},
        {type: 5, name: '6-9年'},
        {type: 6, name: '10年以上'}
    ]
});
app.constant('companyConstent', {
    //职业分类
    workStatus: [
        {type: 0, name: '离职，可快速上岗'},
        {type: 1, name: '离职，一个月可上岗'},
        {type: 2, name: '偶尔加班'}
    ],
    companyPop: [
        {type: 0, name: '1-10人'},
        {type: 1, name: '10-20人'},
        {type: 2, name: '30-50人'},
        {type: 3, name: '50-100人'},
        {type: 4, name: '100-200人'},
        {type: 5, name: '200-500人'},
        {type: 6, name: '500-1000人'},
        {type: 7, name: '1000人以上'}
    ],
    companyTag:[
        {type:0,name:'管理扁平化'},
        {type:1,name:'发展前景好'},
        {type:2,name:'成长空间大'},
        {type:3,name:'五险一金'},
        {type:4,name:'股票期权'},
        {type:5,name:'系统培训'},
        {type:6,name:'免费旅游'},
        {type:7,name:'餐补'},
        {type:8,name:'固定团建'},
        {type:9,name:'年底双薪'},
        {type:10,name:'高效自由'},
        {type:11,name:'氛围好'},
        {type:12,name:'大牛带领'},
        {type:13,name:'弹性工作制'},
        {type:14,name:'带薪假期'},
        {type:15,name:'平台广阔'},
        {type:16,name:'免费零食'}
    ]
});









