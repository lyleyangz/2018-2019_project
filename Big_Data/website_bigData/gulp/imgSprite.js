import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import buffer from 'vinyl-buffer' // 将流转换成buffer
import spritesmith from 'gulp.spritesmith' // 雪碧图合并插件
import merge from 'merge-stream' // 合并流插件
import imagemin from 'gulp-imagemin' // 图片压缩插件
import { srcSpritesPath, srcScssPath, destImagePath } from './path'

const spriteTaskList = []

/*
*
* collectSpritesTask 雪碧图合并
*
* */
const filesList = []
fs.readdirSync(srcSpritesPath).forEach(name => {
  const spritesFolder = path.join(srcSpritesPath, `${name}`) // 雪碧图子目录
  const stats = fs.lstatSync(spritesFolder)
  if (stats.isFile() && /.png$/.test(name)) {
    filesList.push(spritesFolder)
  } else if (stats.isDirectory() && fs.readdirSync(spritesFolder).length) {
    const gulpTask = `sprite:${name}`
    spriteTaskList.push(gulpTask)
    gulp.task(gulpTask, () => {
      const spritesData = gulp.src(path.join(spritesFolder, '*.png'))
        .pipe(spritesmith({
          imgName: `${name}_icon.png`,
          imgPath: `/static/images/${name}_icon.png`,
          cssName: `_${name}_icon.scss`,
          padding: 4
        }))
      const cssStream = spritesData.css
        .pipe(gulp.dest(srcScssPath)) // 雪碧图定位scss文件输出目录
      const imgStream = spritesData.img
        .pipe(buffer())
        .pipe(imagemin([
          imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest(destImagePath))
      return merge(cssStream, imgStream)
    })
  }
})
if (filesList.length) {
  spriteTaskList.push('sprite:app')
  gulp.task('sprite:app', () => {
    // const spritesData = gulp.src(path.join(srcSpritesPath, '*.png'))
    const spritesData = gulp.src(filesList)
      .pipe(spritesmith({
        imgName: 'app_icon.png',
        imgPath: '/static/images/app_icon.png',
        cssName: '_app_icon.scss',
        padding: 4
      }))
    spritesData.css
      .pipe(gulp.dest(srcScssPath)) // 雪碧图定位scss文件输出目录
    spritesData.img
      .pipe(buffer())
      // .pipe(imagemin({
      //   optimizationLevel: 7, // 类型: Number 默认: 3 取值范围: 0-7(优化登记)
      //   use: [pngquant()] // 使用pngquant深度压缩png图片的imagemin插件
      // }))
      .pipe(imagemin([
        imagemin.optipng({ optimizationLevel: 5 })
      ]))
      .pipe(gulp.dest(destImagePath))
  })
}

// gulp.task('sprite', spritesArray)
export default spriteTaskList
