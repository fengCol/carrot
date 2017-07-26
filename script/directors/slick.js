/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/7/5 18:50
 */
app.directive('slickSlider',function($timeout){
    return {
        restrict: 'A',
        link: function(scope,element,attrs) {
            $timeout(function() {
                    $(element).slick(scope.$eval(attrs.slickSlider));
                },
                [1000]
            );
        }
    }
});