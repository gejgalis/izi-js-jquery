/**
 * @requires behavior/impl/jQuery.js
 * @requires binding/impl/jQuery.js
 * @requires queue/impl/jQuery.js
 */
!function(module) {
    var frameworkName = "jquery";

    module.registerFramework(frameworkName, {
        binding: module.binding.impl.jQuery,
        behavior: module.behavior.impl.jQuery,
        queue: module.queue.impl.jQuery
    });

    izi = izi.newInstance(frameworkName);

}(izi.module);