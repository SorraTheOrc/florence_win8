var ${widget.shortname}_audio_controller = { 
    init:function() { 
	var assets = [];
	assets[0] = {
	    "src":"assets/Blind_Blake-Diddie_Wa_Diddie.mp3"
	};
	assets[1] = {
	    "src":"assets/I.Allegro.mp3"
	};
	assets[1] = {
	    "src":"assets/ScottJoplin-TheEntertainer1902.mp3"
	};
	${widget.shortname}_asset_controller.setCollection(assets);
    },    
};

$('#home').live('pageshow',function(event) { 
  ${widget.shortname}_audio_controller.init(); 
});
