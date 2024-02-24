/* Use angular to render player's stats*/

angular.module( 'ohxyzApp', [ 'playerStats', 'patchNotes' ] );
angular.module( 'playerStats', [] );
angular.module( 'patchNotes', []);

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

    } )
    .filter( 'cssClass', function () {
        
        return function ( input ) {
            
            return input.replace(' - ', '-').replace(/\s/g, '-');
        }
    });
    
angular
    .module( 'patchNotes' )
    .controller( 'PatchNotes', [ '$scope', function( $scope ) {
        
        this.patchNoteUrl = '';
        
        this.loadPatchNote = function ( patchDate ) {
            
            console.log( patchDate );
            
            this.patchNoteUrl = 'patch-notes/' + patchDate + '.html';
            
            $scope.patchNoteUrl = this.patchNoteUrl;
        };

    } ] );
    