/**
 * Created by Administrator on 2017/6/21.
 */
app.factory('searchUtil', function () {
    return {
        //搜索多选
        checkboxMulti: function (ind, arr) {
            if (ind === 0) {
                arr.forEach(function (item) {
                    item.choose = false
                });
                arr[0].choose = true
            } else {
                arr[ind].choose = !arr[ind].choose;
                arr[0].choose = false;
                if (arr.every(function (item) {
                        return item.choose === false
                    })) {
                    arr[0].choose = !arr[0].choose;
                }
            }
        },
        //搜索单选
        radioType: function (ind, arr) {
            arr[ind].choose = !arr[ind].choose;
            arr.forEach(function (item, index) {
                if (index !== ind) {
                    item.choose = false
                }
                else if (arr.every(function (item) {
                        return item.choose == false
                    })) {
                    arr[0].choose = true;
                }
            })
        },
        //数据转数组
        dataConvert: function (data) {
            //转换为字符串
            var asdas = {};
            var dataname;
            for (dataname in data) {
                asdas[dataname] = data[dataname].filter(function (item, index) {
                    return item.choose === true
                });
                asdas[dataname] = asdas[dataname].map(function (item) {
                    return item.type
                });
                asdas[dataname] = asdas[dataname].toString()
            }
            return asdas;
        },
        //清空搜索数据
        dataDelete: function (option) {
            angular.forEach(option, function (data) {
                angular.forEach(data, function (data1) {
                    if (data1.choose) {
                        data1.choose = false
                    }
                    if (data1.name == '不限') {
                        data1.choose = true
                    }
                })
            })

        },
        //hiringJobs页 搜索数据转换
        jobclassifyactivesChange: function (obj) {
            // 过滤出选中的搜tag
            var data = obj.filter(function (item) {
                return (item.choose === true);
            });
            // 搜索tag的格式转换
            data = data.map(function (item) {
                return item.type
            });
            return data.toString();
        },
        //findElite数据转换
        //转换服务器上接收到的string为数字
        changeToNumber: function (data) {
            return angular.forEach(data, function (item, name) {
                return data[name] = !isNaN(item) && item != "" ? +item : item;
            })
        },
        //转换字符串数组为数组
        changeToArry: function (data, pname) {
            angular.forEach(data, function (item) {
                item[pname] = JSON.parse(item[pname])
            })
            return data
        }

    }
});
