var TodoResource = require('./todoResource');

function AccountResource ($resource) {
    this.$resource = $resource;
}

AccountResource.prototype = Object.create(TodoResource.prototype);
AccountResource.prototype.constructor = AccountResource;

AccountResource.prototype.$resource = null;

AccountResource.prototype.request = function (actionName, options) {
    var host = 'https://api-test-task.decodeapps.io/',
        $resource = this.$resource,
        url,
        method,
        result;

    if (actionName === 'signup') {
        options = {};
        url = host + actionName;
        method = {
            'save' : {method:'POST'}
        };
        result = $resource(url, options, method);
    } else if (actionName === 'session' && options['session']) {
        options = {
            'session' : options['session']
        };
        url     = host + actionName;
        method  = {
            'get' : {method:'GET'}
        };
        result  = $resource(url, options, method);
    } else if (actionName === 'account' && options['session']) {
        options = {
            'session' : options['session']
        };
        url     = host + actionName;
        method  = {
            'get'  : {method : 'GET'}
        };
        result  = $resource(url, options, method);
    } else {
        throw new TypeError("Account access. Not legal request options.");
    }

    return result;
};




export default (todoModule) => {
    todoModule.factory('$accountResource', ['$resource', function ($resource) {
        return new AccountResource($resource);
    }]);
};