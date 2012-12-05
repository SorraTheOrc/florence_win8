var ${widget.shortname}_audio_controller = { 
    init:function() { 
	var assets = [];
	assets[0] = {
	    "src":"assets/giraffe.ogg"
	};
	assets[1] = {
	    "src":"assets/Comet_Shoemaker-Levy_9.ogg"
	};
	${widget.shortname}_asset_controller.setCollection(assets);
    },    
};

$('#home').live('pageshow',function(event) { 
  ${widget.shortname}_audio_controller.init(); 
});
