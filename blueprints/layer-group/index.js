/* eslint-env node */
module.exports = {
  description: 'Generator a layer-group definition',

  fileMapTokens(options) {
    return {
      __layerGroupToken__() {
        return options.dasherizedModuleName;
      },
    };
  },
};
