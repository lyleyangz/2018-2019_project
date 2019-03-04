const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const icons = require('../src/common/assets/icons.json')
const moduleTpl = fs.readFileSync(path.resolve(__dirname, './icon.tpl'), 'utf8')
const ICON_PATH = path.resolve(__dirname, '../src/common/icons')

let indexModule = ''
const names = Object.keys(icons)
names.forEach(function (name) {
    const icon = {};
    icon[name] = icons[name]
    fs.writeFileSync(ICON_PATH + '/' + name + '.js', moduleTpl.replace('${icon}', JSON.stringify(icon)))
    indexModule += 'import \'./' + name + '\'\n'
})

fs.writeFileSync(ICON_PATH + '/index.js', indexModule)
console.log(chalk.bgCyan(names.length + ' icon modules generated.'))
