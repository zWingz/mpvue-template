var path = require('path');
const time = new Date().getTime();

module.exports = {
  base: {
      assetsRoot: path.resolve(__dirname, '../dist'),
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
    },
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        devtool: 'cheap-module-source-map',
    },
    dev: {
        port: {{ port }},
        env: {
            NODE_ENV: '"development"'
        },
        devtool: 'cheap-module-eval-source-map',
    },
};
