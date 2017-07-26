/**
 * Created by Administrator on 2017/6/10.
 */
var app=angular.module('app',  ["ui.router","oc.lazyLoad","ngAnimate","ui.bootstrap","tm.pagination"]);

app.config(httpConfig);
app.run(function ($rootScope, $state, $stateParams, $window) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.currentState = $state;
    })
});

function httpConfig($httpProvider) {
    // Set x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // Set up global transformRequest function
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
}

function carouselConfig(time) {
    $('.carousel').carousel({
        interval: time // in milliseconds
    });
}