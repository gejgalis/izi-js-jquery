/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 izi-js contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global) {
    function amdFactory($, izi) {

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
!function (module) {
    module.binding.impl.jquery = {};
}(izi.module);
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
!function (module) {

    var JQueryTarget = function org_izi_binding_impl_jquery_JQueryTarget(config) {
        this.config = config;
    };

    JQueryTarget.prototype.val = function () {
        var target = this.config.target;
        return this.createBinding(function (value) {
            target.val(value);
        });
    };

    JQueryTarget.prototype.html = function () {
        var target = this.config.target;
        return this.createBinding(function (value) {
            target.html(value);
        });
    };

    JQueryTarget.prototype.text = function () {
        var target = this.config.target;
        return this.createBinding(function (value) {
            target.text(value);
        });
    };

    JQueryTarget.prototype.attr = function (attributeName) {
        var target = this.config.target;
        return this.createBinding(function (value) {
            if (attributeName) {
                target.attr(attributeName, value);
            } else {
                target.attr(value);
            }
        });
    };

    JQueryTarget.prototype.css = function (propertyName) {
        var target = this.config.target;
        return this.createBinding(function (value) {
            if (propertyName) {
                target.css(propertyName, value);
            } else {
                target.css(value);
            }
        });
    };

    JQueryTarget.prototype.prop = function (propertyName) {
        var target = this.config.target;
        return this.createBinding(function (value) {
            if (propertyName) {
                target.prop(propertyName, value);
            } else {
                target.prop(value);
            }
        });
    };

    JQueryTarget.prototype.data = function (propertyName) {
        var target = this.config.target;
        return this.createBinding(function (value) {
            if (propertyName) {
                target.data(propertyName, value);
            } else {
                target.data(value);
            }
        });
    };

    /**
     * @private
     * @param {Function} targetFunction
     * @returns {module.binding.Binding}
     */
    JQueryTarget.prototype.createBinding = function (targetFunction) {
        return new module.binding.Binding(this.config.withTarget(targetFunction));
    };

    /**
     * @member module.binding.ValueOf
     * @param {String|HTMLElement|jQuery} selectorOrElementOr$
     * @returns {module.binding.impl.jquery.JQueryTarget}
     */
    module.binding.ValueOf.prototype.to$ = function (selectorOrElementOr$) {
        var target = selectorOrElementOr$ instanceof $ ? selectorOrElementOr$ : $(selectorOrElementOr$);
        this.config.target = target;
        return new module.binding.impl.jquery.JQueryTarget(this.config);
    };

    module.binding.impl.jquery.JQueryTarget = JQueryTarget;
}(izi.module);
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
/**
 * @requires jquery/checkbox.js
 * @requires jquery/JQueryTarget.js
 * @requires jquery/radioGroup.js
 * @requires jquery/readVal.js
 * @requires jquery/select.js
 * @requires jquery/textFieldObserver.js
 * @requires jquery/writeVal.js
 */
!function (module) {
    module.binding.impl.jQuery = {

        changeObservers: [
            module.binding.impl.jquery.textFieldObserver,
            module.binding.impl.jquery.checkBoxObserver,
            module.binding.impl.jquery.radioGroupObserver,
            module.binding.impl.jquery.selectObserver
        ],

        valueReaders: [
            module.binding.impl.jquery.readCheckBoxValue,
            module.binding.impl.jquery.readRadioGroupValue,
            module.binding.impl.jquery.readSelectValue,
            module.binding.impl.jquery.readVal,
            module.binding.impl.readByCapitalizedGetter,
            module.binding.impl.readFromOwnedProperty,
            module.binding.impl.readByFunction,
            module.binding.impl.readByGet,
            module.binding.impl.readFromProperty
        ],

        valueWriters: [
            module.binding.impl.jquery.writeCheckBoxValue,
            module.binding.impl.jquery.writeRadioGroupValue,
            module.binding.impl.jquery.writeSelectValue,
            module.binding.impl.jquery.writeVal,
            module.binding.impl.writeByFunction,
            module.binding.impl.writeByCapitalizedSetter,
            module.binding.impl.writeToOwnedProperty,
            module.binding.impl.writeToFunction,
            module.binding.impl.writeBySet,
            module.binding.impl.writeToProperty
        ]
    };
}(izi.module);
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
        return izi;
    }

    if (typeof define === "function" && typeof define.amd === "object" && define.amd.vendor !== "dojotoolkit.org") {
        define(["jquery", "izi-js"], amdFactory);
    } else if (typeof exports === 'object') {
        module.exports = amdFactory(require("jquery"), require("izi-js"));
    } else {
        global.izi = amdFactory(global.$, global.izi);
    }
})(this);