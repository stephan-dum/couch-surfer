const path = require('path');

// const couchPartyLoader = path.resolve('./loaders/couch-party.js');


module.exports = {
    mode : "development",
    entry: './src/index.test.ts',
    // devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '.dist'),
        filename: '[name].js',
    },
    // resolveLoader: {
    //     modules: [
    //         'node_modules',
    //         path.resolve(__dirname, 'loaders'),
    //     ],
    // },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias : {
            "~" : path.resolve(__dirname, 'src'),
            "@" : path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options : {
                    "plugins": [
                        "./babel/couch_party.js"
                    ]
                }
                // use: {
                //     loader: 'babel-loader',
                    // options: {
                    //     presets: [
                    //         "@babel/preset-env",
                    //     ],
                    //     plugins : [
                    //         path.resolve("./babel/couch_party.js")
                    //     ]
                    // },
                // },
            },
            // {
            //     test-runner: /\.[jt]spp$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader',
            //     options : {
            //         "plugins": [
            //             "./babel/couch_party.js"
            //         ]
            //     }
            //     // use: {
            //     //     loader: 'babel-loader',
            //     // options: {
            //     //     presets: [
            //     //         "@babel/preset-env",
            //     //     ],
            //     //     plugins : [
            //     //         path.resolve("./babel/couch_party.js")
            //     //     ]
            //     // },
            //     // },
            // },
            // {
            //     test-runner: /\.cp$/,
            //     use: [
            //         {
            //             loader: couchPartyLoader,
            //         },
            //     ],
            // },
        ],
    },
};

