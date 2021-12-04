const path = require('path');
module.exports = {
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "./")
        }
    },
    mode: "development",
    experiments: {
        asyncWebAssembly: true
    }
};
