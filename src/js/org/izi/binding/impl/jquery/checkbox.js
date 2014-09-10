/**
 * @requires namespace.js
 */
!function (module) {

    function matcher($target, sourceProperty, target, targetProperty, transferValueFn) {
        return sourceProperty === "value" &&
               $target instanceof $ &&
               $target.is("input[type=checkbox]");
    }

    function observer($target, sourceProperty, target, targetProperty, transferValueFn) {
        $target.on("change", transferValueFn);
        return function () {
            $target.off("change", transferValueFn);
        }
    }

    function reader($target, property) {
        if ($target.length > 1) {
            var value = [];
            $target.each(function (index, checkbox) {
                if (checkbox.checked) {
                    value.push(checkbox.value);
                }
            });
            return value;
        } else {
            return $target.prop("checked");
        }
    }

    function writer($target, property, value) {
        if ($target.length > 1) {
            $target.each(function (index, radio) {
                radio.checked = module.utils.arrayContains(value, radio.value);
            });
        } else {
            $target.prop("checked", value);
        }
        $target.trigger("change");
    }

    module.binding.impl.jquery.checkBoxObserver = module.binding.impl.createObserver(matcher, observer);
    module.binding.impl.jquery.readCheckBoxValue = module.binding.impl.createReader(matcher, reader);
    module.binding.impl.jquery.writeCheckBoxValue = module.binding.impl.createWriter(matcher, writer);
}(izi.module);