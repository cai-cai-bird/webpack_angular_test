var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var baseurl = path.resolve(process.cwd(), 'src');
var sourceMap = require('./sourcemap.json');
console.log(path.resolve(__dirname));//C:\Users\Administrator\Desktop\github\webpack_angular_test
module.exports = {
    entry: genEntries(),
    output: {
        path:path.join(__dirname,"src/build"),
        filename: '[name].js',
        publicPath: '/build/',
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        //ProvidePlugin 把一个全局变量插入到所有的代码中
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false
            },
            except: ['$', 'exports', 'require'] //排除关键字
        }),
        //提取所有入口文件公用的模块，将其独立打包
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    ],
    module: {
        noParse:['zepto','director','template','jweixin','url'],
        //加载器配置
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        root: "./bower_components",
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.css'],
        alias: sourceMap
    }
};
//读取所有入口文件
function genEntries() {
    var jsDir = path.resolve(baseurl, 'js');
    var names = fs.readdirSync(jsDir);
    var map = {};

    names.forEach(function (name) {
        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(jsDir, name) : '';
        if (entry) map[entry] = [entryPath];
    });
    return map;
}