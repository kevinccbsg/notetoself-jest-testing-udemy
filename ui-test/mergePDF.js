const merge = require('easy-pdf-merge');

const utilMerge = (pdfs, output) => (
  new Promise((resolve, reject) => {
    merge(pdfs, output, (err) => {
      if(err) {
        return reject(err);
      }
      resolve('Success');
    });
  })
);



module.exports = utilMerge;
