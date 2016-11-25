export default (todoController)=> {
    todoController.directive('profileInfo', function () {
        return {
            template : require('./profileInfo.directive.template.html')
        };
    });
};