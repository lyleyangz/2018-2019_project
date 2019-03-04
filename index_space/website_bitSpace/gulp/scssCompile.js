import path from 'path'
import gulp from 'gulp'
import scss from 'gulp-sass' // scss编译插件
import gulpAuthprefixer from 'gulp-autoprefixer'  // 自动补充浏览器前缀
import rev from 'gulp-rev' // 文件名加MD5后缀
import { srcScssPath, destRevPath, destStylePath } from './path'

/*
*
* 公共scss文件编译
*
* */
gulp.task('scss', () => {
  return gulp.src(path.join(srcScssPath, '*.scss'))
    .pipe(scss({
      outputStyle: 'compressed'
    })).on('error', scss.logError)
    .pipe(gulpAuthprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rev()) // 文件名加MD5后缀
    .pipe(gulp.dest(destStylePath))
    .pipe(rev.manifest()) // 生成一个rev-manifest.json
    .pipe(gulp.dest(destRevPath)) // 保存rev-manifest.json
})
