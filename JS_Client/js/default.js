var app = WinJS.Application;

(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    app.widgetList = new WinJS.Binding.List(); // The widgets we are presenting to the user

    /// FIXME: this is a nasty hack to work around a security feature
    /// we shouldn't be working around security features!
    /// It's OK while we control the widget source, but if we host third party widgets
    /// this is BAD!!!!
    window.setSrc = WinJS.Binding.initializer(function (src, srcProps, dest) {
        var src = WinJS.Utilities.getMember(srcProps.join('.'), src);
        if (typeof src !== undefined) {
            // check we are loading from a local resource, throw an error if not
            if (src.indexOf("ms-appx") == 0) {
                dest.src = src;
            } else {
                throw "Cannot load widgets other than from ms-appx[-web], see https://github.com/OpenDirective/florence_win8/issues/22";
            }
        }
    });

    app.addEventListener("activated", function (args) {
        WidgetDataSource.getWidgetsAsync().then(function () {
            WidgetDataSource.widgets.forEach(function (widget, index) {
                app.widgetList.push(widget);
            });
        });

        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. 
                // Initialize your application here.
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
        app.sessionState.history = nav.history;
    };

    function receiveMessage(e) {
        if (e.origin === "ms-appx-web://" + document.location.host) {
            // Act on message from HTML in iFrame
            // For now simple switch an process wil ldo - later we should dispatch.
            var msg = e.data;
            if (msg.message === "openUrl") {
                // special case URLS
                if (msg.url === '/home') {
                    WinJS.Navigation.navigate("/pages/home/home.html", e.data);
                }
                else {
                    WinJS.Navigation.navigate("/pages/widget/widget.html", msg.url);
                };
            }
        }
    }
        
    window.addEventListener("message", receiveMessage, false);

    app.start();
})();
