/* Start of page */

let gulp = require( 'gulp' );
let cleanCss = require( 'gulp-clean-css' );
let uglify = require( 'gulp-uglify' );
let rename = require( 'gulp-rename' );

gulp.task( 'copy-assets', () => { 

    let assetFolderNames = [ 'fonts', 'images', 'videos' ];

    assetFolderNames.forEach( folderName => {

        let files = `src/static/style/${folderName}/*`;
        let destPath = `dist/static/style/${folderName}`;

        gulp.src( files )
            .pipe( gulp.dest( destPath ) );

    } );

} );

gulp.task( 'copy-min-js', () => { 

    let minJsFiles = 'src/static/script/*.min.js';
    let destPath = 'dist/static/script';

    gulp.src( minJsFiles )
        .pipe( gulp.dest( destPath ) );

} );

gulp.task( 'copy-others', () => { 

    let patchNotesFiles = 'src/static/patch-notes/*';
    let destPath = 'dist/static/patch-notes';

    gulp.src( patchNotesFiles )
        .pipe( gulp.dest( destPath ) );

} );

gulp.task( 'minify-js', () => { 

    let jsFiles = [ 'src/static/script/*.js', '!src/static/script/*.min.js' ];
    let destPath = 'dist/static/script';
    let renameOptions = { suffix: '.min' }; 

    gulp.src( jsFiles )
        .pipe( uglify() )
        .pipe( rename( renameOptions ) )
        .pipe( gulp.dest( destPath ) );

} );

gulp.task( 'minify-css', () => {

    let cssFiles = 'src/static/style/*.css';
    let cssDest = 'dist/static/style';
    let renameOptions = { suffix: '.min' }; 

    gulp.src( cssFiles )
        .pipe( cleanCss() )
        .pipe( rename( renameOptions ) )
        .pipe( gulp.dest( cssDest ) ); 

} );

let defaultTasks = [

    'copy-assets',
    'copy-min-js',
    'copy-others',
    'minify-js',
    'minify-css'
];

gulp.task( 'default', defaultTasks );

