describe("Bitly shorten", function () {
    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("search.fixture.html");
        window.BitlyShorten.init();
    });

    afterEach(() => {
        fixture.cleanup();
    });

    it("should start with an empty link field", () => {
        expect($("#long-link").val()).toBe("");
    });

    it("should start with a disabled shorten button", () => {
        expect($("#shorten-button").prop("disabled")).toBe(true);
    });

    describe("search button", () => {
        var longLink;
        var shortenButton;

        beforeEach(() => {
            longLink = $("#long-link");
            shortenButton = $("#shorten-button");
        });

        it("should be enabled when the link field is not blank", () => {
            // Programmatic changes to elements do not trigger events on their own, so in unit tests
            // we need to trigger those programmatically as well.
            longLink.val("i can haz unit tests").trigger("input");
            expect(shortenButton.prop("disabled")).toBe(false);
        });

        it("should be disabled when the link field is blank", () => {
            longLink.val("").trigger("input");
            expect(shortenButton.prop("disabled")).toBe(true);
        });
    });

    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#long-link").val("http://google.com");
            $("#shorten-button").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a Bitly shorten when the shorten button is clicked", () => {
            expect(request.url).toBe(
                "https://api-ssl.bitly.com/v3/shorten?access_token=" + 
                "35a657c20e2b7b41fb8d72ddd04a4f7e61a640cf&longUrl=http%3A%2F%2Fgoogle.com"
                );
        });

        it("should populate the link container when results arrive", () => {
            expect($(".link-result-container").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: {
                        url: "http://bit.ly"
                    }
                })
            });

            expect($(".link-result-container").children().length).toBe(1);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });

});