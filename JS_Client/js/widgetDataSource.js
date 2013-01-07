var WidgetDataSource = {
    widgets: [],

    //
    // Get available widgets, and send
    // to the callback function when retrieved
    //
    getWidgets: function(callback){
        var widget = {
            id: "http://florence.opendirective.net/widgets/audioPlayer",
            name: "Audio Player",
            src: "ms-appx-web:///widget/audioPlayer/index.html"
        }
        WidgetDataSource.widgets.push(widget);
        
        widget = {
            id: "http://florence.opendirective.net/widgets/imagePlayer",
            name: "Image Player",
            src: "ms-appx-web:///widget/imagePlayer/index.html"
        }
        WidgetDataSource.widgets.push(widget);

        callback(WidgetDataSource.widgets);
    }
}
