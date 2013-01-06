(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    /// FIXME: this is a nasty hack to work around a security feature
    /// we shouldn't be working around security features!
    /// It's OK while we control the widget source, but if we host third party widgets
    /// this is BAD!!!!
    window.setSrc = WinJS.Binding.initializer(function (src, srcProps, dest) {
        var src = WinJS.Utilities.getMember(srcProps.join('.'), src);
        dest.src = src;
    });

    var widgetList;
    WidgetDataSource.getWidgets(function (widgets) {
        widgetList = new WinJS.Binding.List(widgets);
    });

    var publicMembers =
        {
            widgets: widgetList
        };
    WinJS.Namespace.define("WidgetDataSource", publicMembers);

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();

    function receiveMessage(e) {
        if (e.origin === "ms-appx-web://" + document.location.host) {
            WinJS.Navigation.navigate("/pages/widget/widget.html", e.data);
        }
    }
        
    window.addEventListener("message", receiveMessage, false);
})();