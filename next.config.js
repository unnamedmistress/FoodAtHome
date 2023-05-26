module.exports = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ]
            }
          }
        ]
      });
      return config;
    }
  };
  