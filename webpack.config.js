var path=require("path");
var ExtractTextPlugin=require("extract-text-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
var config={
    entry:{
        main:'./index.js'
    },
    output:{
        path:path.join(__dirname,"./dist"),
        publicPath:"/dist/",
        filename:"main.js"
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders:{
                        less:ExtractTextPlugin.extract({
                            use:['css-loader','less-loader'],
                            fallback:'vue-style-loader'
                        }),
                        css:ExtractTextPlugin.extract({
                            use:'css-loader',
                            fallback:'vue-style-loader'
                        })
                    }
                }
            },
            {
               test:/\.js$/,
                loader: 'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    use:['less-loader'],
                    fallback:'style-loader'
                })
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('main.css'),
        new VueLoaderPlugin()
    ]
}

module.exports=config;