module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Find and update the source-map-loader rule to exclude node_modules
        webpackConfig.module.rules.forEach((rule) => {
          if (rule.use && rule.use.includes('source-map-loader')) {
            rule.exclude = /node_modules/;  // Exclude node_modules
          }
        });
  
        return webpackConfig;
      },
    },
  };
  