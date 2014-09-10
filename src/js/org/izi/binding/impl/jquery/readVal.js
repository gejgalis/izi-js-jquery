/**
 * @requires namespace.js
 */
!function (module) {
    module.binding.impl.jquery.readVal = function () {

        function reader($target, property) {
            return $target.val();
        }

        function matcher($target, property) {
            return property === "value" && $target instanceof $;
        }

        return module.binding.impl.createReader(matcher, reader);
    }();
}(izi.module);