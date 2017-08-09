angular.module( 'playerStats', [] );

angular
    .module( 'playerStats' )
    .component( 'playerStats', {
        
        templateUrl: 'angular/stats-section/player-stats/player-stats.template.html',
        
        controller: [ '$http', function ( $http ) {
            
            var self = this;
            
            $http
                .get( 'angular/ohxyz-com-stats.json' )
                .then( function ( response ) {
                    
                    self.stats = response.data;
                    self.featuredStats = self.stats.featuredStats;
                    
                } );
        } ]

    } )
    .filter( 'cssClass', function () {
        
        return function ( input ) {
            
            return input.replace(' - ', '-').replace(/\s/g, '-');
        }
    });