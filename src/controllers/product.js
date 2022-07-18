const Category = require('../models/Category')
const Product = require('../models/Product')
const { create, readMany, readOne, update, remove } = require('../queries/crud')

function checkDoublons(tab) {
    var uniqueValues = [];
    var arr = tab.filter(function (el) {
        // If it is not a duplicate, return true
        if (uniqueValues.indexOf(el) == -1) {
            uniqueValues.push(el);
            return true;
        }
        return false;
    });

    //return array without duplicates
    return arr
}
//add product
exports.addProduct = (req, res) => {
    req.body.category = checkDoublons(req.body.category)
    create(Product, req, res)
}

//get product by ID
exports.oneProduct = (req, res) => {
    readOne(Product, req, res)
}
//get all products
exports.allProducts = (req, res) => {
    readMany(Product, req, res)
}
//update product
exports.updateProduct = (req, res) => {
    update(Product, req, res)
}
//delete product
exports.deleteProduct = (req, res) => {
    remove(Product, req, res)
}