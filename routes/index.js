/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

const validFileTypes = ['js'];

function requireFiles(directory, app) {
  fs.readdirSync(directory).forEach((fileName) => {
    // Recurse if directory
    if (fs.lstatSync(`${directory}/${fileName}`).isDirectory()) {
      requireFiles(`${directory}/${fileName}`, app);
    } else {
      // Skip this file
      if (fileName === 'index.js' && directory === __dirname) return;

      // Skip unknown filetypes
      if (validFileTypes.indexOf(fileName.split('.').pop()) === -1) return;

      // Require the file.
      require(`${directory}/${fileName}`)(app);
    }
  });
}

module.exports = function loadRoutes(app) {
  requireFiles(__dirname, app);
};
