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

gulp.task('tsc-watch', ['tsc'], ()=>{
    gulp.watch(['src/**/*.ts', 'src/**/*.tsx'], ['tsc']);
});

gulp.task('server', ()=>{
    gulp.src(['dist', 'static'])
    .pipe(server({
        livereload: true,
        directoryListing: false,
        open: false,
        port: 8080,
    }));
});


gulp.task('default', ['tsc']);
gulp.task('watch', ['tsc-watch', 'webpack-watch', 'server']);

gulp.task('webpack', ['tsc'], ()=>{
    return makeWebpack(false);
});
gulp.task('webpack-watch', ()=>{
    return makeWebpack(true);
});

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
