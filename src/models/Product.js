const products = require('../data/products.json');
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

module.exports = {
  findAll,
  findById,
  create,
};
