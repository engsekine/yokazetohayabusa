const path = require('path');

module.exports = {
    // モード値を production に設定すると最適化された状態で、development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development",
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: [
        './src/index.tsx',
        './src/ts/index.ts',
        './src/js/index.js',
    ],
    // ファイルの出力設定
    output: {
        // 出力ファイルのディレクトリ名
        path: path.join(__dirname, 'dist'),
        // 出力ファイル名
        filename: "main.js",
    },
    module: {
        rules: [
            // Sassファイルの読み込みとコンパイル
            {
                //TypeScript
                test: /\.(ts|tsx)$/,
                use: [{
                        loader: 'babel-loader',
                        options: { presets: ['@babel/preset-env', '@babel/react'] },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
            },
            {
                test: /\.scss/, // 対象となるファイルの拡張子
                use: [{
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                // 対象となるファイルの拡張子
                test: /\.(gif|png|jpg|svg)$/,
                // 画像をBase64として取り込む
                type: "asset/inline",
            },
        ],
    },
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
        port: 3000,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    target: ["web", "es5"],
    // キャッシュ有効
    cache: false,
};