angular.module( 'ohxyzApp', [ 'statsSection', 'patchNotes', 'footerSection' ] );

angular.module( 'patchNotes', [] );

/* START: Patch notes section */
angular
    .module( 'patchNotes' )
    .controller( 'PatchNotesController', [ '$scope', function( $scope ) {
        
        this.patchNoteUrl = '';
        this.notes = [
        
            { name: 'Patch 1.11.1.2a',  date: '2017-06-06' },
            { name: 'Patch 1.11.1.2b',  date: '2017-05-23' },
            { name: 'Patch 1.10.11',    date: '2017-04-27' },
            { name: 'Patch 1.10.0.1b',  date: '2017-04-18' },
            { name: 'Patch 1.10.0.1a',  date: '2017-04-11' },
        
        ];
        
        this.loadPatchNote = function ( patchDate ) {
            
            console.log( patchDate );
            
            this.patchNoteUrl = 'static/patch-notes/' + patchDate + '.html';
            
            $scope.patchNoteUrl = this.patchNoteUrl;
        };

    } ] );
/* END: Patch notes section */
    
    
