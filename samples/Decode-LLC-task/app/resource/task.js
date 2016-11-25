var TodoResource = require('./todoResource');

function TaskResource ($resource) {
    this.$resource = $resource;
}

TaskResource.prototype = Object.create(TodoResource.prototype);
TaskResource.prototype.constructor = TaskResource;

TaskResource.prototype.$resource = null;

TaskResource.prototype.request = function (actionName, options) {
    var url = 'https://api-test-task.decodeapps.io/tasks',
        $resource = this.$resource,
        method,
        result;

    if (actionName === 'fetch' &&
        options.session &&
        options.project_id &&
        options.paging_size &&
        options.paging_offset) {

        options = {
            session            : options.session,
            project_id         : options.project_id,
            paging_size        : options.paging_size,
            paging_offset      : options.paging_offset,
            condition_keywords : options.condition_keywords || ''
        };
        method = {
            'get' : {
                method:'GET'
            }
        };
        result = $resource(url, options, method);
    } else if (actionName === 'fetch' &&
        options.task_id) {
        options = {
            'task_id' : options['task_id']
        };
        url     = url + '/task';
        method  = {
            'get' : {method:'GET'}
        };
        result  = $resource(url, options, method);
    } else if (actionName === 'create') {
        options = {};
        url     = url + '/task';
        method  = {
            'save' : {method : 'POST'}
        };
        result  = $resource(url, options, method);
    } else if (actionName === 'update' &&
        options.session &&
        options.Task &&
        options.Task.id &&
        options.Task.title) {
        options = {
            'session' : options.session,
            'Task' : {
                'id' : options.Task.id,
                'title' : options.Task.title,
                'description' : options.Task.description || ''
            }
        };
        url     = url + '/task';
        method  = {
            'save' : {method : 'POST'}
        };
        result  = $resource(url, options, method);
    } else if (actionName === 'delete' &&
        options.session &&
        options.task_id) {
        url     = url + '/task';
        method  = {
            'delete' : {method : 'DELETE'}
        };
        result  = $resource(url, options, method);
    } else if (actionName === 'complete' &&
        options.session &&
        options.Task &&
        options.Task.id) {
        options = {
            'session' : options.session,
            'Task' : {
                'id' : options.Task.id
            }
        };
        url     = url + '/task/complite'; // complite — это не ошибка, такой сервис.
        method  = {
            'save' : {method : 'POST'}
        };
        result  = $resource(url, options, method);
    } else {
        throw new TypeError("Tasks access. Not legal request options.");
    }

    return result;
};

export default (todoModule) => {
    todoModule.factory('$taskResource', ['$resource', function ($resource) {
        return new TaskResource($resource);
    }]);
};