const Cart = require('../models/Cart')
const Product = require('../models/Product')
const {readOne} = require('../queries/crud')

//add cart
exports.createCart=(req,res) =>
{
    // req.body.products.forEach(element => {
    //     const ind = req.body.products.indexOf(element.productId)
    // if(ind>=0)
    // {
    // }
    // else
    // {
    // }
    // });
}

//read one 
exports.oneCart=(req,res) =>
{
    readOne(Cart,req,res)
}