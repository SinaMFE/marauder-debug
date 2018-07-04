# 起因

利用sourcemap在调试大工程时遇到如下问题：

    1.浏览器问题导致调试的时候代码行或者代码块对不上

    2.浏览器问题导致的变量监控和sourcemap原有变量名不一致

    3.大脚本导致format浏览器卡死或者无法format的问题


#### ok 回归原生调试方式


# sinamfe-marauder-debug

用于不使用sourcemap ，需要输出debug.js和debug.css进行调试的同学。

## 安装

```
npm install sinamfe-marauder-debug --save-dev
```
作为webpack-marauder的plugin来使用.
默认已经集成在webpack-marauder插件中

## 使用方法：

```
const marauderDebug = require('sinamfe-marauder-debug');

const webpackConfig = {
 plugins: [
      new marauderDebug()]
 };
 ```