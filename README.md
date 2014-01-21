# texAce
texAce is a jQuery plug-in to turn a generic HTML textarea 
into a responsive Ace text-editor complete with syntax highlighting.

texAce will resize automatically to display all content.

The original textarea will be hidden from view
but it's content will be synchronized with the replacement Ace text-editor,
so texAce should be "plug-and-play".

# Requirements
* jQuery
* Ace ( http://ace.c9.io/#nav=about )

# Installation
	git clone http://github.com/caesarfeta/texAce texAce
	cd texAce
	git submodule update --init

# Use
Load the stylesheet.

	<link href="texAce/src/css/texAce.css" rel="stylesheet" type="text/css" />

Load the javascript.

	<script type="text/javascript" src="texAce/third_party/ace-builds/src-noconflict/ace.js"></script>
	<script type="text/javascript" src="texAce/src/js/texAce.js"></script>

Initialize texAce on the textarea element passing along the lang option, so the syntax highlighter knows what language you want the default is javascript.

	<script type="text/javascript">
			$('#text').texAce({
				lang: 'xml'
			});
	</script>	
