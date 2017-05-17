/* 
 * Popup uses jQuery 
 */

var Utils = Utils || function () {};

Utils.prototype.onclickoutside = function ( element, callback ) {
    
    var $element = jQuery( element );
    
    jQuery( document ).on( 'click touchstart', function ( event ) {
            
        var clickedElement = event.target;
        
        if ( !$element.is( clickedElement )
                && $element.has( clickedElement ).length === 0 ) {

            callback( event );
        }
    });
};

var UTILS = new Utils();

/* START: Popup implementation */
function Popup( options ) {

    this.settings = $.extend( {
        
        width: '90%',
        height: 400,
        content: '',
        backgroundColor: 'transparent',
        onopen: function() {},
        onclose: function() {},
        enableModal: true,
        enableShadow: true,
        enableAlwaysCenter: true,
        triggerElement: null,
        top: null,
        maxNumber: 1
        
    }, options );
    
    if ( Popup.popups.length >= this.settings.maxNumber ) {
        throw "Maximum number of popups reached.";
    }

    /* START: Create a popup window. */
    this.$popup = $( '<div>' );
    this.onclose = this.settings.onclose;
    this.onopen = this.settings.onopen;
    this.isClosed = false;
    
    var $closeButton = $( '<div>' );
    var $crossBarOne = $( '<div>' );
    var $crossBarTwo = $( '<div>' );
    var $body = $( 'body' );
    
    var triggerElement = this.settings.triggerElement;
    var popupWidth = this.settings.width;
    var popupHeight = this.settings.height;
    var popupContent = this.settings.content;
    var popupShadow = this.settings.enableShadow === true ? '0 0 10px rgba(0, 0, 0, 1)' : 'none';
    
    var popupCss = {
        
        position: 'fixed',
        zIndex: 1000,
        width: popupWidth,
        height: popupHeight,
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: 2,
        backgroundColor: this.settings.backgroundColor,
        boxShadow: popupShadow,
        
    };
    
    var closeButtonCss = {
        
        top: -55,
        position: 'absolute',
        right: -7,
        width: 40,
        height: 40,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        opacity: 0.4

    };

    var crossBarCss = {
        
        position: 'absolute',
        left: 18,
        width: 40,
        height: 40,
        width: 4,
        backgroundColor: 'white',
        borderRadius: 2
        
    };
    
    $crossBarOne.css( crossBarCss ).css( 'transform', 'rotate(45deg)' );
    $crossBarTwo.css( crossBarCss ).css( 'transform', 'rotate(-45deg)' );
    
    $closeButton.append( $crossBarOne, $crossBarTwo );
    $closeButton.css( closeButtonCss );
    
    $closeButton
        .mouseenter( function () {
            
            $( this ).css( 'opacity', 0.7 );
        } )
        .mouseleave( function () { 
        
            $( this ).css( 'opacity', closeButtonCss.opacity );
            
        } );

    this.$popup.css( popupCss );
    this.$popup.append( $closeButton )
        .append( popupContent )
        .appendTo( $body );
        
    this.$popup.isClosed = false;
    this.setPopupPosition();
    
    this.isOpen = true;
    this.settings.onopen();
    Popup.popups.push( this );

    /* END: Create a popup window. */

    if ( this.settings.enableModal === true ) {
        
        if ( Popup.isModalCreated === false ) {

            var $modal = $( '<div>' );
            var modalCss = {
                
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                zIndex: 999,
                display: 'none'
                
            };
            
            $modal.css( modalCss ).appendTo( $body );
            Popup.$modal = $modal;
            Popup.isModalCreated = true;
        }
        
        Popup.$modal.show();
        Popup.isModalEnabled = true;
    }
    
    var self = this;
      
    $closeButton.on('click touchstart', function () {
        
        self.close();
    });
        
    UTILS.onclickoutside( this.$popup, function ( event ) {

        if ( $( event.target ).is( triggerElement ) ){
            return;
        }
        
        if ( self.isClosed === true ) {
            return;
        }
        
        self.close();
    });

    if ( this.settings.enableAlwaysCenter === true ) {
        
        $( window ).resize( function () {
            self.setPopupPosition();
        });
    }
    
    if ( triggerElement !== null ) {
        
        this.close();
        $( triggerElement ).click( function ( event ) {
            
            event.preventDefault();
            self.open();
        } );
    }
}

Popup.prototype.getCenteringSettings = function ( ) {
    
    var $window = $( window );
    var viewPortWidth = $window.width();
    var viewPortHeight = $window.height();
    
    var elementOuterWidth =  this.$popup.outerWidth();
    var elementOuterHeight =  this.$popup.outerHeight();
    
    var positionTop =  ( viewPortHeight - elementOuterHeight ) / 2;
    var positionLeft = ( viewPortWidth - elementOuterWidth ) / 2;

    return {
        top: positionTop,
        left: positionLeft
    };
}

Popup.prototype.setPopupPosition = function ( ) {
    
    var centeringSettings = this.getCenteringSettings ();
    var top = ( this.settings.top === null ) ? centeringSettings.top : this.settings.top;
    
    var popupCss = {
        top: top,
        left: centeringSettings.left,   
    };
    
    this.$popup.css( popupCss );
    return this;
}

Popup.prototype.open = function () {
    
    if ( Popup.isModalEnabled === true ) {      
        Popup.$modal.show();
    }

    this.$popup.show();
    this.$popup.isClosed = false;
    this.onopen();
    return this;
}

Popup.prototype.close = function () {
    
    this.$popup.hide();
    this.$popup.isClosed = true;
    this.onclose();
    
    if ( Popup.isModalEnabled === true 
            && Popup.isAllClosed() === true ) {
        
        Popup.$modal.hide();
    }
    return this;
}

$.extend( Popup, {
    
    popups: [],
    
    isModalCreated: false,
    
    isModalEnabled: false,
    
    $modal: null,
    
    isAllClosed: function () {
        
        var isAllClosed = true;
        
        for ( var i = 0; i < this.popups.length; i ++ ) {
            
            var isClosed = this.popups[ i ].$popup.isClosed;
            isAllClosed = isAllClosed && isClosed;
        }
        
        return isAllClosed;
    }
    
} );
/* END: Popup implementation */














