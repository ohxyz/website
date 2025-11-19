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















/* Main JS */

    
/* START: Development warning */
if ( window.location.href.indexOf( "ohxyz" ) === -1 ) {
    $( 'body' ).prepend( '<h2 style="color:red;position:fixed;z-index:999;">LOCAL</h2>' );
} 
/* END: Development warning */


/* START: Mobile menu */
( function () {
    
    var $mobileLogo = $( '#mobile-logo' );
    var $mobileMenu = $( '#mobile-menu' );
    
    var mobileLogoActiveClass = 'mobile-logo-active';
    var isMobileMenuClosed = true;
    var mobileMenuWidth = parseInt( $mobileMenu.css( 'width' ) );
    
    // console.log(mobileMenuWidth);
    function closeMobileMenu() {

        $mobileMenu.animate( {
        
            width: 0,

        }, 100 );

        // BUG: Mobile browser has inconsistent behaviour at :hover
        
        $mobileLogo.removeClass( mobileLogoActiveClass );
        isMobileMenuClosed = true;

    }
    
    function openMobileMenu() {
        
        $mobileLogo.addClass( mobileLogoActiveClass );
        $mobileMenu.css( {
            
            width: mobileMenuWidth,
            display: 'block'
        
        } );
        
        isMobileMenuClosed = false;
    }
    
    function toggleMobileMenu() {
        // console.log( isMobileMenuClosed );
        
        if ( isMobileMenuClosed === true ) {
            
            openMobileMenu();
        }
        else {
            
            closeMobileMenu();
        }
    }
    
    // By only using mouseup or click event preventing finger accidently touch the logo
    // and shows the menu. It makes sure the menu is only opened after the swipe, if there
    // is one, the finger is still on logo
     
    $mobileLogo.on( 'mouseup', function ( event ) { 

        toggleMobileMenu();
    });
       
    /** BUG FIX START : Add a handler to control #mobile menu */
    $( window ).resize( function () {
        
        if ( $mobileLogo.css( 'display' ) === 'none' ) {
            
            closeMobileMenu();
        }
    });
    /** BUG FIX END */
    
    // Hide the menu when click outside. http://stackoverflow.com/questions/1403615
    $( document ).on( 'click touchstart', function ( event ) {
        
        var clickedElement = event.target;
        
        if ( !$mobileMenu.is( clickedElement )
                && !$( clickedElement ).is( $mobileLogo )
                && $mobileMenu.has( clickedElement ).length === 0 ) {

            closeMobileMenu();
        }
    });
    
    /** START: Swipe on side menu */
    // Use hammer.js because that jQuery swipe plugin prevents
    // menu's content from moving up or down. It was found on 
    // a horizental screen.
    var hammertime = new Hammer( $mobileMenu.get(0));
    
    hammertime.on( 'swipe' , function( hammerEvent ) {

        if ( hammerEvent.direction === Hammer.DIRECTION_LEFT ) {
            
            closeMobileMenu();
        }

    });
    /** END: Swipe on side menu */
    
} )();
/* END: Mobile menu */


/* START: Quotes typewriter effect */
// This pluggin has some bugs
( function () {
    
    var newLine = '<br /><br />^3000';
    
    Typed.new( '#quotes-box', {
        
        strings: [ 
        
            '" Imagination is the essence of discovery. "', 
            '" Curious. "',
            '" Don\'t get me angry. "',
            '" How embarrassing! "',
            '" No, I do not want a banana. "',
            '" Natural selection! "',
            '" No monkey business. "',
            '" Did someone say peanut butter? "',
            '" Sorry about that! "',
            '" The power of science! "',
            '" Houston, uhh, we have a problem. "', 
            
            'D.VA: "A giant gorilla! Just like in those old video games!"' + newLine +
            'Winston: "I get that a lot."', 
            
            'Lucio: "Winston, how\'s it hangin\'?"' + newLine +
            'Winston: "Uhm, okay, I guess. ' + '<br />^1000' +
            'Got this big mission coming up -- ^1000 Oh, I get it."',
            
            'Winston: "Genji, this is just like old times."' + newLine +
            'Genji: "Our paths cross for now. ^1000 As to the future, ^1000 we shall see."',
            
            'Mei: "I love your glasses, ^1000 so cute!"' + newLine +
            'Winston: "Oh, ^1000 uhm, ^1000 thanks. I like yours, too."'
        
        ],
        
        typeSpeed: 0,
        
        shuffle: true,
        
        fadeOut: true,
        
        fadeOutDelay: 3000,
        
        contentType: 'html',

        cursorChar: '',
        
    });

} )();
/* END: Quotes typewriter effect */


/* START: scroll and fix functionality for #top-nav */
( function () {
    
    var $topNav = $( '#top-nav' );

    var cssOriginal = {
        position: 'absolute',
        bottom: 0,
        top: 'auto',
        backgroundColor: 'rgba( 0, 0, 0, 0.1 )'
    };
        
    var cssScrolled = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 'auto',
        backgroundColor: 'rgba( 0, 0, 0, 0.8 )'
    };

    function setPosition( originalTop ) {
        
        var scrollTop = $( window ).scrollTop();
        cssOriginal.top = originalTop;

        if ( scrollTop > originalTop ) {
            $topNav.css( cssScrolled );
        }
        else {
            $topNav.css( cssOriginal );
        }
    }
    
    function resetPosition() {
        
        $topNav.css( {
            bottom: 0,
            top: 'auto'
        } );
        
        var cssTop = parseInt( $topNav.css( 'top' ) );
        
        setPosition( cssTop );
    }
    
    $( window ).on( 'scroll resize', function () {
        
        resetPosition();
    } );

    // Always call this function when page gets reloaded.
    setPosition( top );
    
} )();
/* END: scroll and fix functionality for #top-nav */




/* START: Create youtube modal popup */
( function () {

    var youtube = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/AJF4poR4MlA?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';

    var options = {
        width: 640,
        height: 360,
        top: '20%',
        content: youtube,
        triggerElement: '#preview-2-play-icon'
    };
    
    new Popup( options );
    
} )();

( function () {
    
    var video = document.getElementById( 'official-trailer' );
    video.addEventListener( 'ended', function () {
        this.currentTime = 2;
    });
    
} )();
/* END: Create youtube modal popup */
    