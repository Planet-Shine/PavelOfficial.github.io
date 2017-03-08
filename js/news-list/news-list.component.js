
angular
    .module('newsList')
    .component('newsList', {
        templateUrl: '/js/news-list/news-list.template.html',
        controller: newsListController
    });

function newsListController ($vk, $slideShow) {
    var vm = this;
    vm.data = $vk.data;
    vm.showSlide = showSlide;

    function showSlide(url) {
        $slideShow.showSlide(url);
    };
}