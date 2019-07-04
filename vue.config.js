// const path = require('path');

// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
//webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    publicPath: "/",
    // 输出目录
    outputDir: 'dist',

    // eslint-loader 是否在保存的时候检查 
    lintOnSave: true,
    // 是否使用包含运行时编译器的Vue核心的构建
    // runtimeCompiler: false,
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    // alias 配置
    // chainWebpack: (config) => {
    //     config.resolve.alias
    //         .set('@', resolve('src'))

    // },
    // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
    // corsUseCredentials: false,

    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    // npm i -D compression-webpack-plugin
    //配置参数详解
    // asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
    // algorithm： 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
    // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
    // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
    // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
    configureWebpack: {
        plugins: [
            /**
             *  cnpm intall webpack-bundle-analyzer –save-dev
             * // package.json
             *   "analyz": "npm_config_report=true npm run build"
             * npm run analyz
            */
            new BundleAnalyzerPlugin(
                // {
                //     //  可以是`server`，`static`或`disabled`。
                //     //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
                //     //  在“静态”模式下，会生成带有报告的单个HTML文件。
                //     //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
                //     analyzerMode: 'server',
                //     //  将在“服务器”模式下使用的主机启动HTTP服务器。
                //     analyzerHost: '127.0.0.1',
                //     //  将在“服务器”模式下使用的端口启动HTTP服务器。
                //     analyzerPort: 8888, 
                //     //  路径捆绑，将在`static`模式下生成的报告文件。
                //     //  相对于捆绑输出目录。
                //     reportFilename: 'report.html',
                //     //  模块大小默认显示在报告中。
                //     //  应该是`stat`，`parsed`或者`gzip`中的一个。
                //     //  有关更多信息，请参见“定义”一节。
                //     defaultSizes: 'parsed',
                //     //  在默认浏览器中自动打开报告
                //     openAnalyzer: true,
                //     //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
                //     generateStatsFile: false, 
                //     //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
                //     //  相对于捆绑输出目录。
                //     statsFilename: 'stats.json',
                //     //  stats.toJson（）方法的选项。
                //     //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
                //     //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
                //     statsOptions: null,
                //     logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
                //   }
            ),

            new CompressionWebpackPlugin({
                // asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new UglifyJsPlugin({
                uglifyOptions: {
                  compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true,
                  },
                },
                sourceMap: false,
                parallel: true,
            })
        ]
    },
    // 高级的方式
    configureWebpack: config => {
        config.externals = {
        } 
    },
    // CSS 相关选项
    css: {
        //extract: true,
        // 是否开启 CSS source map？
        sourceMap: false,
        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        loaderOptions: {}, // 为所有的 CSS 及其预处理文件开启 CSS Modules。

        modules: false
    },
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
    // PWA 插件的选项。   
    pwa: {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        // open: process.env.NODE_ENV === "development" ,
        host: '', // 不设置默认 Local 为 'localhost' Network 为 当前Ip 设置后Local、Network统一为设置后host
        port: '',
        https: false, //是否开启 https 
        hotOnly: true, //host 是否唯一
        open: true, //是否自动打开浏览器
        proxy: '', // string | Object
        disableHostCheck:true,
        before: app => {}
    },
    // 第三方插件的选项
    pluginOptions: {}
}
