const http = require("http");
const ProductController = require("./controller/ProductController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    return ProductController.getProducts(req, res);
  } else {
    res.writeHead(400, ("Content-Type", "application/json"));
    res.end(JSON.stringify("Route not found!"));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
