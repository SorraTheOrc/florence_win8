// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/widget/widget.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var widgetFrame = document.getElementById("widgetFrame");
            var height = document.documentElement.clientHeight;
            widgetFrame.height = height;
            if (WinJS.Navigation.state.indexOf("image") !== -1) {
                widgetFrame.src = "ms-appx-web:///widget/imagePlayer/index.html";
            } else {
                widgetFrame.src = "ms-appx-web:///widget/audioPlayer/index.html";
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
