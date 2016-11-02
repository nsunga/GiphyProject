"use strict";

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
                $.getJSON("http://api.giphy.com/v1/gifs/search", {
                    rating: "pg-13",
                    q: searchTerm.val(),
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

            //RANDOM DOES NOT WORK
            randomButton.click(() => {
                $.getJSON("http://api.giphy.com/v1/gifs/random", {
                    api_key: "dc6zaTOxFJmzC",
                    tag: searchTerm.val(),
                    rating: "pg-13"
                }).done((result) => {
                    imageResultContainer.empty().append(
                        $("<div></div>").append(
                            $("<img/>").attr({
                                src: result.datai.mage_url
                            }).addClass("img-thumbnail bg-primary")
                        )
                    );
                });
            });

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
                $.getJSON("http://api.giphy.com/v1/gifs/trending", {
                    api_key: "dc6zaTOxFJmzC",
                    rating: "pg-13"
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

            searchTerm.bind("input", () => {
                searchButton.prop("disabled", !searchTerm.val());
                stickersButton.prop("disabled", !searchTerm.val());
            });
        }
    };
})();