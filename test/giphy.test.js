describe("Giphy search", function () {
    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("search.fixture.html");
        window.GiphySearchController.init();
    });

    afterEach(() => {
        fixture.cleanup();
    });

    it("should start with an empty search field", () => {
        expect($("#search-term").val()).toBe("");
    });

    it("should start with a disabled search button", () => {
        expect($("#search-button").prop("disabled")).toBe(true);
    });

    it("should start with a disabled Animated Stickers button", () => {
        expect($("#animated-stickers").prop("disabled")).toBe(true);
    });

    it("should start with a disabled I'm Feeling Lucky! button", () => {
        expect($("#translate-button").prop("disabled")).toBe(false);       
    });

    describe("search button", () => {
        var searchTerm;
        var searchButton;

        beforeEach(() => {
            searchTerm = $("#search-term");
            searchButton = $("#search-button");
        });

        it("should be enabled when the search field is not blank", () => {
            // Programmatic changes to elements do not trigger events on their own, so in unit tests
            // we need to trigger those programmatically as well.
            searchTerm.val("i can haz unit tests").trigger("input");
            expect(searchButton.prop("disabled")).toBe(false);
        });

        it("should be disabled when the search field is blank", () => {
            searchTerm.val("").trigger("input");
            expect(searchButton.prop("disabled")).toBe(true);
        });
    });

    describe("translate button", () => {
        var searchTerm;
        var translateButton;

        beforeEach(() => {
            searchTerm = $("#search-term");
            translateButton = $("#translate-button");
        });

        it("should be enabled when the search field is not blank", () => {
            // Programmatic changes to elements do not trigger events on their own, so in unit tests
            // we need to trigger those programmatically as well.
            searchTerm.val("i can haz unit tests").trigger("input");
            expect(translateButton.prop("disabled")).toBe(false);
        });

        it("should be disabled when the search field is blank", () => {
            searchTerm.val("").trigger("input");
            expect(translateButton.prop("disabled")).toBe(true);
        });
    });

    describe("animated stickers button", () => {
        var searchTerm;
        var stickersButton;

        beforeEach(() => {
            searchTerm = $("#search-term");
            stickersButton = $("#animated-stickers");
        });

        it("should be enabled when the search field is not blank", () => {
            // Programmatic changes to elements do not trigger events on their own, so in unit tests
            // we need to trigger those programmatically as well.
            searchTerm.val("i can haz unit tests").trigger("input");
            expect(stickersButton.prop("disabled")).toBe(false);
        });

        it("should be disabled when the search field is blank", () => {
            searchTerm.val("").trigger("input");
            expect(stickersButton.prop("disabled")).toBe(true);
        });
    });

    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#search-term").val("hello");
            $("#search-button").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a Giphy search when the search button is clicked", () => {
            expect(request.url).toBe("http://api.giphy.com/v1/gifs/search?rating=pg-13&q=hello&api_key=dc6zaTOxFJmzC");
        });

        it("should populate the image container when search results arrive", () => {
            expect($(".image-result-container").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "tumblr.com",
                        images: {
                            fixed_width: {
                                url: "http://media2.giphy.com/media/FiGiRei2ICzzG/200w.gif"
                            }
                        }
                    }]
                })
            });

            expect($(".image-result-container").children().length).toBe(1);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });

    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#search-term").val("hello");
            $("#animated-stickers").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a Giphy search when the Stickers button is clicked", () => {
            expect(request.url).toBe("http://api.giphy.com/v1/stickers/search?q=hello&api_key=dc6zaTOxFJmzC");
        });

        it("should populate the image container when search results arrive", () => {
            expect($(".image-result-container").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "tumblr.com",
                        images: {
                            fixed_width: {
                                url: "http://media2.giphy.com/media/sj0sbNi9cv2dG/200w.gif"
                            }
                        }
                    }]
                })
            });

            expect($(".image-result-container").children().length).toBe(1);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });

    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#search-term").val("hello");
            $("#translate-button").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a Giphy search when the Translate button is clicked", () => {
            expect(request.url).toBe("http://api.giphy.com/v1/stickers/translate?s=hello&api_key=dc6zaTOxFJmzC");
        });

        it("should populate the image container when search results arrive", () => {
            expect($(".image-result-container").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "gifbay.com",
                        images: {
                            fixed_width: {
                                url: "http://media1.giphy.com/media/11eZCNibwDFx6w/200w.gif"
                            }
                        }
                    }]
                })
            });

            expect($(".image-result-container").children().length).toBe(1);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });

    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#search-term").val();
            $("#translate-button").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a Giphy search when the Translate button is clicked", () => {
            expect(request.url).toBe("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC");
        });

        it("should populate the image container when search results arrive", () => {
            expect($(".image-result-container").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "televandalist.com",
                        images: {
                            fixed_width: {
                                url: "http://media0.giphy.com/media/op7uqYWBm3R04/200w.gif"
                            }
                        }
                    }]
                })
            });

            expect($(".image-result-container").children().length).toBe(1);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });
});
