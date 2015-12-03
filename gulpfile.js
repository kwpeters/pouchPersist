var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    path        = require('path'),
    q           = require('q'),
    sourcemaps  = require('gulp-sourcemaps'),
    mergeStream = require('merge-stream'),
    buildSrcDir = path.join(__dirname, 'build', 'src'),
    buildUtDir  = path.join(__dirname, 'build', 'ut');

////////////////////////////////////////////////////////////////////////////////
// clean
////////////////////////////////////////////////////////////////////////////////
(function () {
    "use strict";

    gulp.task(
        'clean', [], function () {
            var del = require('del');

            return del(
                [
                    'build'
                ]);
        });


})();


////////////////////////////////////////////////////////////////////////////////
// build
////////////////////////////////////////////////////////////////////////////////
(function () {
    "use strict";

    gulp.task(
        'build', [], function () {
            var ts           = require('gulp-typescript'),
                inputTsFiles = ['src/**/*.ts', '!src/**/*.spec.ts',
                                'typings/**/*.d.ts'],
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
                .pipe(gulp.dest(buildSrcDir));

            jsStream   = tsStreams.js
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(buildSrcDir));

            return mergeStream(defsStream, jsStream);
        });

})();


////////////////////////////////////////////////////////////////////////////////
// ut
////////////////////////////////////////////////////////////////////////////////
(function () {
    "use strict";

    gulp.task('ut-build', [], function () {
        var ts = require('gulp-typescript'),
            tsStreams,
            inputTsFiles = ['src/**/*.ts', 'typings/**/*.d.ts'],
            merged;

        tsStreams = gulp.src(inputTsFiles, {base: 'src'})
            .pipe(sourcemaps.init())
            .pipe(ts({
                target:            'ES5',
                declarationFiles:  true,
                noExternalResolve: true,
                noEmitOnError:     true,
                module:            'commonjs'
            }));

        merged = mergeStream(
            tsStreams.dts.pipe(gulp.dest(buildUtDir)),
            tsStreams.js.pipe(sourcemaps.write())
                        .pipe(gulp.dest(buildUtDir))
        );
        return merged;
    });

    gulp.task('ut', ['ut-build'], function () {
        var q       = require('q'),
            exec    = require('child_process').exec,
            dfd     = q.defer(),
            cmd;

        cmd = 'node ./node_modules/jasmine-node/bin/jasmine-node --color ' + buildUtDir;

        exec(cmd, {cwd: __dirname}, function (err, stdout/*, stderr*/) {
            if (err) {
                gutil.log('FAILED');
                gutil.log(stdout);
                dfd.reject();
            } else {
                gutil.log('SUCCESS');
                gutil.log(stdout);
                dfd.resolve();
            }
        });

        return dfd.promise;
    });

})();
