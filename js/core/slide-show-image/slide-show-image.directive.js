

angular
    .module('core.slideShowImage')
    .directive('slideShowImage', function () {
        return function (scope, element) {
            element.on('load', function () {
                setTimeout(function () {
                    var img = element[0];
                    if (img.clientHeight >  img.clientWidth) {
                        img.style.height = parseInt(window.innerHeight * 0.8 , 10) + 'px';
                    }
                }, 0);
            });
        }
    });

