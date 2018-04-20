const chalk = require('chalk')
const fs = require('fs')
const exec = require('child_process').exec
const fileList = []
let dist = '',
    timestr = 0

function findRealease(p) {
    const dirList = fs.readdirSync(p)
    dirList.forEach(item => {
        if(fs.statSync(item).isDirectory() && /release/.test(item)) {
            const hash = item.split('-')[1]
            if(+hash > timestr) {
                dist = item
                timestr !== 0 && fileList.push('release-' + timestr)
                timestr = +hash
            }
        }
    })
}
findRealease('.')
if(!dist) {
    return
}
let execStr = `rm -rf dist && ln -sf ${dist} dist`

exec(execStr, (err, stdout, stderr) => {
    if(err) {
        console.log(chalk.red('\nexec error:' + stderr + '\n'))
    } else {
        console.log(chalk.cyan('\n\tBuild complete.\n'))
        // console.log('\x1b[36m', '\n BUILD SUCCESSED', '\x1b[0m')
    }
})
