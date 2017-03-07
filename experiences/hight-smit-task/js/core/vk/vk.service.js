
/*globals vk, constsб Promise */

angular
    .module('core.vk')
    .factory('$vk', function ($http, $location) {
        var $vk = {
            searchQuery: '',
            news: [],
            authUser: authUser,
            loadNews: loadNews
        };
        return $vk;
        function authUser() {
            var hash = $location.hash(),
                accessTokenMatch = hash.match(/access_token=([^&]*)&?/),
                authWebsitePromise;
            if (accessTokenMatch && accessTokenMatch[1]) {
                vk.accessToken = accessTokenMatch[1];
                $location.hash('');
                authWebsitePromise = vk.authWebsite(consts.APP_ID, []);
                return authWebsitePromise;
                // console.log(accessTokenMatch[1]);
            } else {
                location.href = consts.AUTH_URL
                    .replace('{client_id}', consts.APP_ID)
                    .replace('{redirect_uri}', encodeURIComponent(location.href));
            }
        }
        function loadNews(searchQuery) {
            if (searchQuery) {
                vk.newsfeed.get({
                    q: searchQuery,
                    count: 10,
                    version: 5.62
                }).then(function (result) {
                    console.log(result);
                }, function (error) {
                    console.log('error : ' + error);
                });
            } else {
                vk.newsfeed.get({
                    count: 10,
                    version: 5.62
                }).then(function (result) {
                    console.log(result);
                }, function (error) {
                    console.log('error : ' + error);
                });
            }
        }
    });