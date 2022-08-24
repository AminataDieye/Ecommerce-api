const Category = require('../models/Category')
const Product = require('../models/Product')
const { create, readMany, readOne } = require('../queries/CRUD')
const mongoose = require('mongoose')

//add Category
exports.addCategory = (req, res) => {
  create(Category, req, res)
}

//get All Categories
exports.allCategory = (req, res) => {
  readMany(Category, req, res)
}

//get category by ID
exports.oneCategory = (req, res, next) => {
  Category.findOne({ _id: req.params.id })
    .then(category => {
      Product.find({ category: category.id }, { name: 1 })
        .then(products => {
          {
            const number = products.length
            return res.status(200).json({ number, category, products })
          }
        })
        .catch(err => { return res.status(500).json(err) })
    }
    )
    .catch(err => { res.json(err) })
}

//update category
//delete category