var $ = require('jquery');

$(function () {
    var doc = $(document),
        addTodoButton = $('.add-todo-button'),
        startBottomPosition = 30;

    function setNewPositionOfAddButton () {
        var scrollTop = doc.scrollTop();
        addTodoButton.css('bottom', (startBottomPosition - scrollTop) + 'px');
    }

    doc.scroll(function () {
        setNewPositionOfAddButton();
    });
    setNewPositionOfAddButton();
});

