describe("jQuery Bindings", function () {

    var model, textBox, div, User, $;


    // -----------------------------------------------------------------------------------------------------------------

    beforeEach(function () {
        $ = window.$ || window._$;
        User = izi.modelOf({
                               fields: [
                                   {name: "title"}
                               ]
                           });

        model = new User();
        textBox = $("<input type=\"text\"/>").addClass("some-input").appendTo(document.body);
        div = $("<div></div>").addClass("some-div").appendTo(document.body);
    });

    afterEach(function () {
        textBox.remove();
        div.remove();
    });

    // -----------------------------------------------------------------------------------------------------------------

    it("Should bind to value", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-input").val();

        //when
        model.title("Doctor");

        //then
        expect(textBox.val()).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to html", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-div").html();

        //when
        model.title("<strong>Doctor</strong>");

        //then
        expect(div.html()).toEqual($("<div><strong>Doctor</strong></div>").html());

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to text", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-div").text();

        //when
        model.title("<strong>Doctor</strong>");

        //then
        expect(div.text()).toEqual("<strong>Doctor</strong>");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to attribute", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-div").attr("id");

        //when
        model.title("Doctor");

        //then
        expect(div.attr("id")).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to set of attributes", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-div").attr();

        //when
        model.title({
                        id: "Doctor",
                        data: "some-data"
                    });

        //then
        expect(div.attr("id")).toEqual("Doctor");
        expect(div.attr("data")).toEqual("some-data");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to prop", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-input").prop("value");

        //when
        model.title("Doctor");

        //then
        expect(textBox.prop("value")).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to set of props", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-input").prop();

        //when
        model.title({
                        value: "Doctor",
                        disabled: true
                    });

        //then
        expect(textBox.prop("value")).toEqual("Doctor");
        expect(textBox.prop("disabled")).toBe(true);

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to data", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-input").data("value");

        //when
        model.title("Doctor");

        //then
        expect(textBox.data("value")).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to set of data", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-input").data();

        //when
        model.title({
                        value: "Doctor",
                        disabled: true
                    });

        //then
        expect(textBox.data("value")).toEqual("Doctor");
        expect(textBox.data("disabled")).toBe(true);

    }); // -------------------------------------------------------------------------------------------------------------

    xit("Should bind to css", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-div").css("border-color");

        //when
        model.title("#ff0000");

        //then
        expect(div.css("border-color")).toEqual("rgb(255, 0, 0)");

    }); // -------------------------------------------------------------------------------------------------------------

    xit("Should bind to set of css", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-div").css();

        //when
        model.title({color: "#ff0000", border: "1px solid #ff0000"});

        //then
        expect(div.css("color")).toEqual("rgb(255, 0, 0)");
        expect(div.css("border")).toEqual("1px solid rgb(255, 0, 0)");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to jQuery instance", function () {

        //given
        izi.bind().valueOf(model, "title").to$($(".some-div")).html();

        //when
        model.title("Doctor");

        //then
        expect(div.html()).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should bind to DOM element", function () {

        //given
        var element = $(".some-div").get(0);
        izi.bind().valueOf(model, "title").to$(element).html();

        //when
        model.title("Doctor");

        //then
        expect(div.html()).toEqual("Doctor");

    }); // -------------------------------------------------------------------------------------------------------------

    it("Should not bind", function () {

        //given
        izi.bind().valueOf(model, "title").to$(".some-div").html().unbind();

        //when
        model.title("Doctor");

        //then
        expect(div.html()).toEqual("");

    }); // -------------------------------------------------------------------------------------------------------------
});