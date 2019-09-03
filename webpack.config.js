const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

//node的语法
module.exports = {
    entry : path.join(__dirname , './src/main.js'),  //打包入口文件路径
    output : {
        path : path.join(__dirname , './dist'),  //打包出口文件输出到那个文件目录
        filename : 'bundle.js' //出口文件名
    },
    plugins:[
        new htmlWebpackPlugin({
            template : path.join(__dirname , './src/index.html'),
            filename : 'index.html'
        })
    ],
    module:{ //这个节点配置所有第三方加载器
        rules :[ //所有第三方模块儿的匹配规则
            {test : /\.css$/ , use : ['style-loader' , 'css-loader']},  //以.css结尾的文件使用这两个加载器处理
            {test : /\.less$/ , use : ['style-loader' , 'css-loader' , 'less-loader'] },
            {test : /\.scss$/ , use : ['style-loader' , 'css-loader' , 'sass-loader'] },
            {test : /\.(jpg|png|gif|bmp|jpeg)$/ , use : 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, //64KB大小以下的图片才做base64转码,图片打包好之后名称设置为8位哈希值-原名
            { test: /\.(ttf|eot|svg|woff|woff2|ico)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader'}, // 配置vue打包加载器
        ]
    },
    resolve:{
        alias : {
           // 'vue$' : 'vue/dist/vue.js'
        }
    }
}

//配置好之后  打包的命令就简化为  webpack了