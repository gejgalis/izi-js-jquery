/**
 * @requires namespace.js
 */
!function (module) {

    function matcher($target, property) {
        return property === "value" &&
               $target instanceof $ &&
               $target.is("select");
    }

    function observer($target, sourceProperty, target, targetProperty, transferValueFn) {
        $target.on("change", transferValueFn);
        return function () {
            $target.off("change", transferValueFn);
        }
    }

    function reader($target, property) {
        if ($target.is("select[multiple]")) {
            return $.map($target.find("option:selected"), function (option) {
                return $(option).val();
            });
        } else {
            return $target.find('option:selected').val();
        }
    }

    function writer($target, property, value) {
        if ($target.is("select[multiple]")) {
            var options = $target.prop("options");
            module.utils.forEach(options, function (option) {
                option.selected = module.utils.arrayContains(value, $(option).val());
            });
        } else {
            $target.find("option[value='" + value + "']").prop("selected", true);
        }
        $target.trigger("change");
    }

    module.binding.impl.jquery.selectObserver = module.binding.impl.createObserver(matcher, observer);
    module.binding.impl.jquery.readSelectValue = module.binding.impl.createReader(matcher, reader);
    module.binding.impl.jquery.writeSelectValue = module.binding.impl.createWriter(matcher, writer);
}(izi.module);