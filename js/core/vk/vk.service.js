
/*globals vk, constsб Promise */

angular
    .module('core.vk')
    .factory('$vk', function ($http, $location, $rootScope) {
        var data = {
            error: null,
            searchQuery: '',
            news: []
        };
        var $vk = {
            data: data,
            authUser: authUser,
            loadNews: loadNews,
            setSearchQuery: setSearchQuery
        };
        return $vk;
        function authUser(callback) {
            VK.Auth.login(callback);
        }
        function mergeFromName(response) {
            var items = response.wall,
                profiles = response.profiles,
                groups = response.groups;
            function getName(id) {
                var item;
                if (id > 0) {
                    item = (profiles.filter(function (profile) {
                        return profile.uid === id;
                    })[0] || {});
                    return (item.first_name || '') + ' ' + (item.last_name || '');
                }
                item = (groups.filter(function (group) {
                    return group.gid === -id;
                })[0] || {});
                return (item.name || '');
            }
            items.forEach(function (item) {
                item.from_name = getName(item.from_id) || '';
            });
            return items;
        }
        function setSearchQuery() {
            if (!data.searchQuery) {
                return loadNews();
            }
            VK.Api.call(
                'wall.search',
                {
                    query: data.searchQuery,
                    owner_id: consts.TARGET_ID,
                    count: consts.NEWS_COUNT,
                    extended: 1,
                    fields: 'name,first_name,last_name'
                },
                function (r) {
                    $rootScope.$apply(function () {
                        if (r.response) {
                            data.news = mergeFromName(r.response);
                        }
                        if (r.error) {
                            data.error = r.error;
                        }
                    });
                }
            );
        }
        function loadNews() {
            VK.Api.call(
                'wall.get',
                {
                    owner_id: consts.TARGET_ID,
                    count: consts.NEWS_COUNT,
                    offset: consts.NEWS_OFFSET,
                    extended: 1,
                    fields: 'name,first_name,last_name'
                },
                function (r) {
                    $rootScope.$apply(function () {
                        if (r.response) {
                            data.news = mergeFromName(r.response);
                        }
                        if (r.error) {
                            data.error = r.error;
                        }
                    });
                }
            );
        }
    });