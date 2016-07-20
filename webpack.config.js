var webpack = require("webpack");
var sourceMap = require('./sourcemap.json');
module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: {
		app:"./js/app.js",
		vendors: ['jquery']
	},
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: "./build",
		filename: 'app.js'
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		}]
	},
	resolve: {
		root: "./bower_components",
		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		extensions: ['', '.js', '.json', '.css'],
		alias: sourceMap
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
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
	]
};
//http://www.open-open.com/lib/view/open1452487103323.html
//代码热替换, HotModuleReplacementPlugin
//生成html文件，HtmlWebpackPlugin
//将css成生文件，而非内联，ExtractTextPlugin
//报错但不退出webpack进程，NoErrorsPlugin
//代码丑化，UglifyJsPlugin，开发过程中不建议打开
//多个 html共用一个js文件(chunk)，可用CommonsChunkPlugin
//清理文件夹，Clean
//调用模块的别名ProvidePlugin，例如想在js中用$，如果通过webpack加载，需要将$与jQuery对应起来