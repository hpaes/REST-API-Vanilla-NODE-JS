const http = require('http');
const ProductController = require('./controller/ProductController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    return ProductController.getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([a-z0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];
    return ProductController.getProduct(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    return ProductController.createProduct(req, res);
  } else {
    res.writeHead(400, ('Content-Type', 'application/json'));
    res.end(JSON.stringify('Route not found!'));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
  if (err) {
    console.error('Unable to connect the server: ', err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
