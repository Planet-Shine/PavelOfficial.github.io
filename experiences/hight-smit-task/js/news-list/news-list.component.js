
angular
    .module('newsList')
    .component('newsList', {
        templateUrl: '/js/news-list/news-list.template.html',
        controller: newsListController
    });

function newsListController () {
    var vm = this;
    vm.list = [
        'item 1',
        'item 2',
        'item 3',
        'item 4',
        'item 5'
    ];
}