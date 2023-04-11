import setAssetsPath = require('../utils/setAssetsPath');
import { Json } from 'render-builder';
import Chain from 'webpack-chain';
export = (config:Chain, options:Json) => {
  const { https } = options;
  setAssetsPath(config, { js: 'js', css: 'css' });
  // config loglevel
  config.merge({
    devServer: {
    //   logLevel: 'silent',
    },
  });
  config.devServer
    .hot(true)
    // .disableHostCheck(true)
    // .clientLogLevel('error');

  config.devServer.https(Boolean(https));
};
