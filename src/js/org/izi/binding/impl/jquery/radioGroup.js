/**
 * @requires namespace.js
 */
!function (module) {

    function matcher($target, sourceProperty, target, targetProperty, transferValueFn) {
        return sourceProperty === "value" &&
               $target instanceof $ &&
               $target.is("input[type=radio]");
    }

    function observer($target, sourceProperty, target, targetProperty, transferValueFn) {
        $target.on("change", transferValueFn);
        return function () {
            $target.off("change", transferValueFn);
        }
    }

    function reader($target, property) {
        var value;
        $target.each(function (index, radio) {
            if (radio.checked) {
                value = radio.value;
                return false;
            }
            return true;
        });
        return value;
    }

    function writer($target, property, value) {
        $target.each(function (index, radio) {
            radio.checked = radio.value === value;
        });
        $target.trigger("change");
    }

    module.binding.impl.jquery.radioGroupObserver = module.binding.impl.createObserver(matcher, observer);
    module.binding.impl.jquery.readRadioGroupValue = module.binding.impl.createReader(matcher, reader);
    module.binding.impl.jquery.writeRadioGroupValue = module.binding.impl.createWriter(matcher, writer);
}(izi.module);