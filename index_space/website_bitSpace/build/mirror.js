const fs = require('fs')
const resolve = require('path').resolve
const chalk = require('chalk')

const registry = process.argv[2]
const re = /https?:\/\/registry\.[a-z.]+/g

function replaceRc () {
  const rc = resolve(__dirname, '../.npmrc')
  fs.readFile(rc, (err, buf) => {
    if (err) {
      console.error(chalk.red(err))
    } else {
      let content = buf.toString()
      content = content.replace(re, registry)
      fs.writeFile(rc, content, err => {
        if (err) {
          console.error(chalk.red(err))
        } else {
          console.log(chalk.bgCyan(`registries in ".npmrc" have been replaced with "${registry}"`))
        }
      })
    }
  })
}

if (registry) {
  replaceRc()
} else {
  console.error(chalk.red('registry is required'))
}