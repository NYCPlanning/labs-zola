/* eslint-env node */
module.exports = {
  description: 'Generate a layer definition',

  fileMapTokens(options) {
    return {
      __layerToken__() {
        return options.dasherizedModuleName;
      },
    };
  },
};
