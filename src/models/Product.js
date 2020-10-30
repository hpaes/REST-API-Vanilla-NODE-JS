let products = require('../data/products.json');
const { v4 } = require('uuid');
const { writeDateToFile } = require('../utils/utils');
const path = require('path');

function findAll() {
  return new Promise((resolve, reject) => {
    try {
      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    try {
      const product = products.find((p) => p.id === id);
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    try {
      const newProduct = { id: v4(), ...product };
      products.push(newProduct);
      writeDateToFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        products,
      );
      resolve(newProduct);
    } catch (err) {
      reject(err);
    }
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    try {
      const index = products.findIndex((p) => p.id === id);

      products[index] = { id, ...product };
      writeDateToFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        products,
      );
      resolve(products[index]);
    } catch (err) {
      reject(err);
    }
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    try {
      const filteredProducts = products.filter((p) => p.id !== id);

      writeDateToFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        filteredProducts,
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
