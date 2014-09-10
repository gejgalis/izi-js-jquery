/**
 * @requires namespace.js
 */
!function (module) {
    module.binding.impl.jquery.textFieldObserver = function () {

        var inputEvents = "change input textInput keyup dragdrop propertychange";

        function matcher($target, sourceProperty, target, targetProperty, transferValueFn) {
            return sourceProperty === "value" &&
                   $target instanceof $ &&
                   ($target.is("input[type=text]") ||
                    $target.is("textarea") ||
                    $target.is("input[type=password]") ||
                    $target.is("input:not([type])"));
        }

        function observer($target, sourceProperty, target, targetProperty, transferValueFn) {

            $target.on(inputEvents, transferValueFn);

            return function () {
                $target.off(inputEvents, transferValueFn);
            }
        }

        return module.binding.impl.createObserver(matcher, observer);
    }();
}(izi.module);