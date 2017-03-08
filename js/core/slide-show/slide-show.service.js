

angular
    .module('core.slideShow')
    .factory('$slideShow', function ($rootScope) {
        var data = {
            src: null
        };
        return {
            data: data,
            showSlide: showSlide
        };
        function showSlide(newSrc) {
            data.src = newSrc;
        }
    });