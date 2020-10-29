const Product = require('../models/Product');
const { getPostData } = require('../utils/utils');

// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, ('Content-Type', 'application/json'));
    return res.end(JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
}

// @desc Gets Single Product
// @route GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, ('Content-Type', 'application/json'));
      return res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      res.writeHead(200, ('Content-Type', 'application/json'));
      return res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc Create a Product
// @route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { name, description, price } = body;

    const product = {
      name,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.error(error);
  }
}

// @desc Update a Product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, ('Content-Type', 'application/json'));
      return res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      const body = await getPostData(req);

      const { name, description, price } = body;

      const productData = {
        name: name || product.name,
        description: description || description.name,
        price: price || price.name,
      };

      const updProduct = await Product.update(id, productData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
};
