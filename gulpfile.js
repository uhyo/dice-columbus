const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const server = require('gulp-server-livereload');

const gulpTs = require('gulp-typescript');
const webpack = require('webpack');

const tsProject = gulpTs.createProject('tsconfig.json');
gulp.task('tsc', ()=>{
    return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist-es6/'));
});

gulp.task('tsc-watch', gulp.series('tsc', ()=>{
    gulp.watch(['src/**/*.ts', 'src/**/*.tsx'], ['tsc']);
}));

gulp.task('server', ()=>{
    gulp.src(['dist', 'static'])
    .pipe(server({
        livereload: true,
        directoryListing: false,
        open: false,
        port: 8080,
    }));
});


gulp.task('webpack', gulp.series('tsc', ()=>{
    return makeWebpack(false);
}));
gulp.task('webpack-watch', ()=>{
    return makeWebpack(true);
});

gulp.task('default', gulp.series('tsc'));
gulp.task('watch', gulp.parallel('tsc-watch', 'webpack-watch', 'server'));

function makeWebpack(watch){
  const compiler = webpack(require('./webpack.config.js'));

  const handleStats = (stats, watch)=>{
      console.log(stats.toString({
          chunks: !watch,
          colors: true,
      }));
  };
  if (watch){
      return compiler.watch({
          aggregateTimeout: 300,
          ignore: /node_modules/,
      }, (err, stats)=>{
          if (err){
              console.error(err);
              return;
          }
          handleStats(stats, true);
      });
  }else{
      return compiler.run((err, stats)=>{
          if (err){
              console.error(err);
              return;
          }
          handleStats(stats, false);
      });
  }
}
