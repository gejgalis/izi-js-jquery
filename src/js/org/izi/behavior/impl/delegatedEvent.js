$.iziDelegate = function (event, subSelector) {

    function when($target, action, scope) {
        var handler = $.proxy(action, scope);
        $target = $target instanceof $ ? $target : $($target);
        $target.on(event, subSelector, handler);
        return function () {
            $target.off(event, subSelector, handler);
        }
    }

    if (subSelector) {
        return when;
    } else {
        return function (selector) {
            subSelector = selector;
            return when;
        }
    }
};