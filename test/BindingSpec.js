describe("Bindings", function () {

    var model, textInput, checkbox, radioGroup, textArea, select, multipleSelect, multipleCheckbox, User, Address,
        $;

    function typeOn(textInput, text) {
        textInput.val(text);
        textInput.trigger("change");
    }

    function clickOn(target) {
        $(target).click().trigger("change");
    }

    beforeEach(function () {
        $ = window.$ || window._$;
        User = izi.modelOf({
                               fields: [
                                   {name: "firstName"},
                                   {name: "lastName"},
                                   {name: "title"},
                                   {name: "hobbies"},
                                   {name: "gender", defaultValue: "male"},
                                   {name: "active", defaultValue: false},
                                   {name: "address"}
                               ],

                               init: function () {
                                   this.hobbies([]);
                               },

                               getFullName: function () {
                                   return this.firstName() + ' ' + this.lastName();
                               }
                           });
        Address = izi.modelOf({
                                  fields: [
                                      {name: "city"},
                                      {name: "country"}
                                  ]
                              });


        model = new User();
        textInput = $('<input type="text"/>').appendTo("body");
        textArea = $('<textarea></textarea>').appendTo("body");
        radioGroup = $('<input type="radio" name="gender" value="male" checked/>' +
                       '<input type="radio" name="gender" value="female"/>').appendTo("body");
        checkbox = $('<input type="checkbox"/>').appendTo("body");
        select = $('<select>' +
                   '<option value="male">Male</option>' +
                   '<option value="female">Female</option>' +
                   '</select>').appendTo("body");
        multipleSelect = $('<select multiple>' +
                           '<option value="cars" selected>Cars</option>' +
                           '<option value="movies" selected>Movies</option>' +
                           '</select>').appendTo("body");
        multipleCheckbox = $('<input type="checkbox" value="cars" checked/>' +
                             '<input type="checkbox" value="movies" checked/>').appendTo("body");
    });

    afterEach(function () {
        textInput.remove();
        textArea.remove();
        radioGroup.remove();
        checkbox.remove();
        select.remove();
        multipleSelect.remove();
        multipleCheckbox.remove();
    });

    it("Should bind typed text from text input to model", function () {

        //given
        izi.bind().valueOf(textInput).to(model, "title");

        //when
        typeOn(textInput, "Doctor");

        //then
        expect(model.title()).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind typed text from textarea to model", function () {

        //given
        izi.bind().valueOf(textArea).to(model, "title");

        //when
        typeOn(textArea, "Doctor");

        //then
        expect(model.title()).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------


    it("Should bind model to text input", function () {

        //given
        izi.bind().valueOf(model, "title").to().valueOf(textInput);

        //when
        model.title("Doctor");

        //then
        expect(textInput.val()).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------


    it("Should bind model to text area", function () {

        //given
        izi.bind().valueOf(model, "title").to().valueOf(textArea);

        //when
        model.title("Doctor");

        //then
        expect(textArea.val()).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind checkbox value to model", function () {

        //given
        izi.bind().valueOf(checkbox).to(model, "active");
        expect(model.active()).toBe(false);

        //when
        clickOn(checkbox);

        //then
        expect(model.active()).toBe(true);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind model to checkbox", function () {

        //given
        izi.bind().valueOf(model, "active").to().valueOf(checkbox);
        expect(checkbox.prop("checked")).toBe(false);

        //when
        model.active(true);

        //then
        expect(checkbox.prop("checked")).toBe(true);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind multiple checkboxes value to model", function () {

        //given
        izi.bind().valueOf(multipleCheckbox).to(model, "hobbies");
        expect(model.hobbies()).toEqual(["cars", "movies"]);

        //when
        clickOn(multipleCheckbox.get(1));

        //then
        expect(model.hobbies()).toEqual(["cars"]);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind model to multiple checkbox", function () {

        //given
        izi.bind().valueOf(model, "hobbies").to().valueOf(multipleCheckbox);
        expect(multipleCheckbox.get(0).checked).toBe(false);
        expect(multipleCheckbox.get(1).checked).toBe(false);

        //when
        model.hobbies(["cars", "movies"]);

        //then
        expect(multipleCheckbox.get(0).checked).toBe(true);
        expect(multipleCheckbox.get(1).checked).toBe(true);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind radio group value to model", function () {

        //given
        izi.bind().valueOf(radioGroup).to(model, "gender");
        expect(model.gender()).toBe("male");

        //when
        clickOn(radioGroup.get(1));

        //then
        expect(model.gender()).toBe("female");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind model to radio group", function () {

        //given
        izi.bind().valueOf(model, "gender").to().valueOf(radioGroup);
        expect(radioGroup.get(0).checked).toBe(true);
        expect(radioGroup.get(1).checked).toBe(false);

        //when
        model.gender("female");

        //then
        expect(radioGroup.get(0).checked).toBe(false);
        expect(radioGroup.get(1).checked).toBe(true);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind select value to model", function () {

        //given
        izi.bind().valueOf(select).to(model, "gender");
        expect(model.gender()).toBe("male");

        //when
        select.prop("selectedIndex", 1);
        select.trigger("change");

        //then
        expect(model.gender()).toBe("female");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind model to select", function () {

        //given
        izi.bind().valueOf(model, "gender").to().valueOf(select);
        expect(select.find("option[value=male]").prop("selected")).toBe(true);
        expect(select.find("option[value=female]").prop("selected")).toBe(false);

        //when
        model.gender("female");

        //then
        expect(select.find("option[value=male]").prop("selected")).toBe(false);
        expect(select.find("option[value=female]").prop("selected")).toBe(true);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind multiple select value to model", function () {

        //given
        izi.bind().valueOf(multipleSelect).to(model, "hobbies");
        expect(model.hobbies()).toEqual(["cars", "movies"]);

        //when
        multipleSelect.find("option[value=cars]").prop("selected", false);
        multipleSelect.trigger("change");

        //then
        expect(model.hobbies()).toEqual(["movies"]);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind model to multiple select", function () {

        //given
        izi.bind().valueOf(model, "hobbies").to().valueOf(multipleSelect);
        expect(multipleSelect.find("option[value=cars]").prop("selected")).toBe(false);
        expect(multipleSelect.find("option[value=movies]").prop("selected")).toBe(false);

        //when
        model.hobbies(["cars", "movies"]);

        //then
        expect(multipleSelect.find("option[value=cars]").prop("selected")).toBe(true);
        expect(multipleSelect.find("option[value=movies]").prop("selected")).toBe(true);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind two way", function () {

        //given
        izi.bind().valueOf(model, "title").to().valueOf(textInput).twoWay();

        //when
        model.title("Doctor");
        //then
        expect(textInput.val()).toEqual("Doctor");

        //when
        typeOn(textInput, "Lawyer");
        //then
        expect(model.title()).toEqual("Lawyer");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind two way for nested fields", function () {

        //given
        model.address(new Address().set({city: "New York", country: "US"}));
        izi.bind({debug: true}).valueOf(model, "address.city").to().valueOf(textInput).twoWay();
        izi.bind().valueOf(model, "address.country").to().valueOf(textArea).twoWay();

        expect(textInput.val()).toEqual("New York");
        expect(textArea.val()).toEqual("US");

        //when
        typeOn(textInput, "London");
        typeOn(textArea, "UK");

        //then
        expect(model.address().city()).toEqual("London");
        expect(model.address().country()).toEqual("UK");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should not bind", function () {

        typeOn(textInput, "Doctor");

        //given
        izi.bind().valueOf(textInput).to(model, "title").unbind();

        //when
        typeOn(textInput, "Another title");

        //then
        expect(model.title()).toEqual("Doctor");
    }); // -------------------------------------------------------------------------------------------------------------
});