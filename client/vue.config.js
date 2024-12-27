// vue.config.js (for Vue CLI projects)
module.exports = {
    chainWebpack: config => {
      config.module
        .rule('js')
        .test(/\.js$/)
        .include.add(/node_modules/)
        .end()
        .use('babel-loader')
        .loader('babel-loader')
        .tap(options => {
          options.presets = [
            ['@babel/preset-env', {
              targets: '> 0.25%, not dead', // Or your preferred target
              useBuiltIns: 'entry',
              corejs: 3,
            }]
          ];
          return options;
        });
    },
  };
  