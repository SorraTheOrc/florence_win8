$('#tile').live('pageinit',function(event) { 
    $('#tile').click(function() {
        window.widget.views.openUrl("http://florence.opendirective.net/widgets/${widget.shortname}", null, "_blank");
    });
});
