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