/* Start of file */

let gulp = require( 'gulp' );
let gulpCleanCss = require( 'gulp-clean-css' );
let gulpUglify = require( 'gulp-uglify' );
let gulpRename = require( 'gulp-rename' );
let gulpConcat = require( 'gulp-concat' );

let srcScriptPath = 'src/static/script/';

gulp.task( 'concat-js', () => {

    let files = [ 'popup.js', '0.js' ];

    files = files.map( fileName => {

        return srcScriptPath + fileName;

     } );

    gulp.src( files )
        .pipe( gulpConcat( 'concated.js' ) )
        .pipe( gulp.dest( srcScriptPath ) );

} );


gulp.task( 'copy-assets', () => { 

    let assetFolderNames = [ 'fonts', 'images', 'videos' ];

    assetFolderNames.forEach( folderName => {

        let files = `src/static/style/${folderName}/*`;
        let destPath = `docs/static/style/${folderName}`;

        gulp.src( files )
            .pipe( gulp.dest( destPath ) );

    } );

} );


gulp.task( 'copy-min-js', () => { 

    let minJsFiles = 'src/static/script/*.min.js';
    let destPath = 'docs/static/script';

    gulp.src( minJsFiles )
        .pipe( gulp.dest( destPath ) );

} );


gulp.task( 'copy-others', () => { 

    let patchNotesFiles = 'src/static/patch-notes/*';
    let destPath = 'docs/static/patch-notes';

    gulp.src( patchNotesFiles )
        .pipe( gulp.dest( destPath ) );

} );

gulp.task( 'minify-js', () => { 

    // let jsFiles = [ 'src/static/script/*.js', '!src/static/script/*.min.js' ];
    let concatedJsFile = [ srcScriptPath + 'concated.js' ];

    let destPath = 'docs/static/script';
    let renameOptions = { suffix: '.min' }; 

    gulp.src( concatedJsFile )
        .pipe( gulpUglify() )
        .pipe( gulpRename( renameOptions ) )
        .pipe( gulp.dest( destPath ) );

} );


gulp.task( 'minify-css', () => {

    let cssFiles = 'src/static/style/*.css';
    let cssDest = 'docs/static/style';
    let renameOptions = { suffix: '.min' }; 

    gulp.src( cssFiles )
        .pipe( gulpCleanCss() )
        .pipe( gulpRename( renameOptions ) )
        .pipe( gulp.dest( cssDest ) ); 

} );


let defaultTasks = [

    'copy-assets',
    'copy-min-js',
    'copy-others',
    'concat-js',
    'minify-js',
    'minify-css'
];

gulp.task( 'default', defaultTasks );

/* End of file */