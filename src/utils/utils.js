const fs = require('fs');

function writeDateToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);

        req.on('end', () => {
          body = JSON.parse(body);
          resolve(body);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDateToFile,
  getPostData,
};
