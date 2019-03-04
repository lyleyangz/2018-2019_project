const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const svgDir = path.resolve(__dirname, '../src/common/assets/svg')
const icons = {}

fs.readdirSync(svgDir).forEach(function (file) {

    const svgFile = path.resolve(svgDir, file) // 雪碧图子目录
    const stats = fs.lstatSync(svgFile)
    if (!stats.isFile() || !/.svg$/.test(file)) {
        return
    }

    const svg = fs.readFileSync(svgFile, 'utf8')

    if (!svg) {
        return
    }
    const widthMatch = svg.match(/ width="((\d*\.)?\d+)(px)?"/)
    const heightMatch = svg.match(/ height="((\d*\.)?\d+)(px)?"/)
    const boxMatch = svg.match(/ viewBox="0 0 ((\d*\.)?\d+) ((\d*\.)?\d+)"/)
    const boxWidth = boxMatch[1]
    const boxHeight = boxMatch[3]
    let width
    let height
    if (!widthMatch || !heightMatch) {
        width = boxMatch[1]
        height = boxMatch[3]
    } else {
        width = widthMatch[1]
        height = heightMatch[1]
    }

    // var dMatch = svg.match(/ d="([^"]+)"/g);
    const fillMatch = []
    const dMatch = [] 
    const reg = / d="([^"]+)"/g
    const reg2 = / fill="([^"]+)"/g
    let crt
    let crt2
    while ((crt = reg.exec(svg)) !== null) {
        dMatch.push(crt[1])
    }
    while ((crt2 = reg2.exec(svg)) !== null) {
        fillMatch.push(crt2[1])
    }

    if (!width || !height || !dMatch) {
        return;
    }
    const icon = {};
    const paths = [];
    dMatch.forEach((d, i) => {
        paths.push({
            fill: fillMatch[i],
            // style: `fill: ${fillMatch[i]}`,
            d
        })
    })
    const name = file.replace(/^icon_/, '').replace(/\.svg$/, '');
    icons[name] = {
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        boxWidth: parseInt(boxWidth, 10),
        boxHeight: parseInt(boxHeight, 10),
        paths
        // paths: [{
        //     // d: dMatch[1]
        //     d:dMatch.join(' ')
        // }]
    };
});

fs.writeFileSync(path.resolve(__dirname, '../src/common/assets/icons.json'), JSON.stringify(icons, null, '  '));

console.log(chalk.bgCyan('icons json generated'))
