const Category = require('../models/Category')
const  Product= require('../models/Product')
const {create, readMany, readOne,update, remove} = require('../queries/crud')

//add product
exports.addProduct = (req,res) =>
{
    create(Product,req,res) 
}

//get product by ID
exports.oneProduct = (req,res) =>
{
    readOne(Product,req,res)
}
//get all products
exports.allProducts = (req,res) =>
{    readMany(Product, req,res)
}
//update product
exports.updateProduct = (req,res)=> 
{
    update(Product,req,res)
}
//delete product
exports.deleteProduct = (req,res) => 
{
  remove(Product,req,res)
}