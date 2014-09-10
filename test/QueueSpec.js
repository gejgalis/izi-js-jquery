describe("Queue", function () {

    var texts, $;

    function callAndPushText(text) {
        return function () {
            texts.push(text);
        };
    }

    beforeEach(function () {
        $ = window.$ || window._$;
        texts = [];
    });

    it("Should dispatch events", function () {

        // given
        var queue = izi.queue().push(
            callAndPushText("One"),
            callAndPushText("Two")
        );
        izi.perform(callAndPushText("taskStarted")).when("taskStarted").on(queue);
        izi.perform(callAndPushText("taskFinished")).when("taskFinished").on(queue);
        izi.perform(callAndPushText("queueFinished")).when("queueFinished").on(queue);

        // when
        queue.start();

        // then
        expect(texts).toEqual(["taskStarted",
                               "One",
                               "taskFinished",
                               "taskStarted",
                               "Two",
                               "taskFinished",
                               "queueFinished"]);
    });

});
