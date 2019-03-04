import gulp from 'gulp'

/*
 * 复制第三方模块到static目录
 * */

// gulp.task('copy', () => {
//   return gulp.src('third_party/**')
//     .pipe(gulp.dest('static/third_party'))
// })

/**
 *
 * @export
 * @param {any} src 复制源目录
 * @param {any} dest 复制目标目录
 * @returns {Function}
 *
 */
export default function copy(src, dest) {
  return () => gulp.src(src)
     .pipe(gulp.dest(dest))
}
