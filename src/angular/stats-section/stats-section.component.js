angular.module( 'statsSection', [ 'playerStats' ] );

angular
    .module( 'statsSection' )
    .component( 'statsSection', {
        
        templateUrl: 'angular/stats-section/stats-section.template.html',

        controller: [ '$http', function ( $http ) {
        
            var self = this;
            
            $http
                .get( 'angular/ohxyz-com-career-stats.json' )
                .then( function ( response ) {
                    
                    var responseJsonData = response.data;
                    
                    /* START: Create stats box - Needs to be put into another function */
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
                    
                    var careerStats = responseJsonData['career stats'];
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
                    /* END: Create and append stats box finishes */
                    
                } );
            }]
    } );