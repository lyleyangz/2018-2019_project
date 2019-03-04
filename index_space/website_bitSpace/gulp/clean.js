import del from 'del'

// gulp.task('clean', () => {
//   return del(['static/**', '!static', '!static/.gitkeep'])
// })

/**
 *
 * @export
 * @param {String[]} cleanArray 要清除的目录数组
 * @param {String[]} keepArray 要保留的目录数组(!开头，例如：'!static')
 * @returns {Function}
 *
 */
export default function clean(cleanArray = [], keepArray = []) {
  return () => del(cleanArray.concat(keepArray))
}
