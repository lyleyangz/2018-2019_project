import path from 'path'

export const srcSpritesPath = path.join(__dirname, '..', 'src/common/assets/sprites') // 雪碧图总目录
export const srcSvgPath = path.join(__dirname, '..', 'src/common/assets/svg')
export const srcScssPath = path.join(__dirname, '..', 'src/common/assets/styles')
export const destStylePath = path.join(__dirname, '..', 'static/styles')
export const destRevPath = path.join(__dirname, '..', 'static/rev')
export const srcImagePath = path.join(__dirname, '..', 'src/common/assets/images')
export const destImagePath = path.join(__dirname, '..', 'static/images')

export default {
  srcSpritesPath,
  srcSvgPath,
  srcScssPath,
  destStylePath,
  destRevPath,
  srcImagePath,
  destImagePath
}
