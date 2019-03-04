import path from 'path'
import gulp from 'gulp'
import buffer from 'vinyl-buffer' // 将流转换成buffer
import imagemin from 'gulp-imagemin' // 图片压缩插件
import { srcImagePath, destImagePath } from './path'

gulp.task('images', () => {
  return gulp.src(path.join(srcImagePath, '**'))
    .pipe(buffer())
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({ plugins: [{ removeViewBox: true }] })
    ]))
    .pipe(gulp.dest(destImagePath))
})
