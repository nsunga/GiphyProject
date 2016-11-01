/*
   This is a very simple example of a web front end for a publicly available web service.
   Due to its pedagogical nature, comments are more elaborate than they typically need to
   be, or may even be present when no developer explanation would usually be necessary.

   Further, this example uses JavaScript ES6 syntax.
*/
"use strict";

// Yes, this is a "global." But it is a single entry point for all of the code in the module,
// and in its role as the overall controller code of the page, this is one of the acceptable
// uses for a [single!] top-level name.
//
// Module managers address even this issue, for web apps of sufficient complexity.
window.GiphySearchController = (() => {
    return {
        init: () => {
            var searchButton = $("#search-button");
            var searchTerm = $("#search-term");
            var randomButton = $("#random-button");
            var trendingButton = $("#trending-button");
            var stickersButton = $("#animated-stickers");
            var imageResultContainer = $(".image-result-container");

            searchButton.click(() => {
                // The getJSON function initiates a connection to the web service.
                $.getJSON("http://api.giphy.com/v1/gifs/search", {
                    rating: "pg-13", // Exercise: Hook this up to the front end.
                    q: searchTerm.val(),
                    api_key: "dc6zaTOxFJmzC" // Giphy's public beta key (thank you Giphy).
                }).done((result) => {
                    // Receiving the response renders it in an HTML element tree then
                    // appends it to the element(s) with the class image-result-container.
                    imageResultContainer.empty().append(
                        result.data.map((image) => {
                            return $("<div></div>").addClass("thumbnail col-xs-3").append([
                                $("<img/>").attr({
                                    src: image.images.fixed_width.url,
                                    alt: image.source_tld
                                }),
                                $("<div></div>").addClass("caption").append(image.url)]
                            );
                        })
                    );
                });
            });

            //RANDOM DOES NOT WORK
            /*randomButton.click(() => {
                $.getJSON("http://api.giphy.com/v1/gifs/random", {
                    api_key: "dc6zaTOxFJmzC",
                    tag: searchTerm.val()
                }).done((result) => {
                    imageResultContainer.empty().append(
                        result.data.map((image) => {
                            return $("<div></div>").addClass("col-xs-2").append(
                                $("<img/>").attr({
                                    src: image.fixed_width_small_url,
                                    alt: image.image_original_url
                                })
                            );
                        })
                    );
                });
            });*/
            stickersButton.click(() => {
                $.getJSON("http://api.giphy.com/v1/stickers/search", {
                    q: searchTerm.val(),
                    rating: "pg-13",
                    api_key: "dc6zaTOxFJmzC"
                }).done((result) => {
                    imageResultContainer.empty().append(
                        result.data.map((image) => {
                            return $("<div></div>").addClass("col-xs-2").append(
                                $("<img/>").attr({
                                    src: image.images.fixed_width.url,
                                    alt: image.source_tld
                                }).addClass("img-thumbnail bg-primary")
                            );
                        })
                    );
                });
            });

            trendingButton.click(() => {
                // The getJSON function initiates a connection to the web service.
                $.getJSON("http://api.giphy.com/v1/gifs/trending", {
                    api_key: "dc6zaTOxFJmzC" // Giphy's public beta key (thank you Giphy).
                }).done((result) => {
                    // Receiving the response renders it in an HTML element tree then
                    // appends it to the element(s) with the class image-result-container.
                    imageResultContainer.empty().append(
                        result.data.map((image) => {
                            return $("<div></div>").addClass("col-xs-2").append(
                                $("<img/>").attr({
                                    src: image.images.fixed_width.url,
                                    alt: image.source_tld
                                }).addClass("img-thumbnail bg-primary")
                            );
                        })
                    );
                });
            });

            searchTerm.bind("input", () => {
                searchButton.prop("disabled", !searchTerm.val());
                randomButton.prop("disabled", !searchTerm.val());
                stickersButton.prop("disabled", !searchTerm.val());
            });
        }
    };
})();