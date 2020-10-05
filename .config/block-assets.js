const glob = require('glob');

const dynamicCssFiles = () => glob
  .sync('blocks/**/frontend.scss')
  .reduce((cssEntries, cssEntryLocation) => {
    const newCssEntries = { ...cssEntries };
    const dynamicCssEntry = cssEntryLocation.replace(
      '/frontend.scss',
      '-styles',
    );
    newCssEntries[dynamicCssEntry] = cssEntryLocation;
    return newCssEntries;
  }, {});

const dynamicJsFiles = () => glob.sync('blocks/**/script.ts').reduce((jsEntries, jsEntryPath) => {
  const newJsEntries = { ...jsEntries };
  const dynamicJsEntry = jsEntryPath.replace('/script.ts', '-scripts');
  newJsEntries[dynamicJsEntry] = jsEntryPath;
  return newJsEntries;
}, {});

module.exports = {
  dynamicCssFiles,
  dynamicJsFiles,
};
