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
            'We got this big mission coming up -- ^1000 Oh, I get it."',
            
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
        top: 'auto'
    };
        
    var cssScrolled = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 'auto'
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


/* START: Create stats box */
( function () {
    /* Generate a career stats box     
        <div class="career-stats-box">
            <div class="career-stats-box-title">COMBAT</div>
            <div class="career-stats-box-content">
                <dl>
                    <dt>MELEE FINAL BLOWS</dt><dd>467</dd>
                    <dt>SOLO KILLS</dt><dd>231</dd>
                </dl>
            </div>
        </div>
    */
    function $createCareerStatsBox( o ) {
    
        var $careerStatsBox = $( '<div class="career-stats-box">' );
        var $careerStatsBoxTitle = $( '<div class="career-stats-box-title">' );
        var $careerStatsBoxContent = $( '<div class="career-stats-box-content">' );
        
        var $dl = $( '<dl>' );
        var $dt;
        var $dd;
        var statsBoxContent = o.content;
        
        $careerStatsBox.append( $careerStatsBoxTitle, $careerStatsBoxContent );
        $careerStatsBoxContent.append( $dl );
        $careerStatsBoxTitle.text( o.title );
        
        for ( var key in statsBoxContent ){
            $dt = $( '<dt>' );
            $dd = $( '<dd>' );
            $dt.text( key );
            $dd.text( statsBoxContent[ key ] );
            $dl.append( $dt, $dd );
        }
        
        return $careerStatsBox;
    }

    var $careerStatsColumn;
    var $leftColumn = $( '#career-stats-content #left-column' );
    var $middleColumn = $( '#career-stats-content #middle-column' );
    var $rightColumn = $( '#career-stats-content #right-column' );
    
    var careerStats = DATA['career stats'];
    var numberOfStats = careerStats.length;
    var numberInEachColumn = Math.ceil( numberOfStats / 3 );
    var startIndex = 0;
    var $careerStatsBox;
    
    numberInEachColumn = ( numberInEachColumn < numberOfStats ) ? numberInEachColumn : numberOfStats ;
    
    for ( ; startIndex < numberOfStats ; startIndex ++ )
    {
        $careerStatsBox = $createCareerStatsBox( careerStats[ startIndex ] );
        
        if ( startIndex < numberInEachColumn ) {
            
            $careerStatsColumn = $leftColumn;
        }
        else if (  ( startIndex >= numberInEachColumn ) 
                && ( startIndex < numberInEachColumn * 2 ) ) {
            
            $careerStatsColumn = $middleColumn;
        }
        else {
            
            $careerStatsColumn = $rightColumn
        }

        $careerStatsColumn.append( $careerStatsBox );
    }
} )();
/* END: Create and append stats box finishes */


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
    