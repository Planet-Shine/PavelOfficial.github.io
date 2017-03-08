angular
    .module('vkNewsBox')
    .component('vkNewsBox', {
        'templateUrl': '/js/vk-news-box/vk-news-box.template.html',
        'controller': vkNewsBoxController
    });

function vkNewsBoxController($vk) {
    $vk.authUser(function () {
        $vk.loadNews();
    });
}