import Config from 'webpack-chain';

const postcssPxToViewPort = require('postcss-px-to-viewport');

const setPxToViewport = (styles: string[], config: Config) => {
  styles.forEach(style => {
    config.module.rule(style).use('postcss-loader').tap(options => {
      return {
        ...options,
        postcssOptions: {
          plugins: [
            postcssPxToViewPort({
              unitToConvert: 'rpx',
              viewportWidth: 750,
              unitPrecision: 5,
              propList: ['*'],
              viewportUnit: 'vw',
              fontViewportUnit: 'vw',
              selectorBlackList: [],
              minPixelValue: 1,
              mediaQuery: true,
              replace: true,
              exclude: [],
            }),
          ],
        },
      };
    });
  });
};

export = setPxToViewport;
