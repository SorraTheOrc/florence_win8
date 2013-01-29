var WidgetDataSource = {
    widgets: [],

    //
    // Load the widget definitions for all available widgets.
    //
    getWidgetsAsync: function () {
        return new WinJS.Promise(function (complete, error) {
            try {
                var confPromises = [];
                var pkg = Windows.ApplicationModel.Package.current;
                var appFolder = pkg.installedLocation;
                appFolder.getFolderAsync("widget").then(function (widgetFolder) {
                    widgetFolder.getFoldersAsync().then(function (widgets) {
                        var idx = 0;
                        while (idx < widgets.size) {
                            confPromises[idx] = WidgetDataSource._getWidgetConfigAsync(widgets[idx]).then(function (widget) {
                                WidgetDataSource.widgets.push(widget);
                            });
                            idx += 1;
                        };
                        WinJS.Promise.join(confPromises).then(function () {
                            complete();
                        });
                    });
                });
            } catch (e) {
                error(e);
            }
        });
    },

    /**
     * Given a widget folder load and parse the config.xml file.
     * Return a JSON representation of the widget config.
     */
    _getWidgetConfigAsync: function (widgetFolder) {
        return new WinJS.Promise(function (complete) {
            widgetFolder.getFileAsync("config.xml").then(function (configFile) {
                Windows.Storage.FileIO.readTextAsync(configFile).done(function (confXML) {
                    var config = {};

                    var ns = "http://www.w3.org/ns/widgets";
                    confDom = new DOMParser().parseFromString(confXML, "text/xml");

                    config.title = confDom.getElementsByTagNameNS(ns, "name")[0].textContent;
                    config.icon = confDom.getElementsByTagNameNS(ns, "icon")[0].attributes.getNamedItem("src").textContent;
                    config.uid = confDom.getElementsByTagNameNS(ns, "widget")[0].attributes.getNamedItem("id").textContent;
                    config.desc = confDom.getElementsByTagNameNS(ns, "description")[0].textContent;
                    config.content = confDom.getElementsByTagNameNS(ns, "content")[0].attributes.getNamedItem("src").textContent;
                    config.src = "ms-appx-web:///widget/" + widgetFolder.name + "/" + config.content;
                    complete(config);
                });
            });
        });
    },

    /**
     * Get the local path for a widget.
     */
    getLocalPath: function (url) {
        // find the widget by the url
        var idx = 0;
        for (idx=0;i<WidgetDataSource.widgets.length;idx++) {
            if (WidgetDataSource.widget[idx].uid == url) {
                break;
            }
        };
        // return the path
        return WidgetDataSource.widgets[i].src;
    }
}
