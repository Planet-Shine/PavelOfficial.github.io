
angular
    .module('searchForm')
    .component('searchForm', {
        templateUrl: '/js/search-form/search-form.template.html',
        controller: searchFormController
    });

function searchFormController($vk, hismithStat) {
    var vm = this,
        data = $vk.data;
    this.data = data;
    vm.onSubmit = function () {
        hismithStat.sendQueryStat(data.searchQuery);
        $vk.setSearchQuery();
    };
}