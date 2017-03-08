

angular
    .module('slideShow')
    .component('slideShow', {
        controller: slideShowController,
        templateUrl: "/js/slide-show/slide-show.template.html"
    });

function slideShowController($slideShow) {
    var vm = this;
    vm.data = $slideShow.data;
    vm.close = close;
    vm.onload = onload;
    function close() {
        $slideShow.showSlide(null);
    }
}