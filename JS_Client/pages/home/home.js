(function () {
    "use strict";
    var widgetListView;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            widgetListView = document.getElementById("widgetListView").winControl;
            this.bindList();
        },

        bindList: function () {
            var widgetList = app.widgetList;

            widgetListView.itemDataSource = widgetList.dataSource;
            widgetListView.loadingBehavior = "incremental";
            widgetListView.selectionMode = "single";
        }
    });
})();
