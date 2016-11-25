function TodoResource () {}

TodoResource.prototype = {
    handleError : function (error) {
        alert('Error : ' + JSON.stringify(error));
    },
    isError : function (data) {
        if (data.message &&
                typeof data.message === 'string' &&
                data.message instanceof Array) {
            return true;
        } else {
            return false;
        }
    }
};

export default TodoResource;