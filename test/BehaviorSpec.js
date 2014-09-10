describe("Behavior", function () {

    var Flower, $;

    function createButton() {
        return document.createElement('button')
    }

    function createTextBox() {
        return document.createElement('input')
    }
    beforeEach(function() {
        $ = window.$ || window._$;
        Flower = izi.modelOf({
                                 fields: [
                                     {name: "color"},
                                     {name: "name"}
                                 ]
                             });
    });

    it("Will execute behavior when button is clicked", function () {

        // given
        var button = createButton(),
            behavior = {
                perform: sinon.spy()
            };

        izi.perform(behavior).when('click').on(button);

        // when
        $(button).click();

        // then
        expect(behavior.perform).toHaveBeenCalled();

    }); // -------------------------------------------------------------------------------------------------------------

    it("Will execute behavior on wrapped button", function () {

        // given
        var button = $(createButton()),
            behavior = {
                perform: sinon.spy()
            };

        izi.perform(behavior).when('click').on(button);

        // when
        button.click();

        // then
        expect(behavior.perform).toHaveBeenCalled();

    }); // -------------------------------------------------------------------------------------------------------------

    it("Will execute behavior when button is clicked or hovered by mouse with shift key", function () {

        // given
        var button = createButton(),
            behavior = {
                perform: sinon.spy()
            };
        izi.perform(behavior).when(izi.events.mouseOver().shift(), 'click').on(button);

        // when
        $(button).click();
        $(button).trigger({type: "mouseover", shiftKey: true});

        // then
        expect(behavior.perform).toHaveBeenCalledTwice();

    }); // -------------------------------------------------------------------------------------------------------------

    it("Will execute behavior when property on model has changed", function () {

        // given
        var model = new Flower(),
            behavior = {
                perform: sinon.spy()
            };
        izi.perform(behavior).whenChangeOf('color', 'name').on(model);

        // when
        model.color("Yellow");
        model.name("Jasmine");

        // then
        expect(behavior.perform).toHaveBeenCalledTwice();

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should add/remove listener on group of behaviors", function () {

        // given
        var model = new Flower(),
            behavior1 = {
                perform: sinon.spy()
            },
            behavior2 = {
                perform: sinon.spy()
            },
            perform = izi.perform();

        // when
        perform(behavior1).whenChangeOf('color').on(model);
        perform(behavior2).whenChangeOf('name').on(model);

        model.color("Yellow");
        model.name("Jasmine");
        expect(behavior1.perform).toHaveBeenCalledOnce();
        expect(behavior2.perform).toHaveBeenCalledOnce();



        // then
        perform.stopObserving();
        model.color("Blue");
        model.name("Rose");
        expect(behavior1.perform).toHaveBeenCalledOnce();
        expect(behavior2.perform).toHaveBeenCalledOnce();
    }); // -------------------------------------------------------------------------------------------------------------

    it("Will stop executing behavior on model change", function () {

        // given

        var model = new Flower(),
            behavior = {
                perform: sinon.spy()
            };
        izi.perform(behavior).whenChangeOf('color', 'name').on(model).stopObserving();

        // when
        model.color("Yellow");
        model.name("Jasmine");

        // then
        expect(behavior.perform).not.toHaveBeenCalled();

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should perform behavior when SHIFT key was pressed during mouse clicking", function () {

        // given
        var button = createButton(),
            behavior = {
                perform: sinon.spy()
            };

        izi.perform(behavior).when(izi.events.click().shift()).on(button);

        // when
        $(button).click();
        $(button).trigger({type: "click", shiftKey: true});

        // then
        expect(behavior.perform).toHaveBeenCalledOnce();

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should throw an exception when izi.events.keyDown() was used", function () {

        // given
        var textBox = createTextBox(),
            behavior = {
                perform: sinon.spy()
            };

        // when
        expect(function () {
            izi.perform(behavior).when(izi.events.keyDown()).on(textBox);
        }).toThrowError("jQuery framework doesn't support keystrokes handling. Instead of izi.events.keyDown()/izi.events.keyUp() please use just plain 'keypress', 'keydown' or 'keyup' strings");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should throw an exception when izi.events.keyUp() was used", function () {

        // given
        var textBox = createTextBox(),
            behavior = {
                perform: sinon.spy()
            };

        // when
        expect(function () {
            izi.perform(behavior).when(izi.events.keyUp()).on(textBox);
        }).toThrowError("jQuery framework doesn't support keystrokes handling. Instead of izi.events.keyDown()/izi.events.keyUp() please use just plain 'keypress', 'keydown' or 'keyup' strings");

    }); // -------------------------------------------------------------------------------------------------------------

});
