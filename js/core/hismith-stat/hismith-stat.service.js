
angular
    .module('core.hismithStat')
    .factory('hismithStat', function ($http) {
        return {
            sendQueryStat: sendQueryStat
        };
        function sendQueryStat(query) {
            var request = {
                method: 'POST',
                url: 'http://ft.dev.hismith.ru/stat/create/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    query: query
                }
            };
            $http(request).then(function (r) {
                // console.log(r);
            }).catch(function (r) {
                // console.log(r);
            });
        }
    });
