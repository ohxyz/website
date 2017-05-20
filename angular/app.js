/* Use angular to render player's stats*/

angular.module( 'ohxyzApp', [ 'playerStats' ] );

angular.module( 'playerStats', [] );

angular
    .module( 'playerStats' )
    .component( 'playerStats', {
        
        templateUrl: 'angular/player-stats.template.html',
        
        controller: [ '$http', function ( $http ) {
            
            var self = this;
            
            $http
                .get( 'angular/ohxyz-com-stats.json' )
                .then( function ( response ) {
                    
                    self.stats = response.data;
                    self.featuredStats = self.stats.featuredStats;
                    
                } );
            
        }]

    } );
    
