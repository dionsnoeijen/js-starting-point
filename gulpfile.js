'use strict';

var gulp       = require('gulp'),
    babelify   = require('babelify'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    envify     = require('loose-envify'),
    cache      = require('gulp-cache'),
    size       = require('gulp-size'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    sass       = require('gulp-sass'),
    connect    = require('gulp-connect'),
    gutil      = require('gulp-util'),
    mocha      = require('gulp-mocha'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber    = require('gulp-plumber'),
    imagemin   = require('gulp-imagemin'),

    paths      = require('./paths.json');

var cors = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
};

// Wee need babel core for mocha, transforms code before testing
require('babel-core/register');

/**
 * Cook up my html please
 */
gulp.task('html', function() {
    return gulp.src(paths.source.html + '/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('translations', function() {
    return gulp.src(paths.source.translations + '/*.json')
        .pipe(gulp.dest(paths.dest.translations));
});

gulp.task('initialState', function() {
    return gulp.src(paths.source.initial + '/*.json')
        .pipe(gulp.dest(paths.dest.initial));
});

gulp.task('js', function() {
    return browserify({
        entries: [paths.source.scripts + '/app.js'],
        paths: ['./node_modules', paths.source.scripts],
        debug: true
    })
        .transform(envify)
        .transform(babelify, {presets: ["es2015"]})
        .bundle()
        .on('error', function(e) {
            gutil.log(e);
        })
        .pipe(plumber())
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest.scripts))
        .pipe(size({showFiles:true, title:'javascripts', gzip:true}))
        .pipe(livereload());
});

gulp.task('sass', function() {
    return gulp.src([
        paths.source.styles + '/**/*.scss'
    ])
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 5
        }).on('error', sass.logError))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest.styles))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.source.html + '/*.html', ['html']);
    gulp.watch(paths.source.scripts + '/**/*.js', ['js']);
    gulp.watch(paths.source.styles + '/**/*.scss', ['sass']);
});

gulp.task('connect', function() {
    connect.server({
        root: paths.deploy + '/',
        livereload: true,
        fallback: paths.deploy + '/index.html',
        middleware: function (req, res, next) {
            return [cors];
        }
    });
});

gulp.task('images', function() {

    return gulp.src([ paths.source.images + '/**/*' ])
        .pipe(cache( imagemin({
            optimizationLevel: 3,
            svgoPlugins: [{removeViewBox: false}],
            // progressive: true,
            // interlaced: true
        })))
        .pipe(gulp.dest( paths.dest.images ))
        .pipe(size({showFiles: true, title: 'images', gzip:false}));
});

gulp.task('fonts', function() {
    return gulp.src([paths.source.fonts + '/**/*'])
        .pipe(gulp.dest(paths.dest.fonts))
        .pipe(size({showFiles: true, title: 'fonts', gzip:false}));
});

gulp.task('test', function() {
    return gulp.src(paths.source.scripts + '/tests/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['connect', 'html', 'images', 'js', 'translations', 'initialState', 'sass', 'fonts', 'watch']);
