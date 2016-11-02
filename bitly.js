"use strict";

window.BitlyShorten = (() => {
    return {
        init: () => {
            var shortenButton = $("#shorten-button");
            var longLink = $("#long-link");
            var linkResultContainer = $(".link-result-container");

            shortenButton.click(() => {
                $.getJSON("https://api-ssl.bitly.com/v3/shorten", {
                    access_token: "35a657c20e2b7b41fb8d72ddd04a4f7e61a640cf", 
                    longUrl: longLink.val()
                }).done((result) => {
                    linkResultContainer.empty().append(
                        $("<div></div>").append(
                            $("<pre></pre>").append(result.data.url)
                        )
                    );
                });
            });

            longLink.bind("input", () => {
                shortenButton.prop("disabled", !longLink.val());
            });
        }
    };
})();
