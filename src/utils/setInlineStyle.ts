import Config from 'webpack-chain';


const setInlineStyle = (styles: string[], config: Config) => {
  styles.forEach(style => {
    // 不抽离css，使用style-loader将组件样式添加到head中
    config.module.rule(style).uses.delete('MiniCssExtractPlugin.loader');
    config.module.rule(style).use('style-loader').before('css-loader').loader(require.resolve('style-loader'));
  });
};

export = setInlineStyle;
