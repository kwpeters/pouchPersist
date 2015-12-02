var gulp        = require('gulp'),
    //gutil       = require('gulp-util'),
    path        = require('path'),
    sourcemaps  = require('gulp-sourcemaps'),
    mergeStream = require('merge-stream'),
    buildDir    = path.join(__dirname, 'build');


(function () {
    "use strict";

    gulp.task(
        'build', [], function () {
            var ts           = require('gulp-typescript'),
                inputTsFiles = ['src/**/*.ts', 'typings/**/*.d.ts'],
                tsStreams,
                defsStream,
                jsStream;

            tsStreams = gulp.src(inputTsFiles, {base: 'src'})
                .pipe(sourcemaps.init())
                .pipe(ts(
                    {
                        target:            'ES5',
                        declarationFiles:  true,
                        noExternalResolve: true,
                        noEmitOnError:     true,
                        module:            'commonjs'
                    }));

            defsStream = tsStreams.dts
                .pipe(gulp.dest(buildDir));

            jsStream   = tsStreams.js
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(buildDir));

            return mergeStream(defsStream, jsStream);
        });

})();