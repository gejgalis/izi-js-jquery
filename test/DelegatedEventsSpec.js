describe("Behavior with delegated event", function () {

    var wrapper, otherButton, button, behavior, click, $;

    beforeEach(function () {
        $ = window.$ || window._$;
        wrapper = $('<div id="wrapper"><button id="otherButton"></button></div>').appendTo($("body"));
        otherButton = $("#otherButton");
        button = $("<button class='removeButton'></button>");
        behavior = {
            perform: sinon.spy()
        };
        click = $.iziDelegate("click");
    }); // -------------------------------------------------------------------------------------------------------------

    afterEach(function () {
        wrapper.remove();
    }); // -------------------------------------------------------------------------------------------------------------

    it("Will execute behavior on delegated event using single arguments", function () {

        // given
        izi.perform(behavior).when($.iziDelegate("click")(".removeButton")).on(wrapper);

        // when
        wrapper.append(button);
        button.click();

        // then
        expect(behavior.perform).toHaveBeenCalled();
    }); // -------------------------------------------------------------------------------------------------------------

    it("Will execute behavior on delegated using two arguments", function () {

        // given
        izi.perform(behavior).when($.iziDelegate("click", ".removeButton")).on(wrapper);

        // when
        wrapper.append(button);
        button.click();

        // then
        expect(behavior.perform).toHaveBeenCalled();
    }); // -------------------------------------------------------------------------------------------------------------

    it("Will execute behavior on DOM element", function () {

        // given
        var domElement = wrapper.get(0);
        izi.perform(behavior).when(click(".removeButton")).on(domElement);

        // when
        wrapper.append(button);
        button.click();

        // then
        expect(behavior.perform).toHaveBeenCalled();
    }); // -------------------------------------------------------------------------------------------------------------

    it("Will execute behavior on selector", function () {

        // given
        izi.perform(behavior).when(click(".removeButton")).on("#wrapper");

        // when
        wrapper.append(button);
        button.click();

        // then
        expect(behavior.perform).toHaveBeenCalled();
    }); // -------------------------------------------------------------------------------------------------------------

    it("Will not execute behavior on other button", function () {

        // given
        izi.perform(behavior).when(click(".removeButton")).on(wrapper);

        // when
        wrapper.append(button);
        otherButton.click();

        // then
        expect(behavior.perform).not.toHaveBeenCalled();
    }); // -------------------------------------------------------------------------------------------------------------

    it("Will not execute behavior when stopped", function () {

        // given
        izi.perform(behavior).when(click(".removeButton")).on(wrapper).stopObserving();

        // when
        wrapper.append(button);
        button.click();

        // then
        expect(behavior.perform).not.toHaveBeenCalled();
    }); // -------------------------------------------------------------------------------------------------------------

});
