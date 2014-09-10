!function (module) {
    module.queue.impl.jQuery = {
        createEventDispatcher: function () {
            return document.createElement("span");
        },

        dispatchEvent: function (dispatcher, eventType, eventParameters) {
            $(dispatcher).trigger(eventType, eventParameters);
        }
    };
}(izi.module);