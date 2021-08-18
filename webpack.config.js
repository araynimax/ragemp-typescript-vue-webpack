// node modules
const globSync = require('glob/sync');
const path = require('path');
const fs = require('fs');

// configurations
const SERVER_FILES = path.resolve(__dirname, 'dist');
const PACKAGE_NAME = 'ragemp-typescript-boilerplate';

// webpack modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// helper
function generateServerClient(entry, output) {
    return {
        entry,
        output: {
            path: output,
            filename: 'index.js'
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
            ],
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
}

module.exports = [

    // client config
    generateServerClient(
        path.resolve(__dirname, 'src/client/main'),
        path.resolve(SERVER_FILES, 'client_packages')
    ),

    // server config
    generateServerClient(
        path.resolve(__dirname, 'src/server/main'),
        path.resolve(SERVER_FILES, `packages/${PACKAGE_NAME}`)
    ),

    // cef configs
    ...globSync(path.resolve(__dirname, 'src/cefs/*/main.js')).map((p) => {
        const cefName = path.basename(path.dirname(p));
        const templatePath = path.resolve(path.dirname(p), 'template.html');

        return {
            target: 'web',

            entry: p,
            output: {
                path: path.resolve(SERVER_FILES, `client_packages/cefs/${cefName}`),
                filename: 'app.js',
                clean: true,
            },

            module: {
                rules: [
                    {
                        test: /\.vue$/,
                        use: 'vue-loader'
                    },
                    {
                        test: /\.(s[ac]ss|css)$/i,
                        use: [
                            "style-loader",
                            {
                                loader: 'css-loader',
                                options: {
                                    //  url: false
                                }
                            },
                            "sass-loader",
                        ],
                    },
                    {
                        test: /\.(png|svg|jpg|jpeg|gif)$/i,
                        type: 'asset/resource',
                    },
                ]
            },

            plugins: [
                new HtmlWebpackPlugin({
                    inject: 'body',
                    template: fs.existsSync(templatePath) ? templatePath : path.resolve(__dirname, 'src/cefs/default.template.html'),
                }),
                new VueLoaderPlugin(),
            ],
        }
    }),
];