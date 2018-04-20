const path = require('path')
const fs = require('fs')
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  runGitInit,
  printMessage,
} = require('./utils')

module.exports = {
    helpers: {
        if_or: function (v1, v2, options) {
            if(v1 || v2) {
                return options.fn(this)
            }

            return options.inverse(this)
        },
    },
    prompts: {
        name: {
            type: 'string',
            required: true,
            message: 'Project name',
        },
        description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'my-project',
        },
        author: {
            type: 'string',
            message: 'Author',
        }
    },
    // completeMessage: 'To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/zWingz/webpack-template',
    complete: function(data, { chalk }) {
        const green = chalk.green

        sortDependencies(data, green)

        const cwd = path.join(process.cwd(), data.destDirName)
        installDependencies(cwd, green)
        .then(() => {
            return runLintFix(cwd, data, green)
        })
        .then(() => {
            return runGitInit(cwd, data, green)
        })
        .then(() => {
            printMessage(data, green)
        })
        .catch(e => {
            console.log(chalk.red('Error:'), e)
        })
      }
}
