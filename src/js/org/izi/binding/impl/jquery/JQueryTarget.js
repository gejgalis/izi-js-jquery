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