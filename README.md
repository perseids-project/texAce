# texAce
texAce is a jQuery plug-in to turn a HTML textarea 
into a responsive Ace text-editor complete with syntax highlighting.

texAce will resize automatically to display all content.

The original textarea will be hidden from view
but it's content will be synchronized with the replacement Ace text-editor,
so texAce should be "plug-and-play".

# Requirements
* jQuery
* Ace ( http://ace.c9.io/#nav=about )
* jquery-cookie ( https://github.com/carhartl/jquery-cookie )

# Installation
	git clone http://github.com/caesarfeta/texAce texAce
	cd texAce
	git submodule update --init

# Limitations
Only one instance of texAce can be used per page.
This may change in the future when I better understand Ace's event system.

# Use
Load the stylesheet.

	<link href="texAce/src/css/texAce.css" rel="stylesheet" type="text/css" />

Load the javascript.

	<script type="text/javascript" src="texAce/third_party/ace-builds/src-noconflict/ace.js"></script>
	<script type="text/javascript" src="texAce/third_party/jquery-cookie/jquery.cookie.js"></script>
	<script type="text/javascript" src="texAce/src/js/texAce.js"></script>

Initialize texAce on the textarea element passing along the lang option, so the syntax highlighter knows what language you want the default is javascript.

	<script type="text/javascript">
			$('#text').texAce({
				lang: 'xml'
			});
	</script>	

# Options
Options can be set in the constructor or can be set using methods after initialization.

* theme:
	* ambiance
	* chaos
	* chrome
	* clouds
	* clouds_midnight
	* cobalt
	* crimson_editor
	* dawn
	* dreamweaver
	* eclipse
	* github
	* idle_fingers
	* katzenmilch
	* kr
	* kuroir
	* merbivore
	* merbivore_soft
	* mono_industrial
	* monokai
	* pastel_on_dark
	* solarized_dark
	* solarized_light
	* terminal
	* textmate
	* tomorrow
	* tomorrow_night
	* tomorrow_night_blue
	* tomorrow_night_bright
	* tomorrow_night_eighties
	* twilight
	* vibrant_ink
	* xcode
	