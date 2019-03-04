import path from 'path'
import gulp from 'gulp'
import runSequence from 'run-sequence' // gulp流程控制插件
import revTaskList from './gulp/rev'
import './gulp/scssCompile' // 公共scss文件编译
import './gulp/imagemin' // 图片压缩
import spriteTaskList from './gulp/imgSprite'
// //import svgTaskList from './gulp/svgSprite'
import copyFunc from './gulp/copy'
import cleanFunc from './gulp/clean'

const srcScssPath = path.join(__dirname, 'src/common/assets/styles')

// 雪碧图合并
gulp.task('sprite', spriteTaskList)

// //gulp.task('svg', svgTaskList)

gulp.task('rev', revTaskList)

gulp.task('scss:rev', () => {
  runSequence('scss', 'rev')
})

gulp.task('scss:watch', ['scss:rev'], () => {
  gulp.watch(path.join(srcScssPath, '**/*.scss'), ['scss:rev'])
})

gulp.task('copy', copyFunc('third_party/**', 'static/third_party'))

// * 删除static目录下的文件，为重新构建准备
gulp.task('clean', cleanFunc(['static/**'], ['!static', '!static/.gitkeep']))

// * 删除svg生成的json数据和svg icons组件，为重新构建准备
gulp.task('clean:svg', cleanFunc(['src/common/assets/icons.json', 'src/common/icons/**'], ['!src/common/icons', '!src/common/icons/.gitkeep']))

// //gulp.task('structure:svg', () => {
// //  runSequence('clean', ['copy', 'images', 'svg'], 'scss', 'rev')
// //})

gulp.task('structure', () => {
  // runSequence('clean', ['copy', 'images', 'sprite'], 'scss', 'rev')
  runSequence('clean', 'scss', 'rev')
})

gulp.task('default', ['structure'])
