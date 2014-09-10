/**
 * @requires delegatedEvent.js
 */
!function (module) {
    module.behavior.impl.jQuery = {

        defaultPerformFunction: "perform",

        observeWidget: function (widget, eventConfig, action, scope, options) {

            var $widget = widget instanceof $ ? widget : $(widget);

            function eventHandler(event) {
                if (!event) {

                    return action.apply(scope, arguments);

                } else if (eventConfig.matchesModifiers(!!event.shiftKey, !!event.controlKey, !!event.altKey)) {

                    if (eventConfig.shouldStopPropagation()) {
                        event.stopPropagation();
                    }
                    if (eventConfig.shouldPreventDefault()) {
                        event.preventDefault();
                    }

                    return action.apply(scope, arguments);
                }
            }

            var eventType = eventConfig.getEventType();

            $widget.on(eventType, eventHandler);
            return function () {
                $widget.off(eventType, eventHandler);
            }
        },

        observeKeyStroke: function (widget, keyboardConfig, action, scope, options) {
            throw new Error("jQuery framework doesn't support keystrokes handling. Instead of izi.events.keyDown()/izi.events.keyUp() please use just plain 'keypress', 'keydown' or 'keyup' strings");
        }
    };
}(izi.module);