const Category = require('../models/Category')
const Product = require('../models/Product')
const {create,readMany, readOne} = require('../queries/crud')
const mongoose = require('mongoose')

//add Category
exports.addCategory=(req,res) =>
{
  create(Category,req,res)     
}

//get All Categories
exports.allCategory = (req,res) =>
{
    readMany(Category,req,res)
}

//get category by ID
exports.oneCategory = (req,res,next) =>
{
    console.log(req.params.id)
    Category.findOne({_id:req.params.id})
    .then(category =>
         {
            Product.find({category:category.id},{name:1})
            .then(products =>{
              {
                const number=products.length
                return res.json({number,products,category}) 
              } 
            } )
            .catch(err => {return res.json(err)})
     }
    )
    .catch(err => {res.json(err)})
}

//update category
//delete category