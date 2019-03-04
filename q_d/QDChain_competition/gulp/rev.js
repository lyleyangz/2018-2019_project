import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import revCollector from 'gulp-rev-collector' // html静态文件名字替换

const revTaskList = []
const getRevTask = (templatePath) => {
  fs.readdirSync(templatePath).forEach(templateFile => {
    const templateFolder = path.join(templatePath, `${templateFile}`)
    const stats = fs.lstatSync(templateFolder)
    if (stats.isFile() && /.html$/.test(templateFile)) {
      const regExpArray = /(\w+).html$/.exec(templateFile)
      const templateName = regExpArray[1]
      const revTask = `rev:${templateName}`
      revTaskList.push(revTask)
      gulp.task(revTask, () => {
        return gulp.src([path.join(__dirname, '..', 'static/rev/*.json'), path.join(__dirname, '..', `template/${templateName}.html`)]) // 读取 rev-manifest.json 文件以及需要进行css名替换的文件
          .pipe(revCollector()) // 执行文件内css名的替换
          .pipe(gulp.dest(path.join(__dirname, '..', `src/views/${templateName}/`))) // 替换后的文件输出的目录
      })
    }
  })
}
getRevTask('template')

export default revTaskList
