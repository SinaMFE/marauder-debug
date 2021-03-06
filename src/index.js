/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var fs = require("fs");
var path = require("path");
function webpackHttps(localization, options) {
}
module.exports = webpackHttps;

const appDirectory = fs.realpathSync(process.cwd())
function rootPath(relativePath) {
  return path.resolve(appDirectory, relativePath)
}

const maraConf = require(rootPath('marauder.config.js'))

var _require = require("webpack-sources"),
    SourceMapSource = _require.SourceMapSource,
    RawSource = _require.RawSource;

//递归创建目录 同步方法
function mkdirsSync(dirname) {
    //console.log(dirname);
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


webpackHttps.prototype.apply = function(compiler) {
    var me = this;
    compiler.plugin("compilation", function (compilation) {
        compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
          var files = [];
          chunks.forEach(function (chunk) {
            chunk.files.forEach(function (file) {
              return files.push(file);
            });
          });

          compilation.additionalChunkAssets.forEach(function (file) {
            return files.push(file);
          });
          var jsregex =  /\.js($|\?)/i;
          var indexflag = 0;
          files.filter(function (file) {
            return jsregex.test(file);
          }).forEach(function (file) {
            try {
              var asset = compilation.assets[file];
              if (asset.__babilified) {
                compilation.assets[file] = asset.__babilified;
                return;
              }
              input = asset.source();
              if(maraConf.debug==true){
                compilation.assets[file.replace("min.js","debug.js").replace("min.css","debug.css")] =  new RawSource(input);
              }
            } catch (e) {
              compilation.errors.push(e);
            }
          });

          callback();
        });
      });
};