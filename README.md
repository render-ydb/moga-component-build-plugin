# moga-component-build-plugin
Moga Component使用的基础编译插件

## 介绍
基于[render-builder](https://www.npmjs.com/package/render-builder)封装的编译react组件的build-plugin

## 用法
在根目录的中配置文件中（这里以build.js为例）添加如下代码即可：

``` javascript
export default {
    plugins: ['moga-component-build-plugin',options]
}
```

## 插件配置（options）
moga-component-build-plugin配置如下：
| 选项 | 作用 | 类型 | 默认值 |
| --- | --- | --- | --- |
| headTags | 在开发moga-component时候，在插件提供的HTML文档的head节点中插入自定义代码，例如：<meta charset="UTF-8"> | Array<string> | [''] |
| bodyTags | 在开发moga-component时候，在插件提供的HTML文档的body节点中插入自定义代码，例如：<script>console.log(1)</script> | Array<string> | [''] |
| inlineStyle | 组件中使用样式是否内敛到js中。如果设置true，则不会生成对应的css文件，编译后的代码中会使用style-loader注入的代码，在html文档中使用style标签生成组件对应的css样式 | boolean | false |

## 功能介绍
moga-component-build-plugin提供了非常多开箱即用的功能，具体如下：
1. 插件内部提供html和react入口文件，减轻开发者的配置，专注于moga-component组件的编写即可。
2. 提供移动端和pc端的适配能力，针对样式中使用rpx作为css属性单位的情况，自动进行向vm单位的转化，开发者无需进行额外的适配工作。需要注意的是，插件内部转化的尺寸是按照IPhone 6来设计的，即基数为750，1rpx = 0.5px = 1物理像素。
3. 支持css、和css预处理语法（less、scss）。
4. 使用插件构建出资源的目录为dist，该目录下存放着umd规范下的react组件和对应的ts类型文件，以及对应的css文件。
5. 插件还会输出两个目录为es和lib,分别对应esm和cjs规范下的react组件。

## 插件实现原理
为了使得开发者更加熟练使用该插件，简单介绍下插件的实现原理：

1. 使用[moga-app-base-webpack-config](https://www.npmjs.com/package/moga-app-base-webpack-config)得到基础webpack配置，然后根据得到的配置做了定制化的修改
2. 编写基于[render-builder](https://www.npmjs.com/package/render-builder)的插件类，享用到render-builder带来的编译能力和其他API方法。

更多细节欢迎阅读[moga-component-build-plugin](https://github.com/render-ydb/moga-component-build-plugin.git)的源码。



