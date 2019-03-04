// import fs from 'fs'
// import path from 'path'
// import gulp from 'gulp'
// import svgSprite from 'gulp-svg-sprite' // 雪碧图合并插件
// // import svgmin from 'gulp-svgmin'
// // import chalk from 'chalk'
// import { srcSvgPath, srcScssPath, destImagePath } from './path'

// const svgTaskList = []

// /*
// *
// * collectSpritesTask 雪碧图合并
// *
// * */
// const filesList = []
// fs.readdirSync(srcSvgPath).forEach(name => {
//   const svgFolder = path.join(srcSvgPath, `${name}`) // 雪碧图子目录
//   const stats = fs.lstatSync(svgFolder)
//   if (stats.isFile() && /.svg$/.test(name)) {
//     filesList.push(svgFolder)
//   } else if (stats.isDirectory() && fs.readdirSync(svgFolder).length) {
//     const gulpTask = `svg:${name}`
//     svgTaskList.push(gulpTask)
//     gulp.task(gulpTask, () => {
//       return gulp.src(path.join(svgFolder, '*.svg'))
//         // .pipe(svgSprite({
//           shape: {
//             // spacing: {
//             //   padding: 4,
//             //   box: 'content'
//             // },
//             dest: path.join(destImagePath, `${name}.svg`)
//           },
//           mode: {
//             view: {
//               render: {
//                 // scss: {
//                 //   dest: path.join(srcScssPath, `_${name}_svg.scss`)
//                 // }
//                 scss: true
//               }
//               // dest: path.join(srcScssPath, `_${name}_svg.scss`)
//             }
//           }
//         }))
//         // .on('error', (error) => {
//         //   console.log(chalk.red(error))
//         // })
//         // .pipe(svgmin())
//         .pipe(gulp.dest(destImagePath))
//     })
//   }
// })
// if (filesList.length) {
//   svgTaskList.push('svg:app')
//   gulp.task('svg:app', () => {
//     return gulp.src(filesList)
//       .pipe(svgSprite({
//         // shape: {
//         //   // spacing: {
//         //   //   padding: 4,
//         //   //   box: 'content'
//         //   // },
//         //   dest: path.join(destImagePath, 'app.svg')
//         // },
//         mode: {
//           // view: {
//           //   render: {
//           //     // scss: {
//           //     //   dest: path.join(srcScssPath, '_app_svg.scss')
//           //     // }
//           //     scss: true
//           //   },
//           //   example: true,
//           //   dest: path.join(srcScssPath, '_app_svg.scss')
//           // }
//           css: {
//             example: true
//           }
//         }
//       }))
//       // .on('error', (error) => {
//       //   console.log(chalk.red(error))
//       // })
//       // .pipe(svgmin())
//       .pipe(gulp.dest(destImagePath))
//   })
// }

// // gulp.task('sprite', spritesArray)
// export default svgTaskList
