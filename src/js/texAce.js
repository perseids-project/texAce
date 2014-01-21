/*!
 * texAce - texAce
 * http://adamtavares.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
;(function($) {
	
	/**
	 * Holds default options, adds user defined options, and initializes the plugin
	 *
	 * @param { obj } _elem The DOM element where the plugin will be drawn
	 *
	 * @param { obj } _options Key value pairs to hold the plugin's configuration
	 *
	 * @param { string } _id The id of the DOM element
	 */
	function texAce( _elem, _options, _id ) {
		var self = this;
		self.elem = _elem;
		self.id = _id;
		self.init( _elem, _options );
	}
	
	/**
	 * Holds default options, adds user defined options, and initializes the plugin
	 *
	 * @param { obj } _elem The DOM element where the plugin will be drawn
	 *
	 * @param { obj } _options Key value pairs to hold the plugin's configuration
	 */
	texAce.prototype.init = function( _elem, _options ) {
		var self = this;
		
		//------------------------------------------------------------
		// Mark your territory
		//------------------------------------------------------------
		$( self.elem ).addClass('texAce')
		
		//------------------------------------------------------------
		//User options 
		//------------------------------------------------------------
		self.options = $.extend({
			theme: 'tomorrow',
			lang: 'javascript'
		}, _options );
		
		//------------------------------------------------------------
		// User events
		//------------------------------------------------------------
		self.events = {
			change: 'TEXACE-CHANGE'
		}
		
		//------------------------------------------------------------
		// Copy content into a div
		//------------------------------------------------------------
		var editor = $( self.elem );
		var xml = editor.val();
		editor.hide();
		editor.after( '<div id="aceMask"><div id="aceWrapper"><div id="aceEditor"></div></div></div>' );
		var aceDiv = $( '#aceEditor' );
		aceDiv.text( xml );
	
		//------------------------------------------------------------
		// Startup and configure ace editor.
		//------------------------------------------------------------
		self.aceEditor = ace.edit( "aceEditor" );
		self.aceEditor.setTheme( "ace/theme/" + self.options['theme'] );
		self.aceEditor.getSession().setMode( "ace/mode/" + self.options['lang'] );
		self.aceEditor.getSession().setUseWrapMode( true );
		self.resize();
		
		//------------------------------------------------------------
		// Window resize listener.
		//------------------------------------------------------------
		$( window ).on( 'resize', self.resize );
		
		//------------------------------------------------------------
		// Ace editor change event.
		// Work around the limitations of the Ace callback system.
		//------------------------------------------------------------
		self.aceEditor.on( "change", function() { self.change( self.aceEditor.getValue() ) } );
	}
	
	texAce.prototype.resize = function() {
		var last = $( "#aceEditor .ace_gutter-cell:last" );
		var height = last.position().top + last.outerHeight();
		$( "#aceMask" ).height( height );
	}
	
	texAce.prototype.change = function( _text ) {
		$( this.elem ).val( _text );
		this.resize();
	}
	
	//----------------
	// Extend JQuery 
	//----------------
	jQuery(document).ready( function($) {
		jQuery.fn.texAce = function( options ) {
			var id = jQuery(this).selector;
			return this.each( function() {
				jQuery.data( this, id, new texAce( this, options, id ) );
			});
		};
	})
})(jQuery);
