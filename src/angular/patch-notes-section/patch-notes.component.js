angular.module( 'patchNotesSection', [] );

angular
    .module( 'patchNotesSection' )
    .component( 'patchNotesSection', {
        
        templateUrl: 'angular/patch-notes-section/patch-notes.template.html',
        
        controller: [ '$scope', function ( $scope ) {
            
            this.notes = [
            
                { name: 'Patch 1.11.1.2a',  date: '2017-06-06' },
                { name: 'Patch 1.11.1.2b',  date: '2017-05-23' },
                { name: 'Patch 1.10.11',    date: '2017-04-27' },
                { name: 'Patch 1.10.0.1b',  date: '2017-04-18' },
                { name: 'Patch 1.10.0.1a',  date: '2017-04-11' },
            
            ];
            
            this.loadPatchNote = function ( patchDate ) {
                
                $scope.patchNoteUrl = '/static/patch-notes/' + patchDate + '.html';

            };
            
        } ],
        
    } );
