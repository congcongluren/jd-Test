const gulp = require('gulp');
const html = require('gulp-minify-html');
const css = require('gulp-minify-css');
const script = require('gulp-uglify');

//es6转es5
const babel = require('gulp-babel'); //主要
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');

//gulp-imagemin图片压缩(png)
const imagemin = require('gulp-imagemin');

// 导入sass编译模块
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plugins = require('gulp-load-plugins')();

//gulp-watch监听模块
const watch = require('gulp-watch');



//------------------------------------
//复制
// gulp.task('copyfile',()=>{
//   return gulp.src('src/html/*.html')
//   .pipe(gulp.dest('dist/html/'));
// })

//html压缩
gulp.task('uglifyhtml', () => {
  return gulp.src('./src/html/*.html')
    .pipe(html())
    .pipe(gulp.dest('./dist/html/'))
})

//css压缩
gulp.task('uglifycss', () => {
  return gulp.src('./src/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('./dist/css/'))
})

//js复制
gulp.task('uglifyjs',()=>{
  return gulp.src('./src/script/*.js')
  .pipe(gulp.dest('./dist/script/'))
})

//转换压缩js
// gulp.task('uglifyjs', () => {
//   return gulp.src('src/script/*.js')
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(script())
//     .pipe(gulp.dest('dist/script/'));
// });


// 编译sass
gulp.task('compilesass', () => {
  return gulp.src('src/sass/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

//图片压缩
gulp.task('uglifyimg', () => {
  return gulp.src('src/img/*.{png,gif,jpg,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
});

//监听
gulp.task('default', function () {
  watch(['src/html/*.html', 'src/style/*.css', 'src/script/*.js', 'src/img/*.{png,gif,jpg,ico}', 'src/sass/*.scss'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifyjs', 'uglifyimg', 'compilesass'));
});