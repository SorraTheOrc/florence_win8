// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/widget/widget.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, uri) {
            var widgetFrame = document.getElementById("widgetFrame");
            if (uri !== undefined) {
                widgetFrame.height = document.documentElement.clientHeight;
                widgetFrame.width = document.documentElement.clientWidth;
                // FIXME: remove hard coding of paths and retrieve from application
                if (uri.indexOf("Pomodoro") !== -1) {
                    widgetFrame.src = "ms-appx-web:///widget/Pomodoro/index.html";
                } else {
                    var widgetName = uri.toString().split("/").pop();
                    widgetFrame.src = "ms-appx-web:///widget/"+widgetName+"/index.html";
                }     
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

    // The following lines expose this control constructor as a global.
    // This lets you use the control as a declarative control inside the
    // data-win-control attribute.
    WinJS.Namespace.define("Controls_PageControls", {
        WidgetPageControl: ControlConstructor
    });

})();
