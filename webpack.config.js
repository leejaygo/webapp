var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//console.log(__dirname);
module.exports = {
    entry: {
        'highcharts/chart': './src/pages/highcharts/chart.js',
    },
    output:{
        path: path.join(__dirname,'vendor/pages'),
        publicPath: "../",
        filename: "[name].js",//这里的name为上面entry中key的字符串
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [    //加载器
            {test: /\.css$/, loader:ExtractTextPlugin.extract("style", "css") },
            {test: /\.html$/, loader: "html" },
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'},
            {test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery',},
        ]
    },

    plugins:[
        new ExtractTextPlugin("[name].css"),    //单独使用style标签加载css并设置其路径
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            //favicon:'./src/img/favicon.ico', //favicon路径
            filename:'./highcharts/chart.html',    //生成的html存放路径，相对于 path
            template:'./src/pages/highcharts/chart.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:false //删除空白符与换行符
            }
        }),
        new webpack.optimize.UglifyJsPlugin({    //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']    //排除关键字
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            _: 'underscore'
        })
   ],
    devServer:{
        contentBase:'./vendor/pages',
        host: 'localhost',
        port: 8080, //比如我是监听3200端口
        inline: true, //可以监控js变化
        hot: true, //热启动
    }
}
//启动webpack服务命令webpack-dev-server --inline