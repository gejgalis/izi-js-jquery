/**
 * @requires namespace.js
 */
!function (module) {
    module.binding.impl.jquery.writeVal = function () {

        function writer($target, property, value) {
            $target.val(value);
            $target.trigger("change");
        }

        function matcher($target, property) {
            return property === "value" && $target instanceof $;
        }

        return module.binding.impl.createWriter(matcher, writer);
    }();
}(izi.module);