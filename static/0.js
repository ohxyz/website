var DATA = {
    
    'career stats': [
        {
            title: 'combat',
            content: {
                'melee final blows': 467,
                'solo kills': 231
            }
        },
        {
            title: 'deaths',
            content: {
                'deaths': 7023,
                'environmental deaths': 196
            }
        },
        {
            title: 'match awards',
            content: {
                'cards': 166,
                'medals': 1602,
                'medals - gold': 474,
                'medals - silver': 550,
                'medals - bronze': 578
            }
        },
        {
            title: 'assists',
            content: {
                'healing done': 26972,
                'teleporter pads destroyed': 8
            }
        },
        {
            title: 'average',
            content: {
                'melee final blows - average': 0.63,
                'time spent on fire - average': '00:44',
                'solo kills - average': 2.26
            }
        },
        {   
            title: 'miscellaneous',
            content: {
                'melee final blows - most in game': 6,
                'shield generators destroyed - most in game': 2,
                'turrets destroyed - most in game': 3
            }
        },
        {
            title: 'best',
            content: {
                'eliminations - most in game': 65,
                'final blows - most in game': 31,
                'damage done - most in game': 23807,
                'healing done - most in game': 7023,
                'defensive assists - most in game': 22
            }
        },
        {
            title: 'game',
            content: {
                'games played': 739,
                'games won': 356,
                'time spent on fire': '09:13:03',
                'objective time': '17:26:02',
                'time played': '153 hours'
            }
        }
    ]    
};

$( document ).ready( function () {
    
    
    /* START: scroll and fix functionality for #top-nav */
    var $topNav = $( '#top-nav' );
    var top = parseInt( $topNav.css( 'top' ) );

    function setPosition( $element, originalTop ) {
        
        var marginLeft = parseInt( $element.css( 'marginLeft' ) );
        var scrollTop = $( window ).scrollTop();

        var cssScrolled = {
            position: 'fixed',
            marginLeft: marginLeft,
            top: 0
        };
        
        var cssOriginal = {
            position: 'relative',
            margin: '0 auto',
            top: originalTop
        };

        if ( scrollTop > originalTop ) {
            $topNav.css( cssScrolled );
        }
        else {
            $topNav.css( cssOriginal );
        }

    }
    
    /* BUG FIX: when page refresh, the scroll bar was still at former place, so set the #top-nav again */
    setPosition( $topNav, top );
    
    $( window ).resize( function () {
        /* BUG FIX: marginLeft can change when window resizes */            
        var position = $topNav.css( 'position' );
        var marginLeft;
        var cssOriginal = {
            position: 'relative',
            margin: '0 auto',
            top: top
        };
        
        var cssScrolled;
        
        if ( position === 'fixed' ) {
            //  Set back to relative postion and calculate margin-left value
            $topNav.css( cssOriginal );
            marginLeft = $topNav.css( 'marginLeft' );
            
            cssScrolled = {
                position: 'fixed',
                marginLeft: marginLeft,
                top: 0
            };
            
            $topNav.css( cssScrolled );
        }
        
    } );
    
    $( window ).scroll( function () {
        setPosition( $topNav, top );
    } );
    /* END: scroll and fix functionality for #top-nav */
    

    /* START: Create stats box starts */
    ( function ( $ ) {
        /* Generate a career stats box ***     
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
        
        numberInEachColumn = ( numberInEachColumn < numberOfStats ? numberInEachColumn : numberOfStats );
        
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
    } ) ( jQuery );  /* END: Create and append stats box finishes */

} );

