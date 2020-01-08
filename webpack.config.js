const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');  //把非javascript代码的文件打包成静态资源文件

const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web',
	entry: path.join(__dirname, './src/index.js'),

	output: {
		filename: 'bundle.[hash:8].js',
		path: path.resolve(__dirname, 'dist')
	},

	resolve: {
		alias: {
			'vue$': './node_modules/vue/dist/vue.js'
		}
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"product"'
			}
		}),
		new VueLoaderPlugin(),
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			title: "Webpack demo",
		})
	],

	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
			{
				test: /\.jsx$/i,
				loader: 'babel-loader'
			},
			{
				test: /\.vue$/i,
				loader: 'vue-loader'
			},
			// {
			// 	test: /\.css$/i,
			// 	use: [
			// 		'style-loader',
			// 		'css-loader'
			// 	]
			// },
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name: '[name]-aaa.[ext]'
						}
					}
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
};
if (isDev) {
	// 开发环境
	config.module.rules.push({
		test: /\.styl(us)?$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true
				}
			},
			'stylus-loader'
		]
	})
	config.devtool = '#cheap-module-eval-source-map'  //不刷新页面直接更新数据
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',
		overlay: {
			error: true
		},
		// open: true,
		hot: true  //不刷新页面直接更新数据
	}
	config.plugins.push(
		//不刷新页面直接更新数据
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
} else {
	// 正式环境
	config.entry = {
		app: path.join(__dirname, './src/index.js'),
		vendor: ['vue']
	}
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push(
		{
			test: /\.styl(us)?$/,
			use: ExtractPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					'stylus-loader'
				]
			})
		},
	)
	config.plugins.push(
		new ExtractPlugin('styles.[md5:contenthash:hex:8].css'),
	)
	config.optimization = {
		runtimeChunk: {
			name: "runtime"
		},
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	}
}

module.exports = config;