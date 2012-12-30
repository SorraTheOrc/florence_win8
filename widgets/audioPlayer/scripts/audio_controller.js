var ${widget.shortname}_audio_controller = { 
    init:function() { 
	// FIXME: album should be created by reading a directory
        var albums = {
            "classical": {
                "title": "Classical",
                "preview": null,
                "assets": [
                    {
	                "src":"assets/Blind_Blake-Diddie_Wa_Diddie.mp3"
	            },
                    {
                        "src":"assets/I.Allegro.mp3"
                    }

                ]
            },
            "soundtrack": {
                "title": "Soundtrack",
                "preview": null,
                "assets": [
                    {
	                "src":"assets/ScottJoplin-TheEntertainer1902.mp3"
	            }
                ]
            }
        }
	${widget.shortname}_asset_controller.setAlbums(albums);
	${widget.shortname}_scanning_controller.scanElements = $('[data-scanOrder]');
    },    
};

$('#home').live('pageinit',function(event) { 
  ${widget.shortname}_audio_controller.init(); 
});

