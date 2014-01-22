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
		// User options 
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
		// Check cookie for persistent options
		//------------------------------------------------------------
		self.cookieCheck( _options );
		
		//------------------------------------------------------------
		// Copy content into a div
		//------------------------------------------------------------
		$( self.elem ).wrap( '<div class="texAce"></div>' );
		self.elem = $( self.elem ).parent();
		self.textarea = $( 'textarea', self.elem );
		var xml = self.textarea.val();
		self.textarea.hide();
		$( self.elem ).append( '<div id="aceMask"><div id="aceWrapper"><div id="aceEditor"></div></div></div>' );
		$( '#aceEditor', self.elem ).text( xml );
	
		//------------------------------------------------------------
		// Startup and configure ace editor.
		//------------------------------------------------------------
		self.aceEditor = ace.edit( "aceEditor" );
		self.aceEditor.getSession().setMode( "ace/mode/" + self.options['lang'] );
		self.aceEditor.getSession().setUseWrapMode( true );
		self.theme();
		self.lang();
		self.resize();
		
		//------------------------------------------------------------
		// Window resize listener.
		//------------------------------------------------------------
		$( window ).on( 'resize', function() { self.resize() } );
		
		//------------------------------------------------------------
		// Ace editor events requiring an update.
		// Working around the limitations of the Ace callback system.
		//------------------------------------------------------------
		self.aceEditor.on( "blur", function() { self.update( self.aceEditor.getValue() ) } );
		self.aceEditor.on( "change", function() { self.update( self.aceEditor.getValue() ) } );
		self.aceEditor.on( "changeSelectionStyle", function() { self.update( self.aceEditor.getValue() ) } );
		self.aceEditor.on( "changeSession", function() { self.update( self.aceEditor.getValue() ) } );
		self.aceEditor.on( "copy", function() { self.update( self.aceEditor.getValue() ) } );
		self.aceEditor.on( "focus", function() { self.update( self.aceEditor.getValue() ) } );
		self.aceEditor.on( "paste", function() { self.update( self.aceEditor.getValue() ) } );
	}
	
	/**
	 * Resize the Ace editor
	 * Not sure how expensive timewise this is.
	 */
	texAce.prototype.resize = function() {
		var height = 0;
		$( "#aceEditor .ace_gutter-cell" ).each( function(){
			height += $(this).outerHeight();
		});
		$( "#aceMask", this.elem ).height( height );
	}
	
	/**
	 * Checks which default options aren't being overwritten.
	 * Those options could be stored as cookies.
	 * This checks for the existence of those cookie values.
	 * If they exist then they'll overwrite the defaults.
	 */		
	texAce.prototype.cookieCheck = function( _options ) {
		var self = this;
		var check = [];
		//------------------------------------------------------------
		//  Find which default options aren't
		//------------------------------------------------------------
		for ( var opt in self.options ) {
			if ( opt in _options ) {
				continue;
			}
			check.push( opt );
		}
		for ( var i=0, ii=check.length; i<ii; i++ ) {
			var cookieVal = $.cookie( 'texAce:'+check[i] );
			if ( cookieVal != undefined ) {
				self.options[ check ] = cookieVal;
			}
		}
	}
	
	/**
	 * Set a cookie for persistent texAce options
	 */	
	texAce.prototype.cookieSet = function( _key, _val ) {
		$.cookie( _key, _val );
	}
	
	/**
	 * Change the Ace editor language
	 */
	texAce.prototype.lang = function( _lang ) {
		var self = this;
		_lang = ( _lang == undefined ) ? self.options['lang'] : _lang;
		self.aceEditor.getSession().setMode( "ace/mode/" + _lang );
		
	}
	
	/**
	 * Change the Ace editor theme
	 */
	texAce.prototype.theme = function( _theme ) {
		var self = this;
		_theme = ( _theme == undefined ) ? self.options['theme'] : _theme;
		self.aceEditor.setTheme( "ace/theme/" + _theme );
		self.cookieSet( 'texAce:theme', _theme );
	}
	
	/**
	 * Holds default options, adds user defined options, and initializes the plugin
	 *
	 * @param { string } _text The text to copy to the source textarea
	 */
	texAce.prototype.update = function( _text ) {
		var self = this;
		$( self.elem ).val( _text );
		//------------------------------------------------------------
		// Ace's events sometimes get triggered before the editor's
		// appearance changes. This delay hopefully is sufficient
		// to fix this problem without the user noticing.
		//------------------------------------------------------------
		setTimeout( function(){
			self.resize();
		}, 50 );
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
